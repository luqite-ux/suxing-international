import sanitizeHtml from 'sanitize-html'

export const newsBase = (process.env.NEXT_PUBLIC_SITE_URL || 'https://suxingapparel.com').trim().replace(/\/$/, '')
export function localized(value, locale = 'en', defaultLocale = 'en', legacy = '') {
  const values = value && typeof value === 'object' ? value : {}
  return [values[locale], values[defaultLocale], ...Object.values(values), legacy].find(v => typeof v === 'string' && v.trim()) || ''
}
export function cleanArticleHtml(html = '') {
  return sanitizeHtml(html, { allowedTags: [...sanitizeHtml.defaults.allowedTags, 'img'], allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, img: ['src', 'alt', 'width', 'height', 'loading'] }, allowedSchemes: ['https', 'http', 'mailto'], allowProtocolRelative: false })
}
export async function readArticles(locale = 'en', options = {}) {
  const { url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, tenant = process.env.NEXT_PUBLIC_TENANT_ID, fetcher = fetch } = options
  if (!url || !key || !tenant) throw new Error('News data configuration is missing')
  const get = async (table, params) => {
    const response = await fetcher(`${url.replace(/\/$/, '')}/rest/v1/${table}?${new URLSearchParams(params)}`, { headers: { apikey: key, Authorization: `Bearer ${key}` }, next: { revalidate: 60 } })
    if (!response.ok) throw new Error('Unable to load news data')
    return response.json()
  }
  const settings = await get('tenants', { select: 'default_language', id: `eq.${tenant}` })
  const defaultLocale = settings[0]?.default_language || 'en'
  const rows = []
  for (let offset = 0; ; offset += 500) {
    const batch = await get('articles', { select: 'id,slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,featured_image,published_at,created_at,updated_at', tenant_id: `eq.${tenant}`, is_published: 'eq.true', order: 'published_at.desc.nullslast,id.asc', limit: '500', offset: String(offset) })
    rows.push(...batch)
    if (batch.length < 500) break
  }
  return rows.filter(row => row.slug).map(row => ({ ...row, title: localized(row.title_i18n, locale, defaultLocale, row.title), excerpt: localized(row.excerpt_i18n, locale, defaultLocale, row.excerpt), content: cleanArticleHtml(localized(row.content_i18n, locale, defaultLocale, row.content)), publishedAt: row.published_at || row.created_at, updatedAt: row.updated_at || row.published_at || row.created_at }))
}
