import { InvalidCustomerException } from '../exceptions/invalid-customer.exception';

export class CustomerNumber {
  constructor(public readonly value: string) {
    const normalized = value.trim().toUpperCase();

    if (!/^CUS-\d{6}$/.test(normalized)) {
      throw new InvalidCustomerException('Customer number must use the format CUS-000001.');
    }

    this.value = normalized;
  }

  static from(value: string): CustomerNumber {
    return new CustomerNumber(value);
  }

  static generate(): CustomerNumber {
    const sequence = Math.floor(100000 + Math.random() * 900000);
    return new CustomerNumber(`CUS-${String(sequence).padStart(6, '0')}`);
  }
}
