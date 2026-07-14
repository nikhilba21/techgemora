"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2, 
  Smartphone, Monitor, Cpu, Database, ShieldCheck, Calendar, ArrowRight 
} from 'lucide-react';

interface CalculatorFeature {
  id: string;
  label: string;
  cost: number;
  icon: any;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    projectType: 'Web Development',
    budget: '$10k - $25k',
    timeline: '1-3 Months',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'calculator'>('form');

  // Calculator State
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['web']);
  const [projectScale, setProjectScale] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'rush'>('standard');

  const featuresList: CalculatorFeature[] = [
    { id: 'web', label: 'Web Application / Portal', cost: 8000, icon: Monitor },
    { id: 'mobile', label: 'Mobile App (iOS/Android)', cost: 12000, icon: Smartphone },
    { id: 'cms', label: 'Admin CMS Dashboard', cost: 4000, icon: Cpu },
    { id: 'ai', label: 'AI/LLM Chat Agent Integration', cost: 6000, icon: Cpu },
    { id: 'db', label: 'Relational Database / Postgres', cost: 3000, icon: Database },
    { id: 'security', label: 'Enterprise Security Compliance', cost: 5000, icon: ShieldCheck }
  ];

  // Dynamic cost calculation logic
  const calculateTotalCost = () => {
    let baseCost = selectedFeatures.reduce((acc, fId) => {
      const feature = featuresList.find(f => f.id === fId);
      return acc + (feature ? feature.cost : 0);
    }, 0);

    // Apply scale multiplier
    if (projectScale === 'mvp') baseCost *= 0.8;
    if (projectScale === 'enterprise') baseCost *= 1.5;

    // Apply rush multiplier
    if (timelineSpeed === 'rush') baseCost *= 1.25;

    const min = Math.round(baseCost * 0.9);
    const max = Math.round(baseCost * 1.15);

    return {
      min: min.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      max: max.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
      weeks: projectScale === 'mvp' ? '6-8 Weeks' : projectScale === 'growth' ? '12-16 Weeks' : '24+ Weeks'
    };
  };

  const costEstimate = calculateTotalCost();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If submitted via calculator, compile details into message
    let finalMessage = formData.message;
    if (activeTab === 'calculator') {
      const selectedLabels = selectedFeatures.map(id => featuresList.find(f => f.id === id)?.label).join(', ');
      finalMessage = `[SYSTEM CALC SUBMISSION]\nFeatures: ${selectedLabels}\nScale: ${projectScale}\nTimeline Speed: ${timelineSpeed}\nEst. Budget: ${costEstimate.min} - ${costEstimate.max}\nDuration: ${costEstimate.weeks}\n\nUser Message: ${formData.message}`;
    }

    const payload = {
      ...formData,
      message: finalMessage,
      // If submitting from calculator, auto-populate the calculated budget
      budget: activeTab === 'calculator' ? `${costEstimate.min} - ${costEstimate.max}` : formData.budget,
      timeline: activeTab === 'calculator' ? costEstimate.weeks : formData.timeline
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        alert("Failed to submit inquiry. Please try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Error sending project quote. Check database parameters.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      country: '',
      projectType: 'Web Development',
      budget: '$10k - $25k',
      timeline: '1-3 Months',
      message: ''
    });
    setSubmitSuccess(false);
  };

  return (
    <div className="w-full min-h-screen bg-slate-bg py-16 bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Header Text */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
            Start Your Digital Project
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Have a project in mind? Use our interactive calculator to estimate costs dynamically, or fill out the standard consultation form below.
          </p>
        </div>

        {/* Navigation Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-200/60 p-1.5 rounded-full flex space-x-1 border border-slate-300/40">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === 'form' ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:text-navy'}`}
            >
              Consultation Form
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'calculator' ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:text-navy'}`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Budget Calculator
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Contact Details & Trust sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-navy text-white p-6 rounded-2xl shadow-sm space-y-6 relative overflow-hidden bg-grid-pattern-dark">
              <h3 className="text-lg font-bold">Contact Details</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly with our solutions architecture team to review requirements, draft milestones, and structure quotes.
              </p>
              
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Email Us</p>
                    <p className="text-[11px] text-slate-400">sales@dexteroussoftech.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Call Global Sales</p>
                    <p className="text-[11px] text-slate-400">+91 141 999999 (Jaipur Hub)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Regional Office</p>
                    <p className="text-[11px] text-slate-400">Jaipur, Rajasthan, India</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <a 
                  href="https://wa.me/919999999999" 
                  target="_blank"
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white text-center font-bold py-2.5 rounded-xl text-xs block transition-all shadow-sm"
                >
                  Direct WhatsApp Chat
                </a>
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-4">
              <h4 className="font-bold text-navy text-sm">Gemora Tech Guarantees:</h4>
              <ul className="space-y-2.5 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric shrink-0" />
                  <span>Strict NDA signed within 2 hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric shrink-0" />
                  <span>100% intellectual property ownership</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric shrink-0" />
                  <span>Direct Slack pipeline with Tech Lead</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-electric shrink-0" />
                  <span>Daily code pushes to private GitHub repository</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form & Calculator Workspace */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden p-6 md:p-8">
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 bg-blue-50 text-electric rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-navy">Inquiry Received Successfully!</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Thank you for contacting Gemora Tech. A solutions engineer will review your project parameters and respond within 24 business hours.
                    </p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="bg-navy text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-slate-800 transition-colors"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              ) : activeTab === 'form' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-navy border-b border-slate-100 pb-3">Consultation Form</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">Full Name *</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-electric"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">Work Email *</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. john@company.com"
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-electric"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +1 (555) 019-2834"
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-electric"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">Company Name</label>
                        <input 
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="e.g. Acme Corp"
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-electric"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">Country *</label>
                        <input 
                          type="text" 
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="e.g. United States"
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-electric"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">Project Type</label>
                        <select 
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-electric"
                        >
                          <option>Web Development</option>
                          <option>Mobile App Development</option>
                          <option>AI / Machine Learning</option>
                          <option>SaaS Platform</option>
                          <option>Cloud Infrastructure</option>
                          <option>Dedicated Team Hiring</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">Target Budget</label>
                        <select 
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-electric"
                        >
                          <option>$5k - $10k</option>
                          <option>$10k - $25k</option>
                          <option>$25k - $50k</option>
                          <option>$50k - $100k</option>
                          <option>$100k+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">Project Description *</label>
                      <textarea 
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your project, technical stack requirements, or developers needed..."
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-electric resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-electric hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Sending..." : "Submit Inquiry"}
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="calculator"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-navy border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-electric" />
                    Interactive Budget Calculator
                  </h3>

                  {/* Feature selection grid */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600">Select Platform Features Needed:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {featuresList.map(feat => {
                        const Icon = feat.icon;
                        const isSelected = selectedFeatures.includes(feat.id);
                        return (
                          <button
                            type="button"
                            key={feat.id}
                            onClick={() => toggleFeature(feat.id)}
                            className={`p-3 rounded-xl border flex items-center gap-3 text-left transition-all ${isSelected ? 'border-electric bg-blue-50/40 text-navy' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}
                          >
                            <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-100 text-electric' : 'bg-slate-100 text-slate-500'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold">{feat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project scale & timeline speed */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 font-sans">Project Complexity Scale:</label>
                      <div className="flex gap-2">
                        {(['mvp', 'growth', 'enterprise'] as const).map(scale => (
                          <button
                            type="button"
                            key={scale}
                            onClick={() => setProjectScale(scale)}
                            className={`flex-1 py-2 text-center text-[10px] font-bold uppercase rounded-lg border transition-all ${projectScale === scale ? 'border-navy bg-navy text-white' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                          >
                            {scale}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600">Delivery Timeline Preference:</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setTimelineSpeed('standard')}
                          className={`flex-1 py-2 text-center text-[10px] font-bold uppercase rounded-lg border transition-all ${timelineSpeed === 'standard' ? 'border-navy bg-navy text-white' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                        >
                          Standard
                        </button>
                        <button
                          type="button"
                          onClick={() => setTimelineSpeed('rush')}
                          className={`flex-1 py-2 text-center text-[10px] font-bold uppercase rounded-lg border transition-all ${timelineSpeed === 'rush' ? 'border-navy bg-navy text-white' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                        >
                          Rush (+25% Cost)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Live Cost Output Widget */}
                  <div className="bg-slate-900 text-white p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Estimated Cost Range</p>
                      <p className="text-2xl sm:text-3xl font-extrabold text-cyan mt-1">
                        {costEstimate.min} - {costEstimate.max}
                      </p>
                    </div>
                    <div className="sm:border-l sm:border-slate-800 sm:pl-4">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Estimated Timeline</p>
                      <p className="text-base font-bold text-white mt-1">
                        {costEstimate.weeks}
                      </p>
                    </div>
                  </div>

                  {/* Calculator submission details */}
                  <form onSubmit={handleFormSubmit} className="space-y-4 pt-3 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-navy">Submit Details for Formal Proposal:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name *"
                        className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric w-full"
                      />
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Work Email *"
                        className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric w-full"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input 
                        type="text" 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Company"
                        className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric w-full"
                      />
                      <input 
                        type="text" 
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Country *"
                        className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric w-full"
                      />
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        className="bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric w-full"
                      />
                    </div>
                    <textarea 
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Add brief details about integrations or design references..."
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric resize-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-electric hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Calculator Quote"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
