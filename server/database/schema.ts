import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { v4 as uuidv4 } from 'uuid';

export const catches = sqliteTable('catches', {
	id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  title: text('title').notNull(),
  image: text('image').notNull(),
  createdAt: text('created_at').notNull(),
})

export const users = sqliteTable("users", {
	id: text("id").primaryKey().$defaultFn(() => uuidv4()),
	github_id: text("github_id").notNull().unique(),
	username: text("username").notNull().unique(),
	name: text("name").notNull(),
	avatar: text("avatar")
});

export const sessions = sqliteTable("sessions", {
	id: text("id").primaryKey().$defaultFn(() => uuidv4()),
	userId: text("user_id")
		.notNull()
		.references(() => users.id),
	expiresAt: integer("expires_at").notNull()
});

export const devices = sqliteTable("devices", {
	id: text("id").primaryKey().$defaultFn(() => uuidv4()),
	userId: text("user_id").notNull().references(() => users.id),
	name: text("name").notNull(),
	description: text("description"),
});
