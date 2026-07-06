import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentGateway } from '../../domain/ports/payment-gateway.interface';
import * as crypto from 'crypto';
import { FetchHttpClient } from '../http/fetch-http-client';

@Injectable()
export class PaystackGateway implements PaymentGateway {
  constructor(private readonly configService: ConfigService, private readonly httpClient: FetchHttpClient) {}

  async initializePayment(input: { paymentId: string; paymentNumber: string; amount: number; currency: string; orderId: string; customerId?: string | null }): Promise<{ authorizationUrl?: string | null; gatewayReference: string }> {
    const secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    if (!secretKey) {
      throw new Error('Missing PAYSTACK_SECRET_KEY configuration.');
    }

    const body = await this.httpClient.post<any>(
      'https://api.paystack.co/transaction/initialize',
      {
        amount: Math.round(input.amount * 100),
        currency: input.currency,
        reference: input.paymentNumber,
        metadata: { orderId: input.orderId, paymentId: input.paymentId },
      },
      { Authorization: `Bearer ${secretKey}` },
    );

    if (!body || !body.data) {
      throw new Error('Paystack initialize failed');
    }

    return {
      gatewayReference: body.data.reference,
      authorizationUrl: body.data.authorization_url,
    };
  }

  async verifyPayment(input: { gatewayReference: string }): Promise<{ verified: boolean; amount?: number; currency?: string; status?: string; authorizationReference?: string | null }> {
    const secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    if (!secretKey) {
      throw new Error('Missing PAYSTACK_SECRET_KEY configuration.');
    }

    const body = await this.httpClient.get<any>(`https://api.paystack.co/transaction/verify/${input.gatewayReference}`, { Authorization: `Bearer ${secretKey}` });

    return {
      verified: body.status === 'success' || body.data?.status === 'success',
      amount: body.data?.amount ? Number(body.data.amount) / 100 : undefined,
      currency: body.data?.currency,
      status: body.data?.status,
      authorizationReference: body.data?.authorization?.authorization_code ?? null,
    };
  }

  async requestRefund(input: { paymentId: string; amount?: number }): Promise<{ refunded: boolean; status?: string }> {
    const secretKey = this.configService.get<string>('PAYSTACK_SECRET_KEY');
    if (!secretKey) {
      throw new Error('Missing PAYSTACK_SECRET_KEY configuration.');
    }

    const body = await this.httpClient.post<any>(
      `https://api.paystack.co/refund`,
      { transaction: input.paymentId, amount: input.amount ? Math.round(input.amount * 100) : undefined },
      { Authorization: `Bearer ${secretKey}` },
    );
    return { refunded: body.status === true, status: body.data?.status };
  }

  verifyWebhook(input: { signature: string; body: string; secret: string }): boolean {
    if (!input.signature || !input.body || !input.secret) {
      return false;
    }

    const hmac = crypto.createHmac('sha512', input.secret);
    hmac.update(input.body);
    const digest = hmac.digest('hex');
    return digest === input.signature;
  }

  verifyWebhookSignature(input: { signature: string; payload: string; secret: string }): boolean {
    return this.verifyWebhook({ signature: input.signature, body: input.payload, secret: input.secret });
  }
}
