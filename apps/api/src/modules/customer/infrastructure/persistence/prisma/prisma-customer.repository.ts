import { Inject, Injectable, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { Customer } from '../../../domain/entities/customer.entity';
import { DuplicateCustomerException } from '../../../domain/exceptions/duplicate-customer.exception';
import { CustomerRepository } from '../../../domain/repositories/customer.repository';
import { PRISMA_CLIENT } from '../../tokens/customer.tokens';
import { PrismaCustomerCommand } from './prisma-customer.command';
import { PrismaCustomerQuery } from './prisma-customer.query';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  private readonly logger = new Logger(PrismaCustomerRepository.name);

  constructor(
    @Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient,
    private readonly query: PrismaCustomerQuery,
    private readonly command: PrismaCustomerCommand,
  ) {}

  async findById(id: string): Promise<Customer | null> {
    return this.withLogging('findById', () => this.query.findById(id));
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.withLogging('findByEmail', () => this.query.findByEmail(email));
  }

  async findByPhone(phone: string): Promise<Customer | null> {
    return this.withLogging('findByPhone', () => this.query.findByPhone(phone));
  }

  async findByCustomerNumber(number: string): Promise<Customer | null> {
    return this.withLogging('findByCustomerNumber', () => this.query.findByCustomerNumber(number));
  }

  async save(customer: Customer): Promise<Customer> {
    return this.withLogging('save', () => this.command.save(customer));
  }

  async update(customer: Customer): Promise<Customer> {
    return this.withLogging('update', () => this.command.update(customer));
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.withLogging('existsByEmail', () => this.query.existsByEmail(email));
  }

  async findAll(): Promise<Customer[]> {
    return this.withLogging('findAll', () => this.query.findAll());
  }

  async delete(id: string): Promise<void> {
    return this.withLogging('delete', () => this.command.delete(id));
  }

  private async withLogging<T>(operation: string, work: () => Promise<T>): Promise<T> {
    const startedAt = Date.now();

    try {
      const result = await work();
      this.logger.debug(`Repository: CustomerRepository | Operation: ${operation} | Duration: ${Date.now() - startedAt}ms`);
      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new DuplicateCustomerException('duplicate customer');
      }

      this.logger.error(`Repository: CustomerRepository | Operation: ${operation} failed | Error: ${error}`);
      throw error;
    }
  }
}
