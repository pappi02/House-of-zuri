import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ManufacturingRepository } from '../../../domain/repositories/manufacturing.repository';
import { ManufacturingJob } from '../../../domain/entities/manufacturing-job.entity';
import { WorkOrder } from '../../../domain/entities/work-order.entity';
import { MeasurementSnapshot } from '../../../domain/entities/measurement-snapshot.entity';
import { QualityInspection } from '../../../domain/entities/quality-inspection.entity';
import { TimelineEvent } from '../../../domain/entities/timeline-event.entity';
import { PrismaManufacturingMapper } from './manufacturing.mapper';

export class PrismaManufacturingRepository implements ManufacturingRepository {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: any) {}

  private formatJobNumber(n: number) {
    return `JOB-${String(n).padStart(6, '0')}`;
  }

  private formatWoNumber(n: number) {
    return `WO-${String(n).padStart(6, '0')}`;
  }

  async createJob(job: ManufacturingJob): Promise<ManufacturingJob> {
    // Non-transactional path: sequence `nextval` is safe for concurrency and
    // using a single connection-less call avoids starting many transactions
    // concurrently which can exhaust the DB pool.
    const seq: any = await this.prisma.$queryRaw`SELECT nextval('manufacturing.job_number_seq') as n`;
    const n = Array.isArray(seq) ? seq[0].n : seq.n;
    const jobNumber = this.formatJobNumber(Number(n));

    await this.prisma.$executeRaw`
      INSERT INTO manufacturing.manufacturing_jobs (id, job_number, order_id, status, priority, started_at, completed_at, created_at, updated_at)
      VALUES (${job.id}::uuid, ${jobNumber}, ${job.orderId}::uuid, ${job.status}, ${job.priority ?? null}, ${job.startedAt ?? null}, ${job.completedAt ?? null}, ${new Date()}, ${new Date()})
    `;

    const row = (await this.prisma.$queryRaw`SELECT * FROM manufacturing.manufacturing_jobs WHERE id = ${job.id}::uuid`)[0];
    return PrismaManufacturingMapper.toDomainJob(row);
  }

  async createManufacturingJob(job: ManufacturingJob, workOrders: WorkOrder[], timelines: TimelineEvent[] = []): Promise<ManufacturingJob> {
    const res = await this.prisma.$transaction(async (tx: any) => {
      const seq: any = await tx.$queryRaw`SELECT nextval('manufacturing.job_number_seq') as n`;
      const n = Array.isArray(seq) ? seq[0].n : seq.n;
      const jobNumber = this.formatJobNumber(Number(n));

      await tx.$executeRaw`
        INSERT INTO manufacturing.manufacturing_jobs (id, job_number, order_id, status, priority, started_at, completed_at, created_at, updated_at)
        VALUES (${job.id}::uuid, ${jobNumber}, ${job.orderId}::uuid, ${job.status}, ${job.priority ?? null}, ${job.startedAt ?? null}, ${job.completedAt ?? null}, ${new Date()}, ${new Date()})
      `;

      // create work orders and timeline entries
      for (const wo of workOrders) {
        const seqWo: any = await tx.$queryRaw`SELECT nextval('manufacturing.work_order_number_seq') as n`;
        const wn = Array.isArray(seqWo) ? seqWo[0].n : seqWo.n;
        const woNumber = this.formatWoNumber(Number(wn));

        await tx.$executeRaw`
          INSERT INTO manufacturing.work_orders (id, work_order_number, manufacturing_job_id, order_item_id, product_id, variant_id, assigned_tailor_id, status, estimated_completion_date, completed_at, created_at, updated_at)
          VALUES (${wo.id}::uuid, ${woNumber}, ${job.id}::uuid, ${wo.orderItemId}::uuid, ${wo.productId}::uuid, ${wo.variantId}::uuid, ${wo.assignedTailorId ?? null}, ${wo.status ?? 'CREATED'}, ${wo.estimatedCompletionDate ?? null}, ${wo.completedAt ?? null}, ${new Date()}, ${new Date()})
        `;

        await tx.$executeRaw`
          INSERT INTO manufacturing.timeline (id, work_order_id, event, metadata, created_at)
          VALUES (${randomUUID()}::uuid, ${wo.id}::uuid, ${'WORK_ORDER_CREATED'}, ${null}, ${new Date()})
        `;
      }

      // optional timelines provided
      for (const t of timelines) {
        await tx.$executeRaw`
          INSERT INTO manufacturing.timeline (id, work_order_id, event, metadata, created_at)
          VALUES (${t.id}::uuid, ${t.workOrderId}::uuid, ${t.event}, ${t.metadata ?? null}, ${new Date()})
        `;
      }

      // job-level timeline
      await tx.$executeRaw`
        INSERT INTO manufacturing.timeline (id, work_order_id, event, metadata, created_at)
        VALUES (${randomUUID()}::uuid, ${null}, ${'JOB_CREATED'}, ${JSON.stringify({ jobNumber })}::jsonb, ${new Date()})
      `;

      return await tx.$queryRaw`SELECT * FROM manufacturing.manufacturing_jobs WHERE id = ${job.id}::uuid`;
    });

    const row = Array.isArray(res) ? res[0] : res;
    return PrismaManufacturingMapper.toDomainJob(row);
  }

  async createWorkOrder(order: WorkOrder): Promise<WorkOrder> {
    const res = await this.prisma.$transaction(async (tx: any) => {
      const seq: any = await tx.$queryRaw`SELECT nextval('manufacturing.work_order_number_seq') as n`;
      const n = Array.isArray(seq) ? seq[0].n : seq.n;
      const woNumber = this.formatWoNumber(Number(n));

      await tx.$executeRaw`
        INSERT INTO manufacturing.work_orders (id, work_order_number, manufacturing_job_id, order_item_id, product_id, variant_id, assigned_tailor_id, status, estimated_completion_date, completed_at, created_at, updated_at)
        VALUES (${order.id}::uuid, ${woNumber}, ${order.manufacturingJobId}::uuid, ${order.orderItemId}::uuid, ${order.productId}::uuid, ${order.variantId}::uuid, ${order.assignedTailorId ?? null}, ${order.status ?? 'CREATED'}, ${order.estimatedCompletionDate ?? null}, ${order.completedAt ?? null}, ${new Date()}, ${new Date()})
      `;

      await tx.$executeRaw`
        INSERT INTO manufacturing.timeline (id, work_order_id, event, metadata, created_at)
        VALUES (${randomUUID()}::uuid, ${order.id}::uuid, ${'WORK_ORDER_CREATED'}, ${null}, ${new Date()})
      `;

      const row = (await tx.$queryRaw`SELECT * FROM manufacturing.work_orders WHERE id = ${order.id}::uuid`)[0];
      return row;
    });

    return PrismaManufacturingMapper.toDomainWorkOrder(Array.isArray(res) ? res[0] : res);
  }

  async findJobById(id: string): Promise<ManufacturingJob | null> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM manufacturing.manufacturing_jobs WHERE id = ${id}::uuid`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return row ? PrismaManufacturingMapper.toDomainJob(row) : null;
  }

  async findWorkOrderById(id: string): Promise<WorkOrder | null> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM manufacturing.work_orders WHERE id = ${id}::uuid`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return row ? PrismaManufacturingMapper.toDomainWorkOrder(row) : null;
  }

  async updateWorkOrderStatus(id: string, status: string): Promise<WorkOrder> {
    await this.prisma.$executeRaw`
      UPDATE manufacturing.work_orders SET status = ${status}, updated_at = ${new Date()} WHERE id = ${id}::uuid
    `;
    const row = (await this.prisma.$queryRaw`SELECT * FROM manufacturing.work_orders WHERE id = ${id}::uuid`)[0];
    return PrismaManufacturingMapper.toDomainWorkOrder(row);
  }

  async addMeasurement(snapshot: MeasurementSnapshot): Promise<MeasurementSnapshot> {
    await this.prisma.$executeRaw`
      INSERT INTO manufacturing.measurements (id, work_order_id, bust, waist, hip, shoulder, sleeve, height, inseam, notes, created_at)
      VALUES (${snapshot.id}::uuid, ${snapshot.workOrderId}::uuid, ${snapshot.bust ?? null}, ${snapshot.waist ?? null}, ${snapshot.hip ?? null}, ${snapshot.shoulder ?? null}, ${snapshot.sleeve ?? null}, ${snapshot.height ?? null}, ${snapshot.inseam ?? null}, ${snapshot.notes ?? null}, ${new Date()})
    `;
    const row = (await this.prisma.$queryRaw`SELECT * FROM manufacturing.measurements WHERE id = ${snapshot.id}::uuid`)[0];
    return PrismaManufacturingMapper.toDomainMeasurement(row);
  }

  async addInspection(inspection: QualityInspection): Promise<QualityInspection> {
    await this.prisma.$executeRaw`
      INSERT INTO manufacturing.quality_inspections (id, work_order_id, status, notes, inspected_by, inspected_at, created_at)
      VALUES (${inspection.id}::uuid, ${inspection.workOrderId}::uuid, ${inspection.status}, ${inspection.notes ?? null}, ${inspection.inspectedBy ?? null}, ${inspection.inspectedAt ?? null}, ${new Date()})
    `;
    const row = (await this.prisma.$queryRaw`SELECT * FROM manufacturing.quality_inspections WHERE id = ${inspection.id}::uuid`)[0];
    return PrismaManufacturingMapper.toDomainInspection(row);
  }

  async appendTimeline(event: TimelineEvent): Promise<TimelineEvent> {
    await this.prisma.$executeRaw`
      INSERT INTO manufacturing.timeline (id, work_order_id, event, metadata, created_at)
      VALUES (${event.id}::uuid, ${event.workOrderId}::uuid, ${event.event}, ${event.metadata ?? null}, ${new Date()})
    `;
    const row = (await this.prisma.$queryRaw`SELECT * FROM manufacturing.timeline WHERE id = ${event.id}::uuid`)[0];
    return PrismaManufacturingMapper.toDomainTimeline(row);
  }

  async listJobsByOrder(orderId: string): Promise<ManufacturingJob[]> {
    const rows = orderId
      ? await this.prisma.$queryRaw`SELECT * FROM manufacturing.manufacturing_jobs WHERE order_id = ${orderId}::uuid ORDER BY created_at DESC`
      : await this.prisma.$queryRaw`SELECT * FROM manufacturing.manufacturing_jobs ORDER BY created_at DESC`;
    const arr = Array.isArray(rows) ? rows : [rows];
    return arr.map((r: any) => PrismaManufacturingMapper.toDomainJob(r));
  }
}

export default PrismaManufacturingRepository;
