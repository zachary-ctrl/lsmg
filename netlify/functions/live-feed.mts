import type { Config } from '@netlify/functions'

type EditorialCategory = 'Fashion' | 'Beauty' | 'Entertainment'

interface FeedArticle {
  title: string
  excerpt: string
  category: EditorialCategory
  source: string
  sourceUrl: string
  imageUrl: string
  url: string
  publishedAt: string
}

interface PublisherFeed {
  source: string
  sourceUrl: string
  defaultCategory: EditorialCategory
  feeds: string[]
}

const googleNewsFeed = (domain: string) =>
  `https://news.google.com/rss/search?q=site%3A${encodeURIComponent(domain)}%20(fashion%20OR%20beauty%20OR%20entertainment%20OR%20celebrity)&hl=en-US&gl=US&ceid=US%3Aen`

const PUBLISHERS: PublisherFeed[] = [
  {
    source: 'Nylon',
    sourceUrl: 'https://www.nylon.com',
    defaultCategory: 'Fashion',
    feeds: ['https://www.nylon.com/rss', googleNewsFeed('nylon.com')],
  },
  {
    source: 'Paper Magazine',
    sourceUrl: 'https://www.papermag.com',
    defaultCategory: 'Fashion',
    feeds: ['https://www.papermag.com/feeds/feed.rss', googleNewsFeed('papermag.com')],
  },
  {
    source: 'People',
    sourceUrl: 'https://people.com',
    defaultCategory: 'Entertainment',
    feeds: ['https://people.com/feed/', googleNewsFeed('people.com')],
  },
  {
    source: 'E! News',
    sourceUrl: 'https://www.eonline.com',
    defaultCategory: 'Entertainment',
    feeds: [
      'https://www.eonline.com/syndication/feeds/rssfeeds/topstories.xml',
      googleNewsFeed('eonline.com'),
    ],
  },
  {
    source: 'Access Hollywood',
    sourceUrl: 'https://www.accessonline.com',
    defaultCategory: 'Entertainment',
    feeds: ['https://www.accessonline.com/feed', googleNewsFeed('accessonline.com')],
  },
]

const PLACEHOLDER_IMAGES: Record<EditorialCategory, string[]> = {
  Fashion: [
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
  ],
  Beauty: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  ],
  Entertainment: [
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
  ],
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function extractFromXml(xml: string, tag: string) {
  const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = xml.match(new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)</${escapedTag}>`, 'i'))
  if (!match) return ''
  return decodeEntities(match[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim())
}

function stripHtml(value: string) {
  return decodeEntities(value.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
}

function extractImage(itemXml: string) {
  const mediaMatch = itemXml.match(/<(?:media:content|media:thumbnail)[^>]+url=["'](https?:\/\/[^"']+)/i)
  if (mediaMatch) return decodeEntities(mediaMatch[1])
  const enclosureMatch = itemXml.match(/<enclosure[^>]+url=["'](https?:\/\/[^"']+)/i)
  if (enclosureMatch) return decodeEntities(enclosureMatch[1])
  const imageMatch = itemXml.match(/<img[^>]+src=["'](https?:\/\/[^"']+)/i)
  return imageMatch ? decodeEntities(imageMatch[1]) : ''
}

function classifyArticle(text: string, fallback: EditorialCategory): EditorialCategory {
  const normalized = text.toLowerCase()
  if (/beauty|makeup|skin care|skincare|hair|fragrance|nails|cosmetic/.test(normalized)) return 'Beauty'
  if (/fashion|style|runway|designer|dress|outfit|wardrobe|streetwear|couture/.test(normalized)) return 'Fashion'
  if (/film|movie|music|album|television|tv|celebrity|actor|singer|award|premiere/.test(normalized)) return 'Entertainment'
  return fallback
}

function cleanTitle(title: string, source: string) {
  return title.replace(new RegExp(`\\s+-\\s+${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'), '').trim()
}

function fallbackImage(category: EditorialCategory, seed: string) {
  const images = PLACEHOLDER_IMAGES[category]
  const index = [...seed].reduce((total, character) => total + character.charCodeAt(0), 0) % images.length
  return images[index]
}

function extractItems(xml: string) {
  const rssItems = xml.split(/<item[\s>]/i).slice(1)
  return rssItems.length > 0 ? rssItems : xml.split(/<entry[\s>]/i).slice(1)
}

async function fetchFeed(feedUrl: string, publisher: PublisherFeed): Promise<FeedArticle[]> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(feedUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
        'User-Agent': 'LSMG-LEDGERA/1.0 (+https://lastshotmediagroup.com/culture-ledger)',
      },
    })
    if (!response.ok) return []

    const xml = await response.text()
    const articles: FeedArticle[] = []

    for (const item of extractItems(xml).slice(0, 8)) {
      const rawTitle = stripHtml(extractFromXml(item, 'title'))
      if (!rawTitle) continue

      const title = cleanTitle(rawTitle, publisher.source)
      const description = stripHtml(
        extractFromXml(item, 'description') ||
          extractFromXml(item, 'summary') ||
          extractFromXml(item, 'content:encoded') ||
          extractFromXml(item, 'content'),
      )
      const category = classifyArticle(`${title} ${description}`, publisher.defaultCategory)
      let link = extractFromXml(item, 'link')

      if (!link) link = item.match(/<link[^>]+href=["']([^"']+)/i)?.[1] || ''
      if (!link) link = extractFromXml(item, 'guid')
      if (!link.startsWith('http')) continue

      const dateValue =
        extractFromXml(item, 'pubDate') ||
        extractFromXml(item, 'published') ||
        extractFromXml(item, 'updated')
      const timestamp = dateValue ? Date.parse(dateValue) : NaN

      articles.push({
        title,
        excerpt: description ? `${description.slice(0, 190)}${description.length > 190 ? '…' : ''}` : `Read the latest from ${publisher.source}.`,
        category,
        source: publisher.source,
        sourceUrl: publisher.sourceUrl,
        imageUrl: extractImage(item) || fallbackImage(category, title),
        url: decodeEntities(link),
        publishedAt: Number.isNaN(timestamp) ? new Date().toISOString() : new Date(timestamp).toISOString(),
      })
    }

    return articles
  } catch {
    return []
  } finally {
    clearTimeout(timeout)
  }
}

async function fetchPublisher(publisher: PublisherFeed) {
  for (const feed of publisher.feeds) {
    const articles = await fetchFeed(feed, publisher)
    if (articles.length > 0) return articles
  }
  return []
}

let cachedArticles: FeedArticle[] = []
let lastFetch = 0
const CACHE_TTL = 5 * 60 * 1000

export default async (request: Request) => {
  const requestUrl = new URL(request.url)
  const requestedCategory = requestUrl.searchParams.get('category')
  const forceRefresh = requestUrl.searchParams.get('refresh') === '1'
  const now = Date.now()

  if (forceRefresh || now - lastFetch > CACHE_TTL || cachedArticles.length === 0) {
    const results = await Promise.allSettled(PUBLISHERS.map(fetchPublisher))
    const fetchedArticles = results.flatMap((result) => (result.status === 'fulfilled' ? result.value : []))
    const seen = new Set<string>()
    const deduplicated = fetchedArticles
      .sort((first, second) => Date.parse(second.publishedAt) - Date.parse(first.publishedAt))
      .filter((article) => {
        const key = `${article.source}:${article.title.toLowerCase()}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })

    if (deduplicated.length > 0) {
      cachedArticles = deduplicated
      lastFetch = now
    }
  }

  const articles = requestedCategory && requestedCategory !== 'All'
    ? cachedArticles.filter((article) => article.category === requestedCategory)
    : cachedArticles

  return Response.json(
    {
      articles,
      total: articles.length,
      fetchedAt: lastFetch ? new Date(lastFetch).toISOString() : '',
      publishers: PUBLISHERS.map(({ source, sourceUrl }) => ({ source, sourceUrl })),
      ...(articles.length === 0 && { error: 'Publisher feeds are temporarily unavailable.' }),
    },
    {
      headers: {
        'Cache-Control': forceRefresh ? 'no-store' : 'public, max-age=300, stale-while-revalidate=900',
      },
    },
  )
}

export const config: Config = {
  path: '/api/live-feed',
}
