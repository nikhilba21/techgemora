"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Search, ArrowRight, ShieldCheck, Zap, Server } from 'lucide-react';
import { Portfolio } from '@/lib/db';

interface PortfolioClientProps {
  initialPortfolios: Portfolio[];
}

export default function PortfolioClient({ initialPortfolios }: PortfolioClientProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const industries = ['All', ...Array.from(new Set(initialPortfolios.map(p => p.industry)))];

  const filteredPortfolios = initialPortfolios.filter(p => {
    const matchesIndustry = selectedIndustry === 'All' || p.industry === selectedIndustry;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.technology.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIndustry && matchesSearch && p.published;
  });

  return (
    <div className="w-full min-h-screen bg-slate-bg py-16 bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center bg-blue-50 border border-blue-200 text-electric text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Proven Outcomes
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
            Our Project Portfolio
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Explore our showcase of custom software solutions, high-conversion web platforms, and mobile apps built for global clients.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Industry tabs */}
          <div className="flex flex-wrap gap-2">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedIndustry === ind ? 'bg-navy text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-navy'}`}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric w-full"
            />
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPortfolios.map((port) => (
              <motion.div
                key={port.slug}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-5"
              >
                {/* Visual side */}
                <div className="lg:col-span-2 bg-navy p-8 flex flex-col justify-between text-white bg-grid-pattern-dark relative min-h-[250px] lg:min-h-auto">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/10 blur-[50px] rounded-full pointer-events-none"></div>
                  
                  <div className="space-y-4 relative z-10">
                    <span className="text-[10px] font-bold text-cyan uppercase tracking-wider bg-blue-900/30 border border-blue-800/40 px-2.5 py-1 rounded-full">
                      {port.industry}
                    </span>
                    <h3 className="text-2xl font-bold">{port.name}</h3>
                    <p className="text-slate-300 text-xs leading-relaxed">{port.description}</p>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Client Country: <strong>{port.clientCountry}</strong></span>
                    <Globe className="w-4 h-4 text-cyan" />
                  </div>
                </div>

                {/* Details side */}
                <div className="lg:col-span-3 p-6 md:p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Challenge */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-red-500" />
                        The Challenge
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{port.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-electric" />
                        Our Solution
                      </h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{port.solution}</p>
                    </div>
                  </div>

                  {/* Results metrics */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/40 space-y-1.5">
                    <h4 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                      <Server className="w-4 h-4 text-green-500" />
                      Business Impact & Results
                    </h4>
                    <p className="text-slate-600 font-semibold text-xs leading-relaxed italic">
                      {port.results}
                    </p>
                  </div>

                  {/* Technology Used tag list */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold text-navy uppercase tracking-wider">Technology Stack:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {port.technology.map(tech => (
                        <span 
                          key={tech} 
                          className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-md border border-slate-200/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPortfolios.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200/80 rounded-2xl">
              <p className="text-slate-500 text-sm">No portfolio items found matching your filters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
