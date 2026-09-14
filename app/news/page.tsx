import Link from 'next/link'
import type { Metadata } from 'next'
import { readArticles, newsBase } from '@/lib/articles.mjs'
import { siteConfig } from '@/src/data/site'
import { Newspaper } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: `News | ${siteConfig.brandName}`,
  description: 'Company updates from Zhejiang Suxing Knitting Co., Ltd.',
  alternates: { canonical: `${newsBase}/news` },
  openGraph: { title: `News | ${siteConfig.brandName}`, description: 'Company updates from Zhejiang Suxing Knitting Co., Ltd.', url: `${newsBase}/news`, type: 'website', images: [new URL(siteConfig.logo, newsBase).href] },
}

export default async function NewsPage() {
  const articles = await readArticles('en')
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-800">News</p>
      <h1 className="mt-3 text-5xl font-semibold text-ink">News</h1>
      {articles.length ? <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{articles.map(article => <article key={article.id} className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-sky-200 bg-white shadow-airy">
        {article.featured_image ? <img loading="lazy" src={article.featured_image} alt={article.title} className="aspect-video w-full object-cover" /> : <div className="flex aspect-video items-center justify-center bg-sky-50"><Newspaper className="h-12 w-12 text-sky-800" aria-hidden="true" /></div>}
        <div className="flex flex-1 flex-col p-6">
          {article.publishedAt && <time dateTime={article.publishedAt} className="text-sm text-slate-600">{new Date(article.publishedAt).toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric',timeZone:'UTC'})}</time>}
          <h2 className="mt-3 line-clamp-3 break-words text-xl font-semibold text-ink"><Link href={`/news/${encodeURIComponent(article.slug)}`}>{article.title}</Link></h2>
          <p className="mb-6 mt-3 line-clamp-3 text-slate-600">{article.excerpt}</p>
          <Link className="mt-auto inline-flex min-h-11 items-center font-semibold text-sky-800 underline-offset-4 hover:underline" href={`/news/${encodeURIComponent(article.slug)}`}>Read more<span className="sr-only">: {article.title}</span></Link>
        </div>
      </article>)}</div> : <div className="mt-10 rounded-[2rem] border border-dashed border-sky-200 bg-white/78 p-10 text-center shadow-airy">
        <h2 className="text-2xl font-semibold">No published updates yet.</h2>
        <p className="mt-4 text-slate-600">Company updates will appear here when published. Please check back for the latest news.</p>
      </div>}
    </main>
  );
}
