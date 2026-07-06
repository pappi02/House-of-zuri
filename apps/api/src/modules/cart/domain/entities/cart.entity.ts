import { CartNumber } from '../value-objects/cart-number.vo';
import { CartItem } from './cart-item.entity';

export type CartStatus = 'ACTIVE' | 'CHECKED_OUT' | 'ABANDONED' | 'EXPIRED';

export interface CartProps {
  id?: string;
  cartNumber?: string;
  customerId?: string | null;
  guestToken?: string | null;
  status?: CartStatus;
  currency?: string;
  subtotal?: number;
  discount?: number;
  tax?: number;
  total?: number;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: Date | null;
  items?: CartItem[];
}

export class Cart {
  private readonly _items: CartItem[];

  constructor(private readonly props: CartProps) {
    this._items = props.items ?? [];
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get cartNumber(): string {
    return this.props.cartNumber ?? 'CRT-000001';
  }

  get customerId(): string | null | undefined {
    return this.props.customerId;
  }

  get guestToken(): string | null | undefined {
    return this.props.guestToken;
  }

  get status(): CartStatus {
    return this.props.status ?? 'ACTIVE';
  }

  get currency(): string {
    return this.props.currency ?? 'USD';
  }

  get subtotal(): number {
    return this._items.reduce((sum, item) => sum + item.lineTotal, 0);
  }

  get discount(): number {
    return this.props.discount ?? 0;
  }

  get tax(): number {
    return this.props.tax ?? 0;
  }

  get total(): number {
    return this.subtotal - this.discount + this.tax;
  }

  get items(): CartItem[] {
    return this._items;
  }

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(itemId: string): void {
    const index = this._items.findIndex((item) => item.id === itemId);
    if (index >= 0) {
      this._items.splice(index, 1);
    }
  }

  changeQuantity(itemId: string, quantity: number): void {
    const item = this._items.find((candidate) => candidate.id === itemId);
    if (!item) {
      throw new Error('Cart item not found.');
    }

    if (quantity < 1) {
      throw new Error('Quantity must be at least 1.');
    }

    item.increaseQuantity(quantity - item.quantity);
  }

  clear(): void {
    this._items.splice(0, this._items.length);
  }

  merge(other: Cart): Cart {
    other.items.forEach((item) => this.addItem(item));
    return this;
  }

  expire(): void {
    this.props.status = 'EXPIRED';
  }

  checkout(): void {
    this.props.status = 'CHECKED_OUT';
  }
}
