import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { useDrizzle } from '../utils/drizzle'

export default defineNitroPlugin(async () => {
  if (process.dev) {
    migrate(useDrizzle() as BetterSQLite3Database, { migrationsFolder: 'server/database/migrations' })
  }
})
