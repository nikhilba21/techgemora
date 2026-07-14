import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowRight, ExternalLink, ShieldCheck, Mail, Smartphone } from 'lucide-react';
import { getPage } from '@/lib/db';
import BlogFaq from '@/components/BlogFaq';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  
  if (!page) {
    return {
      title: "Page Not Found | Tech Gemora",
      description: "The requested page could not be found."
    };
  }

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `/${page.slug}`,
      type: "website",
      siteName: "Tech Gemora",
    }
  };
}

export default async function DynamicSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page || !page.published) {
    notFound();
  }

  // Parse FAQs if present
  let faqsList: { question: string; answer: string }[] = [];
  try {
    faqsList = typeof page.faqs === 'string' ? JSON.parse(page.faqs) : (page.faqs || []);
  } catch (e) {
    console.error("Error parsing SEO page FAQs:", e);
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
        "name": page.h1,
        "item": `https://dexteroussoftech.com/${page.slug}`
      }
    ]
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
    <div className="w-full min-h-screen bg-slate-bg pb-16">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Header Space */}
      <section className="bg-navy text-white pt-20 pb-16 bg-grid-pattern-dark relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-4 text-center">
          {/* Breadcrumbs Navigation */}
          <nav className="text-xs font-semibold text-slate-400 flex items-center justify-center gap-1.5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-200">{page.h1}</span>
          </nav>

          <span className="inline-block bg-blue-950/80 border border-blue-800 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Category: {page.type}
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            {page.h1}
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {page.metaDescription}
          </p>

          <div className="pt-2">
            <Link 
              href="/contact" 
              className="bg-electric hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xs transition-colors shadow-lg inline-flex items-center gap-1.5 group"
            >
              Get Free Project Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Body Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 grid grid-cols-1 gap-8">
        
        {/* HTML Article Content */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 md:p-10 space-y-8">
          
          {/* Main rich text copy */}
          <div 
            className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />

          {/* Dynamic FAQ List */}
          {faqsList.length > 0 && (
            <div className="pt-8 border-t border-slate-100">
              <BlogFaq faqs={faqsList} />
            </div>
          )}

        </div>

        {/* Lead Capture Banner */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-navy">Need Custom {page.slug.replace(/-/g, ' ') || 'Development'} Services?</h3>
            <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
              We sign strict NDAs, build using modern Next.js/PostgreSQL databases, and deploy under dedicated agile engineers.
            </p>
          </div>
          <Link 
            href="/contact"
            className="bg-navy hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-full text-xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            Consult Solutions Expert
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
