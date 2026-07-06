export class MeasurementSnapshot {
  constructor(
    public id: string,
    public workOrderId: string,
    public bust?: number | null,
    public waist?: number | null,
    public hip?: number | null,
    public shoulder?: number | null,
    public sleeve?: number | null,
    public height?: number | null,
    public inseam?: number | null,
    public notes?: string | null,
    public createdAt?: Date,
  ) {}
}

export default MeasurementSnapshot;
