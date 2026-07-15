import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { getPage, getPages } from '@/lib/db';
import BlogFaq from '@/components/BlogFaq';
import QuickConsultationForm from '@/components/QuickConsultationForm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  
  if (!page) {
    return {
      title: "Page Not Found | Gemora Tech",
      description: "The requested page could not be found."
    };
  }

  const alignedTitle = page.h1 ? `${page.h1} | Gemora Tech` : page.title;

  return {
    title: alignedTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: alignedTitle,
      description: page.metaDescription,
      url: `/${page.slug}`,
      type: "website",
      siteName: "Gemora Tech",
    },
    twitter: {
      card: "summary_large_image",
      title: alignedTitle,
      description: page.metaDescription,
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

  // Fetch related pages in the same category for index linking silos
  let relatedPages: any[] = [];
  try {
    const allPages = await getPages();
    relatedPages = allPages
      .filter(p => p.type === page.type && p.slug !== page.slug && p.published)
      .slice(0, 6);
  } catch (e) {
    console.error("Failed to fetch related pages:", e);
  }

  // Map slug properties to high-quality banner graphics
  let bannerImage = "/images/software-dev-banner.png";
  const lowerSlug = page.slug.toLowerCase();
  if (lowerSlug.includes('game') || lowerSlug.includes('slots') || lowerSlug.includes('poker') || lowerSlug.includes('blackjack') || lowerSlug.includes('rummy')) {
    bannerImage = "/images/gaming-banner.png";
  } else if (lowerSlug.includes('mobile') || lowerSlug.includes('app') || lowerSlug.includes('ios') || lowerSlug.includes('android')) {
    bannerImage = "/images/mobile-app-banner.png";
  } else if (lowerSlug.includes('ai') || lowerSlug.includes('machine') || lowerSlug.includes('big-data') || lowerSlug.includes('voice') || lowerSlug.includes('metaverse') || lowerSlug.includes('reality')) {
    bannerImage = "/images/ai-banner.png";
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
        "item": "https://www.dexteroussoftech.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": page.h1,
        "item": `https://www.dexteroussoftech.com/${page.slug}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": page.h1,
    "provider": {
      "@type": "Organization",
      "name": "Gemora Tech",
      "url": "https://www.dexteroussoftech.com"
    },
    "description": page.metaDescription,
    "areaServed": ["US", "GB", "CA", "AU", "AE", "IN"]
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
    <div className="w-full bg-slate-50 pb-20">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Service Page Hero banner */}
      <section className="bg-slate-950 text-white pt-24 pb-16 relative border-b border-slate-800 overflow-hidden">
        {/* Layered Background Elements to avoid CSS conflicts */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0B192C] to-slate-900 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-35 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-4 text-left">
            {/* Breadcrumbs Navigation */}
            <nav className="text-xs font-semibold text-slate-400 flex items-center gap-1.5" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-200">{page.h1}</span>
            </nav>

            <span className="inline-block bg-blue-950/80 border border-blue-800 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Category: {page.type}
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              {page.h1}
            </h1>
            
            <p className="text-slate-350 text-sm md:text-base max-w-2xl leading-relaxed">
              {page.metaDescription}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan" />
                <span>NDA Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan" />
                <span>Dedicated Agile Squads</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan" />
                <span>100% IP Ownership</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <QuickConsultationForm />
          </div>
        </div>
      </section>

      {/* AI-First Direct Q&A Summary Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 border border-blue-150/75 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="bg-blue-600 text-white p-3.5 rounded-xl shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <span>AI Search Direct Answer</span>
            </h4>
            <p className="font-bold text-sm text-navy leading-normal">
              Q: What is the core focus of {page.h1}?
            </p>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              A: {page.metaDescription} Our digital transformation solutions deliver enterprise-grade software architectures, customized modular API integrations, and 100% intellectual property ownership backed by secure NDA guidelines and daily scrum updates.
            </p>
          </div>
        </div>
      </section>

      {/* 2-Column Body Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Article Content & FAQs */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/50 overflow-hidden">
              {/* Graphic Banner */}
              <div className="relative w-full h-52 sm:h-64 md:h-80 bg-slate-900 border-b border-slate-100">
                <img 
                  src={bannerImage} 
                  alt={`${page.h1} illustration`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-10">
                <div 
                  className="service-content-light prose max-w-none text-slate-700 text-sm leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: page.content }}
                />
              </div>
            </div>

            {/* FAQs Block */}
            {faqsList.length > 0 && (
              <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/50 p-6 md:p-10">
                <BlogFaq faqs={faqsList} />
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
            
            {/* Related Services */}
            {relatedPages.length > 0 && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md shadow-slate-100/50">
                <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
                  Related Services
                </h4>
                <div className="grid gap-2.5">
                  {relatedPages.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/${rp.slug}`}
                      className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all text-xs"
                    >
                      <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-1">{rp.h1}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Stats Widget */}
            <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-6 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-[#0B192C] z-0"></div>
              <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 z-0"></div>
              <div className="relative z-10">
                <h4 className="text-sm font-bold border-b border-slate-800 pb-3 mb-4">Why Choose Gemora Tech?</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-lg font-extrabold text-cyan">10+ Years</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Experience</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-extrabold text-cyan">100+</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Projects Built</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-extrabold text-cyan">24/7</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Global Support</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-extrabold text-cyan">99.8%</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">SLA Uptime</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Callout */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center space-y-3">
              <p className="text-xs text-slate-600">Want to discuss your project right now?</p>
              <div className="space-y-1.5 text-xs font-bold text-slate-800">
                <p>Email: <a href="mailto:nikhil@dexteroussoftech.com" className="hover:text-blue-600 transition-colors">nikhil@dexteroussoftech.com</a></p>
                <p>Call: <a href="tel:+919928714867" className="hover:text-blue-600 transition-colors">+91 9928714867</a></p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
