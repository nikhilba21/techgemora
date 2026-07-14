import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Define DB Models
export interface SEOPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  content: string; // HTML or Markdown content
  type: 'service' | 'location' | 'industry' | 'technology' | 'developer';
  features: string[];
  technologyStack: string[];
  faqs: { question: string; answer: string }[];
  benefits: string[];
  published: boolean;
  updatedAt: string;
}

export interface Blog {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  featuredImage: string;
  category: string;
  author: string;
  faqs: { question: string; answer: string }[];
  published: boolean;
  createdAt: string;
}

export interface Portfolio {
  slug: string;
  name: string;
  industry: string;
  description: string;
  technology: string[];
  challenge: string;
  solution: string;
  results: string;
  images: string[];
  clientCountry: string;
  published: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  createdAt: string;
}

export interface Setting {
  key: string;
  value: string;
}

// Local JSON File DB config
const JSON_DB_DIR = path.join(process.cwd(), 'src', 'data');
const JSON_DB_PATH = path.join(JSON_DB_DIR, 'db.json');

function initLocalDb() {
  if (!fs.existsSync(JSON_DB_DIR)) {
    fs.mkdirSync(JSON_DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(JSON_DB_PATH)) {
    const initialData = {
      pages: [],
      blogs: [],
      portfolios: [],
      leads: [],
      settings: [
        { key: 'robots_txt', value: "User-agent: *\nAllow: /\nSitemap: https://dexteroussoftech.com/sitemap.xml" }
      ]
    };
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

function readLocalDb(): { pages: SEOPage[]; blogs: Blog[]; portfolios: Portfolio[]; leads: Lead[]; settings: Setting[] } {
  initLocalDb();
  try {
    const raw = fs.readFileSync(JSON_DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read local DB, resetting", e);
    return { pages: [], blogs: [], portfolios: [], leads: [], settings: [] };
  }
}

function writeLocalDb(data: any) {
  initLocalDb();
  fs.writeFileSync(JSON_DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// Database Connection Manager
let pool: Pool | null = null;
const isPg = !!process.env.DATABASE_URL;

if (isPg) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
}

// Helper to initialize PostgreSQL tables if they don't exist
async function initPgTables() {
  if (!pool) return;
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS pages (
        slug VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        meta_title VARCHAR(255),
        meta_description TEXT,
        h1 VARCHAR(255),
        content TEXT,
        type VARCHAR(50),
        features TEXT, -- JSON Array
        technology_stack TEXT, -- JSON Array
        faqs TEXT, -- JSON Array
        benefits TEXT, -- JSON Array
        published BOOLEAN DEFAULT true,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS blogs (
        slug VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        meta_title VARCHAR(255),
        meta_description TEXT,
        content TEXT,
        featured_image TEXT,
        category VARCHAR(100),
        author VARCHAR(100),
        faqs TEXT, -- JSON Array
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS portfolios (
        slug VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        industry VARCHAR(100),
        description TEXT,
        technology TEXT, -- JSON Array
        challenge TEXT,
        solution TEXT,
        results TEXT,
        images TEXT, -- JSON Array
        client_country VARCHAR(100),
        published BOOLEAN DEFAULT true
      );

      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        company VARCHAR(255),
        country VARCHAR(100),
        project_type VARCHAR(100),
        budget VARCHAR(100),
        timeline VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS settings (
        key VARCHAR(255) PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
    
    // Seed robots setting if not exists
    const res = await client.query("SELECT * FROM settings WHERE key = 'robots_txt'");
    if (res.rowCount === 0) {
      await client.query(
        "INSERT INTO settings (key, value) VALUES ($1, $2)",
        ['robots_txt', "User-agent: *\nAllow: /\nSitemap: https://dexteroussoftech.com/sitemap.xml"]
      );
    }
  } catch (err) {
    console.error("Error creating tables in PostgreSQL:", err);
  } finally {
    client.release();
  }
}

// Auto-trigger PG migrations if using Postgres
if (isPg) {
  initPgTables().catch(e => console.error("Database Migration failed", e));
}

// ----------------------------------------------------
// DB ACCESS LAYER APIs
// ----------------------------------------------------

export async function getPages(): Promise<SEOPage[]> {
  if (pool) {
    const res = await pool.query("SELECT * FROM pages ORDER BY slug ASC");
    return res.rows.map(row => ({
      slug: row.slug,
      title: row.title,
      metaTitle: row.meta_title || '',
      metaDescription: row.meta_description || '',
      h1: row.h1 || '',
      content: row.content || '',
      type: row.type as any,
      features: JSON.parse(row.features || '[]'),
      technologyStack: JSON.parse(row.technology_stack || '[]'),
      faqs: JSON.parse(row.faqs || '[]'),
      benefits: JSON.parse(row.benefits || '[]'),
      published: row.published,
      updatedAt: row.updated_at
    }));
  } else {
    return readLocalDb().pages;
  }
}

export async function getPage(slug: string): Promise<SEOPage | null> {
  if (pool) {
    const res = await pool.query("SELECT * FROM pages WHERE slug = $1", [slug]);
    if (res.rowCount === 0) return null;
    const row = res.rows[0];
    return {
      slug: row.slug,
      title: row.title,
      metaTitle: row.meta_title || '',
      metaDescription: row.meta_description || '',
      h1: row.h1 || '',
      content: row.content || '',
      type: row.type as any,
      features: JSON.parse(row.features || '[]'),
      technologyStack: JSON.parse(row.technology_stack || '[]'),
      faqs: JSON.parse(row.faqs || '[]'),
      benefits: JSON.parse(row.benefits || '[]'),
      published: row.published,
      updatedAt: row.updated_at
    };
  } else {
    const db = readLocalDb();
    return db.pages.find(p => p.slug === slug) || null;
  }
}

export async function savePage(page: SEOPage): Promise<void> {
  if (pool) {
    await pool.query(`
      INSERT INTO pages (slug, title, meta_title, meta_description, h1, content, type, features, technology_stack, faqs, benefits, published, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        h1 = EXCLUDED.h1,
        content = EXCLUDED.content,
        type = EXCLUDED.type,
        features = EXCLUDED.features,
        technology_stack = EXCLUDED.technology_stack,
        faqs = EXCLUDED.faqs,
        benefits = EXCLUDED.benefits,
        published = EXCLUDED.published,
        updated_at = NOW()
    `, [
      page.slug,
      page.title,
      page.metaTitle,
      page.metaDescription,
      page.h1,
      page.content,
      page.type,
      JSON.stringify(page.features),
      JSON.stringify(page.technologyStack),
      JSON.stringify(page.faqs),
      JSON.stringify(page.benefits),
      page.published
    ]);
  } else {
    const db = readLocalDb();
    const idx = db.pages.findIndex(p => p.slug === page.slug);
    const updatedPage = { ...page, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      db.pages[idx] = updatedPage;
    } else {
      db.pages.push(updatedPage);
    }
    writeLocalDb(db);
  }
}

export async function deletePage(slug: string): Promise<void> {
  if (pool) {
    await pool.query("DELETE FROM pages WHERE slug = $1", [slug]);
  } else {
    const db = readLocalDb();
    db.pages = db.pages.filter(p => p.slug !== slug);
    writeLocalDb(db);
  }
}

export async function getBlogs(): Promise<Blog[]> {
  if (pool) {
    const res = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
    return res.rows.map(row => ({
      slug: row.slug,
      title: row.title,
      metaTitle: row.meta_title || '',
      metaDescription: row.meta_description || '',
      content: row.content || '',
      featuredImage: row.featured_image || '',
      category: row.category || '',
      author: row.author || '',
      faqs: JSON.parse(row.faqs || '[]'),
      published: row.published,
      createdAt: row.created_at
    }));
  } else {
    return readLocalDb().blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export async function getBlog(slug: string): Promise<Blog | null> {
  if (pool) {
    const res = await pool.query("SELECT * FROM blogs WHERE slug = $1", [slug]);
    if (res.rowCount === 0) return null;
    const row = res.rows[0];
    return {
      slug: row.slug,
      title: row.title,
      metaTitle: row.meta_title || '',
      metaDescription: row.meta_description || '',
      content: row.content || '',
      featuredImage: row.featured_image || '',
      category: row.category || '',
      author: row.author || '',
      faqs: JSON.parse(row.faqs || '[]'),
      published: row.published,
      createdAt: row.created_at
    };
  } else {
    const db = readLocalDb();
    return db.blogs.find(b => b.slug === slug) || null;
  }
}

export async function saveBlog(blog: Blog): Promise<void> {
  if (pool) {
    await pool.query(`
      INSERT INTO blogs (slug, title, meta_title, meta_description, content, featured_image, category, author, faqs, published, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, COALESCE((SELECT created_at FROM blogs WHERE slug = $1), NOW()))
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        content = EXCLUDED.content,
        featured_image = EXCLUDED.featured_image,
        category = EXCLUDED.category,
        author = EXCLUDED.author,
        faqs = EXCLUDED.faqs,
        published = EXCLUDED.published
    `, [
      blog.slug,
      blog.title,
      blog.metaTitle,
      blog.metaDescription,
      blog.content,
      blog.featuredImage,
      blog.category,
      blog.author,
      JSON.stringify(blog.faqs),
      blog.published
    ]);
  } else {
    const db = readLocalDb();
    const idx = db.blogs.findIndex(b => b.slug === blog.slug);
    const updatedBlog = { 
      ...blog, 
      createdAt: idx >= 0 ? db.blogs[idx].createdAt : new Date().toISOString() 
    };
    if (idx >= 0) {
      db.blogs[idx] = updatedBlog;
    } else {
      db.blogs.push(updatedBlog);
    }
    writeLocalDb(db);
  }
}

export async function deleteBlog(slug: string): Promise<void> {
  if (pool) {
    await pool.query("DELETE FROM blogs WHERE slug = $1", [slug]);
  } else {
    const db = readLocalDb();
    db.blogs = db.blogs.filter(b => b.slug !== slug);
    writeLocalDb(db);
  }
}

export async function getPortfolios(): Promise<Portfolio[]> {
  if (pool) {
    const res = await pool.query("SELECT * FROM portfolios ORDER BY name ASC");
    return res.rows.map(row => ({
      slug: row.slug,
      name: row.name,
      industry: row.industry || '',
      description: row.description || '',
      technology: JSON.parse(row.technology || '[]'),
      challenge: row.challenge || '',
      solution: row.solution || '',
      results: row.results || '',
      images: JSON.parse(row.images || '[]'),
      clientCountry: row.client_country || '',
      published: row.published
    }));
  } else {
    return readLocalDb().portfolios;
  }
}

export async function getPortfolio(slug: string): Promise<Portfolio | null> {
  if (pool) {
    const res = await pool.query("SELECT * FROM portfolios WHERE slug = $1", [slug]);
    if (res.rowCount === 0) return null;
    const row = res.rows[0];
    return {
      slug: row.slug,
      name: row.name,
      industry: row.industry || '',
      description: row.description || '',
      technology: JSON.parse(row.technology || '[]'),
      challenge: row.challenge || '',
      solution: row.solution || '',
      results: row.results || '',
      images: JSON.parse(row.images || '[]'),
      clientCountry: row.client_country || '',
      published: row.published
    };
  } else {
    const db = readLocalDb();
    return db.portfolios.find(p => p.slug === slug) || null;
  }
}

export async function savePortfolio(portfolio: Portfolio): Promise<void> {
  if (pool) {
    await pool.query(`
      INSERT INTO portfolios (slug, name, industry, description, technology, challenge, solution, results, images, client_country, published)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        industry = EXCLUDED.industry,
        description = EXCLUDED.description,
        technology = EXCLUDED.technology,
        challenge = EXCLUDED.challenge,
        solution = EXCLUDED.solution,
        results = EXCLUDED.results,
        images = EXCLUDED.images,
        client_country = EXCLUDED.client_country,
        published = EXCLUDED.published
    `, [
      portfolio.slug,
      portfolio.name,
      portfolio.industry,
      portfolio.description,
      JSON.stringify(portfolio.technology),
      portfolio.challenge,
      portfolio.solution,
      portfolio.results,
      JSON.stringify(portfolio.images),
      portfolio.clientCountry,
      portfolio.published
    ]);
  } else {
    const db = readLocalDb();
    const idx = db.portfolios.findIndex(p => p.slug === portfolio.slug);
    if (idx >= 0) {
      db.portfolios[idx] = portfolio;
    } else {
      db.portfolios.push(portfolio);
    }
    writeLocalDb(db);
  }
}

export async function deletePortfolio(slug: string): Promise<void> {
  if (pool) {
    await pool.query("DELETE FROM portfolios WHERE slug = $1", [slug]);
  } else {
    const db = readLocalDb();
    db.portfolios = db.portfolios.filter(p => p.slug !== slug);
    writeLocalDb(db);
  }
}

export async function getLeads(): Promise<Lead[]> {
  if (pool) {
    const res = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
    return res.rows.map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone || '',
      company: row.company || '',
      country: row.country || '',
      projectType: row.project_type || '',
      budget: row.budget || '',
      timeline: row.timeline || '',
      message: row.message || '',
      createdAt: row.created_at
    }));
  } else {
    return readLocalDb().leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export async function saveLead(lead: Lead): Promise<void> {
  if (pool) {
    await pool.query(`
      INSERT INTO leads (id, name, email, phone, company, country, project_type, budget, timeline, message, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
    `, [
      lead.id,
      lead.name,
      lead.email,
      lead.phone,
      lead.company,
      lead.country,
      lead.projectType,
      lead.budget,
      lead.timeline,
      lead.message
    ]);
  } else {
    const db = readLocalDb();
    db.leads.push(lead);
    writeLocalDb(db);
  }
}

export async function deleteLead(id: string): Promise<void> {
  if (pool) {
    await pool.query("DELETE FROM leads WHERE id = $1", [id]);
  } else {
    const db = readLocalDb();
    db.leads = db.leads.filter(l => l.id !== id);
    writeLocalDb(db);
  }
}

export async function getSetting(key: string): Promise<string> {
  if (pool) {
    const res = await pool.query("SELECT value FROM settings WHERE key = $1", [key]);
    if (res.rowCount === 0) return '';
    return res.rows[0].value;
  } else {
    const db = readLocalDb();
    const item = db.settings.find(s => s.key === key);
    return item ? item.value : '';
  }
}

export async function saveSetting(key: string, value: string): Promise<void> {
  if (pool) {
    await pool.query(`
      INSERT INTO settings (key, value)
      VALUES ($1, $2)
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `, [key, value]);
  } else {
    const db = readLocalDb();
    const idx = db.settings.findIndex(s => s.key === key);
    if (idx >= 0) {
      db.settings[idx].value = value;
    } else {
      db.settings.push({ key, value });
    }
    writeLocalDb(db);
  }
}

// Auto-seeding check hook
if (typeof window === 'undefined') {
  setTimeout(async () => {
    try {
      const pages = await getPages();
      if (pages.length === 0) {
        console.log("No pages found in database. Running auto-seeding script...");
        const { seedDatabase } = await import('./seed');
        await seedDatabase();
      }
    } catch (err) {
      console.error("Auto-seeding hook check failed:", err);
    }
  }, 2000);
}
