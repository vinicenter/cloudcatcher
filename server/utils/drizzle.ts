import { drizzle as drizzleD1, DrizzleD1Database } from 'drizzle-orm/d1'
import { createClient as createLibSQLClient } from '@libsql/client/http'
import { drizzle as drizzleLibSQL, LibSQLDatabase } from 'drizzle-orm/libsql'
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
// @ts-ignore
import Database from 'better-sqlite3'
import { join } from 'pathe'

export * as tables from '~/server/database/schema'

let _db: DrizzleD1Database | BetterSQLite3Database | LibSQLDatabase | null = null

export const useDrizzle = () => {
  const config = useRuntimeConfig()

  if (!_db) {
    if (config.TURSO_DB_URL && config.TURSO_DB_TOKEN) {
      // Turso in production
      _db = drizzleLibSQL(createLibSQLClient({
        url: config.TURSO_DB_URL,
        authToken: config.TURSO_DB_TOKEN
      }))
    } else if (config.DB) {
      // d1 in production
      _db = drizzleD1(config.DB)
    } else if (process.dev) {
      // local sqlite in development
      const sqlite = new Database(join(process.cwd(), './db.sqlite'))
      _db = drizzle(sqlite)
    } else {
      throw new Error('No database configured for production')
    }
  }
  return _db
}
