import { Inject, Injectable } from '@nestjs/common';
import { FulfillmentRepository } from '../../domain/repositories/fulfillment.repository';
import { PackingSlip } from '../../domain/entities/packing-slip.entity';
import { TimelineEvent } from '../../domain/entities/timeline-event.entity';

@Injectable()
export class CompletePackingUseCase {
  constructor(@Inject('FulfillmentRepository') private readonly repo: FulfillmentRepository) {}

  async execute(fulfillmentId: string, items: Array<{ orderItemId: string; productId: string; variantId?: string | null; quantity: number }>): Promise<void> {
    const fulfillment = await this.repo.findById(fulfillmentId);
    if (!fulfillment) throw new Error('Fulfillment not found');
    const slip = new PackingSlip({ fulfillmentId, items });
    const createdSlip = await this.repo.createPackingSlip(slip);
    const [event] = fulfillment.completePacking(createdSlip.id);
    await this.repo.save(fulfillment);
    await this.repo.appendTimeline(event);
  }
}
