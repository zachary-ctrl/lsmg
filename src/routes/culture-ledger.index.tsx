import { createFileRoute, Link } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FullResolutionImage } from '../components/FullResolutionImage'
import { featuredFilms, outdoorScreenings, secondaryFilms } from '../data/tribeca-films'
import { getLedgeraArticles } from '../server/ledgera.functions'

export const Route = createFileRoute('/culture-ledger/')({
  loader: () => getLedgeraArticles(),
  head: () => ({
    meta: [
      {
        title: 'LEDGERA — The Record of Culture | Fashion, Beauty & Entertainment',
      },
      {
        name: 'description',
        content:
          "LEDGERA is Last Shot Media Group's editorial publication for fashion, beauty, entertainment, and special Tribeca coverage.",
      },
    ],
  }),
  component: CultureLedgerPage,
})

interface Article {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  source?: string
  sourceUrl?: string
  publishedAt: string
  imageUrl?: string
  featured?: boolean
  tags?: string[]
}

interface LiveArticle {
  title: string
  excerpt: string
  category: 'Fashion' | 'Beauty' | 'Entertainment'
  source: string
  sourceUrl: string
  imageUrl: string
  url: string
  publishedAt: string
}

interface CelebrityCover {
  imageUrl: string
  name: string
}

interface WikipediaSummary {
  originalimage?: { source?: string }
  thumbnail?: { source?: string }
  title?: string
}

const CATEGORIES = ['Latest', 'Fashion', 'Beauty', 'Entertainment', 'Tribeca 2026'] as const
const FALLBACK_IMAGE = '/ledgera-cover-fallback.svg'
const LAST_COVER_KEY = 'ledgera:last-cover-subject'
const CELEBRITY_COVER_SUBJECTS = [
  'Ariana Grande',
  'Beyoncé',
  'Billie Eilish',
  'Doja Cat',
  'Dua Lipa',
  'Lady Gaga',
  'Megan Thee Stallion',
  'Rihanna',
  'Sabrina Carpenter',
  'SZA',
  'Taylor Swift',
  'Tyla',
  'Zendaya',
] as const

const FALLBACK_LIVE_ARTICLES: LiveArticle[] = [
  ['Fashion coverage continues at Vogue', 'Fashion', 'Vogue', 'https://www.vogue.com', 'https://www.vogue.com/fashion'],
  ['Beauty reporting and product news from Allure', 'Beauty', 'Allure', 'https://www.allure.com', 'https://www.allure.com/beauty'],
  ['Entertainment reporting from Variety', 'Entertainment', 'Variety', 'https://variety.com', 'https://variety.com'],
  ['Runway and designer coverage from Harper’s Bazaar', 'Fashion', 'Harper’s Bazaar', 'https://www.harpersbazaar.com', 'https://www.harpersbazaar.com/fashion/'],
  ['Beauty industry coverage from WWD', 'Beauty', 'WWD', 'https://wwd.com', 'https://wwd.com/beauty-industry-news/'],
  ['Film and television reporting from The Hollywood Reporter', 'Entertainment', 'The Hollywood Reporter', 'https://www.hollywoodreporter.com', 'https://www.hollywoodreporter.com'],
  ['Fashion business reporting from WWD', 'Fashion', 'WWD', 'https://wwd.com', 'https://wwd.com/fashion-news/'],
  ['Entertainment coverage from Entertainment Weekly', 'Entertainment', 'Entertainment Weekly', 'https://ew.com', 'https://ew.com'],
].map(([title, category, source, sourceUrl, url], index) => ({
  title,
  excerpt: `Visit ${source} for its latest ${category.toLowerCase()} reporting and analysis.`,
  category: category as LiveArticle['category'],
  source,
  sourceUrl,
  imageUrl: FALLBACK_IMAGE,
  url,
  publishedAt: new Date(Date.UTC(2026, 6, 29, 12 - index)).toISOString(),
}))

function timeAgo(date: string) {
  const timestamp = Date.parse(date)
  if (Number.isNaN(timestamp)) return 'Recently'
  const elapsed = Math.max(0, Date.now() - timestamp)
  const hours = Math.floor(elapsed / 3_600_000)
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function randomCoverStartIndex() {
  const previousSubject = typeof window !== 'undefined' ? window.localStorage.getItem(LAST_COVER_KEY) : null
  let startIndex: number

  if (typeof window !== 'undefined' && window.crypto) {
    const randomValue = new Uint32Array(1)
    window.crypto.getRandomValues(randomValue)
    startIndex = randomValue[0] % CELEBRITY_COVER_SUBJECTS.length
  } else {
    startIndex = Math.floor(Math.random() * CELEBRITY_COVER_SUBJECTS.length)
  }

  if (CELEBRITY_COVER_SUBJECTS[startIndex] === previousSubject) {
    return (startIndex + 1) % CELEBRITY_COVER_SUBJECTS.length
  }
  return startIndex
}

function CultureLedgerPage() {
  const articles = Route.useLoaderData() as Article[]
  const [liveArticles, setLiveArticles] = useState<LiveArticle[]>([])
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('Latest')
  const [activeEdition, setActiveEdition] = useState<'daily' | 'tribeca'>('daily')
  const [refreshing, setRefreshing] = useState(false)
  const [feedError, setFeedError] = useState('')
  const [fetchedAt, setFetchedAt] = useState('')
  const [celebrityCover, setCelebrityCover] = useState<CelebrityCover | null>(null)

  const fetchLiveFeed = useCallback((forceRefresh = false) => {
    setRefreshing(forceRefresh)
    setFeedError('')
    const params = new URLSearchParams()
    if (forceRefresh) params.set('refresh', '1')
    params.set('_ts', String(Date.now()))

    fetch(`/api/live-feed?${params.toString()}`, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Feed unavailable')
        return response.json()
      })
      .then((data) => {
        setLiveArticles(data.articles || [])
        setFetchedAt(data.fetchedAt || '')
        if (data.error) setFeedError(data.error)
      })
      .catch(() => setFeedError('The publisher feed is temporarily unavailable.'))
      .finally(() => setRefreshing(false))
  }, [])

  useEffect(() => {
    fetchLiveFeed()
    const interval = window.setInterval(() => fetchLiveFeed(), 5 * 60 * 1000)
    return () => window.clearInterval(interval)
  }, [fetchLiveFeed])

  useEffect(() => {
    const controller = new AbortController()
    const startIndex = randomCoverStartIndex()

    const loadCelebrityCover = async () => {
      for (let offset = 0; offset < CELEBRITY_COVER_SUBJECTS.length; offset += 1) {
        const subject = CELEBRITY_COVER_SUBJECTS[(startIndex + offset) % CELEBRITY_COVER_SUBJECTS.length]

        try {
          const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(subject)}`,
            { signal: controller.signal },
          )
          if (!response.ok) continue

          const summary = await response.json() as WikipediaSummary
          const imageUrl = summary.originalimage?.source || summary.thumbnail?.source
          if (!imageUrl) continue

          setCelebrityCover({ imageUrl, name: summary.title || subject })
          window.localStorage.setItem(LAST_COVER_KEY, subject)
          return
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') return
        }
      }
    }

    loadCelebrityCover()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const syncEditionWithHash = () => {
      if (window.location.hash === '#tribeca-2026') {
        setActiveEdition('tribeca')
        setActiveCategory('Tribeca 2026')
      }
    }
    syncEditionWithHash()
    window.addEventListener('hashchange', syncEditionWithHash)
    return () => window.removeEventListener('hashchange', syncEditionWithHash)
  }, [])

  const filteredLiveArticles = useMemo(
    () => activeCategory === 'Latest'
      ? liveArticles
      : liveArticles.filter((article) => article.category === activeCategory),
    [activeCategory, liveArticles],
  )

  const filteredFallbackArticles = useMemo(
    () => activeCategory === 'Latest'
      ? FALLBACK_LIVE_ARTICLES
      : FALLBACK_LIVE_ARTICLES.filter((article) => article.category === activeCategory),
    [activeCategory],
  )

  const displayLiveArticles = filteredLiveArticles.length > 0 ? filteredLiveArticles : filteredFallbackArticles
  const tribecaArticles = articles.filter((article) =>
    article.category.toLowerCase().includes('film') || article.tags?.some((tag) => tag.toLowerCase().includes('tribeca')),
  )

  const switchEdition = (edition: 'daily' | 'tribeca') => {
    setActiveEdition(edition)
    const hash = edition === 'tribeca' ? '#tribeca-2026' : '#daily-edition'
    window.history.replaceState(null, '', hash)
    window.requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const switchTopLevel = (category: (typeof CATEGORIES)[number]) => {
    setActiveCategory(category)
    switchEdition(category === 'Tribeca 2026' ? 'tribeca' : 'daily')
  }

  const hero = articles.find((article) => article.featured) || articles[0]
  const tickerArticles = (liveArticles.length > 0 ? liveArticles : FALLBACK_LIVE_ARTICLES).slice(0, 6)

  return (
    <main className="ledgera-page">
      <header className="ledgera-masthead">
        <div className="ledgera-wordmark" aria-label="LEDGERA">
          <span>LEDGE</span><strong>RA</strong>
        </div>
        <p className="ledgera-tagline">The Record of Culture.</p>
        <nav className="ledgera-category-nav" aria-label="LEDGERA categories">
          <span>News</span><i aria-hidden="true">•</i>
          <span>Beauty</span><i aria-hidden="true">•</i>
          <span>Fashion</span><i aria-hidden="true">•</i>
          <span>Entertainment</span>
        </nav>
        <p className="ledgera-attribution">A Last Shot Media Group Publication.</p>
      </header>

      <nav className="ledgera-edition-nav" aria-label="LEDGERA editions">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? 'is-active' : ''}
            onClick={() => switchTopLevel(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {activeEdition === 'tribeca' && (
        <nav className="ledgera-tribeca-subnav" aria-label="Tribeca 2026 coverage">
          <Link to="/tribeca/schedule">Festival Schedule</Link>
          {featuredFilms.map((film) => (
            <Link key={film.slug} to="/tribeca/films/$filmSlug" params={{ filmSlug: film.slug }}>
              {film.title}
            </Link>
          ))}
        </nav>
      )}

      {tickerArticles.length > 0 && activeEdition === 'daily' && (
        <div className="ledgera-ticker" aria-label="Trending headlines">
          <div>
            {[...tickerArticles, ...tickerArticles].map((article, index) => (
              <a key={`${article.title}-${index}`} href={article.url} target="_blank" rel="noreferrer">
                <strong>Now</strong> {article.title} <span>✦</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {activeEdition === 'daily' ? (
        <div id="daily-edition" className="ledgera-edition-panel">
          <section className="ledgera-lead-grid" aria-labelledby="ledgera-lead-title">
            <article className="ledgera-hero-story">
              <FullResolutionImage
                src={celebrityCover?.imageUrl || FALLBACK_IMAGE}
                fallbackSrc={FALLBACK_IMAGE}
                alt={celebrityCover ? `${celebrityCover.name} editorial cover` : 'LEDGERA editorial cover'}
                linkClassName="ledgera-hero-image"
              >
                <span className="ledgera-hero-badge">A LEDGERA Dispatch</span>
                {celebrityCover && (
                  <span className="ledgera-cover-credit">Cover rotation: {celebrityCover.name} · Wikimedia</span>
                )}
              </FullResolutionImage>
              <div className="ledgera-story-copy">
                <p className="ledgera-kicker">{hero?.category || 'Culture'} / A LEDGERA Dispatch</p>
                <h1 id="ledgera-lead-title">
                  {hero?.title || 'The culture is moving. LEDGERA keeps the record.'}
                </h1>
                <p>{hero?.excerpt || 'Original reporting, visual essays, and the stories shaping fashion and entertainment now.'}</p>
                {hero && (
                  <Link to="/culture-ledger/$articleSlug" params={{ articleSlug: hero.slug }} className="ledgera-read-link">
                    Read the full story <span>↗</span>
                  </Link>
                )}
              </div>
            </article>

            <aside className="ledgera-side-feed">
              <div className="ledgera-section-heading compact">
                <div>
                  <span>01</span>
                  <h2>Trending Now</h2>
                </div>
                <button type="button" onClick={() => fetchLiveFeed(true)} disabled={refreshing}>
                  {refreshing ? 'Refreshing' : 'Refresh'}
                </button>
              </div>
              {displayLiveArticles.slice(0, 4).map((article, index) => (
                <article key={`${article.source}-${article.title}`} className="ledgera-trend-card">
                  <FullResolutionImage
                    src={article.imageUrl}
                    fallbackSrc={FALLBACK_IMAGE}
                    alt={`${article.title} cover`}
                    linkClassName="ledgera-trend-image"
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </FullResolutionImage>
                  <div>
                    <p className="ledgera-kicker">{article.category}</p>
                    <h3><a href={article.url} target="_blank" rel="noreferrer">{article.title}</a></h3>
                    <p className="ledgera-credit">Via <a href={article.sourceUrl} target="_blank" rel="noreferrer">{article.source}</a> · {timeAgo(article.publishedAt)}</p>
                  </div>
                </article>
              ))}
              {displayLiveArticles.length === 0 && (
                <p className="ledgera-empty">{feedError || 'No stories in this desk yet.'}</p>
              )}
            </aside>
          </section>

          <section className="ledgera-desk" aria-labelledby="latest-desk-title">
            <div className="ledgera-section-heading">
              <div>
                <span>02</span>
                <h2 id="latest-desk-title">The Culture Desk</h2>
              </div>
              <p>{fetchedAt ? `Updated ${timeAgo(fetchedAt)}` : 'Live publisher feeds'}</p>
            </div>
            <div className="ledgera-news-grid">
              {displayLiveArticles.slice(4, 12).map((article, index) => (
                <article key={`${article.url}-${index}`} className={index === 0 ? 'ledgera-news-card is-wide' : 'ledgera-news-card'}>
                  <FullResolutionImage
                    src={article.imageUrl}
                    fallbackSrc={FALLBACK_IMAGE}
                    alt={`${article.title} cover`}
                    linkClassName="ledgera-news-image"
                    loading="lazy"
                  />
                  <p className="ledgera-kicker">{article.category}</p>
                  <h3><a href={article.url} target="_blank" rel="noreferrer">{article.title}</a></h3>
                  <p>{article.excerpt}</p>
                  <p className="ledgera-credit">Published by <a href={article.sourceUrl} target="_blank" rel="noreferrer">{article.source}</a></p>
                </article>
              ))}
            </div>
          </section>

          <section className="ledgera-originals" aria-labelledby="originals-title">
            <div className="ledgera-section-heading">
              <div>
                <span>03</span>
                <h2 id="originals-title">From the LEDGERA Desk</h2>
              </div>
              <p>LSMG original reporting</p>
            </div>
            <div className="ledgera-original-grid">
              {articles.slice(hero ? 1 : 0, 7).map((article) => (
                <article key={article.slug}>
                  <p className="ledgera-kicker">{article.category}</p>
                  <h3><Link to="/culture-ledger/$articleSlug" params={{ articleSlug: article.slug }}>{article.title}</Link></h3>
                  <p>{article.excerpt}</p>
                  <span>{article.source || 'A LEDGERA Dispatch'} · {timeAgo(article.publishedAt)}</span>
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div id="tribeca-2026" className="ledgera-edition-panel ledgera-tribeca-panel">
          <section className="ledgera-tribeca-hero">
            <p className="ledgera-kicker">Special Coverage / Festival Archive</p>
            <h1>Tribeca <em>2026</em></h1>
            <p>LEDGERA’s dedicated festival desk: film profiles, reporting notes, screening information, and the complete LSMG coverage slate.</p>
            <Link to="/tribeca/schedule" className="ledgera-read-link">Open Festival Schedule <span>↗</span></Link>
          </section>

          <section className="ledgera-tribeca-films" aria-labelledby="tribeca-priority-title">
            <div className="ledgera-section-heading">
              <div>
                <span>01</span>
                <h2 id="tribeca-priority-title">Priority Coverage</h2>
              </div>
              <p>Tribeca 2026</p>
            </div>
            <div className="ledgera-tribeca-grid">
              {featuredFilms.map((film) => (
                <article key={film.slug}>
                  <FullResolutionImage
                    src={film.poster || FALLBACK_IMAGE}
                    fullResolutionSrc={film.poster?.replace('/medium_', '/')}
                    fallbackSrc={FALLBACK_IMAGE}
                    alt={`${film.title} poster`}
                    linkClassName="ledgera-tribeca-image"
                    loading="lazy"
                  >
                    <span>{film.num}</span>
                  </FullResolutionImage>
                  <p className="ledgera-kicker">{film.sectionLabel}</p>
                  <h3><Link to="/tribeca/films/$filmSlug" params={{ filmSlug: film.slug }}>{film.title}</Link></h3>
                  <p>{film.deck}</p>
                  <p className="ledgera-credit">A LEDGERA Dispatch</p>
                </article>
              ))}
            </div>
          </section>

          {tribecaArticles.length > 0 && (
            <section className="ledgera-originals" aria-labelledby="tribeca-dispatches-title">
              <div className="ledgera-section-heading">
                <div>
                  <span>02</span>
                  <h2 id="tribeca-dispatches-title">Tribeca Dispatches</h2>
                </div>
                <p>Red carpets, interviews, and festival features</p>
              </div>
              <div className="ledgera-original-grid">
                {tribecaArticles.map((article) => (
                  <article key={article.slug}>
                    <p className="ledgera-kicker">{article.category}</p>
                    <h3><Link to="/culture-ledger/$articleSlug" params={{ articleSlug: article.slug }}>{article.title}</Link></h3>
                    <p>{article.excerpt}</p>
                    <span>A LEDGERA Dispatch · {timeAgo(article.publishedAt)}</span>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="ledgera-tribeca-notebook">
            <div>
              <p className="ledgera-kicker">More from the slate</p>
              <h2>Festival Notebook</h2>
              {secondaryFilms.map((film) => (
                <article key={film.title}>
                  <span>{film.tag}</span>
                  <h3>{film.title}</h3>
                  <p>{film.blurb}</p>
                </article>
              ))}
            </div>
            <aside>
              <p className="ledgera-kicker">Events & Outdoor Screenings</p>
              {outdoorScreenings.map((event) => (
                <article key={event.title}>
                  <span>{event.tag}</span>
                  <h3>{event.title}</h3>
                  <p>{event.blurb}</p>
                </article>
              ))}
            </aside>
          </section>
        </div>
      )}
    </main>
  )
}
