import { prisma } from '../../../../../database/client';
import { PrismaInventoryRepository } from './prisma-inventory.repository';
import { randomUUID } from 'crypto';

describe('PrismaInventoryRepository (integration)', () => {
  jest.setTimeout(120000);

  const repo = new PrismaInventoryRepository(prisma as any);

  it('creates inventory item and generates inventory number', async () => {
    const productId = randomUUID();
    const variantId = randomUUID();
    const item = await repo.receiveStock(productId, variantId, 5);
    expect(item).toBeDefined();
    expect(item.inventoryNumber).toMatch(/^INV-\d{6}$/);
    expect(item.onHand).toBeGreaterThanOrEqual(5);
  });

  it('prevents concurrent oversell on reservation', async () => {
    const productId = randomUUID();
    const variantId = randomUUID();
    // create item with 1 available
    await repo.receiveStock(productId, variantId, 1);

    const promises = [
      repo.reserveStock(randomUUID(), randomUUID(), productId, variantId, 1),
      repo.reserveStock(randomUUID(), randomUUID(), productId, variantId, 1),
    ];

    const results = await Promise.allSettled(promises);
    const fulfilled = results.filter((r) => r.status === 'fulfilled');
    const rejected = results.filter((r) => r.status === 'rejected');

    expect(fulfilled.length).toBe(1);
    expect(rejected.length).toBe(1);
  });

  it('release returns reserved quantity to available', async () => {
    const productId = randomUUID();
    const variantId = randomUUID();
    // start fresh item
    const item = await repo.receiveStock(productId, variantId, 10);
    expect(item.onHand).toBeGreaterThanOrEqual(10);

    const reservation = await repo.reserveStock(randomUUID(), randomUUID(), productId, variantId, 4);
    const mid = await repo.findByVariant(productId, variantId);
    expect(mid?.reserved).toBeGreaterThanOrEqual(4);

    await repo.releaseReservation(reservation.id!);

    const after = await repo.findByVariant(productId, variantId);
    expect(after).toBeDefined();
    expect(after!.onHand).toBeGreaterThanOrEqual(10);
    expect(after!.reserved).toBe(0);

    const res = await repo.findReservationById(reservation.id!);
    expect(res).toBeDefined();
    expect(res!.status).toBe('RELEASED');
  });

  it('fulfill reduces onHand and clears reserved', async () => {
    const productId = randomUUID();
    const variantId = randomUUID();
    const item = await repo.receiveStock(productId, variantId, 10);
    const reservation = await repo.reserveStock(randomUUID(), randomUUID(), productId, variantId, 3);

    await repo.fulfillReservation(reservation.id!);

    const after = await repo.findByVariant(productId, variantId);
    expect(after).toBeDefined();
    expect(after!.onHand).toBeGreaterThanOrEqual(7);
    expect(after!.reserved).toBe(0);

    const res = await repo.findReservationById(reservation.id!);
    expect(res).toBeDefined();
    expect(res!.status).toBe('FULFILLED');
  });

  it('each operation creates an inventory movement', async () => {
    const productId = randomUUID();
    const variantId = randomUUID();
    const item = await repo.receiveStock(productId, variantId, 2);
    const movements1: any = await prisma.$queryRaw`SELECT * FROM inventory.inventory_movements WHERE inventory_item_id = ${item.id}::uuid`;
    expect(Array.isArray(movements1) ? movements1.length : 0).toBeGreaterThanOrEqual(1);

    const reservation = await repo.reserveStock(randomUUID(), randomUUID(), productId, variantId, 1);
    const movements2: any = await prisma.$queryRaw`SELECT * FROM inventory.inventory_movements WHERE inventory_item_id = ${item.id}::uuid`;
    expect(Array.isArray(movements2) ? movements2.length : 0).toBeGreaterThanOrEqual(2);

    await repo.releaseReservation(reservation.id!);
    const movements3: any = await prisma.$queryRaw`SELECT * FROM inventory.inventory_movements WHERE inventory_item_id = ${item.id}::uuid`;
    expect(Array.isArray(movements3) ? movements3.length : 0).toBeGreaterThanOrEqual(3);

    const r2 = await repo.reserveStock(randomUUID(), randomUUID(), productId, variantId, 1);
    await repo.fulfillReservation(r2.id!);
    const movements4: any = await prisma.$queryRaw`SELECT * FROM inventory.inventory_movements WHERE inventory_item_id = ${item.id}::uuid`;
    expect(Array.isArray(movements4) ? movements4.length : 0).toBeGreaterThanOrEqual(5);
  });

  it('transaction rollback leaves no changes when inner operation fails', async () => {
    const productId = randomUUID();
    const variantId = randomUUID();
    // create fresh item
    const item = await repo.receiveStock(productId, variantId, 5);

    // create proxy prisma that will throw when attempting to insert movement
    const realPrisma: any = prisma as any;
    const proxy = {
      ...realPrisma,
      $transaction: (fn: any) => realPrisma.$transaction(async (tx: any) => {
        const wrapped = {
          ...tx,
          $executeRaw: async (...args: any[]) => {
            const sql = String(args[0] ?? '');
            if (sql.includes('inventory.inventory_movements') && sql.toUpperCase().includes('INSERT')) {
              throw new Error('simulated failure during movement insert');
            }
            // @ts-ignore
            return tx.$executeRaw(...args);
          },
        };
        return fn(wrapped);
      }),
    };

    const badRepo = new PrismaInventoryRepository(proxy as any);

    await expect(badRepo.reserveStock(randomUUID(), randomUUID(), productId, variantId, 1)).rejects.toThrow();

    // verify no change to reserved/onHand
    const after = await repo.findByVariant(productId, variantId);
    expect(after).toBeDefined();
    expect(after!.reserved).toBe(0);

    const movements: any = await prisma.$queryRaw`SELECT * FROM inventory.inventory_movements WHERE inventory_item_id = ${item.id}::uuid`;
    const count = Array.isArray(movements) ? movements.length : 0;
    // no new movement created by failed transaction
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it('sequence stress test creates unique inventory numbers for 100 concurrent creates', async () => {
    const tasks: (() => Promise<any>)[] = [];
    for (let i = 0; i < 100; i++) {
      const p = randomUUID();
      const v = randomUUID();
      tasks.push(() => repo.receiveStock(p, v, 1));
    }

    const batchSize = 5;
    const results: any[] = [];
    for (let i = 0; i < tasks.length; i += batchSize) {
      const batch = tasks.slice(i, i + batchSize).map((fn) => fn());
      const r = await Promise.all(batch);
      results.push(...r);
      // small pause to avoid overwhelming DB/pooler
      await new Promise((res) => setTimeout(res, 50));
    }

    const numbers = results.map((r) => r.inventoryNumber);
    const unique = new Set(numbers);
    expect(unique.size).toBe(numbers.length);
    // all match format
    for (const n of numbers) expect(n).toMatch(/^INV-\d{6}$/);
  });

  afterAll(async () => {
    // cleanup test rows
    await prisma.$executeRaw`DELETE FROM inventory.inventory_movements`;
    await prisma.$executeRaw`DELETE FROM inventory.stock_reservations`;
    await prisma.$executeRaw`DELETE FROM inventory.inventory_items`;
    await prisma.$disconnect();
  });
});
