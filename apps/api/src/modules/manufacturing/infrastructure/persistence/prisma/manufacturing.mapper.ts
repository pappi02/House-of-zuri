import { ManufacturingJob } from '../../../domain/entities/manufacturing-job.entity';
import { WorkOrder } from '../../../domain/entities/work-order.entity';
import { MeasurementSnapshot } from '../../../domain/entities/measurement-snapshot.entity';
import { QualityInspection } from '../../../domain/entities/quality-inspection.entity';
import { TimelineEvent } from '../../../domain/entities/timeline-event.entity';

export const PrismaManufacturingMapper = {
  toDomainJob(row: any): ManufacturingJob {
    if (!row) return null as any;
    return new ManufacturingJob(row.id, row.job_number, row.order_id, row.status, row.priority, row.started_at, row.completed_at, row.created_at, row.updated_at);
  },

  toDomainWorkOrder(row: any): WorkOrder {
    if (!row) return null as any;
    return new WorkOrder(row.id, row.work_order_number, row.manufacturing_job_id, row.order_item_id, row.product_id, row.variant_id, row.assigned_tailor_id, row.status, row.estimated_completion_date, row.completed_at, row.created_at, row.updated_at);
  },

  toDomainMeasurement(row: any): MeasurementSnapshot {
    if (!row) return null as any;
    return new MeasurementSnapshot(row.id, row.work_order_id, row.bust, row.waist, row.hip, row.shoulder, row.sleeve, row.height, row.inseam, row.notes, row.created_at);
  },

  toDomainInspection(row: any): QualityInspection {
    if (!row) return null as any;
    return new QualityInspection(row.id, row.work_order_id, row.status, row.notes, row.inspected_by, row.inspected_at, row.created_at);
  },

  toDomainTimeline(row: any): TimelineEvent {
    if (!row) return null as any;
    return new TimelineEvent(row.id, row.work_order_id, row.event, row.metadata, row.created_at);
  },
};

export default PrismaManufacturingMapper;
