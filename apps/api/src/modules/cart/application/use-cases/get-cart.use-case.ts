import { Cart } from '../../domain/entities/cart.entity';

export class GetCartUseCase {
  execute(id: string): Cart | null {
    return new Cart({ id, currency: 'USD' });
  }
}
