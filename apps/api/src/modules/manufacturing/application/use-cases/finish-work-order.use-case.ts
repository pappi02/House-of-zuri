import { Inject, Injectable } from '@nestjs/common';
import { ManufacturingRepository } from '../../domain/repositories/manufacturing.repository';
import { WorkOrder } from '../../domain/entities/work-order.entity';

@Injectable()
export class FinishWorkOrderUseCase {
  constructor(@Inject('ManufacturingRepository') private readonly repo: ManufacturingRepository) {}

  async execute(workOrderId: string): Promise<WorkOrder> {
    const order = await this.repo.findWorkOrderById(workOrderId);
    if (!order) throw new Error('Work order not found');

    let event;
    switch (order.status) {
      case 'CUTTING':
        event = order.completeCutting();
        break;
      case 'SEWING':
        event = order.completeSewing();
        break;
      case 'FINISHING':
        event = order.completeFinishing();
        break;
      default:
        throw new Error(`Work order cannot be finished from status ${order.status}`);
    }

    await this.repo.appendTimeline(event);
    return this.repo.updateWorkOrderStatus(order.id, order.status);
  }
}
