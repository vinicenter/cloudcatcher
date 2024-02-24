import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const catches = sqliteTable('catches', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  image: text('image').notNull(),
  createdAt: text('created_at').notNull(),
})

export const users = sqliteTable("users", {
	id: text("id").primaryKey(),
	github_id: text("github_id").notNull().unique(),
	username: text("username").notNull().unique()
});

export const sessions = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: integer("expires_at").notNull()
});
