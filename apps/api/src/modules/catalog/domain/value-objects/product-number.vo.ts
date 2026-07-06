export class ProductNumber {
  private constructor(readonly value: string) {}

  static from(value: string): ProductNumber {
    return new ProductNumber(value);
  }

  static generate(sequence: number): ProductNumber {
    const padded = `${sequence}`.padStart(6, '0');
    return new ProductNumber(`PRD-${padded}`);
  }
}
