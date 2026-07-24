import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPages, getBlogs, getPortfolios } from '@/lib/db';
import locationsData from '@/data/locations.json';
import techData from '@/data/tech.json';
import industryData from '@/data/industry.json';
import costData from '@/data/cost.json';
import compareData from '@/data/compare.json';
import gamingData from '@/data/gaming.json';
import glossaryData from '@/data/glossary.json';

export const metadata: Metadata = {
  title: "HTML Sitemap & Navigation Directory | Gemora Tech",
  description: "Complete HTML sitemap directory of all custom software, AI/ML, SaaS, mobile app, Web3, and game development pages on Gemora Tech.",
  alternates: {
    canonical: "/sitemap-index",
  }
};

export default async function SitemapIndexPage() {
  const pages = await getPages();
  const blogs = await getBlogs(); // Returns visible blogs
  const portfolios = await getPortfolios();

  const coreRoutes = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Portfolio Case Studies', href: '/portfolio' },
    { label: 'Blog & Articles', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'AI Cost Estimator', href: '/ai-cost-estimator' },
    { label: 'Hire Developers Overview', href: '/hire-developers' },
    { label: 'Press & Media', href: '/press' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-bg py-16 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center bg-blue-50 border border-blue-200 text-electric text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Site Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
            Gemora Tech HTML Sitemap
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Explore our complete directory of enterprise software solutions, developer hiring guides, technology hubs, and industry case studies.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. Core Pages */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Core Pages
            </h2>
            <ul className="space-y-2 text-xs text-slate-600">
              {coreRoutes.map(r => (
                <li key={r.href}>
                  <Link href={r.href} className="hover:text-electric font-medium transition-colors">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Primary Services & Solutions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Services & Solutions ({pages.length})
            </h2>
            <ul className="space-y-2 text-xs text-slate-600 max-h-80 overflow-y-auto pr-2">
              {pages.map(p => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`} className="hover:text-electric font-medium transition-colors">
                    {p.h1 || p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Offshore Tech Hubs */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Technology Stacks ({techData.length})
            </h2>
            <ul className="space-y-2 text-xs text-slate-600 max-h-80 overflow-y-auto pr-2">
              {techData.map((t: any) => (
                <li key={t.slug}>
                  <Link href={`/tech/${t.slug}`} className="hover:text-electric font-medium transition-colors">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Industry Verticals */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Industry Verticals ({industryData.length})
            </h2>
            <ul className="space-y-2 text-xs text-slate-600 max-h-80 overflow-y-auto pr-2">
              {industryData.map((i: any) => (
                <li key={i.slug}>
                  <Link href={`/industry/${i.slug}`} className="hover:text-electric font-medium transition-colors">
                    {i.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Game Development Hub */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Game Engineering ({gamingData.length})
            </h2>
            <ul className="space-y-2 text-xs text-slate-600 max-h-80 overflow-y-auto pr-2">
              {gamingData.map((g: any) => (
                <li key={g.slug}>
                  <Link href={`/gaming/${g.slug}`} className="hover:text-electric font-medium transition-colors">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 6. Geo Location Hubs */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Global Regional Hubs ({locationsData.length})
            </h2>
            <ul className="space-y-2 text-xs text-slate-600 max-h-80 overflow-y-auto pr-2">
              {locationsData.map((l: any) => (
                <li key={l.slug}>
                  <Link href={`/services/${l.slug}`} className="hover:text-electric font-medium transition-colors">
                    Software Development in {l.cityName} ({l.countryName})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 7. Cost Estimators & Guides */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Cost & Budget Guides ({costData.length})
            </h2>
            <ul className="space-y-2 text-xs text-slate-600 max-h-80 overflow-y-auto pr-2">
              {costData.map((c: any) => (
                <li key={c.slug}>
                  <Link href={`/cost/${c.slug}`} className="hover:text-electric font-medium transition-colors">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 8. Tech Comparisons */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Framework Comparisons ({compareData.length})
            </h2>
            <ul className="space-y-2 text-xs text-slate-600 max-h-80 overflow-y-auto pr-2">
              {compareData.map((c: any) => (
                <li key={c.slug}>
                  <Link href={`/compare/${c.slug}`} className="hover:text-electric font-medium transition-colors">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 9. Glossary Definitions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Technical Glossary ({glossaryData.length})
            </h2>
            <ul className="space-y-2 text-xs text-slate-600 max-h-80 overflow-y-auto pr-2">
              {glossaryData.map((g: any) => (
                <li key={g.slug}>
                  <Link href={`/glossary/${g.slug}`} className="hover:text-electric font-medium transition-colors">
                    {g.term || g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 10. Portfolio Case Studies */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Case Studies ({portfolios.length})
            </h2>
            <ul className="space-y-2 text-xs text-slate-600 max-h-80 overflow-y-auto pr-2">
              {portfolios.map(p => (
                <li key={p.slug}>
                  <Link href={`/portfolio/${p.slug}`} className="hover:text-electric font-medium transition-colors">
                    {p.name} ({p.industry})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 11. Blog Articles */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4 md:col-span-2">
            <h2 className="text-lg font-bold text-navy border-l-4 border-electric pl-3">
              Blog Articles & Engineering Tutorials ({blogs.length})
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 max-h-80 overflow-y-auto pr-2">
              {blogs.map(b => (
                <li key={b.slug} className="truncate">
                  <Link href={`/blog/${b.slug}`} className="hover:text-electric font-medium transition-colors">
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
