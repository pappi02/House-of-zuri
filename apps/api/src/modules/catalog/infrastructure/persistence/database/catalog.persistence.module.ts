import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../../../../database/client';
import { CATALOG_REPOSITORY, PRISMA_CLIENT } from '../../tokens/catalog.tokens';
import { PrismaCatalogRepository } from '../prisma/prisma-catalog.repository';

@Module({
  providers: [
    {
      provide: PRISMA_CLIENT,
      useValue: prisma,
    },
    {
      provide: CATALOG_REPOSITORY,
      useFactory: (prismaClient: PrismaClient) => new PrismaCatalogRepository(prismaClient),
      inject: [PRISMA_CLIENT],
    },
  ],
  exports: [CATALOG_REPOSITORY],
})
export class CatalogPersistenceModule {}
