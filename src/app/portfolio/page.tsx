import React from 'react';
import { getPortfolios } from '@/lib/db';
import PortfolioClient from './PortfolioClient';

export const revalidate = 0; // Ensures fresh data load on page fetch

export default async function PortfolioPage() {
  const portfolios = await getPortfolios();
  return <PortfolioClient initialPortfolios={portfolios} />;
}
