import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

// На Railway build-окружение может не резолвить internal-хост.
// Используем DATABASE_URL, при отсутствии — fallback на DATABASE_PUBLIC_URL.
const connectionString = process.env.DATABASE_URL ?? process.env.DATABASE_PUBLIC_URL

if (!connectionString) {
  throw new Error("Neither DATABASE_URL nor DATABASE_PUBLIC_URL is set")
}

const pool = new Pool({
  connectionString,
})

export const db = drizzle(pool)
export { pool }
