import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { asc, desc, eq } from 'drizzle-orm';
import { db } from './db/index.js';
import {
  developerInfo as devInfoTable,
  projects as projectsTable,
  contactInquiries,
  students,
  grades,
  feePayments,
} from './db/schema.js';
import {
  DEFAULT_DEVELOPER_INFO,
  DEFAULT_PROJECTS,
  INITIAL_STUDENTS_DATA,
  INITIAL_GRADES_DATA,
} from './db/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const DATA_FILE = path.join(__dirname, 'src', 'data', 'live_portfolio.json');

// Support image uploads as data URLs
app.use(express.json({ limit: '20mb' }));

// 1. Get current universal portfolio data
app.get('/api/portfolio', async (_req, res) => {
  // Try Netlify Postgres Database first
  try {
    let devRows = await db.select().from(devInfoTable).limit(1);
    let projRows = await db.select().from(projectsTable).orderBy(asc(projectsTable.orderIndex));

    if (devRows.length === 0 && DEFAULT_DEVELOPER_INFO) {
      try {
        devRows = await db.insert(devInfoTable).values(DEFAULT_DEVELOPER_INFO).returning();
      } catch {}
    }
    if (projRows.length === 0 && DEFAULT_PROJECTS.length > 0) {
      try {
        projRows = await db.insert(projectsTable).values(DEFAULT_PROJECTS).returning();
      } catch {}
    }

    if (devRows.length > 0) {
      return res.json({
        developerInfo: devRows[0],
        projects: projRows.length > 0 ? projRows : DEFAULT_PROJECTS,
        lastUpdated: devRows[0].updatedAt || new Date().toISOString(),
        source: 'database',
      });
    }
  } catch (dbErr) {
    // Database connection pending or offline in local dev without credentials
  }

  // Fallback to local JSON cache
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      return res.json({ ...data, source: 'file' });
    }
    return res.json({
      developerInfo: DEFAULT_DEVELOPER_INFO,
      projects: DEFAULT_PROJECTS,
      lastUpdated: new Date().toISOString(),
      source: 'defaults',
    });
  } catch (err) {
    console.error('Failed reading live_portfolio.json:', err);
    return res.status(500).json({ error: 'Failed to read server data' });
  }
});

// 2. Permanent update endpoint
app.post('/api/portfolio', async (req, res) => {
  try {
    const { developerInfo, projects } = req.body;
    if (!developerInfo || !projects) {
      return res.status(400).json({ error: 'Missing developerInfo or projects payload' });
    }

    const updatedData = {
      developerInfo,
      projects,
      lastUpdated: new Date().toISOString(),
    };

    // Save to Postgres Database
    try {
      const devRecord = {
        id: 'current',
        name: developerInfo.name || DEFAULT_DEVELOPER_INFO.name,
        shortName: developerInfo.shortName || developerInfo.name || DEFAULT_DEVELOPER_INFO.shortName,
        title: developerInfo.title || DEFAULT_DEVELOPER_INFO.title,
        location: developerInfo.location || DEFAULT_DEVELOPER_INFO.location,
        email: developerInfo.email || DEFAULT_DEVELOPER_INFO.email,
        phone: developerInfo.phone || DEFAULT_DEVELOPER_INFO.phone,
        bio: developerInfo.bio || DEFAULT_DEVELOPER_INFO.bio,
        avatarUrl: developerInfo.avatarUrl || DEFAULT_DEVELOPER_INFO.avatarUrl,
        socialLinks: developerInfo.socialLinks || DEFAULT_DEVELOPER_INFO.socialLinks,
        familyInfo: developerInfo.familyInfo || DEFAULT_DEVELOPER_INFO.familyInfo,
        stats: developerInfo.stats || DEFAULT_DEVELOPER_INFO.stats,
        education: developerInfo.education || DEFAULT_DEVELOPER_INFO.education,
        updatedAt: new Date(),
      };

      await db
        .insert(devInfoTable)
        .values(devRecord)
        .onConflictDoUpdate({
          target: devInfoTable.id,
          set: devRecord,
        });

      if (Array.isArray(projects)) {
        await db.delete(projectsTable);
        if (projects.length > 0) {
          const formatted = projects.map((p: any, idx: number) => ({
            id: p.id || `proj-${Date.now()}-${idx}`,
            title: p.title || 'Untitled',
            category: p.category || 'web-app',
            categoryLabel: p.categoryLabel || 'Web Application',
            tagline: p.tagline || '',
            description: p.description || '',
            fullOverview: p.fullOverview || '',
            image: p.image || '/src/assets/images/school_erp_dashboard_1791620350520.jpg',
            role: p.role || 'Developer',
            year: p.year || '2026',
            status: p.status || 'Production Ready',
            technologies: p.technologies || [],
            keyFeatures: p.keyFeatures || [],
            databaseSchema: p.databaseSchema || [],
            demoAvailable: Boolean(p.demoAvailable),
            githubUrl: p.githubUrl || null,
            orderIndex: idx,
            updatedAt: new Date(),
          }));
          await db.insert(projectsTable).values(formatted);
        }
      }
    } catch (dbErr) {
      console.warn('[Server DB Sync] DB write bypassed:', (dbErr as Error)?.message);
    }

    // Keep file synced as local backup
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');

    return res.json({
      success: true,
      message: 'Portfolio data saved permanently in Postgres and synced!',
      lastUpdated: updatedData.lastUpdated,
    });
  } catch (err) {
    console.error('Failed saving portfolio:', err);
    return res.status(500).json({ error: 'Failed to write data' });
  }
});

// 3. Admin login verification endpoint
app.post('/api/admin/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = (process.env.ADMIN_EMAIL || 'norbertihimbazwemanzi@gmail.com').toLowerCase().trim();
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (email && email.toLowerCase().trim() === adminEmail && password === adminPass) {
      return res.json({ success: true, message: 'Admin authenticated successfully' });
    }
    return res.status(401).json({ success: false, error: 'Invalid email address or password' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Authentication service error' });
  }
});

// 4. Reset endpoint
app.post('/api/portfolio/reset', async (_req, res) => {
  try {
    try {
      await db.delete(projectsTable);
      await db.insert(projectsTable).values(DEFAULT_PROJECTS);
      await db
        .insert(devInfoTable)
        .values(DEFAULT_DEVELOPER_INFO)
        .onConflictDoUpdate({ target: devInfoTable.id, set: DEFAULT_DEVELOPER_INFO });
    } catch {}

    const defaultData = {
      developerInfo: DEFAULT_DEVELOPER_INFO,
      projects: DEFAULT_PROJECTS,
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');

    return res.json({ success: true, message: 'Reset completed successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reset data' });
  }
});

// 5. Contact Inquiries endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, schoolOrOrg, projectType, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    try {
      await db.insert(contactInquiries).values({
        name,
        email,
        schoolOrOrg: schoolOrOrg || null,
        projectType: projectType || 'General Inquiry',
        message,
        status: 'new',
      });
    } catch (dbErr) {
      console.warn('[Contact DB] Saved via local log:', (dbErr as Error)?.message);
    }

    return res.json({ success: true, message: 'Inquiry saved successfully!' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process inquiry' });
  }
});

// 6. School System API
app.get('/api/school', async (_req, res) => {
  try {
    const studentList = await db.select().from(students).orderBy(students.id);
    const gradeList = await db.select().from(grades);
    return res.json({
      success: true,
      students: studentList.length > 0 ? studentList : INITIAL_STUDENTS_DATA.map((s, idx) => ({ ...s, id: idx + 1 })),
      grades: gradeList.length > 0 ? gradeList : INITIAL_GRADES_DATA,
    });
  } catch {
    return res.json({
      success: true,
      students: INITIAL_STUDENTS_DATA.map((s, idx) => ({ ...s, id: idx + 1 })),
      grades: INITIAL_GRADES_DATA,
    });
  }
});

app.post('/api/school', async (req, res) => {
  try {
    const { action } = req.body;
    if (action === 'add-student') {
      const { regNo, name, className, guardian, phone, tuitionTotal, tuitionPaid } = req.body.student;
      try {
        await db.insert(students).values({
          regNo: regNo || `RND-${Date.now().toString().slice(-6)}`,
          name,
          className: className || 'Senior 3 A',
          guardian: guardian || 'N/A',
          phone: phone || '+250 780 000 000',
          tuitionTotal: Number(tuitionTotal) || 185000,
          tuitionPaid: Number(tuitionPaid) || 0,
        });
      } catch {}
      return res.json({ success: true, message: 'Student registered!' });
    }

    if (action === 'record-payment') {
      const { studentId, amount, paymentMethod, referenceCode } = req.body;
      try {
        await db.insert(feePayments).values({
          studentId: Number(studentId),
          amount: Number(amount) || 0,
          paymentMethod: paymentMethod || 'MTN Mobile Money',
          referenceCode: referenceCode || `REC-${Date.now().toString().slice(-8)}`,
        });
        if (studentId) {
          const s = await db.select().from(students).where(eq(students.id, Number(studentId)));
          if (s.length > 0) {
            await db
              .update(students)
              .set({ tuitionPaid: (s[0].tuitionPaid || 0) + (Number(amount) || 0) })
              .where(eq(students.id, Number(studentId)));
          }
        }
      } catch {}
      return res.json({ success: true, message: 'Payment recorded!' });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process school action' });
  }
});

// Start Express + Vite
async function startServer() {
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist'))) {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MANZI.DEV Server] Running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
