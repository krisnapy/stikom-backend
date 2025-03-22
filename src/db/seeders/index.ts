import { adminSeeder } from "./admin.seeder";
import { userSeeder } from "./users.seeder";

const seedAll = async () => {
  try {
    await adminSeeder();
    await userSeeder();

    console.log("All seeders executed successfully!");
  } catch (error) {
    console.error("Error in seedAll:", error);
  }
};

await seedAll();
