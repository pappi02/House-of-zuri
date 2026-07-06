export class PaymentNumber {
  private constructor(readonly value: string) {}

  static from(value: string): PaymentNumber {
    return new PaymentNumber(value);
  }

  static generate(sequence: number): PaymentNumber {
    return new PaymentNumber(`PAY-${String(sequence).padStart(6, '0')}`);
  }
}
