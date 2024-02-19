DO $$ BEGIN
 CREATE TYPE "admin_types" AS ENUM('super', 'admin', 'moderator');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "adminssss" ALTER COLUMN "id" SET DEFAULT '018dac2b-f232-7dd3-a970-5b5c84513d31';--> statement-breakpoint
ALTER TABLE "adminssss" ALTER COLUMN "admin_type" SET DATA TYPE admin_types;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "id" SET DEFAULT '018dac2b-f23d-7bb2-b67f-4a064d422a2d';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT '018dac2b-f248-7f0e-b3ca-aaf6bc0f67a1';