import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

import { globalSchema } from '@/core/registry/db';

if (!process.env.DATABASE_URL) {
  throw new Error("The DATABASE_URL environment variable was not found. Please check your .env file.");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool, { schema: globalSchema });