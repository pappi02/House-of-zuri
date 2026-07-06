import { InvalidCustomerException } from '../exceptions/invalid-customer.exception';

export class Phone {
  constructor(public readonly value: string) {
    const normalized = Phone.normalize(value);
    this.value = normalized;
  }

  static from(value: string): Phone {
    return new Phone(value);
  }

  private static normalize(value: string): string {
    const digits = value.replace(/\D/g, '');

    if (!digits) {
      throw new InvalidCustomerException('Phone number is required.');
    }

    let normalizedDigits = digits;

    if (digits.startsWith('254') && digits.length === 12) {
      normalizedDigits = digits;
    } else if (digits.startsWith('0') && digits.length === 10) {
      normalizedDigits = `254${digits.slice(1)}`;
    } else if (digits.length === 9) {
      normalizedDigits = `254${digits}`;
    } else if (!digits.startsWith('254') && digits.length >= 10) {
      normalizedDigits = digits;
    }

    if (!/^\+?\d{10,15}$/.test(`+${normalizedDigits}`)) {
      throw new InvalidCustomerException('Phone number must be a valid local or international number.');
    }

    return `+${normalizedDigits}`;
  }
}
