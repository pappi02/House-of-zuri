import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from '../../../cart/domain/entities/cart.entity';
import { OrderService } from '../../application/services/order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create an order from a cart' })
  @ApiResponse({ status: 201, description: 'Order created.' })
  async createOrder(@Body() body: { cart: Cart; customerId?: string; guestEmail?: string; guestPhone?: string; notes?: string }) {
    return this.orderService.createOrderFromCart(body.cart, {
      customerId: body.customerId,
      guestEmail: body.guestEmail,
      guestPhone: body.guestPhone,
      notes: body.notes,
    });
  }

  @Get()
  @ApiOperation({ summary: 'List orders for the current customer' })
  @ApiResponse({ status: 200, description: 'Orders returned.' })
  listOrders() {
    return this.orderService.listCustomerOrders('customer-1');
  }

  @Get(':orderNumber')
  @ApiOperation({ summary: 'Get an order by number' })
  @ApiResponse({ status: 200, description: 'Order returned.' })
  getOrder(@Param('orderNumber') orderNumber: string) {
    return this.orderService.getOrder(orderNumber);
  }

  @Patch(':id/notes')
  @ApiOperation({ summary: 'Update order notes' })
  @ApiResponse({ status: 200, description: 'Notes updated.' })
  updateNotes(@Param('id') id: string, @Body() body: { notes: string | null }) {
    const order = this.orderService.getOrder(id);
    return order ? this.orderService.updateNotes(order, body.notes) : null;
  }
}
