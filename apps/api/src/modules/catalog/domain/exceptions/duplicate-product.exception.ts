export class DuplicateProductException extends Error {
  constructor(identifier: string) {
    super(`Product already exists: ${identifier}`);
    this.name = 'DuplicateProductException';
  }
}