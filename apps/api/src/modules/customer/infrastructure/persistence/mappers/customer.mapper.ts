import { Customer } from '../../../domain/entities/customer.entity';

export class CustomerMapper {
  static toDomain(raw: {
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
  }): Customer {
    return new Customer({
      id: raw.id,
      accountId: raw.accountId,
      customerNumber: raw.customerNumber,
      firstName: raw.firstName,
      middleName: raw.middleName,
      lastName: raw.lastName,
      preferredName: raw.preferredName,
      email: raw.email,
      phone: raw.phone,
      isGuest: raw.isGuest,
      status: raw.status as any,
      marketingOptIn: raw.marketingOptIn,
      notes: raw.notes,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(customer: Customer): {
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
  } {
    return {
      id: customer.id,
      accountId: customer.accountId,
      customerNumber: customer.customerNumber,
      firstName: customer.firstName,
      middleName: customer.middleName,
      lastName: customer.lastName,
      preferredName: customer.preferredName,
      email: customer.email,
      phone: customer.phone,
      isGuest: customer.isGuest,
      status: customer.status,
      marketingOptIn: customer.marketingOptIn,
      notes: customer.notes,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}
