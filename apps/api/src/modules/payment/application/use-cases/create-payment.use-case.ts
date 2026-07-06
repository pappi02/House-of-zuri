import { Payment } from '../../domain/entities/payment.entity';

export class CreatePaymentUseCase {
  execute(input: { orderId: string; customerId?: string | null; amount: number; currency?: string; gateway?: 'PAYSTACK' }): Payment {
    return new Payment({
      orderId: input.orderId,
      customerId: input.customerId ?? null,
      currency: input.currency ?? 'USD',
      amount: input.amount,
      gateway: input.gateway ?? 'PAYSTACK',
    });
  }
}
