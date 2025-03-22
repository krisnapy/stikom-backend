import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schemas/*',
  dialect: 'postgresql',
  dbCredentials: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USERNAME,
    ssl: process.env.DATABASE_HOST === 'localhost' ? false : true,
  },
  verbose: false,
  strict: false,
  out: './drizzle',
});
