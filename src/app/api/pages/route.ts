import { NextResponse } from 'next/server';
import { getPages, savePage, deletePage, SEOPage } from '@/lib/db';

export async function GET() {
  try {
    const pages = await getPages();
    return NextResponse.json(pages, { status: 200 });
  } catch (err) {
    console.error('API GET Pages Error:', err);
    return NextResponse.json({ error: 'Failed to fetch pages.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, metaTitle, metaDescription, h1, content, faqs, type, features, technologyStack, benefits, published } = body;

    if (!slug || !title || !h1) {
      return NextResponse.json({ error: 'Slug, Title, and H1 are required fields.' }, { status: 400 });
    }

    const page: SEOPage = {
      slug,
      title,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || '',
      h1,
      content: content || '',
      type: type || 'service',
      features: features || [],
      technologyStack: technologyStack || [],
      faqs: typeof faqs === 'string' ? JSON.parse(faqs || '[]') : (faqs || []),
      benefits: benefits || [],
      published: typeof published === 'boolean' ? published : true,
      updatedAt: new Date().toISOString()
    };

    await savePage(page);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('API POST Page Error:', err);
    return NextResponse.json({ error: 'Failed to save page.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Page slug is required.' }, { status: 400 });
    }

    await deletePage(slug);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('API DELETE Page Error:', err);
    return NextResponse.json({ error: 'Failed to delete page.' }, { status: 500 });
  }
}
