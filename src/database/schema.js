import { pgTable, varchar, serial, text } from 'drizzle-orm/pg-core';


export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  username: text('username').notNull(),
  password: varchar('password', { length: 255 }).notNull(),
});