"use client";

import React, { useState, useEffect } from 'react';
import { 
  Lock, LayoutDashboard, Users, FileText, Rss, Briefcase, Settings, 
  LogOut, Plus, Trash2, Edit3, Eye, Search, AlertCircle, CheckCircle2, 
  FolderPlus, Save, RefreshCw, X, HelpCircle 
} from 'lucide-react';
import { Lead, SEOPage, Blog, Portfolio } from '@/lib/db';

type TabType = 'overview' | 'leads' | 'pages' | 'blogs' | 'portfolio' | 'settings';

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // CMS State
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Forms State
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  
  // Page Form
  const [editingPage, setEditingPage] = useState<Partial<SEOPage> | null>(null);
  const [pageFaqs, setPageFaqs] = useState<{ question: string; answer: string }[]>([]);
  
  // Blog Form
  const [editingBlog, setEditingBlog] = useState<Partial<Blog> | null>(null);
  const [blogFaqs, setBlogFaqs] = useState<{ question: string; answer: string }[]>([]);
  
  // Portfolio Form
  const [editingPortfolio, setEditingPortfolio] = useState<Partial<Portfolio> | null>(null);
  const [portfolioTech, setPortfolioTech] = useState<string>('');

  // Load Session on Mount
  useEffect(() => {
    const session = localStorage.getItem('tg_admin_session');
    if (session === 'authorized') {
      setIsAuthorized(true);
    }
  }, []);

  // Fetch Data when Authorized or Tab Changes
  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    }
  }, [isAuthorized, activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'overview' || activeTab === 'leads') {
        const res = await fetch('/api/leads');
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      }
      if (activeTab === 'overview' || activeTab === 'pages') {
        const res = await fetch('/api/pages');
        const data = await res.json();
        setPages(Array.isArray(data) ? data : []);
      }
      if (activeTab === 'overview' || activeTab === 'blogs') {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      }
      if (activeTab === 'overview' || activeTab === 'portfolio') {
        const res = await fetch('/api/portfolios');
        const data = await res.json();
        setPortfolios(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching admin records:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Gemora2026!') {
      localStorage.setItem('tg_admin_session', 'authorized');
      setIsAuthorized(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Please enter authorized login credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tg_admin_session');
    setIsAuthorized(false);
  };

  // Auto-slug generator
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // --- CRUD ACTIONS ---

  // Leads
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== id));
        if (viewingLead?.id === id) setViewingLead(null);
      }
    } catch (e) {
      alert("Error deleting lead.");
    }
  };

  // Pages CRUD
  const handleStartAddPage = () => {
    setEditingPage({
      slug: '',
      title: '',
      metaTitle: '',
      metaDescription: '',
      h1: '',
      content: '',
      type: 'service',
      published: true
    });
    setPageFaqs([]);
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    
    const payload = {
      ...editingPage,
      faqs: JSON.stringify(pageFaqs)
    };

    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setEditingPage(null);
        fetchData();
      } else {
        alert("Failed to save SEO page. Check slugs.");
      }
    } catch (err) {
      alert("Error saving page.");
    }
  };

  const handleDeletePage = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete the page: /${slug}?`)) return;
    try {
      const res = await fetch(`/api/pages?slug=${slug}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      alert("Error deleting page.");
    }
  };

  // Blogs CRUD
  const handleStartAddBlog = () => {
    setEditingBlog({
      slug: '',
      title: '',
      metaDescription: '',
      content: '',
      category: 'Software Development',
      author: 'Gemora Tech Team',
      featuredImage: '',
      published: true
    });
    setBlogFaqs([]);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    const payload = {
      ...editingBlog,
      faqs: JSON.stringify(blogFaqs)
    };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setEditingBlog(null);
        fetchData();
      }
    } catch (e) {
      alert("Error saving blog.");
    }
  };

  const handleDeleteBlog = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete this blog post: /blog/${slug}?`)) return;
    try {
      const res = await fetch(`/api/blogs?slug=${slug}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      alert("Error deleting blog.");
    }
  };

  // Portfolio CRUD
  const handleStartAddPortfolio = () => {
    setEditingPortfolio({
      slug: '',
      name: '',
      industry: 'Technology',
      description: '',
      challenge: '',
      solution: '',
      results: '',
      clientCountry: '',
      published: true
    });
    setPortfolioTech('');
  };

  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPortfolio) return;

    const payload = {
      ...editingPortfolio,
      technology: portfolioTech.split(',').map(t => t.trim()).filter(t => t.length > 0)
    };

    try {
      const res = await fetch('/api/portfolios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setEditingPortfolio(null);
        fetchData();
      }
    } catch (e) {
      alert("Error saving portfolio.");
    }
  };

  const handleDeletePortfolio = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete this portfolio: ${slug}?`)) return;
    try {
      const res = await fetch(`/api/portfolios?slug=${slug}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      alert("Error deleting portfolio.");
    }
  };

  // Unauthorized Form rendering
  if (!isAuthorized) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-slate-bg bg-grid-pattern py-12 px-4">
        <div className="w-full max-w-sm bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-electric rounded-full flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-navy">Corporate CMS Login</h2>
            <p className="text-xs text-slate-400">Gemora Tech / Gemora Global Tech Admin Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Username</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-electric"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-electric"
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-50 text-red-500 rounded-lg flex items-center gap-2 text-xs font-medium border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-navy hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors"
            >
              Sign In To Console
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-bg flex flex-col lg:flex-row">
      
      {/* 1. CMS SIDEBAR */}
      <aside className="w-full lg:w-64 bg-navy text-white flex flex-col justify-between shrink-0 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 bg-grid-pattern-dark">
        <div className="space-y-8">
          {/* Logo brand */}
          <div className="flex flex-col mt-2">
            <span className="text-lg font-bold tracking-tight text-white flex items-center">
              TG <span className="text-cyan ml-1">CMS CONSOLE</span>
            </span>
            <span className="text-[8px] text-slate-400 uppercase tracking-widest leading-none mt-0.5">
              Gemora Global Tech Div
            </span>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1">
            <button
              onClick={() => { setActiveTab('overview'); setEditingPage(null); setEditingBlog(null); setEditingPortfolio(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => { setActiveTab('leads'); setEditingPage(null); setEditingBlog(null); setEditingPortfolio(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'leads' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <Users className="w-4 h-4" />
              Leads Manager
              {leads.length > 0 && (
                <span className="bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold ml-auto">
                  {leads.length}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('pages'); setEditingPage(null); setEditingBlog(null); setEditingPortfolio(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'pages' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" />
              SEO Pages CRUD
            </button>
            <button
              onClick={() => { setActiveTab('blogs'); setEditingPage(null); setEditingBlog(null); setEditingPortfolio(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'blogs' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <Rss className="w-4 h-4" />
              B2B Blogs CRUD
            </button>
            <button
              onClick={() => { setActiveTab('portfolio'); setEditingPage(null); setEditingBlog(null); setEditingPortfolio(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'portfolio' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <Briefcase className="w-4 h-4" />
              Portfolio CRUD
            </button>
            <button
              onClick={() => { setActiveTab('settings'); setEditingPage(null); setEditingBlog(null); setEditingPortfolio(null); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <Settings className="w-4 h-4" />
              Console Settings
            </button>
          </nav>
        </div>

        {/* Logout action */}
        <div className="pt-6 border-t border-slate-800 mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-slate-800 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* 2. CMS CONTENT WORKSPACE */}
      <main className="flex-1 p-6 md:p-8 space-y-6 max-w-5xl">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-navy capitalize">{activeTab} Console</h1>
            <p className="text-xs text-slate-500">Manage real-time corporate database entries.</p>
          </div>
          <button 
            onClick={fetchData}
            disabled={isLoading}
            className="p-2 bg-white border border-slate-200/80 rounded-xl text-slate-600 hover:text-navy disabled:bg-slate-50 transition-all"
            aria-label="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* TAB WORKSPACES */}

        {/* T1. OVERVIEW VIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Metrics Block */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Inquiries</p>
                <p className="text-2xl font-extrabold text-navy mt-1">{leads.length}</p>
              </div>
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SEO Pages Served</p>
                <p className="text-2xl font-extrabold text-navy mt-1">{pages.length}</p>
              </div>
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Blog Posts</p>
                <p className="text-2xl font-extrabold text-navy mt-1">{blogs.length}</p>
              </div>
              <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Portfolio Case Studies</p>
                <p className="text-2xl font-extrabold text-navy mt-1">{portfolios.length}</p>
              </div>
            </div>

            {/* Recent Leads Block */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xs font-bold text-navy uppercase tracking-wider">Recent Client Leads</h3>
                <button onClick={() => setActiveTab('leads')} className="text-[10px] font-bold text-electric hover:underline">
                  View Leads Manager
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {leads.slice(0, 5).map(lead => (
                  <div key={lead.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-bold text-navy">{lead.name}</p>
                      <p className="text-[10px] text-slate-400">{lead.company} ({lead.country})</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-electric">{lead.projectType}</p>
                      <p className="text-[9px] text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
                {leads.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-xs">No project leads found in fallback DB.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* T2. LEADS MANAGER */}
        {activeTab === 'leads' && (
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <h3 className="text-xs font-bold text-navy uppercase tracking-wider">Submitted Client Proposals</h3>
            </div>
            
            <div className="divide-y divide-slate-100">
              {leads.map(lead => (
                <div key={lead.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-navy">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.email} | {lead.phone || 'No Phone'}</p>
                    <p className="text-[10px] text-slate-400">Company: {lead.company || 'N/A'} | Country: {lead.country || 'N/A'}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right text-xs">
                      <p className="font-semibold text-navy">{lead.projectType}</p>
                      <p className="text-slate-500">Budget: {lead.budget}</p>
                      <p className="text-[9px] text-slate-400">{new Date(lead.createdAt).toLocaleString()}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setViewingLead(lead)}
                        className="p-1.5 bg-blue-50 text-electric rounded-lg border border-blue-100 hover:bg-blue-100"
                        title="View Message"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-1.5 bg-red-50 text-red-500 rounded-lg border border-red-100 hover:bg-red-100"
                        title="Delete Lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {leads.length === 0 && (
                <div className="p-8 text-center text-slate-400 text-xs">No active inquiries.</div>
              )}
            </div>
          </div>
        )}

        {/* T3. SEO PAGES CRUD */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            
            {/* List and CRUD headers */}
            {!editingPage ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search pages by title or slug..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white border border-slate-200/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric w-full"
                    />
                  </div>
                  <button 
                    onClick={handleStartAddPage}
                    className="bg-electric text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Create SEO Page
                  </button>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
                  {pages
                    .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.slug.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(page => (
                      <div key={page.slug} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="text-xs font-bold text-navy">{page.h1}</p>
                          <p className="text-[10px] text-slate-400">/{page.slug} | Type: <span className="font-semibold">{page.type}</span></p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setEditingPage(page);
                              setPageFaqs(page.faqs || []);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeletePage(page.slug)}
                            className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              // Add/Edit Page Form
              <form onSubmit={handleSavePage} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-navy text-sm">
                    {editingPage.slug ? 'Edit Page Details' : 'Create SEO Landing Page'}
                  </h3>
                  <button 
                    type="button" 
                    onClick={() => setEditingPage(null)} 
                    className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-navy"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">H1 Page Heading</label>
                    <input 
                      type="text" 
                      required
                      value={editingPage.h1 || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingPage(prev => ({
                          ...prev,
                          h1: val,
                          // Auto slug if creating new
                          slug: prev?.slug ? prev.slug : generateSlug(val)
                        }));
                      }}
                      placeholder="e.g. Healthcare Software Development Services"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">URL Slug</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        required
                        value={editingPage.slug || ''}
                        onChange={(e) => setEditingPage(prev => ({ ...prev, slug: generateSlug(e.target.value) }))}
                        placeholder="healthcare-software-development"
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none"
                      />
                      <button 
                        type="button"
                        onClick={() => setEditingPage(prev => ({ ...prev, slug: generateSlug(prev?.h1 || '') }))}
                        className="bg-slate-100 hover:bg-slate-200 px-3 rounded-xl text-xs font-bold text-slate-600 shrink-0"
                      >
                        Auto
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Page Title</label>
                    <input 
                      type="text" 
                      required
                      value={editingPage.title || ''}
                      onChange={(e) => setEditingPage(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g. Healthcare Development"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Meta Title Tag</label>
                    <input 
                      type="text" 
                      required
                      value={editingPage.metaTitle || ''}
                      onChange={(e) => setEditingPage(prev => ({ ...prev, metaTitle: e.target.value }))}
                      placeholder="SEO meta title..."
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Page Type</label>
                    <select 
                      value={editingPage.type || 'service'}
                      onChange={(e) => setEditingPage(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2.5 text-xs text-slate-700"
                    >
                      <option value="service">Service Page</option>
                      <option value="location">Location Page</option>
                      <option value="industry">Industry Page</option>
                      <option value="technology">Technology Page</option>
                      <option value="developer">Developer Page</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Meta Description</label>
                  <textarea 
                    rows={2}
                    value={editingPage.metaDescription || ''}
                    onChange={(e) => setEditingPage(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="Brief keyword-rich summary of the page content..."
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Page HTML/Text Content</label>
                  <textarea 
                    rows={8}
                    required
                    value={editingPage.content || ''}
                    onChange={(e) => setEditingPage(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter long-form keyword-optimized HTML body content..."
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs font-mono text-slate-700"
                  />
                </div>

                {/* FAQs Builder */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-600">Interactive Page FAQs ({pageFaqs.length})</label>
                    <button
                      type="button"
                      onClick={() => setPageFaqs(prev => [...prev, { question: '', answer: '' }])}
                      className="text-[11px] font-bold text-electric flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add FAQ
                    </button>
                  </div>
                  {pageFaqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-2 relative">
                      <button 
                        type="button" 
                        onClick={() => setPageFaqs(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute right-2 top-2 text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <input 
                        type="text" 
                        placeholder="Question"
                        required
                        value={faq.question}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPageFaqs(prev => {
                            const copy = [...prev];
                            copy[idx].question = val;
                            return copy;
                          });
                        }}
                        className="w-11/12 bg-white border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs text-slate-700"
                      />
                      <textarea 
                        placeholder="Answer"
                        required
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPageFaqs(prev => {
                            const copy = [...prev];
                            copy[idx].answer = val;
                            return copy;
                          });
                        }}
                        className="w-full bg-white border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs text-slate-700 resize-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="bg-navy hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" /> Save Page
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPage(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* T4. B2B BLOGS CRUD */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            {!editingBlog ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search blogs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white border border-slate-200/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric w-full"
                    />
                  </div>
                  <button 
                    onClick={handleStartAddBlog}
                    className="bg-electric text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Create Blog Post
                  </button>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
                  {blogs
                    .filter(b => b.title.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(blog => (
                      <div key={blog.slug} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="text-xs font-bold text-navy">{blog.title}</p>
                          <p className="text-[10px] text-slate-400">/blog/{blog.slug} | Category: <span className="font-semibold">{blog.category}</span></p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setEditingBlog(blog);
                              setBlogFaqs(blog.faqs || []);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteBlog(blog.slug)}
                            className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              // Add/Edit Blog Form
              <form onSubmit={handleSaveBlog} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="font-bold text-navy text-sm border-b border-slate-100 pb-3">
                  {editingBlog.slug ? 'Edit Blog Post' : 'Create Blog Post'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Blog Title</label>
                    <input 
                      type="text" 
                      required
                      value={editingBlog.title || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingBlog(prev => ({
                          ...prev,
                          title: val,
                          slug: prev?.slug ? prev.slug : generateSlug(val)
                        }));
                      }}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Blog Slug</label>
                    <input 
                      type="text" 
                      required
                      value={editingBlog.slug || ''}
                      onChange={(e) => setEditingBlog(prev => ({ ...prev, slug: generateSlug(e.target.value) }))}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Category</label>
                    <input 
                      type="text" 
                      value={editingBlog.category || ''}
                      onChange={(e) => setEditingBlog(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="e.g. Software Development"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Author</label>
                    <input 
                      type="text" 
                      value={editingBlog.author || ''}
                      onChange={(e) => setEditingBlog(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Featured Image URL</label>
                    <input 
                      type="text" 
                      value={editingBlog.featuredImage || ''}
                      onChange={(e) => setEditingBlog(prev => ({ ...prev, featuredImage: e.target.value }))}
                      placeholder="https://..."
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Meta Description</label>
                  <textarea 
                    rows={2}
                    value={editingBlog.metaDescription || ''}
                    onChange={(e) => setEditingBlog(prev => ({ ...prev, metaDescription: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Blog Content HTML</label>
                  <textarea 
                    rows={8}
                    required
                    value={editingBlog.content || ''}
                    onChange={(e) => setEditingBlog(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs font-mono text-slate-700"
                  />
                </div>

                {/* FAQ Builder */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-600">Blog FAQs ({blogFaqs.length})</label>
                    <button
                      type="button"
                      onClick={() => setBlogFaqs(prev => [...prev, { question: '', answer: '' }])}
                      className="text-[11px] font-bold text-electric flex items-center gap-1 hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add FAQ
                    </button>
                  </div>
                  {blogFaqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 space-y-2 relative">
                      <button 
                        type="button" 
                        onClick={() => setBlogFaqs(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute right-2 top-2 text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <input 
                        type="text" 
                        placeholder="Question"
                        required
                        value={faq.question}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBlogFaqs(prev => {
                            const copy = [...prev];
                            copy[idx].question = val;
                            return copy;
                          });
                        }}
                        className="w-11/12 bg-white border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs text-slate-700"
                      />
                      <textarea 
                        placeholder="Answer"
                        required
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBlogFaqs(prev => {
                            const copy = [...prev];
                            copy[idx].answer = val;
                            return copy;
                          });
                        }}
                        className="w-full bg-white border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs text-slate-700 resize-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button type="submit" className="bg-navy hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5">
                    <Save className="w-4 h-4" /> Save Blog
                  </button>
                  <button type="button" onClick={() => setEditingBlog(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-6 py-2.5 rounded-xl text-xs">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* T5. PORTFOLIO CRUD */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            {!editingPortfolio ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search portfolios..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white border border-slate-200/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric w-full"
                    />
                  </div>
                  <button 
                    onClick={handleStartAddPortfolio}
                    className="bg-electric text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Create Portfolio
                  </button>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
                  {portfolios
                    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(port => (
                      <div key={port.slug} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="text-xs font-bold text-navy">{port.name}</p>
                          <p className="text-[10px] text-slate-400">/{port.slug} | Industry: <span className="font-semibold">{port.industry}</span></p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setEditingPortfolio(port);
                              setPortfolioTech(port.technology.join(', '));
                            }}
                            className="p-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeletePortfolio(port.slug)}
                            className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              // Add/Edit Portfolio Form
              <form onSubmit={handleSavePortfolio} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="font-bold text-navy text-sm border-b border-slate-100 pb-3">
                  {editingPortfolio.slug ? 'Edit Portfolio Item' : 'Create Portfolio Item'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Project / Client Name</label>
                    <input 
                      type="text" 
                      required
                      value={editingPortfolio.name || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingPortfolio(prev => ({
                          ...prev,
                          name: val,
                          slug: prev?.slug ? prev.slug : generateSlug(val)
                        }));
                      }}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Project Slug</label>
                    <input 
                      type="text" 
                      required
                      value={editingPortfolio.slug || ''}
                      onChange={(e) => setEditingPortfolio(prev => ({ ...prev, slug: generateSlug(e.target.value) }))}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Industry</label>
                    <input 
                      type="text" 
                      value={editingPortfolio.industry || ''}
                      onChange={(e) => setEditingPortfolio(prev => ({ ...prev, industry: e.target.value }))}
                      placeholder="e.g. FinTech"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Client Country</label>
                    <input 
                      type="text" 
                      value={editingPortfolio.clientCountry || ''}
                      onChange={(e) => setEditingPortfolio(prev => ({ ...prev, clientCountry: e.target.value }))}
                      placeholder="e.g. USA"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Technology Tags (Comma-separated)</label>
                    <input 
                      type="text" 
                      value={portfolioTech}
                      onChange={(e) => setPortfolioTech(e.target.value)}
                      placeholder="React, Next.js, Node.js, Postgres"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Brief Description</label>
                  <textarea 
                    rows={2}
                    value={editingPortfolio.description || ''}
                    onChange={(e) => setEditingPortfolio(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Challenge Details</label>
                    <textarea 
                      rows={4}
                      value={editingPortfolio.challenge || ''}
                      onChange={(e) => setEditingPortfolio(prev => ({ ...prev, challenge: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Our Custom Solution</label>
                    <textarea 
                      rows={4}
                      value={editingPortfolio.solution || ''}
                      onChange={(e) => setEditingPortfolio(prev => ({ ...prev, solution: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 resize-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">Results Metrics Achieved</label>
                    <textarea 
                      rows={4}
                      value={editingPortfolio.results || ''}
                      onChange={(e) => setEditingPortfolio(prev => ({ ...prev, results: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700 resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button type="submit" className="bg-navy hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5">
                    <Save className="w-4 h-4" /> Save Portfolio
                  </button>
                  <button type="button" onClick={() => setEditingPortfolio(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-6 py-2.5 rounded-xl text-xs">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* T6. CONSOLE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="font-bold text-navy text-sm border-b border-slate-100 pb-3">CMS Database & Environment Settings</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1.5">
                <p className="text-xs font-bold text-navy">Active Database Mode:</p>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Dual Mode active. Automatically falling back to local <strong>JSON database</strong> when <code>DATABASE_URL</code> is absent.</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Email Notification Webhook (Alerts on Lead Submit)</label>
                <input 
                  type="text" 
                  disabled
                  placeholder="https://hooks.slack.com/services/..."
                  className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Dynamic Sitemap Automation URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    disabled
                    value="https://dexteroussoftech.com/sitemap.xml"
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* --- FLOATING MODALS AND OVERLAYS --- */}

      {/* Viewing Lead Modal */}
      {viewingLead && (
        <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200/80 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <button 
              onClick={() => setViewingLead(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-navy p-1 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-navy">Project Lead Detail</h3>
              <p className="text-[10px] text-slate-400">ID: {viewingLead.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Contact Name</p>
                <p className="font-semibold text-navy mt-0.5">{viewingLead.name}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Email Address</p>
                <p className="font-semibold text-navy mt-0.5">{viewingLead.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Phone</p>
                <p className="font-semibold text-navy mt-0.5">{viewingLead.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Company & Country</p>
                <p className="font-semibold text-navy mt-0.5">
                  {viewingLead.company || 'N/A'} ({viewingLead.country || 'N/A'})
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Project Category</p>
                <p className="font-semibold text-electric mt-0.5">{viewingLead.projectType}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Calculated Budget / Timeline</p>
                <p className="font-semibold text-navy mt-0.5">
                  {viewingLead.budget} ({viewingLead.timeline})
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Project Message & Spec Details</p>
              <div className="bg-slate-50 border border-slate-200/40 rounded-xl p-4 text-xs text-slate-700 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {viewingLead.message}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                onClick={() => handleDeleteLead(viewingLead.id)}
                className="bg-red-50 text-red-500 border border-red-100 hover:bg-red-100 text-xs font-bold px-4 py-2 rounded-xl"
              >
                Delete Inbound Lead
              </button>
              <button 
                onClick={() => setViewingLead(null)}
                className="bg-navy hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
