import { Cart } from '../../domain/entities/cart.entity';
import { CartItem } from '../../domain/entities/cart-item.entity';

export class AddItemUseCase {
  execute(cart: Cart, input: { productId: string; variantId?: string | null; quantity?: number; unitPrice: number; notes?: string | null }): Cart {
    cart.addItem(
      new CartItem({
        id: `item-${Date.now()}`,
        productId: input.productId,
        variantId: input.variantId ?? null,
        quantity: input.quantity ?? 1,
        unitPrice: input.unitPrice,
        notes: input.notes ?? null,
      }),
    );

    return cart;
  }
}
