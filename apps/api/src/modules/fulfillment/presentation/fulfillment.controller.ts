import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FulfillmentService } from '../application/fulfillment.service';
import { FulfillmentItem } from '../domain/entities/fulfillment-item.entity';

@ApiTags('admin/fulfillments')
@Controller('admin/fulfillments')
export class FulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Get()
  @ApiOperation({ summary: 'List fulfillments' })
  @ApiResponse({ status: 200, description: 'Fulfillments returned.' })
  listFulfillments() {
    return this.fulfillmentService.listFulfillments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get fulfillment details' })
  getFulfillment(@Param('id') id: string) {
    return this.fulfillmentService.getFulfillment(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new fulfillment' })
  @ApiResponse({ status: 201, description: 'Fulfillment created.' })
  createFulfillment(@Body() body: { orderId: string; items: FulfillmentItem[] }) {
    return this.fulfillmentService.createFulfillment(body.orderId, body.items);
  }

  @Patch(':id/add-item')
  addItem(@Param('id') id: string, @Body() body: { orderItemId: string; productId: string; variantId?: string | null; quantity: number }) {
    const item = new FulfillmentItem({
      orderItemId: body.orderItemId,
      productId: body.productId,
      variantId: body.variantId ?? null,
      quantity: body.quantity,
    });
    return this.fulfillmentService.addItem(id, item);
  }

  @Patch(':id/start-packing')
  startPacking(@Param('id') id: string) {
    return this.fulfillmentService.startPacking(id);
  }

  @Patch(':id/complete-packing')
  completePacking(@Param('id') id: string, @Body() body: { items: Array<{ orderItemId: string; productId: string; variantId?: string | null; quantity: number }> }) {
    return this.fulfillmentService.completePacking(id, body.items);
  }

  @Patch(':id/ready-for-dispatch')
  readyForDispatch(@Param('id') id: string) {
    return this.fulfillmentService.markReadyForDispatch(id);
  }

  @Patch(':id/dispatch')
  dispatch(@Param('id') id: string, @Body() body: { carrier?: string | null; trackingNumber?: string | null }) {
    return this.fulfillmentService.dispatchFulfillment(id, body.carrier ?? null, body.trackingNumber ?? null);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.fulfillmentService.completeFulfillment(id);
  }

  @Get(':id/packing-slips')
  @ApiOperation({ summary: 'Get packing slips for a fulfillment' })
  getPackingSlips(@Param('id') id: string) {
    return this.fulfillmentService.getPackingSlips(id);
  }

  @Get(':id/dispatch-records')
  @ApiOperation({ summary: 'Get dispatch records for a fulfillment' })
  getDispatchRecords(@Param('id') id: string) {
    return this.fulfillmentService.getDispatchRecords(id);
  }

  @Get(':id/timeline')
  @ApiOperation({ summary: 'Get timeline entries for a fulfillment' })
  getTimeline(@Param('id') id: string) {
    return this.fulfillmentService.getTimeline(id);
  }
}
