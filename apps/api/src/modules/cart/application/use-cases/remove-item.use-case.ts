import { Cart } from '../../domain/entities/cart.entity';

export class RemoveItemUseCase {
  execute(cart: Cart, itemId: string): Cart {
    cart.removeItem(itemId);
    return cart;
  }
}
