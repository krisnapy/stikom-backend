import { InferResultType } from "@/types/drizzle.types";
import { pgTable, varchar, timestamp, serial } from "drizzle-orm/pg-core";

export const courseNames = pgTable("course_names", {
  id: serial("id").primaryKey().unique(),
  name: varchar("name", { length: 100 }).notNull().unique(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export type CourseName = InferResultType<"courseNames">;
