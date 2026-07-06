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
  return url;
};

(async () => {
  try {
    const url = loadEnv();
    const client = new Client({ connectionString: url });
    await client.connect();
    try {
      const res = await client.query(`SELECT filename, applied_at FROM public.schema_migrations ORDER BY applied_at`);
      const applied = res.rows.map((r) => r.filename);
      console.log('Applied migrations:', applied.join(', '));

      const files = fs.readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort();
      const pending = files.filter((f) => !applied.includes(f));
      console.log('Pending migrations:', pending.join(', '));
    } finally {
      await client.end();
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
