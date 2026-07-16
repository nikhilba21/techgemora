"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, ChevronRight, FolderOpen, ArrowRight } from 'lucide-react';
import { Blog } from '@/lib/db';

interface BlogClientProps {
  initialBlogs: Blog[];
}

export default function BlogClient({ initialBlogs }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All', 
    'Software Development', 
    'AI', 
    'Mobile Apps', 
    'Web Development', 
    'SaaS', 
    'Cloud', 
    'Technology Trends', 
    'Business Automation',
    'Game Development',
    'Mobile Gaming'
  ];

  const filteredBlogs = initialBlogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && blog.published;
  });

  const recentBlogs = [...initialBlogs].filter(b => b.published).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-slate-bg py-16 bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center bg-blue-50 border border-blue-200 text-electric text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
            Resources & Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy leading-tight">
            The Gemora Tech Blog
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Read engineering tutorials, SEO best practices, SaaS architecture design patterns, and global tech trends.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Main Content Area (Left Column) */}
          <div className="w-full lg:w-2/3 space-y-10">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.slug}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-slate-200/85 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
                >
                  {/* Large Featured Image */}
                  <div className="h-64 sm:h-80 w-full overflow-hidden relative bg-slate-900 block">
                    <Link href={`/blog/${blog.slug}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={blog.featuredImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop'} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                      />
                    </Link>
                    <span className="absolute top-4 left-4 bg-navy/95 text-cyan text-xs font-bold px-3 py-1.5 rounded border border-slate-800 shadow-lg backdrop-blur-md">
                      {blog.category}
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-electric" />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-electric" />
                        <span>{blog.author}</span>
                      </div>
                    </div>

                    <Link href={`/blog/${blog.slug}`}>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-navy group-hover:text-electric transition-colors leading-snug">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {blog.metaDescription}
                    </p>

                    <div className="pt-4 border-t border-slate-100 mt-2">
                      <Link 
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-2 bg-navy hover:bg-electric text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-colors group/btn w-fit"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-20 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-navy">No articles found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your search or selecting a different category.</p>
              </div>
            )}
          </div>

          {/* Sidebar (Right Column) */}
          <div className="w-full lg:w-1/3 space-y-8">
            
            {/* Search Widget */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-navy mb-4 border-l-4 border-electric pl-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric w-full transition-all"
                />
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-navy mb-4 border-l-4 border-electric pl-3">Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => {
                  const count = cat === 'All' 
                    ? initialBlogs.filter(b => b.published).length 
                    : initialBlogs.filter(b => b.category.toLowerCase() === cat.toLowerCase() && b.published).length;
                  
                  if (count === 0 && cat !== 'All') return null; // Hide empty categories

                  return (
                    <li key={cat}>
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          selectedCategory === cat 
                            ? 'bg-blue-50 text-electric border border-blue-100' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-navy border border-transparent'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <FolderOpen className="w-4 h-4" />
                          {cat}
                        </span>
                        <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-xs">
                          {count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-navy mb-4 border-l-4 border-electric pl-3">Recent Posts</h3>
              <div className="space-y-4">
                {recentBlogs.map(blog => (
                  <div key={blog.slug} className="flex gap-4 group">
                    <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={blog.featuredImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=200&auto=format&fit=crop'} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Link href={`/blog/${blog.slug}`} className="text-sm font-bold text-navy group-hover:text-electric transition-colors line-clamp-2 leading-tight">
                        {blog.title}
                      </Link>
                      <span className="text-xs text-slate-400 mt-1 font-medium">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Widget */}
            <div className="bg-gradient-to-br from-navy to-slate-900 p-8 rounded-2xl text-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-xl font-extrabold text-white">Have a Project in Mind?</h3>
                <p className="text-slate-300 text-sm">
                  Partner with Gemora Tech to build scalable, high-performance software solutions.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block bg-electric hover:bg-cyan text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors w-full mt-2"
                >
                  Get a Free Quote
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
