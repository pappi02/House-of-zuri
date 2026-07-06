import { randomUUID } from 'crypto';
import { FulfillmentStatus, FULFILLMENT_INITIAL_STATUS } from './fulfillment-status';
import { FulfillmentItem } from './fulfillment-item.entity';
import { TimelineEvent } from './timeline-event.entity';

export interface FulfillmentProps {
  id?: string;
  orderId: string;
  status?: FulfillmentStatus;
  createdAt?: Date;
  updatedAt?: Date;
  items?: FulfillmentItem[];
  packingSlipId?: string | null;
  dispatchRecordId?: string | null;
}

export class Fulfillment {
  private _status: FulfillmentStatus;
  private readonly _items: FulfillmentItem[];
  public packingSlipId?: string | null;
  public dispatchRecordId?: string | null;

  constructor(private readonly props: FulfillmentProps) {
    props.id = props.id ?? randomUUID();
    this._status = props.status ?? FULFILLMENT_INITIAL_STATUS;
    this._items = props.items ?? [];
    this.packingSlipId = props.packingSlipId ?? null;
    this.dispatchRecordId = props.dispatchRecordId ?? null;
  }

  get id(): string { return this.props.id as string; }
  get orderId(): string { return this.props.orderId; }
  get status(): FulfillmentStatus { return this._status; }
  get items(): FulfillmentItem[] { return this._items; }
  get createdAt(): Date { return this.props.createdAt ?? new Date(); }
  get updatedAt(): Date { return this.props.updatedAt ?? new Date(); }

  addItem(item: FulfillmentItem): void {
    if (this._status !== 'CREATED' && this._status !== 'WAITING_FOR_ITEMS') {
      throw new Error('Cannot add item after fulfillment has started');
    }
    this._items.push(item);
    if (this._status === 'CREATED') {
      this._status = 'WAITING_FOR_ITEMS';
    }
  }

  markReadyToPack(): TimelineEvent {
    if (this._status !== 'WAITING_FOR_ITEMS') {
      throw new Error(`Cannot mark ready to pack from ${this._status}`);
    }
    if (this._items.length === 0) {
      throw new Error('Fulfillment has no items');
    }
    this._status = 'READY_TO_PACK';
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'READY_TO_PACK', null, new Date());
  }

  startPacking(): TimelineEvent {
    if (this._status !== 'READY_TO_PACK') {
      throw new Error(`Cannot start packing from ${this._status}`);
    }
    this._status = 'PACKING';
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'PACKING_STARTED', null, new Date());
  }

  completePacking(packingSlipId: string): [TimelineEvent, string] {
    if (this._status !== 'PACKING') {
      throw new Error(`Cannot complete packing from ${this._status}`);
    }
    this._status = 'PACKED';
    this.packingSlipId = packingSlipId;
    return [new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'PACKING_COMPLETED', { packingSlipId }, new Date()), packingSlipId];
  }

  markReadyForDispatch(): TimelineEvent {
    if (this._status !== 'PACKED') {
      throw new Error(`Cannot mark ready for dispatch from ${this._status}`);
    }
    this._status = 'READY_FOR_DISPATCH';
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'READY_FOR_DISPATCH', null, new Date());
  }

  dispatch(recordId: string): TimelineEvent {
    if (this._status !== 'READY_FOR_DISPATCH') {
      throw new Error(`Cannot dispatch from ${this._status}`);
    }
    this._status = 'DISPATCHED';
    this.dispatchRecordId = recordId;
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'DISPATCHED', { dispatchRecordId: recordId }, new Date());
  }

  complete(): TimelineEvent {
    if (this._status !== 'DISPATCHED') {
      throw new Error(`Cannot complete fulfillment from ${this._status}`);
    }
    this._status = 'COMPLETED';
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'FULFILLMENT_COMPLETED', null, new Date());
  }

  cancel(): TimelineEvent {
    if (this._status === 'CANCELLED' || this._status === 'COMPLETED') {
      throw new Error(`Cannot cancel fulfillment from ${this._status}`);
    }
    this._status = 'CANCELLED';
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'FULFILLMENT_CANCELLED', null, new Date());
  }
}
