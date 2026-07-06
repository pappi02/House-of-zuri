import { Inject, Injectable } from '@nestjs/common';
import { ManufacturingRepository } from '../../domain/repositories/manufacturing.repository';
import { WorkOrder } from '../../domain/entities/work-order.entity';

@Injectable()
export class StartCuttingUseCase {
  constructor(@Inject('ManufacturingRepository') private readonly repo: ManufacturingRepository) {}

  async execute(workOrderId: string): Promise<WorkOrder> {
    const order = await this.repo.findWorkOrderById(workOrderId);
    if (!order) throw new Error('Work order not found');
    const event = order.startCutting();
    await this.repo.appendTimeline(event);
    return this.repo.updateWorkOrderStatus(order.id, order.status);
  }
}
