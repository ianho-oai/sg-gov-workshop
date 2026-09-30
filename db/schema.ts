import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const connections = sqliteTable('workshop_connections', {
  tokenHash: text('token_hash').primaryKey(),
  expiresAt: integer('expires_at').notNull(),
  event: text('event').notNull(),
});
export const quotas = sqliteTable('workshop_quotas', {
  scope: text('scope').primaryKey(),
  used: integer('used').notNull().default(0),
});
// Earlier gateway tables remain only to preserve applied migration history.
export const keyAttempts = sqliteTable('workshop_key_attempts', {
  scope: text('scope').primaryKey(),
  used: integer('used').notNull().default(0),
});
