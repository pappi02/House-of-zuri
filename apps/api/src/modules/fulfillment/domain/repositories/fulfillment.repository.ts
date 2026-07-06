import { DispatchRecord } from '../entities/dispatch-record.entity';
import { Fulfillment } from '../entities/fulfillment.entity';
import { PackingSlip } from '../entities/packing-slip.entity';
import { TimelineEvent } from '../entities/timeline-event.entity';

export interface FulfillmentRepository {
  createFulfillment(fulfillment: Fulfillment): Promise<Fulfillment>;
  findById(id: string): Promise<Fulfillment | null>;
  findByOrderId(orderId: string): Promise<Fulfillment[]>;
  findAll(): Promise<Fulfillment[]>;
  save(fulfillment: Fulfillment): Promise<Fulfillment>;
  appendTimeline(event: TimelineEvent): Promise<TimelineEvent>;
  createPackingSlip(slip: PackingSlip): Promise<PackingSlip>;
  createDispatchRecord(record: DispatchRecord): Promise<DispatchRecord>;
  findPackingSlipsByFulfillmentId(fulfillmentId: string): Promise<PackingSlip[]>;
  findDispatchRecordsByFulfillmentId(fulfillmentId: string): Promise<DispatchRecord[]>;
  listTimelineByFulfillmentId(fulfillmentId: string): Promise<TimelineEvent[]>;
}

export default FulfillmentRepository;
