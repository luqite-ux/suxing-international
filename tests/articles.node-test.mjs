import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'

test('published news supports data-driven articles rather than permanent empty state', async () => {
  assert.ok(existsSync(new URL('../lib/articles.mjs', import.meta.url)), 'Published article data reader is missing')
  const { localized, readArticles, cleanArticleHtml } = await import('../lib/articles.mjs')
  assert.equal(localized({ fr: '', en: 'English', de: 'Deutsch' }, 'fr', 'en', 'Legacy'), 'English')
  assert.equal(localized({ de: 'Deutsch' }, 'fr', 'en', 'Legacy'), 'Deutsch')
  assert.equal(localized({}, 'fr', 'en', 'Legacy'), 'Legacy')
  const requests = []
  const fetcher = async (url) => {
    requests.push(new URL(url))
    return { ok: true, json: async () => url.includes('/tenants?') ? [{ default_language: 'en' }] : [{ id: '1', slug: 'fresh-news', title: 'Legacy', title_i18n: { en: 'Published news' }, content: '<p>Hello</p>', published_at: '2026-09-14T00:00:00Z' }] }
  }
  const articles = await readArticles('en', { url: 'https://example.test', key: 'test', tenant: 'tenant-one', fetcher })
  assert.equal(articles[0].title, 'Published news')
  const query = requests.find(url => url.pathname.endsWith('/articles')).searchParams
  assert.equal(query.get('tenant_id'), 'eq.tenant-one')
  assert.equal(query.get('is_published'), 'eq.true')
  assert.equal(query.get('offset'), '0')
  assert.equal(cleanArticleHtml('<p onclick="bad()">Safe</p><script>bad()</script><a href="javascript:bad()">link</a>'), '<p>Safe</p><a>link</a>')
  await assert.rejects(readArticles('en', { url: 'https://example.test', key: 'test', tenant: 'tenant-one', fetcher: async () => ({ ok: false }) }), /news/i)
})
