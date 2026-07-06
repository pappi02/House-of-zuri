import { Payment } from '../../domain/entities/payment.entity';

export class InitializePaymentUseCase {
  execute(payment: Payment): Payment {
    payment.initialize();
    return payment;
  }
}
