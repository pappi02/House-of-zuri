export interface DispatchRecordProps {
  id?: string;
  fulfillmentId: string;
  carrier?: string | null;
  trackingNumber?: string | null;
  dispatchedAt?: Date;
}

export class DispatchRecord {
  constructor(private readonly props: DispatchRecordProps) {
    if (!props.fulfillmentId) throw new Error('fulfillmentId is required');
  }

  get id(): string { return this.props.id ?? null as any; }
  get fulfillmentId(): string { return this.props.fulfillmentId; }
  get carrier(): string | null { return this.props.carrier ?? null; }
  get trackingNumber(): string | null { return this.props.trackingNumber ?? null; }
  get dispatchedAt(): Date { return this.props.dispatchedAt ?? new Date(); }
}
