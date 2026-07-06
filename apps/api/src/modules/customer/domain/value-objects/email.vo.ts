import { InvalidCustomerException } from '../exceptions/invalid-customer.exception';

export class Email {
  constructor(public readonly value: string) {
    const normalized = value.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new InvalidCustomerException('Email must be a valid email address.');
    }

    this.value = normalized;
  }

  static from(value: string): Email {
    return new Email(value);
  }
}
