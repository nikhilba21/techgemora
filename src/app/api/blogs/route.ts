import { NextResponse } from 'next/server';
import { getBlogs, saveBlog, deleteBlog, Blog } from '@/lib/db';

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.error('API GET Blogs Error:', err);
    return NextResponse.json({ error: 'Failed to fetch blogs.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slug, title, metaTitle, metaDescription, content, category, author, featuredImage, faqs, published } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and Title are required fields.' }, { status: 400 });
    }

    const blog: Blog = {
      slug,
      title,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || '',
      content: content || '',
      category: category || 'General',
      author: author || 'Tech Gemora Team',
      featuredImage: featuredImage || '',
      faqs: typeof faqs === 'string' ? JSON.parse(faqs || '[]') : (faqs || []),
      createdAt: body.createdAt || new Date().toISOString(),
      published: typeof published === 'boolean' ? published : true
    };

    await saveBlog(blog);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('API POST Blog Error:', err);
    return NextResponse.json({ error: 'Failed to save blog.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Blog slug is required.' }, { status: 400 });
    }

    await deleteBlog(slug);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('API DELETE Blog Error:', err);
    return NextResponse.json({ error: 'Failed to delete blog.' }, { status: 500 });
  }
}
