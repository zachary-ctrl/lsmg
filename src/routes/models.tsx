import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { MODELS } from '../data/models'
import { netlifyImage } from '../lib/netlify-image'

export const Route = createFileRoute('/models')({
  component: TalentPage,
  head: () => ({
    meta: [
      { title: 'Talent | Last Shot Media Group' },
      {
        name: 'description',
        content:
          'Explore talent represented by Last Shot Media Group across models, actors, sports, music, media, creators and public figures.',
      },
      { property: 'og:title', content: 'Talent | Last Shot Media Group' },
      {
        property: 'og:description',
        content:
          'Talent represented by Last Shot Media Group across entertainment, fashion, sports, media and public life.',
      },
    ],
  }),
})

const CATEGORIES = ['Models', 'Actors', 'Sports', 'Music', 'Media', 'Public Figures'] as const

type Category = (typeof CATEGORIES)[number]

const categoryHash: Record<Category, string> = {
  Models: 'models',
  Actors: 'actors',
  Sports: 'sports',
  Music: 'music',
  Media: 'media',
  'Public Figures': 'public-figures',
}

function TalentPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Models')
  const representedModels = useMemo(() => MODELS, [])
  const musicTalent = useMemo(() => MODELS.filter((talent) => talent.types.includes('Music')), [])
  const sportsTalent = useMemo(() => MODELS.filter((talent) => talent.types.includes('Sports')), [])
  const rosterFor: Partial<Record<Category, typeof MODELS>> = { Models: representedModels, Music: musicTalent, Sports: sportsTalent }
  const roleFor: Partial<Record<Category, string>> = { Models: 'Model', Music: 'Artist · Singer', Sports: 'Athlete · Model' }

  useEffect(() => {
    const syncCategory = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase()
      const match = CATEGORIES.find((category) => categoryHash[category] === hash)
      if (match) setActiveCategory(match)
    }
    syncCategory()
    window.addEventListener('hashchange', syncCategory)
    window.addEventListener('popstate', syncCategory)
    return () => {
      window.removeEventListener('hashchange', syncCategory)
      window.removeEventListener('popstate', syncCategory)
    }
  }, [])

  const selectCategory = (category: Category) => {
    setActiveCategory(category)
    window.history.replaceState(null, '', `#${categoryHash[category]}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-4 pb-16 pt-32 sm:px-6 lg:px-10 lg:pb-24 lg:pt-40">
        <div className="pointer-events-none absolute inset-0 opacity-35" aria-hidden="true">
          <div className="absolute left-0 top-0 h-px w-full bg-[var(--red)]" />
          <div className="absolute right-[-10%] top-16 h-80 w-80 rounded-full bg-[var(--red)]/20 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">
            <span className="text-[var(--red)]">LSMG / Representation</span>
            <span>Dallas · Orlando · New York · Atlanta</span>
          </div>

          <h1 className="max-w-6xl font-['Bebas_Neue'] text-[clamp(5rem,15vw,13rem)] leading-[0.76] tracking-[-0.03em]">
            TALENT
          </h1>

          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1.4fr_.6fr] lg:items-end">
            <p className="max-w-3xl text-xl leading-relaxed text-white/70 sm:text-2xl">
              Last Shot Media Group represents talent across entertainment, fashion, sports, media and public life — building careers, visibility and opportunities around the people we represent.
            </p>
            <div className="lg:text-right">
              <Link
                to="/contact"
                className="inline-flex border border-[var(--red)] bg-[var(--red)] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-transparent"
              >
                Representation Inquiry →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-[70px] z-20 border-b border-white/10 bg-black/95 px-4 backdrop-blur sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-[1400px] gap-6 overflow-x-auto py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              aria-pressed={activeCategory === category}
              aria-controls="talent-roster"
              className={`shrink-0 border-b pb-2 font-mono text-[11px] uppercase tracking-[0.2em] transition ${
                activeCategory === category
                  ? 'border-[var(--red)] text-white'
                  : 'border-transparent text-white/45 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section id="talent-roster" className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--red)]">
                LSMG Talent
              </div>
              <h2 className="font-['Bebas_Neue'] text-6xl uppercase leading-none sm:text-7xl lg:text-8xl">
                {activeCategory}
              </h2>
            </div>

            {activeCategory === 'Models' && (
              <a
                href="https://ledgeramagazine.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
              >
                Looking for LEDGERA Models?
                <span className="text-[var(--red)] transition-transform group-hover:translate-x-1">→</span>
              </a>
            )}
          </div>

          {rosterFor[activeCategory] ? (
            <>
              <p className="mb-12 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
                {activeCategory === 'Music' ? 'Artists whose current published LSMG profiles include music. Browse individual portfolios and contact the team for artist booking.' : activeCategory === 'Sports' ? 'Athletes represented by Last Shot Media Group across sports, fitness and brand partnerships, with booking and partnership inquiries handled through LSMG.' : 'Models represented by Last Shot Media Group. This roster is intentionally focused on representation — one defining image per person, with booking and partnership inquiries handled through LSMG.'}
              </p>

              <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {(rosterFor[activeCategory] ?? []).map((model) => (
                  <article key={model.slug} className="group">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0d0d]">
                      <img
                        src={netlifyImage(model.imagePaths[0], 800, 1000, 75)}
                        alt={`${model.name} — represented by Last Shot Media Group`}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[var(--red)] transition-transform duration-500 group-hover:scale-x-100" />
                    </div>

                    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-4">
                      <div>
                        <h3 className="font-['Bebas_Neue'] text-3xl tracking-wide">{model.name}</h3>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                          {roleFor[activeCategory]}{model.city ? ` · ${model.city}` : ''}
                        </p>
                      </div>
                      <Link
                        to="/contact"
                        className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--red)] hover:text-white"
                        aria-label={`Inquire about ${model.name}`}
                      >
                        Inquire →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {activeCategory === 'Models' && <div className="mt-20 border border-white/10 bg-[#080808] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
                <div>
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--red)]">
                    LEDGERA / Models
                  </div>
                  <h3 className="font-['Bebas_Neue'] text-5xl uppercase sm:text-6xl">Models representing LEDGERA</h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55">
                    LEDGERA also works with its own faces for magazine editorials, campaigns, events and brand activations. Those models are presented separately from LSMG representation.
                  </p>
                </div>
                <a
                  href="https://ledgeramagazine.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex border border-white/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition hover:border-[var(--red)] hover:text-[var(--red)] lg:mt-0"
                >
                  Explore LEDGERA →
                </a>
              </div>}
            </>
          ) : activeCategory === 'Public Figures' ? (
            <div className="lsmg-public-roster">
              <article className="lsmg-public-roster-card">
                <a href="/public-figures/sandra-fatmi-hall" className="lsmg-public-roster-photo" aria-label="View Sandra Fatmi-Hall's profile">
                  <img src="https://images.squarespace-cdn.com/content/v1/536e3872e4b02cbd6b6e124c/82cb18b8-a019-4534-a006-323bfa5de1e9/Sandra%2BFatmi-Hall%2C%2BHeadshot.png" alt="Sandra Fatmi-Hall" loading="lazy" />
                </a>
                <div className="lsmg-public-roster-info">
                  <span className="editorial-kicker">Public Figure / Speaker</span>
                  <h3>Sandra Fatmi-Hall</h3>
                  <p>Founder, CEO and Executive Director of the United Foundation of Central Florida. A nonprofit leader, philanthropist, mentor and speaker focused on building leaders intentionally.</p>
                  <div className="lsmg-hero-actions">
                    <a className="editorial-cta red" href="/public-figures/sandra-fatmi-hall">View Profile ↗</a>
                    <a className="editorial-cta" href="/contact">Speaking Inquiry ↗</a>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            <div className="lsmg-roster-inquiry">
              <div className="lsmg-roster-inquiry-copy">
                <span className="editorial-kicker">Talent / {activeCategory}</span>
                <h3>{activeCategory === 'Actors' ? 'ACTORS & CASTING' : 'MEDIA & ON-CAMERA'}</h3>
                <p>{activeCategory === 'Actors'
                  ? 'For screen, stage, commercial and casting inquiries, speak with LSMG about active opportunities and verified availability. Individual profiles are shared when approved for public booking.'
                  : 'For hosts, interviewers, media personalities and brand-facing talent, our team can advise on interview production, appearances and available talent. On-camera work and editorial staffing do not automatically imply talent representation.'}</p>
                <a href="/contact" className="editorial-cta red">Ask About {activeCategory} ↗</a>
              </div>
              {activeCategory === 'Media' && <img src="/team/ashley.jpg" alt="LSMG team member Ashley Diaz" loading="lazy" />}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
