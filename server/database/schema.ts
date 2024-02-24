import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const catches = sqliteTable('catches', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  image: text('image').notNull(),
  createdAt: text('created_at').notNull(),
})
