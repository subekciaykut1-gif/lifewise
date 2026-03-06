import { neon, NeonQueryFunction } from '@neondatabase/serverless';

let _sql: NeonQueryFunction<false, false> | null = null;

/**
 * Returns the Neon SQL client, initializing it lazily on first call.
 * This prevents build-time crashes when DATABASE_URL may not be available.
 */
export function getDb(): NeonQueryFunction<false, false> {
  if (_sql) return _sql;
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined. Add it to your .env.local and Vercel environment variables.');
  }
  _sql = neon(process.env.DATABASE_URL);
  return _sql;
}

// Re-export a convenience `sql` tag that lazy-inits the connection
export const sql = (...args: Parameters<NeonQueryFunction<false, false>>) =>
  getDb()(...args);
