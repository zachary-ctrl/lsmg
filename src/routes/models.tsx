import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
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

function TalentPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('Models')
  const representedModels = useMemo(() => MODELS, [])

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
              onClick={() => setActiveCategory(category)}
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

      <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
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

          {activeCategory === 'Models' ? (
            <>
              <p className="mb-12 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
                Models represented by Last Shot Media Group. This roster is intentionally focused on representation — one defining image per person, with booking and partnership inquiries handled through LSMG.
              </p>

              <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {representedModels.map((model) => (
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
                          Model · {model.city}
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

              <div className="mt-20 border border-white/10 bg-[#080808] p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
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
              </div>
            </>
          ) : (
            <div className="min-h-[420px] border-y border-white/10 py-16 sm:py-24">
              <div className="max-w-3xl">
                <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--red)]">
                  Representation Category
                </div>
                <h3 className="font-['Bebas_Neue'] text-5xl uppercase leading-none sm:text-7xl">
                  {activeCategory} roster
                </h3>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
                  This category is now part of the new LSMG Talent architecture. Represented talent will appear here as the roster is added, using the same clean one-image representation format.
                </p>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex border-b border-[var(--red)] pb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white"
                >
                  Representation & booking inquiries →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
