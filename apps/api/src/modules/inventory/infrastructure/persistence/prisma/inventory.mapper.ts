import { InventoryItem } from '../../../domain/entities/inventory-item.entity';
import { StockReservation } from '../../../domain/entities/stock-reservation.entity';
import { InventoryMovement } from '../../../domain/entities/inventory-movement.entity';

export const PrismaInventoryMapper = {
  toDomainItem(row: any): InventoryItem {
    if (!row) return null as any;

    return new InventoryItem({
      id: String(row.id),
      inventoryNumber: row.inventory_number,
      productId: String(row.product_id),
      variantId: String(row.variant_id),
      sku: row.sku ?? undefined,
      onHand: Number(row.on_hand),
      reserved: Number(row.reserved),
      minimumStock: row.minimum_stock ?? undefined,
      maximumStock: row.maximum_stock ?? undefined,
      reorderLevel: row.reorder_level ?? undefined,
      status: row.status ?? 'ACTIVE',
      location: row.location ?? undefined,
      createdAt: row.created_at ? new Date(row.created_at) : undefined,
      updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
    });
  },

  toPrismaItem(item: InventoryItem): any {
    return {
      id: item.id,
      inventory_number: item.inventoryNumber,
      product_id: item.productId,
      variant_id: item.variantId,
      sku: item.sku ?? null,
      on_hand: item.onHand,
      reserved: item.reserved,
      minimum_stock: (item as any).minimumStock ?? null,
      maximum_stock: (item as any).maximumStock ?? null,
      reorder_level: (item as any).reorderLevel ?? null,
      status: (item as any).status ?? 'ACTIVE',
      location: (item as any).location ?? null,
      created_at: (item as any).createdAt ?? new Date(),
      updated_at: (item as any).updatedAt ?? new Date(),
    };
  },

  toDomainReservation(row: any): StockReservation {
    if (!row) return null as any;
    return new StockReservation({
      id: String(row.id),
      orderId: String(row.order_id),
      orderItemId: String(row.order_item_id),
      inventoryItemId: String(row.inventory_item_id),
      quantity: Number(row.quantity),
      status: row.status,
      expiresAt: row.expires_at ? new Date(row.expires_at) : null,
      createdAt: row.created_at ? new Date(row.created_at) : undefined,
    });
  },

  toDomainMovement(row: any): InventoryMovement {
    if (!row) return null as any;
    return new InventoryMovement({
      id: String(row.id),
      inventoryItemId: String(row.inventory_item_id),
      type: row.type,
      quantity: Number(row.quantity),
      reason: row.reason ?? null,
      createdAt: row.created_at ? new Date(row.created_at) : undefined,
    });
  },
};
