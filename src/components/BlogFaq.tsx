"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface BlogFaqProps {
  faqs: FaqItem[];
}

export default function BlogFaq({ faqs }: BlogFaqProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-navy flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-electric" />
        Frequently Asked Questions
      </h3>
      
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div 
            key={idx}
            className="bg-slate-50 border border-slate-200/60 rounded-xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="flex items-center justify-between w-full p-4 text-left font-bold text-sm text-navy hover:text-electric transition-colors"
            >
              <span>{faq.question}</span>
              {openIdx === idx ? (
                <Minus className="w-4 h-4 text-electric shrink-0" />
              ) : (
                <Plus className="w-4 h-4 text-slate-500 shrink-0" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
