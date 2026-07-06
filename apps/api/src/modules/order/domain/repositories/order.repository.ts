import { Order } from '../entities/order.entity';
import { TimelineEvent } from '../entities/timeline-event.entity';

export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  findByOrderNumber(orderNumber: string): Promise<Order | null>;
  listAdminOrders(options: { page: number; pageSize: number; search?: string; status?: string; customerId?: string; startDate?: string; endDate?: string; sortBy?: string; sortDir?: 'asc' | 'desc' }): Promise<{ items: Order[]; total: number }>;
  appendTimeline(event: TimelineEvent): Promise<TimelineEvent>;
  listTimelineByOrderId(orderId: string): Promise<TimelineEvent[]>;
}

export default OrderRepository;
