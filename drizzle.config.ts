import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schemas/*',
  driver: 'pg',
  dbCredentials: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USERNAME,
  },
  verbose: false,
  strict: false,
  out: './drizzle',
});
