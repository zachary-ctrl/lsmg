import {
  HeadContent,
  Scripts,
  Outlet,
  Link,
  createRootRoute,
  useMatches,
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

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/models', label: 'Talent' },
  { href: '/services', label: 'Services' },
  { href: '/media', label: 'Studios' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onResize = () => {
      if (window.innerWidth > 1050) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [mobileOpen])

  return (
    <header className={`redesign-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="redesign-header-row">
        <Link to="/" className="redesign-logo" onClick={() => setMobileOpen(false)} aria-label="Last Shot Media Group home">
          <span style={{ color: '#fff' }}>LS</span><span style={{ color: 'var(--red)' }}>MG</span>
        </Link>

        <nav className="redesign-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
          <a className="nav-ledgera" href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer">LEDGERA ↗</a>
          <a className="redesign-contact" href="/contact">Contact</a>
        </nav>

        <button
          className="redesign-burger"
          type="button"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
      </div>

      <nav className={`redesign-mobile${mobileOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</a>
        ))}
        <a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer">LEDGERA ↗</a>
        <a href="/contact" onClick={() => setMobileOpen(false)}>Contact</a>
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
              An independent creative holding company operating across talent representation, PR, booking, media production, communications and licensing. Dallas, Orlando, New York and Atlanta.
            </p>
          </div>

          <div>
            <h4>Representation</h4>
            <ul>
              <li><a href="/models">Talent</a></li>
              <li><a href="/models#models">Models</a></li>
              <li><a href="/models#actors">Actors</a></li>
              <li><a href="/models#sports">Sports</a></li>
              <li><a href="/models#media">Media &amp; Creators</a></li>
              <li><a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer">LEDGERA Models ↗</a></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/services">Services</a></li>
              <li><Link to="/media">LSMG Studios</Link></li>
              <li><a href="/work">Selected Work</a></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
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

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Last Shot Media Group</span>
          <span>Where Creativity Becomes Capital.</span>
        </div>
      </div>
    </footer>
  )
}
