import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const contactsTable = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  website: varchar('website', { length: 255 }),
  mobile: varchar('mobile', { length: 20 }).notNull(),
  message: text('message').notNull(),
  service: varchar('service', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Contact = typeof contactsTable.$inferSelect;
export type ContactInsert = typeof contactsTable.$inferInsert;

export const planInquiriesTable = pgTable('plan_inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  website: varchar('website', { length: 255 }),
  plan: varchar('plan', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type PlanInquiry = typeof planInquiriesTable.$inferSelect;
export type PlanInquiryInsert = typeof planInquiriesTable.$inferInsert;
