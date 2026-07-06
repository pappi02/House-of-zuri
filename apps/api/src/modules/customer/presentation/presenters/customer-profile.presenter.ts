import { Customer } from '../../domain/entities/customer.entity';
import { CustomerProfileResponse } from '../responses/customer-profile.response';

export class CustomerProfilePresenter {
  static toResponse(customer: Customer): CustomerProfileResponse {
    return {
      id: customer.id,
      customerNumber: customer.customerNumber,
      displayName: `${customer.firstName} ${customer.lastName}`.trim(),
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
      isGuest: customer.isGuest,
    };
  }
}
