import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ManufacturingRepository } from '../../domain/repositories/manufacturing.repository';
import { MeasurementSnapshot } from '../../domain/entities/measurement-snapshot.entity';
import { TimelineEvent } from '../../domain/entities/timeline-event.entity';

@Injectable()
export class CaptureMeasurementsUseCase {
  constructor(@Inject('ManufacturingRepository') private readonly repo: ManufacturingRepository) {}

  async execute(input: {
    workOrderId: string;
    bust?: number | null;
    waist?: number | null;
    hip?: number | null;
    shoulder?: number | null;
    sleeve?: number | null;
    height?: number | null;
    inseam?: number | null;
    notes?: string | null;
  }): Promise<MeasurementSnapshot> {
    const workOrder = await this.repo.findWorkOrderById(input.workOrderId);
    if (!workOrder) {
      throw new Error('Work order not found');
    }

    const snapshot = new MeasurementSnapshot(
      randomUUID(),
      input.workOrderId,
      input.bust ?? null,
      input.waist ?? null,
      input.hip ?? null,
      input.shoulder ?? null,
      input.sleeve ?? null,
      input.height ?? null,
      input.inseam ?? null,
      input.notes ?? null,
      new Date(),
    );

    const savedSnapshot = await this.repo.addMeasurement(snapshot);
    const timeline = new TimelineEvent(
      randomUUID(),
      input.workOrderId,
      'MEASUREMENTS_CAPTURED',
      {
        measurements: {
          bust: input.bust,
          waist: input.waist,
          hip: input.hip,
          shoulder: input.shoulder,
          sleeve: input.sleeve,
          height: input.height,
          inseam: input.inseam,
        },
      },
      new Date(),
    );

    await this.repo.appendTimeline(timeline);
    workOrder.verifyMeasurements();
    await this.repo.updateWorkOrderStatus(workOrder.id, workOrder.status);

    return savedSnapshot;
  }
}
