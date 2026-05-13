import { Link, createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
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
    fetch('/api/live-ticker')
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .catch(() => {})
    const interval = setInterval(() => {
      fetch('/api/live-ticker')
        .then((res) => res.json())
        .then((data) => setItems(data.items || []))
        .catch(() => {})
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  if (items.length === 0) return null

  return (
    <div className="relative overflow-hidden" style={{ background: '#0a0002', borderBottom: '2px solid var(--red)', padding: '12px 0' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-2 flex-shrink-0" style={{ zIndex: 1 }}>
            <span className="live-pulse-dot" />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', fontWeight: 700 }}>LIVE</span>
          </div>
          <div className="flex-1 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)' }}>
            <div className="flex items-center gap-10 whitespace-nowrap" style={{ animation: `ticker ${Math.max(20, items.length * 8)}s linear infinite` }}>
              {[...items, ...items].map((item, i) => {
                const content = (
                  <span className="inline-flex items-center gap-3">
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: 1, color: 'var(--white)' }}>{item.text}</span>
                    <span style={{ width: 4, height: 4, background: 'var(--red)', borderRadius: '50%', display: 'inline-block', opacity: 0.5 }} />
                  </span>
                )
                if (item.linkUrl) {
                  const isExternal = item.linkType === 'external' || item.linkUrl.startsWith('http')
                  if (isExternal) {
                    return <a key={`${item.id}-${i}`} href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--red)] transition-colors">{content}</a>
                  }
                  return <Link key={`${item.id}-${i}`} to={item.linkUrl} className="hover:text-[var(--red)] transition-colors">{content}</Link>
                }
                return <span key={`${item.id}-${i}`}>{content}</span>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <div style={{ paddingTop: 0 }}>
      {/* Live Ticker */}
      <LiveTicker />

      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden" style={{ padding: '80px 40px' }}>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 40% at 70% 50%, rgba(200,16,46,.08) 0%, transparent 60%), linear-gradient(rgba(200,16,46,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,16,46,.03) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }} />
        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <div className="inline-flex items-center gap-3 mb-6" style={{ animation: 'fadeUp .7s ease both' }}>
            <span className="w-10 h-[1px]" style={{ background: 'var(--red)' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)' }}>Worldwide &middot; Est. 2022</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(72px, 12vw, 160px)', lineHeight: '.85', marginBottom: 32, animation: 'fadeUp .7s ease .1s both' }}>
            LAST<br /><span style={{ color: 'var(--red)' }}>SHOT</span><br />MEDIA
          </h1>
          <p className="font-bold" style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', color: 'var(--white)', maxWidth: 600, marginBottom: 16, letterSpacing: '.5px', animation: 'fadeUp .7s ease .2s both' }}>
            Where Creativity Becomes Capital.
          </p>
          <p style={{ fontSize: 17, color: '#888', maxWidth: 520, marginBottom: 48, lineHeight: 1.8, animation: 'fadeUp .7s ease .2s both' }}>
            An independent creative holding company operating across PR, talent booking, media production, communications strategy, licensing, and merchandise. We don't just tell your story — we build your legacy.
          </p>
          <div className="flex flex-wrap gap-4" style={{ animation: 'fadeUp .7s ease .3s both' }}>
            <Link to="/contact" className="inline-flex items-center gap-2.5 hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>
              Work With Us
            </Link>
            <Link to="/about" className="inline-flex items-center gap-2.5 hover:border-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--white)', textTransform: 'uppercase', border: '1px solid #707070' }}>
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden" style={{ background: 'var(--red)', padding: '16px 0', whiteSpace: 'nowrap' }}>
        <div className="inline-flex gap-0" style={{ animation: 'ticker 25s linear infinite' }}>
          {['PR', 'Talent Representation', 'Talent Booking', 'Media Production', 'Media Training', 'Licensing & IP', 'Merchandise', 'LSMG Studios', 'Worldwide',
            'PR', 'Talent Representation', 'Talent Booking', 'Media Production', 'Media Training', 'Licensing & IP', 'Merchandise', 'LSMG Studios', 'Worldwide'].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 4, color: 'var(--white)', padding: '0 48px' }}>
              {item}<span style={{ fontSize: 10, opacity: .5 }}>&diams;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 2, background: 'var(--red)' }}>
        {[
          { value: '6', label: 'Business Divisions' },
          { value: '200K+', label: 'Client Streams', accent: true },
          { value: 'Global', label: 'Worldwide Operations' },
          { value: '\u221E', label: 'Last Shot Taken', accent: true },
        ].map((stat) => (
          <div key={stat.label} className="text-center glow-hover" style={{ background: 'var(--black)', padding: '48px 40px', transition: 'transform 0.3s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: stat.accent ? 'var(--red)' : 'var(--white)', lineHeight: 1 }}>{stat.value}</div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: 'var(--mid)', marginTop: 8, display: 'block' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Services Overview */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>What We Do</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Six Divisions.<br /><span style={{ color: 'var(--red)' }}>One Vision.</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 560, marginTop: 20, lineHeight: 1.75 }}>Every arm of LSMG is built to convert creative talent into durable business. We operate where culture, media, and commerce intersect.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            <ServiceCard icon="📣" title="PR" desc="Strategic press campaigns for artists, brands, and cultural figures. We secure placements, build narratives, and manage media relationships at every level." items={['Press Release Writing & Distribution', 'Media Pitching & Placement', 'Editorial & Blog Coverage', 'Crisis Communications']} link="/pr" />
            <ServiceCard icon="🎤" title="LSMG Booking" desc="End-to-end talent booking for artists, performers, and public figures. National and international markets." items={['Artist Booking & Negotiation', 'Tour & Event Coordination', 'International Market Specialist', 'Venue Relations']} link="/booking" />
            <ServiceCard icon="🎬" title="Media Production" desc="LSMG Studios produces original content — scripted series, podcasts, documentaries, and editorial content." items={['Podcast Production', 'Documentary Development', 'Brand Content & Campaigns']} link="/media" />
            <ServiceCard icon="🎙️" title="Media Training" desc="On-camera coaching, press junket preparation, and public speaking training for artists, executives, and public figures." items={['On-Camera Coaching', 'Press Junket Prep', 'Interview Technique', 'Brand Voice Development']} link="/contact" />
            <ServiceCard icon="⚖️" title="Licensing & IP" desc="We help creators monetize their intellectual property — music licensing, brand partnerships, sync deals, and content licensing." items={['Music Sync Licensing', 'Brand Partnership Deals', 'IP Management & Strategy', 'International Market Licensing']} link="/contact" />
            <ServiceCard icon="👔" title="Talent & Models" desc="LSMG represents models and multimedia talent for editorial, commercial, and entertainment work." items={['Model Representation', 'Multimedia Talent', 'Editorial & Commercial Work', 'Brand Partnerships']} link="/pr" />
          </div>
        </div>
      </section>

      {/* Featured Client */}
      <section style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Featured Client</span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
                JAY?<span style={{ color: 'var(--red)' }}>DUHHH</span>
              </h2>
              <div className="w-[60px] h-[3px] my-5" style={{ background: 'var(--red)' }} />
              <p style={{ fontSize: 18, color: '#888', lineHeight: 1.8, marginBottom: 32 }}>
                Jada Gibson — Richmond, VA-based recording artist with 200K+ independent streams. Debut project <strong style={{ color: '#fff' }}>"Fairy Funk"</strong> — a genre-defying blend of R&B, funk, and alternative soul. LSMG handles full-service PR, media pitching, and press campaign strategy.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--mid)', border: '1px solid #222', padding: '6px 14px' }}>Fairy Funk Genre</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--red)', border: '1px solid var(--red)', padding: '6px 14px' }}>200K+ Streams</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--mid)', border: '1px solid #222', padding: '6px 14px' }}>R&B / Soul / Funk</span>
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="https://instagram.com/iamjayduhhh" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:border-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--white)', textTransform: 'uppercase', border: '1px solid #707070' }}>
                  @iamjayduhhh
                </a>
                <Link to="/pr" className="inline-flex items-center gap-2.5 hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>
                  Our PR Work
                </Link>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg,#1a0005,#080808)', border: '1px solid #2a0008', borderLeft: '4px solid var(--red)', overflow: 'hidden', position: 'relative' }}>
              <img src="/jada.jpeg" alt="Jada Gibson — JAY?DUHHH" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: 400 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,.85))', padding: '48px 32px 32px' }}>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: 'var(--red)', lineHeight: 1 }}>FAIRY FUNK</p>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: '#8f8f8f', marginTop: 8 }}>Debut Project &middot; Available Now</p>
                <div className="flex gap-10 mt-6">
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: '#fff' }}>200K+</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: '#8f8f8f' }}>Streams</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: '#fff' }}>Indie</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: '#8f8f8f' }}>Independent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LSMG Studios Teaser */}
      <section style={{ padding: '120px 40px', background: 'linear-gradient(135deg,#080808 0%,#0d0002 100%)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>LSMG Studios</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Original Content.<br /><span style={{ color: 'var(--red)' }}>Real Stories.</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 560, marginTop: 20, lineHeight: 1.75 }}>LSMG Studios is producing original scripted content for streaming and digital distribution.</p>
          </div>
          <div style={{ background: '#0a0002', border: '1px solid #2a0008', borderTop: '4px solid var(--red)', padding: 48, maxWidth: 800 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Now In Development</span>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: 'var(--white)', lineHeight: '.88', margin: '12px 0' }}>Original Productions</h3>
            <p style={{ fontSize: 18, color: '#888', lineHeight: 1.8, maxWidth: 600, marginBottom: 32 }}>Stay tuned for our upcoming scripted content, podcasts, and documentaries — produced entirely in-house by LSMG Studios.</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/media" className="inline-flex items-center gap-2.5 hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>
                LSMG Studios
              </Link>
              <a href="mailto:info@lastshotmediagroup.com" className="inline-flex items-center gap-2.5 hover:border-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--white)', textTransform: 'uppercase', border: '1px solid #707070' }}>
                Industry Inquiries
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why LSMG */}
      <section style={{ padding: '120px 40px', background: 'var(--gray)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>The Difference</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Why <span style={{ color: 'var(--red)' }}>LSMG</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { num: '01', title: 'Independent & Accountable', desc: 'No corporate overhead. No conflicting interests. Every client gets direct attention from the founders.' },
              { num: '02', title: 'Worldwide Reach', desc: 'Operating globally with press access and active expansion into international markets.' },
              { num: '03', title: 'Full-Stack Creative', desc: 'PR, production, booking, training, and licensing under one roof. Your story told everywhere it needs to be told.' },
              { num: '04', title: 'Results, Not Promises', desc: 'Measurable deliverables. Transparent reporting. Real press placements, real bookings, real results.' },
            ].map((card) => (
              <div key={card.num} className="hover:bg-[#0d0002] glow-hover transition-all" style={{ background: 'var(--black)', padding: '40px 36px', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: 'rgba(200,16,46,.15)', lineHeight: 1, marginBottom: 12 }}>{card.num}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--white)', marginBottom: 12 }}>{card.title}</div>
                <p style={{ fontSize: 15, color: '#b3b3b3', lineHeight: 1.7 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center" style={{ padding: '120px 40px' }}>
        <div className="max-w-[800px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Ready to Work?</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 112px)', lineHeight: '.88', margin: '16px 0' }}>
            Take Your<br /><span style={{ color: 'var(--red)' }}>Last Shot.</span>
          </h2>
          <p style={{ fontSize: 20, color: '#b3b3b3', marginBottom: 48 }}>Whether you're an artist looking for PR, a brand looking for reach, or a talent looking for representation — let's talk.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 3, padding: '18px 48px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>
              Start The Conversation
            </Link>
            <a href="mailto:info@lastshotmediagroup.com" className="inline-flex items-center hover:border-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--white)', textTransform: 'uppercase', border: '1px solid #707070' }}>
              info@lastshotmediagroup.com
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({ icon, title, desc, items, link }: { icon: string; title: string; desc: string; items: string[]; link: string }) {
  return (
    <div className="hover:border-t-[var(--red)] transition-all glow-hover" style={{ background: 'var(--black)', padding: '48px 40px', borderTop: '3px solid transparent' }}>
      <div style={{ fontSize: 36, marginBottom: 20 }}>{icon}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, marginBottom: 12 }}>{title}</div>
      <p style={{ fontSize: 15, color: '#b3b3b3', lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1, color: '#9c9c9c', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
            <span style={{ color: 'var(--red)' }}>&rarr;</span> {item}
          </li>
        ))}
      </ul>
      <Link to={link} className="inline-flex items-center mt-6 hover:bg-[var(--red)] hover:text-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--red)', textTransform: 'uppercase', border: '1px solid var(--red)' }}>
        View {title.split(' ')[0]} &rarr;
      </Link>
    </div>
  )
}
