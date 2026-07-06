import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ManufacturingRepository } from '../../domain/repositories/manufacturing.repository';
import { QualityInspection } from '../../domain/entities/quality-inspection.entity';
import { TimelineEvent } from '../../domain/entities/timeline-event.entity';

@Injectable()
export class AddQualityInspectionUseCase {
  constructor(@Inject('ManufacturingRepository') private readonly repo: ManufacturingRepository) {}

  async execute(input: { workOrderId: string; status: 'PASSED' | 'FAILED'; notes?: string | null; inspectedBy?: string | null }): Promise<QualityInspection> {
    const workOrder = await this.repo.findWorkOrderById(input.workOrderId);
    if (!workOrder) throw new Error('Work order not found');

    let event: TimelineEvent;
    if (input.status === 'PASSED') {
      event = workOrder.passQualityControl();
    } else {
      event = workOrder.failQualityControl();
    }

    const inspection = new QualityInspection(
      randomUUID(),
      input.workOrderId,
      input.status,
      input.notes ?? null,
      input.inspectedBy ?? null,
      new Date(),
      new Date(),
    );

    await this.repo.addInspection(inspection);
    await this.repo.appendTimeline(event);
    await this.repo.updateWorkOrderStatus(workOrder.id, workOrder.status);

    return inspection;
  }
}
