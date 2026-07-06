import { Prisma, PrismaClient } from '@prisma/client';
import { Customer } from '../../../domain/entities/customer.entity';
import { CustomerRepository } from '../../../domain/repositories/customer.repository';
import { CustomerMapper } from '../mappers/customer.mapper';

export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toPrismaCreateInput(customer: Customer): Prisma.CustomerCreateInput {
    return {
      id: customer.id,
      accountId: customer.accountId ?? undefined,
      customerNumber: customer.customerNumber,
      firstName: customer.firstName,
      middleName: customer.middleName ?? undefined,
      lastName: customer.lastName,
      preferredName: customer.preferredName ?? undefined,
      email: customer.email,
      phone: customer.phone,
      isGuest: customer.isGuest,
      status: customer.status as any,
      marketingOptIn: customer.marketingOptIn,
      notes: customer.notes ?? undefined,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }

  async findById(id: string): Promise<Customer | null> {
    const record = await this.prisma.customer.findUnique({ where: { id } });
    return record ? CustomerMapper.toDomain(record as any) : null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const record = await this.prisma.customer.findFirst({ where: { email } });
    return record ? CustomerMapper.toDomain(record as any) : null;
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    const record = await this.prisma.customer.findFirst({ where: { phone } });
    return record ? CustomerMapper.toDomain(record as any) : null;
  }

  async findByCustomerNumber(number: string): Promise<Customer | null> {
    const record = await this.prisma.customer.findFirst({ where: { customerNumber: number } as any });
    return record ? CustomerMapper.toDomain(record as any) : null;
  }

  async save(customer: Customer): Promise<Customer> {
    const record = await this.prisma.customer.create({
      data: this.toPrismaCreateInput(customer),
    });

    return CustomerMapper.toDomain(record as any);
  }

  async update(customer: Customer): Promise<Customer> {
    const record = await this.prisma.customer.update({
      where: { id: customer.id },
      data: this.toPrismaCreateInput(customer),
    });

    return CustomerMapper.toDomain(record as any);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const record = await this.prisma.customer.findFirst({ where: { email } });
    return Boolean(record);
  }

  async findAll(): Promise<Customer[]> {
    const records = await this.prisma.customer.findMany();
    return records.map((record) => CustomerMapper.toDomain(record as any));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.customer.delete({ where: { id } });
  }
}
