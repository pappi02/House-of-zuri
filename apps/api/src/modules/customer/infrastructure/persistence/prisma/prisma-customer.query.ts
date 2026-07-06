import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Customer } from '../../../domain/entities/customer.entity';
import { PRISMA_CLIENT } from '../../tokens/customer.tokens';
import { PrismaCustomerMapper } from './prisma-customer.mapper';

@Injectable()
export class PrismaCustomerQuery {
  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Customer | null> {
    const record = await this.prisma.customer.findUnique({ where: { id } });
    return record ? PrismaCustomerMapper.toDomain(record as any) : null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const record = await this.prisma.customer.findFirst({ where: { email } });
    return record ? PrismaCustomerMapper.toDomain(record as any) : null;
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    const record = await this.prisma.customer.findFirst({ where: { phone } });
    return record ? PrismaCustomerMapper.toDomain(record as any) : null;
  }

  async findByCustomerNumber(customerNumber: string): Promise<Customer | null> {
    const record = await this.prisma.customer.findFirst({ where: { customerNumber } as any });
    return record ? PrismaCustomerMapper.toDomain(record as any) : null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const record = await this.prisma.customer.findFirst({ where: { email } });
    return Boolean(record);
  }

  async findAll(): Promise<Customer[]> {
    const records = await this.prisma.customer.findMany();
    return records.map((record) => PrismaCustomerMapper.toDomain(record as any));
  }
}
