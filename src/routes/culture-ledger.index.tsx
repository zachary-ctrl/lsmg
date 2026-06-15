import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import {
  featuredFilms,
  secondaryFilms,
  outdoorScreenings,
} from '../data/tribeca-films'

export const Route = createFileRoute('/culture-ledger/')({
  head: () => ({
    meta: [
      {
        title:
          'The LSMG Ledger — Culture, Music & Tribeca 2026 Coverage',
      },
      {
        name: 'description',
        content:
          "The LSMG Ledger is Last Shot Media Group's daily editorial publication — pop culture, music, entertainment, and complete on-the-ground Tribeca 2026 coverage. Independent press.",
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
  source?: string
  sourceUrl?: string
  featured?: boolean
  tags?: string[]
}

interface LiveArticle {
  title: string
  excerpt: string
  category: string
  source: string
  imageUrl: string
  url: string
  publishedAt: string
}

function timeAgo(date: string) {
  const now = new Date()
  const then = new Date(date)
  const diff = now.getTime() - then.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function CultureLedgerPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [liveArticles, setLiveArticles] = useState<LiveArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [liveLoading, setLiveLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeTab, setActiveTab] = useState<'lsmg' | 'trending'>('lsmg')
  const [liveFetchedAt, setLiveFetchedAt] = useState('')
  const [liveError, setLiveError] = useState('')

  // Fetch LSMG original articles
  useEffect(() => {
    let active = true

    function fetchArticles() {
      fetch('/api/culture-ledger')
        .then((res) => res.json())
        .then((data) => {
          if (active) {
            setArticles(data.articles || [])
            setLoading(false)
          }
        })
        .catch(() => {
          if (active) setLoading(false)
        })
    }

    fetchArticles()
    const interval = setInterval(fetchArticles, 15000)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  // Fetch live RSS feed articles
  const fetchLiveFeed = useCallback(
    (forceRefresh = false) => {
      if (forceRefresh) {
        setIsRefreshing(true)
      } else {
        setLiveLoading(true)
      }
      setLiveError('')
      const params = new URLSearchParams()
      if (activeCategory !== 'All') params.set('category', activeCategory)
      if (forceRefresh) params.set('refresh', '1')
      params.set('_ts', Date.now().toString())
      const query = params.toString()
      fetch(`/api/live-feed${query ? `?${query}` : ''}`, { cache: 'no-store' })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        })
        .then((data) => {
          setLiveArticles(data.articles || [])
          setLiveFetchedAt(data.fetchedAt || '')
          if (data.error) {
            setLiveError(data.error)
          }
        })
        .catch(() => {
          setLiveError('Failed to fetch live feed. Please try again.')
        })
        .finally(() => {
          setLiveLoading(false)
          setIsRefreshing(false)
        })
    },
    [activeCategory],
  )

  useEffect(() => {
    fetchLiveFeed()
    // Auto-refresh live feed every 30 seconds
    const interval = setInterval(fetchLiveFeed, 30000)
    return () => clearInterval(interval)
  }, [fetchLiveFeed])

  const allCategories = ['All', 'Music', 'Entertainment', 'Fashion', 'Business', 'Sports', 'Tech & Culture', 'Celebrity', 'Culture']
  const filtered = activeCategory === 'All' ? articles : articles.filter((a) => a.category === activeCategory)
  const tickerArticles = liveArticles.slice(0, 6)

  return (
    <div className="tribeca-page">
      {/* TOP BAR */}
      <div className="tc-topbar">
        <div className="tc-topbar-inner">
          <div className="tc-topbar-left">
            <span>The LSMG Ledger</span>
            <span className="tc-dot">&#9679;</span>
            <span>Culture · Music · Entertainment</span>
            <span className="tc-dot">&#9679;</span>
            <span>Updated in Real Time</span>
          </div>
          <div>Independent Press — Daily Edition</div>
        </div>
      </div>

      {/* MASTHEAD */}
      <header className="tc-masthead">
        <div className="tc-masthead-inner">
          <div className="tc-masthead-meta">
            <div>Volume 1</div>
            <div>The Daily Edition</div>
          </div>
          <div>
            <h1 className="tc-masthead-title">
              The LSMG
              <br />
              <em>Ledger</em>
            </h1>
          </div>
          <div className="tc-masthead-meta tc-right">
            <div>lastshotmediagroup.com</div>
            <div>Dallas → New York</div>
          </div>
        </div>
        <div className="tc-masthead-divider">
          <hr />
          <span>Culture, Music &amp; Media — with Special Tribeca 2026 Coverage</span>
          <hr />
          <hr />
        </div>
      </header>

      {/* SUB-NAV */}
      <nav className="tc-nav">
        <div className="tc-nav-inner">
          <a href="#daily" className="tc-current">
            Daily Edition
          </a>
          <a href="#tribeca-coverage">Tribeca 2026</a>
          <Link to="/tribeca/schedule">Festival Schedule</Link>
          {featuredFilms.slice(0, 3).map((f) => (
            <Link key={f.slug} to="/tribeca/films/$filmSlug" params={{ filmSlug: f.slug }}>
              {f.title}
            </Link>
          ))}
        </div>
      </nav>

      {/* BREAKING TICKER */}
      {tickerArticles.length > 0 && (
        <div style={{ background: 'var(--tc-ink)', padding: '10px 0', overflow: 'hidden', borderBottom: '4px solid var(--tc-red)' }}>
          <div className="flex items-center gap-8" style={{ animation: 'ticker 30s linear infinite', whiteSpace: 'nowrap' }}>
            {[...tickerArticles, ...tickerArticles].map((item, i) => (
              <span key={i} className="flex items-center gap-3">
                <span style={{ fontFamily: 'var(--tc-mono)', fontSize: 10, letterSpacing: 2, color: 'var(--tc-red)' }}>TRENDING</span>
                <span style={{ fontFamily: 'var(--tc-serif)', fontWeight: 900, fontSize: 16, color: 'var(--tc-cream)' }}>{item.title}</span>
                <span style={{ width: 6, height: 6, background: 'var(--tc-red)', borderRadius: '50%', display: 'inline-block' }} />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* LEAD */}
      <section className="tc-lead">
        <div className="tc-lead-tag">
          &#9679; The LSMG Ledger &#9679; Pop Culture, Music &amp; Media
        </div>
        <h2 className="tc-lead-headline">
          The Culture, <em>As It Happens</em>
        </h2>
        <p className="tc-lead-deck">
          Last Shot Media Group's daily editorial publication — original
          reporting on music, entertainment, fashion, and media, alongside
          live-curated stories from across the web and complete on-the-ground
          coverage of the 2026 Tribeca Festival.
        </p>
        <p className="tc-lead-byline">
          <strong>The LSMG Editorial Desk</strong> &nbsp;—&nbsp; Independent
          Press &nbsp;|&nbsp; Dallas, Orlando, New York &amp; Atlanta
        </p>
      </section>

      {/* DAILY EDITION */}
      <section id="daily" className="tc-section">
        <div className="tc-section-header">
          <span className="tc-section-num">▸</span>
          <h2 className="tc-section-title">The Daily Ledger</h2>
          <span className="tc-section-meta">Originals &amp; Live Feed</span>
        </div>

        {/* Tab + Category controls */}
        <div className="lg-controls">
          <div className="lg-tabs">
            <button
              type="button"
              onClick={() => setActiveTab('lsmg')}
              className={activeTab === 'lsmg' ? 'lg-tab lg-tab-active' : 'lg-tab'}
            >
              LSMG Originals
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('trending')}
              className={activeTab === 'trending' ? 'lg-tab lg-tab-active' : 'lg-tab'}
            >
              Trending Now
            </button>
          </div>
          <div className="lg-cats">
            {allCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? 'lg-cat lg-cat-active' : 'lg-cat'}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LSMG ORIGINALS */}
      {activeTab === 'lsmg' && (
        <div className="tc-films">
          {loading ? (
            <p style={{ textAlign: 'center', fontFamily: 'var(--tc-mono)', fontSize: 12, letterSpacing: 3, color: 'var(--tc-gray)', padding: '60px 0', textTransform: 'uppercase' }}>
              Loading articles…
            </p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: 'center', fontFamily: 'var(--tc-mono)', fontSize: 12, letterSpacing: 3, color: 'var(--tc-gray)', padding: '60px 0', textTransform: 'uppercase' }}>
              No articles yet
            </p>
          ) : (
            <>
              {/* Lead story */}
              <article className="tc-film-feature">
                <Link
                  to="/culture-ledger/$articleSlug"
                  params={{ articleSlug: filtered[0].slug }}
                  className="tc-film-feature-thumb"
                  data-num="01"
                  data-section={filtered[0].category}
                  style={{ display: 'block' }}
                >
                  <div className="tc-film-feature-thumb-bg" style={{ background: 'linear-gradient(135deg,#1a0a0a,#0a0a1a)' }} />
                  {filtered[0].imageUrl && (
                    <img
                      className="tc-poster-img"
                      src={filtered[0].imageUrl}
                      alt={filtered[0].title}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  )}
                </Link>
                <div>
                  <div className="tc-credits">
                    {filtered[0].author} · {timeAgo(filtered[0].publishedAt)}
                  </div>
                  <h3>
                    <Link to="/culture-ledger/$articleSlug" params={{ articleSlug: filtered[0].slug }}>
                      {filtered[0].title}
                    </Link>
                  </h3>
                  <p className="tc-deck">{filtered[0].excerpt}</p>
                  <div className="tc-tag-row">
                    <span className="tc-tag tc-red-tag">{filtered[0].category}</span>
                    <span className="tc-tag">Featured</span>
                  </div>
                  <Link to="/culture-ledger/$articleSlug" params={{ articleSlug: filtered[0].slug }} className="tc-read">
                    Read Article →
                  </Link>
                </div>
              </article>

              {/* Grid */}
              <div className="tc-films-grid">
                {filtered.slice(1).map((article) => (
                  <article key={article.slug} className="tc-film-card">
                    {article.imageUrl && (
                      <Link
                        to="/culture-ledger/$articleSlug"
                        params={{ articleSlug: article.slug }}
                        className="tc-film-card-poster"
                      >
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          loading="lazy"
                          onError={(e) => {
                            const parent = e.currentTarget.parentElement
                            if (parent) parent.style.display = 'none'
                          }}
                        />
                      </Link>
                    )}
                    <div className="tc-film-card-tag">{article.category}</div>
                    <h4>
                      <Link to="/culture-ledger/$articleSlug" params={{ articleSlug: article.slug }}>
                        {article.title}
                      </Link>
                    </h4>
                    <div className="tc-credits">{article.author}</div>
                    <p className="tc-blurb">{article.excerpt.length > 120 ? article.excerpt.slice(0, 120) + '…' : article.excerpt}</p>
                    <div className="tc-dates">
                      <strong>{timeAgo(article.publishedAt)}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* TRENDING / LIVE FEED */}
      {activeTab === 'trending' && (
        <div className="tc-films">
          <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--tc-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--tc-red)' }}>
              ● Live Feed — Across the Web
            </span>
            <div className="flex items-center gap-3">
              {liveFetchedAt && (
                <span style={{ fontFamily: 'var(--tc-mono)', fontSize: 9, letterSpacing: 2, color: 'var(--tc-gray)', textTransform: 'uppercase' }}>
                  Updated {timeAgo(liveFetchedAt)}
                </span>
              )}
              <button
                type="button"
                onClick={() => fetchLiveFeed(true)}
                disabled={isRefreshing}
                style={{ fontFamily: 'var(--tc-mono)', fontSize: 9, letterSpacing: 2, padding: '6px 14px', color: 'var(--tc-red)', border: '1px solid var(--tc-red)', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                {isRefreshing ? 'Refreshing…' : 'Refresh'}
              </button>
            </div>
          </div>

          {liveLoading && liveArticles.length === 0 ? (
            <p style={{ textAlign: 'center', fontFamily: 'var(--tc-mono)', fontSize: 12, letterSpacing: 3, color: 'var(--tc-gray)', padding: '60px 0', textTransform: 'uppercase' }}>
              Loading live feed…
            </p>
          ) : liveArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontFamily: 'var(--tc-mono)', fontSize: 12, letterSpacing: 3, color: 'var(--tc-gray)', textTransform: 'uppercase' }}>
                {liveError || 'No trending articles in this category'}
              </p>
              {liveError && (
                <button
                  type="button"
                  onClick={() => fetchLiveFeed(true)}
                  disabled={isRefreshing}
                  style={{ marginTop: 16, fontFamily: 'var(--tc-mono)', fontSize: 10, letterSpacing: 2, padding: '8px 20px', color: 'var(--tc-red)', border: '1px solid var(--tc-red)', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  {isRefreshing ? 'Retrying…' : 'Try Again'}
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Lead story */}
              <article className="tc-film-feature">
                <a
                  href={liveArticles[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tc-film-feature-thumb"
                  data-num=""
                  data-section={liveArticles[0].source}
                  style={{ display: 'block' }}
                >
                  <div className="tc-film-feature-thumb-bg" style={{ background: 'linear-gradient(135deg,#0a0a0a,#1a1a2e)' }} />
                  <img className="tc-poster-img" src={liveArticles[0].imageUrl} alt={liveArticles[0].title} loading="lazy" />
                </a>
                <div>
                  <div className="tc-credits">
                    {liveArticles[0].source} · {timeAgo(liveArticles[0].publishedAt)}
                  </div>
                  <h3>
                    <a href={liveArticles[0].url} target="_blank" rel="noopener noreferrer">
                      {liveArticles[0].title}
                    </a>
                  </h3>
                  <p className="tc-deck">{liveArticles[0].excerpt}</p>
                  <div className="tc-tag-row">
                    <span className="tc-tag tc-red-tag">{liveArticles[0].category}</span>
                    <span className="tc-tag">External</span>
                  </div>
                  <a href={liveArticles[0].url} target="_blank" rel="noopener noreferrer" className="tc-read">
                    Read at {liveArticles[0].source} →
                  </a>
                </div>
              </article>

              {/* Grid */}
              <div className="tc-films-grid">
                {liveArticles.slice(1).map((article, i) => (
                  <article key={`${article.title.substring(0, 24)}-${i}`} className="tc-film-card">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="tc-film-card-poster">
                      <img src={article.imageUrl} alt={article.title} loading="lazy" />
                    </a>
                    <div className="tc-film-card-tag">{article.category} · {article.source}</div>
                    <h4>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                      </a>
                    </h4>
                    <p className="tc-blurb">{article.excerpt.length > 110 ? article.excerpt.slice(0, 110) + '…' : article.excerpt}</p>
                    <div className="tc-dates">
                      <strong>{timeAgo(article.publishedAt)}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* TRIBECA 2026 SPECIAL COVERAGE */}
      <section id="tribeca-coverage" className="tc-section">
        <div className="tc-section-header">
          <span className="tc-section-num">▸</span>
          <h2 className="tc-section-title">Tribeca 2026 — Special Coverage</h2>
          <span className="tc-section-meta">June 3–14, 2026 · New York City</span>
        </div>
      </section>

      <section className="tc-lead" style={{ marginTop: '1rem' }}>
        <div className="tc-lead-tag">
          &#9679; Live From New York &#9679; June 3–14, 2026
        </div>
        <h2 className="tc-lead-headline">
          Tribeca at <em>25</em>
        </h2>
        <p className="tc-lead-deck">
          The LSMG Ledger is credentialed press at the 2026 Tribeca Festival —
          five team members on the ground across twelve days, covering the films,
          the conversations, the games, and the culture that define this moment
          in independent cinema.
        </p>
        <p className="tc-lead-byline">
          <strong>Zachary Heneden</strong> &nbsp;—&nbsp; Editor in Chief
          &nbsp;|&nbsp; Last Shot Media Group &nbsp;|&nbsp; Dallas → New York
        </p>
      </section>

      {/* FEATURED FILMS */}
      <main className="tc-films">
        {featuredFilms.map((film) => (
          <article key={film.slug} className="tc-film-feature">
            <div
              className="tc-film-feature-thumb"
              data-num={film.num}
              data-section={film.sectionLabel}
            >
              <div
                className="tc-film-feature-thumb-bg"
                style={{ background: film.gradient }}
              />
              {film.poster && (
                <img
                  className="tc-poster-img"
                  src={film.poster}
                  alt={`${film.title} — official Tribeca Festival still`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              )}
            </div>
            <div>
              <div className="tc-credits">{film.director}</div>
              <h3>
                <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: film.slug }}>
                  {film.title}
                </Link>
              </h3>
              <p className="tc-deck">{film.deck}</p>
              <div className="tc-tag-row">
                {film.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`tc-tag${tag.variant === 'red' ? ' tc-red-tag' : ''}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="tc-meta">
                {film.screenings.map((s, i) => (
                  <div key={i}>
                    <strong>{s.date}</strong> {s.details}
                  </div>
                ))}
              </div>
              <Link
                to="/tribeca/films/$filmSlug"
                params={{ filmSlug: film.slug }}
                className="tc-read"
              >
                Read Coverage →
              </Link>
              {film.spotify && (
                <div className="tc-podcast">
                  <div className="tc-podcast-label">
                    ▶ The Last Shot Podcast — Tribeca 2026 Interview
                  </div>
                  <iframe
                    className="tc-podcast-embed"
                    src={`https://open.spotify.com/embed/episode/${film.spotify.episodeId}`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={film.spotify.title}
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </main>

      {/* SECONDARY GRID */}
      <section className="tc-section">
        <div className="tc-section-header">
          <span className="tc-section-num">▸</span>
          <h2 className="tc-section-title">Full Coverage — 30+ Films</h2>
          <span className="tc-section-meta">June 3–14, 2026</span>
        </div>
      </section>

      <div className="tc-films">
        <div className="tc-films-grid">
          {secondaryFilms.map((film, i) => (
            <article key={i} className="tc-film-card">
              {film.poster && (
                <a
                  className="tc-film-card-poster"
                  href={film.tribecaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${film.title} on the Tribeca Festival site`}
                >
                  <img
                    src={film.poster}
                    alt={`${film.title} — official Tribeca Festival still`}
                    loading="lazy"
                    onError={(e) => {
                      const parent = e.currentTarget.parentElement
                      if (parent) parent.style.display = 'none'
                    }}
                  />
                </a>
              )}
              <div className="tc-film-card-tag">{film.tag}</div>
              <h4>
                {film.slug ? (
                  <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: film.slug }}>
                    {film.title}
                  </Link>
                ) : (
                  film.title
                )}
              </h4>
              <div className="tc-credits">{film.credits}</div>
              <p className="tc-blurb">{film.blurb}</p>
              <div className="tc-dates">
                <strong>{film.dates}</strong>
              </div>
              {film.spotify && (
                <div className="tc-podcast tc-podcast-card">
                  <div className="tc-podcast-label">
                    ▶ The Last Shot Podcast Interview
                  </div>
                  <iframe
                    className="tc-podcast-embed"
                    src={`https://open.spotify.com/embed/episode/${film.spotify.episodeId}`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={film.spotify.title}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* 25TH ANNIVERSARY OUTDOOR */}
      <section className="tc-section">
        <div className="tc-section-header">
          <span className="tc-section-num">▸</span>
          <h2 className="tc-section-title">
            25th Anniversary — Free Outdoor Screenings
          </h2>
          <span className="tc-section-meta">
            Hudson Yards — Nightly 7 PM, Jun 4–14
          </span>
        </div>
        <div className="tc-films-grid">
          {outdoorScreenings.map((film, i) => (
            <article key={i} className="tc-film-card">
              <div className="tc-film-card-tag">{film.tag}</div>
              <h4>{film.title}</h4>
              <div className="tc-credits">{film.credits}</div>
              <p className="tc-blurb">{film.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tc-footer">
        <div className="tc-footer-inner">
          <div className="tc-footer-top">
            <div className="tc-footer-brand">
              <h2>
                The LSMG <em>Ledger</em>
              </h2>
              <p>
                The daily editorial publication of Last Shot Media Group.
                Independent press — Dallas-based, internationally credentialed.
                Covering the films, artists, and stories that deserve attention.
              </p>
            </div>
            <div className="tc-footer-col">
              <h4>Tribeca 2026</h4>
              <a href="#tribeca-coverage">All Coverage</a>
              <Link to="/tribeca/schedule">Daily Schedule</Link>
              <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: 'mexicanamerican' }}>
                MEXICANAMERICAN
              </Link>
              <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: 'harvest' }}>
                HARVEST
              </Link>
              <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: 'airport-blvd' }}>
                AIRPORT BLVD
              </Link>
            </div>
            <div className="tc-footer-col">
              <h4>Last Shot Media Group</h4>
              <Link to="/">Website</Link>
              <a
                href="https://podcasts.apple.com/us/podcast/the-last-shot-podcast/id1494831568"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Podcasts
              </a>
              <a
                href="https://open.spotify.com/show/0RqHPKHBk4sHPuJTNqpLia"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spotify
              </a>
              <a
                href="https://www.instagram.com/lastshotmediagroup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="tc-footer-bottom">
            <span>
              &copy; 2026 Last Shot Media Group Holdings. The LSMG Ledger. All
              Rights Reserved.
            </span>
            <span>Independent Press — Daily Edition</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
