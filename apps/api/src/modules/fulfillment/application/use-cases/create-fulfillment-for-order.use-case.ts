import { Inject, Injectable } from '@nestjs/common';
import { FulfillmentRepository } from '../../domain/repositories/fulfillment.repository';
import { FulfillmentItem } from '../../domain/entities/fulfillment-item.entity';
import { Fulfillment } from '../../domain/entities/fulfillment.entity';
import { TimelineEvent } from '../../domain/entities/timeline-event.entity';

@Injectable()
export class CreateFulfillmentForOrderUseCase {
  constructor(@Inject('FulfillmentRepository') private readonly repo: FulfillmentRepository) {}

  async execute(orderId: string, items: FulfillmentItem[]): Promise<Fulfillment> {
    const fulfillment = new Fulfillment({ orderId, items });
    const created = await this.repo.createFulfillment(fulfillment);
    await this.repo.appendTimeline(new TimelineEvent(`${created.id}-ev-${Date.now()}`, created.id, 'FULFILLMENT_CREATED', { orderId }, new Date()));
    return created;
  }
}
