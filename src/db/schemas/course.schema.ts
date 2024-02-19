import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  integer,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

import { InferResultType } from "@/types/drizzle.types";

import { courseNames } from "./course-name.schema";
import { programs } from "./program.schema";

export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().unique().default(uuidv7()),
  courseNameId: integer("course_name_id").notNull(),
  code: varchar("code", { length: 10 }).unique().notNull(),
  semester: integer("semester").notNull(),
  sks: integer("sks").notNull(),
  programId: integer("program_id").notNull(),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const courseRelations = relations(courses, ({ one }) => ({
  courseName: one(courseNames, {
    fields: [courses.courseNameId],
    references: [courseNames.id],
    relationName: "course_name",
  }),
  programStudy: one(programs, {
    fields: [courses.programId],
    references: [programs.id],
    relationName: "program_study",
  }),
}));

export type Course = InferResultType<"courses">;
