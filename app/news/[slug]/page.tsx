import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readArticles, newsBase } from '@/lib/articles.mjs'
import { siteConfig } from '@/src/data/site'

export const dynamic = 'force-dynamic'
export const dynamicParams = true
type Props = { params: Promise<{ slug: string }> }
async function articleFor(params: Props['params']) {
  const { slug } = await params
  return (await readArticles('en')).find(article => article.slug === slug)
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await articleFor(params)
  if (!article) return { title: 'News not found', robots: { index: false } }
  const url = `${newsBase}/news/${encodeURIComponent(article.slug)}`
  const description = article.excerpt || article.title
  const images = [article.featured_image || new URL(siteConfig.logo, newsBase).href]
  return { title: article.title, description, alternates: { canonical: url }, openGraph: { title: article.title, description, url, type: 'article', images, publishedTime: article.publishedAt, modifiedTime: article.updatedAt }, twitter: { card: 'summary_large_image', title: article.title, description, images } }
}
export default async function NewsArticle({ params }: Props) {
  const article = await articleFor(params)
  if (!article) notFound()
  const url = `${newsBase}/news/${encodeURIComponent(article.slug)}`
  const schema = { '@context': 'https://schema.org', '@graph': [{ '@type': 'Article', '@id': `${url}#article`, headline: article.title, description: article.excerpt, datePublished: article.publishedAt, dateModified: article.updatedAt, mainEntityOfPage: url, image: article.featured_image || undefined, publisher: { '@type': 'Organization', '@id': `${newsBase}/#organization`, name: siteConfig.companyName, url: newsBase } }, { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: newsBase }, { '@type': 'ListItem', position: 2, name: 'News', item: `${newsBase}/news` }, { '@type': 'ListItem', position: 3, name: article.title, item: url }] }] }
  return <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm"><Link href="/">Home</Link><span>/</span><Link href="/news">News</Link><span>/</span><span className="break-words">{article.title}</span></nav>
    <h1 className="text-3xl font-semibold leading-tight break-words sm:text-5xl">{article.title}</h1>
    {article.publishedAt && <time className="mt-5 block text-slate-600" dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time>}
    {article.excerpt && <p className="mt-6 text-lg text-slate-600">{article.excerpt}</p>}
    {article.featured_image && <img className="mt-8 max-h-[560px] w-full rounded-2xl object-contain" src={article.featured_image} alt={article.title} />}
    <div className="article-prose mt-10" dangerouslySetInnerHTML={{ __html: article.content }} />
    <Link href="/news" className="mt-12 inline-block font-semibold text-sky-800">Back to news</Link>
  </main>
}
