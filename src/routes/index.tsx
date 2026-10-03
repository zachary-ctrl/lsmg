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
          'Last Shot Media Group Holdings is the parent company behind LEDGERA and a growing portfolio of media, entertainment, talent, production, communications and cultural ventures.',
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
  'LEDGERA',
  'LEDGERA Studios',
  'LEDGERA Talent',
  'Communications / PR',
  'Future Companies & IP',
  'Original IP',
  'LSMG Holdings',
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
              An independent creative holding company building and operating brands across media, entertainment, talent, production and communications. LEDGERA is our flagship culture and entertainment brand.
            </p>
          </div>

          <div className="hero-index" aria-label="Explore LSMG">
            <a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer">01 / LEDGERA</a>
            <a href="/models">02 / Talent</a>
            <Link to="/media">03 / Studios</Link>
            <a href="/services">04 / Communications</a>
            <a href="/work">05 / Portfolio</a>
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
              LSMG Holdings provides the ownership, strategy and business infrastructure behind LEDGERA. Under the LEDGERA name, LEDGERA media, LEDGERA Studios, LEDGERA Talent / Management, Communications / PR and future ventures operate as connected parts of one cultural ecosystem.
            </p>
          </div>

          <div className="home-feature-grid">
            <a href="/models" className="home-feature primary">
              <span className="home-feature-number">01 / MANAGEMENT</span>
              <div>
                <h3 className="home-feature-title">LEDGERA TALENT</h3>
                <p>Models, artists, actors, creators, athletes and public figures represented and developed through LEDGERA Talent / Management.</p>
                <span className="home-feature-link">Explore talent <span>↗</span></span>
              </div>
            </a>

            <a href="/services" className="home-feature">
              <span className="home-feature-number">02 / COMMUNICATIONS</span>
              <div>
                <h3 className="home-feature-title">COMMUNICATIONS / PR</h3>
                <p>Public relations, media strategy, campaigns, publicity, press operations and brand communications.</p>
                <span className="home-feature-link">View capabilities <span>↗</span></span>
              </div>
            </a>

            <Link to="/media" className="home-feature">
              <span className="home-feature-number">03 / PRODUCTION</span>
              <div>
                <h3 className="home-feature-title">LEDGERA STUDIOS</h3>
                <p>Film, photography, video, podcasts, documentaries, editorial production and original entertainment IP.</p>
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
            <div className="proof-cell"><div className="proof-value">01</div><div className="proof-label">Flagship brand</div></div>
            <div className="proof-cell"><div className="proof-value editorial-red">∞</div><div className="proof-label">Future ventures</div></div>
          </div>
        </div>
      </section>

      <section className="split-panel">
        <div className="split-panel-dark">
          <span className="editorial-kicker">LEDGERA Studios</span>
          <h2>ORIGINAL<br />CONTENT.</h2>
          <p className="editorial-copy" style={{ margin: '26px 0 34px' }}>
            LEDGERA Studios is the production arm of the LEDGERA ecosystem, developing film, photography, video, podcasts, documentaries and original projects.
          </p>
          <Link to="/media" className="editorial-cta red">Explore Studios ↗</Link>
        </div>

        <div className="split-panel-red">
          <div>
            <span className="editorial-kicker" style={{ color: '#fff', opacity: .75 }}>Flagship brand</span>
            <h2 style={{ marginTop: 18 }}>LEDGERA</h2>
          </div>
          <div>
            <p style={{ marginBottom: 30 }}>
              LSMG Holdings&apos; flagship media, culture and editorial brand — connected to LEDGERA Studios, LEDGERA Talent / Management and the wider holdings ecosystem.
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
