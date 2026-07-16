import React from 'react';
import Link from 'next/link';

export default function AuthorBio() {
  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nikhil",
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "Gemora Tech"
    },
    "url": "https://www.dexteroussoftech.com",
    "sameAs": [
      "https://www.linkedin.com/in/nikhilba21" // Replace with actual URL if known
    ],
    "description": "Nikhil is the Founder and CEO of Gemora Tech, bringing over a decade of experience in enterprise software architecture, AI integration, and full-cycle game development."
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }} />
      
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md bg-slate-200">
        <img 
          src="https://ui-avatars.com/api/?name=Nikhil&background=1E3A8A&color=fff&size=128" 
          alt="Nikhil - Founder of Gemora Tech" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-navy">Nikhil</h3>
            <p className="text-sm text-electric font-semibold uppercase tracking-wider">Founder & CEO @ Gemora Tech</p>
          </div>
          <Link 
            href="https://www.linkedin.com/in/nikhilba21" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-4 py-2 rounded-lg transition-colors shadow-sm w-fit"
          >
            <svg className="w-4 h-4 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            Connect on LinkedIn
          </Link>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
          With extensive experience in enterprise software architecture, AI models, and immersive game development, Nikhil leads Gemora Tech in delivering scalable digital transformation solutions for clients worldwide.
        </p>
      </div>
    </div>
  );
}
