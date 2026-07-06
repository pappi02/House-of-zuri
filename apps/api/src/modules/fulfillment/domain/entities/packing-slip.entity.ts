export interface PackingSlipProps {
  id?: string;
  fulfillmentId: string;
  slipNumber?: string | null;
  items: Array<{ orderItemId: string; productId: string; variantId?: string | null; quantity: number }>;
  generatedAt?: Date;
}

export class PackingSlip {
  constructor(private readonly props: PackingSlipProps) {
    if (!props.fulfillmentId) throw new Error('fulfillmentId is required');
    if (!props.items || props.items.length === 0) throw new Error('items are required');
  }

  get id(): string { return this.props.id ?? null as any; }
  get fulfillmentId(): string { return this.props.fulfillmentId; }
  get slipNumber(): string | null { return this.props.slipNumber ?? null; }
  get items(): Array<{ orderItemId: string; productId: string; variantId?: string | null; quantity: number }> { return this.props.items; }
  get generatedAt(): Date { return this.props.generatedAt ?? new Date(); }
}
