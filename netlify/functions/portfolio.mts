import type { Config } from "@netlify/functions";
import { eq, asc } from "drizzle-orm";
import { db } from "../../db/index.js";
import { developerInfo, projects } from "../../db/schema.js";
import { DEFAULT_DEVELOPER_INFO, DEFAULT_PROJECTS } from "../../db/initialData.js";

export default async (req: Request) => {
  const url = new URL(req.url);
  const isResetPath = url.pathname.endsWith("/reset");

  // Handle Reset Endpoint
  if (isResetPath && req.method === "POST") {
    try {
      // 1. Reset developer info
      await db
        .insert(developerInfo)
        .values(DEFAULT_DEVELOPER_INFO)
        .onConflictDoUpdate({
          target: developerInfo.id,
          set: {
            ...DEFAULT_DEVELOPER_INFO,
            updatedAt: new Date(),
          },
        });

      // 2. Clear and reset projects
      await db.delete(projects);
      if (DEFAULT_PROJECTS.length > 0) {
        await db.insert(projects).values(DEFAULT_PROJECTS);
      }

      return Response.json({
        success: true,
        message: "Portfolio reset to default state in Postgres database.",
        developerInfo: DEFAULT_DEVELOPER_INFO,
        projects: DEFAULT_PROJECTS,
        lastUpdated: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("[Netlify DB] Error resetting portfolio data:", err);
      return Response.json(
        {
          success: true,
          message: "Portfolio reset using fallback state.",
          developerInfo: DEFAULT_DEVELOPER_INFO,
          projects: DEFAULT_PROJECTS,
          lastUpdated: new Date().toISOString(),
          error: err?.message,
        },
        { status: 200 }
      );
    }
  }

  // Handle GET /api/portfolio
  if (req.method === "GET") {
    try {
      let devInfoRows = await db.select().from(developerInfo).limit(1);
      let projectRows = await db.select().from(projects).orderBy(asc(projects.orderIndex));

      // Auto-seed if database is empty on initial provision
      if (devInfoRows.length === 0) {
        console.log("[Netlify DB] First run detected. Seeding initial portfolio data...");
        try {
          const [insertedDev] = await db
            .insert(developerInfo)
            .values(DEFAULT_DEVELOPER_INFO)
            .returning();
          devInfoRows = [insertedDev];
        } catch (seedDevErr) {
          console.warn("[Netlify DB] Seeding devInfo warning:", seedDevErr);
        }
      }

      if (projectRows.length === 0) {
        try {
          if (DEFAULT_PROJECTS.length > 0) {
            projectRows = await db.insert(projects).values(DEFAULT_PROJECTS).returning();
          }
        } catch (seedProjErr) {
          console.warn("[Netlify DB] Seeding projects warning:", seedProjErr);
        }
      }

      const activeDevInfo = devInfoRows[0] || DEFAULT_DEVELOPER_INFO;
      const activeProjects = projectRows.length > 0 ? projectRows : DEFAULT_PROJECTS;

      return Response.json({
        developerInfo: activeDevInfo,
        projects: activeProjects,
        lastUpdated: activeDevInfo.updatedAt || new Date().toISOString(),
        source: "netlify-postgres-database",
      });
    } catch (err: any) {
      console.warn("[Netlify DB] Query fallback:", err?.message);
      return Response.json({
        developerInfo: DEFAULT_DEVELOPER_INFO,
        projects: DEFAULT_PROJECTS,
        lastUpdated: new Date().toISOString(),
        source: "fallback-cache",
        error: err?.message,
      });
    }
  }

  // Handle POST /api/portfolio
  if (req.method === "POST") {
    try {
      const body = await req.json();
      const { developerInfo: newDevInfo, projects: newProjects } = body;

      if (!newDevInfo || !newProjects) {
        return Response.json(
          { error: "Missing developerInfo or projects payload" },
          { status: 400 }
        );
      }

      const now = new Date();

      // Upsert developer info
      const devRecord = {
        id: "current",
        name: newDevInfo.name || DEFAULT_DEVELOPER_INFO.name,
        shortName: newDevInfo.shortName || newDevInfo.name || DEFAULT_DEVELOPER_INFO.shortName,
        title: newDevInfo.title || DEFAULT_DEVELOPER_INFO.title,
        location: newDevInfo.location || DEFAULT_DEVELOPER_INFO.location,
        email: newDevInfo.email || DEFAULT_DEVELOPER_INFO.email,
        phone: newDevInfo.phone || DEFAULT_DEVELOPER_INFO.phone,
        bio: newDevInfo.bio || DEFAULT_DEVELOPER_INFO.bio,
        avatarUrl: newDevInfo.avatarUrl || DEFAULT_DEVELOPER_INFO.avatarUrl,
        socialLinks: newDevInfo.socialLinks || DEFAULT_DEVELOPER_INFO.socialLinks,
        familyInfo: newDevInfo.familyInfo || DEFAULT_DEVELOPER_INFO.familyInfo,
        stats: newDevInfo.stats || DEFAULT_DEVELOPER_INFO.stats,
        education: newDevInfo.education || DEFAULT_DEVELOPER_INFO.education,
        updatedAt: now,
      };

      await db
        .insert(developerInfo)
        .values(devRecord)
        .onConflictDoUpdate({
          target: developerInfo.id,
          set: devRecord,
        });

      // Synchronize projects table
      if (Array.isArray(newProjects)) {
        await db.delete(projects);
        if (newProjects.length > 0) {
          const formattedProjects = newProjects.map((p: any, index: number) => ({
            id: p.id || `proj-${Date.now()}-${index}`,
            title: p.title || "Untitled Project",
            category: p.category || "web-app",
            categoryLabel: p.categoryLabel || "Web Application",
            tagline: p.tagline || "",
            description: p.description || "",
            fullOverview: p.fullOverview || "",
            image: p.image || "/src/assets/images/school_erp_dashboard_1791620350520.jpg",
            role: p.role || "Developer",
            year: p.year || "2026",
            status: p.status || "Production Ready",
            technologies: Array.isArray(p.technologies) ? p.technologies : [],
            keyFeatures: Array.isArray(p.keyFeatures) ? p.keyFeatures : [],
            databaseSchema: Array.isArray(p.databaseSchema) ? p.databaseSchema : [],
            demoAvailable: Boolean(p.demoAvailable),
            githubUrl: p.githubUrl || null,
            orderIndex: index,
            updatedAt: now,
          }));

          await db.insert(projects).values(formattedProjects);
        }
      }

      return Response.json({
        success: true,
        message: "Portfolio data saved permanently in Postgres database!",
        lastUpdated: now.toISOString(),
      });
    } catch (err: any) {
      console.error("[Netlify DB] Error saving portfolio data:", err);
      return Response.json(
        {
          success: false,
          error: "Failed to persist to Postgres database: " + (err?.message || "Unknown error"),
        },
        { status: 500 }
      );
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/portfolio", "/api/portfolio/reset"],
};
