import { adminSeeder } from './admin.seeder';
import { groupMemberSeeder } from './group-member.seeder';
import { groupSeeder } from './group.seeder';
import { userSeeder } from './users.seeder';

const seedAll = async () => {
  try {
    await adminSeeder();
    await userSeeder();
    await groupSeeder();
    await groupMemberSeeder();
  } catch (error) {
    console.error('Error in seedAll:', error);
  }
};

await seedAll().then(() => {
  console.log('All seeders executed successfully!');
});
