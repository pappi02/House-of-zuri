import { Customer } from '../../domain/entities/customer.entity';
import { CustomerResponse } from '../responses/customer.response';

export class CustomerPresenter {
  static toResponse(customer: Customer): CustomerResponse {
    return {
      id: customer.id,
      customerNumber: customer.customerNumber,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      isGuest: customer.isGuest,
      status: customer.status,
      marketingOptIn: customer.marketingOptIn,
    };
  }
}
