"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, X } from 'lucide-react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:hidden" // Only visible on mobile/tablet screens
        >
          <div className="bg-navy rounded-2xl shadow-2xl p-4 flex items-center justify-between border border-white/10 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-electric/20 to-transparent pointer-events-none"></div>
            
            <div className="flex flex-col relative z-10">
              <span className="text-white font-bold text-sm leading-tight">Ready to start?</span>
              <span className="text-slate-300 text-xs">Hire Top Developers</span>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <Link 
                href="/contact"
                className="bg-electric hover:bg-cyan text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-lg"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Let's Talk
              </Link>
              <button 
                onClick={() => setIsDismissed(true)}
                className="text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
