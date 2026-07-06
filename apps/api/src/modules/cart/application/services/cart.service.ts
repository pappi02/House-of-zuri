import { Injectable } from '@nestjs/common';
import { Cart } from '../../domain/entities/cart.entity';
import { CartItem } from '../../domain/entities/cart-item.entity';
import { CreateCartUseCase } from '../use-cases/create-cart.use-case';
import { GetCartUseCase } from '../use-cases/get-cart.use-case';
import { AddItemUseCase } from '../use-cases/add-item.use-case';
import { UpdateQuantityUseCase } from '../use-cases/update-quantity.use-case';
import { RemoveItemUseCase } from '../use-cases/remove-item.use-case';

@Injectable()
export class CartService {
  constructor(
    private readonly createCartUseCase: CreateCartUseCase,
    private readonly getCartUseCase: GetCartUseCase,
    private readonly addItemUseCase: AddItemUseCase,
    private readonly updateQuantityUseCase: UpdateQuantityUseCase,
    private readonly removeItemUseCase: RemoveItemUseCase,
  ) {}

  createCart(input?: { customerId?: string | null; guestToken?: string | null }): Cart {
    return this.createCartUseCase.execute(input);
  }

  getCart(id: string): Cart | null {
    return this.getCartUseCase.execute(id);
  }

  addItem(cart: Cart, input: { productId: string; variantId?: string | null; quantity?: number; unitPrice: number; notes?: string | null }): Cart {
    return this.addItemUseCase.execute(cart, input);
  }

  updateQuantity(cart: Cart, itemId: string, quantity: number): Cart {
    return this.updateQuantityUseCase.execute(cart, itemId, quantity);
  }

  removeItem(cart: Cart, itemId: string): Cart {
    return this.removeItemUseCase.execute(cart, itemId);
  }
}
