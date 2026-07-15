"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Briefcase, LayoutDashboard, CheckCircle2, ChevronRight } from 'lucide-react';
import { Portfolio } from '@/lib/db';
import Image from 'next/image';

export default function PortfolioDetailClient({ portfolio }: { portfolio: Portfolio }) {
  const [activeTab, setActiveTab] = useState<'customer' | 'provider' | 'admin'>('customer');

  const tabs = [
    { id: 'customer', label: 'Customer App', icon: Smartphone, desc: 'A clean, intuitive user app: instant booking, live tracking, and payments — all under your brand.' },
    { id: 'provider', label: 'Provider / Driver App', icon: Briefcase, desc: 'Dedicated interface for service providers to manage requests, earnings, and live routing.' },
    { id: 'admin', label: 'Admin Dashboard', icon: LayoutDashboard, desc: 'Command center to track all activities, manage users, and analyze financial reports in real-time.' }
  ];

  const getTabImage = () => {
    if (!portfolio.images) return null;
    if (activeTab === 'customer' && portfolio.images.length > 1) return portfolio.images[1];
    if (activeTab === 'provider' && portfolio.images.length > 2) return portfolio.images[2];
    if (activeTab === 'admin' && portfolio.images.length > 3) return portfolio.images[3];
    return portfolio.images[0];
  };

  const currentTabInfo = tabs.find(t => t.id === activeTab)!;

  return (
    <section className="py-24 bg-slate-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-electric font-bold text-sm tracking-wider uppercase">Customer · Provider · Admin</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy">Three connected apps, one platform</h2>
          <p className="text-slate-500 text-lg">Purpose-built interfaces for every role in your {portfolio.industry.toLowerCase()} operation — switch between them to see what each delivers.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16 border-b border-slate-200 pb-1">
           {tabs.map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-2 px-6 py-4 font-bold text-sm rounded-t-xl transition-all relative ${
                 activeTab === tab.id ? 'text-electric bg-white shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] border-t border-x border-slate-200' : 'text-slate-500 hover:bg-slate-100'
               }`}
             >
               <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-electric' : 'text-slate-400'}`} />
               {tab.label}
               {activeTab === tab.id && (
                 <motion.div layoutId="activetab" className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white z-20"></motion.div>
               )}
             </button>
           ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
             <h3 className="text-3xl md:text-4xl font-extrabold text-navy">{currentTabInfo.label} Experience</h3>
             <p className="text-lg text-slate-500 leading-relaxed">{currentTabInfo.desc}</p>
             
             <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-700 font-semibold"><CheckCircle2 className="w-5 h-5 text-electric" /> Intuitive & Modern UI/UX</li>
                <li className="flex items-center gap-3 text-slate-700 font-semibold"><CheckCircle2 className="w-5 h-5 text-electric" /> Highly Scalable Architecture</li>
                <li className="flex items-center gap-3 text-slate-700 font-semibold"><CheckCircle2 className="w-5 h-5 text-electric" /> Real-time Data Synchronization</li>
             </ul>

             <div className="pt-6">
                <button className="bg-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-electric transition-colors shadow-lg shadow-navy/20 flex items-center gap-2">
                   View Interactive Demo
                   <ChevronRight className="w-4 h-4" />
                </button>
             </div>
           </div>

           <div className="relative">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.4 }}
                   className="relative aspect-[9/16] md:aspect-[3/4] w-full max-w-sm mx-auto rounded-[2.5rem] border-8 border-slate-800 bg-slate-900 shadow-2xl overflow-hidden"
                 >
                    {getTabImage() ? (
                       <Image src={getTabImage()!} alt={`${currentTabInfo.label} Mockup`} fill className="object-cover" />
                    ) : (
                       <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm p-8 text-center bg-grid-pattern-dark">
                          Awaiting AI Generation...
                       </div>
                    )}
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </div>
    </section>
  );
}
