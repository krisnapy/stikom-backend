import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  date,
  text,
  integer,
  timestamp,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

import { InferResultType } from "@/types/drizzle.types";

import { religions } from "./religion.schema";
import { roles } from "./role.schema";

export const genderEnum = pgEnum("male", ["male", "female"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().default(uuidv7()),
  username: varchar("username", { length: 100 }).unique().notNull(),
  email: varchar("email", { length: 100 }).unique().notNull(),
  phoneNumber: varchar("phone_number", { length: 15 }).unique().notNull(),
  birthDate: date("birth_date", { mode: "date" }),
  birthPlace: varchar("birth_place", { length: 100 }),
  gender: genderEnum("gender"),
  address: text("address"),
  avatar: varchar("avatar", { length: 255 }),
  fullName: varchar("full_name", { length: 255 }),
  religionId: integer("religion_id"),
  nik: varchar("nik", { length: 100 }),
  nisn: varchar("nisn", { length: 100 }),
  password: varchar("password", { length: 100 }),
  roleId: integer("role_id"),
  province: varchar("province", { length: 100 }),
  city: varchar("city", { length: 100 }),
  regency: varchar("regency", { length: 100 }),
  village: varchar("village", { length: 100 }),
  country: varchar("country", { length: 100 }),
  lecturerId: uuid("lecturer_id"),
  registerDate: date("register_date"),
  graduationDate: date("graduation_date"),
  fatherName: varchar("father_name", { length: 100 }),
  motherName: varchar("mother_name", { length: 100 }),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  lecture: one(users, {
    fields: [users.lecturerId],
    references: [users.id],
  }),
  religion: one(religions, {
    fields: [users.religionId],
    references: [religions.id],
  }),
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));

export type User = InferResultType<"users">;
