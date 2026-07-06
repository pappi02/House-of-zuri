import { Fulfillment } from '../../../domain/entities/fulfillment.entity';
import { FulfillmentItem } from '../../../domain/entities/fulfillment-item.entity';
import { PackingSlip } from '../../../domain/entities/packing-slip.entity';
import { DispatchRecord } from '../../../domain/entities/dispatch-record.entity';
import { TimelineEvent } from '../../../domain/entities/timeline-event.entity';

export const PrismaFulfillmentMapper = {
  toDomainFulfillment(row: any, items: any[] = []): Fulfillment {
    return new Fulfillment({
      id: row.id,
      orderId: row.order_id,
      status: row.status,
      packingSlipId: row.packing_slip_id,
      dispatchRecordId: row.dispatch_record_id,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      items: items.map((itemRow) => this.toDomainFulfillmentItem(itemRow)),
    });
  },

  toDomainFulfillmentItem(row: any): FulfillmentItem {
    return new FulfillmentItem({
      id: row.id,
      orderItemId: row.order_item_id,
      productId: row.product_id,
      variantId: row.variant_id,
      quantity: row.quantity,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  },

  toDomainPackingSlip(row: any): PackingSlip {
    return new PackingSlip({
      id: row.id,
      fulfillmentId: row.fulfillment_id,
      slipNumber: row.slip_number,
      items: row.items,
      generatedAt: row.generated_at,
    });
  },

  toDomainDispatchRecord(row: any): DispatchRecord {
    return new DispatchRecord({
      id: row.id,
      fulfillmentId: row.fulfillment_id,
      carrier: row.carrier,
      trackingNumber: row.tracking_number,
      dispatchedAt: row.dispatched_at,
    });
  },

  toDomainTimeline(row: any): TimelineEvent {
    return new TimelineEvent(row.id, row.fulfillment_id, row.event, row.metadata, row.created_at);
  },
};
