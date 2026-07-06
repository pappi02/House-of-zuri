import { Payment } from '../../domain/entities/payment.entity';

export class HandleWebhookUseCase {
  constructor(private readonly repository?: any) {}

  async execute(payment: Payment, input: { eventId?: string; gatewayReference: string; status: string }): Promise<Payment> {
    // Idempotency: if repository provides isWebhookProcessed, consult it
    if (this.repository && typeof this.repository.isWebhookProcessed === 'function' && input.eventId) {
      const processed = await this.repository.isWebhookProcessed(input.eventId);
      if (processed) {
        return payment;
      }
    }

    if (this.repository && typeof this.repository.saveWebhookEvent === 'function' && input.eventId) {
      await this.repository.saveWebhookEvent({ id: input.eventId, gatewayReference: input.gatewayReference, status: input.status, createdAt: new Date() });
    }

    if (input.status === 'success') {
      payment.markSuccessful(input.gatewayReference);
      if (this.repository && typeof this.repository.appendOutboxEvent === 'function') {
        await this.repository.appendOutboxEvent({ aggregateType: 'payment', aggregateId: payment.id ?? payment.paymentNumber, eventType: 'PaymentSucceeded', payload: { paymentId: payment.id ?? null, paymentNumber: payment.paymentNumber } });
      }
      return payment;
    }

    payment.markFailed(input.status);
    if (this.repository && typeof this.repository.appendOutboxEvent === 'function') {
      await this.repository.appendOutboxEvent({ aggregateType: 'payment', aggregateId: payment.id ?? payment.paymentNumber, eventType: 'PaymentFailed', payload: { paymentId: payment.id ?? null, paymentNumber: payment.paymentNumber, reason: input.status } });
    }

    return payment;
  }
}
