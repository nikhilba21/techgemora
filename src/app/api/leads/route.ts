import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, message, source } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Prepare new lead object
    const newLead = {
      id: Date.now().toString(),
      email,
      name: name || 'Unknown',
      message: message || '',
      source: source || 'Direct',
      createdAt: new Date().toISOString()
    };

    // Path to local JSON database
    const dbPath = path.join(process.cwd(), 'src', 'data', 'leads.json');
    
    // Read existing leads
    let leads = [];
    if (fs.existsSync(dbPath)) {
      const fileData = fs.readFileSync(dbPath, 'utf8');
      if (fileData) {
        leads = JSON.parse(fileData);
      }
    }

    // Append and save
    leads.push(newLead);
    fs.writeFileSync(dbPath, JSON.stringify(leads, null, 2));

    // In a real app, you might also trigger an email via Resend/SendGrid here
    console.log(`New Lead Captured: ${email}`);

    return NextResponse.json({ success: true, leadId: newLead.id }, { status: 201 });

  } catch (error) {
    console.error('Lead Capture Error:', error);
    return NextResponse.json({ error: 'Failed to process lead' }, { status: 500 });
  }
}
