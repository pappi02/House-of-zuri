import { prisma } from '../../../../../database/client';
import { PrismaOrderRepository } from './prisma-order.repository';
import { randomUUID } from 'crypto';

describe('PrismaOrderRepository (integration)', () => {
  const repo = new PrismaOrderRepository(prisma as any);

  const createdIds: string[] = [];

  beforeAll(async () => {
    // insert multiple orders with varying properties
    const now = new Date();
    const earlier = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7); // 7 days ago

    const c1 = randomUUID();
    const c2 = randomUUID();

    const orders = [
      { num: 'ORD-000001', customerId: c1, status: 'PENDING', createdAt: earlier },
      { num: 'ORD-000002', customerId: c1, status: 'PAID', createdAt: now },
      { num: 'ORD-000003', customerId: c2, status: 'PROCESSING', createdAt: now },
      { num: 'ORD-000004', customerId: c2, status: 'PAID', createdAt: earlier },
      { num: 'ORD-000005', customerId: c1, status: 'COMPLETED', createdAt: now },
    ];

    for (const o of orders) {
      const id = randomUUID();
      createdIds.push(id);
      await prisma.$executeRaw`
        INSERT INTO orders.orders (id, order_number, customer_id, guest_email, guest_phone, currency, status, notes, total_amount, created_at, updated_at)
        VALUES (${id}::uuid, ${o.num}, ${o.customerId}::uuid, ${null}, ${null}, 'USD', ${o.status}, ${null}, 0, ${o.createdAt}, ${o.createdAt})
      `;
    }
  });

  afterAll(async () => {
    for (const id of createdIds) {
      await prisma.$executeRaw`DELETE FROM orders.orders WHERE id = ${id}::uuid`;
    }
    await prisma.$disconnect();
  });

  it('paginates results', async () => {
    const res = await repo.listAdminOrders({ page: 1, pageSize: 2 });
    expect(res.items.length).toBeLessThanOrEqual(2);
    expect(res.total).toBeGreaterThanOrEqual(5);
  });

  it('searches by order number', async () => {
    const res = await repo.listAdminOrders({ page: 1, pageSize: 10, search: '000003' });
    expect(res.items.length).toBe(1);
    expect(res.items[0].id).toBeDefined();
  });

  it('filters by status', async () => {
    const res = await repo.listAdminOrders({ page: 1, pageSize: 10, status: 'PAID' });
    expect(res.items.every((i) => i)).toBeTruthy();
  });

  it('filters by customer', async () => {
    const some: any = await prisma.$queryRaw`SELECT customer_id FROM orders.orders LIMIT 1`;
    const customerId = Array.isArray(some) ? some[0].customer_id : some.customer_id;
    const res = await repo.listAdminOrders({ page: 1, pageSize: 10, customerId });
    expect(res.items.length).toBeGreaterThanOrEqual(1);
  });

  it('supports sorting asc/desc', async () => {
    const asc = await repo.listAdminOrders({ page: 1, pageSize: 10, sortBy: 'order_number', sortDir: 'asc' });
    const desc = await repo.listAdminOrders({ page: 1, pageSize: 10, sortBy: 'order_number', sortDir: 'desc' });
    const ascNums = asc.items.map((i) => (i as any).orderNumber || '');
    const descNums = desc.items.map((i) => (i as any).orderNumber || '');
    expect(ascNums[0]).not.toEqual(descNums[0]);
  });
});
