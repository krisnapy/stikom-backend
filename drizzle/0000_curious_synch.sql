DO $$ BEGIN
 CREATE TYPE "male" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adminssss" (
	"id" uuid PRIMARY KEY DEFAULT '018dac2a-f92b-7621-8ee5-9871bfe05204' NOT NULL,
	"username" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"password" varchar(100) NOT NULL,
	"admin_type" "admin",
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "adminssss_username_unique" UNIQUE("username"),
	CONSTRAINT "adminssss_email_unique" UNIQUE("email"),
	CONSTRAINT "adminssss_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_names" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "course_names_id_unique" UNIQUE("id"),
	CONSTRAINT "course_names_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"id" uuid PRIMARY KEY DEFAULT '018dac2a-f943-72eb-ba9a-4232f69c5fbf' NOT NULL,
	"course_name_id" integer NOT NULL,
	"code" varchar(10) NOT NULL,
	"semester" integer NOT NULL,
	"sks" integer NOT NULL,
	"program_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "courses_id_unique" UNIQUE("id"),
	CONSTRAINT "courses_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT '018dac2a-f950-78de-b5f2-fad6ee8dba30' NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"birth_date" date,
	"birth_place" varchar(100),
	"gender" "male",
	"address" text,
	"avatar" varchar(255),
	"full_name" varchar(255),
	"religion_id" integer,
	"nik" varchar(100),
	"nisn" varchar(100),
	"password" varchar(100),
	"role_id" integer,
	"province" varchar(100),
	"city" varchar(100),
	"regency" varchar(100),
	"village" varchar(100),
	"country" varchar(100),
	"lecturer_id" uuid,
	"register_date" date,
	"graduation_date" date,
	"father_name" varchar(100),
	"mother_name" varchar(100),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) DEFAULT 'dosen',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "programs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(10) NOT NULL,
	"degree" varchar(2) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "programs_id_unique" UNIQUE("id"),
	CONSTRAINT "programs_name_unique" UNIQUE("name"),
	CONSTRAINT "programs_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "religions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "religions_id_unique" UNIQUE("id"),
	CONSTRAINT "religions_name_unique" UNIQUE("name")
);
