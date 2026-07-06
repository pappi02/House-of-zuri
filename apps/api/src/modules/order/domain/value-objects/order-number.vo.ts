export class OrderNumber {
  constructor(public readonly value: string) {
    const normalized = value.trim().toUpperCase();

    if (!/^ORD-\d{6}$/.test(normalized)) {
      throw new Error('Order number must use the format ORD-000001.');
    }

    this.value = normalized;
  }

  static from(value: string): OrderNumber {
    return new OrderNumber(value);
  }

  static generate(sequence: number): OrderNumber {
    return new OrderNumber(`ORD-${String(sequence).padStart(6, '0')}`);
  }
}
