import { MetadataRoute } from 'next';
import { getPages, getBlogs, getPortfolios } from '@/lib/db';

const baseUrl = 'https://www.dexteroussoftech.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic pages
  const pages = await getPages();
  const blogs = await getBlogs();
  const portfolios = await getPortfolios();

  // Core static routes
  const routes = [
    '',
    '/about',
    '/portfolio',
    '/blog',
    '/contact',
    '/ai-cost-estimator',
    '/hire-developers',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic SEO pages (e.g., /software-development-company-usa)
  const pageRoutes = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Blog pages
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.createdAt ? new Date(blog.createdAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Portfolio pages
  const portfolioRoutes = portfolios.map((port) => ({
    url: `${baseUrl}/portfolio/${port.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...pageRoutes, ...blogRoutes, ...portfolioRoutes];
}
