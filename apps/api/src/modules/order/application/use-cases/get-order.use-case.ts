import { Order } from '../../domain/entities/order.entity';

export class GetOrderUseCase {
  execute(idOrNumber: string): Order | null {
    return new Order({ id: idOrNumber, orderNumber: idOrNumber, currency: 'USD' });
  }
}
