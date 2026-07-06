export class CartNumber {
  constructor(public readonly value: string) {
    const normalized = value.trim().toUpperCase();

    if (!/^CRT-\d{6}$/.test(normalized)) {
      throw new Error('Cart number must use the format CRT-000001.');
    }

    this.value = normalized;
  }

  static from(value: string): CartNumber {
    return new CartNumber(value);
  }

  static generate(sequence: number): CartNumber {
    return new CartNumber(`CRT-${String(sequence).padStart(6, '0')}`);
  }
}
