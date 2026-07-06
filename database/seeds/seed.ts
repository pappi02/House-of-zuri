import { execSync } from 'child_process';
import path from 'path';

const seedFile = path.resolve(__dirname, 'seed.sql');
console.log(`Running database seed from ${seedFile}`);
execSync(`psql "$SUPABASE_URL" -f "${seedFile}"`, { stdio: 'inherit' });
