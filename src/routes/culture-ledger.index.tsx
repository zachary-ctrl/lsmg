import { createFileRoute, Link } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { featuredFilms, outdoorScreenings, secondaryFilms } from '../data/tribeca-films'

export const Route = createFileRoute('/culture-ledger/')({
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
  publishedAt: string
  imageUrl?: string
  featured?: boolean
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

const CATEGORIES = ['All', 'Fashion', 'Beauty', 'Entertainment'] as const
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

function imageFallback(event: React.SyntheticEvent<HTMLImageElement>) {
  if (!event.currentTarget.src.endsWith(FALLBACK_IMAGE)) {
    event.currentTarget.src = FALLBACK_IMAGE
  }
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
  const [articles, setArticles] = useState<Article[]>([])
  const [liveArticles, setLiveArticles] = useState<LiveArticle[]>([])
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const [activeEdition, setActiveEdition] = useState<'daily' | 'tribeca'>('daily')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [feedError, setFeedError] = useState('')
  const [fetchedAt, setFetchedAt] = useState('')
  const [celebrityCover, setCelebrityCover] = useState<CelebrityCover | null>(null)

  useEffect(() => {
    let active = true
    fetch('/api/culture-ledger')
      .then((response) => response.json())
      .then((data) => {
        if (active) setArticles(data.articles || [])
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

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
      if (window.location.hash === '#tribeca-2026') setActiveEdition('tribeca')
    }
    syncEditionWithHash()
    window.addEventListener('hashchange', syncEditionWithHash)
    return () => window.removeEventListener('hashchange', syncEditionWithHash)
  }, [])

  const filteredLiveArticles = useMemo(
    () => activeCategory === 'All'
      ? liveArticles
      : liveArticles.filter((article) => article.category === activeCategory),
    [activeCategory, liveArticles],
  )

  const switchEdition = (edition: 'daily' | 'tribeca') => {
    setActiveEdition(edition)
    const hash = edition === 'tribeca' ? '#tribeca-2026' : '#daily-edition'
    window.history.replaceState(null, '', hash)
    window.requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const hero = articles.find((article) => article.featured) || articles[0]
  const tickerArticles = liveArticles.slice(0, 6)

  return (
    <main className="ledgera-page">
      <div className="ledgera-topline">
        <span>LEDGERA / Vol. 01</span>
        <span>Fashion · Beauty · Entertainment</span>
        <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </div>

      <header className="ledgera-masthead">
        <div className="ledgera-wordmark" aria-label="LEDGERA">
          <span>LEDGE</span><strong>RA</strong>
        </div>
        <div className="ledgera-masthead-rule">
          <span>The Record of Culture</span>
          <span>A Last Shot Media Group Publication</span>
        </div>
      </header>

      <nav className="ledgera-edition-nav" aria-label="LEDGERA editions">
        <button
          type="button"
          className={activeEdition === 'daily' ? 'is-active' : ''}
          onClick={() => switchEdition('daily')}
        >
          Daily Edition
        </button>
        <button
          type="button"
          className={activeEdition === 'tribeca' ? 'is-active' : ''}
          onClick={() => switchEdition('tribeca')}
        >
          Tribeca 2026 / Special Coverage
        </button>
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
              <Link
                to="/culture-ledger/$articleSlug"
                params={{ articleSlug: hero?.slug || 'beyonce-cowboy-carter-reshapes-country-music' }}
                className="ledgera-hero-image"
              >
                <img
                  src={celebrityCover?.imageUrl || FALLBACK_IMAGE}
                  alt={celebrityCover ? `${celebrityCover.name} editorial cover` : 'LEDGERA editorial cover'}
                  onError={imageFallback}
                />
                <span className="ledgera-hero-badge">LEDGERA Original</span>
                {celebrityCover && (
                  <span className="ledgera-cover-credit">Cover rotation: {celebrityCover.name} · Wikimedia</span>
                )}
              </Link>
              <div className="ledgera-story-copy">
                <p className="ledgera-kicker">{hero?.category || 'Culture'} / Lead Story</p>
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
              {filteredLiveArticles.slice(0, 4).map((article, index) => (
                <article key={`${article.source}-${article.title}`} className="ledgera-trend-card">
                  <a href={article.url} target="_blank" rel="noreferrer" className="ledgera-trend-image">
                    <img src={article.imageUrl} alt="" onError={imageFallback} />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </a>
                  <div>
                    <p className="ledgera-kicker">{article.category}</p>
                    <h3><a href={article.url} target="_blank" rel="noreferrer">{article.title}</a></h3>
                    <p className="ledgera-credit">Via <a href={article.sourceUrl} target="_blank" rel="noreferrer">{article.source}</a> · {timeAgo(article.publishedAt)}</p>
                  </div>
                </article>
              ))}
              {!loading && filteredLiveArticles.length === 0 && (
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
            <div className="ledgera-category-tabs" role="group" aria-label="Filter culture stories">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? 'is-active' : ''}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="ledgera-news-grid">
              {filteredLiveArticles.slice(4, 12).map((article, index) => (
                <article key={`${article.url}-${index}`} className={index === 0 ? 'ledgera-news-card is-wide' : 'ledgera-news-card'}>
                  <a href={article.url} target="_blank" rel="noreferrer" className="ledgera-news-image">
                    <img src={article.imageUrl} alt="" loading="lazy" onError={imageFallback} />
                  </a>
                  <p className="ledgera-kicker">{article.category}</p>
                  <h3><a href={article.url} target="_blank" rel="noreferrer">{article.title}</a></h3>
                  <p>{article.excerpt}</p>
                  <p className="ledgera-credit">Original reporting: <a href={article.sourceUrl} target="_blank" rel="noreferrer">{article.source}</a></p>
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
                  <span>{article.author} · {timeAgo(article.publishedAt)}</span>
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
                  <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: film.slug }} className="ledgera-tribeca-image">
                    {film.poster && <img src={film.poster} alt="" loading="lazy" onError={imageFallback} />}
                    <span>{film.num}</span>
                  </Link>
                  <p className="ledgera-kicker">{film.sectionLabel}</p>
                  <h3><Link to="/tribeca/films/$filmSlug" params={{ filmSlug: film.slug }}>{film.title}</Link></h3>
                  <p>{film.deck}</p>
                </article>
              ))}
            </div>
          </section>

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
