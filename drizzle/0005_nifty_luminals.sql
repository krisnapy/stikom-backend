CREATE TABLE IF NOT EXISTS "admins" (
	"id" uuid PRIMARY KEY DEFAULT '018dac2e-7c05-7575-a82d-48ebf582eb4a' NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"password" varchar(100) NOT NULL,
	"admin_type" "admin",
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "admins_username_unique" UNIQUE("username"),
	CONSTRAINT "admins_email_unique" UNIQUE("email"),
	CONSTRAINT "admins_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
DROP TABLE "adminssss";--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "id" SET DEFAULT '018dac2e-7c10-7adc-aec9-6279b47e801d';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT '018dac2e-7c1b-7a34-933e-4dfe65f09830';