export class QualityInspection {
  constructor(
    public id: string,
    public workOrderId: string,
    public status: 'PASSED' | 'FAILED' | 'REWORK_REQUIRED' | string,
    public notes?: string | null,
    public inspectedBy?: string | null,
    public inspectedAt?: Date | null,
    public createdAt?: Date,
  ) {}
}

export default QualityInspection;
