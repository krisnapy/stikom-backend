import argon2 from "argon2";
import { db } from "..";
import { users } from "../schemas";
import { uuidv7 } from "uuidv7";
import { InferInsertType } from "@/types/drizzle.types";

const firstUserUUID = uuidv7();

const userSeeds = async (): Promise<Array<InferInsertType<"users">>> => [
  {
    id: firstUserUUID,
    username: "dosenStikomBali",
    email: "dosen@stikom-bali.ac.id",
    fullName: "Dosen Stikom Bali",
    birthPlace: "Denpasar",
    address: "Graha Asri Persada",
    province: "Bali",
    religionId: 3,
    birthDate: new Date("1990-06-25"),
    nik: "12345678901",
    city: "Denpasar",
    regency: "Denpasar",
    gender: "male",
    country: "Indonesia",
    password: await argon2.hash("22222222"),
    phoneNumber: "0812345678900",
    roleId: 1,
  },
  {
    id: uuidv7(),
    username: "210010129",
    email: "210010129@stikom-bali.ac.id",
    fullName: "I Putu Krisna Putra Yasa",
    birthPlace: "Denpasar",
    address: "Graha Asri Persada",
    province: "Bali",
    religionId: 3,
    birthDate: new Date("2003-06-25"),
    nik: "1769827912",
    city: "Tabanan",
    regency: "Denpasar",
    gender: "male",
    country: "Indonesia",
    password: await argon2.hash("22222222"),
    phoneNumber: "08123456789000",
    roleId: 1,
    lecturerId: firstUserUUID,
  },
];

export const userSeeder = async () => {
  try {
    const values = await userSeeds();

    await db.insert(users).values(values);

    console.log("User seeder has been executed!");
  } catch (error) {
    console.error(error);
  }
};
