import { TimelineEvent } from './timeline-event.entity';
import { WorkflowError } from '../errors/workflow-error';
import { ManufacturingTask, ManufacturingTaskType } from './manufacturing-task.entity';
import { WorkOrderWorkflowStatus, WORK_ORDER_INITIAL_STATUS } from './manufacturing-workflow-status';

export class WorkOrder {
  private _status: WorkOrderWorkflowStatus;
  public tasks: ManufacturingTask[];
  public measurementSnapshotId?: string | null;

  constructor(
    public id: string,
    public workOrderNumber: string | null,
    public manufacturingJobId: string | null,
    public orderItemId: string | null,
    public productId: string | null,
    public variantId: string | null,
    public assignedTailorId?: string | null,
    status?: WorkOrderWorkflowStatus,
    public estimatedCompletionDate?: Date | null,
    public completedAt?: Date | null,
    public createdAt?: Date,
    public updatedAt?: Date,
    tasks?: ManufacturingTask[],
    measurementSnapshotId?: string | null,
  ) {
    this._status = status ?? WORK_ORDER_INITIAL_STATUS;
    this.tasks = tasks ?? [];
    this.measurementSnapshotId = measurementSnapshotId ?? null;
  }

  get status() {
    return this._status;
  }

  private addTask(type: ManufacturingTaskType): ManufacturingTask {
    let task = this.tasks.find((t) => t.type === type);
    if (!task) {
      task = new ManufacturingTask(type);
      this.tasks.push(task);
    }
    return task;
  }

  private startTask(type: ManufacturingTaskType): TimelineEvent {
    const task = this.addTask(type);
    task.start();
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, `${type}_STARTED`, { status: task.status }, new Date());
  }

  private completeTask(type: ManufacturingTaskType, eventName: string, nextStatus: WorkOrderWorkflowStatus): TimelineEvent {
    const task = this.addTask(type);
    task.complete();
    const prev = this._status;
    this._status = nextStatus;
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, eventName, { from: prev, to: this._status }, new Date());
  }

  verifyMeasurements(): TimelineEvent {
    if (this._status !== 'CREATED' && this._status !== 'WAITING_FOR_MEASUREMENTS') {
      throw new WorkflowError(this.id, this._status, 'verifyMeasurements');
    }
    const prev = this._status;
    this._status = 'READY_TO_START';
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'MEASUREMENTS_VERIFIED', { from: prev, to: this._status }, new Date());
  }

  startCutting(): TimelineEvent {
    if (this._status !== 'READY_TO_START') throw new WorkflowError(this.id, this._status, 'startCutting');
    this._status = 'CUTTING';
    return this.startTask('CUTTING');
  }

  completeCutting(): TimelineEvent {
    if (this._status !== 'CUTTING') throw new WorkflowError(this.id, this._status, 'completeCutting');
    return this.completeTask('CUTTING', 'CUTTING_COMPLETED', 'SEWING');
  }

  startSewing(): TimelineEvent {
    if (this._status !== 'SEWING' && this._status !== 'REWORK_REQUIRED' && this._status !== 'READY_TO_START') {
      throw new WorkflowError(this.id, this._status, 'startSewing');
    }
    this._status = 'SEWING';
    return this.startTask('SEWING');
  }

  completeSewing(): TimelineEvent {
    if (this._status !== 'SEWING') throw new WorkflowError(this.id, this._status, 'completeSewing');
    return this.completeTask('SEWING', 'SEWING_COMPLETED', 'FINISHING');
  }

  startFinishing(): TimelineEvent {
    if (this._status !== 'FINISHING') throw new WorkflowError(this.id, this._status, 'startFinishing');
    return this.startTask('FINISHING');
  }

  completeFinishing(): TimelineEvent {
    if (this._status !== 'FINISHING') throw new WorkflowError(this.id, this._status, 'completeFinishing');
    return this.completeTask('FINISHING', 'FINISHING_COMPLETED', 'QUALITY_CONTROL');
  }

  startQualityControl(): TimelineEvent {
    if (this._status !== 'QUALITY_CONTROL') throw new WorkflowError(this.id, this._status, 'startQualityControl');
    return this.startTask('QUALITY_CONTROL');
  }

  passQualityControl(): TimelineEvent {
    if (this._status !== 'QUALITY_CONTROL') throw new WorkflowError(this.id, this._status, 'passQualityControl');
    this.completeTask('QUALITY_CONTROL', 'QUALITY_PASSED', 'READY_FOR_FULFILLMENT');
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'QUALITY_PASSED', { to: 'READY_FOR_FULFILLMENT' }, new Date());
  }

  failQualityControl(): TimelineEvent {
    if (this._status !== 'QUALITY_CONTROL') throw new WorkflowError(this.id, this._status, 'failQualityControl');
    const task = this.addTask('QUALITY_CONTROL');
    task.fail();
    const prev = this._status;
    this._status = 'REWORK_REQUIRED';
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'QUALITY_FAILED', { from: prev, to: this._status }, new Date());
  }

  markReadyForFulfillment(): TimelineEvent {
    if (this._status !== 'QUALITY_CONTROL' && this._status !== 'REWORK_REQUIRED') {
      throw new WorkflowError(this.id, this._status, 'markReadyForFulfillment');
    }
    const prev = this._status;
    this._status = 'READY_FOR_FULFILLMENT';
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'READY_FOR_FULFILLMENT', { from: prev, to: this._status }, new Date());
  }

  complete(): TimelineEvent {
    if (this._status !== 'READY_FOR_FULFILLMENT') throw new WorkflowError(this.id, this._status, 'complete');
    const prev = this._status;
    this._status = 'COMPLETED';
    this.completedAt = new Date();
    return new TimelineEvent(`${this.id}-ev-${Date.now()}`, this.id, 'WORK_ORDER_COMPLETED', { from: prev, to: this._status }, new Date());
  }
}

export default WorkOrder;
