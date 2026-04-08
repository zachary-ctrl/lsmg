import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'

export const Route = createFileRoute('/culture-ledger/')({
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

function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    Music: '#C8102E',
    Entertainment: '#8B5CF6',
    Fashion: '#EC4899',
    Business: '#F59E0B',
    Celebrity: '#EF4444',
    Sports: '#10B981',
    'Tech & Culture': '#3B82F6',
    Culture: '#C8102E',
  }
  return map[category] || 'var(--red)'
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
  const fetchLiveFeed = useCallback((forceRefresh = false) => {
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
      .catch((err) => {
        setLiveError('Failed to fetch live feed. Please try again.')
      })
      .finally(() => {
        setLiveLoading(false)
        setIsRefreshing(false)
      })
  }, [activeCategory])

  useEffect(() => {
    fetchLiveFeed()
    // Auto-refresh live feed every 30 seconds
    const interval = setInterval(fetchLiveFeed, 30000)
    return () => clearInterval(interval)
  }, [fetchLiveFeed])

  const allCategories = ['All', 'Music', 'Entertainment', 'Fashion', 'Business', 'Sports', 'Tech & Culture', 'Celebrity', 'Culture']
  const filtered = activeCategory === 'All' ? articles : articles.filter((a) => a.category === activeCategory)

  // For the ticker, use live articles
  const tickerArticles = liveArticles.slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)', background: 'linear-gradient(135deg,#080808 0%,#0d0002 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>LSMG Publication</span>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: '.88' }}>
            The LSMG <span style={{ color: 'var(--red)' }}>Ledger</span>
          </h1>
          <p style={{ fontSize: 20, color: '#b3b3b3', maxWidth: 700, marginTop: 24, lineHeight: 1.75 }}>Pop culture, music, entertainment, and media — through the LSMG lens. Original editorial coverage plus live stories from across the web.</p>
          <div className="flex items-center gap-4 mt-6">
            <span className="flex items-center gap-2">
              <span style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#4ade80' }}>LIVE</span>
            </span>
            <span style={{ width: 4, height: 4, background: 'var(--red)', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f' }}>BY LSMG</span>
            <span style={{ width: 4, height: 4, background: 'var(--red)', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f' }}>UPDATED IN REAL TIME</span>
          </div>
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div style={{ background: 'var(--red)', padding: '10px 0', overflow: 'hidden' }}>
        <div className="flex items-center gap-8" style={{ animation: 'ticker 30s linear infinite', whiteSpace: 'nowrap' }}>
          {[...tickerArticles, ...tickerArticles].map((item, i) => (
            <span key={i} className="flex items-center gap-3">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,.6)' }}>TRENDING</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: '#fff' }}>{item.title}</span>
              <span style={{ width: 6, height: 6, background: 'rgba(255,255,255,.3)', borderRadius: '50%', display: 'inline-block' }} />
            </span>
          ))}
        </div>
      </div>

      {/* Tab Switcher */}
      <section style={{ padding: '32px 40px 0', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-0 border-b border-[#1a1a1a]">
            <button
              onClick={() => setActiveTab('lsmg')}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: 3,
                padding: '16px 28px',
                color: activeTab === 'lsmg' ? 'var(--white)' : '#8f8f8f',
                background: 'transparent',
                cursor: 'pointer',
                border: 'none',
                borderBottomWidth: 2,
                borderBottomStyle: 'solid',
                borderBottomColor: activeTab === 'lsmg' ? 'var(--red)' : 'transparent',
              }}
            >
              LSMG ORIGINALS
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: 3,
                padding: '16px 28px',
                color: activeTab === 'trending' ? 'var(--white)' : '#8f8f8f',
                background: 'transparent',
                cursor: 'pointer',
                border: 'none',
                borderBottomWidth: 2,
                borderBottomStyle: 'solid',
                borderBottomColor: activeTab === 'trending' ? 'var(--red)' : 'transparent',
              }}
            >
              TRENDING NOW
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{ padding: '24px 40px 0', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <button
                key={cat}
                data-category={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: 3,
                  padding: '8px 16px',
                  background: activeCategory === cat ? getCategoryColor(cat) : 'transparent',
                  color: activeCategory === cat ? '#fff' : '#8f8f8f',
                  border: activeCategory === cat ? 'none' : '1px solid #222',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
                className="hover:opacity-85 transition-opacity"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LSMG Originals Tab */}
      {activeTab === 'lsmg' && (
        <section style={{ padding: '40px 40px 80px', background: '#060606' }}>
          <div className="max-w-[1400px] mx-auto">
            {loading ? (
              <div id="news-feed" className="text-center" style={{ padding: '80px 0' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 3, color: '#8f8f8f' }}>LOADING ARTICLES...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center" style={{ padding: '80px 0' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 3, color: '#8f8f8f' }}>NO ARTICLES YET</span>
              </div>
            ) : (
              <>
                {/* Featured Hero Article */}
                {filtered.length > 0 && (
                  <Link
                    to="/culture-ledger/$articleSlug"
                    params={{ articleSlug: filtered[0].slug }}
                    className="block mb-6 group relative overflow-hidden"
                    style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
                        {filtered[0].imageUrl ? (
                          <img src={filtered[0].imageUrl} alt={filtered[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" style={{ position: 'absolute', inset: 0 }} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #111 0%, #0d0002 100%)', position: 'absolute', inset: 0 }}>
                            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 120, color: 'rgba(200,16,46,.08)' }}>LSMG</span>
                          </div>
                        )}
                        <div style={{ position: 'absolute', top: 16, left: 16 }}>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, padding: '5px 12px', background: getCategoryColor(filtered[0].category), color: '#fff' }}>{filtered[0].category.toUpperCase()}</span>
                        </div>
                      </div>
                      <div style={{ padding: '40px 36px' }} className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: 'var(--red)', border: '1px solid rgba(200,16,46,.3)', padding: '3px 8px' }}>FEATURED</span>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: '#808080' }}>{timeAgo(filtered[0].publishedAt)}</span>
                        </div>
                        <h2 className="group-hover:text-[var(--red)] transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: '.94', marginBottom: 16 }}>{filtered[0].title}</h2>
                        <p style={{ fontSize: 15, color: '#b3b3b3', lineHeight: 1.75, marginBottom: 20 }}>{filtered[0].excerpt}</p>
                        <div className="flex items-center gap-3">
                          <div style={{ width: 28, height: 28, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, color: '#fff' }}>{filtered[0].author.charAt(0)}</span>
                          </div>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#8f8f8f' }}>{filtered[0].author.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Article Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px]" style={{ background: '#1a1a1a' }}>
                  {filtered.slice(1).map((article) => (
                    <Link
                      key={article.slug}
                      to="/culture-ledger/$articleSlug"
                      params={{ articleSlug: article.slug }}
                      className="group flex flex-col"
                      style={{ background: '#0a0a0a' }}
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                        {article.imageUrl ? (
                          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #111 0%, #080808 100%)' }}>
                            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: 'rgba(200,16,46,.1)' }}>LSMG</span>
                          </div>
                        )}
                        <div style={{ position: 'absolute', top: 10, left: 10 }}>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, padding: '4px 8px', background: getCategoryColor(article.category), color: '#fff' }}>{article.category.toUpperCase()}</span>
                        </div>
                      </div>
                      <div style={{ padding: '16px 18px 20px' }} className="flex flex-col flex-1">
                        <h3 className="group-hover:text-[var(--red)] transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, lineHeight: 1.05, marginBottom: 8, flex: 1 }}>{article.title}</h3>
                        <p style={{ fontSize: 13, color: '#8f8f8f', lineHeight: 1.6, marginBottom: 12 }}>{article.excerpt.length > 100 ? article.excerpt.slice(0, 100) + '...' : article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div style={{ width: 20, height: 20, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 9, color: '#fff' }}>{article.author.charAt(0)}</span>
                            </div>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 1, color: '#808080' }}>{article.author.toUpperCase()}</span>
                          </div>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#707070' }}>{timeAgo(article.publishedAt)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Trending / Live Feed Tab */}
      {activeTab === 'trending' && (
        <section style={{ padding: '40px 40px 80px', background: '#060606' }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2">
                  <span style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: '#4ade80' }}>LIVE FEED</span>
                </span>
                <span style={{ width: 4, height: 4, background: 'var(--red)', borderRadius: '50%', display: 'inline-block' }} />
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#8f8f8f' }}>ACROSS THE WEB</span>
              </div>
              <div className="flex items-center gap-3">
                {liveFetchedAt && (
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: '#707070' }}>
                    UPDATED {timeAgo(liveFetchedAt)}
                  </span>
                )}
                <button
                  onClick={() => fetchLiveFeed(true)}
                  className="hover:opacity-75 transition-opacity"
                  disabled={isRefreshing}
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, padding: '6px 14px', color: 'var(--red)', border: '1px solid rgba(200,16,46,.3)', background: 'transparent', cursor: 'pointer' }}
                >
                  {isRefreshing ? 'REFRESHING...' : 'REFRESH'}
                </button>
              </div>
            </div>

            {liveLoading && liveArticles.length === 0 ? (
              <div className="text-center" style={{ padding: '80px 0' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 3, color: '#8f8f8f' }}>LOADING LIVE FEED...</span>
              </div>
            ) : liveArticles.length === 0 ? (
              <div className="text-center" style={{ padding: '80px 0' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 3, color: '#8f8f8f' }}>
                  {liveError || 'NO TRENDING ARTICLES IN THIS CATEGORY'}
                </span>
                {liveError && (
                  <div style={{ marginTop: 16 }}>
                    <button
                      onClick={() => fetchLiveFeed(true)}
                      disabled={isRefreshing}
                      style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, padding: '8px 20px', color: 'var(--red)', border: '1px solid rgba(200,16,46,.3)', background: 'transparent', cursor: 'pointer' }}
                    >
                      {isRefreshing ? 'RETRYING...' : 'TRY AGAIN'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Hero — large featured card */}
                <a
                  href={liveArticles[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-6 group relative overflow-hidden"
                  style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}
                >
                  <div className="relative" style={{ aspectRatio: '21/9', minHeight: 280 }}>
                    <img src={liveArticles[0].imageUrl} alt={liveArticles[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.9) 0%, rgba(0,0,0,.3) 40%, transparent 100%)' }} />
                    <div className="absolute bottom-0 left-0 right-0" style={{ padding: '32px 36px' }}>
                      <div className="flex items-center gap-3 mb-3">
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, padding: '4px 10px', background: getCategoryColor(liveArticles[0].category), color: '#fff' }}>{liveArticles[0].category.toUpperCase()}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,.5)', border: '1px solid rgba(255,255,255,.15)', padding: '3px 8px' }}>{liveArticles[0].source.toUpperCase()}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'rgba(255,255,255,.4)' }}>{timeAgo(liveArticles[0].publishedAt)}</span>
                      </div>
                      <h2 className="group-hover:text-[var(--red)] transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: '.96', color: '#fff', marginBottom: 8 }}>{liveArticles[0].title}</h2>
                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,.6)', maxWidth: 600 }}>{liveArticles[0].excerpt}</p>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-2" style={{ background: 'rgba(0,0,0,.6)', padding: '6px 12px', backdropFilter: 'blur(4px)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'rgba(255,255,255,.6)' }}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, color: 'rgba(255,255,255,.6)' }}>EXTERNAL</span>
                    </div>
                  </div>
                </a>

                {/* Live article grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px]" style={{ background: '#1a1a1a' }}>
                  {liveArticles.slice(1).map((article, i) => (
                    <a
                      key={`${article.title.substring(0, 30)}-${i}`}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col"
                      style={{ background: '#0a0a0a' }}
                    >
                      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-0 left-0 right-0 flex items-center justify-between" style={{ padding: '10px' }}>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, padding: '4px 8px', background: getCategoryColor(article.category), color: '#fff' }}>{article.category.toUpperCase()}</span>
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 1, padding: '4px 8px', background: 'rgba(0,0,0,.7)', color: 'rgba(255,255,255,.6)', backdropFilter: 'blur(4px)' }}>{article.source.toUpperCase()}</span>
                        </div>
                      </div>
                      <div style={{ padding: '16px 18px 20px' }} className="flex flex-col flex-1">
                        <h3 className="group-hover:text-[var(--red)] transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, lineHeight: 1.05, marginBottom: 8, flex: 1 }}>{article.title}</h3>
                        <p style={{ fontSize: 12, color: '#8f8f8f', lineHeight: 1.6, marginBottom: 10 }}>{article.excerpt.length > 90 ? article.excerpt.slice(0, 90) + '...' : article.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 1, color: '#808080' }}>{article.source.toUpperCase()}</span>
                          <div className="flex items-center gap-2">
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#707070' }}>{timeAgo(article.publishedAt)}</span>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#707070" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* About The Culture Ledger */}
      <section style={{ padding: '100px 40px', background: 'var(--black)', borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-[800px] mx-auto text-center">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>About</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '16px 0' }}>
            The LSMG <span style={{ color: 'var(--red)' }}>Ledger</span>
          </h2>
          <p style={{ fontSize: 18, color: '#b3b3b3', marginBottom: 24, lineHeight: 1.75 }}>The LSMG Ledger is LSMG's daily editorial publication covering pop culture, music, entertainment, fashion, and media. No spin, no agenda — just the culture as it happens. Live-curated stories from across the web alongside LSMG originals.</p>
          <p style={{ fontSize: 15, color: '#8f8f8f', lineHeight: 1.75 }}>Published by Last Shot Media Group. Written by our editorial team with contributions from guest writers across the industry.</p>
        </div>
      </section>
    </div>
  )
}
