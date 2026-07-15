import { getPortfolios } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ChevronRight, Play, ShieldCheck, Zap, Globe, Smartphone, Server, Layers } from 'lucide-react';
import type { Metadata } from 'next';
import PortfolioDetailClient from './PortfolioDetailClient'; 

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
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-electric selection:text-white pb-24">
      {/* Navbar spacing */}
      <div className="pt-28 bg-white"></div>
      
      {/* 1. Zoyride Style Hero Section */}
      <section className="bg-white border-b border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 rounded-bl-[100px] pointer-events-none -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-slate-400 hover:text-electric transition-colors mb-10 font-bold text-xs uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric/10 text-electric text-xs font-bold uppercase tracking-widest mb-6">
                  {portfolio.industry} Solution
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-navy leading-[1.1] tracking-tight">
                  The Complete <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyan">
                    {portfolio.name}
                  </span><br/>
                  Ecosystem
                </h1>
              </div>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                {portfolio.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link href="/ai-cost-estimator" className="bg-electric text-white px-8 py-4 rounded-xl font-bold hover:bg-navy transition-all duration-300 shadow-lg shadow-electric/25">
                  Book a Meeting
                </Link>
                <Link href="/contact" className="bg-slate-100 text-navy border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all flex items-center gap-2">
                  <Play className="w-4 h-4 fill-navy" />
                  View Demo
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <div>
                  <h4 className="text-3xl font-black text-navy">4.9</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Rating</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-navy">100%</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">White-Label</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-navy">24/7</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Support Setup</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-electric/20 to-cyan/20 blur-3xl rounded-full"></div>
              {portfolio.images && portfolio.images.length > 0 ? (
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-100">
                   <Image src={portfolio.images[0]} alt="Hero Mockup" fill className="object-cover" />
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-navy flex items-center justify-center bg-grid-pattern-dark">
                   <h3 className="text-white font-bold text-2xl">Main Dashboard Mockup</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Zoyride Style Interactive App Tabs */}
      <PortfolioDetailClient portfolio={portfolio} />

      {/* 3. Features & Benefits Grid */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-electric font-bold text-sm tracking-wider uppercase">Features & Benefits</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-navy">Everything you need to run {portfolio.name}</h2>
              <p className="text-slate-500 text-lg">From real-time tracking to automated dispatch, we build every essential tool into one scalable platform.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                 <ShieldCheck className="w-10 h-10 text-electric mb-6" />
                 <h3 className="text-xl font-bold text-navy mb-4">The Challenge</h3>
                 <p className="text-slate-600 leading-relaxed text-sm">{portfolio.challenge}</p>
               </div>
               <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                 <Zap className="w-10 h-10 text-amber-500 mb-6" />
                 <h3 className="text-xl font-bold text-navy mb-4">Our Engineered Solution</h3>
                 <p className="text-slate-600 leading-relaxed text-sm">{portfolio.solution}</p>
               </div>
               <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                 <Server className="w-10 h-10 text-green-500 mb-6" />
                 <h3 className="text-xl font-bold text-navy mb-4">Measurable Results</h3>
                 <p className="text-slate-600 leading-relaxed text-sm italic">"{portfolio.results}"</p>
               </div>
               {/* Filler generic feature cards to match zoyride grid style */}
               <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                 <Globe className="w-10 h-10 text-cyan mb-6" />
                 <h3 className="text-xl font-bold text-navy mb-4">Global Deployment</h3>
                 <p className="text-slate-600 leading-relaxed text-sm">Deployed successfully for {portfolio.clientCountry} clients with full regional compliance and localized payment gateways.</p>
               </div>
               <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                 <Smartphone className="w-10 h-10 text-rose-500 mb-6" />
                 <h3 className="text-xl font-bold text-navy mb-4">Cross-Platform Native</h3>
                 <p className="text-slate-600 leading-relaxed text-sm">Built using high-performance mobile architectures to ensure smooth 60fps animations across iOS and Android devices.</p>
               </div>
               <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                 <Layers className="w-10 h-10 text-indigo-500 mb-6" />
                 <h3 className="text-xl font-bold text-navy mb-4">Cloud Architecture Stack</h3>
                 <div className="flex flex-wrap gap-2 mt-4">
                    {portfolio.technology.map(t => (
                       <span key={t} className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-lg">{t}</span>
                    ))}
                 </div>
               </div>
            </div>
         </div>
      </section>
      
      {/* 4. Screenshot Carousel (The remaining images) */}
      <section className="py-24 bg-navy text-white overflow-hidden bg-grid-pattern-dark relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center relative z-10">
            <span className="text-cyan font-bold text-sm tracking-wider uppercase">Visual Showcase</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-4">Premium UI Engineering</h2>
         </div>
         <div className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory hide-scrollbar">
            {portfolio.images && portfolio.images.length > 3 ? portfolio.images.slice(3).map((img, idx) => (
               <div key={idx} className="min-w-[300px] md:min-w-[400px] aspect-[9/16] relative rounded-3xl overflow-hidden border border-slate-700 snap-center shrink-0 shadow-2xl">
                  <Image src={img} alt={`App Screen ${idx + 4}`} fill className="object-cover" />
               </div>
            )) : (
               <div className="w-full text-center text-slate-400">Loading AI generated mockups...</div>
            )}
         </div>
      </section>
    </main>
  );
}
