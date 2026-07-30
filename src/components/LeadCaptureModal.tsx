"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Dedicated Developers');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

    // Trigger after 18 seconds as a fallback
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('gemora_lead_modal', 'true');
      }
    }, 18000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasTriggered]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          phone, 
          projectType, 
          source: 'High-Intent Exit & Timer Modal' 
        })
      });
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => setIsOpen(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

            <form className="mt-6 space-y-3 text-left" onSubmit={handleSubmit}>
              {isSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-2xl text-center text-sm font-bold space-y-1">
                  <p className="text-base">🚀 Request Submitted!</p>
                  <p className="text-xs font-normal text-slate-600">A Senior Solutions Architect will contact you via WhatsApp / Email within 2 hours.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2.5">
                    <input 
                      type="text" 
                      placeholder="Your Name *" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-electric transition-all"
                      required
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input 
                        type="email" 
                        placeholder="Work Email *" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-electric transition-all"
                        required
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone / WhatsApp Number *" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-electric transition-all"
                        required
                      />
                    </div>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs text-slate-800 focus:outline-none focus:border-electric cursor-pointer font-medium"
                    >
                      <option value="Dedicated Developers">Hire Dedicated Squad ($25-$45/hr)</option>
                      <option value="Custom SaaS Product">Build Custom SaaS / Web App</option>
                      <option value="Mobile App Development">Build iOS / Android App</option>
                      <option value="Game Development">Build Rummy / Casino / 3D Game</option>
                      <option value="AI / ML Solution">Build Custom AI / LLM Solution</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-electric hover:bg-[#e04f00] text-white text-xs font-extrabold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-electric/25 disabled:opacity-70 cursor-pointer mt-2"
                  >
                    {isSubmitting ? 'Securing Session...' : 'Claim My Free Architecture & Cost Proposal'}
                    <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </>
              )}
              <p className="text-center text-[10px] text-slate-400 mt-2 uppercase tracking-wider font-semibold">
                100% Confidential • NDA Protected • Zero Commitment
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
