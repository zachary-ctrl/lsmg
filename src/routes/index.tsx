import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: 'Last Shot Media Group | Where Creativity Becomes Capital' },
      {
        name: 'description',
        content:
          'Last Shot Media Group is an independent creative holding company spanning talent representation, public relations, booking, media production, communications, licensing and original content.',
      },
    ],
  }),
})

interface TickerItem {
  id: number
  text: string
  linkUrl: string | null
  linkType: string
  isActive: boolean
}

function LiveTicker() {
  const [items, setItems] = useState<TickerItem[]>([])

  useEffect(() => {
    const load = () => {
      fetch('/api/live-ticker')
        .then((res) => res.json())
        .then((data) => setItems(data.items || []))
        .catch(() => {})
    }
    load()
    const interval = setInterval(load, 30000)
    return () => clearInterval(interval)
  }, [])

  if (items.length === 0) return null

  return (
    <div style={{ background: '#0a0002', borderBottom: '1px solid rgba(255,255,255,.1)', overflow: 'hidden' }}>
      <div className="editorial-container" style={{ minHeight: 42, display: 'flex', alignItems: 'center', gap: 16 }}>
        <span className="editorial-kicker" style={{ whiteSpace: 'nowrap' }}>● LIVE</span>
        <div style={{ display: 'flex', overflow: 'hidden', whiteSpace: 'nowrap', gap: 32 }}>
          {items.slice(0, 4).map((item) => {
            if (item.linkUrl) {
              const external = item.linkType === 'external' || item.linkUrl.startsWith('http')
              return external ? (
                <a key={item.id} href={item.linkUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#bcbcbc' }}>{item.text}</a>
              ) : (
                <a key={item.id} href={item.linkUrl} style={{ fontSize: 12, color: '#bcbcbc' }}>{item.text}</a>
              )
            }
            return <span key={item.id} style={{ fontSize: 12, color: '#bcbcbc' }}>{item.text}</span>
          })}
        </div>
      </div>
    </div>
  )
}

const marquee = [
  'Talent Representation',
  'Public Relations',
  'Talent Booking',
  'Media Production',
  'Communications',
  'Licensing & IP',
  'LSMG Studios',
  'Dallas · Orlando · New York · Atlanta',
]

function HomePage() {
  return (
    <div className="editorial-shell">
      <LiveTicker />

      <section className="home-hero">
        <div className="editorial-container home-hero-grid">
          <div>
            <span className="editorial-kicker">Independent creative holding company · Est. 2022</span>
            <h1 className="editorial-display home-hero-title">
              LAST SHOT<br /><span className="editorial-red">MEDIA</span><br />GROUP
            </h1>
            <p className="home-hero-tagline">Where Creativity Becomes Capital.</p>
            <p className="home-hero-copy">
              An independent creative holding company operating across PR, talent booking, media production, communications strategy, licensing and merchandise. We don&apos;t just tell your story — we build your legacy.
            </p>
          </div>

          <div className="hero-index" aria-label="Explore LSMG">
            <a href="/models">01 / Talent</a>
            <a href="/services">02 / Services</a>
            <Link to="/media">03 / Studios</Link>
            <a href="/work">04 / Work</a>
            <a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer">05 / LEDGERA</a>
          </div>
        </div>
      </section>

      <div className="red-marquee" aria-hidden="true">
        <div className="red-marquee-track">
          {[...marquee, ...marquee].map((item, index) => <span key={`${item}-${index}`}>{item} ◆</span>)}
        </div>
      </div>

      <section className="editorial-section">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div>
              <span className="editorial-kicker">The LSMG ecosystem</span>
              <h2 className="editorial-display section-title">ONE COMPANY.<br /><span className="editorial-red">MULTIPLE ENGINES.</span></h2>
            </div>
            <p className="section-intro">
              LSMG connects representation, communications, booking, production and owned media under one independent structure. The goal is simple: create opportunity around talent and turn visibility into durable business.
            </p>
          </div>

          <div className="home-feature-grid">
            <a href="/models" className="home-feature primary">
              <span className="home-feature-number">01 / REPRESENTATION</span>
              <div>
                <h3 className="home-feature-title">TALENT</h3>
                <p>Models, actors, music, sports, media and public figures represented through one clear LSMG talent division.</p>
                <span className="home-feature-link">Explore talent <span>↗</span></span>
              </div>
            </a>

            <a href="/services" className="home-feature">
              <span className="home-feature-number">02 / STRATEGY</span>
              <div>
                <h3 className="home-feature-title">SERVICES</h3>
                <p>PR, communications, booking, media training, partnerships, licensing and career strategy.</p>
                <span className="home-feature-link">View services <span>↗</span></span>
              </div>
            </a>

            <Link to="/media" className="home-feature">
              <span className="home-feature-number">03 / PRODUCTION</span>
              <div>
                <h3 className="home-feature-title">STUDIOS</h3>
                <p>Original scripted content, podcasts, documentaries, editorial content and brand productions.</p>
                <span className="home-feature-link">Enter studios <span>↗</span></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="editorial-section" style={{ background: '#080808' }}>
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div>
              <span className="editorial-kicker">Built for culture</span>
              <h2 className="editorial-display section-title">INDEPENDENT.<br /><span className="editorial-red">CONNECTED.</span></h2>
            </div>
            <p className="section-intro">
              LSMG operates from Dallas, Orlando, New York and Atlanta, connecting creative talent, media relationships and production capabilities across markets without losing the speed of an independent company.
            </p>
          </div>

          <div className="proof-grid">
            <div className="proof-cell"><div className="proof-value">2022</div><div className="proof-label">Established</div></div>
            <div className="proof-cell"><div className="proof-value editorial-red">04</div><div className="proof-label">Core markets</div></div>
            <div className="proof-cell"><div className="proof-value">06</div><div className="proof-label">Business divisions</div></div>
            <div className="proof-cell"><div className="proof-value editorial-red">01</div><div className="proof-label">Integrated ecosystem</div></div>
          </div>
        </div>
      </section>

      <section className="split-panel">
        <div className="split-panel-dark">
          <span className="editorial-kicker">LSMG Studios</span>
          <h2>ORIGINAL<br />CONTENT.</h2>
          <p className="editorial-copy" style={{ margin: '26px 0 34px' }}>
            LSMG Studios develops scripted projects, podcasts, documentaries and editorial productions for digital and streaming audiences.
          </p>
          <Link to="/media" className="editorial-cta red">Explore Studios ↗</Link>
        </div>

        <div className="split-panel-red">
          <div>
            <span className="editorial-kicker" style={{ color: '#fff', opacity: .75 }}>Owned media</span>
            <h2 style={{ marginTop: 18 }}>LEDGERA</h2>
          </div>
          <div>
            <p style={{ marginBottom: 30 }}>
              LSMG&apos;s independent culture and editorial platform. Explore features, interviews, covers and the separate LEDGERA model community.
            </p>
            <a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer" className="editorial-cta">Visit LEDGERA ↗</a>
          </div>
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div>
              <span className="editorial-kicker">Start a conversation</span>
              <h2 className="editorial-display section-title">THE NEXT<br /><span className="editorial-red">SHOT.</span></h2>
            </div>
            <div className="section-intro">
              <p style={{ marginBottom: 28 }}>For representation, press, partnerships, booking, production or other business inquiries, contact LSMG directly.</p>
              <Link to="/contact" className="editorial-cta red">Work with LSMG ↗</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
