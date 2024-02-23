import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const catches = sqliteTable('catches', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  ipfsCid: text('ipfs_cid').notNull(),
  createdAt: text('created_at').notNull(),
})
