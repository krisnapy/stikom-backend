import { db } from "..";
import { religions } from "../schemas";
import { InferInsertType } from "@/types/drizzle.types";

const religionSeeds = async (): Promise<
  Array<InferInsertType<"religions">>
> => [
  {
    id: 1,
    name: "islam",
  },
  {
    id: 2,
    name: "kristen",
  },
  {
    id: 3,
    name: "katholik",
  },
  {
    id: 4,
    name: "hindu",
  },
  {
    id: 5,
    name: "buddha",
  },
  {
    id: 6,
    name: "kong hu cu",
  },
];

export const religionSeeder = async () => {
  try {
    const values = await religionSeeds();

    await db.insert(religions).values(values);

    console.log("Religion seeder has been executed!");
  } catch (error) {
    console.error(error);
  }
};
