import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ManufacturingController } from './presentation/manufacturing.controller';
import { ManufacturingService } from './application/manufacturing.service';
import { PrismaManufacturingRepository } from './infrastructure/persistence/prisma/prisma-manufacturing.repository';
import { CreateManufacturingJobUseCase } from './application/use-cases/create-manufacturing-job.use-case';
import { CreateWorkOrderUseCase } from './application/use-cases/create-work-order.use-case';
import { StartCuttingUseCase } from './application/use-cases/start-cutting.use-case';
import { StartSewingUseCase } from './application/use-cases/start-sewing.use-case';
import { FinishWorkOrderUseCase } from './application/use-cases/finish-work-order.use-case';
import { AddQualityInspectionUseCase } from './application/use-cases/add-quality-inspection.use-case';
import { CaptureMeasurementsUseCase } from './application/use-cases/capture-measurements.use-case';

@Module({
  imports: [DatabaseModule],
  controllers: [ManufacturingController],
  providers: [
    ManufacturingService,
    CreateManufacturingJobUseCase,
    CreateWorkOrderUseCase,
    StartCuttingUseCase,
    StartSewingUseCase,
    FinishWorkOrderUseCase,
    AddQualityInspectionUseCase,
    CaptureMeasurementsUseCase,
    { provide: 'ManufacturingRepository', useClass: PrismaManufacturingRepository },
  ],
  exports: [ManufacturingService],
})
export class ManufacturingModule {}

export default ManufacturingModule;
