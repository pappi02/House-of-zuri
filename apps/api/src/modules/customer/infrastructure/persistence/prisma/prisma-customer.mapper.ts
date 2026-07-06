import { Prisma } from '@prisma/client';
import { Customer } from '../../../domain/entities/customer.entity';

export type PrismaCustomerRecord = {
  id: string;
  accountId: string | null;
  customerNumber: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  preferredName: string | null;
  email: string;
  phone: string;
  isGuest: boolean;
  status: string;
  marketingOptIn: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export class PrismaCustomerMapper {
  static toDomain(record: PrismaCustomerRecord): Customer {
    return new Customer({
      id: record.id,
      accountId: record.accountId,
      customerNumber: record.customerNumber,
      firstName: record.firstName,
      middleName: record.middleName,
      lastName: record.lastName,
      preferredName: record.preferredName,
      email: record.email,
      phone: record.phone,
      isGuest: record.isGuest,
      status: record.status as any,
      marketingOptIn: record.marketingOptIn,
      notes: record.notes,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  static toPersistence(customer: Customer): Prisma.CustomerCreateInput {
    return {
      id: customer.id,
      accountId: customer.accountId ?? undefined,
      customerNumber: customer.customerNumber,
      firstName: customer.firstName,
      middleName: customer.middleName ?? undefined,
      lastName: customer.lastName,
      preferredName: customer.preferredName ?? undefined,
      email: customer.email,
      phone: customer.phone,
      isGuest: customer.isGuest,
      status: customer.status as any,
      marketingOptIn: customer.marketingOptIn,
      notes: customer.notes ?? undefined,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}
