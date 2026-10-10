import type { Config } from "@netlify/functions";
import { eq, desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { students, grades, attendanceRecords, feePayments } from "../../db/schema.js";
import { INITIAL_STUDENTS_DATA, INITIAL_GRADES_DATA } from "../../db/initialData.js";

export default async (req: Request) => {
  // GET: Retrieve all school system data
  if (req.method === "GET") {
    try {
      let studentList = await db.select().from(students).orderBy(students.id);

      // Auto-seed if students table is empty
      if (studentList.length === 0) {
        console.log("[Netlify DB] Seeding initial school system students & grades...");
        try {
          studentList = await db.insert(students).values(INITIAL_STUDENTS_DATA).returning();
          
          if (studentList.length > 0) {
            const gradeRows = INITIAL_GRADES_DATA.map((g) => ({
              studentId: studentList[0].id,
              subject: g.subject,
              teacher: g.teacher,
              coursework: g.coursework,
              exam: g.exam,
            }));
            await db.insert(grades).values(gradeRows);
          }
        } catch (seedErr) {
          console.warn("[Netlify DB] Error auto-seeding school tables:", seedErr);
        }
      }

      const allGrades = await db.select().from(grades);
      const allPayments = await db.select().from(feePayments).orderBy(desc(feePayments.paidAt)).limit(20);
      const allAttendance = await db.select().from(attendanceRecords).orderBy(desc(attendanceRecords.recordDate)).limit(50);

      return Response.json({
        success: true,
        students: studentList,
        grades: allGrades,
        payments: allPayments,
        attendance: allAttendance,
        source: "netlify-postgres-database",
      });
    } catch (err: any) {
      console.warn("[Netlify DB] School data fallback:", err?.message);
      return Response.json({
        success: true,
        students: INITIAL_STUDENTS_DATA.map((s, idx) => ({ ...s, id: idx + 1 })),
        grades: INITIAL_GRADES_DATA,
        payments: [],
        attendance: [],
        source: "fallback-data",
      });
    }
  }

  // POST: Execute school operations
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { action } = body;

      // 1. Add new student
      if (action === "add-student") {
        const { regNo, name, className, guardian, phone, tuitionTotal, tuitionPaid } = body.student;
        const [newStudent] = await db
          .insert(students)
          .values({
            regNo: regNo || `RND-${Date.now().toString().slice(-6)}`,
            name,
            className: className || "Senior 3 A",
            guardian: guardian || "N/A",
            phone: phone || "+250 780 000 000",
            tuitionTotal: Number(tuitionTotal) || 185000,
            tuitionPaid: Number(tuitionPaid) || 0,
            status: "Active",
          })
          .returning();

        return Response.json({
          success: true,
          message: "Student registered successfully in database!",
          student: newStudent,
        });
      }

      // 2. Record fee payment
      if (action === "record-payment") {
        const { studentId, amount, paymentMethod, referenceCode } = body;
        const numericAmount = Number(amount) || 0;

        const [payment] = await db
          .insert(feePayments)
          .values({
            studentId: Number(studentId),
            amount: numericAmount,
            paymentMethod: paymentMethod || "MTN Mobile Money",
            referenceCode: referenceCode || `REC-${Date.now().toString().slice(-8)}`,
          })
          .returning();

        // Update student balance
        if (studentId) {
          const studentRows = await db.select().from(students).where(eq(students.id, Number(studentId)));
          if (studentRows.length > 0) {
            const currentPaid = studentRows[0].tuitionPaid || 0;
            await db
              .update(students)
              .set({ tuitionPaid: currentPaid + numericAmount })
              .where(eq(students.id, Number(studentId)));
          }
        }

        return Response.json({
          success: true,
          message: "Tuition installment recorded in database!",
          payment,
        });
      }

      // 3. Record attendance
      if (action === "record-attendance") {
        const { records } = body; // Array of { studentId, status, notes }
        if (Array.isArray(records) && records.length > 0) {
          const inserted = await db
            .insert(attendanceRecords)
            .values(
              records.map((r: any) => ({
                studentId: Number(r.studentId),
                status: r.status || "present",
                notes: r.notes || null,
              }))
            )
            .returning();

          return Response.json({
            success: true,
            message: "Attendance batch saved to database!",
            count: inserted.length,
          });
        }
      }

      return Response.json({ error: "Unknown action" }, { status: 400 });
    } catch (err: any) {
      console.error("[Netlify DB] Error updating school system:", err);
      return Response.json(
        {
          success: false,
          error: "Database error: " + (err?.message || "Unknown error"),
        },
        { status: 500 }
      );
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/school",
};
