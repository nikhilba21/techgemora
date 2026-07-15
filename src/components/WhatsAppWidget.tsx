"use client";

import React from 'react';

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/919928714867"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      {/* Glow pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:animate-none"></span>
      
      {/* Official WhatsApp Logo SVG */}
      <svg className="w-5.5 h-5.5 fill-current relative z-10" viewBox="0 0 24 24">
        <path d="M12.031 2c-5.524 0-10 4.48-10 10 0 1.83.49 3.54 1.36 5.02L2 22l5.14-1.34c1.44.78 3.08 1.23 4.89 1.23 5.52 0 10-4.48 10-10s-4.48-10-10-10zm5.83 14.22c-.25.71-1.28 1.29-1.78 1.34-.44.04-.97.06-2.94-.74-2.52-1.02-4.14-3.58-4.27-3.75-.12-.17-1.04-1.37-1.04-2.61 0-1.24.65-1.85.88-2.1.23-.25.5-.31.67-.31.17 0 .34.01.49.02.16.01.37-.06.57.42.21.5.71 1.73.77 1.85.06.12.1.27.02.43-.08.17-.18.27-.3.41-.12.14-.26.31-.37.42-.12.12-.25.25-.11.49.14.24.63 1.03 1.35 1.67.92.82 1.7 1.08 1.94 1.2.24.12.38.1.52-.06.14-.17.62-.72.79-.97.17-.25.34-.21.57-.12.23.1 1.48.7 1.73.82.25.12.42.18.48.29.06.11.06.64-.19 1.35z"/>
      </svg>
      
      {/* Hover tooltip */}
      <span className="absolute right-14 bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all shadow-md pointer-events-none whitespace-nowrap">
        Message us on WhatsApp
      </span>
    </a>
  );
}
