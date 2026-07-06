import { Inject, Injectable } from '@nestjs/common';
import { FulfillmentRepository } from '../../domain/repositories/fulfillment.repository';
import { TimelineEvent } from '../../domain/entities/timeline-event.entity';

@Injectable()
export class MarkReadyForDispatchUseCase {
  constructor(@Inject('FulfillmentRepository') private readonly repo: FulfillmentRepository) {}

  async execute(fulfillmentId: string): Promise<void> {
    const fulfillment = await this.repo.findById(fulfillmentId);
    if (!fulfillment) throw new Error('Fulfillment not found');
    const event = fulfillment.markReadyForDispatch();
    await this.repo.save(fulfillment);
    await this.repo.appendTimeline(event);
  }
}
