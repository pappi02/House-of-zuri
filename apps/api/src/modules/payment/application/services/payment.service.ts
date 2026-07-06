import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payment } from '../../domain/entities/payment.entity';
import { CreatePaymentUseCase } from '../use-cases/create-payment.use-case';
import { HandleWebhookUseCase } from '../use-cases/handle-webhook.use-case';
import { InitializePaymentUseCase } from '../use-cases/initialize-payment.use-case';
import { RequestRefundUseCase } from '../use-cases/request-refund.use-case';
import { VerifyPaymentUseCase } from '../use-cases/verify-payment.use-case';

@Injectable()
export class PaymentService {
  constructor(
    private readonly createPaymentUseCase: CreatePaymentUseCase,
    private readonly initializePaymentUseCase: InitializePaymentUseCase,
    private readonly verifyPaymentUseCase: VerifyPaymentUseCase,
    private readonly handleWebhookUseCase: HandleWebhookUseCase,
    private readonly requestRefundUseCase: RequestRefundUseCase,
    @Inject('PaymentRepository') private readonly repository?: any,
    private readonly configService?: ConfigService,
  ) {}

  createPayment(input: { orderId: string; customerId?: string | null; amount: number; currency?: string; gateway?: 'PAYSTACK' }): Payment {
    const payment = this.createPaymentUseCase.execute(input);

    // persist if repository is available
    if (this.repository && typeof this.repository.save === 'function') {
      this.repository.save(payment);
    }

    return payment;
  }

  initializePayment(payment: Payment): Payment {
    const result = this.initializePaymentUseCase.execute(payment);
    if (this.repository && typeof this.repository.update === 'function') {
      this.repository.update(result);
    }
    return result;
  }

  verifyPayment(payment: Payment, gatewayReference: string): Payment {
    const result = this.verifyPaymentUseCase.execute(payment, gatewayReference);
    if (this.repository && typeof this.repository.update === 'function') {
      this.repository.update(result);
    }
    return result;
  }

  async handleWebhook(payment: Payment, input: { eventId?: string; gatewayReference: string; status: string }): Promise<Payment> {
    // forward repository to use case for idempotency
    const handler = new HandleWebhookUseCase(this.repository);
    const result = await handler.execute(payment, input);
    if (this.repository && typeof this.repository.update === 'function') {
      await this.repository.update(result);
    }
    return result;
  }

  requestRefund(payment: Payment): Payment {
    const result = this.requestRefundUseCase.execute(payment);
    if (this.repository && typeof this.repository.update === 'function') {
      this.repository.update(result);
    }
    return result;
  }

  getWebhookSecret(): string | undefined {
    return this.configService?.get<string>('PAYSTACK_WEBHOOK_SECRET');
  }

  verifyWebhookSignature(signature: string, body: string, secret?: string): boolean {
    if (!secret) return false;
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha512', secret);
    hmac.update(body);
    const digest = hmac.digest('hex');
    return digest === signature;
  }
}
