import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ChevronRight, ArrowLeft, Mail, Phone, ExternalLink } from 'lucide-react';
import { getBlog, getBlogs } from '@/lib/db';
import BlogFaq from '@/components/BlogFaq';
import AuthorBio from '@/components/AuthorBio';
import BlogLeadForm from '@/components/BlogLeadForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  
  if (!blog) {
    return {
      title: "Article Not Found | Gemora Tech",
      description: "The requested resource could not be found."
    };
  }

  return {
    title: `${blog.title} | Gemora Tech Insights`,
    description: blog.metaDescription,
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      url: `/blog/${blog.slug}`,
      type: "article",
      publishedTime: blog.createdAt,
      authors: [blog.author],
      images: [
        {
          url: blog.featuredImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=600&auto=format&fit=crop',
          width: 800,
          height: 600,
          alt: blog.title,
        }
      ]
    }
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await getBlogs();
  const relatedBlogs = allBlogs
    .filter(b => b.slug !== blog.slug && b.published)
    .slice(0, 3);

  // Parse FAQs if present
  let faqsList: { question: string; answer: string }[] = [];
  try {
    faqsList = typeof blog.faqs === 'string' ? JSON.parse(blog.faqs) : (blog.faqs || []);
  } catch (e) {
    console.error("Error parsing blog FAQs:", e);
  }

  // Define Schema Markup
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dexteroussoftech.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://dexteroussoftech.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://dexteroussoftech.com/blog/${blog.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": blog.title,
    "image": [
      blog.featuredImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=600&auto=format&fit=crop'
    ],
    "datePublished": blog.createdAt,
    "dateModified": blog.createdAt,
    "author": {
      "@type": "Person",
      "name": blog.author,
      "jobTitle": "Technology Writer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Gemora Tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dexteroussoftech.com/logo.png"
      }
    },
    "description": blog.metaDescription
  };

  const faqSchema = faqsList.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsList.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="w-full min-h-screen bg-slate-bg py-12">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-8">
        
        {/* Back Button */}
        <div>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="text-xs font-semibold text-slate-400 flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-navy">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-navy">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 truncate max-w-xs">{blog.title}</span>
        </nav>

        {/* Article Container */}
        <article className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden p-6 md:p-10 space-y-6">
          {/* Category & Tags */}
          <span className="inline-block bg-blue-50 text-electric text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {blog.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-navy leading-tight">
            {blog.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold border-y border-slate-100 py-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Published: {new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" />
              <span>Written by: {blog.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="h-64 sm:h-80 md:h-[400px] w-full rounded-xl overflow-hidden bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={blog.featuredImage} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Markdown/HTML content body */}
          <div 
            className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-4 pt-4 border-b border-slate-100 pb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* FAQ Segment */}
          {faqsList.length > 0 && (
            <div className="pt-6">
              <BlogFaq faqs={faqsList} />
            </div>
          )}

          {/* E-E-A-T Author Profile */}
          <AuthorBio />
        </article>

        {/* Lead Capture Form */}
        <BlogLeadForm blogTitle={blog.title} />

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-bold text-navy">Related Articles You May Like:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rel) => (
                <div key={rel.slug} className="bg-white border border-slate-200/80 rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between p-4 space-y-3">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-electric uppercase tracking-wider">{rel.category}</span>
                    <h4 className="font-bold text-navy text-xs line-clamp-2 hover:text-electric transition-colors">
                      <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                  </div>
                  <Link 
                    href={`/blog/${rel.slug}`}
                    className="text-[10px] font-bold text-slate-500 hover:text-navy flex items-center gap-1"
                  >
                    Read Article
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
