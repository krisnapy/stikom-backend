import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { db } from '@/db';

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: 'src/db/migrations',
    });

    console.log('Migration successful');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
