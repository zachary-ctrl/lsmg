import type { Config } from '@netlify/functions'

interface FeedArticle {
  title: string
  excerpt: string
  category: string
  source: string
  imageUrl: string
  url: string
  publishedAt: string
}

const RSS_FEEDS = [
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', source: 'NYT Home Page', category: 'Culture' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', source: 'NYT World', category: 'Culture' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/US.xml', source: 'NYT U.S.', category: 'Culture' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml', source: 'NYT Business', category: 'Business' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml', source: 'NYT Politics', category: 'Culture' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml', source: 'NYT Technology', category: 'Tech & Culture' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Health.xml', source: 'NYT Health', category: 'Business' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Arts.xml', source: 'NYT Arts', category: 'Entertainment' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml', source: 'NYT Travel', category: 'Culture' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml', source: 'NYT Sports', category: 'Entertainment' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/Science.xml', source: 'NYT Science', category: 'Culture' },
  { url: 'https://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml', source: 'NYT Fashion', category: 'Fashion' },
]

const PLACEHOLDER_IMAGES: Record<string, string> = {
  Music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
  Entertainment: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=400&fit=crop',
  Fashion: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
  Business: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
  Sports: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop',
  'Tech & Culture': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
  Celebrity: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop',
}

function extractFromXml(xml: string, tag: string): string {
  // Use regex to handle namespaced tags more precisely
  const pattern = new RegExp(`<${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}>`, 'i')
  const match = xml.match(pattern)
  if (!match) return ''
  let content = match[1].trim()
  // Handle CDATA
  if (content.startsWith('<![CDATA[')) {
    content = content.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim()
  }
  return content
}

function extractImage(itemXml: string): string {
  // Try media:content/media:thumbnail
  const mediaMatch = itemXml.match(/<(?:media:content|media:thumbnail)[^>]+url="(https?:\/\/[^"]+)"/i)
  if (mediaMatch) return mediaMatch[1]
  // Try enclosure
  const encMatch = itemXml.match(/<enclosure[^>]+url="(https?:\/\/[^"]+)"/i)
  if (encMatch) return encMatch[1]
  // Try image in description
  const imgMatch = itemXml.match(/<img[^>]+src="(https?:\/\/[^"]+)"/i)
  if (imgMatch) return imgMatch[1]
  return ''
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').trim()
}

async function fetchFeed(feedConfig: typeof RSS_FEEDS[number]): Promise<FeedArticle[]> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(feedConfig.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    })
    clearTimeout(timeout)
    if (!res.ok) return []
    const xml = await res.text()

    const articles: FeedArticle[] = []
    // Split by <item> or <entry> tags
    const items = xml.split(/<item[\s>]/).slice(1)
    const entries = items.length > 0 ? items : xml.split(/<entry[\s>]/).slice(1)

    for (const item of entries.slice(0, 5)) {
      const title = stripHtml(extractFromXml(item, 'title'))
      if (!title) continue

      const description = stripHtml(
        extractFromXml(item, 'description')
        || extractFromXml(item, 'summary')
        || extractFromXml(item, 'content:encoded')
        || extractFromXml(item, 'content')
      )
      const excerpt = description.length > 200 ? description.substring(0, 200) + '...' : description

      let link = extractFromXml(item, 'link')
      // CNN RSS sometimes puts the link URL on a line by itself after <link/> — extract it
      if (!link) {
        const linkLineMatch = item.match(/<link\s*\/?>[\s\r\n]*(https?:\/\/[^\s<]+)/i)
        if (linkLineMatch) link = linkLineMatch[1].trim()
      }
      if (!link) {
        // Try href attribute on link tag (Atom format)
        const linkMatch = item.match(/<link[^>]+href="([^"]+)"/)
        if (linkMatch) link = linkMatch[1]
      }
      if (!link) {
        // Fallback: try guid (common in RSS 2.0)
        const guid = extractFromXml(item, 'guid')
        if (guid && guid.startsWith('http')) link = guid
      }
      if (!link) continue

      const pubDate = extractFromXml(item, 'pubDate') || extractFromXml(item, 'published') || extractFromXml(item, 'updated')
      const imageUrl = extractImage(item) || PLACEHOLDER_IMAGES[feedConfig.category] || PLACEHOLDER_IMAGES['Entertainment']
      const parsedDate = pubDate ? Date.parse(pubDate) : NaN

      articles.push({
        title,
        excerpt: excerpt || 'Read more at the source.',
        category: feedConfig.category,
        source: feedConfig.source,
        imageUrl,
        url: link,
        publishedAt: Number.isNaN(parsedDate) ? new Date().toISOString() : new Date(parsedDate).toISOString(),
      })
    }
    return articles
  } catch {
    return []
  }
}

// Simple in-memory cache (refreshes every minute on cold/warm starts)
let cachedArticles: FeedArticle[] = []
let lastFetch = 0
const CACHE_TTL = 60 * 1000

export default async (req: Request) => {
  const now = Date.now()
  const url = new URL(req.url)
  const category = url.searchParams.get('category')
  const forceRefresh = url.searchParams.get('refresh') === '1'
  const page = parseInt(url.searchParams.get('page') || '0', 10)
  const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10)

  if (forceRefresh || now - lastFetch > CACHE_TTL || cachedArticles.length === 0) {
    // Fetch all feeds in parallel
    const results = await Promise.allSettled(RSS_FEEDS.map(fetchFeed))
    const allArticles: FeedArticle[] = []
    let feedErrors = 0
    for (const result of results) {
      if (result.status === 'fulfilled') {
        allArticles.push(...result.value)
      } else {
        feedErrors++
      }
    }
    // Sort by date (newest first), deduplicate by title
    const seen = new Set<string>()
    const latestArticles = allArticles
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .filter((a) => {
        const key = `${a.title.toLowerCase().substring(0, 60)}|${a.url}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })

    if (latestArticles.length > 0 || cachedArticles.length === 0 || forceRefresh) {
      cachedArticles = latestArticles
      lastFetch = now
    }
  }

  let articles = cachedArticles
  if (category && category !== 'All') {
    articles = articles.filter((a) => a.category === category)
  }

  const total = articles.length
  const paged = articles.slice(page * pageSize, (page + 1) * pageSize)

  return Response.json({
    articles: paged,
    total,
    page,
    pageSize,
    fetchedAt: new Date(lastFetch).toISOString(),
    ...(total === 0 && { error: 'No articles could be fetched from RSS feeds. They may be temporarily unavailable.' }),
  }, {
    headers: {
      'Cache-Control': forceRefresh ? 'no-store' : 'public, max-age=60, stale-while-revalidate=30',
    },
  })
}

export const config: Config = {
  path: '/api/live-feed',
}
