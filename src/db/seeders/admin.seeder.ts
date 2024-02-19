import argon2 from "argon2";
import { uuidv7 } from "uuidv7";

import { db } from "..";
import { admins } from "../schemas";

import { InferInsertType } from "@/types/drizzle.types";

const adminSeeds = async (): Promise<Array<InferInsertType<"admins">>> => [
  {
    id: uuidv7(),
    username: "superAdmin",
    email: "superAdmin@test.test",
    password: await argon2.hash("22222222"),
    adminType: "super_admin",
    phoneNumber: "0812345678900",
  },
  {
    id: uuidv7(),
    username: "admin",
    email: "admin@test.test",
    password: await argon2.hash("22222222"),
    adminType: "admin",
    phoneNumber: "0812345678901",
  },
];

export const adminSeeder = async () => {
  try {
    const values = await adminSeeds();

    await db.insert(admins).values(values);
  } catch (error) {
    console.error(error);
  }
};
