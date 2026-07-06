import { Module } from '@nestjs/common';
import { DbController } from './db.controller';
import { prisma } from './client';

@Module({
  controllers: [DbController],
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      useValue: prisma,
    },
  ],
  exports: ['PRISMA_CLIENT'],
})
export class DatabaseModule {}
