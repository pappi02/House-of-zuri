export class TimelineEvent {
  constructor(public id: string, public orderId: string, public event: string, public metadata?: any, public createdAt?: Date) {
    this.createdAt = this.createdAt ?? new Date();
  }
}
