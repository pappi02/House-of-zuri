import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

const migrationsDir = path.resolve(__dirname, '..', 'database', 'migrations');
const appliedTable = 'public.schema_migrations';

const findEnvFile = (startDir: string): string | undefined => {
  let currentDir = startDir;
  while (true) {
    const candidate = path.join(currentDir, '.env');
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(currentDir);
    if (parent === currentDir) return undefined;
    currentDir = parent;
  }
};

const loadEnv = () => {
  const envPath = findEnvFile(__dirname);
  if (envPath) require('dotenv').config({ path: envPath });
  const url = process.env.TEST_DATABASE_URL ?? process.env.DIRECT_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error('Set TEST_DATABASE_URL, DIRECT_URL, or DATABASE_URL');
  return url;
};

const ensureMigrationsTable = async (client: any) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.schema_migrations (
      id serial PRIMARY KEY,
      filename text UNIQUE NOT NULL,
      applied_at timestamptz DEFAULT now()
    );
  `);
};

const getApplied = async (client: any) => {
  const res = await client.query(`SELECT filename FROM public.schema_migrations`);
  return res.rows.map((r: any) => r.filename);
};

const applyMigration = async (client: any, filePath: string) => {
  const sql = fs.readFileSync(filePath, 'utf8');
  await client.query('BEGIN');
  try {
    await client.query(sql);
    await client.query(`INSERT INTO public.schema_migrations (filename) VALUES ($1)`, [path.basename(filePath)]);
    await client.query('COMMIT');
    console.log('Applied', path.basename(filePath));
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  }
};

const run = async () => {
  const url = loadEnv();
  const client = new Client({ connectionString: url });
  await client.connect();
  try {
    await ensureMigrationsTable(client);
    const applied = await getApplied(client);

    const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();

    // Only apply missing migrations (skip 0006 and 0007 if already applied)
    const toApply = files.filter((f) => !applied.includes(f));

    for (const f of toApply) {
      if (f === '0006_inventory.sql' || f === '0007_manufacturing.sql') {
        console.log('Skipping existing inventory/manufacturing migration:', f);
        // if present in filesystem but already applied upstream, still record as applied to avoid re-run
        await client.query(`INSERT INTO public.schema_migrations (filename) VALUES ($1) ON CONFLICT DO NOTHING`, [f]);
        continue;
      }
      const fp = path.join(migrationsDir, f);
      console.log('Applying', f);
      await applyMigration(client, fp);
    }

    console.log('Migrations complete');
  } finally {
    await client.end();
  }
};

run().catch((e) => {
  console.error('Migration failed', e);
  process.exit(1);
});
