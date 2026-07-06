import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FulfillmentService } from '../application/fulfillment.service';

@ApiTags('orders')
@Controller('orders')
export class OrderFulfillmentController {
  constructor(private readonly fulfillmentService: FulfillmentService) {}

  @Get(':orderNumber/fulfillment')
  @ApiOperation({ summary: 'Get fulfillment progress for an order' })
  @ApiResponse({ status: 200, description: 'Fulfillment progress returned.' })
  async getOrderFulfillment(@Param('orderNumber') orderNumber: string) {
    return this.fulfillmentService.listFulfillments(orderNumber);
  }
}
