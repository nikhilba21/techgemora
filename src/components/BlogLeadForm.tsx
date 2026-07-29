"use client";

import React, { useState } from 'react';
import { Send, CheckCircle, Shield, ArrowRight, DollarSign } from 'lucide-react';

interface BlogLeadFormProps {
  blogTitle: string;
}

export default function BlogLeadForm({ blogTitle }: BlogLeadFormProps) {
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Dedicated Developers');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: 'High-Intent Prospect',
          projectType: projectType,
          message: `Requested project scoping proposal from article: "${blogTitle}"`,
          source: 'Blog Commercial Lead Form'
        })
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Failed to submit request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-[#0B192C] text-white p-8 rounded-2xl shadow-xl border border-electric/30 flex flex-col items-center justify-center text-center space-y-4 w-full transition-all">
        <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/40">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-extrabold text-white">Proposal Request Received!</h3>
        <p className="text-xs text-slate-300 max-w-md leading-relaxed">
          Our CTO and Solutions Team will send a tailored cost estimate & project roadmap to <strong className="text-emerald-400">{email}</strong> within 2 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#0B192C] via-slate-900 to-[#0F2847] text-white p-6 sm:p-10 rounded-2xl shadow-2xl border border-blue-900/60 relative overflow-hidden space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-1.5 bg-electric/15 border border-electric/40 text-electric text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5" />
            Instant Project Scoping & Pricing
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Looking to Build a Custom App or Hire Pre-Vetted Developers?
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Get a line-item budget breakdown and engineering roadmap from Gemora Tech. Dedicated senior developers starting at <strong className="text-electric">$25–$45/hr</strong> ($3,200/month).
          </p>
        </div>

        <div className="hidden lg:flex flex-col gap-1.5 text-[10px] text-slate-300 font-semibold shrink-0 bg-white/5 p-3.5 rounded-xl border border-white/10">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Shield className="w-3.5 h-3.5" /> 100% NDA & IP Ownership
          </span>
          <span className="flex items-center gap-1.5 text-blue-300">
            ✓ 48-Hour Developer Onboarding
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-1">
          <select
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-electric cursor-pointer"
          >
            <option value="Dedicated Developers" className="bg-slate-900 text-white">Hire Dedicated Squad ($25-$45/hr)</option>
            <option value="Custom SaaS Product" className="bg-slate-900 text-white">Build Custom SaaS / Web App</option>
            <option value="Mobile App Development" className="bg-slate-900 text-white">Build iOS / Android App</option>
            <option value="Game Development" className="bg-slate-900 text-white">Build Rummy / Casino / 3D Game</option>
            <option value="AI / ML Solution" className="bg-slate-900 text-white">Build Custom AI / LLM Solution</option>
          </select>
        </div>

        <div className="sm:col-span-1">
          <input
            type="email"
            placeholder="Enter Work Email *"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-electric transition-all"
          />
        </div>

        <div className="sm:col-span-1">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-electric hover:bg-[#e04f00] text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-all shadow-lg shadow-electric/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {submitting ? 'Generating Proposal...' : 'Get Cost & Timeline Proposal'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

    </div>
  );
}
