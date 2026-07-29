import { createServerFn } from '@tanstack/react-start'
import { desc, eq } from 'drizzle-orm'
import { db } from '../../db/index'
import { articles, comments } from '../../db/schema'

const PUBLISHED_LEDGERA_API = 'https://lastshotmediagroup.com/api/culture-ledger'

type LedgeraArticle = {
  id?: number
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  author: string
  publishedAt: string
  imageUrl?: string | null
  source?: string | null
  sourceUrl?: string | null
  featured?: boolean
  tags?: string[] | null
}

type LedgeraComment = {
  id: number
  name: string
  text: string
  createdAt: string
}

function serializeArticle(article: typeof articles.$inferSelect): LedgeraArticle {
  return {
    ...article,
    publishedAt: article.publishedAt?.toISOString() || new Date(0).toISOString(),
  }
}

function serializeComment(comment: typeof comments.$inferSelect): LedgeraComment {
  return {
    id: comment.id,
    name: comment.name,
    text: comment.text,
    createdAt: comment.createdAt?.toISOString() || new Date(0).toISOString(),
  }
}

async function getPublishedArticles() {
  try {
    const response = await fetch(PUBLISHED_LEDGERA_API, { headers: { Accept: 'application/json' } })
    if (!response.ok) return []
    const data = await response.json() as { articles?: LedgeraArticle[] }
    return data.articles || []
  } catch {
    return []
  }
}

async function getPublishedArticle(slug: string) {
  try {
    const response = await fetch(`${PUBLISHED_LEDGERA_API}?slug=${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
    })
    if (!response.ok) return { article: null, comments: [] }
    const data = await response.json() as { article?: LedgeraArticle; comments?: LedgeraComment[] }
    return { article: data.article || null, comments: data.comments || [] }
  } catch {
    return { article: null, comments: [] }
  }
}

export const getLedgeraArticles = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const localArticles = await db.select().from(articles).orderBy(desc(articles.publishedAt))
    return localArticles.length > 0 ? localArticles.map(serializeArticle) : getPublishedArticles()
  } catch {
    return getPublishedArticles()
  }
})

export const getLedgeraArticle = createServerFn({ method: 'GET' })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    try {
      const [article] = await db.select().from(articles).where(eq(articles.slug, data.slug)).limit(1)
      if (!article) return getPublishedArticle(data.slug)

      const articleComments = await db
        .select()
        .from(comments)
        .where(eq(comments.articleSlug, data.slug))
        .orderBy(comments.createdAt)

      return { article: serializeArticle(article), comments: articleComments.map(serializeComment) }
    } catch {
      return getPublishedArticle(data.slug)
    }
  })
