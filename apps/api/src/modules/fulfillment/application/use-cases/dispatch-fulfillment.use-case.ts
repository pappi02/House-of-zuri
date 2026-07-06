import { Inject, Injectable } from '@nestjs/common';
import { FulfillmentRepository } from '../../domain/repositories/fulfillment.repository';
import { DispatchRecord } from '../../domain/entities/dispatch-record.entity';
import { TimelineEvent } from '../../domain/entities/timeline-event.entity';

@Injectable()
export class DispatchFulfillmentUseCase {
  constructor(@Inject('FulfillmentRepository') private readonly repo: FulfillmentRepository) {}

  async execute(fulfillmentId: string, carrier?: string | null, trackingNumber?: string | null): Promise<void> {
    const fulfillment = await this.repo.findById(fulfillmentId);
    if (!fulfillment) throw new Error('Fulfillment not found');
    const record = new DispatchRecord({ fulfillmentId, carrier, trackingNumber });
    const created = await this.repo.createDispatchRecord(record);
    const event = fulfillment.dispatch(created.id);
    await this.repo.save(fulfillment);
    await this.repo.appendTimeline(event);
  }
}
