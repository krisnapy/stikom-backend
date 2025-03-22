// import { InferResultType } from "@/types/drizzle.types";
// import { pgTable, timestamp, serial, varchar } from "drizzle-orm/pg-core";

// export const roles = pgTable("roles", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 50 }).unique().default("dosen"),

//   createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
//   updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
// });

// export type Role = InferResultType<"users">;
