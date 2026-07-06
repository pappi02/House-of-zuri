import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const findEnvFile = (startDir: string): string | undefined => {
  let currentDir = startDir;

  while (true) {
    const candidate = path.join(currentDir, '.env');

    if (fs.existsSync(candidate)) {
      return candidate;
    }

    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
      return undefined;
    }

    currentDir = parentDir;
  }
};

const resolvedEnvPath = findEnvFile(path.resolve(__dirname));

if (resolvedEnvPath) {
  dotenv.config({ path: resolvedEnvPath });
}

const databaseUrl = process.env.TEST_DATABASE_URL ?? process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'Missing database URL. Set TEST_DATABASE_URL, DIRECT_URL, or DATABASE_URL in the environment or in a .env file.',
  );
}

process.env.TEST_DATABASE_URL = databaseUrl;
process.env.DIRECT_URL = databaseUrl;
process.env.DATABASE_URL = databaseUrl;

export const prisma = new PrismaClient({
  log: ['error', 'warn'],
});
