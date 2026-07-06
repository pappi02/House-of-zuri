import { Customer } from '../../domain/entities/customer.entity';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerResponseDto } from '../dto/customer-response.dto';

export class GetCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id?: string, email?: string, customerNumber?: string): Promise<CustomerResponseDto | null> {
    let customer: Customer | null = null;

    if (id) {
      customer = await this.customerRepository.findById(id);
    } else if (email) {
      customer = await this.customerRepository.findByEmail(email);
    } else if (customerNumber) {
      customer = await this.customerRepository.findByCustomerNumber(customerNumber);
    }

    if (!customer) {
      return null;
    }

    return this.toResponse(customer);
  }

  private toResponse(customer: Customer): CustomerResponseDto {
    return {
      id: customer.id,
      customerNumber: customer.customerNumber,
      firstName: customer.firstName,
      lastName: customer.lastName,
      middleName: customer.middleName,
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
