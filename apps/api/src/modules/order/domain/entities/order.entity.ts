import { randomUUID } from 'crypto';
import { OrderNumber } from '../value-objects/order-number.vo';
import { OrderItem } from './order-item.entity';

export type OrderStatus = 'PENDING_PAYMENT' | 'PAID' | 'PROCESSING' | 'READY_FOR_FULFILLMENT' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
export type PaymentStatus = 'UNPAID' | 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';

export interface OrderProps {
  id?: string;
  orderNumber?: string;
  customerId?: string | null;
  guestEmail?: string | null;
  guestPhone?: string | null;
  status?: OrderStatus;
  currency?: string;
  subtotal?: number;
  discount?: number;
  tax?: number;
  shippingCost?: number;
  grandTotal?: number;
  paymentStatus?: PaymentStatus;
  notes?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  items?: OrderItem[];
}

export class Order {
  private readonly _items: OrderItem[];

  constructor(private readonly props: OrderProps) {
    props.id = props.id ?? randomUUID();
    this._items = props.items ?? [];
  }

  get id(): string { return this.props.id as string; }
  get orderNumber(): string { return this.props.orderNumber ?? 'ORD-000001'; }
  get customerId(): string | null | undefined { return this.props.customerId; }
  get guestEmail(): string | null | undefined { return this.props.guestEmail; }
  get guestPhone(): string | null | undefined { return this.props.guestPhone; }
  get status(): OrderStatus { return this.props.status ?? 'PENDING_PAYMENT'; }
  get paymentStatus(): PaymentStatus { return this.props.paymentStatus ?? 'UNPAID'; }
  get currency(): string { return this.props.currency ?? 'USD'; }
  get subtotal(): number { return this._items.reduce((sum, item) => sum + item.lineTotal, 0); }
  get discount(): number { return this.props.discount ?? 0; }
  get tax(): number { return this.props.tax ?? 0; }
  get shippingCost(): number { return this.props.shippingCost ?? 0; }
  get grandTotal(): number { return this.subtotal - this.discount + this.tax + this.shippingCost; }
  get items(): OrderItem[] { return this._items; }
  get notes(): string | null | undefined { return this.props.notes; }

  addItem(item: OrderItem): void {
    this._items.push(item);
  }

  cancel(): void {
    this.props.status = 'CANCELLED';
  }

  markPaid(): void {
    this.props.paymentStatus = 'PAID';
    this.props.status = 'PAID';
  }

  updateNotes(notes: string | null): void {
    this.props.notes = notes;
  }
}
