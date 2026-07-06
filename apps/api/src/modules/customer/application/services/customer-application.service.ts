import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CreateGuestCustomerDto } from '../dto/create-guest-customer.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerNumberGenerator } from '../interfaces/customer-number-generator';
import { CreateCustomerUseCase } from '../use-cases/create-customer.use-case';
import { CreateGuestCustomerUseCase } from '../use-cases/create-guest-customer.use-case';
import { GetCustomerUseCase } from '../use-cases/get-customer.use-case';
import { ListCustomersUseCase } from '../use-cases/list-customers.use-case';
import { UpdateCustomerUseCase } from '../use-cases/update-customer.use-case';

export class CustomerApplicationService {
  private readonly createGuestCustomerUseCase: CreateGuestCustomerUseCase;
  private readonly createCustomerUseCase: CreateCustomerUseCase;
  private readonly updateCustomerUseCase: UpdateCustomerUseCase;
  private readonly getCustomerUseCase: GetCustomerUseCase;
  private readonly listCustomersUseCase: ListCustomersUseCase;

  constructor(
    customerRepository: CustomerRepository,
    customerNumberGenerator: CustomerNumberGenerator,
  ) {
    this.createGuestCustomerUseCase = new CreateGuestCustomerUseCase(customerRepository, customerNumberGenerator);
    this.createCustomerUseCase = new CreateCustomerUseCase(customerRepository, customerNumberGenerator);
    this.updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
    this.getCustomerUseCase = new GetCustomerUseCase(customerRepository);
    this.listCustomersUseCase = new ListCustomersUseCase(customerRepository);
  }

  async createGuestCustomer(input: CreateGuestCustomerDto): Promise<CustomerResponseDto> {
    return this.createGuestCustomerUseCase.execute(input);
  }

  async createCustomer(input: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.createCustomerUseCase.execute(input);
  }

  async updateCustomer(id: string, input: UpdateCustomerDto): Promise<CustomerResponseDto> {
    return this.updateCustomerUseCase.execute(id, input);
  }

  async getCustomer(id?: string, email?: string, customerNumber?: string): Promise<CustomerResponseDto | null> {
    return this.getCustomerUseCase.execute(id, email, customerNumber);
  }

  async listCustomers(query?: { page?: number; limit?: number; sortBy?: string; sortOrder?: 'asc' | 'desc'; filter?: { isGuest?: boolean; status?: string; marketingOptIn?: boolean } }): Promise<CustomerResponseDto[]> {
    return this.listCustomersUseCase.execute(query);
  }
}
