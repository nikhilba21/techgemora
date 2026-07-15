"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function QuickConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', requirements: '' });
    }, 1200);
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-3">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-900">Message Sent!</h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          Thank you for reaching out. A solutions architect will review your project and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-lg shadow-slate-100/50 space-y-3 text-left">
      <div>
        <h4 className="text-sm font-bold text-slate-900">Get a Free Consultation</h4>
        <p className="text-[10px] text-slate-500 mt-0.5">Average response time: 2 hours</p>
      </div>

      <div className="space-y-2">
        <input 
          type="text" 
          placeholder="Your Name *"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-electric focus:bg-white transition-colors"
        />
        <input 
          type="email" 
          placeholder="Email Address *"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-electric focus:bg-white transition-colors"
        />
        <input 
          type="tel" 
          placeholder="Phone Number *"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-electric focus:bg-white transition-colors"
        />
        <textarea 
          placeholder="Describe Your Project Requirements *"
          required
          rows={3}
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-electric focus:bg-white transition-colors resize-none"
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full bg-electric hover:bg-[#e04f00] disabled:bg-orange-300 text-white font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
