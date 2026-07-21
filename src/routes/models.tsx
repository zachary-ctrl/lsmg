import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MODELS } from '../data/models'
import { netlifyImage } from '../lib/netlify-image'

export const Route = createFileRoute('/models')({
  component: ModelsPage,
  head: () => ({
    meta: [
      { title: 'Models & Talent | Last Shot Media Group — LSMG Talent Roster' },
      {
        name: 'description',
        content:
          'The LSMG talent roster — editorial, commercial, runway and beauty models represented by Last Shot Media Group across Dallas, Orlando, New York and Atlanta. Explore the roster and book talent.',
      },
      { property: 'og:title', content: 'Models & Talent | LSMG Talent Roster' },
      {
        property: 'og:description',
        content:
          'Explore the Last Shot Media Group talent roster — editorial, commercial, runway and beauty models across four cities.',
      },
    ],
  }),
})

const FILTERS = ['All', ...Array.from(new Set(MODELS.flatMap((model) => model.types)))]
const FEATURED_MODELS = MODELS.filter((model) => model.featured)

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
      aria-label={`View ${model.name}'s portfolio in a new tab`}
    >
      <img
        src={netlifyImage(model.imagePaths[0], featured ? 900 : 720, featured ? 1080 : 960)}
        alt={`${model.name} — LSMG ${model.types.join(' and ')} model`}
        className={featured ? 'mdl-feature-img' : 'mdl-card-img'}
        loading={featured ? 'eager' : 'lazy'}
      />
      <span className={featured ? 'mdl-feature-overlay' : 'mdl-card-overlay'}>
        {featured && <span className="mdl-feature-city">{model.city}</span>}
        <span className={featured ? 'mdl-feature-name' : 'mdl-card-name'}>{model.name}</span>
        <span className={featured ? 'mdl-feature-cats' : 'mdl-card-cats'}>
          {model.types.join(' · ')}
        </span>
        <span className={featured ? 'mdl-feature-link' : 'mdl-card-profile-label'}>
          View Portfolio →
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
      <section className="mdl-hero" ref={heroRef} aria-label="Models and talent introduction">
        <div
          className="mdl-hero-bg"
          ref={parallaxRef}
          style={{ backgroundImage: `url(${netlifyImage('/models/hero-atmos.jpg', 1600, undefined, 60)})` }}
        />
        <div className="mdl-hero-scrim" />
        <div className="mdl-hero-glow" ref={glowRef} aria-hidden="true" />

        <div className="mdl-hero-inner">
          <span className="mdl-eyebrow" style={{ animation: 'fadeUp .7s ease both' }}>
            LSMG Talent Division
          </span>
          <h1 className="mdl-hero-title">
            <span className="mdl-hero-line"><StaggerText text="Models" delay={0.15} /></span>
            <span className="mdl-hero-line mdl-hero-amp">
              <span className="word-stagger" style={{ animationDelay: '0.4s' }}>&amp;&nbsp;</span>
              <span className="word-stagger mdl-accent" style={{ animationDelay: '0.5s' }}>Talent</span>
            </span>
          </h1>
          <p className="mdl-hero-deck scroll-reveal" style={{ animation: 'fadeUp .7s ease .55s both' }}>
            The Last Shot Media Group roster — editorial, commercial, runway and beauty talent
            represented across Dallas, Orlando, New York and Atlanta.
          </p>
          <div className="mdl-hero-cta" style={{ animation: 'fadeUp .7s ease .7s both' }}>
            <a href="#featured" className="mdl-btn mdl-btn-primary">Explore Roster</a>
            <Link to="/contact" className="mdl-btn mdl-btn-ghost">Book Talent</Link>
          </div>
          <div className="mdl-hero-meta" style={{ animation: 'fadeUp .7s ease .85s both' }}>
            <span><strong>{MODELS.length}</strong> Talent</span>
            <span><strong>4</strong> Cities</span>
            <span><strong>{FILTERS.length - 1}</strong> Specialties</span>
          </div>
        </div>
      </section>

      <section className="mdl-feature-section" id="featured" aria-label="Featured faces">
        <div className="mdl-section-head scroll-reveal">
          <span className="mdl-eyebrow">Meet the Roster</span>
          <h2 className="mdl-section-title">Featured <span className="mdl-accent">Faces</span></h2>
          <p className="mdl-section-deck">Tap any portrait to open the full profile in a new tab.</p>
        </div>
        <div className="mdl-feature-grid">
          {FEATURED_MODELS.map((model, index) => (
            <ModelCard key={model.slug} model={model} index={index} featured />
          ))}
        </div>
      </section>

      <section className="mdl-section" id="roster" aria-label="Talent roster">
        <div className="mdl-section-head scroll-reveal">
          <span className="mdl-eyebrow">Our Models</span>
          <h2 className="mdl-section-title">Talent <span className="mdl-accent">Roster</span></h2>
          <p className="mdl-section-deck">Every portrait, name, and portfolio prompt opens the model’s full profile.</p>
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

      <section className="mdl-cta-band scroll-reveal" aria-label="Become talent">
        <div className="mdl-cta-inner">
          <span className="mdl-eyebrow">Join the Roster</span>
          <h2 className="mdl-cta-title">Think you have <span className="mdl-accent">the look?</span></h2>
          <p className="mdl-cta-deck">
            LSMG is always scouting new faces across editorial, commercial, runway and beauty.
            Submit for representation or book existing talent for your next production.
          </p>
          <div className="mdl-hero-cta">
            <Link to="/contact" className="mdl-btn mdl-btn-primary">Become a Talent</Link>
            <Link to="/pr" className="mdl-btn mdl-btn-ghost">Booking &amp; PR</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
