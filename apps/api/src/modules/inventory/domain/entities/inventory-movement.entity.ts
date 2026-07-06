export type MovementType = 'STOCK_IN' | 'SALE' | 'RESERVATION' | 'RESERVATION_RELEASE' | 'ADJUSTMENT' | 'RETURN' | 'DAMAGE';

export interface InventoryMovementProps {
  id?: string;
  inventoryItemId: string;
  type: MovementType;
  quantity: number;
  reason?: string | null;
  createdAt?: Date;
}

export class InventoryMovement {
  constructor(private readonly props: InventoryMovementProps) {}

  get inventoryItemId(): string { return this.props.inventoryItemId; }
  get type(): MovementType { return this.props.type; }
  get quantity(): number { return this.props.quantity; }
  get reason(): string | null | undefined { return this.props.reason; }
  get createdAt(): Date | undefined { return this.props.createdAt; }
}
