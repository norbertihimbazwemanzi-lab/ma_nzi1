import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";

// 1. Developer Profile / Portfolio Information
export const developerInfo = pgTable("developer_info", {
  id: text("id").primaryKey().default("current"),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url"),
  socialLinks: jsonb("social_links").$type<{
    github?: string;
    linkedin?: string;
    whatsapp?: string;
    twitter?: string;
    [key: string]: any;
  }>(),
  familyInfo: jsonb("family_info").$type<{
    title?: string;
    subtitle?: string;
    images?: Array<{ url: string; caption: string; tag: string }>;
    contacts?: Array<{ label: string; name: string; phone: string; location: string; role: string }>;
    friends?: Array<{ id: string; name: string; role: string; phone: string; location: string; image: string; note: string }>;
    [key: string]: any;
  }>(),
  stats: jsonb("stats").$type<Array<{ label: string; value: string }>>(),
  education: jsonb("education").$type<{
    institution?: string;
    program?: string;
    focus?: string;
    [key: string]: any;
  }>(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 2. Showcase Projects
export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // 'school' | 'web-app' | 'learning'
  categoryLabel: text("category_label").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  fullOverview: text("full_overview").notNull(),
  image: text("image").notNull(),
  role: text("role").notNull(),
  year: text("year").notNull(),
  status: text("status").notNull(), // 'Production Ready' | 'Active Prototype' | 'In Development'
  technologies: jsonb("technologies").$type<string[]>().notNull(),
  keyFeatures: jsonb("key_features").$type<string[]>().notNull(),
  databaseSchema: jsonb("database_schema").$type<Array<{ table: string; columns: string[]; description: string }>>().notNull(),
  demoAvailable: boolean("demo_available").default(false),
  githubUrl: text("github_url"),
  orderIndex: integer("order_index").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 3. Contact Inquiries & Collaboration Messages
export const contactInquiries = pgTable("contact_inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  schoolOrOrg: text("school_or_org"),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  status: text("status").default("new"), // 'new' | 'read' | 'replied'
  createdAt: timestamp("created_at").defaultNow(),
});

// 4. EduRunda School Management System: Students
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  regNo: text("reg_no").notNull().unique(),
  name: text("name").notNull(),
  className: text("class_name").notNull(),
  guardian: text("guardian").notNull(),
  phone: text("phone").notNull(),
  tuitionTotal: integer("tuition_total").notNull().default(0),
  tuitionPaid: integer("tuition_paid").notNull().default(0),
  status: text("status").notNull().default("Active"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 5. Academix Grading Engine: Student Grades & Assessments
export const grades = pgTable("grades", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  teacher: text("teacher").notNull(),
  coursework: integer("coursework").notNull().default(0), // Out of 40
  exam: integer("exam").notNull().default(0), // Out of 60
  createdAt: timestamp("created_at").defaultNow(),
});

// 6. AttendTrack Pro: Daily Roll-Call & Attendance Records
export const attendanceRecords = pgTable("attendance_records", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id, { onDelete: "cascade" }),
  status: text("status").notNull(), // 'present' | 'late' | 'absent' | 'excused'
  recordDate: timestamp("record_date").defaultNow(),
  notes: text("notes"),
});

// 7. SchoolFee Manager: Tuition Billing & Payment Transactions
export const feePayments = pgTable("fee_payments", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  paymentMethod: text("payment_method").notNull(),
  referenceCode: text("reference_code").notNull(),
  paidAt: timestamp("paid_at").defaultNow(),
});

export type DeveloperInfoRow = typeof developerInfo.$inferSelect;
export type InsertDeveloperInfo = typeof developerInfo.$inferInsert;
export type ProjectRow = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;
export type ContactInquiryRow = typeof contactInquiries.$inferSelect;
export type StudentRow = typeof students.$inferSelect;
export type GradeRow = typeof grades.$inferSelect;
export type AttendanceRecordRow = typeof attendanceRecords.$inferSelect;
export type FeePaymentRow = typeof feePayments.$inferSelect;
