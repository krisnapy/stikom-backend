// import { pgTable, varchar, timestamp, serial } from "drizzle-orm/pg-core";

// import { InferResultType } from "@/types/drizzle.types";

// export const religions = pgTable("religions", {
//   id: serial("id").primaryKey().unique(),
//   name: varchar("name", { length: 50 }).unique().notNull(),

//   createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
//   updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
// });

// export type Religion = InferResultType<"religions">;
