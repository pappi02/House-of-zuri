import { Inject } from '@nestjs/common';
import { FulfillmentRepository } from '../../../domain/repositories/fulfillment.repository';
import { Fulfillment } from '../../../domain/entities/fulfillment.entity';
import { FulfillmentItem } from '../../../domain/entities/fulfillment-item.entity';
import { PackingSlip } from '../../../domain/entities/packing-slip.entity';
import { DispatchRecord } from '../../../domain/entities/dispatch-record.entity';
import { TimelineEvent } from '../../../domain/entities/timeline-event.entity';
import { PrismaFulfillmentMapper } from './fulfillment.mapper';
import { randomUUID } from 'crypto';

export class PrismaFulfillmentRepository implements FulfillmentRepository {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: any) {}

  private formatNumber(n: number) {
    return `FUL-${String(n).padStart(6, '0')}`;
  }

  async createFulfillment(fulfillment: Fulfillment): Promise<Fulfillment> {
    const result = await this.prisma.$transaction(async (tx: any) => {
      const seq: any = await tx.$queryRaw`SELECT nextval('fulfillment.fulfillment_number_seq') as n`;
      const n = Array.isArray(seq) ? seq[0].n : seq.n;
      const fulfillmentNumber = this.formatNumber(Number(n));

      await tx.$executeRaw`
        INSERT INTO fulfillment.fulfillments (id, fulfillment_number, order_id, status, packing_slip_id, dispatch_record_id, created_at, updated_at)
        VALUES (${fulfillment.id}::uuid, ${fulfillmentNumber}, ${fulfillment.orderId}::uuid, ${fulfillment.status}, ${fulfillment.packingSlipId ?? null}, ${fulfillment.dispatchRecordId ?? null}, ${new Date()}, ${new Date()})
      `;

      for (const item of fulfillment.items) {
        await tx.$executeRaw`
          INSERT INTO fulfillment.fulfillment_items (id, fulfillment_id, order_item_id, product_id, variant_id, quantity, status, created_at, updated_at)
          VALUES (${item.id ?? randomUUID()}::uuid, ${fulfillment.id}::uuid, ${item.orderItemId}::uuid, ${item.productId}::uuid, ${item.variantId ?? null}, ${item.quantity}, ${item.status}, ${new Date()}, ${new Date()})
        `;
      }

      return await tx.$queryRaw`SELECT * FROM fulfillment.fulfillments WHERE id = ${fulfillment.id}::uuid`;
    });

    const row = Array.isArray(result) ? result[0] : result;
    const items = await this.getFulfillmentItems(row.id);
    return PrismaFulfillmentMapper.toDomainFulfillment(row, items);
  }

  async findById(id: string): Promise<Fulfillment | null> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM fulfillment.fulfillments WHERE id = ${id}::uuid`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    if (!row) return null;
    const items = await this.getFulfillmentItems(id);
    return PrismaFulfillmentMapper.toDomainFulfillment(row, items);
  }

  async findByOrderId(orderId: string): Promise<Fulfillment[]> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM fulfillment.fulfillments WHERE order_id = ${orderId}::uuid`;
    const data = Array.isArray(rows) ? rows : rows ? [rows] : [];
    return Promise.all(data.filter(Boolean).map(async (row: any) => {
      const items = await this.getFulfillmentItems(row.id);
      return PrismaFulfillmentMapper.toDomainFulfillment(row, items);
    }));
  }

  async findAll(): Promise<Fulfillment[]> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM fulfillment.fulfillments`;
    const data = Array.isArray(rows) ? rows : rows ? [rows] : [];
    return Promise.all(data.filter(Boolean).map(async (row: any) => {
      const items = await this.getFulfillmentItems(row.id);
      return PrismaFulfillmentMapper.toDomainFulfillment(row, items);
    }));
  }

  async save(fulfillment: Fulfillment): Promise<Fulfillment> {
    await this.prisma.$transaction(async (tx: any) => {
      await tx.$executeRaw`
        UPDATE fulfillment.fulfillments
        SET status = ${fulfillment.status}, packing_slip_id = ${fulfillment.packingSlipId ?? null}, dispatch_record_id = ${fulfillment.dispatchRecordId ?? null}, updated_at = ${new Date()}
        WHERE id = ${fulfillment.id}::uuid
      `;

      for (const item of fulfillment.items) {
        if (!item.id) {
          await tx.$executeRaw`
            INSERT INTO fulfillment.fulfillment_items (id, fulfillment_id, order_item_id, product_id, variant_id, quantity, status, created_at, updated_at)
            VALUES (${randomUUID()}::uuid, ${fulfillment.id}::uuid, ${item.orderItemId}::uuid, ${item.productId}::uuid, ${item.variantId ?? null}, ${item.quantity}, ${item.status}, ${new Date()}, ${new Date()})
          `;
        } else {
          await tx.$executeRaw`
            UPDATE fulfillment.fulfillment_items
            SET quantity = ${item.quantity}, status = ${item.status}, updated_at = ${new Date()}
            WHERE id = ${item.id}::uuid
          `;
        }
      }
    });

    const rows = await this.prisma.$queryRaw`SELECT * FROM fulfillment.fulfillments WHERE id = ${fulfillment.id}::uuid`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    const items = await this.getFulfillmentItems(fulfillment.id);
    return PrismaFulfillmentMapper.toDomainFulfillment(row, items);
  }

  async appendTimeline(event: TimelineEvent): Promise<TimelineEvent> {
    const id = randomUUID();
    await this.prisma.$executeRaw`
      INSERT INTO fulfillment.fulfillment_timelines (id, fulfillment_id, event, metadata, created_at)
      VALUES (${id}::uuid, ${event.fulfillmentId}::uuid, ${event.event}, ${event.metadata ?? null}, ${event.createdAt})
    `;
    return new TimelineEvent(id, event.fulfillmentId, event.event, event.metadata, event.createdAt);
  }

  async createPackingSlip(slip: PackingSlip): Promise<PackingSlip> {
    const result = await this.prisma.$transaction(async (tx: any) => {
      const seq: any = await tx.$queryRaw`SELECT nextval('fulfillment.packing_slip_number_seq') as n`;
      const n = Array.isArray(seq) ? seq[0].n : seq.n;
      const slipNumber = `PKG-${String(n).padStart(6, '0')}`;
      const id = slip.id ?? randomUUID();

      await tx.$executeRaw`
        INSERT INTO fulfillment.packing_slips (id, fulfillment_id, slip_number, items, generated_at)
        VALUES (${id}::uuid, ${slip.fulfillmentId}::uuid, ${slipNumber}, ${JSON.stringify(slip.items)}::jsonb, ${new Date()})
      `;
      const row = await tx.$queryRaw`SELECT * FROM fulfillment.packing_slips WHERE id = ${id}::uuid`;
      return Array.isArray(row) ? row[0] : row;
    });
    return PrismaFulfillmentMapper.toDomainPackingSlip(result);
  }

  async createDispatchRecord(record: DispatchRecord): Promise<DispatchRecord> {
    const id = record.id ?? randomUUID();
    await this.prisma.$executeRaw`
      INSERT INTO fulfillment.dispatch_records (id, fulfillment_id, carrier, tracking_number, dispatched_at)
      VALUES (${id}::uuid, ${record.fulfillmentId}::uuid, ${record.carrier ?? null}, ${record.trackingNumber ?? null}, ${record.dispatchedAt})
    `;
    const rows = await this.prisma.$queryRaw`SELECT * FROM fulfillment.dispatch_records WHERE id = ${id}::uuid`;
    const row = Array.isArray(rows) ? rows[0] : rows;
    return PrismaFulfillmentMapper.toDomainDispatchRecord(row);
  }

  async findPackingSlipsByFulfillmentId(fulfillmentId: string): Promise<PackingSlip[]> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM fulfillment.packing_slips WHERE fulfillment_id = ${fulfillmentId}::uuid`;
    const data = Array.isArray(rows) ? rows : rows ? [rows] : [];
    return data.filter(Boolean).map((r: any) => PrismaFulfillmentMapper.toDomainPackingSlip(r));
  }

  async findDispatchRecordsByFulfillmentId(fulfillmentId: string): Promise<DispatchRecord[]> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM fulfillment.dispatch_records WHERE fulfillment_id = ${fulfillmentId}::uuid`;
    const data = Array.isArray(rows) ? rows : rows ? [rows] : [];
    return data.filter(Boolean).map((r: any) => PrismaFulfillmentMapper.toDomainDispatchRecord(r));
  }

  async listTimelineByFulfillmentId(fulfillmentId: string): Promise<TimelineEvent[]> {
    const rows = await this.prisma.$queryRaw`SELECT * FROM fulfillment.fulfillment_timelines WHERE fulfillment_id = ${fulfillmentId}::uuid ORDER BY created_at ASC`;
    const data = Array.isArray(rows) ? rows : rows ? [rows] : [];
    return data.filter(Boolean).map((r: any) => PrismaFulfillmentMapper.toDomainTimeline(r));
  }

  private async getFulfillmentItems(fulfillmentId: string) {
    const rows = await this.prisma.$queryRaw`SELECT * FROM fulfillment.fulfillment_items WHERE fulfillment_id = ${fulfillmentId}::uuid`;
    const data = Array.isArray(rows) ? rows : rows ? [rows] : [];
    return data.filter(Boolean);
  }
}
