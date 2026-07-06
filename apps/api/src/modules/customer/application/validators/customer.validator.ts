import { Customer } from '../../domain/entities/customer.entity';
import { InvalidCustomerException } from '../../domain/exceptions/invalid-customer.exception';

export class CustomerValidator {
  validateForCreation(customer: Customer): void {
    if (!customer.email) {
      throw new InvalidCustomerException('Email is required.');
    }

    if (!customer.phone) {
      throw new InvalidCustomerException('Phone is required.');
    }
  }

  ensureActive(customer: Customer): void {
    if (customer.status === 'BLOCKED') {
      throw new InvalidCustomerException('Customer is blocked.');
    }

    if (customer.status === 'INACTIVE') {
      throw new InvalidCustomerException('Customer is inactive.');
    }
  }
}
