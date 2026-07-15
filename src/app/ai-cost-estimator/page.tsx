"use client";

import React, { useState } from 'react';
import { 
  Cpu, Globe, Smartphone, Play, Code, CheckSquare, Square, 
  ArrowRight, ShieldCheck, FileText, Send, Sparkles, MessageSquare, 
  Clock, DollarSign, ListTodo, RefreshCw
} from 'lucide-react';
import Link from 'next/link';

// Project category types
type Category = 'mobile' | 'web' | 'saas' | 'game' | 'ai';

interface Feature {
  id: string;
  name: string;
  desc: string;
  baseHours: number;
}

export default function AICostEstimatorPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [category, setCategory] = useState<Category>('web');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [designFidelity, setDesignFidelity] = useState<'standard' | 'premium' | 'high-end'>('premium');
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'expedited'>('standard');
  
  // Lead info
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '', phone: '', company: '' });
  const [proposalGenerated, setProposalGenerated] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Chat Assistant Mock State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: "Hello! I'm your Gemora AI Assistant. I can help analyze your requirements or answer questions about your estimate." }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Feature checklists by category
  const featuresList: Record<Category, Feature[]> = {
    web: [
      { id: 'auth', name: 'User Authentication & Roles', desc: 'Secure SSO, email login, and permissions', baseHours: 40 },
      { id: 'pay', name: 'Stripe Payment Gateway', desc: 'Checkout, refunds, and dynamic invoices', baseHours: 35 },
      { id: 'cms', name: 'CMS Content Manager', desc: 'Blog publishing and content panels', baseHours: 45 },
      { id: 'search', name: 'Elastic Search & Filters', desc: 'Instant autocomplete and faceted grids', baseHours: 30 },
      { id: 'admin', name: 'Admin Operations Panel', desc: 'User logs, graphs, metrics, and CSV exports', baseHours: 50 },
      { id: 'api', name: 'Custom Third-Party API Sync', desc: 'Webhook hooks to CRMs/ERPs', baseHours: 40 }
    ],
    mobile: [
      { id: 'gps', name: 'Geolocation & Maps API', desc: 'Live route tracking and maps overlay', baseHours: 50 },
      { id: 'offline', name: 'Offline Sync Database', desc: 'Realm/SQLite local cache and sync loops', baseHours: 60 },
      { id: 'push', name: 'Push Notifications & Alerts', desc: 'Rich media APNS and Firebase alerts', baseHours: 30 },
      { id: 'biometric', name: 'Biometric Access Security', desc: 'FaceID, TouchID and encryption keys', baseHours: 20 },
      { id: 'social', name: 'Social Profile OAuth Integration', desc: 'Google, Apple, and Facebook SSO', baseHours: 25 },
      { id: 'camera', name: 'Device Hardware (Camera/Scanner)', desc: 'Document uploading, image crop and barcode scan', baseHours: 35 }
    ],
    saas: [
      { id: 'tenant', name: 'Multi-Tenant DB Architecture', desc: 'Logical partition schemas for isolated workspaces', baseHours: 80 },
      { id: 'billing', name: 'Subscription Engine (Stripe Billing)', desc: 'Recurring tiers, upgrades, downgrades, and metrics', baseHours: 50 },
      { id: 'audit', name: 'Activity Audit Log Trace', desc: 'IP logging, permission updates, and export audits', baseHours: 35 },
      { id: 'invite', name: 'Team Invites & Roles Manager', desc: 'Invite loops, seat counts, and security roles', baseHours: 30 },
      { id: 'export', name: 'PDF/Excel Report Engines', desc: 'Daily stats, scheduled jobs, and emails', baseHours: 40 },
      { id: 'chat', name: 'Internal Sockets Team Chat', desc: 'Real-time collaborative channels', baseHours: 55 }
    ],
    game: [
      { id: 'multi', name: 'Multiplayer Lobby & Socket Room', desc: 'WebSockets matching and game loops', baseHours: 90 },
      { id: 'economy', name: 'Economy & Virtual Inventory', desc: 'Store, purchase virtual items, and ledger logs', baseHours: 45 },
      { id: 'cheat', name: 'Anti-Cheat Server Validation', desc: 'Double-validation loop, anti-injection shield', baseHours: 60 },
      { id: 'leader', name: 'Lobbies & Daily Leaderboards', desc: 'Global rankings, achievements, and prizes', baseHours: 30 },
      { id: 'ads', name: 'Ad SDK Integrations & Purchases', desc: 'AdMob, Unity Ads, and virtual assets', baseHours: 25 },
      { id: 'graphics', name: 'Complex 3D Graphics Rigging', desc: 'ThreeJS/Phaser engine visual pipeline assets', baseHours: 70 }
    ],
    ai: [
      { id: 'finetune', name: 'LLM Fine-Tuning Integration', desc: 'Pre-trained models prunes and weights configurations', baseHours: 80 },
      { id: 'vector', name: 'Vector DB Cognitive Search', desc: 'Pinecone/pgvector retrieval loops', baseHours: 50 },
      { id: 'ocr', name: 'Document Analysis OCR Parser', desc: 'Extract invoice metadata and structural schemas', baseHours: 65 },
      { id: 'chatbot', name: 'Custom NLP Chatbot Dialogues', desc: 'Conversation flows, intent detection, and APIs', baseHours: 55 },
      { id: 'pipeline', name: 'Automated ML Retraining Pipeline', desc: 'Hourly pipeline to update parameters', baseHours: 75 },
      { id: 'dashboard', name: 'Analytics Forecasting Board', desc: 'Regressive data models, graph chart widgets', baseHours: 45 }
    ]
  };

  // Helper toggle
  const toggleFeature = (fid: string) => {
    if (selectedFeatures.includes(fid)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== fid));
    } else {
      setSelectedFeatures([...selectedFeatures, fid]);
    }
  };

  // Calculate pricing & estimation logic
  const calculateEstimate = () => {
    const categoryBaseHours = {
      web: 120,
      mobile: 150,
      saas: 180,
      game: 200,
      ai: 220
    };

    const selectedFeaturesList = featuresList[category].filter(f => selectedFeatures.includes(f.id));
    const featuresHours = selectedFeaturesList.reduce((sum, f) => sum + f.baseHours, 0);
    let totalHours = categoryBaseHours[category] + featuresHours;

    // Design complexity multiplier
    const designMultipliers = { standard: 1, premium: 1.25, 'high-end': 1.45 };
    totalHours = Math.round(totalHours * designMultipliers[designFidelity]);

    // Timeline speed compression factor (expedited costs 30% more for overtime resources)
    let ratePerHour = 35; // Global standard developer rate
    if (timelineSpeed === 'expedited') {
      ratePerHour = 45;
    }

    const totalCost = totalHours * ratePerHour;
    const minCost = Math.round(totalCost * 0.9);
    const maxCost = Math.round(totalCost * 1.15);

    // Weeks calculation (assuming standard 40 hrs/week per developer, standard utilizes 2 devs, expedited 4 devs)
    const activeDevelopers = timelineSpeed === 'expedited' ? 4 : 2;
    const baseWeeks = Math.ceil(totalHours / (activeDevelopers * 40));
    
    return {
      hours: totalHours,
      minCost,
      maxCost,
      weeks: Math.max(baseWeeks, 3),
      developers: activeDevelopers
    };
  };

  const estimate = calculateEstimate();

  // AI Chat Assistant responses logic
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    const newMessages: Array<{ sender: 'user' | 'ai'; text: string }> = [
      ...chatMessages,
      { sender: 'user', text: userText }
    ];
    setChatMessages(newMessages);
    setChatInput('');

    // Dynamic AI response based on keywords
    setTimeout(() => {
      let aiResponse = "I can see your project has selected " + selectedFeatures.length + " custom features. What would you like to know about our technology frameworks or delivery sprints?";
      
      const lower = userText.toLowerCase();
      if (lower.includes('cost') || lower.includes('price') || lower.includes('budget')) {
        aiResponse = `Based on your selections, the current estimated development cost is $${estimate.minCost.toLocaleString()} - $${estimate.maxCost.toLocaleString()}. This represents a dedicated ${estimate.developers}-developer team working for ${estimate.weeks} weeks.`;
      } else if (lower.includes('timeline') || lower.includes('time') || lower.includes('week') || lower.includes('fast') || lower.includes('speed')) {
        aiResponse = `Your project will take approximately ${estimate.weeks} weeks to design, develop, and test. By selecting the 'Expedited' timeline speed, we onboard a larger squad (4 developers) to deliver the project 40% faster.`;
      } else if (lower.includes('tech') || lower.includes('database') || lower.includes('framework')) {
        const techStackMap = {
          web: "Next.js 15, React.js, Tailwind CSS, PostgreSQL, and Node.js backend.",
          mobile: "Flutter/Dart for cross-platform iOS and Android, or native Swift and Kotlin.",
          saas: "Next.js, Prisma ORM, Stripe Billing engine, and AWS RDS database nodes.",
          game: "Unity 3D for desktop/consoles, Phaser or Three.js for responsive web gaming platforms.",
          ai: "Python, PyTorch, pgvector database, Hugging Face transformers, and Docker containers."
        };
        aiResponse = `For your ${category.toUpperCase()} project, we recommend utilizing the following enterprise tech stack: ${techStackMap[category]}`;
      } else if (lower.includes('nda') || lower.includes('security') || lower.includes('ip')) {
        aiResponse = "Yes! Gemora Tech signs legally binding Non-Disclosure Agreements (NDAs) before design maps start. You maintain 100% intellectual property (IP) and source code ownership.";
      }

      const finalMessages: Array<{ sender: 'user' | 'ai'; text: string }> = [
        ...newMessages,
        { sender: 'ai', text: aiResponse }
      ];
      setChatMessages(finalMessages);
    }, 800);
  };

  // Lead Submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingLead(true);
    
    // Simulate submission to lead collection api
    setTimeout(() => {
      setSubmittingLead(false);
      setSubmitSuccess(true);
      setProposalGenerated(true);
    }, 1500);
  };

  // Category labels map
  const categoryLabels = {
    web: 'Web Application Development',
    mobile: 'Mobile App Development',
    saas: 'SaaS Product Engineering',
    game: 'Interactive Game Development',
    ai: 'AI & Machine Learning Solutions'
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Header Space */}
      <section className="bg-slate-950 text-white pt-24 pb-16 relative border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0B192C] to-slate-900 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-35 z-0"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1 bg-blue-950/85 border border-blue-800 text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            AI Project Estimation Engine
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Calculate Your Development Cost & Timeline
          </h1>
          <p className="text-slate-350 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Select your service type, customize required features, and get an instant AI-modeled cost breakdown, suggested stack, and downloadable proposal.
          </p>
        </div>
      </section>

      {/* Main interactive cards container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Columns: Multi-step interactive flow */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-100/50 p-6 md:p-8">
            
            {/* Step navigation dots bar */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Questionnaire Sprints (Step {step} of 4)
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(s => (
                  <span 
                    key={s} 
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${step >= s ? 'bg-blue-600' : 'bg-slate-200'}`}
                  ></span>
                ))}
              </div>
            </div>

            {/* STEP 1: CHOOSE CATEGORY */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Choose Your Project Category</h3>
                  <p className="text-xs text-slate-500 mt-1">Select the primary service block for your digital product.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(Object.keys(featuresList) as Category[]).map(cat => {
                    const iconsMap = {
                      web: Globe,
                      mobile: Smartphone,
                      saas: Code,
                      game: Play,
                      ai: Cpu
                    };
                    const Icon = iconsMap[cat];
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategory(cat);
                          setSelectedFeatures([]);
                          setStep(2);
                        }}
                        className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all group ${category === cat ? 'border-blue-600 bg-blue-50/50 shadow-md' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/50'}`}
                      >
                        <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${category === cat ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{categoryLabels[cat]}</p>
                          <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                            Select to customize with dedicated stack templates.
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE FEATURES */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Select Project Features</h3>
                  <p className="text-xs text-slate-500 mt-1">Check the functional modules required inside your {categoryLabels[category]} system.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuresList[category].map(feat => {
                    const isSelected = selectedFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${isSelected ? 'border-blue-600 bg-blue-50/40' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-600 fill-blue-50" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-800">{feat.name}</p>
                          <p className="text-[10px] text-slate-500 leading-normal">{feat.desc}</p>
                          <p className="text-[9px] font-bold text-blue-600">+{feat.baseHours} Engineering Hours</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Back to Category
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs transition-colors flex items-center gap-1"
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PLATFORM COMPLEXITY & SPEED */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Define Scope & Delivery Speed</h3>
                  <p className="text-xs text-slate-500 mt-1">Select visual specifications and timelines for the agile development team.</p>
                </div>

                <div className="space-y-5">
                  {/* Design Fidelity Selection */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-bold text-slate-800">UI/UX Design Fidelity</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'standard', name: 'Standard templates', desc: 'Clean, clean layout' },
                        { id: 'premium', name: 'Premium Brand UI', desc: 'Custom icons and styles' },
                        { id: 'high-end', name: 'High-End 3D Visuals', desc: 'Complex rigs & animations' }
                      ].map(df => (
                        <button
                          key={df.id}
                          onClick={() => setDesignFidelity(df.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all ${designFidelity === df.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-200 hover:border-slate-350'}`}
                        >
                          <p className="text-xs font-bold text-slate-800">{df.name}</p>
                          <p className="text-[9px] text-slate-500 mt-0.5 leading-normal">{df.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Timeline speed Selection */}
                  <div className="space-y-2.5 pt-2">
                    <p className="text-xs font-bold text-slate-800">Development Speed</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'standard', name: 'Standard Agile Sprints', desc: '2 Dedicated Developers, standard schedule' },
                        { id: 'expedited', name: 'Expedited Launch (Overtime)', desc: '4 Dedicated Developers, accelerated launch' }
                      ].map(ts => (
                        <button
                          key={ts.id}
                          onClick={() => setTimelineSpeed(ts.id as any)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${timelineSpeed === ts.id ? 'border-blue-600 bg-blue-50/30' : 'border-slate-200 hover:border-slate-350'}`}
                        >
                          <p className="text-xs font-bold text-slate-800">{ts.name}</p>
                          <p className="text-[9px] text-slate-500 mt-0.5 leading-normal">{ts.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Back to Features
                  </button>
                  <button 
                    onClick={() => setStep(4)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs transition-colors flex items-center gap-1"
                  >
                    Analyze Requirements
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ANALYSIS, PROPOSAL & LEAD FORM */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">AI Requirement Analysis & B2B Proposal</h3>
                  <p className="text-xs text-slate-500 mt-1">Review the architectural proposal below and submit info to unlock a downloadable proposal document.</p>
                </div>

                {/* AI Requirement analysis card */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-xs text-slate-700 leading-relaxed">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase text-[10px] tracking-wider text-blue-600">
                    <Sparkles className="w-4 h-4" />
                    AI System Architecture Recommendation
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-slate-200/60 py-3 my-2">
                    <div>
                      <p className="font-bold text-slate-800 text-[11px] mb-1">Suggested Tech Stack:</p>
                      <p className="text-[10px] text-slate-500">
                        {category === 'web' && 'Next.js 15, Tailwind, Node.js API, Prisma ORM'}
                        {category === 'mobile' && 'Flutter SDK, Swift/Kotlin native bridge, SQLite local cache'}
                        {category === 'saas' && 'Next.js 15, PostgreSQL database, Redis session logs, Stripe API'}
                        {category === 'game' && 'Unity 3D engine, WebSockets Photon cloud, AWS instances'}
                        {category === 'ai' && 'Python fastAPI, pgvector database, Hugging Face transformers, PyTorch'}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-[11px] mb-1">Suggested Database Model:</p>
                      <p className="text-[10px] text-slate-500">
                        {category === 'ai' || category === 'saas' ? 'PostgreSQL (structured relational schemas) with pgvector indexes' : 'PostgreSQL cluster with Redis memory caching layer'}
                      </p>
                    </div>
                  </div>

                  <p>
                    <strong>Complexity Level:</strong> {selectedFeatures.length > 4 ? 'High Enterprise Scale' : 'Standard Modular MVP'}. We recommend starting with a strict Git-flow delivery pipeline, integrating automated QA test suites before each milestone deployment.
                  </p>
                </div>

                {/* Proposal Submission Form */}
                {!proposalGenerated ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
                    <h4 className="text-xs font-bold text-slate-900">Enter Your Details to Download Proposal:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="Your Name *"
                        required
                        value={leadInfo.name}
                        onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                      <input 
                        type="email" 
                        placeholder="Work Email *"
                        required
                        value={leadInfo.email}
                        onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number *"
                        required
                        value={leadInfo.phone}
                        onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                      <input 
                        type="text" 
                        placeholder="Company Name *"
                        required
                        value={leadInfo.company}
                        onChange={(e) => setLeadInfo({ ...leadInfo, company: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={submittingLead}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {submittingLead ? 'Analyzing requirements...' : 'Generate Project Proposal'}
                      <FileText className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  /* Render full dynamic B2B proposal document summary */
                  <div className="bg-white border border-slate-200 shadow-inner rounded-xl p-5 space-y-4 text-xs text-slate-700 border-l-4 border-l-blue-600 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">B2B Project Proposal & Scope</h4>
                        <p className="text-[9px] text-slate-500 mt-0.5">Reference ID: GEM-LEAD-{Math.floor(Math.random()*90000+10000)}</p>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        Proposal Locked
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p><strong>Client:</strong> {leadInfo.name} ({leadInfo.company})</p>
                      <p><strong>Service Type:</strong> {categoryLabels[category]}</p>
                      <p><strong>Development Sprints:</strong> {estimate.weeks} Weeks (Agile Sprint Slices)</p>
                      <p><strong>Total Estimated Cost:</strong> ${estimate.minCost.toLocaleString()} - ${estimate.maxCost.toLocaleString()} USD</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <p className="font-bold text-slate-900 mb-1">IP & Confidentiality Assurance:</p>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        Gemora Tech commits to signing a strict mutual NDA before technical scoping. Under standard contracts, 100% of repository commits, source code ownership, and patentable logic transfers to {leadInfo.company} upon milestone settlements.
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl text-center space-y-2">
                      <p className="font-semibold text-slate-800">Proposal Sent to nikhil@dexteroussoftech.com</p>
                      <p className="text-[10px] text-slate-500">
                        An account executive has been assigned to your requirement. We will schedule a direct Zoom/Google Meet video call within 1-2 business hours.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-4">
                  <button 
                    onClick={() => {
                      setProposalGenerated(false);
                      setStep(3);
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Back to Timeline Setup
                  </button>
                  <button 
                    onClick={() => {
                      setStep(1);
                      setSelectedFeatures([]);
                      setProposalGenerated(false);
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reset Calculator
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right 1 Column: Estimation Metric Panels & Chat Assistant */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Output pricing card */}
          <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden bg-grid-pattern-dark">
            <h4 className="text-sm font-bold border-b border-slate-800 pb-3 mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-electric" />
              Live Estimation Output
            </h4>

            <div className="space-y-6 relative z-10">
              
              {/* Cost block */}
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Estimated Cost Range</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white">
                    ${estimate.minCost.toLocaleString()}
                  </span>
                  <span className="text-slate-400 text-xs">to</span>
                  <span className="text-2xl font-bold text-electric">
                    ${estimate.maxCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-805 pt-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Timeline</span>
                  </div>
                  <p className="text-sm font-bold text-white">{estimate.weeks} Weeks</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Cpu className="w-3.5 h-3.5 text-cyan" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Dev Squad</span>
                  </div>
                  <p className="text-sm font-bold text-white">{estimate.developers} Engineers</p>
                </div>

                <div className="space-y-1 col-span-2">
                  <div className="flex items-center gap-1 text-slate-400">
                    <ListTodo className="w-3.5 h-3.5 text-cyan" />
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Features Loaded</span>
                  </div>
                  <p className="text-xs font-bold text-white line-clamp-1">
                    {selectedFeatures.length > 0 
                      ? featuresList[category].filter(f => selectedFeatures.includes(f.id)).map(f => f.name).join(', ') 
                      : 'None selected'
                    }
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-805 pt-4 text-[10px] text-slate-450 leading-relaxed space-y-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-electric" />
                  <span>Includes 30-Day Post-Launch Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-electric" />
                  <span>Includes Dedicated QA testing cycles</span>
                </div>
              </div>

            </div>
          </div>

          {/* AI Chat Assistant panel */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-lg p-5 flex flex-col justify-between h-96">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  Gemora AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </h4>
                <p className="text-[9px] text-slate-500 mt-0.5">Online • Scoped to requirements</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto space-y-2.5 pr-1 max-h-56 text-[11px] leading-relaxed">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 rounded-2xl max-w-[85%] ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleChatSubmit} className="flex gap-1.5 border-t border-slate-100 pt-3 mt-3">
              <input 
                type="text" 
                placeholder="Ask about cost/timeline/NDA..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
