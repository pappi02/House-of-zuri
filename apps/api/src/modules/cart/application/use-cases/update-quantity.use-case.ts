import { Cart } from '../../domain/entities/cart.entity';

export class UpdateQuantityUseCase {
  execute(cart: Cart, itemId: string, quantity: number): Cart {
    cart.changeQuantity(itemId, quantity);
    return cart;
  }
}
