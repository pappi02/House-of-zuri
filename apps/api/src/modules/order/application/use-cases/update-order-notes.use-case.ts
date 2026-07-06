import { Order } from '../../domain/entities/order.entity';

export class UpdateOrderNotesUseCase {
  execute(order: Order, notes: string | null): Order {
    order.updateNotes(notes);
    return order;
  }
}
