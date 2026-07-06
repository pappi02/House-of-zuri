import { Order } from '../../domain/entities/order.entity';

export class ListCustomerOrdersUseCase {
  execute(customerId: string): Order[] {
    return [new Order({ customerId, currency: 'USD' })];
  }
}
