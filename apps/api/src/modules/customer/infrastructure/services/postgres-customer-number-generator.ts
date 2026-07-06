import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomerNumberGenerator } from '../../application/interfaces/customer-number-generator';
import { PRISMA_CLIENT } from '../tokens/customer.tokens';
import { CUSTOMER_NUMBER_SEQUENCE, formatCustomerNumber } from '../persistence/database/customer.sequence';

@Injectable()
export class PostgresCustomerNumberGenerator implements CustomerNumberGenerator {
  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async generate(): Promise<string> {
    const [row] = await this.prisma.$queryRawUnsafe<Array<{ nextval: bigint }>>(
      `SELECT nextval('${CUSTOMER_NUMBER_SEQUENCE}') as nextval`,
    );

    const value = row?.nextval ?? 0n;
    return formatCustomerNumber(value);
  }
}
