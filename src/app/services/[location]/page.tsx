import React from 'react';
import { notFound } from 'next/navigation';
import locationsData from '@/data/locations.json';
import Link from 'next/link';

export async function generateStaticParams() {
  return locationsData.map((location) => ({
    location: location.slug,
  }));
}

type Props = {
  params: Promise<{ location: string }>;
};

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const locationSlug = resolvedParams.location;
  const location = locationsData.find(l => l.slug === locationSlug);
  
  if (!location) return {};

  const title = `Top Software & Game Development Company in ${location.name}, ${location.country} | Gemora Tech`;
  const description = `Looking for top-tier software and game development in ${location.name}? Gemora Tech delivers enterprise AI, Web3, and Mobile App solutions in ${location.name}, ${location.country}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/services/${location.slug}`,
      type: "website",
      siteName: "Gemora Tech",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    }
  };
}

export default async function LocationServicePage({ params }: Props) {
  const resolvedParams = await params;
  const locationSlug = resolvedParams.location;
  const location = locationsData.find(l => l.slug === locationSlug);

  if (!location) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Gemora Tech ${location.name}`,
    "description": `Premium Software Development Company serving ${location.name}, ${location.country}`,
    "areaServed": {
      "@type": "City",
      "name": location.name
    },
    "url": `https://www.dexteroussoftech.com/services/${location.slug}`
  };

  return (
    <div className="min-h-screen bg-slate-bg pt-24 pb-20 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0"></div>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-24 mt-10">
          <span className="inline-flex bg-blue-50 text-electric font-bold px-5 py-2 rounded-full uppercase tracking-wider text-xs sm:text-sm border border-blue-100 shadow-sm">
            Top Rated IT Services in {location.name}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-navy leading-tight max-w-5xl mx-auto">
            Software & Game Development Company in <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyan">{location.name}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Gemora Tech provides world-class AI integrations, robust enterprise SaaS platforms, and immersive Game Development specifically tailored for businesses operating in {location.name}, {location.country}.
          </p>
          <div className="pt-8">
            <Link href="/contact" className="inline-block bg-electric hover:bg-navy text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all shadow-lg hover:shadow-electric/30 hover:-translate-y-1">
              Hire Top Developers in {location.name}
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
           <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-electric/30 transition-all group">
             <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <svg className="w-7 h-7 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
             </div>
             <h3 className="text-2xl font-bold text-navy mb-4">Web & Mobile Apps</h3>
             <p className="text-slate-600 leading-relaxed">Scale your business in {location.name} with custom, high-performance mobile applications and enterprise web platforms built on modern tech stacks.</p>
           </div>
           
           <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-electric/30 transition-all group">
             <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <svg className="w-7 h-7 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <h3 className="text-2xl font-bold text-navy mb-4">AI & Machine Learning</h3>
             <p className="text-slate-600 leading-relaxed">Automate your workflows and outpace the {location.name} competition using cutting-edge Generative AI, LLMs, and custom data pipelines.</p>
           </div>
           
           <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-electric/30 transition-all group">
             <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <svg className="w-7 h-7 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <h3 className="text-2xl font-bold text-navy mb-4">Game Development</h3>
             <p className="text-slate-600 leading-relaxed">Launch immersive multiplayer, Web3, and mobile games built on Unity and Unreal Engine specifically targeting the global market.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
