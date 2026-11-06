import {
  HeadContent,
  Scripts,
  Outlet,
  Link,
  createRootRoute,
  useMatches,
  useLocation,
} from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { IdentityProvider } from '../lib/identity-context'
import { CallbackHandler } from '../components/CallbackHandler'
import '../styles.css'
import '../redesign.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Last Shot Media Group | Where Creativity Becomes Capital' },
      {
        name: 'description',
        content:
          'Last Shot Media Group is an independent creative holding company operating across Dallas, Orlando, New York and Atlanta. Talent representation, PR, booking, media production, communications, licensing and original content.',
      },
      { property: 'og:title', content: 'Last Shot Media Group | Where Creativity Becomes Capital' },
      {
        property: 'og:description',
        content:
          'Independent creative holding company across talent, PR, booking, media production, communications and culture.',
      },
      { property: 'og:image', content: '/og-image.png' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: '/og-image.png' },
    ],
    links: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  }),
  component: RootWrap,
  shellComponent: RootDocument,
})

function RootWrap() {
  return (
    <IdentityProvider>
      <CallbackHandler>
        <RootComponent />
      </CallbackHandler>
    </IdentityProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <script src="/ledger-feed.js"></script>
      </body>
    </html>
  )
}

function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('lsmg-loaded')) {
      setVisible(false)
      return
    }
    const timer = setTimeout(() => {
      setVisible(false)
      if (typeof window !== 'undefined') sessionStorage.setItem('lsmg-loaded', '1')
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="page-loader">
      <div className="loader-brand">
        <span style={{ color: 'var(--white)' }}>LS</span>
        <span style={{ color: 'var(--red)' }}>MG</span>
      </div>
      <div className="loader-sub">WHERE CREATIVITY BECOMES CAPITAL</div>
    </div>
  )
}

function useSectionReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08 },
    )
    const sections = el.querySelectorAll('section, .section-reveal')
    sections.forEach((section) => {
      if (!section.classList.contains('section-reveal')) section.classList.add('section-reveal')
      observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return ref
}

function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const matches = useMatches()
  const key = matches[matches.length - 1]?.id ?? 'root'
  const ref = useSectionReveal()

  return (
    <div key={key} className="page-transition-enter" ref={ref}>
      {children}
    </div>
  )
}

function RootComponent() {
  return (
    <>
      <PageLoader />
      <Header />
      <main>
        <PageTransitionWrapper>
          <Outlet />
        </PageTransitionWrapper>
      </main>
      <Footer />
    </>
  )
}

const talentNav = [
  ['All Talent', '/models'],
  ['Models', '/models#models'],
  ['Actors', '/models#actors'],
  ['Sports', '/models#sports'],
  ['Music', '/models#music'],
  ['Media', '/models#media'],
  ['Public Figures', '/models#public-figures'],
] as const

const serviceNav = [
  ['All Services', '/services'],
  ['PR & Communications', '/pr'],
  ['Talent Booking', '/booking'],
  ['Management', '/services'],
  ['Studios & Production', '/media'],
  ['Partnerships & Licensing', 'https://activation.thelsmg.com/'],
] as const

const ecosystemNav = [
  ['LEDGERA Magazine', 'https://ledgeramagazine.com/'],
  ['Culture Hub', 'https://media.thelsmg.com/'],
  ['Brand Activations', 'https://activation.thelsmg.com/'],
  ['The Last Shot Podcast', 'https://lastshotpodcast.net/'],
] as const

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const pathname = useLocation().pathname
  const isCurrent = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href + '/'))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMobileOpen(false)
      document.querySelectorAll<HTMLDetailsElement>('.redesign-header details[open]').forEach((detail) => { detail.open = false })
      burgerRef.current?.focus()
    }
    const onResize = () => { if (window.innerWidth >= 1220) setMobileOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const renderLinks = (items: readonly (readonly [string, string])[]) =>
    items.map(([label, href]) => {
      const external = href.startsWith('http')
      return (
        <a key={label} href={href} aria-current={!external && isCurrent(href.split('#')[0]) ? 'page' : undefined}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          onClick={() => setMobileOpen(false)}>
          {label}{external ? ' ↗' : ''}
        </a>
      )
    })

  return (
    <header className={`redesign-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="redesign-header-row">
        <Link to="/" className="redesign-logo" onClick={() => setMobileOpen(false)} aria-label="Last Shot Media Group home">
          <span style={{ color: '#fff' }}>LS</span><span style={{ color: 'var(--red)' }}>MG</span>
        </Link>
        <nav className="redesign-nav" aria-label="Main navigation">
          <a href="/" aria-current={isCurrent('/') ? 'page' : undefined}>Home</a>
          <a href="/about" aria-current={isCurrent('/about') ? 'page' : undefined}>About</a>
          <a href="/internships" aria-current={isCurrent('/internships') ? 'page' : undefined}>Internships</a>
          <details className="redesign-dropdown">
            <summary className={isCurrent('/models') || isCurrent('/public-figures') ? 'nav-current' : ''}>Talent</summary>
            <div className="redesign-dropdown-panel">{renderLinks(talentNav)}</div>
          </details>
          <details className="redesign-dropdown">
            <summary className={isCurrent('/services') || isCurrent('/pr') ? 'nav-current' : ''}>Services</summary>
            <div className="redesign-dropdown-panel">{renderLinks(serviceNav)}</div>
          </details>
          <a href="/media" aria-current={isCurrent('/media') ? 'page' : undefined}>Studios</a>
          <a href="/work" aria-current={isCurrent('/work') ? 'page' : undefined}>Our Work</a>
          <details className="redesign-dropdown">
            <summary>Our Ecosystem</summary>
            <div className="redesign-dropdown-panel">{renderLinks(ecosystemNav)}</div>
          </details>
          <a className="redesign-contact" href="/contact" aria-current={isCurrent('/contact') ? 'page' : undefined}>Work With Us</a>
        </nav>
        <button ref={burgerRef} id="lsmg-menu-toggle" className="redesign-burger" type="button"
          aria-controls="lsmg-mobile-nav" aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}>
          <span /><span /><span />
        </button>
      </div>
      <nav id="lsmg-mobile-nav" className={`redesign-mobile${mobileOpen ? ' open' : ''}`}
        aria-label="Mobile navigation" aria-hidden={!mobileOpen}>
        <div className="redesign-mobile-top">
          <span>Explore Last Shot Media Group</span>
          <button type="button" onClick={() => { setMobileOpen(false); burgerRef.current?.focus() }}>Close ×</button>
        </div>
        <a href="/" aria-current={isCurrent('/') ? 'page' : undefined} onClick={() => setMobileOpen(false)}>Home</a>
        <a href="/about" aria-current={isCurrent('/about') ? 'page' : undefined} onClick={() => setMobileOpen(false)}>About</a>
        <a href="/internships" onClick={() => setMobileOpen(false)}>Internships</a>
        <details><summary>Talent <span aria-hidden="true">+</span></summary><div className="redesign-mobile-sub">{renderLinks(talentNav)}</div></details>
        <details><summary>Services <span aria-hidden="true">+</span></summary><div className="redesign-mobile-sub">{renderLinks(serviceNav)}</div></details>
        <a href="/media" onClick={() => setMobileOpen(false)}>Studios</a>
        <a href="/work" onClick={() => setMobileOpen(false)}>Our Work</a>
        <details><summary>Our Ecosystem <span aria-hidden="true">+</span></summary><div className="redesign-mobile-sub">{renderLinks(ecosystemNav)}</div></details>
        <a href="/contact" className="redesign-mobile-cta" onClick={() => setMobileOpen(false)}>Work With Us ↗</a>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="redesign-footer">
      <div className="editorial-container">
        <div className="redesign-footer-grid">
          <div>
            <span className="footer-brand">LAST SHOT<br /><span className="editorial-red">MEDIA GROUP</span></span>
            <p style={{ maxWidth: 390 }}>
              Last Shot Media Group Holdings LLC is the independent parent company connecting our representation, PR, production and owned media properties. LSMG also provides direct talent, brand and production services.
            </p>
          </div>

          <div>
            <h4>Representation</h4>
            <ul>
              <li><a href="/models#models">Models</a></li>
              <li><a href="/models#actors">Actors</a></li>
              <li><a href="/models#sports">Sports</a></li>
              <li><a href="/models#music">Music</a></li>
              <li><a href="/models#media">Media</a></li>
              <li><a href="/models#public-figures">Public Figures</a></li>
              <li><a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer">LEDGERA Models ↗</a></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/services">Services</a></li>
              <li><Link to="/media">LSMG Studios</Link></li>
              <li><a href="/work">Selected Work</a></li>
              <li><Link to="/internships">College Internships</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Use</a></li>
              <li><a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer">LEDGERA ↗</a></li>
            </ul>
          </div>

          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="mailto:info@lastshotmediagroup.com">info@lastshotmediagroup.com</a></li>
              <li><a href="https://instagram.com/lastshotmediagroup" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.youtube.com/channel/UCqaNPrCXK07Q1YYbSvChaOQ" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://open.spotify.com/show/17PGdRA2WnVjpbLDeeZlgR" target="_blank" rel="noopener noreferrer">Spotify</a></li>
              <li><a href="https://podcasts.apple.com/us/podcast/the-last-shot-podcast/id1494831568" target="_blank" rel="noopener noreferrer">Apple Podcasts</a></li>
            </ul>
          </div>
        </div>

        <div className="lsmg-footer-ecosystem" aria-label="LSMG properties">
          <div className="lsmg-footer-ecosystem-item"><a href="https://media.thelsmg.com/" target="_blank" rel="noopener noreferrer">LSMG Culture Hub ↗</a><small>Central discovery hub for recent episodes, editions, Case Files, coverage and the broader ecosystem.</small></div>
          <div className="lsmg-footer-ecosystem-item"><a href="https://activation.thelsmg.com/" target="_blank" rel="noopener noreferrer">Brand Activations ↗</a><small>Advertising, sponsorships, placement guides, audience details and campaign inquiries.</small></div>
          <div className="lsmg-footer-ecosystem-item"><a href="https://lastshotpodcast.net/" target="_blank" rel="noopener noreferrer">The Last Shot Podcast ↗</a><small>Full episodes, guest conversations and listening or viewing options.</small></div>
          <div className="lsmg-footer-ecosystem-item"><a href="https://ledgeramagazine.com/" target="_blank" rel="noopener noreferrer">LEDGERA Magazine ↗</a><small>Articles, issues, special editions, interviews, visual editorials and LEDGERA Models.</small></div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Last Shot Media Group Holdings LLC</span>
          <span>Where Creativity Becomes Capital.</span>
        </div>
      </div>
    </footer>
  )
}
