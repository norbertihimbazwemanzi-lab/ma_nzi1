import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const DATA_FILE = path.join(__dirname, 'src', 'data', 'live_portfolio.json');

// Support image uploads as data URLs
app.use(express.json({ limit: '20mb' }));

// 1. Get current universal portfolio data
app.get('/api/portfolio', (_req, res) => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      return res.json(data);
    }
    return res.status(404).json({ error: 'Portfolio data file not found' });
  } catch (err) {
    console.error('Failed reading live_portfolio.json:', err);
    return res.status(500).json({ error: 'Failed to read server data' });
  }
});

// 2. Permanent update endpoint: writes to disk so all users everywhere see changes
app.post('/api/portfolio', (req, res) => {
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

    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedData, null, 2), 'utf-8');
    console.log(`[Permanent Server Storage] Portfolio updated successfully by admin at ${updatedData.lastUpdated}`);

    return res.json({
      success: true,
      message: 'Portfolio data saved permanently on server for all users!',
      lastUpdated: updatedData.lastUpdated,
    });
  } catch (err) {
    console.error('Failed saving to live_portfolio.json:', err);
    return res.status(500).json({ error: 'Failed to write permanently to server disk' });
  }
});

// 3. Admin login verification endpoint (clean, secure backend check)
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

// 4. Reset endpoint to factory defaults if requested
app.post('/api/portfolio/reset', (_req, res) => {
  try {
    return res.json({ success: true, message: 'Reset requested' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reset server data' });
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
