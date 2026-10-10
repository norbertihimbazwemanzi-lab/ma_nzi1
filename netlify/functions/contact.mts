import type { Config } from "@netlify/functions";
import { desc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { contactInquiries } from "../../db/schema.js";

export default async (req: Request) => {
  // GET: Fetch inquiries
  if (req.method === "GET") {
    try {
      const inquiries = await db
        .select()
        .from(contactInquiries)
        .orderBy(desc(contactInquiries.createdAt))
        .limit(100);

      return Response.json({
        success: true,
        inquiries,
      });
    } catch (err: any) {
      console.warn("[Netlify DB] Error fetching contact inquiries:", err?.message);
      return Response.json({
        success: true,
        inquiries: [],
        note: "Database temporarily unavailable or initial provisioning in progress.",
      });
    }
  }

  // POST: Record new user contact inquiry
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { name, email, schoolOrOrg, projectType, message } = body;

      if (!name || !email || !message) {
        return Response.json(
          { error: "Name, email, and message are required fields" },
          { status: 400 }
        );
      }

      const [inserted] = await db
        .insert(contactInquiries)
        .values({
          name: name.trim(),
          email: email.trim(),
          schoolOrOrg: schoolOrOrg ? schoolOrOrg.trim() : null,
          projectType: projectType || "School Management System (SMS)",
          message: message.trim(),
          status: "new",
        })
        .returning();

      return Response.json(
        {
          success: true,
          message: "Thank you! Your message and project inquiry have been saved in the database.",
          inquiry: inserted,
        },
        { status: 201 }
      );
    } catch (err: any) {
      console.error("[Netlify DB] Error saving contact inquiry:", err);
      return Response.json(
        {
          success: false,
          error: "Failed to record inquiry in database: " + (err?.message || "Unknown error"),
        },
        { status: 500 }
      );
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/contact",
};
