import { Payment } from '../../domain/entities/payment.entity';

export class VerifyPaymentUseCase {
  execute(payment: Payment, gatewayReference: string): Payment {
    payment.markSuccessful(gatewayReference);
    return payment;
  }
}
