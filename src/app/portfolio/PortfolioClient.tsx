"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Search, ArrowRight, ShieldCheck, Zap, Server } from 'lucide-react';
import { Portfolio } from '@/lib/db';
import Link from 'next/link';

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
                className="bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1.5 hover:border-electric/50 transition-all duration-500 overflow-hidden group"
              >
                <Link href={`/portfolio/${port.slug}`} className="grid grid-cols-1 lg:grid-cols-5 h-full">
                
                {/* Visual side */}
                <div className="lg:col-span-2 relative min-h-[300px] lg:min-h-auto overflow-hidden bg-navy flex flex-col justify-between p-8">
                  {port.images && port.images.length > 0 ? (
                    <img src={port.images[0]} alt={port.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-navy bg-grid-pattern-dark">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/20 blur-[50px] rounded-full pointer-events-none"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent"></div>
                  
                  <div className="relative z-10 flex justify-between items-start w-full">
                    <span className="text-[10px] font-bold text-cyan uppercase tracking-wider bg-navy/60 backdrop-blur-md border border-cyan/30 px-3 py-1.5 rounded-full shadow-lg">
                      {port.industry}
                    </span>
                    <span className="text-xs text-white/80 font-semibold bg-navy/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/10">
                      <Globe className="w-3.5 h-3.5" />
                      {port.clientCountry}
                    </span>
                  </div>

                  <div className="relative z-10 mt-auto space-y-2">
                    <h3 className="text-3xl font-extrabold text-white group-hover:text-cyan transition-colors">{port.name}</h3>
                  </div>
                </div>

                {/* Details side */}
                <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-between bg-white relative">
                  <div className="space-y-8">
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed border-l-4 border-electric pl-5 italic">
                      "{port.description}"
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Challenge */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-rose-500" />
                          The Challenge
                        </h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{port.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-500" />
                          Our Solution
                        </h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{port.solution}</p>
                      </div>
                    </div>

                    {/* Results metrics */}
                    <div className="bg-green-50/50 p-4 rounded-xl border border-green-200/60 space-y-1.5">
                      <h4 className="text-xs font-bold text-green-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Server className="w-4 h-4 text-green-600" />
                        Business Impact
                      </h4>
                      <p className="text-green-800 font-semibold text-xs leading-relaxed">
                        {port.results}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Footer Area */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="space-y-2 flex-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tech Stack</p>
                      <div className="flex flex-wrap gap-1.5">
                        {port.technology.slice(0, 4).map(tech => (
                          <span key={tech} className="bg-slate-50 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-200">
                            {tech}
                          </span>
                        ))}
                        {port.technology.length > 4 && (
                          <span className="bg-slate-50 text-slate-500 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-200">
                            +{port.technology.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 bg-electric text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-navy transition-all duration-300 shadow-lg shadow-electric/25 shrink-0 group-hover:shadow-electric/40">
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                </Link>
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
