import { CreatePaymentUseCase } from './create-payment.use-case';

describe('CreatePaymentUseCase', () => {
  it('creates a payment with the supplied order and amount', () => {
    const useCase = new CreatePaymentUseCase();
    const payment = useCase.execute({ orderId: 'order-1', amount: 100, currency: 'USD' });

    expect(payment.orderId).toBe('order-1');
    expect(payment.amount).toBe(100);
    expect(payment.status).toBe('PENDING');
  });
});
