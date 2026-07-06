import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UnitOfWork } from '../../application/interfaces/unit-of-work';
import { CustomerTransactionCallback, CustomerTransactionClient } from '../persistence/database/customer.transaction';
import { PRISMA_CLIENT } from '../tokens/customer.tokens';

@Injectable()
export class PrismaUnitOfWork implements UnitOfWork {
  private transactionClient: CustomerTransactionClient | null = null;

  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async beginTransaction(): Promise<void> {
    this.transactionClient = await this.prisma.$transaction(async (tx) => tx as CustomerTransactionClient);
  }

  async commit(): Promise<void> {
    if (!this.transactionClient) {
      return;
    }

    this.transactionClient = null;
  }

  async rollback(): Promise<void> {
    this.transactionClient = null;
  }

  async executeInTransaction<T>(callback: CustomerTransactionCallback<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => callback(tx as CustomerTransactionClient));
  }
}
