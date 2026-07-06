export class TimelineEvent {
  constructor(
    public id: string,
    public workOrderId?: string | null,
    public event?: string,
    public metadata?: any,
    public createdAt?: Date,
  ) {}
}

export default TimelineEvent;
