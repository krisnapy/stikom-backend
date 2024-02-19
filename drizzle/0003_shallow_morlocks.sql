DO $$ BEGIN
 CREATE TYPE "admin" AS ENUM('super_admin', 'admin', 'moderator');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "adminssss" ALTER COLUMN "id" SET DEFAULT '018dac2d-3a23-73c9-b30e-6ea937ff5d37';--> statement-breakpoint
ALTER TABLE "adminssss" ALTER COLUMN "admin_type" SET DATA TYPE admin;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "id" SET DEFAULT '018dac2d-3a2b-7502-b871-6e21abd3e980';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT '018dac2d-3a33-7727-a226-d8569b1f8a99';