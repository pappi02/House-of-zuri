export interface FulfillmentItemProps {
  id?: string;
  orderItemId: string;
  productId: string;
  variantId?: string | null;
  quantity: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FulfillmentItem {
  constructor(private readonly props: FulfillmentItemProps) {
    if (!props.orderItemId) throw new Error('orderItemId is required');
    if (!props.productId) throw new Error('productId is required');
    if ((props.quantity ?? 0) < 1) throw new Error('quantity must be at least 1');
  }

  get id(): string { return this.props.id ?? null as any; }
  get orderItemId(): string { return this.props.orderItemId; }
  get productId(): string { return this.props.productId; }
  get variantId(): string | null { return this.props.variantId ?? null; }
  get quantity(): number { return this.props.quantity; }
  get status(): string { return this.props.status ?? 'PENDING'; }
}
