export class CustomerNumber {
  constructor(public readonly value: string) {}

  static from(value: string): CustomerNumber {
    return new CustomerNumber(value);
  }
}
