import React from 'react';
import { notFound } from 'next/navigation';
import db from '@/data/glossary.json';
import Link from 'next/link';
import AuthorBio from '@/components/AuthorBio';

export async function generateStaticParams() {
  return db.map((item: any) => ({ slug: item.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const item = db.find((i: any) => i.slug === resolvedParams.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.metaDescription,
    alternates: { canonical: `/glossary/${item.slug}` }
  };
}

export default async function PseoPage({ params }: Props) {
  const resolvedParams = await params;
  const item = db.find((i: any) => i.slug === resolvedParams.slug);

  if (!item) notFound();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-8">
          <Link href="/" className="hover:text-navy">Home</Link>
          <span className="mx-1">/</span>
          <span className="capitalize">{ `glossary` }</span>
          <span className="mx-1">/</span>
          <span className="text-slate-600 truncate">{item.name}</span>
        </nav>
        <article className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden p-6 md:p-10 space-y-6">
          <span className="inline-block bg-electric/10 text-electric text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            { `glossary Reference` }
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-navy leading-tight">{item.h1}</h1>
          <div className="prose max-w-none text-slate-600 mt-6" dangerouslySetInnerHTML={{ __html: item.content }} />
          <AuthorBio />
        </article>
      </div>
    </div>
  );
}