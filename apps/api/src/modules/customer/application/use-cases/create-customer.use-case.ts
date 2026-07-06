import { Customer } from '../../domain/entities/customer.entity';
import { DuplicateCustomerException } from '../../domain/exceptions/duplicate-customer.exception';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerNumberGenerator } from '../interfaces/customer-number-generator';
import { CustomerValidator } from '../validators/customer.validator';

export class CreateCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly customerNumberGenerator: CustomerNumberGenerator,
    private readonly validator: CustomerValidator = new CustomerValidator(),
  ) {}

  async execute(input: CreateCustomerDto): Promise<CustomerResponseDto> {
    const existing = await this.customerRepository.findByEmail(input.email);

    if (existing) {
      throw new DuplicateCustomerException(input.email);
    }

    const customer = new Customer({
      firstName: input.firstName,
      lastName: input.lastName,
      middleName: input.middleName,
      preferredName: input.preferredName,
      email: input.email,
      phone: input.phone,
      isGuest: input.isGuest ?? false,
      accountId: input.accountId,
      notes: input.notes,
      customerNumber: await this.customerNumberGenerator.generate(),
    });

    this.validator.validateForCreation(customer);

    const saved = await this.customerRepository.save(customer);

    return this.toResponse(saved);
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
