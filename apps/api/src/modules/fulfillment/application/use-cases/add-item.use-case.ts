import { Inject, Injectable } from '@nestjs/common';
import { FulfillmentRepository } from '../../domain/repositories/fulfillment.repository';
import { FulfillmentItem } from '../../domain/entities/fulfillment-item.entity';
import { TimelineEvent } from '../../domain/entities/timeline-event.entity';

@Injectable()
export class AddItemUseCase {
  constructor(@Inject('FulfillmentRepository') private readonly repo: FulfillmentRepository) {}

  async execute(fulfillmentId: string, item: FulfillmentItem): Promise<FulfillmentItem> {
    const fulfillment = await this.repo.findById(fulfillmentId);
    if (!fulfillment) throw new Error('Fulfillment not found');
    fulfillment.addItem(item);
    await this.repo.save(fulfillment);
    const event = new TimelineEvent(`${fulfillment.id}-ev-${Date.now()}`, fulfillment.id, 'FULFILLMENT_ITEM_ADDED', { orderItemId: item.orderItemId }, new Date());
    await this.repo.appendTimeline(event);
    return item;
  }
}
