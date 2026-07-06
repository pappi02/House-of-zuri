import { Module } from '@nestjs/common';
import { InventoryController } from './presentation/controllers/inventory.controller';
import { InventoryService } from './application/services/inventory.service';
import { PrismaInventoryRepository } from './infrastructure/persistence/prisma/prisma-inventory.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InventoryController],
  providers: [
    InventoryService,
    {
      provide: 'InventoryRepository',
      useClass: PrismaInventoryRepository,
    },
  ],
  exports: [InventoryService],
})
export class InventoryModule {}
