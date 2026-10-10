CREATE TABLE "attendance_records" (
	"id" serial PRIMARY KEY,
	"student_id" integer,
	"status" text NOT NULL,
	"record_date" timestamp DEFAULT now(),
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "contact_inquiries" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"school_or_org" text,
	"project_type" text NOT NULL,
	"message" text NOT NULL,
	"status" text DEFAULT 'new',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "developer_info" (
	"id" text PRIMARY KEY DEFAULT 'current',
	"name" text NOT NULL,
	"short_name" text NOT NULL,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"bio" text NOT NULL,
	"avatar_url" text,
	"social_links" jsonb,
	"family_info" jsonb,
	"stats" jsonb,
	"education" jsonb,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "fee_payments" (
	"id" serial PRIMARY KEY,
	"student_id" integer,
	"amount" integer NOT NULL,
	"payment_method" text NOT NULL,
	"reference_code" text NOT NULL,
	"paid_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "grades" (
	"id" serial PRIMARY KEY,
	"student_id" integer,
	"subject" text NOT NULL,
	"teacher" text NOT NULL,
	"coursework" integer DEFAULT 0 NOT NULL,
	"exam" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"category_label" text NOT NULL,
	"tagline" text NOT NULL,
	"description" text NOT NULL,
	"full_overview" text NOT NULL,
	"image" text NOT NULL,
	"role" text NOT NULL,
	"year" text NOT NULL,
	"status" text NOT NULL,
	"technologies" jsonb NOT NULL,
	"key_features" jsonb NOT NULL,
	"database_schema" jsonb NOT NULL,
	"demo_available" boolean DEFAULT false,
	"github_url" text,
	"order_index" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY,
	"reg_no" text NOT NULL UNIQUE,
	"name" text NOT NULL,
	"class_name" text NOT NULL,
	"guardian" text NOT NULL,
	"phone" text NOT NULL,
	"tuition_total" integer DEFAULT 0 NOT NULL,
	"tuition_paid" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'Active' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_student_id_students_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "fee_payments" ADD CONSTRAINT "fee_payments_student_id_students_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "grades" ADD CONSTRAINT "grades_student_id_students_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE;