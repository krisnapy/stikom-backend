import { pgTable, varchar, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

import { InferResultType } from "@/types/drizzle.types";
import { relations } from "drizzle-orm";
import { groupMembers } from "./group-member.schema";
import { users } from "./user.schema";

export const groups = pgTable("groups", {
  uuid: uuid("uuid").primaryKey().default(uuidv7()),
  name: varchar("name", { length: 100 }).unique().notNull(),
  description: text("description"),
  createdBy: uuid("created_by").references(() => users.uuid),

  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  groupMembers: many(groupMembers),
}));

export type Group = InferResultType<"groups">;
