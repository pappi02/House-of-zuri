const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const migrationsDir = path.resolve(__dirname, '..', 'database', 'migrations');

const findEnvFile = (startDir) => {
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
const ensureMigrationsTable = async (client) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.schema_migrations (
      id serial PRIMARY KEY,
      filename text UNIQUE NOT NULL,
      applied_at timestamptz DEFAULT now()
    );
  `);
};

const getApplied = async (client) => {
  const res = await client.query(`SELECT filename FROM public.schema_migrations`);
  return res.rows.map((r) => r.filename);
};

const applyMigration = async (client, filePath) => {
  const sql = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
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

(async () => {
  try {
    const url = loadEnv();
    const client = new Client({ connectionString: url });
    await client.connect();
    try {
      await ensureMigrationsTable(client);
      const applied = await getApplied(client);

      const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();

      const toApply = files.filter((f) => !applied.includes(f));

      for (const f of toApply) {
        if (f === '0006_inventory.sql' || f === '0007_manufacturing.sql') {
          console.log('Skipping existing inventory/manufacturing migration:', f);
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
  } catch (e) {
    console.error('Migration failed', e);
    process.exit(1);
  }
})();
