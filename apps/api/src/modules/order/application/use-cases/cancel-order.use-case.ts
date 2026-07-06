import { Order } from '../../domain/entities/order.entity';

export class CancelOrderUseCase {
  execute(order: Order): Order {
    order.cancel();
    return order;
  }
}
