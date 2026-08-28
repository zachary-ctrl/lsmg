import { createFileRoute, Link } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FullResolutionImage } from '../components/FullResolutionImage'
import { netlifyImage } from '../lib/netlify-image'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

type Member = {
  id: string
  name: string
  /* Shown under the portrait — one array entry per line. */
  cardRole: string[]
  /* Full title line used inside the bio modal. */
  role: string
  bio: string[]
  image: string
}

const TEAM: Member[] = [
  {
    id: 'zachary',
    name: 'Zachary Heneden',
    cardRole: ['CO-CEO · CREATIVE DIRECTOR', 'EDITOR-IN-CHIEF, LEDGERA MAGAZINE'],
    role: 'Co-CEO & Creative Director, Last Shot Media Group · Editor-in-Chief, LEDGERA Magazine',
    bio: [
      'Zachary Heneden is a media executive, creative strategist, and entrepreneur serving as Co-CEO and Creative Director of Last Shot Media Group (LSMG) and Editor-in-Chief of LEDGERA Magazine. As a co-founder of LSMG, Zachary has helped shape the company into a growing media/PR, entertainment, and creative enterprise focused on connecting talent, brands, storytelling, and opportunity.',
      'At LSMG, Zachary leads the company’s creative direction and works across its media, talent, public relations, brand partnership, and production efforts. He remains closely involved in day-to-day operations, helping guide projects from initial concept and outreach through execution, placement, and distribution. His work includes developing original media concepts, supporting talent and client strategy, building brand and industry relationships, executing publicity campaigns, and identifying opportunities that expand LSMG’s reach across entertainment, sports, culture, and business.',
      'As Editor-in-Chief of LEDGERA Magazine, Zachary oversees the publication’s editorial vision and creative standard. He helps shape coverage, interviews, features, special projects, and multimedia storytelling while positioning LEDGERA as a platform for emerging and established voices across culture, entertainment, entrepreneurship, sports, lifestyle, and community impact.',
      'Zachary brings a strong business foundation to his creative leadership. His professional background includes financial management, operations, budgeting, forecasting, strategic planning, marketing, sales, and organizational growth. That combination allows him to approach media not only from a creative perspective, but also with an understanding of the business infrastructure required to build sustainable brands, partnerships, productions, and intellectual property.',
      'Before LSMG, Zachary co-founded PRJCT LAZRUS LLC, where he served as Chief Operating Officer and oversaw operations, finance, marketing, and product development. He has also served as Chief Financial Officer and Comptroller of The JSO Consulting Group, LLC, further strengthening his experience in financial strategy and organizational management.',
      'A graduate of Morehouse College with a Bachelor of Arts in Political Science, Zachary brings a collaborative and entrepreneurial approach to leadership. Through LSMG and LEDGERA, he is focused on building platforms that give creators, talent, entrepreneurs, brands, and compelling stories the strategy, infrastructure, and visibility needed to reach larger audiences.',
    ],
    image: '/team/zachary.jpg',
  },
  {
    id: 'julien',
    name: 'Julien Serrano-O’Neil, MNM, MPA, ACNP',
    cardRole: ['CO-CEO · HEAD OF OPERATIONS'],
    role: 'Co-CEO & Head of Operations, Last Shot Media Group',
    bio: [
      'Julien Serrano-O’Neil is a media executive, strategist, entrepreneur, and civic leader serving as Co-Chief Executive Officer and Head of Operations of Last Shot Media Group (LSMG). As a co-founder of LSMG, Julien leads the business and operational infrastructure behind the company, overseeing organizational strategy, business development, partnerships, operations, and the continued growth of its media and entertainment portfolio.',
      'Built around the philosophy “Where Creativity Meets Capital,” LSMG operates at the intersection of media, entertainment, talent, brands, and culture. Julien works across the company to turn creative ideas and relationships into sustainable business opportunities, helping develop the systems, partnerships, and strategies that move projects from concept to execution. His leadership spans public relations and communications strategy, talent and media opportunities, brand partnerships, production, licensing, merchandise, business development, and organizational growth.',
      'Working alongside LSMG’s creative leadership, Julien helps guide the company’s broader strategy while developing relationships with brands, corporations, media organizations, talent, publicists, community partners, and other industry stakeholders. He also supports the growth of LEDGERA Magazine, LSMG’s editorial and media platform, helping expand its partnerships, access, special projects, events, interviews, and opportunities for original storytelling.',
      'Julien brings to LSMG a multidisciplinary background spanning executive leadership, communications, public relations, organizational management, fundraising, partnerships, and community engagement. He is also Founder, President, and Chief Executive Officer of The JSO Consulting Group, LLC, where he advises nonprofit organizations, higher education institutions, businesses, civic organizations, campaigns, and mission-driven leaders on strategy, governance, communications, public relations, fundraising, management, and organizational capacity.',
      'He serves as Chief Relationship Officer, First Vice President, and Chief of Staff for the United Foundation of Central Florida, Inc., where his work includes strategic partnerships, external relations, philanthropy, executive coordination, and community engagement. His broader nonprofit leadership has contributed to initiatives generating significant economic and community impact throughout the United States and internationally.',
      'In 2026, Julien was elected President of the Pine Hills Community Council, Inc., becoming the youngest and first Generation Z president in the organization’s history. Through his PACE Administration, centered on Participation, Accessibility, Collaboration, and Excellence, he leads efforts focused on civic engagement, neighborhood advocacy, economic development, community visibility, and public-private collaboration.',
      'A graduate of Morehouse College, Julien earned a Bachelor of Arts in Political Science before completing both a Master of Nonprofit Management and Master of Public Administration at the University of Central Florida, along with a Graduate Certificate in Nonprofit Management. He holds both the Certified Nonprofit Professional (CNP) and Advanced Certified Nonprofit Professional (ACNP) credentials through the Nonprofit Leadership Alliance.',
      'Julien’s leadership and service have been recognized through more than 40 local, state, and national honors, including the Orlando Business Journal 40 Under 40, Alpha Phi Alpha Fraternity, Inc.’s 40 Under 40 Gamma Class, and the 2024 Presidential Lifetime Achievement Award.',
      'Across media, business, and community leadership, Julien’s work centers on building the relationships and infrastructure that allow ideas, organizations, and people to grow. At LSMG, that translates into a clear focus: building a media enterprise where creativity is supported by strategy, opportunity is backed by infrastructure, and compelling stories can become lasting brands and businesses.',
    ],
    image: '/team/julien.jpg',
  },
  {
    id: 'ashley',
    name: 'Ashley Diaz',
    cardRole: ['BRAND STRATEGY LEAD'],
    role: 'Brand Strategy Lead',
    bio: [
      'As Brand Strategy Lead, Ashley shapes how LSMG and its clients show up in the world. She owns brand positioning, visual identity strategy, and market positioning — translating raw creative ambition into a sharp, ownable presence that holds up across every platform and city the company operates in.',
    ],
    image: '/team/ashley.jpg',
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
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  // Fluid, dondregreen-style dismissal: play the exit animation first, then
  // unmount — so the bio never cuts off abruptly the way a hard unmount does.
  const closeBio = useCallback(() => {
    setClosing(true)
    window.setTimeout(() => {
      setActive(null)
      setClosing(false)
      lastFocusedRef.current?.focus()
      lastFocusedRef.current = null
    }, 250)
  }, [])

  const openBio = useCallback((member: Member) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null
    setClosing(false)
    setActive(member)
  }, [])

  // Lock scroll, handle Escape, and keep Tab inside the dialog while it is open
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeBio()
        return
      }
      if (e.key !== 'Tab') return
      const modal = modalRef.current
      if (!modal) return
      const focusable = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
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
    // Move focus into the dialog so keyboard and screen-reader users land there.
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    return () => {
      window.cancelAnimationFrame(frame)
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
      <section style={{ padding: 'clamp(72px, 8vw, 120px) clamp(16px, 4vw, 40px)', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Leadership</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              The <span style={{ color: 'var(--red)' }}>Team</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 640, marginTop: 20, lineHeight: 1.75 }}>LSMG is led by a core team of operators, creatives, and strategists working across media, entertainment, technology, brand strategy, storytelling, and business development. Select a portrait to learn more about our leadership.</p>
          </div>
          <div className="lsmg-team-grid">
            {TEAM.map((member, idx) => (
              <button
                type="button"
                key={member.id}
                className="lsmg-team-card scroll-reveal"
                style={{ transitionDelay: `${idx * 0.06}s` }}
                onClick={() => openBio(member)}
                aria-label={`Read biography for ${member.name}`}
              >
                <span className="lsmg-team-card__image">
                  {member.image ? (
                    <img
                      src={netlifyImage(member.image, 720, 960)}
                      alt={member.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = member.image
                      }}
                    />
                  ) : (
                    <span className="lsmg-team-card__placeholder" aria-hidden="true">
                      {member.name.charAt(0)}
                    </span>
                  )}
                  <span className="lsmg-team-card__overlay" aria-hidden="true">
                    <span className="lsmg-team-card__view">View Bio &rarr;</span>
                  </span>
                </span>
                <span className="lsmg-team-card__content">
                  <h3>{member.name}</h3>
                  <p>
                    {member.cardRole.map((line, i) => (
                      <span key={line}>
                        {i > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </p>
                  <span className="lsmg-team-card__cue" aria-hidden="true">
                    View Bio &rarr;
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bio modal — portrait column beside a bio column that scrolls on its
          own; both stack and scroll as one block on phones. */}
      {active && (
        <div
          ref={modalRef}
          className={`lsmg-bio-modal${closing ? ' lsmg-bio-modal--closing' : ''}`}
          onClick={closeBio}
        >
          <div
            className="lsmg-bio-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lsmgBioName"
            aria-describedby="lsmgBioText"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              ref={closeButtonRef}
              className="lsmg-bio-modal__close"
              onClick={closeBio}
              aria-label="Close biography"
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <div className="lsmg-bio-modal__visual">
              {active.image ? (
                <FullResolutionImage
                  src={active.image}
                  alt={active.name}
                  className="lsmg-bio-modal__photo"
                  linkClassName="lsmg-bio-modal__image-link"
                />
              ) : (
                <div className="lsmg-bio-modal__placeholder" aria-hidden="true">
                  {active.name.charAt(0)}
                </div>
              )}
              <div className="lsmg-bio-modal__visual-shade" />
              <div className="lsmg-bio-modal__mark" aria-hidden="true">
                LS
                <br />
                MG
              </div>
            </div>

            <div className="lsmg-bio-modal__content">
              <p className="lsmg-bio-modal__eyebrow">LSMG Leadership</p>
              <h2 className="lsmg-bio-modal__name" id="lsmgBioName">
                {active.name}
              </h2>
              <p className="lsmg-bio-modal__role">{active.role}</p>
              <div className="lsmg-bio-modal__rule" />
              <div className="lsmg-bio-modal__bio" id="lsmgBioText">
                {active.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
              <div className="lsmg-bio-modal__footer">
                <span>Last Shot Media Group</span>
                <span aria-hidden="true">Where Creativity Meets Capital</span>
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