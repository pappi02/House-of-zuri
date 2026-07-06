import { Controller, Get, Param, Post, Body, Inject } from '@nestjs/common';
import { InventoryService } from '../../application/services/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly svc: InventoryService) {}

  @Get()
  async listInventory() {
    return this.svc.listInventory();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.svc.getById(id);
  }

  @Get('variants/:productId/:variantId')
  async getByVariant(@Param('productId') productId: string, @Param('variantId') variantId: string) {
    return this.svc.getByVariant(productId, variantId);
  }

  @Post('receive')
  async receive(@Body() body: { productId: string; variantId: string; quantity: number }) {
    return this.svc.receiveStock(body.productId, body.variantId, body.quantity);
  }

  @Post('reserve')
  async reserve(@Body() body: { orderId: string; orderItemId: string; productId: string; variantId: string; quantity: number }) {
    return this.svc.reserveStock(body.orderId, body.orderItemId, body.productId, body.variantId, body.quantity);
  }
}
