import { TimelineEvent } from './timeline-event.entity';
import { WorkOrder } from './work-order.entity';
import { WorkflowError } from '../errors/workflow-error';

export class ManufacturingJob {
  private _status: string;

  constructor(
    public id: string,
    public jobNumber: string | null,
    public orderId: string,
    status?: string,
    public priority?: number,
    public startedAt?: Date | null,
    public completedAt?: Date | null,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {
    this._status = status ?? 'CREATED';
  }

  get status() {
    return this._status;
  }

  static create(id: string, orderId: string, priority?: number): { job: ManufacturingJob; event: TimelineEvent } {
    const job = new ManufacturingJob(id, null, orderId, 'CREATED', priority, undefined, undefined, new Date(), new Date());
    const ev = new TimelineEvent(`${id}-ev-${Date.now()}`, null as any, 'JOB_CREATED', { jobId: id }, new Date());
    return { job, event: ev };
  }

  addWorkOrder(wo: WorkOrder): TimelineEvent {
    // attach work order to this job
    if (!wo) throw new WorkflowError(this.id, this._status, 'addWorkOrder');
    wo.manufacturingJobId = this.id;
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, wo.id, 'WORK_ORDER_ADDED', { jobId: this.id, workOrderId: wo.id }, new Date());
  }

  complete(): TimelineEvent {
    if (this._status === 'COMPLETED') throw new WorkflowError(this.id, this._status, 'complete');
    this._status = 'COMPLETED';
    this.completedAt = new Date();
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, null as any, 'MANUFACTURING_COMPLETED', { jobId: this.id }, new Date());
  }

  cancel(reason?: string): TimelineEvent {
    if (this._status === 'COMPLETED') throw new WorkflowError(this.id, this._status, 'cancel');
    this._status = 'CANCELLED';
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, null as any, 'MANUFACTURING_CANCELLED', { reason }, new Date());
  }
}

export default ManufacturingJob;
