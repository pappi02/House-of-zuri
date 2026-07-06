import { InventoryItem } from '../entities/inventory-item.entity';
import { StockReservation } from '../entities/stock-reservation.entity';
import { InventoryMovement } from '../entities/inventory-movement.entity';

export interface InventoryRepository {
  create(item: InventoryItem): Promise<InventoryItem>;
  findById(id: string): Promise<InventoryItem | null>;
  findByVariant(productId: string, variantId: string): Promise<InventoryItem | null>;
  listInventory(): Promise<InventoryItem[]>;
  save(item: InventoryItem): Promise<InventoryItem>;
  createReservation(reservation: StockReservation): Promise<StockReservation>;
  findReservationById(id: string): Promise<StockReservation | null>;
  releaseReservation(id: string): Promise<void>;
  appendMovement(movement: InventoryMovement): Promise<InventoryMovement>;
}
