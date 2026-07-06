export class TimelineEvent {
  constructor(
    public id: string,
    public fulfillmentId: string | null,
    public event: string,
    public metadata: Record<string, unknown> | null,
    public createdAt: Date,
  ) {}
}
