"use client";

import React from 'react';
import Link from 'next/link';

export default function PressPage() {
  const news = [
    {
      date: 'March 15, 2026',
      title: 'Dexterous Softech Officially Rebrands to Gemora Tech',
      category: 'Corporate Announcement',
      content: 'In a strategic move to better align with our expanding global enterprise client base, Dexterous Softech Private Limited has officially rebranded its international technology consulting division as Gemora Tech, under the parent company Gemora Global. This allows us to serve our overseas clients with a more unified and enterprise-focused brand.'
    },
    {
      date: 'January 10, 2026',
      title: 'Gemora Tech Recognized as Top B2B Development Partner by Clutch',
      category: 'Awards',
      content: 'We are thrilled to announce that Gemora Tech has been recognized as a top software development agency in the 2026 Clutch B2B awards, reflecting our 99.8% SLA client retention rate and commitment to engineering excellence.'
    },
    {
      date: 'November 22, 2025',
      title: 'Expansion of Dubai and London Delivery Centers',
      category: 'Global Expansion',
      content: 'To better serve our EMEA clients, Gemora Tech has successfully opened new client success offices in Dubai Silicon Oasis and London, augmenting our massive offshore engineering talent pool in India.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-bg py-24 relative overflow-hidden text-slate-800">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 z-0"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 mt-10">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold text-electric uppercase tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            Press & Media
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy">
            Gemora Tech Newsroom
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Official announcements, corporate milestones, and press releases from the Gemora Global team.
          </p>
        </div>

        <div className="space-y-8">
          {news.map((item, idx) => (
            <article key={idx} className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <span className="text-xs font-bold text-electric bg-blue-50 px-2 py-1 rounded w-fit">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{item.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-navy mb-4 group-hover:text-electric transition-colors">
                {item.title}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.content}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 bg-navy text-white p-8 rounded-2xl text-center space-y-4">
          <h3 className="text-xl font-bold">Media Inquiries</h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            For press kits, executive interviews, or media relations, please contact our corporate communications team.
          </p>
          <a href="mailto:nikhil@dexteroussoftech.com" className="inline-block bg-electric hover:bg-[#e04f00] font-bold text-xs px-6 py-3 rounded-full transition-colors mt-2">
            Contact Press Office
          </a>
        </div>
      </div>
    </div>
  );
}
