import { randomUUID } from 'crypto';

export type FulfillmentType = 'INVENTORY' | 'PRODUCTION';
export type ProductType = 'READY_MADE' | 'MADE_TO_ORDER' | 'CUSTOM';

export interface OrderItemProps {
  id?: string;
  productId: string;
  variantId?: string | null;
  productName: string;
  variantName?: string | null;
  sku?: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal?: number;
  productType?: ProductType;
  fulfillmentType?: FulfillmentType;
  requiresMeasurements?: boolean;
}

export class OrderItem {
  constructor(private readonly props: OrderItemProps) {
    props.id = props.id ?? randomUUID();

    if (!props.productId) throw new Error('Product ID is required.');
    if (!props.productName) throw new Error('Product name is required.');
    if ((props.quantity ?? 0) < 1) throw new Error('Quantity must be at least 1.');
  }

  get id(): string { return this.props.id as string; }
  get productId(): string { return this.props.productId; }
  get variantId(): string | null { return this.props.variantId ?? null; }
  get productName(): string { return this.props.productName; }
  get variantName(): string | null | undefined { return this.props.variantName; }
  get sku(): string | null | undefined { return this.props.sku; }
  get quantity(): number { return this.props.quantity; }
  get unitPrice(): number { return this.props.unitPrice; }
  get lineTotal(): number { return this.props.lineTotal ?? this.quantity * this.unitPrice; }
  get productType(): ProductType | undefined { return this.props.productType; }
  get fulfillmentType(): FulfillmentType { return this.props.fulfillmentType ?? this.defaultFulfillmentType(); }
  get requiresMeasurements(): boolean { return this.props.requiresMeasurements ?? false; }

  private defaultFulfillmentType(): FulfillmentType {
    return this.props.productType === 'READY_MADE' ? 'INVENTORY' : 'PRODUCTION';
  }
}
