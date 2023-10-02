import { pgTable, primaryKey, timestamp, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";

export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users  = pgTable('users', {
  id: uuid('id').notNull().defaultRandom(),
  email: varchar('email', { length: 256 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  applicationId: uuid('application_id').references(() => applications.id),
  password: varchar('password', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (users) => {
  return {
    cpk: primaryKey(users.email, users.applicationId),
    idIndex: uniqueIndex('users_id_index').on(users.id),
  }
});