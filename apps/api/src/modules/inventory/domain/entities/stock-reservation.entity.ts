export interface StockReservationProps {
  id?: string;
  orderId: string;
  orderItemId: string;
  inventoryItemId: string;
  quantity: number;
  status?: 'ACTIVE' | 'RELEASED' | 'FULFILLED' | 'EXPIRED';
  expiresAt?: Date | null;
  createdAt?: Date;
}

export class StockReservation {
  private props: StockReservationProps;

  constructor(props: StockReservationProps) {
    this.props = {
      ...props,
      status: props.status ?? 'ACTIVE',
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id(): string | undefined { return this.props.id; }
  get orderId(): string { return this.props.orderId; }
  get orderItemId(): string { return this.props.orderItemId; }
  get inventoryItemId(): string { return this.props.inventoryItemId; }
  get quantity(): number { return this.props.quantity; }
  get status(): string { return this.props.status ?? 'ACTIVE'; }

  release(): void {
    if (this.props.status !== 'ACTIVE') return;
    this.props.status = 'RELEASED';
  }

  fulfill(): void {
    if (this.props.status !== 'ACTIVE') return;
    this.props.status = 'FULFILLED';
  }
}
