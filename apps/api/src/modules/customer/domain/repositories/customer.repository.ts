import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  findByPhone(phone: string): Promise<Customer | null>;
  findByCustomerNumber(number: string): Promise<Customer | null>;
  existsByEmail(email: string): Promise<boolean>;
  findAll(): Promise<Customer[]>;
  save(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  delete(id: string): Promise<void>;
}
