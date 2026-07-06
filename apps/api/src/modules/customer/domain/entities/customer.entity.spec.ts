import { InvalidCustomerException } from '../exceptions/invalid-customer.exception';
import { Customer } from './customer.entity';

describe('Customer', () => {
  it('creates a guest customer with default values', () => {
    const customer = new Customer({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      phone: '+1234567890',
      isGuest: true,
    });

    expect(customer.isGuest).toBe(true);
    expect(customer.status).toBe('ACTIVE');
    expect(customer.marketingOptIn).toBe(false);
    expect(customer.customerNumber).toMatch(/^CUS-/);
  });

  it('normalizes email and phone and exposes a display name', () => {
    const customer = new Customer({
      firstName: 'Ada',
      middleName: 'Byron',
      lastName: 'Lovelace',
      preferredName: 'Ada',
      email: ' ADA@Example.com ',
      phone: '0712345678',
    });

    expect(customer.email).toBe('ada@example.com');
    expect(customer.phone).toBe('+254712345678');
    expect(customer.name.displayName()).toBe('Ada');
    expect(customer.name.fullName()).toBe('Ada Byron Lovelace');
  });

  it('enforces the guest registration and activation rules', () => {
    const customer = new Customer({
      firstName: 'Grace',
      lastName: 'Hopper',
      email: 'grace@example.com',
      phone: '0723456789',
      isGuest: true,
    });

    customer.convertGuestToRegistered();
    expect(customer.isGuest).toBe(false);

    customer.block();
    expect(() => customer.activate()).toThrow(InvalidCustomerException);
  });
});
