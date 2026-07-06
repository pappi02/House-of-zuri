import { Payment } from '../../domain/entities/payment.entity';

export class RequestRefundUseCase {
  execute(payment: Payment): Payment {
    payment.requestRefund();
    payment.completeRefund();
    return payment;
  }
}
