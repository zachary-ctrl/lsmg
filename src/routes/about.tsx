import { createFileRoute, Link } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

type Member = {
  name: string
  role: string
  desc: string
  bio: string
  tags: string[]
  image: string
}

const TEAM: Member[] = [
  {
    name: 'Zachary Heneden',
    role: 'CO-CEO · CREATIVE DIRECTOR · EDITOR IN CHIEF',
    desc: 'Handles creative direction, PR execution, original series development, editorial output, and day-to-day operational management across all LSMG divisions.',
    bio: 'Zachary co-founded Last Shot Media Group to give creative talent the full-stack business infrastructure the industry never offered them. As Creative Director and Editor in Chief he leads creative direction, PR execution, original series development, and the editorial standard for everything LSMG publishes — from press releases to media-campaign strategy. He stays hands-on with day-to-day operations across every LSMG division, from the editorial desk to the booking floor.',
    tags: ['Co-CEO', 'Creative Director', 'Editor In Chief'],
    image: '/team/zachary.jpg',
  },
  {
    name: "Julien Serrano-O'Neil",
    role: 'CO-FOUNDER · CO-CEO',
    desc: 'Co-founder handling operational systems, business development, and organizational infrastructure. The operational backbone of LSMG.',
    bio: 'Julien is the operational backbone of LSMG. He architects the systems, business-development pipelines, and organizational infrastructure that let the company move with the intensity of a counterculture movement and the precision of a serious enterprise. If it scales, Julien built the rails for it.',
    tags: ['Co-CEO', 'Co-Founder'],
    image: '/team/julien.jpg',
  },
  {
    name: 'Ashley Diaz',
    role: 'Brand Strategy Lead',
    desc: 'Brand positioning, visual identity strategy, and market positioning for LSMG and its clients.',
    bio: 'As Brand Strategy Lead, Ashley shapes how LSMG and its clients show up in the world. She owns brand positioning, visual identity strategy, and market positioning — translating raw creative ambition into a sharp, ownable presence that holds up across every platform and city the company operates in.',
    tags: ['Brand Strategy', 'Strategy Lead'],
    image: '/team/ashley.jpg',
  },
  {
    name: 'James P. Claude',
    role: 'CHIEF TECHNOLOGY OFFICER',
    desc: 'Oversees global technology strategy, leading engineering, cybersecurity, and data science teams to deliver robust, scalable solutions.',
    bio: 'James P. Claude is a visionary C-level technology executive with over 20 years of experience driving digital transformation, scaling enterprise infrastructure, and pioneering cutting-edge product innovation. As Chief Technology Officer at LSMG, James oversees the company’s global technology strategy, leading high-performance engineering, cybersecurity, and data science teams to deliver robust, scalable solutions that power the business forward. Throughout his career he has built a reputation for bridging the gap between complex technological capabilities and high-level business strategy, specializing in cloud architecture, machine learning integration, and modernizing legacy systems to optimize operational efficiency and maximize ROI. He holds an M.S. in Computer Science from Stanford University and a B.S. in Computer Engineering from the Massachusetts Institute of Technology (MIT).',
    tags: ['Technology', 'CTO'],
    image: '/team/james.png',
  },
]

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.15 },
    )
    const children = el.querySelectorAll('.scroll-reveal')
    children.forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  }, [])
  return ref
}

/* steven.com-style magnetic pull — subtly pulls an element toward the cursor */
function Magnetic({
  children,
  strength = 0.35,
  className,
  style,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const reset = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0, 0)'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)', willChange: 'transform', ...style }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  )
}

/* Staggered, word-by-word typography fade */
function StaggerText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const words = text.split(' ')
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="word-stagger" style={{ animationDelay: `${0.2 + i * 0.045}s` }}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

function AboutPage() {
  const revealRef = useScrollReveal()
  const [active, setActive] = useState<Member | null>(null)
  const [closing, setClosing] = useState(false)

  // Fluid, dondregreen-style dismissal: play the exit animation first, then
  // unmount — so the bio never cuts off abruptly the way a hard unmount does.
  const closeBio = useCallback(() => {
    setClosing(true)
    window.setTimeout(() => {
      setActive(null)
      setClosing(false)
    }, 420)
  }, [])

  const openBio = useCallback((member: Member) => {
    setClosing(false)
    setActive(member)
  }, [])

  // Lock scroll + handle Escape while the bio modal is open
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBio()
    }
    document.addEventListener('keydown', onKey)
    // Lock scroll without a layout shift: hiding the scrollbar widens the page
    // and pushes centered content sideways, so pad the gap it leaves behind.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPaddingRight
    }
  }, [active, closeBio])

  return (
    <div ref={revealRef}>
      {/* Page Hero */}
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span className="scroll-reveal" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase', animation: 'fadeUp .7s ease both' }}>Our Story</span>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: '.88' }}>
            <StaggerText text="About" /> <span style={{ color: 'var(--red)' }}><span className="word-stagger" style={{ animationDelay: '0.34s' }}>LSMG</span></span>
          </h1>
          <p className="scroll-reveal" style={{ fontSize: 20, color: '#b3b3b3', maxWidth: 600, marginTop: 24, lineHeight: 1.75, animation: 'fadeUp .7s ease .35s both' }}>Last Shot Media Group is an independent creative holding company operating across Dallas, Orlando, New York and Atlanta. We built it because the industry needed something different.</p>
        </div>
      </div>

      {/* Company Info */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div className="scroll-reveal">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>The Company</span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '12px 0' }}>
                Built<br /><span style={{ color: 'var(--red)' }}>Different.</span>
              </h2>
              <div className="w-[60px] h-[3px] my-5 line-reveal" style={{ background: 'var(--red)' }} />
              <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.75, marginBottom: 20 }}>Last Shot Media Group was founded with a simple principle: creative talent deserves full-stack business infrastructure. Not just a publicist. Not just a booking agent. Everything — under one roof, owned and operated by people who actually live in the culture.</p>
              <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.75, marginBottom: 20 }}>We operate across Dallas, Orlando, New York and Atlanta — unapologetically independent. No corporate parent. No conflicting client interests. Every client gets direct attention from the founders.</p>
              <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.75 }}>Six divisions. One vision. We operate where PR, media, booking, production, training, and licensing intersect — and we build career infrastructure for artists and brands who are serious about longevity.</p>
            </div>
            <div>
              <div className="grid grid-cols-2" style={{ gap: 2, background: 'var(--red)' }}>
                {[
                  { value: '6', label: 'Divisions' },
                  { value: '4', label: 'Cities', accent: true },
                  { value: '2022', label: 'Founded' },
                  { value: '∞', label: 'Last Shot Taken', accent: true },
                ].map((s, i) => (
                  <div key={s.label} className="text-center glow-hover scroll-reveal" style={{ background: 'var(--black)', padding: '48px 40px', transition: 'transform 0.3s ease, opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)', transitionDelay: `${i * 0.08}s` }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: s.accent ? 'var(--red)' : 'var(--white)', lineHeight: 1 }}>{s.value}</div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: 'var(--mid)', marginTop: 8, display: 'block' }}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="scroll-reveal" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)', padding: 36, marginTop: 2 }}>
                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 12 }}>Our Identity</h4>
                <p style={{ fontSize: 15, color: '#9c9c9c', lineHeight: 1.7 }}>Unapologetic creative ambition backed by serious operational muscle. We move with the intensity of a counterculture movement and the precision of an enterprise built to last. Red, Black, White. No compromise on vision or execution.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Leadership</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              The <span style={{ color: 'var(--red)' }}>Team</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 560, marginTop: 20, lineHeight: 1.75 }}>LSMG is led by a core team of operators, creatives, and strategists who have been in the culture their entire careers. Tap any portrait to read their full bio.</p>
          </div>
          <div className="hm-team-grid">
            {TEAM.map((member, idx) => (
              <button
                key={member.name}
                type="button"
                onClick={() => openBio(member)}
                className="hm-member scroll-reveal"
                style={{ transitionDelay: `${idx * 0.07}s` }}
                aria-label={`View bio for ${member.name}, ${member.role}`}
              >
                {member.image ? (
                  <img src={member.image} alt={member.name} className="hm-member-photo" loading="lazy" />
                ) : (
                  <div className="hm-member-placeholder">
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 96, color: 'var(--red)', opacity: 0.5 }}>
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="hm-member-overlay">
                  <div className="hm-member-name">{member.name}</div>
                  <div className="hm-member-bar" />
                  <div className="hm-member-role">{member.role}</div>
                  <div className="hm-member-cta">View Bio &rarr;</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Lightbox — full-screen: blurred, zoomed backdrop of the same
          portrait with the sharp, uncropped image and bio floated on top. */}
      {active && (
        <div
          className={`bio-lightbox${closing ? ' bio-lightbox--closing' : ''}`}
          onClick={closeBio}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} biography`}
        >
          {active.image && (
            <div
              className="bio-lightbox-backdrop"
              aria-hidden="true"
              style={{ backgroundImage: `url(${active.image})` }}
            />
          )}
          <div className="bio-lightbox-scrim" aria-hidden="true" />
          <button type="button" className="bio-lightbox-close" onClick={closeBio} aria-label="Close">
            &times;
          </button>
          <div className="bio-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <div className="bio-lightbox-figure">
              {active.image ? (
                <img src={active.image} alt={active.name} className="bio-lightbox-img" />
              ) : (
                <div className="bio-lightbox-placeholder">
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 140, color: 'var(--red)', opacity: 0.5 }}>
                    {active.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="bio-lightbox-info">
              <span className="bio-lightbox-eyebrow">Leadership</span>
              <h3 className="bio-lightbox-name">{active.name}</h3>
              <p className="bio-lightbox-role">{active.role}</p>
              <div className="bio-lightbox-rule" />
              <p className="bio-lightbox-bio">{active.bio}</p>
              <div className="bio-lightbox-tags">
                {active.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`bio-lightbox-tag${i === active.tags.length - 1 ? ' bio-lightbox-tag--accent' : ''}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="text-center" style={{ padding: '120px 40px' }}>
        <div className="max-w-[800px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Join The Movement</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 112px)', lineHeight: '.88', margin: '16px 0' }}>
            This Is<br />Your <span style={{ color: 'var(--red)' }}>Last Shot.</span>
          </h2>
          <p style={{ fontSize: 18, color: '#b3b3b3', marginBottom: 48, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>Whether you're looking to be a client, join the team, or partner with LSMG on something larger — the door is open.</p>
          <Magnetic className="inline-block" strength={0.45}>
            <Link to="/contact" className="inline-flex items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 3, padding: '18px 48px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>
              Get In Touch
            </Link>
          </Magnetic>
        </div>
      </section>
    </div>
  )
}
