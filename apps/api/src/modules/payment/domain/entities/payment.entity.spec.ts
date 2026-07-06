import { Payment } from './payment.entity';

describe('Payment', () => {
  it('transitions from pending to successful and prevents later mutation', () => {
    const payment = new Payment({
      orderId: 'order-1',
      customerId: 'customer-1',
      currency: 'USD',
      amount: 1250,
      gateway: 'PAYSTACK',
    });

    payment.initialize();
    payment.markProcessing();
    payment.markSuccessful('ref-123');

    expect(payment.status).toBe('SUCCESS');
    expect(payment.gatewayReference).toBe('ref-123');
    expect(() => payment.markFailed('declined')).toThrow('A successful payment cannot be modified.');
  });

  it('tracks refunds from a successful payment', () => {
    const payment = new Payment({
      orderId: 'order-2',
      currency: 'USD',
      amount: 400,
      gateway: 'PAYSTACK',
    });

    payment.markSuccessful('ref-456');
    payment.requestRefund();
    payment.completeRefund();

    expect(payment.status).toBe('REFUNDED');
  });
});
