import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Cart } from '../../../cart/domain/entities/cart.entity';
import { Order } from '../../domain/entities/order.entity';
import { OrderItem } from '../../domain/entities/order-item.entity';
import { InventoryService } from '../../../inventory/application/services/inventory.service';
import { ManufacturingService } from '../../../manufacturing/application/manufacturing.service';

@Injectable()
export class CreateOrderFromCartUseCase {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly manufacturingService: ManufacturingService,
  ) {}

  async execute(cart: Cart, input?: { customerId?: string | null; guestEmail?: string | null; guestPhone?: string | null; notes?: string | null }): Promise<Order> {
    const order = new Order({
      id: randomUUID(),
      customerId: input?.customerId ?? null,
      guestEmail: input?.guestEmail ?? null,
      guestPhone: input?.guestPhone ?? null,
      notes: input?.notes ?? null,
      currency: cart.currency,
    });

    cart.items.forEach((item) => {
      const productType = item.productType ?? (item.customMeasurementsRequired ? 'CUSTOM' : 'READY_MADE');

      order.addItem(
        new OrderItem({
          id: item.id,
          productId: item.productId,
          variantId: item.variantId ?? null,
          productName: `Product ${item.productId}`,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          productType,
          requiresMeasurements: item.customMeasurementsRequired ?? false,
        }),
      );
    });

    const inventoryItems = order.items.filter((item) => item.productType === 'READY_MADE');
    const productionItems = order.items.filter((item) => item.productType !== 'READY_MADE');

    if (inventoryItems.length) {
      await Promise.all(
        inventoryItems.map((item) => {
          const variantId = item.variantId;
          if (!variantId) {
            throw new Error('Variant ID is required for inventory reservation.');
          }
          return this.inventoryService.reserveStock(order.id, item.id, item.productId, variantId, item.quantity);
        }),
      );
    }

    if (productionItems.length) {
      const manufacturingJob = await this.manufacturingService.createJob(order.id);
      await Promise.all(
        productionItems.map((item) =>
          this.manufacturingService.createWorkOrder({
            manufacturingJobId: manufacturingJob.id,
            orderItemId: item.id,
            productId: item.productId,
            variantId: item.variantId ?? null,
            assignedTailorId: null,
            status: item.productType === 'CUSTOM' ? 'WAITING_FOR_MEASUREMENTS' : 'READY_TO_START',
          }),
        ),
      );
    }

    return order;
  }
}
