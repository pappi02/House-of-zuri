import { Body, Controller, Get, Param, Post, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from '../../application/services/payment.service';
import { InitializePaymentRequest } from '../dto/initialize-payment.request';
import { WebhookRequest } from '../dto/webhook.request';
import { PaymentExceptionFilter } from '../filters/payment-exception.filter';

@ApiTags('payments')
@Controller('payments')
@UseFilters(PaymentExceptionFilter)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initialize')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Initialize a payment for an order' })
  @ApiResponse({ status: 201, description: 'Payment initialized.' })
  initializePayment(@Body() body: InitializePaymentRequest) {
    const payment = this.paymentService.createPayment({
      orderId: body.orderId,
      customerId: body.customerId,
      amount: body.amount,
      currency: body.currency,
    });

    return this.paymentService.initializePayment(payment);
  }

  @Get(':paymentNumber')
  @ApiOperation({ summary: 'Get a payment by number' })
  @ApiResponse({ status: 200, description: 'Payment returned.' })
  getPayment(@Param('paymentNumber') paymentNumber: string) {
    return { paymentNumber };
  }

  @Post('webhooks/paystack')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Handle Paystack webhooks' })
  @ApiResponse({ status: 200, description: 'Webhook accepted.' })
  async handleWebhook(@Body() body: WebhookRequest, @Body('signature') signature?: string) {
    const raw = body.body;
    const sig = signature ?? (this.paymentService as any).getWebhookSignature?.() ?? '';

    // verify signature using configured secret
    const secret = (this.paymentService as any).getWebhookSecret?.();
    const verified = (this.paymentService as any).verifyWebhookSignature?.(sig, raw, secret);

    if (!verified) {
      return { ok: false };
    }

    // parse payload
    let payload: any;
    try {
      payload = JSON.parse(raw);
    } catch (err) {
      return { ok: false };
    }

    const gatewayReference = payload.data?.reference ?? payload.data?.id ?? '';
    const status = payload.event === 'charge.success' || payload.data?.status === 'success' ? 'success' : 'failed';

    // Persist and process
    const payment = this.paymentService.createPayment({ orderId: payload.data?.metadata?.orderId ?? 'unknown', amount: (payload.data?.amount ?? 0) / 100, currency: payload.data?.currency ?? 'USD' });
    await this.paymentService.handleWebhook(payment, { eventId: payload.data?.id ?? payload.id ?? undefined, gatewayReference, status });

    return { ok: true };
  }
}
