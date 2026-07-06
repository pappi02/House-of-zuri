import { Inject, Injectable } from '@nestjs/common';
import { ManufacturingRepository } from '../../domain/repositories/manufacturing.repository';
import { WorkOrder } from '../../domain/entities/work-order.entity';
import { WorkOrderWorkflowStatus } from '../../domain/entities/manufacturing-workflow-status';

@Injectable()
export class CreateWorkOrderUseCase {
  constructor(@Inject('ManufacturingRepository') private readonly repo: ManufacturingRepository) {}

  async execute(input: {
    manufacturingJobId: string;
    orderItemId: string;
    productId: string;
    variantId?: string | null;
    assignedTailorId?: string | null;
    status?: WorkOrderWorkflowStatus;
  }): Promise<WorkOrder> {
    const order = new WorkOrder(
      input.orderItemId,
      null,
      input.manufacturingJobId,
      input.orderItemId,
      input.productId,
      input.variantId ?? null,
      input.assignedTailorId ?? null,
      input.status,
    );
    return this.repo.createWorkOrder(order);
  }
}
