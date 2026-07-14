import { NextResponse } from 'next/server';
import { saveLead, getLeads, deleteLead, Lead } from '@/lib/db';

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json(leads, { status: 200 });
  } catch (err) {
    console.error('API GET Leads Error:', err);
    return NextResponse.json({ error: 'Failed to fetch leads.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, country, projectType, budget, timeline, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required fields.' }, { status: 400 });
    }

    const lead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name,
      email,
      phone: phone || '',
      company: company || '',
      country: country || '',
      projectType: projectType || '',
      budget: budget || '',
      timeline: timeline || '',
      message: message || '',
      createdAt: new Date().toISOString()
    };

    await saveLead(lead);

    return NextResponse.json({ success: true, leadId: lead.id }, { status: 200 });
  } catch (err) {
    console.error('API Leads Error:', err);
    return NextResponse.json({ error: 'Failed to process lead submission.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required.' }, { status: 400 });
    }

    await deleteLead(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('API DELETE Lead Error:', err);
    return NextResponse.json({ error: 'Failed to delete lead.' }, { status: 500 });
  }
}
