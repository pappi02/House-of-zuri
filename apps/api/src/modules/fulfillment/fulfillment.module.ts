import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { FulfillmentController } from './presentation/fulfillment.controller';
import { FulfillmentService } from './application/fulfillment.service';
import { CreateFulfillmentUseCase } from './application/use-cases/create-fulfillment.use-case';
import { AddItemUseCase } from './application/use-cases/add-item.use-case';
import { VerifyReadinessUseCase } from './application/use-cases/verify-readiness.use-case';
import { StartPackingUseCase } from './application/use-cases/start-packing.use-case';
import { CompletePackingUseCase } from './application/use-cases/complete-packing.use-case';
import { MarkReadyForDispatchUseCase } from './application/use-cases/mark-ready-for-dispatch.use-case';
import { DispatchFulfillmentUseCase } from './application/use-cases/dispatch-fulfillment.use-case';
import { CompleteFulfillmentUseCase } from './application/use-cases/complete-fulfillment.use-case';
import { PrismaFulfillmentRepository } from './infrastructure/persistence/prisma/prisma-fulfillment.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [FulfillmentController],
  providers: [
    FulfillmentService,
    CreateFulfillmentUseCase,
    AddItemUseCase,
    VerifyReadinessUseCase,
    StartPackingUseCase,
    CompletePackingUseCase,
    MarkReadyForDispatchUseCase,
    DispatchFulfillmentUseCase,
    CompleteFulfillmentUseCase,
    { provide: 'FulfillmentRepository', useClass: PrismaFulfillmentRepository },
  ],
  exports: [FulfillmentService],
})
export class FulfillmentModule {}
