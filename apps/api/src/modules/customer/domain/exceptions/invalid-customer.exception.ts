export class InvalidCustomerException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCustomerException';
  }
}
