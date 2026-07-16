"use client";

import React from 'react';

export default function TrustBadges() {
  return (
    <section className="bg-white border-y border-slate-200 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
            Certified & Verified by Independent Authorities
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* DMCA Badge Mock */}
            <div className="flex items-center gap-2 font-bold text-slate-800">
              <span className="w-6 h-6 bg-blue-600 text-white flex items-center justify-center rounded-full text-xs">✓</span>
              DMCA Protected
            </div>
            {/* GoodFirms Mock */}
            <div className="flex items-center gap-2 font-extrabold text-slate-800 text-lg">
              <span className="text-red-500">Good</span>Firms
            </div>
            {/* Clutch Mock */}
            <div className="flex items-center gap-2 font-extrabold text-slate-800 text-lg tracking-tight">
              Clutch<span className="text-orange-500 text-2xl leading-none">.</span>
            </div>
            {/* ISO Mock */}
            <div className="flex items-center gap-2 font-bold text-slate-800">
              ISO 9001:2015
            </div>
            {/* SoftwareWorld Mock */}
            <div className="flex items-center gap-2 font-bold text-slate-800 border-2 border-slate-800 px-2 py-0.5 rounded">
              SoftwareWorld
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
