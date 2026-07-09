import { createFileRoute, Link } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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

/* ──────────────────────────────────────────────────────────
   Talent roster data
   Each model has a set of paired shots (e.g. "Amora 1", "Amora 2")
   shown together in the profile gallery. Stats are roster comp-card
   placeholders — edit per talent as real measurements are confirmed.
   ────────────────────────────────────────────────────────── */
type Model = {
  id: string
  name: string
  location: string
  categories: string[]
  tagline: string
  bio: string
  stats: { label: string; value: string }[]
  gallery: string[]
  tall?: boolean
  featured?: boolean
}

const MODELS: Model[] = [
  {
    id: 'amora',
    name: 'Amora',
    location: 'Atlanta',
    categories: ['Editorial', 'Runway'],
    tagline: 'Editorial presence with runway command.',
    bio: 'Amora brings a magnetic editorial range to every set — equally at home in high-fashion campaigns and on the runway. A versatile face for LSMG’s Atlanta roster, she pairs sharp angles with effortless movement, anchoring stories that demand both edge and elegance.',
    stats: [
      { label: 'Height', value: "5'9\"" },
      { label: 'Bust', value: '32"' },
      { label: 'Waist', value: '24"' },
      { label: 'Hips', value: '35"' },
      { label: 'Hair', value: 'Black' },
      { label: 'Eyes', value: 'Brown' },
    ],
    gallery: [
      '/models/amora-1.jpg',
      '/models/amora-2.jpg',
      '/models/amora-3.jpg',
      '/models/amora-4.jpg',
      '/models/amora-5.jpg',
      '/models/amora-6.jpg',
    ],
    tall: true,
    featured: true,
  },
  {
    id: 'haile',
    name: 'Haile',
    location: 'New York',
    categories: ['Editorial', 'Commercial'],
    tagline: 'A New York editorial talent with commercial warmth.',
    bio: 'Haile moves between the editorial and commercial worlds with rare ease. Her New York-honed presence reads as both aspirational and approachable — the kind of face that carries a cover and a campaign with the same conviction. A cornerstone of the LSMG roster.',
    stats: [
      { label: 'Height', value: "5'10\"" },
      { label: 'Bust', value: '33"' },
      { label: 'Waist', value: '25"' },
      { label: 'Hips', value: '35"' },
      { label: 'Hair', value: 'Dark Brown' },
      { label: 'Eyes', value: 'Hazel' },
    ],
    gallery: [
      '/models/haile-1.jpg',
      '/models/haile-2.jpg',
      '/models/haile-3.jpg',
      '/models/haile-4.jpg',
      '/models/haile-5.jpg',
    ],
    featured: true,
  },
  {
    id: 'nani',
    name: 'Nani',
    location: 'Dallas',
    categories: ['Commercial', 'Print'],
    tagline: 'Commercial range built for print and brand.',
    bio: 'Nani is a commercial and print specialist with an instinct for connection. Based out of Dallas, she delivers the kind of relatable, camera-ready energy brands build campaigns around — clean, confident, and consistently on-brief.',
    stats: [
      { label: 'Height', value: "5'8\"" },
      { label: 'Bust', value: '34"' },
      { label: 'Waist', value: '26"' },
      { label: 'Hips', value: '36"' },
      { label: 'Hair', value: 'Black' },
      { label: 'Eyes', value: 'Dark Brown' },
    ],
    gallery: ['/models/nani-1.jpg', '/models/nani-2.jpg', '/models/nani-3.jpg'],
    tall: true,
    featured: true,
  },
  {
    id: 'saanvi',
    name: 'Saanvi',
    location: 'Orlando',
    categories: ['Runway', 'Beauty'],
    tagline: 'Runway lines and beauty-campaign poise.',
    bio: 'Saanvi blends runway discipline with a beauty-campaign sensibility. Representing LSMG’s Orlando roster, she brings clean lines and a striking, editorial-beauty quality that translates from catwalk to close-up without losing a single degree of composure.',
    stats: [
      { label: 'Height', value: "5'11\"" },
      { label: 'Bust', value: '32"' },
      { label: 'Waist', value: '24"' },
      { label: 'Hips', value: '34"' },
      { label: 'Hair', value: 'Black' },
      { label: 'Eyes', value: 'Brown' },
    ],
    gallery: ['/models/saanvi-1.jpg', '/models/saanvi-2.jpg'],
    featured: true,
  },
]

/* All specialty filters, derived from the roster. */
const FILTERS = ['All', ...Array.from(new Set(MODELS.flatMap((m) => m.categories)))]

/* Netlify Image CDN helper — transforms + optimizes on the edge so the
   large source photos ship as right-sized, format-negotiated images. */
function cdn(src: string, w: number, h?: number, q = 72) {
  const params = new URLSearchParams({ url: src, w: String(w), q: String(q) })
  if (h) {
    params.set('h', String(h))
    params.set('fit', 'cover')
    params.set('position', 'top')
  }
  return `/.netlify/images?${params.toString()}`
}

/* Staggered, word-by-word headline reveal (matches the About hero). */
function StaggerText({ text, delay = 0.2 }: { text: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="word-stagger" style={{ animationDelay: `${delay + i * 0.06}s` }}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

/* Reveal children with the shared scroll-reveal observer. */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.12 },
    )
    const observe = () => el.querySelectorAll('.scroll-reveal:not(.revealed)').forEach((c) => observer.observe(c))
    observe()
    return () => observer.disconnect()
  })
  return ref
}

function ModelsPage() {
  const revealRef = useScrollReveal()
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState<Model | null>(null)
  const [closing, setClosing] = useState(false)
  const [slide, setSlide] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const filtered = useMemo(
    () => (filter === 'All' ? MODELS : MODELS.filter((m) => m.categories.includes(filter))),
    [filter],
  )

  /* Cursor-following glow + subtle mouse parallax on the hero. */
  useEffect(() => {
    if (prefersReduced) return
    const hero = heroRef.current
    const glow = glowRef.current
    const layer = parallaxRef.current
    if (!hero) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = (x / rect.width - 0.5) * 2
      const cy = (y / rect.height - 0.5) * 2
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (glow) glow.style.transform = `translate(${x}px, ${y}px)`
        if (layer) layer.style.transform = `translate(${cx * -14}px, ${cy * -14}px)`
      })
    }
    hero.addEventListener('mousemove', onMove)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [prefersReduced])

  /* Gentle scroll parallax on the hero background. */
  useEffect(() => {
    if (prefersReduced) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const bg = heroRef.current?.querySelector('.mdl-hero-bg') as HTMLElement | null
        if (bg) bg.style.transform = `translateY(${window.scrollY * 0.18}px) scale(1.08)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [prefersReduced])

  const openProfile = useCallback((m: Model) => {
    setClosing(false)
    setSlide(0)
    setActive(m)
  }, [])

  const closeProfile = useCallback(() => {
    setClosing(true)
    window.setTimeout(() => {
      setActive(null)
      setClosing(false)
    }, 250)
  }, [])

  const move = useCallback(
    (dir: number) => {
      setActive((cur) => {
        if (cur) setSlide((s) => (s + dir + cur.gallery.length) % cur.gallery.length)
        return cur
      })
    },
    [],
  )

  /* Lock scroll + keyboard controls while the profile is open. */
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProfile()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    document.addEventListener('keydown', onKey)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPad = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPad
    }
  }, [active, closeProfile, move])

  return (
    <div className="models-page" ref={revealRef}>
      {/* ───────────── Hero ───────────── */}
      <section className="mdl-hero" ref={heroRef} aria-label="Models and talent introduction">
        <div className="mdl-hero-bg" style={{ backgroundImage: `url(${cdn('/models/hero-atmos.jpg', 1600, undefined, 60)})` }} />
        <div className="mdl-hero-scrim" />
        <div className="mdl-hero-glow" ref={glowRef} aria-hidden="true" />

        <div className="mdl-hero-inner">
          <span className="mdl-eyebrow" style={{ animation: 'fadeUp .7s ease both' }}>
            LSMG Talent Division
          </span>
          <h1 className="mdl-hero-title">
            <span className="mdl-hero-line">
              <StaggerText text="Models" delay={0.15} />
            </span>
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
            <a href="#roster" className="mdl-btn mdl-btn-primary">Explore Roster</a>
            <Link to="/contact" className="mdl-btn mdl-btn-ghost">Book Talent</Link>
          </div>
          <div className="mdl-hero-meta" style={{ animation: 'fadeUp .7s ease .85s both' }}>
            <span><strong>{MODELS.length}</strong> Talent</span>
            <span><strong>4</strong> Cities</span>
            <span><strong>{FILTERS.length - 1}</strong> Specialties</span>
          </div>
        </div>
        <div className="mdl-hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <span className="mdl-hero-scroll-line" />
        </div>
      </section>

      {/* ───────────── Roster + filters ───────────── */}
      <section className="mdl-section" id="roster" aria-label="Talent roster">
        <div className="mdl-section-head scroll-reveal">
          <span className="mdl-eyebrow">Our Models</span>
          <h2 className="mdl-section-title">Talent <span className="mdl-accent">Roster</span></h2>
          <p className="mdl-section-deck">
            Tap any portrait to open the full profile — paired editorials, measurements and booking.
          </p>
        </div>

        <div className="mdl-filters scroll-reveal" role="tablist" aria-label="Filter talent by specialty">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`mdl-filter${filter === f ? ' mdl-filter-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
              {f !== 'All' && (
                <span className="mdl-filter-count">
                  {MODELS.filter((m) => m.categories.includes(f)).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mdl-grid" key={filter}>
          {filtered.map((m, i) => (
            <button
              key={m.id}
              type="button"
              className="mdl-card"
              style={{ animationDelay: `${i * 0.07}s` }}
              onClick={() => openProfile(m)}
              aria-label={`View ${m.name}'s portfolio — ${m.categories.join(', ')}`}
            >
              <img
                src={cdn(m.gallery[0], 720, 960)}
                alt={`${m.name} — LSMG ${m.categories.join(' and ')} model`}
                className="mdl-card-img"
                loading="lazy"
              />
              <span className="mdl-card-overlay">
                <span className="mdl-card-name">{m.name}</span>
                <span className="mdl-card-cats">{m.categories.join(' · ')}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ───────────── Become talent CTA ───────────── */}
      <section className="mdl-cta-band scroll-reveal" aria-label="Become talent">
        <div className="mdl-cta-inner">
          <span className="mdl-eyebrow">Join the Roster</span>
          <h2 className="mdl-cta-title">
            Think you have <span className="mdl-accent">the look?</span>
          </h2>
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

      {/* ───────────── Profile lightbox ─────────────
          Full-screen: the current shot is duplicated as a zoomed, blurred
          backdrop, with the sharp, uncropped image + details floated on top. */}
      {active && (
        <div
          className={`mdl-lightbox${closing ? ' mdl-lightbox--closing' : ''}`}
          onClick={closeProfile}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} portfolio`}
        >
          <button type="button" className="mdl-lightbox-close" onClick={closeProfile} aria-label="Close profile">
            &times;
          </button>
          <div className="mdl-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            {/* Sharp image + carousel controls */}
            <div className="mdl-lightbox-stage">
              <img
                key={slide}
                src={cdn(active.gallery[slide], 1100, undefined, 82)}
                alt={`${active.name} — shot ${slide + 1} of ${active.gallery.length}`}
                className="mdl-lightbox-img"
              />
              {active.gallery.length > 1 && (
                <>
                  <button type="button" className="mdl-lb-nav mdl-lb-prev" onClick={() => move(-1)} aria-label="Previous shot">&#8249;</button>
                  <button type="button" className="mdl-lb-nav mdl-lb-next" onClick={() => move(1)} aria-label="Next shot">&#8250;</button>
                  <span className="mdl-lb-index">{slide + 1} / {active.gallery.length}</span>
                </>
              )}
              {active.gallery.length > 1 && (
                <div className="mdl-lb-thumbs" role="tablist" aria-label={`${active.name} shots`}>
                  {active.gallery.map((g, gi) => (
                    <button
                      key={g}
                      type="button"
                      role="tab"
                      aria-selected={gi === slide}
                      className={`mdl-lb-thumb${gi === slide ? ' mdl-lb-thumb-active' : ''}`}
                      onClick={() => setSlide(gi)}
                      aria-label={`${active.name} shot ${gi + 1}`}
                    >
                      <img src={cdn(g, 160, 200)} alt="" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="mdl-lightbox-info">
              <span className="mdl-eyebrow">LSMG Roster</span>
              <h3 className="mdl-lightbox-name">{active.name}</h3>
              <p className="mdl-lightbox-tagline">{active.tagline}</p>
              <div className="mdl-lightbox-cats">
                {active.categories.map((c) => (
                  <span key={c} className="mdl-chip">{c}</span>
                ))}
              </div>
              <div className="mdl-lightbox-stats">
                {active.stats.map((s, si) => (
                  <div key={s.label} className="mdl-stat" style={{ animationDelay: `${0.1 + si * 0.05}s` }}>
                    <span className="mdl-stat-label">{s.label}</span>
                    <span className="mdl-stat-value">{s.value}</span>
                  </div>
                ))}
              </div>
              <p className="mdl-lightbox-bio">{active.bio}</p>
              <Link to="/contact" className="mdl-btn mdl-btn-primary mdl-lightbox-book">
                Book {active.name}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
