import { execSync } from 'child_process';
import { Client } from 'pg';
import path from 'path';

const findEnvFile = (startDir: string): string | undefined => {
  let currentDir = startDir;

  while (true) {
    const candidate = path.join(currentDir, '.env');

    if (require('fs').existsSync(candidate)) {
      return candidate;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return undefined;
    }

    currentDir = parentDir;
  }
};

const loadEnvironment = () => {
  const envPath = findEnvFile(path.resolve(__dirname, '..', '..'));
  if (envPath) {
    require('dotenv').config({ path: envPath });
  }

  const databaseUrl =
    process.env.TEST_DATABASE_URL ?? process.env.DIRECT_URL ?? process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      'Missing database URL. Set TEST_DATABASE_URL, DIRECT_URL, or DATABASE_URL in the environment or in a .env file.',
    );
  }

  process.env.TEST_DATABASE_URL = databaseUrl;
  process.env.DIRECT_URL = databaseUrl;
  process.env.DATABASE_URL = databaseUrl;
};

const ensureDatabaseReachable = async () => {
  const client = new Client({ connectionString: process.env.TEST_DATABASE_URL });

  try {
    await client.connect();
    await client.query('SELECT 1');
  } finally {
    await client.end();
  }
};

const migrate = () => {
  const apiRoot = path.resolve(__dirname, '..', '..');
  const schemaPath = path.resolve(apiRoot, '..', '..', 'database', 'prisma', 'schema.prisma');
  execSync(`npx prisma generate --schema "${schemaPath}"`, { cwd: apiRoot, stdio: 'inherit' });
  execSync(`npx prisma migrate deploy --schema "${schemaPath}"`, { cwd: apiRoot, stdio: 'inherit' });
};

const verifySchemas = async () => {
  const requiredSchemas = [
    'orders',
    'inventory',
    'manufacturing',
    'fulfillment',
    'customer',
    'catalog',
  ];

  const client = new Client({ connectionString: process.env.TEST_DATABASE_URL });
  try {
    await client.connect();
    const result = await client.query(
      `SELECT schema_name FROM information_schema.schemata WHERE schema_name = ANY($1::text[])`,
      [requiredSchemas],
    );
    const presentSchemas = result.rows.map((row: { schema_name: string }) => row.schema_name);
    const missingSchemas = requiredSchemas.filter((schema) => !presentSchemas.includes(schema));
    if (missingSchemas.length > 0) {
      throw new Error(`Required schemas missing: ${missingSchemas.join(', ')}`);
    }
  } finally {
    await client.end();
  }
};

const seedMinimalData = async () => {
  const client = new Client({ connectionString: process.env.TEST_DATABASE_URL });
  await client.connect();

  try {
    await client.query('BEGIN');
    const result = await client.query(
      `SELECT id FROM orders.orders WHERE order_number = $1`,
      ['TEST-ORD-0001'],
    );

    if (result.rowCount === 0) {
      await client.query(
        `INSERT INTO orders.orders (id, order_number, customer_id, currency, status, notes, total_amount, created_at, updated_at)
         VALUES ($1::uuid, $2, $3::uuid, $4, $5, $6, $7, NOW(), NOW())`,
        [
          '00000000-0000-0000-0000-000000000001',
          'TEST-ORD-0001',
          '00000000-0000-0000-0000-000000000002',
          'USD',
          'PENDING',
          'Seed order for test setup',
          0,
        ],
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    await client.end();
  }
};

module.exports = async () => {
  loadEnvironment();
  console.log('Global setup: validating test database connection...');
  await ensureDatabaseReachable();
  console.log('Global setup: applying Prisma migrations...');
  migrate();
  console.log('Global setup: verifying required schemas...');
  await verifySchemas();
  console.log('Global setup: seeding minimal deterministic test data...');
  await seedMinimalData();
  console.log('Global setup: complete.');
};
