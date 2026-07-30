import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    let leads = [];
    if (fs.existsSync(dbPath)) {
      const fileData = fs.readFileSync(dbPath, 'utf8');
      if (fileData) {
        leads = JSON.parse(fileData);
      }
    }
    // Also check db.json
    const mainDbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    if (fs.existsSync(mainDbPath)) {
      const mainData = JSON.parse(fs.readFileSync(mainDbPath, 'utf8'));
      if (mainData.leads && Array.isArray(mainData.leads)) {
        // Merge without duplicates
        const existingIds = new Set(leads.map((l: any) => l.id));
        for (const l of mainData.leads) {
          if (!existingIds.has(l.id)) {
            leads.push(l);
          }
        }
      }
    }
    
    // Sort descending by creation timestamp
    leads.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, phone, company, country, projectType, budget, timeline, message, source } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Prepare new lead object
    const newLead = {
      id: Date.now().toString(),
      email,
      name: name || 'Valued Prospect',
      phone: phone || '',
      company: company || '',
      country: country || '',
      projectType: projectType || 'Custom Software',
      budget: budget || '$10k - $25k',
      timeline: timeline || '1-3 Months',
      message: message || '',
      source: source || 'Direct Web Form',
      createdAt: new Date().toISOString()
    };

    // Save to leads.json
    const dbPath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    let leads = [];
    if (fs.existsSync(dbPath)) {
      const fileData = fs.readFileSync(dbPath, 'utf8');
      if (fileData) {
        leads = JSON.parse(fileData);
      }
    }
    leads.unshift(newLead);
    fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2));

    // Save to main db.json as well
    const mainDbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
    if (fs.existsSync(mainDbPath)) {
      const mainData = JSON.parse(fs.readFileSync(mainDbPath, 'utf8'));
      if (!mainData.leads) mainData.leads = [];
      mainData.leads.unshift(newLead);
      fs.writeFileSync(mainDbPath, JSON.stringify(mainData, null, 2));
    }

    console.log(`🚀 NEW LEAD CAPTURED [${source}]: ${name} (${email}) - Phone: ${phone}`);

    return NextResponse.json({ success: true, leadId: newLead.id }, { status: 201 });

  } catch (error) {
    console.error('Lead Capture Error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
