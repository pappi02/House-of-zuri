import { Provider } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../../../database/client';
import { CUSTOMER_REPOSITORY, CUSTOMER_NUMBER_GENERATOR, CLOCK, UNIT_OF_WORK, PRISMA_CLIENT } from '../tokens/customer.tokens';
import { PrismaCustomerRepository } from '../persistence/prisma/prisma-customer.repository';
import { PrismaCustomerQuery } from '../persistence/prisma/prisma-customer.query';
import { PrismaCustomerCommand } from '../persistence/prisma/prisma-customer.command';
import { PostgresCustomerNumberGenerator } from '../services/postgres-customer-number-generator';
import { SystemClockService } from '../services/system-clock.service';
import { PrismaUnitOfWork } from '../services/prisma-unit-of-work';

export const customerProviders: Provider[] = [
  {
    provide: PRISMA_CLIENT,
    useValue: prisma,
  },
  {
    provide: CUSTOMER_REPOSITORY,
    useFactory: (prismaClient: PrismaClient, query: PrismaCustomerQuery, command: PrismaCustomerCommand) =>
      new PrismaCustomerRepository(prismaClient, query, command),
    inject: [PRISMA_CLIENT, PrismaCustomerQuery, PrismaCustomerCommand],
  },
  PrismaCustomerQuery,
  PrismaCustomerCommand,
  {
    provide: CUSTOMER_NUMBER_GENERATOR,
    useClass: PostgresCustomerNumberGenerator,
  },
  {
    provide: CLOCK,
    useClass: SystemClockService,
  },
  {
    provide: UNIT_OF_WORK,
    useClass: PrismaUnitOfWork,
  },
];
