import { Injectable, Inject } from '@nestjs/common';
import { InventoryRepository } from '../../domain/repositories/inventory.repository';
import { InventoryItem } from '../../domain/entities/inventory-item.entity';
import { StockReservation } from '../../domain/entities/stock-reservation.entity';
import { InventoryMovement } from '../../domain/entities/inventory-movement.entity';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('InventoryRepository') private readonly repo: InventoryRepository,
  ) {}

  async listInventory(): Promise<InventoryItem[]> {
    return this.repo.listInventory();
  }

  async getById(id: string): Promise<InventoryItem | null> {
    return this.repo.findById(id);
  }

  async getByVariant(productId: string, variantId: string): Promise<InventoryItem | null> {
    return this.repo.findByVariant(productId, variantId);
  }

  async receiveStock(productId: string, variantId: string, quantity: number): Promise<InventoryItem> {
    let item = await this.repo.findByVariant(productId, variantId);
    if (!item) {
      item = new InventoryItem({ productId, variantId, onHand: 0 });
      item.receive(quantity);
      return this.repo.create(item);
    }

    item.receive(quantity);
    await this.repo.appendMovement(new InventoryMovement({ inventoryItemId: item.id as string, type: 'STOCK_IN', quantity }));
    return this.repo.save(item);
  }

  async reserveStock(orderId: string, orderItemId: string, productId: string, variantId: string, quantity: number): Promise<StockReservation> {
    const item = await this.repo.findByVariant(productId, variantId);
    if (!item) throw new Error('Inventory item not found');
    item.reserve(quantity);
    const reservation = new StockReservation({ orderId, orderItemId, inventoryItemId: item.id as string, quantity });
    await this.repo.appendMovement(new InventoryMovement({ inventoryItemId: item.id as string, type: 'RESERVATION', quantity }));
    await this.repo.save(item);
    return this.repo.createReservation(reservation);
  }

  async releaseReservation(reservationId: string): Promise<void> {
    const res = await this.repo.findReservationById(reservationId);
    if (!res) throw new Error('Reservation not found');
    res.release();
    const item = await this.repo.findByVariant('', '');
    // repo implementation should load related inventory item and adjust reserved count
    await this.repo.releaseReservation(reservationId);
  }
}
