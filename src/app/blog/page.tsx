import React from 'react';
import { getBlogs } from '@/lib/db';
import BlogClient from './BlogClient';

export const revalidate = 0; // Force live data loading

export default async function BlogIndexPage() {
  const blogs = await getBlogs();
  return <BlogClient initialBlogs={blogs} />;
}
