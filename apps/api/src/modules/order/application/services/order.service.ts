import { Injectable } from '@nestjs/common';
import { Cart } from '../../../cart/domain/entities/cart.entity';
import { Order } from '../../domain/entities/order.entity';
import { CreateOrderFromCartUseCase } from '../use-cases/create-order-from-cart.use-case';
import { GetOrderUseCase } from '../use-cases/get-order.use-case';
import { ListCustomerOrdersUseCase } from '../use-cases/list-customer-orders.use-case';
import { CancelOrderUseCase } from '../use-cases/cancel-order.use-case';
import { UpdateOrderNotesUseCase } from '../use-cases/update-order-notes.use-case';

@Injectable()
export class OrderService {
  constructor(
    private readonly createOrderFromCartUseCase: CreateOrderFromCartUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly listCustomerOrdersUseCase: ListCustomerOrdersUseCase,
    private readonly cancelOrderUseCase: CancelOrderUseCase,
    private readonly updateOrderNotesUseCase: UpdateOrderNotesUseCase,
  ) {}

  async createOrderFromCart(cart: Cart, input?: { customerId?: string | null; guestEmail?: string | null; guestPhone?: string | null; notes?: string | null }): Promise<Order> {
    return this.createOrderFromCartUseCase.execute(cart, input);
  }

  getOrder(idOrNumber: string): Order | null {
    return this.getOrderUseCase.execute(idOrNumber);
  }

  listCustomerOrders(customerId: string): Order[] {
    return this.listCustomerOrdersUseCase.execute(customerId);
  }

  cancelOrder(order: Order): Order {
    return this.cancelOrderUseCase.execute(order);
  }

  updateNotes(order: Order, notes: string | null): Order {
    return this.updateOrderNotesUseCase.execute(order, notes);
  }

  async getOrderTimeline(orderId: string) {
    // placeholder: timeline read should be provided by a dedicated use-case wired to OrderRepository
    return [] as any[];
  }
}
