export abstract class BaseEntity {
  protected constructor(
    readonly id: string,
    readonly createdAt: Date,
    protected _updatedAt: Date,
  ) {}

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected touch(): void {
    this._updatedAt = new Date();
  }
}
