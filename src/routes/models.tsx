import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MODELS } from '../data/models'

export const Route = createFileRoute('/models')({
  component: ModelsPage,
  head: () => ({
    meta: [
      { title: 'LSMG Talent Management | Last Shot Media Group' },
      {
        name: 'description',
        content:
          'LSMG represents and develops select models, artists, creators, personalities and multimedia talent across entertainment, fashion and culture.',
      },
      { property: 'og:title', content: 'LSMG Talent Management | Last Shot Media Group' },
      {
        property: 'og:description',
        content:
          'Management built around where you’re going — representation, media strategy, bookings, partnerships and career development from Last Shot Media Group.',
      },
    ],
  }),
})

const FILTERS = ['All', ...Array.from(new Set(MODELS.flatMap((model) => model.types)))]
const FEATURED_MODELS = MODELS.filter((model) => model.featured)

const TALENT_SCOPE = [
  { label: 'Models', status: 'Active Roster' },
  { label: 'Artists', status: 'Select Representation' },
  { label: 'Creators', status: 'Select Representation' },
  { label: 'Personalities', status: 'Select Representation' },
  { label: 'Hosts', status: 'Select Representation' },
  { label: 'Influencers', status: 'Select Representation' },
]

const MANAGEMENT_SERVICES = [
  {
    num: '01',
    title: 'Career Strategy',
    desc: 'Positioning, development priorities and opportunity planning built around the direction of the talent.',
  },
  {
    num: '02',
    title: 'Media Strategy',
    desc: 'Interviews, features, appearances and owned-media opportunities designed to support the larger career narrative.',
  },
  {
    num: '03',
    title: 'Bookings',
    desc: 'Editorial, commercial, entertainment, event and performance opportunities managed through the broader LSMG network.',
  },
  {
    num: '04',
    title: 'Partnerships',
    desc: 'Brand relationships, sponsored opportunities, campaigns and strategic collaborations aligned with the talent.',
  },
]

function StaggerText({ text, delay = 0.2 }: { text: string; delay?: number }) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="word-stagger"
          style={{ animationDelay: `${delay + index * 0.06}s` }}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.12 },
    )

    element
      .querySelectorAll('.scroll-reveal:not(.revealed)')
      .forEach((child) => observer.observe(child))

    return () => observer.disconnect()
  })

  return ref
}

function ModelCard({ model, index = 0, featured = false }: {
  model: (typeof MODELS)[number]
  index?: number
  featured?: boolean
}) {
  return (
    <Link
      to="/models/$slug"
      params={{ slug: model.slug }}
      target="_blank"
      rel="noopener noreferrer"
      className={featured ? 'mdl-feature-card' : 'mdl-card'}
      style={{ animationDelay: `${index * 0.07}s` }}
      aria-label={`View ${model.name}'s talent profile in a new tab`}
    >
      {model.imagePaths[0] ? (
        <img
          className={featured ? 'mdl-feature-img' : 'mdl-card-img'}
          src={model.imagePaths[0]}
          alt={model.name}
          loading="lazy"
        />
      ) : (
        <span className={featured ? 'mdl-feature-img mdl-talent-placeholder' : 'mdl-card-img mdl-talent-placeholder'} aria-hidden="true">
          {model.name.slice(0, 1)}
        </span>
      )}
      <span className={featured ? 'mdl-feature-overlay' : 'mdl-card-overlay'}>
        <span className={featured ? 'mdl-feature-name' : 'mdl-card-name'}>{model.name}</span>
        <span className={featured ? 'mdl-feature-cats' : 'mdl-card-cats'}>
          {model.types.join(' · ')}
        </span>
        <span className={featured ? 'mdl-feature-link' : 'mdl-card-profile-label'}>
          View Profile →
        </span>
      </span>
    </Link>
  )
}

function ModelsPage() {
  const revealRef = useScrollReveal()
  const [filter, setFilter] = useState('All')
  const heroRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const filtered = useMemo(
    () => (filter === 'All' ? MODELS : MODELS.filter((model) => model.types.includes(filter))),
    [filter],
  )

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const hero = heroRef.current
    const glow = glowRef.current
    const layer = parallaxRef.current
    if (!hero) return

    let frame = 0
    const onMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const offsetX = (x / rect.width - 0.5) * 2
      const offsetY = (y / rect.height - 0.5) * 2

      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (glow) glow.style.transform = `translate(${x}px, ${y}px)`
        if (layer) layer.style.transform = `translate(${offsetX * -14}px, ${offsetY * -14}px)`
      })
    }

    hero.addEventListener('mousemove', onMove)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="models-page" ref={revealRef}>
      <section className="mdl-hero" ref={heroRef} aria-label="LSMG talent management introduction">
        <div className="mdl-hero-bg" ref={parallaxRef} aria-hidden="true" />
        <div className="mdl-hero-scrim" />
        <div className="mdl-hero-glow" ref={glowRef} aria-hidden="true" />

        <div className="mdl-hero-inner">
          <span className="mdl-eyebrow" style={{ animation: 'fadeUp .7s ease both' }}>
            LSMG Talent Management
          </span>
          <h1 className="mdl-hero-title">
            <span className="mdl-hero-line"><StaggerText text="LSMG Talent" delay={0.15} /></span>
            <span className="mdl-hero-line mdl-hero-amp">
              <span className="word-stagger mdl-accent" style={{ animationDelay: '0.5s' }}>Management</span>
            </span>
          </h1>
          <p className="mdl-hero-deck scroll-reveal" style={{ animation: 'fadeUp .7s ease .55s both', maxWidth: 760 }}>
            Management built around where you’re going. LSMG represents and develops select models, artists, creators, personalities and multimedia talent across entertainment, fashion and culture. We combine representation with media strategy, bookings, partnerships and career development to create opportunities that extend beyond a single campaign or appearance.
          </p>
          <div className="mdl-hero-cta" style={{ animation: 'fadeUp .7s ease .7s both' }}>
            <a href="#featured" className="mdl-btn mdl-btn-primary">Explore Roster</a>
            <Link to="/contact" className="mdl-btn mdl-btn-ghost">Representation Inquiry</Link>
          </div>
          <div className="mdl-hero-meta" style={{ animation: 'fadeUp .7s ease .85s both' }}>
            <span><strong>{MODELS.length}</strong> Active Profiles</span>
            <span><strong>1</strong> Management Ecosystem</span>
            <span><strong>{FILTERS.length - 1}</strong> Roster Specialties</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '110px 40px', background: '#050505', borderBottom: '1px solid #171717' }} aria-label="Talent management scope">
        <div className="max-w-[1400px] mx-auto">
          <div className="scroll-reveal" style={{ marginBottom: 50 }}>
            <span className="mdl-eyebrow">The Division</span>
            <h2 className="mdl-section-title" style={{ marginTop: 10 }}>More Than a <span className="mdl-accent">Model Roster.</span></h2>
            <p className="mdl-section-deck" style={{ maxWidth: 760 }}>
              The current visible roster is model-led, but LSMG Talent is built as a broader management division. The structure supports select talent across entertainment, fashion and culture as the roster grows.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 scroll-reveal" style={{ gap: 2, background: 'var(--red)' }}>
            {TALENT_SCOPE.map((item) => (
              <div key={item.label} style={{ background: '#090909', minHeight: 150, padding: '26px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, color: 'var(--red)', textTransform: 'uppercase' }}>{item.status}</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 29, lineHeight: 1 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '110px 40px' }} aria-label="How LSMG manages talent">
        <div className="max-w-[1400px] mx-auto">
          <div className="scroll-reveal" style={{ marginBottom: 50 }}>
            <span className="mdl-eyebrow">How Management Works</span>
            <h2 className="mdl-section-title" style={{ marginTop: 10 }}>Career Direction <span className="mdl-accent">+ Opportunity.</span></h2>
            <p className="mdl-section-deck" style={{ maxWidth: 760 }}>
              Talent booking gets someone an opportunity. Talent management helps guide the career around those opportunities. LSMG connects the two through PR, media, partnerships and bookings.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 scroll-reveal" style={{ gap: 2, background: 'var(--red)' }}>
            {MANAGEMENT_SERVICES.map((service) => (
              <div key={service.title} style={{ background: '#090909', padding: '34px 30px', minHeight: 250 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(200,16,46,.7)', fontSize: 10, letterSpacing: 3 }}>{service.num}</span>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 31, margin: '18px 0 12px' }}>{service.title}</h3>
                <p style={{ color: '#9f9f9f', fontSize: 14.5, lineHeight: 1.7 }}>{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="scroll-reveal" style={{ marginTop: 30 }}>
            <Link to="/pr" className="mdl-btn mdl-btn-ghost">Explore PR, Media & Booking →</Link>
          </div>
        </div>
      </section>

      <section className="mdl-feature-section" id="featured" aria-label="Featured faces">
        <div className="mdl-section-head scroll-reveal">
          <span className="mdl-eyebrow">Current Roster</span>
          <h2 className="mdl-section-title">Featured <span className="mdl-accent">Faces</span></h2>
          <p className="mdl-section-deck">Tap any name to open the full talent profile in a new tab.</p>
        </div>
        <div className="mdl-feature-grid">
          {FEATURED_MODELS.map((model, index) => (
            <ModelCard key={model.slug} model={model} index={index} featured />
          ))}
        </div>
      </section>

      <section className="mdl-section" id="roster" aria-label="Talent roster">
        <div className="mdl-section-head scroll-reveal">
          <span className="mdl-eyebrow">Active Model Roster</span>
          <h2 className="mdl-section-title">Talent <span className="mdl-accent">Roster</span></h2>
          <p className="mdl-section-deck">The active profiles below currently represent the model-facing side of LSMG Talent Management. Every name opens the talent profile and booking information.</p>
        </div>

        <div className="mdl-filters scroll-reveal" role="tablist" aria-label="Filter talent by specialty">
          {FILTERS.map((specialty) => (
            <button
              key={specialty}
              type="button"
              role="tab"
              aria-selected={filter === specialty}
              className={`mdl-filter${filter === specialty ? ' mdl-filter-active' : ''}`}
              onClick={() => setFilter(specialty)}
            >
              {specialty}
              {specialty !== 'All' && (
                <span className="mdl-filter-count">
                  {MODELS.filter((model) => model.types.includes(specialty)).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mdl-grid" key={filter}>
          {filtered.map((model, index) => (
            <ModelCard key={model.slug} model={model} index={index} />
          ))}
        </div>
      </section>

      <section className="mdl-cta-band scroll-reveal" aria-label="Become LSMG talent">
        <div className="mdl-cta-inner">
          <span className="mdl-eyebrow">Representation</span>
          <h2 className="mdl-cta-title">Build What Comes <span className="mdl-accent">Next.</span></h2>
          <p className="mdl-cta-deck">
            LSMG considers select models, artists, creators, personalities and multimedia talent for representation. Tell us where you are now, where you are trying to go and what kind of opportunities you want to build toward.
          </p>
          <div className="mdl-hero-cta">
            <Link to="/contact" className="mdl-btn mdl-btn-primary">Representation Inquiry</Link>
            <Link to="/pr" className="mdl-btn mdl-btn-ghost">Management, PR &amp; Booking</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
