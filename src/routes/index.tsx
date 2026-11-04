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


const categories = [
  { name: 'Models', href: '/models#models', image: '/models/nani-1.jpg', alt: 'LSMG model Nani', description: 'Fashion, editorial, commercial and brand-facing talent.', action: 'Explore Models' },
  { name: 'Actors', href: '/models#actors', image: '', alt: '', description: 'Screen and stage opportunities, casting and representation inquiries.', action: 'Explore Actors' },
  { name: 'Sports', href: '/models#sports', image: '/models/paula-ramos-1.jpg', alt: 'LSMG athlete and model Paula Ramos', description: 'Athletes, sport-driven storytelling and brand appearances.', action: 'Explore Sports' },
  { name: 'Music', href: '/models#music', image: '/models/wovie-1.svg', alt: 'LSMG artist Wovie promotional portrait', description: 'Artists, performance and creative development.', action: 'Explore Music' },
  { name: 'Media', href: '/models#media', image: '/team/ashley.jpg', alt: 'LSMG team member Ashley Diaz', description: 'Hosts, interviews and on-camera media. Team image shown.', action: 'Explore Media' },
  { name: 'Public Figures', href: '/models#public-figures', image: 'https://images.squarespace-cdn.com/content/v1/536e3872e4b02cbd6b6e124c/82cb18b8-a019-4534-a006-323bfa5de1e9/Sandra%2BFatmi-Hall%2C%2BHeadshot.png', alt: 'Sandra Fatmi-Hall, nonprofit leader and speaker', description: 'Public figures, community leadership and speaking engagements.', action: 'Explore Public Figures' },
]

const featuredWork = [
  { name: 'Runway 7 / NYFW', category: 'Fashion · Editorial', role: '37-page LEDGERA special edition', link: 'https://ledgeramagazine.com/magazine/runway-7-nyfw/', label: 'View edition' },
  { name: 'Mohamed Taher / 32B', category: 'Film · Interview', role: 'Interview and film coverage; 32B received Tribeca’s 2026 Best Narrative Short award.', link: 'https://ledgeramagazine.com/interviews/32b-mohamed-taher', label: 'Read interview' },
  { name: 'M By Elegance', category: 'Wrestling · Feature', role: 'TNA Wrestling interview and LEDGERA Issue 05 cover.', link: 'https://ledgeramagazine.com/magazine/issue-05/', label: 'Explore issue' },
]

const overviewServices = [
  { name: 'PR & Communications', copy: 'Media strategy, press outreach, campaigns and reputation support.', href: '/pr' },
  { name: 'Talent Booking', copy: 'Appearances, performances, negotiations and booking coordination.', href: '/booking' },
  { name: 'Management', copy: 'Representation and career strategy across talent categories.', href: '/models' },
  { name: 'Studios & Photography', copy: 'Video, documentary, podcasts and branded production.', href: '/media' },
  { name: 'Partnerships & Licensing', copy: 'Brand campaigns, sponsorships and intellectual property.', href: 'https://activation.thelsmg.com/' },
  { name: 'Media Training', copy: 'Interview coaching, speaking preparation and public storytelling.', href: '/services' },
]

const ecosystem = [
  { name: 'The LSMG Culture Hub', short: 'THE CULTURE HUB', eyebrow: 'Media ecosystem', copy: 'One place for our latest episodes, editions, Case Files, festival coverage and cultural stories.', href: 'https://media.thelsmg.com/', action: 'Explore the Culture Hub', image: '/logo.webp' },
  { name: 'LSMG Brand Activations', short: 'BRAND ACTIVATIONS', eyebrow: 'Commercial partnerships', copy: 'Custom campaigns, sponsorships, advertising and coordinated placements across our owned media and creative services.', href: 'https://activation.thelsmg.com/', action: 'Build a Brand Partnership', image: '' },
  { name: 'The Last Shot Podcast', short: 'THE LAST SHOT PODCAST', eyebrow: 'An Original LSMG Show', copy: 'Long-form conversations, full episodes, video and short-form interviews with people shaping culture.', href: 'https://lastshotpodcast.net/', action: 'Watch & Listen', image: '' },
  { name: 'LEDGERA', short: 'LEDGERA', eyebrow: 'An LSMG Publication', copy: 'The Record of Culture. Independent editorial, fashion, film, music, features, issues and the LEDGERA creative community.', href: 'https://ledgeramagazine.com/', action: 'Visit the Publication', image: '/ledgera-logo-transparent.png' },
  { name: 'LSMG Studios', short: 'LSMG STUDIOS', eyebrow: 'Production division', copy: 'Film, photography, video, documentaries, original projects and production services.', href: '/media', action: 'Explore Studios', image: '/team/zachary.jpg' },
]

function HomePage() {
  return (
    <div className="editorial-shell">
      <LiveTicker />

      <section className="home-hero" aria-labelledby="lsmg-home-title">
        <div className="editorial-container lsmg-new-hero">
          <div className="lsmg-hero-copy">
            <span className="editorial-kicker">Last Shot Media Group Holdings · Independent Creative Company</span>
            <h1 id="lsmg-home-title" className="editorial-display home-hero-title">
              LAST SHOT<br /><span className="editorial-red">MEDIA</span><br />GROUP
            </h1>
            <p className="home-hero-tagline">Where Creativity Becomes Capital.</p>
            <p className="home-hero-copy">
              Last Shot Media Group Holdings is the independent parent company for our talent, production and owned-media properties. We also work directly with artists, brands and organizations across PR, talent booking, media production, communications strategy, licensing and merchandise. We don&apos;t just tell your story — we build your legacy.
            </p>
            <div className="lsmg-hero-actions">
              <a href="/models" className="editorial-cta red">Explore Talent ↗</a>
              <a href="/contact" className="editorial-cta">Work With Us ↗</a>
            </div>
          </div>
          <div className="lsmg-hero-visual">
            <img src="/team/zachary.jpg" alt="LSMG co-CEO and Creative Director Zachary Heneden" width="900" height="1125" fetchPriority="high" />
            <span>People / Projects / Possibility</span>
          </div>
        </div>
      </section>

      <div className="red-marquee" aria-hidden="true">
        <div className="red-marquee-track">{[...marquee, ...marquee].map((item, index) => <span key={`${item}-${index}`}>{item} ◆</span>)}</div>
      </div>

      <section className="editorial-section" id="talent">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div>
              <span className="editorial-kicker">01 / LSMG Talent</span>
              <h2 className="editorial-display section-title">TALENT IS<br /><span className="editorial-red">THE CENTER.</span></h2>
            </div>
            <p className="section-intro">Six entry points to booking and representation. We separate LSMG-represented talent from LEDGERA&apos;s editorial model community, with clear inquiry paths for each category.</p>
          </div>
          <div className="lsmg-talent-grid">
            {categories.map((category) => (
              <a href={category.href} className={`lsmg-talent-card${category.image ? '' : ' no-photo'}`} key={category.name}>
                {category.image ? <img src={category.image} alt={category.alt} loading="lazy" decoding="async" /> : <span className="lsmg-talent-art" aria-hidden="true">LSMG</span>}
                <span className="lsmg-talent-shade" aria-hidden="true" />
                <span className="lsmg-talent-info">
                  <strong>{category.name}</strong>
                  <span>{category.description}</span>
                  <small>{category.action} ↗</small>
                </span>
              </a>
            ))}
          </div>
          <p className="lsmg-note">Photos identify existing LSMG talent or team members. For categories without a confirmed portrait, we show branded artwork rather than imply representation of someone not on the roster.</p>
        </div>
      </section>

      <section className="editorial-section lsmg-work-preview" id="selected-work">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div><span className="editorial-kicker">02 / Selected Work</span><h2 className="editorial-display section-title">IN THE ROOM.<br /><span className="editorial-red">ON THE RECORD.</span></h2></div>
            <p className="section-intro">A selection of verified interviews, specials and editorial work from our 2026 coverage portfolio. Editorial access is not a claim of sponsorship or client representation.</p>
          </div>
          <div className="lsmg-work-preview-grid">
            {featuredWork.map((item, index) => <a href={item.link} key={item.name} className="lsmg-work-preview-card" target="_blank" rel="noopener noreferrer">
              <span className="editorial-kicker">0{index + 1} / {item.category}</span><h3>{item.name}</h3><p>{item.role}</p><small>{item.label} ↗</small>
            </a>)}
          </div>
          <a href="/work" className="editorial-cta lsmg-section-cta">See Coverage & Selected Work ↗</a>
        </div>
      </section>

      <section className="editorial-section" id="services">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div><span className="editorial-kicker">03 / Capabilities</span><h2 className="editorial-display section-title">WHAT WE<br /><span className="editorial-red">DO FOR YOU.</span></h2></div>
            <p className="section-intro">The company is more than a directory of properties. Our core team offers direct services across representation, communications, commercial partnerships and production.</p>
          </div>
          <div className="lsmg-service-preview">
            {overviewServices.map((item, i) => <a key={item.name} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="lsmg-service-preview-item">
              <small>0{i + 1}</small><div><h3>{item.name}</h3><p>{item.copy}</p></div><span aria-hidden="true">↗</span>
            </a>)}
          </div>
          <a href="/services" className="editorial-cta lsmg-section-cta">Explore All Services ↗</a>
        </div>
      </section>

      <section className="editorial-section lsmg-ecosystem" id="ecosystem">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div><span className="editorial-kicker">04 / An LSMG Company</span><h2 className="editorial-display section-title">ONE COMPANY.<br /><span className="editorial-red">MULTIPLE ENGINES.</span></h2></div>
            <p className="section-intro">Our properties retain distinctive identities and connect through one parent organization. LSMG Holdings leads the ecosystem while remaining available for direct client services.</p>
          </div>
          <div className="lsmg-ecosystem-grid">
            {ecosystem.map((item) => <a href={item.href} key={item.name} className="lsmg-ecosystem-card" target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
              <span className="editorial-kicker">{item.eyebrow}</span>
              <div className="lsmg-ecosystem-art">
                {item.image ? <img src={item.image} alt="" loading="lazy" decoding="async" /> : <strong aria-hidden="true">LSMG</strong>}
              </div>
              <h3>{item.short}</h3><p>{item.copy}</p><span className="home-feature-link">{item.action} ↗</span>
            </a>)}
          </div>
        </div>
      </section>

      <section className="editorial-section lsmg-story-section">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div><span className="editorial-kicker">05 / Our Story</span><h2 className="editorial-display section-title">INDEPENDENT.<br /><span className="editorial-red">CONNECTED.</span></h2></div>
            <div className="section-intro">
              <p>Founded by creative leaders, Last Shot Media Group combines editorial independence with a business structure built for enduring cultural work. Talent representation, communication, media strategy and original production work together without compromising each property&apos;s identity.</p>
              <a href="/about" className="editorial-cta lsmg-section-cta">Our Company & Leadership ↗</a>
            </div>
          </div>
          <div className="proof-grid" aria-label="LSMG organization at a glance">
            <div className="proof-cell"><div className="proof-value">06</div><div className="proof-label">Talent categories</div></div>
            <div className="proof-cell"><div className="proof-value editorial-red">04</div><div className="proof-label">Core markets</div></div>
            <div className="proof-cell"><div className="proof-value">05</div><div className="proof-label">Featured ecosystem properties</div></div>
            <div className="proof-cell"><div className="proof-value editorial-red">01</div><div className="proof-label">Parent company</div></div>
          </div>
        </div>
      </section>

      <section className="editorial-section lsmg-contact-section">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div><span className="editorial-kicker">Build With LSMG</span><h2 className="editorial-display section-title">THE NEXT<br /><span className="editorial-red">SHOT.</span></h2></div>
            <div className="section-intro"><p>For representation, media strategy, press, booking, sponsorships, licensing, photography or production, speak with our team.</p><Link to="/contact" className="editorial-cta red lsmg-section-cta">Work With Us ↗</Link></div>
          </div>
        </div>
      </section>
    </div>
  )
}
