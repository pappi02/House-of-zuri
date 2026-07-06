import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable()
export class ListAdminOrdersUseCase {
  constructor(@Inject('OrderRepository') private readonly repo: OrderRepository) {}

  async execute(opts: { page?: number; pageSize?: number; search?: string; status?: string; customerId?: string; startDate?: string; endDate?: string; sortBy?: string; sortDir?: 'asc' | 'desc' }) {
    const page = opts.page && opts.page > 0 ? opts.page : 1;
    const pageSize = opts.pageSize && opts.pageSize > 0 ? opts.pageSize : 20;
    const res = await this.repo.listAdminOrders({ page, pageSize, search: opts.search, status: opts.status, customerId: opts.customerId, startDate: opts.startDate, endDate: opts.endDate, sortBy: opts.sortBy, sortDir: opts.sortDir });
    const totalItems = res.total;
    const totalPages = Math.ceil(totalItems / pageSize);
    return { items: res.items, page, pageSize, totalItems, totalPages };
  }
}
