import { Customer } from '../../domain/entities/customer.entity';

export interface CustomerServicePort {
  createCustomer(input: Partial<Customer>): Promise<Customer>;
  getCustomer(id: string): Promise<Customer | null>;
  listCustomers(query?: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; filter?: { isGuest?: boolean; status?: string; marketingOptIn?: boolean } }): Promise<Customer[]>;
}
