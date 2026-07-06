import { Customer } from '../../domain/entities/customer.entity';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { ListCustomersQuery } from '../queries/list-customers.query';

export class ListCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(query: ListCustomersQuery = {}): Promise<CustomerResponseDto[]> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const sortBy = query.sortBy ?? 'createdAt';
    const sortOrder = query.sortOrder ?? 'desc';

    const customers = await this.getCustomers();
    const filtered = customers.filter((customer) => {
      if (query.filter?.isGuest !== undefined && customer.isGuest !== query.filter.isGuest) {
        return false;
      }

      if (query.filter?.status && customer.status !== query.filter.status) {
        return false;
      }

      if (query.filter?.marketingOptIn !== undefined && customer.marketingOptIn !== query.filter.marketingOptIn) {
        return false;
      }

      return true;
    });

    const sorted = filtered.sort((left, right) => {
      const leftValue = left[sortBy as keyof Customer] as string | Date | boolean;
      const rightValue = right[sortBy as keyof Customer] as string | Date | boolean;

      if (leftValue instanceof Date && rightValue instanceof Date) {
        return sortOrder === 'asc' ? leftValue.getTime() - rightValue.getTime() : rightValue.getTime() - leftValue.getTime();
      }

      if (typeof leftValue === 'string' && typeof rightValue === 'string') {
        return sortOrder === 'asc' ? leftValue.localeCompare(rightValue) : rightValue.localeCompare(leftValue);
      }

      if (typeof leftValue === 'boolean' && typeof rightValue === 'boolean') {
        return sortOrder === 'asc' ? Number(leftValue) - Number(rightValue) : Number(rightValue) - Number(leftValue);
      }

      return 0;
    });

    const start = (page - 1) * limit;
    return sorted.slice(start, start + limit).map((customer) => this.toResponse(customer));
  }

  private async getCustomers(): Promise<Customer[]> {
    return this.customerRepository.findAll();
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
