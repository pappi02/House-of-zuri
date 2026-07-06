import { prisma } from '../../../../../database/client';
import { PrismaManufacturingRepository } from './prisma-manufacturing.repository';
import { randomUUID } from 'crypto';
import { ManufacturingJob } from '../../../domain/entities/manufacturing-job.entity';
import { WorkOrder } from '../../../domain/entities/work-order.entity';

describe('PrismaManufacturingRepository (integration)', () => {
  const repo = new PrismaManufacturingRepository(prisma as any);

  it('creates manufacturing job with multiple work orders atomically', async () => {
    const orderId = randomUUID();
    const jobId = randomUUID();
    const job = new ManufacturingJob(jobId, null, orderId, 'CREATED');

    const wo1 = new WorkOrder(randomUUID(), null, jobId, randomUUID(), randomUUID(), randomUUID());
    const wo2 = new WorkOrder(randomUUID(), null, jobId, randomUUID(), randomUUID(), randomUUID());

    // create job row
    const created = await repo.createJob(job);
    expect(created).toBeDefined();
    expect(created.jobNumber).toMatch(/^JOB-\d{6}$/);

    const createdWo1 = await repo.createWorkOrder(wo1);
    const createdWo2 = await repo.createWorkOrder(wo2);
    expect(createdWo1.workOrderNumber).toMatch(/^WO-\d{6}$/);
    expect(createdWo2.workOrderNumber).toMatch(/^WO-\d{6}$/);

    // timeline entries exist
    const timelines: any = await prisma.$queryRaw`SELECT * FROM manufacturing.timeline WHERE work_order_id = ${createdWo1.id}::uuid`;
    expect(Array.isArray(timelines) ? timelines.length : 0).toBeGreaterThanOrEqual(1);
  });

  it('sequence generation produces unique numbers', async () => {
    const tasks: Promise<any>[] = [];
    for (let i = 0; i < 20; i++) {
      const jobId = randomUUID();
      const orderId = randomUUID();
      const job = new ManufacturingJob(jobId, null, orderId, 'CREATED');
      tasks.push(repo.createJob(job));
    }
    const results = await Promise.all(tasks);
    const numbers = results.map((r) => r.jobNumber);
    const unique = new Set(numbers);
    expect(unique.size).toBe(numbers.length);
  });

  it('transaction rollback when failure occurs during work order creation', async () => {
    const orderId = randomUUID();
    const jobId = randomUUID();
    const job = new ManufacturingJob(jobId, null, orderId, 'CREATED');

    // proxy prisma that throws when inserting into work_orders
    const realPrisma: any = prisma as any;
    const proxy = {
      ...realPrisma,
      $transaction: (fn: any) => realPrisma.$transaction(async (tx: any) => {
        const wrapped = {
          ...tx,
          $executeRaw: async (...args: any[]) => {
            const sql = String(args[0] ?? '');
            if (sql.includes('manufacturing.work_orders') && sql.toUpperCase().includes('INSERT')) {
              throw new Error('simulated failure during work_order insert');
            }
            // @ts-ignore
            return tx.$executeRaw(...args);
          },
        };
        return fn(wrapped);
      }),
    };

    const badRepo = new PrismaManufacturingRepository(proxy as any);

    await expect(badRepo.createJob(job)).rejects.toThrow();

    const check = await repo.listJobsByOrder(orderId);
    expect(check.length).toBe(0);
  });

  afterAll(async () => {
    await prisma.$executeRaw`DELETE FROM manufacturing.timeline`;
    await prisma.$executeRaw`DELETE FROM manufacturing.quality_inspections`;
    await prisma.$executeRaw`DELETE FROM manufacturing.measurements`;
    await prisma.$executeRaw`DELETE FROM manufacturing.work_orders`;
    await prisma.$executeRaw`DELETE FROM manufacturing.manufacturing_jobs`;
    await prisma.$disconnect();
  });
});
