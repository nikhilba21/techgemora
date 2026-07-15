import { MetadataRoute } from 'next';
import { getPages, getBlogs, getPortfolios } from '@/lib/db';

export const revalidate = 3600; // Cache sitemap for 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.dexteroussoftech.com';

  // Base static pages
  const staticRoutes = [
    '',
    '/portfolio',
    '/case-studies',
    '/blog',
    '/contact',
    '/ai-cost-estimator',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const [pages, blogs, portfolios] = await Promise.all([
      getPages(),
      getBlogs(),
      getPortfolios()
    ]);

    // Service, Location, Industry, and Hire developer pages
    const dynamicPages = pages
      .filter(p => p.published)
      .map(p => ({
        url: `${baseUrl}/${p.slug}`,
        lastModified: new Date().toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));

    // B2B Blog posts
    const blogPosts = blogs
      .filter(b => b.published)
      .map(b => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: new Date(b.createdAt).toISOString().split('T')[0],
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));

    return [...staticRoutes, ...dynamicPages, ...blogPosts];
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return staticRoutes;
  }
}
