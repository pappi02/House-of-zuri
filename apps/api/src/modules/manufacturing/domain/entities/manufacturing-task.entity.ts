export type ManufacturingTaskType = 'CUTTING' | 'SEWING' | 'FINISHING' | 'QUALITY_CONTROL';
export type ManufacturingTaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export class ManufacturingTask {
  constructor(
    public type: ManufacturingTaskType,
    public status: ManufacturingTaskStatus = 'PENDING',
    public startedAt?: Date | null,
    public completedAt?: Date | null,
  ) {}

  start(): void {
    if (this.status !== 'PENDING' && this.status !== 'FAILED' && this.status !== 'COMPLETED') {
      throw new Error(`Task ${this.type} cannot start from status ${this.status}`);
    }
    this.status = 'IN_PROGRESS';
    this.startedAt = new Date();
    this.completedAt = undefined;
  }

  complete(): void {
    if (this.status !== 'IN_PROGRESS') {
      throw new Error(`Task ${this.type} cannot complete from status ${this.status}`);
    }
    this.status = 'COMPLETED';
    this.completedAt = new Date();
  }

  fail(): void {
    if (this.status !== 'IN_PROGRESS') {
      throw new Error(`Task ${this.type} cannot fail from status ${this.status}`);
    }
    this.status = 'FAILED';
    this.completedAt = new Date();
  }
}
