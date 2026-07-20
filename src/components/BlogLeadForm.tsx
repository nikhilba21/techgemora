"use client";

import React, { useState } from 'react';
import { Send, CheckCircle, HelpCircle } from 'lucide-react';

interface BlogLeadFormProps {
  blogTitle: string;
}

export default function BlogLeadForm({ blogTitle }: BlogLeadFormProps) {
  const [email, setEmail] = useState('');
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
          name: 'Blog Reader',
          message: `Requested consultation while reading article: "${blogTitle}"`,
          source: 'Blog Inline Form'
        })
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert('Failed to submit email. Please try again.');
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
      <div className="bg-[#0B192C] text-white p-6 md:p-8 rounded-2xl shadow-md border border-white/10 flex flex-col items-center justify-center text-center space-y-3 w-full transition-all animate-fade-in">
        <CheckCircle className="w-10 h-10 text-emerald-400" />
        <h3 className="text-base font-bold">Thank You!</h3>
        <p className="text-xs text-slate-350 max-w-md">
          Your request has been registered. An engineering consultant will email you at <strong className="text-white">{email}</strong> within 1-2 business hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#0B192C] text-white p-6 md:p-8 rounded-2xl shadow-md border border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 w-full">
      <div className="space-y-2 text-left">
        <span className="inline-flex items-center gap-1 bg-electric/15 border border-electric/30 text-electric text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          <HelpCircle className="w-3 h-3 text-electric" />
          Free Scoping Consultation
        </span>
        <h3 className="text-base sm:text-lg font-bold">Scaling Your Custom Software Engineering?</h3>
        <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
          Get a free tech assessment and custom timeline roadmap for your project. No commitment required.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full md:w-auto shrink-0 flex flex-col sm:flex-row gap-2 max-w-sm md:max-w-none">
        <input
          type="email"
          placeholder="Enter Work Email *"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border border-white/15 rounded-lg px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-electric focus:bg-white/15 transition-all w-full sm:w-60"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-electric hover:bg-electric/90 text-white font-bold py-3 px-6 rounded-lg text-xs transition-all shrink-0 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
        >
          {submitting ? 'Submitting...' : 'Request Consultation'}
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
