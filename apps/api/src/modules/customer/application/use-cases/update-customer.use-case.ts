import { Customer } from '../../domain/entities/customer.entity';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerValidator } from '../validators/customer.validator';

export class UpdateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly validator: CustomerValidator = new CustomerValidator(),
  ) {}

  async execute(id: string, input: UpdateCustomerDto): Promise<CustomerResponseDto> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new Error(`Customer with id ${id} was not found.`);
    }

    this.validator.ensureActive(customer);

    if (input.firstName || input.lastName || input.middleName !== undefined || input.preferredName !== undefined) {
      customer.updateName(input.firstName ?? customer.firstName, input.lastName ?? customer.lastName, input.middleName ?? customer.middleName, input.preferredName ?? customer.preferredName);
    }

    if (input.phone) {
      customer.updatePhone(input.phone);
    }

    if (input.marketingOptIn !== undefined) {
      input.marketingOptIn ? customer.enableMarketing() : customer.disableMarketing();
    }

    if (input.notes !== undefined) {
      customer.updateNotes(input.notes);
    }

    const updated = await this.customerRepository.update(customer);

    return this.toResponse(updated);
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
