import { NextResponse } from 'next/server';
import { getPortfolios, savePortfolio, deletePortfolio, Portfolio } from '@/lib/db';

export async function GET() {
  try {
    const portfolios = await getPortfolios();
    return NextResponse.json(portfolios, { status: 200 });
  } catch (err) {
    console.error('API GET Portfolios Error:', err);
    return NextResponse.json({ error: 'Failed to fetch portfolios.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, name, industry, description, technology, challenge, solution, results, images, clientCountry, published } = body;

    if (!slug || !name) {
      return NextResponse.json({ error: 'Slug and Name are required fields.' }, { status: 400 });
    }

    const portfolio: Portfolio = {
      slug,
      name,
      industry: industry || 'Technology',
      description: description || '',
      technology: Array.isArray(technology) ? technology : JSON.parse(technology || '[]'),
      challenge: challenge || '',
      solution: solution || '',
      results: results || '',
      images: Array.isArray(images) ? images : JSON.parse(images || '[]'),
      clientCountry: clientCountry || '',
      published: typeof published === 'boolean' ? published : true
    };

    await savePortfolio(portfolio);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('API POST Portfolio Error:', err);
    return NextResponse.json({ error: 'Failed to save portfolio.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Portfolio slug is required.' }, { status: 400 });
    }

    await deletePortfolio(slug);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('API DELETE Portfolio Error:', err);
    return NextResponse.json({ error: 'Failed to delete portfolio.' }, { status: 500 });
  }
}
