import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '../../domain/entities/customer.entity';
import { DuplicateCustomerException } from '../../domain/exceptions/duplicate-customer.exception';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerServicePort } from '../interfaces/customer-service.interface';

@Injectable()
export class CustomerService implements CustomerServicePort {
  constructor(@Inject('CustomerRepository') private readonly customerRepository: CustomerRepository) {}

  async createCustomer(input: Partial<Customer>): Promise<Customer> {
    const customer = new Customer({
      firstName: input.firstName ?? '',
      lastName: input.lastName ?? '',
      email: input.email ?? '',
      phone: input.phone ?? '',
      isGuest: input.isGuest ?? true,
      status: input.status,
      marketingOptIn: input.marketingOptIn,
      notes: input.notes,
      accountId: input.accountId,
    });

    const exists = await this.customerRepository.existsByEmail(customer.email);

    if (exists) {
      throw new DuplicateCustomerException(customer.email);
    }

    return this.customerRepository.save(customer);
  }

  async getCustomer(id: string): Promise<Customer | null> {
    return this.customerRepository.findById(id);
  }

  async listCustomers(query?: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; filter?: { isGuest?: boolean; status?: string; marketingOptIn?: boolean } }): Promise<Customer[]> {
    const customers = await this.customerRepository.findAll();

    const page = query?.page ?? 1;
    const limit = query?.limit ?? 20;
    const sortBy = query?.sortBy ?? 'createdAt';
    const sortOrder = query?.sortOrder ?? 'desc';
    const filter = query?.filter;

    let filteredCustomers = customers.filter((customer) => {
      if (filter?.isGuest !== undefined && customer.isGuest !== filter.isGuest) {
        return false;
      }

      if (filter?.status && customer.status !== filter.status) {
        return false;
      }

      if (filter?.marketingOptIn !== undefined && customer.marketingOptIn !== filter.marketingOptIn) {
        return false;
      }

      return true;
    });

    filteredCustomers = filteredCustomers.sort((a, b) => {
      const left = a[sortBy as keyof Customer];
      const right = b[sortBy as keyof Customer];

      if (typeof left === 'string' && typeof right === 'string') {
        return sortOrder === 'asc' ? left.localeCompare(right) : right.localeCompare(left);
      }

      if (typeof left === 'number' && typeof right === 'number') {
        return sortOrder === 'asc' ? left - right : right - left;
      }

      return 0;
    });

    const startIndex = (page - 1) * limit;
    return filteredCustomers.slice(startIndex, startIndex + limit);
  }
}
