"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, ChevronRight, Cpu, Globe, Server, Settings, 
  ShieldCheck, Star, MessageSquare, Play, Plus, Minus, ArrowUpRight, 
  Code, Zap, Layers, Users, Database, Smartphone 
} from 'lucide-react';
import type { SEOPage, Portfolio, Blog } from '@/lib/db';
import TrustBadges from '@/components/TrustBadges';

export default function HomePage() {
  const [activeTechTab, setActiveTechTab] = useState<'frontend' | 'backend' | 'mobile' | 'cloud'>('frontend');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(0);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Fetch data asynchronously on client load
    async function loadData() {
      try {
        const portsRes = await fetch('/api/portfolios');
        if (portsRes.ok) {
          const ports = await portsRes.json();
          setPortfolios(Array.isArray(ports) ? ports.slice(0, 8) : []);
        }
        
        const postsRes = await fetch('/api/blogs');
        if (postsRes.ok) {
          const posts = await postsRes.json();
          setBlogs(Array.isArray(posts) ? posts.slice(0, 3) : []);
        }
      } catch (err) {
        console.error("Failed to load records on home page:", err);
      }
    }
    loadData();
  }, []);

  const stats = [
    { value: '10+ Years', label: 'Industry Experience' },
    { value: '100+ Projects', label: 'Delivered Globally' },
    { value: '99.8%', label: 'SLA Client Retention' },
    { value: '24/7', label: 'Overlapping Support' }
  ];

  const services = [
    { slug: 'custom-software-development', title: 'Custom Software Development', desc: 'Bespoke systems, API design, and legacy codebase migrations.', icon: Cpu },
    { slug: 'web-development-company', title: 'Web Application Development', desc: 'High-performance Next.js portals and single-page apps.', icon: Globe },
    { slug: 'mobile-app-development-company', title: 'Mobile App Development', desc: 'Native Swift, Kotlin, and hybrid Flutter/React Native builds.', icon: Smartphone },
    { slug: 'ai-development-company', title: 'AI & Machine Learning Solutions', desc: 'LLM fine-tuning, intelligent bots, and automation pipelines.', icon: Code },
    { slug: 'saas-development-company', title: 'SaaS Product Engineering', desc: 'Multi-tenant database design and Stripe/billing engines.', icon: Layers },
    { slug: 'game-development-company', title: 'Interactive Game Dev', desc: 'Engaging HTML5 web-based and cross-platform 2D/3D games.', icon: Play },
    { slug: 'cloud-development-services', title: 'Cloud Architecture & Dev', desc: 'AWS/Azure configuration, serverless setups, and CI/CD pipelines.', icon: Server },
    { slug: 'devops-services', title: 'DevOps & Git Automation', desc: 'Docker clustering, Kubernetes, and automated deployment loops.', icon: Settings },
    { slug: 'software-testing-services', title: 'QA & Software Auditing', desc: 'Automation test suites, stress testing, and security compliance.', icon: ShieldCheck }
  ];

  const technologies = {
    frontend: [
      { name: 'React.js', desc: 'Component UI library', level: 'Expert' },
      { name: 'Next.js', desc: 'Server-side framework', level: 'Expert' },
      { name: 'Angular', desc: 'Enterprise MVC structure', level: 'Intermediate' },
      { name: 'Vue.js', desc: 'Progressive JS framework', level: 'Advanced' }
    ],
    backend: [
      { name: 'Node.js', desc: 'Asynchronous server runtime', level: 'Expert' },
      { name: 'Python', desc: 'Django, Flask, Fast API architectures', level: 'Expert' },
      { name: 'Laravel', desc: 'Robust PHP ecosystem', level: 'Expert' },
      { name: 'Java', desc: 'Enterprise Spring Boot microservices', level: 'Advanced' },
      { name: '.NET Core', desc: 'C# high-performance backend', level: 'Advanced' }
    ],
    mobile: [
      { name: 'Flutter', desc: 'Dart cross-platform framework', level: 'Expert' },
      { name: 'React Native', desc: 'JS cross-platform framework', level: 'Expert' },
      { name: 'Android', desc: 'Kotlin native applications', level: 'Advanced' },
      { name: 'iOS', desc: 'Swift native applications', level: 'Advanced' }
    ],
    cloud: [
      { name: 'AWS Cloud', desc: 'EC2, RDS, Lambda, S3, Cognito', level: 'Expert' },
      { name: 'MS Azure', desc: 'Enterprise cloud hosting', level: 'Advanced' },
      { name: 'Google Cloud', desc: 'AppEngine, Firebase database', level: 'Advanced' },
      { name: 'Docker / Kubernetes', desc: 'Application containerization', level: 'Expert' }
    ]
  };

  const industries = [
    { title: 'Healthcare & Pharma', desc: 'HIPAA compliant databases, doctor-patient portals, and e-prescribing.', icon: HeartIcon },
    { title: 'FinTech & Payments', desc: 'PCI-compliant ledgers, stripe integrations, and credit score analysis.', icon: CreditCardIcon },
    { title: 'Ecommerce & Retail', desc: 'High-speed headless catalogs, stock logs, and automatic checkout.', icon: ShoppingBagIcon },
    { title: 'Real Estate & Housing', desc: 'Dynamic map matching, CRM leads pipelines, and agent schedules.', icon: HomeIcon },
    { title: 'Education & LMS', desc: 'SCORM virtual classrooms, quiz managers, and student billing.', icon: BookOpenIcon },
    { title: 'Logistics & Supply', desc: 'Route optimization trackers, delivery manifests, and API status.', icon: TruckIcon },
    { title: 'Travel & Bookings', desc: 'Room reservation engines, flight search plugins, and trip planners.', icon: CompassIcon },
    { title: 'Manufacturing ERP', desc: 'Shop-floor monitoring hubs, supply trackers, and predictive upkeep.', icon: FactoryIcon }
  ];

  const processSteps = [
    { title: 'Discovery & Strategy', desc: 'We analyze your target market scope, define user roles, and outline project wireframes.' },
    { title: 'Agile Planning', desc: 'We draft the technical system architecture, allocate developer resources, and create sprint targets.' },
    { title: 'UI/UX Design', desc: 'Our design squad engineers responsive interface layouts, visual prototypes, and component libraries.' },
    { title: 'Development', desc: 'We deploy clean, document-ready, and unit-tested codebases in bi-weekly iterative sprints.' },
    { title: 'Quality Assurance', desc: 'We execute automated integration tests, API load testing, security scans, and cross-browser audits.' },
    { title: 'Deployment', desc: 'We configure CI/CD automations and launch to high-uptime servers like Vercel, AWS, or Azure.' },
    { title: 'Maintenance & Scaling', desc: 'We deliver ongoing server monitoring support, dependency updates, and feature scaling.' }
  ];

  const testimonials = [
    {
      quote: "Gemora Tech built our multi-tenant SaaS platform in record time. Their development process is highly structured and transparent.",
      author: "Sarah Jenkins",
      role: "Founder & CTO",
      company: "MedVibe Solutions (USA)",
      stars: 5,
      linkedIn: "https://linkedin.com"
    },
    {
      quote: "We scaled our engineering team by hiring 5 dedicated Next.js developers from Gemora Tech. The developers are fluent in English and write top-tier code.",
      author: "David Miller",
      role: "VP of Engineering",
      company: "PayPulse Gateway (Canada)",
      stars: 5,
      linkedIn: "https://linkedin.com"
    },
    {
      quote: "Their technical expertise in AI integration helped us automate our inventory workflows, resulting in a 40% reduction in overhead costs.",
      author: "Marcus Al-Mansoor",
      role: "Managing Director",
      company: "Gulf Logistics Group (Dubai, UAE)",
      stars: 5,
      linkedIn: "https://linkedin.com"
    }
  ];

  const faqs = [
    { question: "What is Gemora Tech's corporate relationship?", answer: "Gemora Tech is the global technology division of Gemora Global Private Limited. Our leadership team has been delivering technical solutions since 2015 under the legacy brand Dexterous Softech Private Limited, before restructuring in 2023 to serve international enterprise clients as Gemora Tech. This continuity ensures over 10+ years of collective engineering experience." },
    { question: "How do you ensure IP rights and code security?", answer: "We sign custom, legally binding Non-Disclosure Agreements (NDAs) and intellectual property contracts before coding starts. 100% of the project's source code IP belongs to our clients upon milestone settlement." },
    { question: "Can we hire dedicated developers on a monthly model?", answer: "Yes. We offer flexible engagement models, including monthly dedicated developer staffing (40 hours/week) and fixed-price milestone projects." },
    { question: "What countries does Gemora Tech serve?", answer: "We serve startups, mid-market scales, and corporate enterprises across the USA, UK, Canada, Australia, UAE, Europe, India, and globally." },
    { question: "Do you offer post-launch support?", answer: "Yes, every deployment comes with a standard 30-day warranty. We also offer SLA-based monthly maintenance plans for server upkeep, library updates, and hotfixes." }
  ];

  return (
    <div className="w-full bg-white text-slate-800 overflow-hidden relative">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B192C] text-white pt-24 pb-20 md:py-32 overflow-hidden border-b border-slate-900">
        {/* Layered background to avoid CSS conflicts */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0B192C] to-slate-900 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 z-0"></div>
        {/* Animated Cyber Glows */}
        <div className="cyber-glow -top-24 -left-20 z-0"></div>
        <div className="cyber-glow-blue top-1/3 -right-20 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-1.5 bg-electric/10 border border-electric/25 text-electric text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                <Zap className="w-3 h-3 text-electric" />
                Trusted Digital Transformation Partner
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white">
                Global Custom <br />
                <span className="gradient-text">Software Development</span> <br />
                Company
              </h1>
              
              <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                Gemora Tech (formerly Dexterous Softech) is a premier IT consulting company delivering enterprise software product development, AI automation, cross-platform mobile apps, SaaS, and hyper-targeted game development services globally.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
                <Link 
                  href="/contact" 
                  className="bg-electric text-white text-center font-bold px-8 py-4 rounded-full hover:bg-electric/90 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/contact" 
                  className="bg-white/10 border border-white/20 text-white text-center font-semibold px-8 py-4 rounded-full hover:bg-white/15 transition-all flex items-center justify-center gap-2"
                >
                  Book Free Consultation
                </Link>
                <Link 
                  href="/ai-cost-estimator" 
                  className="bg-violet-600/20 border border-violet-500/40 text-violet-200 text-center font-semibold px-8 py-4 rounded-full hover:bg-violet-600/30 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-950/40"
                >
                  <Cpu className="w-4 h-4 text-violet-400" />
                  AI Cost Estimator
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-6 flex flex-wrap items-center gap-6 border-t border-slate-700">
                <div className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-semibold text-slate-300 ml-1">5.0 App Rating</span>
                </div>
                <div className="text-xs text-slate-400">
                  Parent: <span className="font-semibold text-white">Gemora Global</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Right Code Illustration Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="w-full max-w-lg bg-[#0B192C] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4 font-mono text-xs text-slate-400 relative">
                {/* Header bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-905">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="text-[10px] text-slate-500">gemora-tech-stack.ts</span>
                </div>
                
                {/* Code body */}
                <div className="space-y-2 select-none">
                  <p><span className="text-blue-400">const</span> companyInfo = &#123;</p>
                  <p className="pl-4">name: <span className="text-green-400">"Gemora Tech"</span>,</p>
                  <p className="pl-4">formerEntity: <span className="text-green-400">"Dexterous Softech"</span>,</p>
                  <p className="pl-4">parent: <span className="text-green-400">"Gemora Global Pvt Ltd"</span>,</p>
                  <p className="pl-4">capabilities: [<span className="text-yellow-400">"SaaS"</span>, <span className="text-yellow-400">"Next.js"</span>, <span className="text-yellow-400">"AI"</span>, <span className="text-yellow-400">"PostgreSQL"</span>]</p>
                  <p>&#125;;</p>
                  <p></p>
                  <p><span className="text-blue-400">async function</span> <span className="text-cyan font-semibold">deployProject</span>(spec) &#123;</p>
                  <p className="pl-4 text-slate-505">// Bootstrapping secure VPC tunnels...</p>
                  <p className="pl-4"><span className="text-blue-400">const</span> app = <span className="text-blue-400">await</span> NextJS.create(&#123; tailwind: <span className="text-orange-400">true</span> &#125;);</p>
                  <p className="pl-4"><span className="text-blue-400">const</span> connection = <span className="text-blue-400">await</span> PostgreSQL.connect(DATABASE_URL);</p>
                  <p className="pl-4"><span className="text-blue-400">return</span> app.launch(&#123; targetMarket: <span className="text-green-400">"Global"</span> &#125;);</p>
                  <p>&#125;</p>
                </div>

                {/* Floating Widget overlay */}
                <div className="absolute -bottom-6 -left-6 bg-[#132238] border border-slate-800 rounded-xl p-4 shadow-xl flex items-center gap-3 backdrop-blur-md max-w-[200px]">
                  <div className="p-2 bg-blue-900/40 rounded-lg text-blue-450">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none font-sans">Database</p>
                    <p className="text-xs font-bold text-white font-sans mt-1">PostgreSQL Mode</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 1.5. TRUST BADGES SECTION */}
      <TrustBadges />

      {/* 2. TRUST / STATS SECTION */}
      <section className="bg-slate-bg border-y border-slate-205 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-electric">{stat.value}</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-20 bg-slate-bg bg-grid-pattern relative z-10 text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs font-bold text-electric uppercase tracking-widest">Core Capabilities</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Enterprise Software Outsourcing Services
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
              From engineering scalable cloud infrastructures and MVP SaaS products to crafting bespoke healthcare and blockchain game development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((serv, index) => {
              const Icon = serv.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-panel p-6 rounded-2xl border border-slate-200 hover:border-electric/50 hover:shadow-lg transition-all duration-300 group relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl w-fit group-hover:bg-electric/15 group-hover:text-electric text-slate-600 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-navy group-hover:text-electric transition-colors">
                      {serv.title}
                    </h4>
                    <p className="text-slate-650 text-sm leading-relaxed">
                      {serv.desc}
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link 
                      href={`/${serv.slug}`}
                      className="text-xs font-bold text-electric hover:text-navy flex items-center gap-1 group/link"
                    >
                      Read Services Details
                      <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. TECHNOLOGY STACK SECTION */}
      <section className="py-20 bg-white text-slate-900 relative border-y border-slate-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-xs font-bold text-electric uppercase tracking-widest">Our Technology Expertise</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Bespoke Enterprise Stacks
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto text-sm">
              We leverage modern frameworks and robust database engines to build clean, maintainable systems.
            </p>
          </div>

          {/* Tabs header */}
          <div className="flex justify-center border-b border-slate-200 mb-12 overflow-x-auto">
            <div className="flex space-x-6 pb-px">
              {(['frontend', 'backend', 'mobile', 'cloud'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTechTab(tab)}
                  className={`py-3 px-4 text-sm font-semibold capitalize border-b-2 transition-all shrink-0 ${activeTechTab === tab ? 'border-electric text-electric font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs Body */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies[activeTechTab].map((tech, index) => (
              <div 
                key={index}
                className="bg-slate-50 border border-slate-200 p-5 rounded-xl hover:border-electric/50 transition-all flex flex-col justify-between hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-base font-bold text-navy">{tech.name}</p>
                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200">
                      {tech.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{tech.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-250/60">
                  <Link 
                    href={`/hire-${tech.name.toLowerCase().replace(/\.js/g, 'js').replace(/\s+/g, '-')}-developers`}
                    className="text-[11px] font-bold text-electric hover:text-navy flex items-center gap-1.5"
                  >
                    Hire {tech.name} Squad
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. INDUSTRIES SECTION */}
      <section className="py-20 bg-slate-bg bg-grid-pattern relative z-10 text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs font-bold text-electric uppercase tracking-widest">Sectors Served</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Tailored Domain Industry Architectures
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto text-sm">
              We translate specific industry compliance and user flows into clean functional databases and APIs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind, index) => {
              const Icon = ind.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="glass-panel p-5 rounded-2xl border border-slate-200 hover:border-electric/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg w-fit text-slate-605 group-hover:bg-electric/15 group-hover:text-electric transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-navy group-hover:text-electric transition-colors">{ind.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4">
                    <Link 
                      href={`/${ind.title.toLowerCase().split(' ')[0]}-software-development`}
                      className="text-[11px] font-bold text-electric hover:text-navy flex items-center gap-1"
                    >
                      Explore Industry Solutions
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. DEVELOPMENT PROCESS ROADMAP */}
      <section className="py-20 bg-slate-bg bg-grid-pattern relative z-10 text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs font-bold text-electric uppercase tracking-widest">How We Work</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Structured Software Development Lifecycle (SDLC)
            </h3>
            <p className="text-slate-600 max-w-xl mx-auto text-sm">
              Our 7-step process mitigates scope creep, guarantees clear deliverables, and ensures zero-downtime launches.
            </p>
          </div>

          <div className="relative pl-8 border-l border-slate-200 space-y-8 max-w-3xl mx-auto">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative group"
              >
                {/* Bullet */}
                <div className="absolute -left-12 top-0 bg-white border-2 border-slate-200 group-hover:border-electric text-slate-500 group-hover:text-electric shadow-sm rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold transition-colors">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-base font-bold text-navy group-hover:text-electric transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. PORTFOLIO & CASE STUDIES SHOWCASE */}
      {portfolios.length > 0 && (
        <section className="py-20 bg-slate-bg border-y border-slate-200 relative z-10 text-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-electric uppercase tracking-widest">Our Work</h2>
                <h3 className="text-3xl font-extrabold text-navy">Featured Project Portfolio</h3>
              </div>
              <Link 
                href="/portfolio" 
                className="bg-electric text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-electric/90 transition-colors shadow-sm hover:shadow-md flex items-center gap-1 group"
              >
                View Full Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolios.map((port) => (
                <motion.div 
                  key={port.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass-panel rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-electric/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <Link href={`/portfolio/${port.slug}`} className="block h-full">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-electric uppercase tracking-wider bg-electric/10 border border-electric/20 px-2.5 py-1 rounded-full">
                        {port.industry}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{port.clientCountry} Client</span>
                    </div>
                    <h4 className="text-xl font-bold text-navy">{port.name}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">{port.description}</p>
                    
                    <div className="space-y-2 pt-2">
                      <p className="text-[11px] font-bold text-navy">Technologies Used:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {port.technology.map((t) => (
                          <span key={t} className="text-[10px] bg-slate-50 text-slate-600 px-2.5 py-0.5 rounded-md font-semibold border border-slate-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50/50 p-4 border-t border-slate-100 flex justify-between items-center group-hover:bg-electric/5 transition-colors">
                    <span className="text-xs font-bold text-electric flex items-center gap-1">
                      Read Case Study Details
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* 8. TESTIMONIALS BOARD */}
      <section className="py-20 bg-slate-bg bg-grid-pattern relative z-10 text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs font-bold text-electric uppercase tracking-widest">Testimonials</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-navy">
              Trusted by International Innovators
            </h3>
            <p className="text-slate-655 max-w-xl mx-auto text-sm">
              Read how we assist USA, Canada, and UAE scaleups in launching complex database systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel border border-slate-200 p-6 rounded-2xl relative space-y-4 hover:border-electric/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex text-yellow-500 gap-0.5">
                  {Array.from({ length: test.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs leading-relaxed italic">
                  "{test.quote}"
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-navy">{test.author}</p>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[8px] font-bold px-1.5 py-0.5 rounded border border-emerald-150" title="Verified Client Project">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                      Verified Project
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{test.role}, {test.company}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION BOARD */}
      <section className="py-20 bg-slate-bg border-t border-slate-200 relative z-10 text-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold text-electric uppercase tracking-widest">FAQ</h2>
            <h3 className="text-3xl font-extrabold text-navy">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setFaqOpenIndex(faqOpenIndex === index ? null : index)}
                  className="flex items-center justify-between w-full p-4 text-left font-bold text-sm text-navy hover:text-electric transition-colors"
                >
                  {faq.question}
                  {faqOpenIndex === index ? <Minus className="w-4 h-4 shrink-0 text-electric" /> : <Plus className="w-4 h-4 shrink-0" />}
                </button>

                <AnimatePresence initial={false}>
                  {faqOpenIndex === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 border-t border-slate-150 text-xs text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8.5. PRICING MODELS SECTION */}
      <section className="py-20 bg-white text-slate-800 relative z-10 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold text-electric uppercase tracking-widest bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
              Pricing Options
            </span>
            <h2 className="text-3xl font-extrabold text-navy">Transparent B2B Pricing Models</h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Choose the engagement model that best aligns with your budget parameters, delivery sprints, and technical scoping requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Model 1 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-navy">Time & Materials</h4>
                  <p className="text-[11px] text-slate-500">Ideal for scaling startups and dynamic project specifications.</p>
                </div>
                <div className="text-2xl font-extrabold text-electric">$25 – $45 <span className="text-xs text-slate-400 font-medium">/ Hour</span></div>
                <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200/60 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>Flexible backlog sprints</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>Weekly developer sync loops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>Pay-as-you-go hourly invoice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>Direct Jira & Slack boards</span>
                  </li>
                </ul>
              </div>
              <Link href="/contact" className="block text-center bg-navy hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all mt-4">
                Choose Model
              </Link>
            </div>

            {/* Model 2 */}
            <div className="bg-slate-50 border border-electric rounded-2xl p-6 space-y-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative shadow-sm">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-electric text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-navy">Fixed Price Sprints</h4>
                  <p className="text-[11px] text-slate-500">Perfect for locked scope specs and product launches.</p>
                </div>
                <div className="text-2xl font-extrabold text-electric">Scope Based <span className="text-xs text-slate-400 font-medium">/ Milestone</span></div>
                <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200/60 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>Guaranteed SLA delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>Milestone-based release checks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>30-Day post-launch warranty</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>Full dedicated QA round</span>
                  </li>
                </ul>
              </div>
              <Link href="/contact" className="block text-center bg-electric hover:bg-[#e04f00] text-white text-xs font-bold py-2.5 rounded-xl transition-all mt-4">
                Get Scope Estimate
              </Link>
            </div>

            {/* Model 3 */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-navy">Dedicated Squads</h4>
                  <p className="text-[11px] text-slate-500">For ongoing product engineering and code expansions.</p>
                </div>
                <div className="text-2xl font-extrabold text-electric">$3.2k – $5.5k <span className="text-xs text-slate-400 font-medium">/ Month</span></div>
                <ul className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200/60 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>40 Hours/week per engineer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>Daily commits to private Github</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>100% IP & source code ownership</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-electric shrink-0" />
                    <span>Direct Tech Lead syncs daily</span>
                  </li>
                </ul>
              </div>
              <Link href="/contact" className="block text-center bg-navy hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition-all mt-4">
                Hire Squad
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 8.6. FEATURED BLOGS SECTION */}
      <section className="py-20 bg-slate-bg text-slate-800 relative z-10 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <span className="text-xs font-bold text-electric uppercase tracking-widest bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
                Knowledge Center
              </span>
              <h2 className="text-3xl font-extrabold text-navy">Latest Insights & Industry Guides</h2>
              <p className="text-xs text-slate-500 max-w-md">
                Read the latest articles on software scalability, prompt engineering workflows, and system optimization.
              </p>
            </div>
            <Link 
              href="/blog" 
              className="text-xs font-bold text-electric hover:text-navy transition-colors flex items-center gap-1 shrink-0"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.length > 0 ? (
              blogs.map((b) => (
                <div 
                  key={b.slug}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                      {b.category || 'Technology'}
                    </span>
                    <h4 className="font-bold text-sm text-navy line-clamp-2 hover:text-electric transition-colors">
                      <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {b.metaDescription || 'Read this dynamic technical guide from our leading solutions architect.'}
                    </p>
                  </div>
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                    <Link href={`/blog/${b.slug}`} className="font-bold text-electric flex items-center gap-0.5 hover:underline">
                      Read Guide <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              /* Fallback static placeholders */
              [
                { title: 'Scaling Next.js 15 Applications for Global Enterprise Workloads', slug: 'scaling-nextjs-applications', cat: 'Software Development', date: 'Jul 12, 2026' },
                { title: 'Choosing the Right Game Engine: Unity 3D vs Unreal Engine 5', slug: 'choosing-right-game-engine', cat: 'Game Development', date: 'Jul 08, 2026' },
                { title: 'LLM Fine-Tuning & Vector DB Retrials in Production Systems', slug: 'llm-finetuning-pipelines', cat: 'AI & Data', date: 'Jul 02, 2026' }
              ].map((fallback, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="p-5 space-y-3">
                    <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                      {fallback.cat}
                    </span>
                    <h4 className="font-bold text-sm text-navy line-clamp-2 hover:text-electric transition-colors">
                      <Link href="/blog">{fallback.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      Discover standard practices to secure APIs, partition multi-tenant relational schemas, and scale developer pipelines.
                    </p>
                  </div>
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{fallback.date}</span>
                    <Link href="/blog" className="font-bold text-electric flex items-center gap-0.5 hover:underline">
                      Read Guide <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
      <section className="bg-slate-950 text-white py-20 relative overflow-hidden z-10">
        {/* Layered background to avoid CSS conflicts */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0B192C] to-slate-900 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 z-0"></div>
        {/* Animated Cyber Glows */}
        <div className="cyber-glow -bottom-24 -left-20 z-0"></div>
        <div className="cyber-glow-blue -top-20 -right-20 z-0"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to Build Your Digital Product?
          </h2>
          <p className="text-slate-350 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Get a free consult, full estimation, and architectural mapping for your software project within 48 hours. Let's build something great together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link 
              href="/contact" 
              className="bg-electric hover:bg-[#e04f00] text-white font-bold px-8 py-4 rounded-full transition-colors shadow-lg flex items-center justify-center gap-2 group"
            >
              Get Free Project Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="https://wa.me/919928714867"
              target="_blank"
              className="bg-white/10 border border-white/20 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              Chat on WhatsApp
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// Inline Mock Icon Components for clean build without external assets
function SmartphoneIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12" y1="18" y2="18"/></svg>
  );
}

function HeartIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  );
}

function CreditCardIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
  );
}

function ShoppingBagIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  );
}

function HomeIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  );
}

function BookOpenIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  );
}

function TruckIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="7" height="11" x="14" y="3" rx="1"/><rect width="7" height="11" x="3" y="3" rx="1"/><path d="M3 14h18v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="16.5" cy="18.5" r="2.5"/></svg>
  );
}

function CompassIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  );
}

function FactoryIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 20h20"/><path d="m20 18-4-8h-3l-2 8H8l-2-6H3v6"/></svg>
  );
}
