import { ManufacturingJob } from '../entities/manufacturing-job.entity';
import { WorkOrder } from '../entities/work-order.entity';
import { MeasurementSnapshot } from '../entities/measurement-snapshot.entity';
import { QualityInspection } from '../entities/quality-inspection.entity';
import { TimelineEvent } from '../entities/timeline-event.entity';

export interface ManufacturingRepository {
  createJob(job: ManufacturingJob): Promise<ManufacturingJob>;
  // atomic creation: create job together with its work orders and timeline entries
  createManufacturingJob(job: ManufacturingJob, workOrders: WorkOrder[], timelines?: TimelineEvent[]): Promise<ManufacturingJob>;
  createWorkOrder(order: WorkOrder): Promise<WorkOrder>;
  findJobById(id: string): Promise<ManufacturingJob | null>;
  findWorkOrderById(id: string): Promise<WorkOrder | null>;
  updateWorkOrderStatus(id: string, status: string): Promise<WorkOrder>;
  addMeasurement(snapshot: MeasurementSnapshot): Promise<MeasurementSnapshot>;
  addInspection(inspection: QualityInspection): Promise<QualityInspection>;
  appendTimeline(event: TimelineEvent): Promise<TimelineEvent>;
  listJobsByOrder(orderId: string): Promise<ManufacturingJob[]>;
}

export default ManufacturingRepository;
