import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from '../../application/services/cart.service';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a guest cart' })
  @ApiResponse({ status: 201, description: 'Cart created.' })
  createCart() {
    return this.cartService.createCart();
  }

  @Get()
  @ApiOperation({ summary: 'Get the current cart' })
  @ApiResponse({ status: 200, description: 'Cart returned.' })
  getCart() {
    return this.cartService.getCart('guest-cart');
  }

  @Post('items')
  @ApiOperation({ summary: 'Add an item to the cart' })
  @ApiResponse({ status: 201, description: 'Item added.' })
  addItem(@Body() body: { productId: string; variantId?: string; quantity?: number; unitPrice: number; notes?: string }) {
    const cart = this.cartService.createCart();
    return this.cartService.addItem(cart, body);
  }

  @Patch('items/:id')
  @ApiOperation({ summary: 'Update item quantity' })
  @ApiResponse({ status: 200, description: 'Quantity updated.' })
  updateQuantity(@Param('id') id: string, @Body() body: { quantity: number }) {
    const cart = this.cartService.createCart();
    return this.cartService.updateQuantity(cart, id, body.quantity);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Remove an item from the cart' })
  @ApiResponse({ status: 200, description: 'Item removed.' })
  removeItem(@Param('id') id: string) {
    const cart = this.cartService.createCart();
    return this.cartService.removeItem(cart, id);
  }
}
