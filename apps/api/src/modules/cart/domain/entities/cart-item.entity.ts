import { randomUUID } from 'crypto';

export interface CartItemProps {
  id?: string;
  productId: string;
  variantId?: string | null;
  quantity?: number;
  unitPrice: number;
  productType?: 'READY_MADE' | 'MADE_TO_ORDER' | 'CUSTOM';
  customMeasurementsRequired?: boolean;
  notes?: string | null;
}

export class CartItem {
  constructor(private readonly props: CartItemProps) {
    props.id = props.id ?? randomUUID();

    if (!props.productId) {
      throw new Error('Product ID is required.');
    }

    if ((props.quantity ?? 1) < 1) {
      throw new Error('Quantity must be at least 1.');
    }
  }

  get id(): string {
    return this.props.id as string;
  }

  get productId(): string {
    return this.props.productId;
  }

  get variantId(): string | null {
    return this.props.variantId ?? null;
  }

  get productType(): 'READY_MADE' | 'MADE_TO_ORDER' | 'CUSTOM' | undefined {
    return this.props.productType;
  }

  get quantity(): number {
    return this.props.quantity ?? 1;
  }

  get unitPrice(): number {
    return this.props.unitPrice;
  }

  get lineTotal(): number {
    return this.quantity * this.unitPrice;
  }

  get customMeasurementsRequired(): boolean {
    return this.props.customMeasurementsRequired ?? false;
  }

  get notes(): string | null | undefined {
    return this.props.notes;
  }

  increaseQuantity(amount = 1): void {
    this.props.quantity = (this.props.quantity ?? 1) + amount;
  }

  decreaseQuantity(amount = 1): void {
    this.props.quantity = Math.max(1, (this.props.quantity ?? 1) - amount);
  }
}
