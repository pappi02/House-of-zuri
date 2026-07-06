import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Customer } from '../../../domain/entities/customer.entity';
import { PRISMA_CLIENT } from '../../tokens/customer.tokens';
import { PrismaCustomerMapper } from './prisma-customer.mapper';

@Injectable()
export class PrismaCustomerCommand {
  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async save(customer: Customer): Promise<Customer> {
    const record = await this.prisma.customer.create({
      data: PrismaCustomerMapper.toPersistence(customer),
    });

    return PrismaCustomerMapper.toDomain(record as any);
  }

  async update(customer: Customer): Promise<Customer> {
    const record = await this.prisma.customer.update({
      where: { id: customer.id },
      data: PrismaCustomerMapper.toPersistence(customer),
    });

    return PrismaCustomerMapper.toDomain(record as any);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.customer.delete({ where: { id } });
  }
}
