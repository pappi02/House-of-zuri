export interface InventoryItemProps {
  id?: string;
  inventoryNumber?: string;
  productId: string;
  variantId: string;
  sku?: string;
  onHand?: number;
  reserved?: number;
  minimumStock?: number;
  maximumStock?: number;
  reorderLevel?: number;
  status?: 'ACTIVE' | 'OUT_OF_STOCK' | 'LOW_STOCK' | 'DISCONTINUED';
  location?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class InventoryItem {
  private props: InventoryItemProps;

  constructor(props: InventoryItemProps) {
    this.props = {
      ...props,
      onHand: props.onHand ?? 0,
      reserved: props.reserved ?? 0,
      status: props.status ?? 'ACTIVE',
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id(): string | undefined { return this.props.id; }
  get inventoryNumber(): string { return this.props.inventoryNumber ?? 'INV-000001'; }
  get productId(): string { return this.props.productId; }
  get variantId(): string { return this.props.variantId; }
  get sku(): string | undefined { return this.props.sku; }
  get onHand(): number { return this.props.onHand ?? 0; }
  get reserved(): number { return this.props.reserved ?? 0; }
  get available(): number { return Math.max(0, this.onHand - this.reserved); }

  receive(quantity: number): void {
    if (quantity < 0) throw new Error('Quantity must be positive');
    this.props.onHand = (this.props.onHand ?? 0) + quantity;
    this.touch();
  }

  reserve(quantity: number): void {
    if (quantity < 1) throw new Error('Quantity must be at least 1');
    if (quantity > this.available) throw new Error('Insufficient available stock');
    this.props.reserved = (this.props.reserved ?? 0) + quantity;
    this.touch();
  }

  release(quantity: number): void {
    if (quantity < 1) throw new Error('Quantity must be at least 1');
    this.props.reserved = Math.max(0, (this.props.reserved ?? 0) - quantity);
    this.touch();
  }

  adjust(delta: number): void {
    const newOnHand = (this.props.onHand ?? 0) + delta;
    if (newOnHand < 0) throw new Error('On-hand stock cannot be negative');
    this.props.onHand = newOnHand;
    this.touch();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
    // update status
    if (this.onHand <= 0) this.props.status = 'OUT_OF_STOCK';
    else if (this.onHand <= (this.props.reorderLevel ?? 0)) this.props.status = 'LOW_STOCK';
    else this.props.status = 'ACTIVE';
  }
}
