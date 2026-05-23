import { createFileRoute, Link } from '@tanstack/react-router'
import {
  featuredFilms,
  secondaryFilms,
  outdoorScreenings,
} from '../data/tribeca-films'

export const Route = createFileRoute('/tribeca/')({
  head: () => ({
    meta: [
      {
        title: 'Tribeca 2026 Coverage | The LSMG Ledger',
      },
      {
        name: 'description',
        content:
          "The LSMG Ledger's complete on-the-ground coverage of the 2026 Tribeca Festival — film reviews, interviews, red carpet, and games. June 3–14, New York City.",
      },
    ],
  }),
  component: TribecaIndex,
})

function TribecaNav({ current }: { current: 'coverage' | 'schedule' }) {
  return (
    <nav className="tc-nav">
      <div className="tc-nav-inner">
        <Link
          to="/tribeca"
          className={current === 'coverage' ? 'tc-current' : ''}
        >
          All Coverage
        </Link>
        <Link
          to="/tribeca/schedule"
          className={current === 'schedule' ? 'tc-current' : ''}
        >
          Daily Schedule
        </Link>
        {featuredFilms.map((f) => (
          <Link key={f.slug} to="/tribeca/films/$filmSlug" params={{ filmSlug: f.slug }}>
            {f.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export { TribecaNav }

function TribecaIndex() {
  return (
    <div className="tribeca-page">
      {/* TOP BAR */}
      <div className="tc-topbar">
        <div className="tc-topbar-inner">
          <div className="tc-topbar-left">
            <span>The LSMG Ledger</span>
            <span className="tc-dot">&#9679;</span>
            <span>On the Ground in New York</span>
            <span className="tc-dot">&#9679;</span>
            <span>June 3–14, 2026</span>
          </div>
          <div>Tribeca Festival 25th Anniversary</div>
        </div>
      </div>

      {/* MASTHEAD */}
      <header className="tc-masthead">
        <div className="tc-masthead-inner">
          <div className="tc-masthead-meta">
            <div>Volume 1, Issue 1</div>
            <div>New York, NY</div>
          </div>
          <div>
            <h1 className="tc-masthead-title">
              The LSMG
              <br />
              <em>Ledger</em>
            </h1>
          </div>
          <div className="tc-masthead-meta tc-right">
            <div>lastshotmediagroup.com</div>
            <div>Independent Press</div>
          </div>
        </div>
        <div className="tc-masthead-divider">
          <hr />
          <span>Tribeca Festival 2026 — Special Coverage Issue</span>
          <hr />
          <hr />
        </div>
      </header>

      <TribecaNav current="coverage" />

      {/* LEAD */}
      <section className="tc-lead">
        <div className="tc-lead-tag">
          &#9679; Live From New York &#9679; June 3–14, 2026
        </div>
        <h2 className="tc-lead-headline">
          Tribeca at <em>25</em>
        </h2>
        <p className="tc-lead-deck">
          The LSMG Ledger is credentialed press at the 2026 Tribeca Festival —
          five team members on the ground across twelve days, covering the films,
          the conversations, the games, and the culture that define this moment
          in independent cinema.
        </p>
        <p className="tc-lead-byline">
          <strong>Zachary Heneden</strong> &nbsp;—&nbsp; Editor in Chief
          &nbsp;|&nbsp; Last Shot Media Group &nbsp;|&nbsp; Dallas → New York
        </p>
      </section>

      {/* FEATURED FILMS */}
      <main className="tc-films">
        {featuredFilms.map((film) => (
          <article key={film.slug} className="tc-film-feature">
            <div
              className="tc-film-feature-thumb"
              data-num={film.num}
              data-section={film.sectionLabel}
            >
              <div
                className="tc-film-feature-thumb-bg"
                style={{ background: film.gradient }}
              />
            </div>
            <div>
              <div className="tc-credits">{film.director}</div>
              <h3>
                <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: film.slug }}>
                  {film.title}
                </Link>
              </h3>
              <p className="tc-deck">{film.deck}</p>
              <div className="tc-tag-row">
                {film.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`tc-tag${tag.variant === 'red' ? ' tc-red-tag' : ''}`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <div className="tc-meta">
                {film.screenings.map((s, i) => (
                  <div key={i}>
                    <strong>{s.date}</strong> {s.details}
                  </div>
                ))}
              </div>
              <Link
                to="/tribeca/films/$filmSlug"
                params={{ filmSlug: film.slug }}
                className="tc-read"
              >
                Read Coverage →
              </Link>
            </div>
          </article>
        ))}
      </main>

      {/* SECONDARY GRID */}
      <section className="tc-section">
        <div className="tc-section-header">
          <span className="tc-section-num">▸</span>
          <h2 className="tc-section-title">Full Coverage — 30+ Films</h2>
          <span className="tc-section-meta">June 3–14, 2026</span>
        </div>
      </section>

      <div className="tc-films">
        <div className="tc-films-grid">
          {secondaryFilms.map((film, i) => (
            <article key={i} className="tc-film-card">
              <div className="tc-film-card-tag">{film.tag}</div>
              <h4>
                {film.slug ? (
                  <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: film.slug }}>
                    {film.title}
                  </Link>
                ) : (
                  film.title
                )}
              </h4>
              <div className="tc-credits">{film.credits}</div>
              <p className="tc-blurb">{film.blurb}</p>
              <div className="tc-dates">
                <strong>{film.dates}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* 25TH ANNIVERSARY OUTDOOR */}
      <section className="tc-section">
        <div className="tc-section-header">
          <span className="tc-section-num">▸</span>
          <h2 className="tc-section-title">
            25th Anniversary — Free Outdoor Screenings
          </h2>
          <span className="tc-section-meta">
            Hudson Yards — Nightly 7 PM, Jun 4–14
          </span>
        </div>
        <div className="tc-films-grid">
          {outdoorScreenings.map((film, i) => (
            <article key={i} className="tc-film-card">
              <div className="tc-film-card-tag">{film.tag}</div>
              <h4>{film.title}</h4>
              <div className="tc-credits">{film.credits}</div>
              <p className="tc-blurb">{film.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tc-footer">
        <div className="tc-footer-inner">
          <div className="tc-footer-top">
            <div className="tc-footer-brand">
              <h2>
                The LSMG <em>Ledger</em>
              </h2>
              <p>
                Editorial coverage from Last Shot Media Group Holdings.
                Independent press. Dallas-based, internationally credentialed.
                Covering the films, artists, and stories that deserve attention.
              </p>
            </div>
            <div className="tc-footer-col">
              <h4>Tribeca 2026</h4>
              <Link to="/tribeca">All Coverage</Link>
              <Link to="/tribeca/schedule">Daily Schedule</Link>
              <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: 'mexicanamerican' }}>
                MEXICANAMERICAN
              </Link>
              <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: 'harvest' }}>
                HARVEST
              </Link>
              <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: 'airport-blvd' }}>
                AIRPORT BLVD
              </Link>
            </div>
            <div className="tc-footer-col">
              <h4>Last Shot Media Group</h4>
              <Link to="/">Website</Link>
              <a
                href="https://podcasts.apple.com/us/podcast/the-last-shot-podcast/id1494831568"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Podcasts
              </a>
              <a
                href="https://open.spotify.com/show/0RqHPKHBk4sHPuJTNqpLia"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spotify
              </a>
              <a
                href="https://www.instagram.com/lastshotmediagroup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="tc-footer-bottom">
            <span>
              &copy; 2026 Last Shot Media Group Holdings. The LSMG Ledger. All
              Rights Reserved.
            </span>
            <span>Tribeca Festival 2026 — Official Press</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
