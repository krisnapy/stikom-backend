import { pgTable, varchar, timestamp, serial } from "drizzle-orm/pg-core";

export const programs = pgTable("programs", {
  id: serial("id").primaryKey().unique(),
  name: varchar("name", { length: 100 }).unique().notNull(),
  code: varchar("code", { length: 10 }).unique().notNull(),
  degree: varchar("degree", { length: 2 }).notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});
