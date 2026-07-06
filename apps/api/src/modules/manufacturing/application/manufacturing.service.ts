import { Inject, Injectable } from '@nestjs/common';
import { ManufacturingRepository } from '../domain/repositories/manufacturing.repository';
import { ManufacturingJob } from '../domain/entities/manufacturing-job.entity';
import { WorkOrder } from '../domain/entities/work-order.entity';
import { WorkOrderWorkflowStatus } from '../domain/entities/manufacturing-workflow-status';
import { CreateManufacturingJobUseCase } from './use-cases/create-manufacturing-job.use-case';
import { CreateWorkOrderUseCase } from './use-cases/create-work-order.use-case';
import { StartCuttingUseCase } from './use-cases/start-cutting.use-case';
import { StartSewingUseCase } from './use-cases/start-sewing.use-case';
import { FinishWorkOrderUseCase } from './use-cases/finish-work-order.use-case';
import { AddQualityInspectionUseCase } from './use-cases/add-quality-inspection.use-case';
import { CaptureMeasurementsUseCase } from './use-cases/capture-measurements.use-case';

@Injectable()
export class ManufacturingService {
  constructor(
    @Inject('ManufacturingRepository') private readonly repo: ManufacturingRepository,
    private readonly createManufacturingJobUseCase: CreateManufacturingJobUseCase,
    private readonly createWorkOrderUseCase: CreateWorkOrderUseCase,
    private readonly startCuttingUseCase: StartCuttingUseCase,
    private readonly startSewingUseCase: StartSewingUseCase,
    private readonly finishWorkOrderUseCase: FinishWorkOrderUseCase,
    private readonly addQualityInspectionUseCase: AddQualityInspectionUseCase,
    private readonly captureMeasurementsUseCase: CaptureMeasurementsUseCase,
  ) {}

  async createJob(orderId: string, priority?: number): Promise<ManufacturingJob> {
    return this.createManufacturingJobUseCase.execute({ orderId, priority });
  }

  async createWorkOrder(input: {
    manufacturingJobId: string;
    orderItemId: string;
    productId: string;
    variantId?: string | null;
    assignedTailorId?: string | null;
    status?: WorkOrderWorkflowStatus;
  }): Promise<WorkOrder> {
    return this.createWorkOrderUseCase.execute(input);
  }

  async listJobs(orderId?: string) {
    return this.repo.listJobsByOrder(orderId ?? '');
  }

  async getJob(id: string) {
    return this.repo.findJobById(id);
  }

  async getWorkOrder(id: string) {
    return this.repo.findWorkOrderById(id);
  }

  async startCutting(id: string) {
    return this.startCuttingUseCase.execute(id);
  }

  async captureMeasurements(input: {
    workOrderId: string;
    bust?: number | null;
    waist?: number | null;
    hip?: number | null;
    shoulder?: number | null;
    sleeve?: number | null;
    height?: number | null;
    inseam?: number | null;
    notes?: string | null;
  }) {
    return this.captureMeasurementsUseCase.execute(input);
  }

  async startSewing(id: string) {
    return this.startSewingUseCase.execute(id);
  }

  async finishWorkOrder(id: string) {
    return this.finishWorkOrderUseCase.execute(id);
  }

  async addQualityInspection(input: { workOrderId: string; status: 'PASSED' | 'FAILED'; notes?: string | null; inspectedBy?: string | null }) {
    return this.addQualityInspectionUseCase.execute(input);
  }
}

export default ManufacturingService;
