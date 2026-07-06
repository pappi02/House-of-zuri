export class PaymentSequenceGenerator {
  constructor(private readonly nextValue: () => number) {}

  generate(): string {
    const value = this.nextValue();
    return `PAY-${String(value).padStart(6, '0')}`;
  }
}
