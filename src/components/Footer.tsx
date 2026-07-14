"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Custom Software', href: '/custom-software-development' },
    { label: 'Web Development', href: '/web-development-company' },
    { label: 'Mobile App Dev', href: '/mobile-app-development-company' },
    { label: 'AI Development', href: '/ai-development-company' },
    { label: 'SaaS Products', href: '/saas-development-company' },
    { label: 'Game Development', href: '/game-development-company' },
    { label: 'Cloud Architecture', href: '/cloud-development-services' },
    { label: 'DevOps Automation', href: '/devops-services' },
    { label: 'Quality Assurance', href: '/software-testing-services' }
  ];

  const hireDevs = [
    { label: 'Hire React Devs', href: '/hire-react-developers' },
    { label: 'Hire Next.js Devs', href: '/hire-nextjs-developers' },
    { label: 'Hire Node.js Devs', href: '/hire-nodejs-developers' },
    { label: 'Hire Python Devs', href: '/hire-python-developers' },
    { label: 'Hire Flutter Devs', href: '/hire-flutter-developers' },
    { label: 'Hire Swift Devs', href: '/hire-ios-developers' },
    { label: 'Hire Android Devs', href: '/hire-android-developers' },
    { label: 'Hire Laravel Devs', href: '/hire-laravel-developers' }
  ];

  const industries = [
    { label: 'Healthcare', href: '/healthcare-software-development' },
    { label: 'FinTech', href: '/fintech-software-development' },
    { label: 'Ecommerce', href: '/ecommerce-development' },
    { label: 'Real Estate', href: '/real-estate-software-development' },
    { label: 'Education', href: '/education-software-development' },
    { label: 'Logistics', href: '/logistics-software-development' },
    { label: 'Manufacturing', href: '/manufacturing-software-development' }
  ];

  const techLinks = [
    { label: 'React.js Development', href: '/react-development-company' },
    { label: 'Next.js Development', href: '/nextjs-development-company' },
    { label: 'Node.js Development', href: '/nodejs-development-company' },
    { label: 'Python Development', href: '/python-development-company' },
    { label: 'Flutter Development', href: '/flutter-development-company' },
    { label: 'Angular Development', href: '/angular-development-company' },
    { label: 'AWS Deployments', href: '/aws-development-services' }
  ];

  return (
    <footer className="bg-navy text-white pt-16 pb-8 border-t border-slate-800 bg-grid-pattern-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Corporate Profile Column */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <img src="/logo.png" alt="Gemora Tech Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center leading-none">
                  GEMORA <span className="text-electric ml-1">TECH</span>
                </span>
                <span className="text-[8px] font-medium text-slate-450 uppercase tracking-widest leading-none mt-1">
                  IT Services & Solutions
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed">
              Gemora Tech is the technology division of <strong>Gemora Global Private Limited</strong>, formerly known as <strong>Dexterous Softech Private Limited</strong>. We build world-class custom software, web portals, mobile apps, and artificial intelligence models for global brands.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-electric text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-electric text-slate-400 hover:text-white transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-electric text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-electric text-slate-400 hover:text-white transition-colors" aria-label="Website">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Directory Columns */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-electric pl-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {services.slice(0, 7).map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="hover:text-electric transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/software-development-company-india" className="hover:text-electric font-semibold text-slate-300">
                  Offshore India Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-electric pl-2">
              Hire Developers
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {hireDevs.map((h) => (
                <li key={h.label}>
                  <Link href={h.href} className="hover:text-electric transition-colors">
                    {h.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-l-2 border-electric pl-2">
              Technologies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {techLinks.map((t) => (
                <li key={t.label}>
                  <Link href={t.href} className="hover:text-electric transition-colors">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider border-l-2 border-electric pl-2">
              Subscribe Newsletter
            </h4>
            <p className="text-slate-400 text-xs">
              Get monthly technological insights, case studies, and engineering updates straight to your inbox.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter work email"
                required
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-electric w-full"
              />
              <button 
                type="submit" 
                className="bg-electric hover:bg-blue-700 text-white rounded-lg px-3 py-2 transition-colors flex items-center justify-center"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-electric shrink-0" />
                <span>sales@dexteroussoftech.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-electric shrink-0" />
                <span>Global HQ: Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Locations List */}
        <div className="border-t border-slate-800 pt-6 pb-6 text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-400 mb-2">Target Markets Served:</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/software-development-company-usa" className="hover:text-electric">United States (USA)</Link>
            <span>•</span>
            <Link href="/software-development-company-uk" className="hover:text-electric">United Kingdom (UK)</Link>
            <span>•</span>
            <Link href="/software-development-company-canada" className="hover:text-electric">Canada</Link>
            <span>•</span>
            <Link href="/software-development-company-australia" className="hover:text-electric">Australia</Link>
            <span>•</span>
            <Link href="/software-development-company-dubai" className="hover:text-electric">United Arab Emirates (UAE - Dubai)</Link>
            <span>•</span>
            <Link href="/software-development-company-india" className="hover:text-electric">India (Jaipur)</Link>
          </div>
        </div>

        {/* Legal and Disclaimer Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="text-center md:text-left">
            <p>© {currentYear} Gemora Tech. All rights reserved.</p>
            <p className="text-[10px] text-slate-600 mt-1">
              Gemora Tech is a registered business division of Gemora Global Private Limited (Formerly Dexterous Softech Private Limited).
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-400">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms-of-service" className="hover:text-slate-400">Terms of Service</Link>
            <span>|</span>
            <Link href="/sitemap.xml" className="hover:text-slate-400">XML Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
