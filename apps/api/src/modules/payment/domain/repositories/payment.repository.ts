import { Payment } from '../entities/payment.entity';

export interface PaymentRepository {
  findById(id: string): Promise<Payment | null>;
  findByPaymentNumber(paymentNumber: string): Promise<Payment | null>;
  findByOrderId(orderId: string): Promise<Payment[]>;
  save(payment: Payment): Promise<Payment>;
  update(payment: Payment): Promise<Payment>;
}
