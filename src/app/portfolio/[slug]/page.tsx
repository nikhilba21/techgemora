import { getPortfolios } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const portfolios = await getPortfolios();
  const portfolio = portfolios.find(p => p.slug === slug);
  if (!portfolio) return { title: 'Portfolio Not Found' };
  
  return {
    title: `${portfolio.name} - ${portfolio.industry} Case Study | Gemora Tech`,
    description: portfolio.description,
  };
}

export default async function PortfolioCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const portfolios = await getPortfolios();
  const portfolio = portfolios.find(p => p.slug === slug);

  if (!portfolio) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-electric transition-colors mb-8 font-semibold text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <header className="space-y-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="bg-electric/10 text-electric border border-electric/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              {portfolio.industry}
            </span>
            <span className="text-slate-500 text-sm font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              {portfolio.clientCountry} Client
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy leading-tight">
            {portfolio.name}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
            {portfolio.description}
          </p>
        </header>

        {/* Main Image Showcase */}
        {portfolio.images && portfolio.images.length > 0 && (
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 mb-20 bg-slate-100 flex items-center justify-center">
            {/* If the image fails to load, it will show fallback bg */}
            <Image 
              src={portfolio.images[0]} 
              alt={`${portfolio.name} Interface Mockup`}
              fill
              className="object-cover md:object-cover object-top scale-100"
              priority
            />
          </div>
        )}

        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-5">
              <h2 className="text-2xl font-bold text-navy flex items-center gap-3">
                <span className="bg-navy text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">01</span>
                The Challenge
              </h2>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed text-lg">
                {portfolio.challenge}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-2xl font-bold text-navy flex items-center gap-3">
                <span className="bg-electric text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">02</span>
                Our Engineered Solution
              </h2>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed text-lg">
                {portfolio.solution}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-2xl font-bold text-navy flex items-center gap-3">
                <span className="bg-green-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">03</span>
                Measurable Results
              </h2>
              <div className="bg-green-50 p-8 rounded-2xl border border-green-200 text-green-900 leading-relaxed text-lg font-medium flex gap-4">
                <CheckCircle2 className="w-8 h-8 text-green-600 shrink-0 mt-0.5" />
                <p>{portfolio.results}</p>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 sticky top-32">
              <h3 className="text-lg font-bold text-navy mb-6 border-b border-slate-100 pb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {portfolio.technology.map(tech => (
                  <span key={tech} className="bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs px-3 py-2 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100">
                <h3 className="text-lg font-bold text-navy mb-4">Want to build something similar?</h3>
                <Link href="/ai-cost-estimator" className="block w-full bg-navy text-white text-center py-3.5 rounded-xl font-bold hover:bg-electric transition-colors shadow-lg shadow-navy/20">
                  Estimate Your Project Cost
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
