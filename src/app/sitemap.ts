import { MetadataRoute } from 'next';
import { getPages, getBlogs, getPortfolios } from '@/lib/db';
import locationsData from '@/data/locations.json';
import techData from '@/data/tech.json';
import industryData from '@/data/industry.json';
import costData from '@/data/cost.json';
import compareData from '@/data/compare.json';
import gamingData from '@/data/gaming.json';
import glossaryData from '@/data/glossary.json';

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
    '/press',
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

  // Geo-Targeted Location pages
  const locationRoutes = locationsData.map((location) => ({
    url: `${baseUrl}/services/${location.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
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

  // pSEO Pages
  const techRoutes = techData.map((t: any) => ({ url: `${baseUrl}/tech/${t.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }));
  const industryRoutes = industryData.map((i: any) => ({ url: `${baseUrl}/industry/${i.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }));
  const costRoutes = costData.map((c: any) => ({ url: `${baseUrl}/cost/${c.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }));
  const compareRoutes = compareData.map((c: any) => ({ url: `${baseUrl}/compare/${c.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }));
  const gamingRoutes = gamingData.map((g: any) => ({ url: `${baseUrl}/gaming/${g.slug}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 }));
  const glossaryRoutes = glossaryData.map((g: any) => ({ url: `${baseUrl}/glossary/${g.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 }));

  return [
    ...routes, ...pageRoutes, ...locationRoutes, ...blogRoutes, ...portfolioRoutes,
    ...techRoutes, ...industryRoutes, ...costRoutes, ...compareRoutes,
    ...gamingRoutes, ...glossaryRoutes
  ];
}
