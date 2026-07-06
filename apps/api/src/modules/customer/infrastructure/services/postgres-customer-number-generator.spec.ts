import { PostgresCustomerNumberGenerator } from './postgres-customer-number-generator';

describe('PostgresCustomerNumberGenerator', () => {
  it('formats a PostgreSQL sequence value into a customer number', async () => {
    const prisma = {
      $queryRawUnsafe: jest.fn().mockResolvedValue([{ nextval: 1n }]),
    } as any;

    const generator = new PostgresCustomerNumberGenerator(prisma);

    await expect(generator.generate()).resolves.toBe('CUS-000001');
  });
});
