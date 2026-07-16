"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if user has already seen it this session
    const hasSeen = sessionStorage.getItem('gemora_lead_modal');
    if (hasSeen) return;

    // Trigger on exit intent (mouse leaving viewport at the top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('gemora_lead_modal', 'true');
      }
    };

    // Trigger after 45 seconds as a fallback
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('gemora_lead_modal', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasTriggered]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200"
        >
          {/* Close button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-navy"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative p-8 md:p-10 bg-grid-pattern">
            <div className="text-center space-y-4">
              <span className="inline-flex items-center bg-electric/10 text-electric text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                Free Technical Consultation
              </span>
              <h2 className="text-3xl font-extrabold text-navy leading-tight">
                Wait! Let's Build Something <span className="text-electric">Incredible.</span>
              </h2>
              <p className="text-slate-500 text-sm">
                Before you go, get a free, no-obligation architecture review and cost estimate from our senior engineering team.
              </p>
            </div>

            <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your work email..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-700 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-electric hover:bg-cyan text-white text-sm font-bold px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(33,147,176,0.3)] hover:shadow-[0_0_30px_rgba(33,147,176,0.5)]"
              >
                Claim My Free Strategy Session
                <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-wider">
                100% Confidential. NDA Protected.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
