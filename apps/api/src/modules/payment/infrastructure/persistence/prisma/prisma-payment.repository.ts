import { PrismaClient } from '@prisma/client';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentRepository } from '../../../domain/repositories/payment.repository';

export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Payment | null> {
    const prismaClient = this.prisma as unknown as { payment: { findUnique: (args: { where: { id: string } }) => Promise<unknown | null> } };
    const record = await prismaClient.payment.findUnique({ where: { id } });
    return record ? this.toDomain(record as Record<string, unknown>) : null;
  }

  async findByPaymentNumber(paymentNumber: string): Promise<Payment | null> {
    const prismaClient = this.prisma as unknown as { payment: { findUnique: (args: { where: { paymentNumber: string } }) => Promise<unknown | null> } };
    const record = await prismaClient.payment.findUnique({ where: { paymentNumber } });
    return record ? this.toDomain(record as Record<string, unknown>) : null;
  }

  async findByOrderId(orderId: string): Promise<Payment[]> {
    const prismaClient = this.prisma as unknown as { payment: { findMany: (args: { where: { orderId: string } }) => Promise<unknown[]> } };
    const records = await prismaClient.payment.findMany({ where: { orderId } });
    return records.map((record) => this.toDomain(record as Record<string, unknown>));
  }

  async save(payment: Payment): Promise<Payment> {
    const prismaClient = this.prisma as unknown as { payment: { create: (args: { data: Record<string, unknown> }) => Promise<unknown> } };
    const created = await prismaClient.payment.create({
      data: {
        id: payment.id,
        paymentNumber: payment.paymentNumber,
        orderId: payment.orderId,
        customerId: payment.customerId ?? null,
        gateway: payment.gateway,
        currency: payment.currency,
        amount: payment.amount,
        status: payment.status,
        gatewayReference: payment.gatewayReference,
        authorizationReference: payment.authorizationReference,
        paidAt: payment.paidAt,
        failureReason: payment.failureReason,
      },
    });

    return this.toDomain(created as Record<string, unknown>);
  }

  async update(payment: Payment): Promise<Payment> {
    const prismaClient = this.prisma as unknown as { payment: { update: (args: { where: { id: string | undefined }; data: Record<string, unknown> }) => Promise<unknown> } };
    const updated = await prismaClient.payment.update({
      where: { id: payment.id },
      data: {
        paymentNumber: payment.paymentNumber,
        status: payment.status,
        gatewayReference: payment.gatewayReference,
        authorizationReference: payment.authorizationReference,
        paidAt: payment.paidAt,
        failureReason: payment.failureReason,
      },
    });

    return this.toDomain(updated as Record<string, unknown>);
  }

  private toDomain(record: Record<string, unknown>): Payment {
    return new Payment({
      id: record.id as string,
      paymentNumber: record.paymentNumber as string,
      orderId: record.orderId as string,
      customerId: record.customerId as string | null,
      gateway: record.gateway as 'PAYSTACK',
      currency: record.currency as string,
      amount: Number(record.amount),
      status: record.status as Payment['status'],
      gatewayReference: record.gatewayReference as string | null,
      authorizationReference: record.authorizationReference as string | null,
      paidAt: record.paidAt as Date | null,
      failureReason: record.failureReason as string | null,
      createdAt: record.createdAt as Date,
      updatedAt: record.updatedAt as Date,
    });
  }
}
