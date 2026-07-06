import { Cart } from '../../domain/entities/cart.entity';

export class CreateCartUseCase {
  execute(input?: { customerId?: string | null; guestToken?: string | null }): Cart {
    return new Cart({
      customerId: input?.customerId ?? null,
      guestToken: input?.guestToken ?? null,
      currency: 'USD',
    });
  }
}
