import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InventoryRepository } from '../../../domain/repositories/inventory.repository';
import { InventoryItem } from '../../../domain/entities/inventory-item.entity';
import { StockReservation } from '../../../domain/entities/stock-reservation.entity';
import { InventoryMovement } from '../../../domain/entities/inventory-movement.entity';
import { PrismaInventoryMapper } from './inventory.mapper';

export class PrismaInventoryRepository implements InventoryRepository {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: any) {}

  private formatNumber(n: number) {
    return `INV-${String(n).padStart(6, '0')}`;
  }

  async createInventoryItem(item: InventoryItem): Promise<InventoryItem> {
    const id = item.id ?? randomUUID();

    const result = await this.prisma.$transaction(async (tx: any) => {
      const seq: any = await tx.$queryRaw`SELECT nextval('inventory.inventory_number_seq') as n`;
      const n = Array.isArray(seq) ? seq[0].n : seq.n;
      const inventoryNumber = this.formatNumber(Number(n));

      const rows = await tx.$queryRaw`
        INSERT INTO inventory.inventory_items (id, inventory_number, product_id, variant_id, sku, on_hand, reserved, minimum_stock, maximum_stock, reorder_level, status, location, created_at, updated_at)
        VALUES (${id}::uuid, ${inventoryNumber}, ${item.productId}::uuid, ${item.variantId}::uuid, ${item.sku ?? null}, ${item.onHand}, ${item.reserved}, ${null}, ${null}, ${null}, ${'ACTIVE'}, ${null}, ${new Date()}, ${new Date()})
        RETURNING *
      `;

      return Array.isArray(rows) ? rows[0] : rows;
    });

    const row = Array.isArray(result) ? result[0] : result;
    return PrismaInventoryMapper.toDomainItem(row);
  }

  // Interface compatibility methods
  async create(item: InventoryItem): Promise<InventoryItem> {
    return this.createInventoryItem(item);
  }

  async findById(id: string): Promise<InventoryItem | null> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM inventory.inventory_items WHERE id = ${id}::uuid`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return row ? PrismaInventoryMapper.toDomainItem(row) : null;
  }

  async findByVariant(productId: string, variantId: string): Promise<InventoryItem | null> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM inventory.inventory_items WHERE product_id = ${productId}::uuid AND variant_id = ${variantId}::uuid`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return row ? PrismaInventoryMapper.toDomainItem(row) : null;
  }

  async save(item: InventoryItem): Promise<InventoryItem> {
    // simple save via update by id
    if (!item.id) throw new Error('Cannot save item without id');
    await this.prisma.$executeRaw`
      UPDATE inventory.inventory_items SET sku = ${item.sku ?? null}, on_hand = ${item.onHand}, reserved = ${item.reserved}, updated_at = ${new Date()} WHERE id = ${item.id}::uuid
    `;
    const rows = await this.prisma.$queryRaw`SELECT * FROM inventory.inventory_items WHERE id = ${item.id}::uuid`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return PrismaInventoryMapper.toDomainItem(row);
  }

  async receiveStock(productId: string, variantId: string, quantity: number): Promise<InventoryItem> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM inventory.inventory_items WHERE product_id = ${productId}::uuid AND variant_id = ${variantId}::uuid LIMIT 1`;
    const row = Array.isArray(rows) ? rows[0] : rows;

    if (!row) {
      const seq: any = await this.prisma.$queryRaw`SELECT nextval('inventory.inventory_number_seq') as n`;
      const n = Array.isArray(seq) ? seq[0].n : seq.n;
      const inventoryNumber = this.formatNumber(Number(n));
      const id = randomUUID();

      const insertedRows = await this.prisma.$queryRaw`
        INSERT INTO inventory.inventory_items (id, inventory_number, product_id, variant_id, on_hand, reserved, status, created_at, updated_at)
          VALUES (${id}::uuid, ${inventoryNumber}, ${productId}::uuid, ${variantId}::uuid, ${quantity}, 0, ${'ACTIVE'}, ${new Date()}, ${new Date()})
        RETURNING *
      `;

      const created = Array.isArray(insertedRows) ? insertedRows[0] : insertedRows;

      await this.prisma.$executeRaw`
        INSERT INTO inventory.inventory_movements (id, inventory_item_id, type, quantity, reason, created_at)
        VALUES (${randomUUID()}::uuid, ${id}::uuid, ${'STOCK_IN'}, ${quantity}, ${null}, ${new Date()})
      `;

      return PrismaInventoryMapper.toDomainItem(created);
    }

    const newOnHand = Number(row.on_hand) + quantity;
    await this.prisma.$executeRaw`
      UPDATE inventory.inventory_items SET on_hand = ${newOnHand}, updated_at = ${new Date()} WHERE id = ${row.id}::uuid
    `;

    await this.prisma.$executeRaw`
      INSERT INTO inventory.inventory_movements (id, inventory_item_id, type, quantity, reason, created_at)
      VALUES (${randomUUID()}::uuid, ${row.id}::uuid, ${'STOCK_IN'}, ${quantity}, ${null}, ${new Date()})
    `;

    const updatedRows = await this.prisma.$queryRaw`SELECT * FROM inventory.inventory_items WHERE id = ${row.id}::uuid`;
    const updated = Array.isArray(updatedRows) ? updatedRows[0] : updatedRows;
    return PrismaInventoryMapper.toDomainItem(updated);
  }

  async reserveStock(orderId: string, orderItemId: string, productId: string, variantId: string, quantity: number): Promise<StockReservation> {
    const result = await this.prisma.$transaction(async (tx: any) => {
      const rows = await tx.$queryRaw`SELECT * FROM inventory.inventory_items WHERE product_id = ${productId}::uuid AND variant_id = ${variantId}::uuid FOR UPDATE`;
      const row = Array.isArray(rows) ? rows[0] : rows;
      if (!row) throw new Error('Inventory item not found');

      const available = Number(row.on_hand) - Number(row.reserved);
      if (available < quantity) throw new Error('Insufficient available stock');

      const newReserved = Number(row.reserved) + quantity;
      await tx.$executeRaw`
        UPDATE inventory.inventory_items SET reserved = ${newReserved}, updated_at = ${new Date()} WHERE id = ${row.id}::uuid
      `;

      const reservationId = randomUUID();
      await tx.$executeRaw`
        INSERT INTO inventory.stock_reservations (id, order_id, order_item_id, inventory_item_id, quantity, status, created_at)
        VALUES (${reservationId}::uuid, ${orderId}::uuid, ${orderItemId}::uuid, ${row.id}::uuid, ${quantity}, ${'ACTIVE'}, ${new Date()})
      `;

        await tx.$executeRaw`
          INSERT INTO inventory.inventory_movements (id, inventory_item_id, type, quantity, reason, created_at)
          VALUES (${randomUUID()}::uuid, ${row.id}::uuid, ${'RESERVATION'}, ${quantity}, ${null}, ${new Date()})
        `;

      return (await tx.$queryRaw`SELECT * FROM inventory.stock_reservations WHERE id = ${reservationId}::uuid`)[0];
    });

    const row = Array.isArray(result) ? result[0] : result;
    return PrismaInventoryMapper.toDomainReservation(row);
  }

  async createReservation(reservation: StockReservation): Promise<StockReservation> {
    // Create reservation without altering inventory counts (used when inventory already updated)
    const id = reservation.id ?? randomUUID();
    await this.prisma.$executeRaw`
      INSERT INTO inventory.stock_reservations (id, order_id, order_item_id, inventory_item_id, quantity, status, created_at)
      VALUES (${id}::uuid, ${reservation.orderId}::uuid, ${reservation.orderItemId}::uuid, ${reservation.inventoryItemId}::uuid, ${reservation.quantity}, ${reservation.status ?? 'ACTIVE'}, ${new Date()})
    `;
    const row = (await this.prisma.$queryRaw`SELECT * FROM inventory.stock_reservations WHERE id = ${id}::uuid`)[0];
    return PrismaInventoryMapper.toDomainReservation(row);
  }

  async findReservationById(id: string): Promise<StockReservation | null> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM inventory.stock_reservations WHERE id = ${id}::uuid`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return row ? PrismaInventoryMapper.toDomainReservation(row) : null;
  }

  async releaseReservation(id: string): Promise<void> {
    await this.prisma.$transaction(async (tx: any) => {
      const resRows = await tx.$queryRaw`SELECT * FROM inventory.stock_reservations WHERE id = ${id}::uuid FOR UPDATE`;
      const res = Array.isArray(resRows) ? resRows[0] : resRows;
      if (!res) throw new Error('Reservation not found');
      if (res.status !== 'ACTIVE') return;

      const itemRows = await tx.$queryRaw`SELECT * FROM inventory.inventory_items WHERE id = ${res.inventory_item_id}::uuid FOR UPDATE`;
      const item = Array.isArray(itemRows) ? itemRows[0] : itemRows;
      if (!item) throw new Error('Inventory item not found');

      const newReserved = Math.max(0, Number(item.reserved) - Number(res.quantity));
      await tx.$executeRaw`
        UPDATE inventory.inventory_items SET reserved = ${newReserved}, updated_at = ${new Date()} WHERE id = ${item.id}::uuid
      `;

      await tx.$executeRaw`
        UPDATE inventory.stock_reservations SET status = ${'RELEASED'} WHERE id = ${id}::uuid
      `;

      await tx.$executeRaw`
        INSERT INTO inventory.inventory_movements (id, inventory_item_id, type, quantity, reason, created_at)
        VALUES (${randomUUID()}::uuid, ${item.id}::uuid, ${'RESERVATION_RELEASE'}, ${res.quantity}, ${null}, ${new Date()})
      `;
    });
  }

  async fulfillReservation(id: string): Promise<void> {
    await this.prisma.$transaction(async (tx: any) => {
      const resRows = await tx.$queryRaw`SELECT * FROM inventory.stock_reservations WHERE id = ${id}::uuid FOR UPDATE`;
      const res = Array.isArray(resRows) ? resRows[0] : resRows;
      if (!res) throw new Error('Reservation not found');
      if (res.status !== 'ACTIVE') return;

      const itemRows = await tx.$queryRaw`SELECT * FROM inventory.inventory_items WHERE id = ${res.inventory_item_id}::uuid FOR UPDATE`;
      const item = Array.isArray(itemRows) ? itemRows[0] : itemRows;
      if (!item) throw new Error('Inventory item not found');

      const newReserved = Math.max(0, Number(item.reserved) - Number(res.quantity));
      const newOnHand = Math.max(0, Number(item.on_hand) - Number(res.quantity));

      await tx.$executeRaw`
        UPDATE inventory.inventory_items SET reserved = ${newReserved}, on_hand = ${newOnHand}, updated_at = ${new Date()} WHERE id = ${item.id}::uuid
      `;

      await tx.$executeRaw`
        UPDATE inventory.stock_reservations SET status = ${'FULFILLED'} WHERE id = ${id}::uuid
      `;

      await tx.$executeRaw`
        INSERT INTO inventory.inventory_movements (id, inventory_item_id, type, quantity, reason, created_at)
        VALUES (${randomUUID()}::uuid, ${item.id}::uuid, ${'SALE'}, ${res.quantity}, ${null}, ${new Date()})
      `;
    });
  }

  async adjustStock(productId: string, variantId: string, delta: number, reason?: string): Promise<InventoryItem> {
    const result = await this.prisma.$transaction(async (tx: any) => {
      const rows = await tx.$queryRaw`SELECT * FROM inventory.inventory_items WHERE product_id = ${productId}::uuid AND variant_id = ${variantId}::uuid FOR UPDATE`;
      const row = Array.isArray(rows) ? rows[0] : rows;
      if (!row) throw new Error('Inventory item not found');

      const newOnHand = Number(row.on_hand) + delta;
      if (newOnHand < 0) throw new Error('On-hand stock cannot be negative');

      await tx.$executeRaw`
        UPDATE inventory.inventory_items SET on_hand = ${newOnHand}, updated_at = ${new Date()} WHERE id = ${row.id}::uuid
      `;

      await tx.$executeRaw`
        INSERT INTO inventory.inventory_movements (id, inventory_item_id, type, quantity, reason, created_at)
        VALUES (${randomUUID()}::uuid, ${row.id}::uuid, ${'ADJUSTMENT'}, ${delta}, ${reason ?? null}, ${new Date()})
      `;

      return (await tx.$queryRaw`SELECT * FROM inventory.inventory_items WHERE id = ${row.id}::uuid`)[0];
    });

    const r = Array.isArray(result) ? result[0] : result;
    return PrismaInventoryMapper.toDomainItem(r);
  }

  async appendMovement(movement: InventoryMovement): Promise<InventoryMovement> {
    const id = (movement as any).id ?? randomUUID();
    await this.prisma.$executeRaw`
      INSERT INTO inventory.inventory_movements (id, inventory_item_id, type, quantity, reason, created_at)
      VALUES (${id}::uuid, ${movement.inventoryItemId}::uuid, ${movement.type}, ${movement.quantity}, ${movement.reason ?? null}, ${new Date()})
    `;
    const row = (await this.prisma.$queryRaw`SELECT * FROM inventory.inventory_movements WHERE id = ${id}::uuid`)[0];
    return PrismaInventoryMapper.toDomainMovement(row);
  }

  async listInventory(): Promise<InventoryItem[]> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM inventory.inventory_items ORDER BY created_at DESC`;
    const arr = Array.isArray(rows) ? rows : [rows];
    return arr.map((r: any) => PrismaInventoryMapper.toDomainItem(r));
  }
}
