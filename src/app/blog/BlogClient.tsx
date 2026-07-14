"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, User, ChevronRight } from 'lucide-react';
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
    'Business Automation'
  ];

  const filteredBlogs = initialBlogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && blog.published;
  });

  return (
    <div className="w-full min-h-screen bg-slate-bg py-16 bg-grid-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* Header */}
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

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Categories list */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-navy text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-navy'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-200/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-700 focus:outline-none focus:border-electric w-full"
            />
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.slug}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white border border-slate-200/85 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image wrapper */}
                  <div className="h-44 bg-slate-900 overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={blog.featuredImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=400&auto=format&fit=crop'} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-navy/90 text-cyan text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm">
                      {blog.category}
                    </span>
                  </div>

                  {/* Body text */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-4 text-[10px] text-slate-400 font-semibold">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>{blog.author}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-navy group-hover:text-electric transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                      {blog.metaDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="text-xs font-bold text-electric hover:text-blue-700 flex items-center gap-1 group/btn"
                  >
                    Read Full Article
                    <ChevronRight className="w-4 h-4 group-btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredBlogs.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white border border-slate-200/80 rounded-2xl">
              <p className="text-slate-500 text-sm">No articles found in this category.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
