import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Order } from '../../../domain/entities/order.entity';
import { TimelineEvent } from '../../../domain/entities/timeline-event.entity';
import { OrderRepository } from '../../../domain/repositories/order.repository';
import { randomUUID } from 'crypto';

export class PrismaOrderRepository implements OrderRepository {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}

  private mapOrderRow(row: any): Order {
    return new Order({
      id: row.id,
      orderNumber: row.order_number,
      customerId: row.customer_id,
      guestEmail: row.guest_email,
      guestPhone: row.guest_phone,
      status: row.status,
      notes: row.notes,
      currency: row.currency,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  async findById(id: string): Promise<Order | null> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM orders.orders WHERE id = ${id}::uuid`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return row ? this.mapOrderRow(row) : null;
  }

  async findByOrderNumber(orderNumber: string): Promise<Order | null> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM orders.orders WHERE order_number = ${orderNumber}`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return row ? this.mapOrderRow(row) : null;
  }

  async listAdminOrders(options: { page: number; pageSize: number; search?: string; status?: string; customerId?: string; startDate?: string; endDate?: string; sortBy?: string; sortDir?: 'asc' | 'desc' }): Promise<{ items: Order[]; total: number }> {
    const { page, pageSize, search, status, customerId, startDate, endDate, sortBy, sortDir } = options;
    const offset = (page - 1) * pageSize;

    const whereClauses: string[] = [];
    const params: any[] = [];

    if (search) {
      whereClauses.push(`(order_number ILIKE '%' || $${params.length + 1} || '%' OR notes ILIKE '%' || $${params.length + 1} || '%')`);
      params.push(search);
    }

    if (status) {
      whereClauses.push(`status = $${params.length + 1}`);
      params.push(status);
    }

    if (customerId) {
      whereClauses.push(`customer_id = $${params.length + 1}::uuid`);
      params.push(customerId);
    }

    if (startDate) {
      whereClauses.push(`created_at >= $${params.length + 1}::timestamptz`);
      params.push(startDate);
    }

    if (endDate) {
      whereClauses.push(`created_at <= $${params.length + 1}::timestamptz`);
      params.push(endDate);
    }

    const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
    const orderSql = sortBy ? `ORDER BY ${sortBy} ${sortDir === 'asc' ? 'ASC' : 'DESC'}` : 'ORDER BY created_at DESC';

    const countQuery = `SELECT COUNT(*) as cnt FROM orders.orders ${whereSql}`;
    const countRows: any = await this.prisma.$queryRawUnsafe(countQuery, ...params);
    const total = Number(Array.isArray(countRows) ? countRows[0].cnt : countRows.cnt) || 0;

    const dataQuery = `SELECT * FROM orders.orders ${whereSql} ${orderSql} LIMIT ${pageSize} OFFSET ${offset}`;
    const dataRows: any = await this.prisma.$queryRawUnsafe(dataQuery, ...params);
    const rows = Array.isArray(dataRows) ? dataRows : dataRows ? [dataRows] : [];
    const items = rows.filter(Boolean).map((r: any) => this.mapOrderRow(r));

    return { items, total };
  }

  async appendTimeline(event: TimelineEvent): Promise<TimelineEvent> {
    const id = event.id ?? randomUUID();
    await this.prisma.$executeRaw`INSERT INTO orders.order_timelines (id, order_id, event, metadata, created_at) VALUES (${id}::uuid, ${event.orderId}::uuid, ${event.event}, ${event.metadata ?? null}, ${event.createdAt})`;
    return new TimelineEvent(id, event.orderId, event.event, event.metadata, event.createdAt);
  }

  async listTimelineByOrderId(orderId: string): Promise<TimelineEvent[]> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM orders.order_timelines WHERE order_id = ${orderId}::uuid ORDER BY created_at ASC`;
    const data = Array.isArray(rows) ? rows : rows ? [rows] : [];
    return data.filter(Boolean).map((r: any) => new TimelineEvent(r.id, r.order_id, r.event, r.metadata, r.created_at));
  }
}
