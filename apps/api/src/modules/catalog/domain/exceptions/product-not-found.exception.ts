export class ProductNotFoundException extends Error {
  constructor(identifier: string) {
    super(`Product not found: ${identifier}`);
    this.name = 'ProductNotFoundException';
  }
}