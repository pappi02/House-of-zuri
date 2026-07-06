import { PrismaClient } from '@prisma/client';
import { PrismaPaymentRepository } from './prisma-payment.repository';
import { Payment } from '../../../domain/entities/payment.entity';

describe('PrismaPaymentRepository', () => {
  it('maps a stored payment record to a domain payment', async () => {
    const prisma = {
      payment: {
        findUnique: jest.fn().mockResolvedValue(null),
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({
          id: 'payment-1',
          paymentNumber: 'PAY-000001',
          orderId: 'order-1',
          customerId: null,
          gateway: 'PAYSTACK',
          currency: 'USD',
          amount: 100,
          status: 'PENDING',
          gatewayReference: null,
          authorizationReference: null,
          paidAt: null,
          failureReason: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      },
    } as unknown as PrismaClient;

    const repository = new PrismaPaymentRepository(prisma);
    const payment = new Payment({ orderId: 'order-1', amount: 100 });
    const saved = await repository.save(payment);

    expect(saved.orderId).toBe('order-1');
  });
});
