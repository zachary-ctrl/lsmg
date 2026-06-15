import { Link } from '@tanstack/react-router'
import { featuredFilms } from '../data/tribeca-films'

/**
 * Shared sub-navigation for the Tribeca 2026 coverage pages. "All Coverage"
 * now points at the unified LSMG Ledger, which absorbed the standalone
 * Tribeca tab.
 */
export function TribecaNav({ current }: { current: 'coverage' | 'schedule' }) {
  return (
    <nav className="tc-nav">
      <div className="tc-nav-inner">
        <Link
          to="/culture-ledger"
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
