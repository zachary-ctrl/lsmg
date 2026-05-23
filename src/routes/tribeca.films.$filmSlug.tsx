import { createFileRoute, Link } from '@tanstack/react-router'
import { filmDetails, featuredFilms } from '../data/tribeca-films'

export const Route = createFileRoute('/tribeca/films/$filmSlug')({
  head: ({ params }) => {
    const film = filmDetails[params.filmSlug]
    return {
      meta: film
        ? [
            { title: `${film.title} | Tribeca 2026 | The LSMG Ledger` },
            { name: 'description', content: film.deck },
          ]
        : [{ title: 'Film Not Found | Tribeca 2026' }],
    }
  },
  component: TribecaFilmDetail,
})

function TribecaFilmDetail() {
  const { filmSlug } = Route.useParams()
  const film = filmDetails[filmSlug]

  if (!film) {
    return (
      <div className="tribeca-page">
        <div style={{ maxWidth: 720, margin: '6rem auto', padding: '0 1.25rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>
            Film Not Found
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", marginBottom: '2rem' }}>
            This film page doesn't exist or hasn't been published yet.
          </p>
          <Link
            to="/tribeca"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#C8102E' }}
          >
            ← Back to All Coverage
          </Link>
        </div>
      </div>
    )
  }

  const otherFilms = featuredFilms.filter((f) => f.slug !== filmSlug)

  return (
    <div className="tribeca-page">
      <div className="tc-topbar">
        <div className="tc-topbar-inner">
          <div className="tc-topbar-left">
            <span>The LSMG Ledger</span>
            <span className="tc-dot">&#9679;</span>
            <span>Tribeca 2026</span>
            <span className="tc-dot">&#9679;</span>
            <span>{film.section.split(' — ')[0]}</span>
          </div>
          <div>On the Ground in New York</div>
        </div>
      </div>

      <header className="tc-masthead">
        <div className="tc-masthead-inner">
          <div className="tc-masthead-meta">
            <div>Film Coverage</div>
            <div>Tribeca 2026</div>
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
          </div>
        </div>
        <div className="tc-masthead-divider">
          <hr />
          <span>Tribeca Festival 2026 — Film Coverage</span>
          <hr />
          <hr />
        </div>
      </header>

      <nav className="tc-nav">
        <div className="tc-nav-inner">
          <Link to="/tribeca">← All Coverage</Link>
          {otherFilms.map((f) => (
            <Link key={f.slug} to="/tribeca/films/$filmSlug" params={{ filmSlug: f.slug }}>
              {f.title}
            </Link>
          ))}
        </div>
      </nav>

      <article className="tc-article">
        <Link to="/tribeca" className="tc-article-back">
          ← Back to All Coverage
        </Link>
        <div className="tc-article-section">{film.section}</div>
        <h1 className="tc-article-title">{film.title}</h1>
        <p className="tc-article-deck">{film.deck}</p>
        <div className="tc-article-byline">
          {film.byline.map((b, i) => (
            <div key={i}>
              <strong>{b.label}:</strong> {b.value}
            </div>
          ))}
          <div>
            <span
              className={`tc-review-status${film.reviewStatus === 'under-review' ? ' tc-embargo' : ''}`}
            >
              {film.reviewStatus === 'under-review'
                ? 'Under Review'
                : 'Coverage Coming'}
            </span>
          </div>
        </div>

        {film.meta.length > 0 && (
          <div className="tc-article-meta-box">
            <h3>Film Details</h3>
            <dl>
              {film.meta.map((m, i) => (
                <div key={i} style={{ display: 'contents' }}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div
          className="tc-article-body"
          dangerouslySetInnerHTML={{ __html: film.body }}
        />

        <div className="tc-tag-row" style={{ marginTop: '2.5rem' }}>
          {film.tags.map((tag, i) => (
            <span key={i} className={`tc-tag${i === 0 ? ' tc-fill' : ''}`}>
              {tag}
            </span>
          ))}
        </div>
      </article>

      <footer className="tc-footer">
        <div className="tc-footer-inner">
          <div className="tc-footer-top">
            <div className="tc-footer-brand">
              <h2>
                The LSMG <em>Ledger</em>
              </h2>
              <p>
                Independent press. Dallas-based, internationally credentialed.
                Covering Tribeca 2026 June 3–14.
              </p>
            </div>
            <div className="tc-footer-col">
              <h4>Tribeca 2026</h4>
              <Link to="/tribeca">All Coverage</Link>
              <Link to="/tribeca/schedule">Daily Schedule</Link>
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
                href="https://www.instagram.com/lastshotmediagroup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="tc-footer-bottom">
            <span>&copy; 2026 Last Shot Media Group Holdings.</span>
            <span>Tribeca Festival 2026 — Official Press</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
