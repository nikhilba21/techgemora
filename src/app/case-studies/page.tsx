import React from 'react';
import Link from 'next/link';
import { getPortfolios } from '@/lib/db';
import { ShieldAlert, Lightbulb, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export const revalidate = 0; // Force live data loading

export default async function CaseStudiesPage() {
  const portfolios = await getPortfolios();
  const publishedStudies = portfolios.filter(p => p.published);

  return (
    <div className="w-full min-h-screen bg-slate-bg py-16 bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center bg-blue-50 border border-blue-200 text-electric text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
            Enterprise Client Success Stories
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Read detailed breakdowns of how Gemora Tech builds scalable custom systems, solves performance challenges, and delivers ROI.
          </p>
        </div>

        {/* List of Case Studies */}
        <div className="space-y-16">
          {publishedStudies.map((study, idx) => (
            <div 
              key={study.slug}
              className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden"
            >
              {/* Header Bar */}
              <div className="bg-navy text-white px-6 py-8 md:p-8 bg-grid-pattern-dark flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-cyan uppercase tracking-widest bg-blue-900/40 border border-blue-800/40 px-3 py-1 rounded-full">
                    {study.industry} Case Study
                  </span>
                  <h2 className="text-2xl font-bold">{study.name}</h2>
                </div>
                <div className="text-right text-xs text-slate-400">
                  <span>Client Sector: <strong>{study.industry}</strong></span>
                  <span className="block mt-1">Market: <strong>{study.clientCountry}</strong></span>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-6 md:p-8 space-y-8">
                
                {/* 3 Step Breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Challenge */}
                  <div className="space-y-3 bg-slate-50/40 p-5 rounded-2xl border border-slate-200/40">
                    <h3 className="text-sm font-bold text-navy flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                      Business Challenge
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="space-y-3 bg-slate-50/40 p-5 rounded-2xl border border-slate-200/40">
                    <h3 className="text-sm font-bold text-navy flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-electric shrink-0" />
                      Our Solution & Stack
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {study.solution}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="space-y-3 bg-slate-50/40 p-5 rounded-2xl border border-slate-200/40">
                    <h3 className="text-sm font-bold text-navy flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500 shrink-0" />
                      Business Impact
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {study.results}
                    </p>
                  </div>

                </div>

                {/* Tech tags */}
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">Core Stack Configured:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {study.technology.map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-md border border-slate-200/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lead Form CTA hook */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-navy">Need similar outcomes for your business?</p>
                    <p className="text-[11px] text-slate-500">Book a detailed consulting session to audit your current system stack.</p>
                  </div>
                  <Link 
                    href="/contact"
                    className="bg-navy hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 shrink-0"
                  >
                    Consult Solutions Expert
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </div>
          ))}

          {publishedStudies.length === 0 && (
            <div className="text-center py-20 bg-white border border-slate-200/80 rounded-3xl">
              <p className="text-slate-500 text-sm">No client case studies found in the database.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
