import {
  HeadContent,
  Scripts,
  Outlet,
  Link,
  createRootRoute,
  useMatches,
} from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { IdentityProvider } from '../lib/identity-context'
import { CallbackHandler } from '../components/CallbackHandler'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Last Shot Media Group | LSMG — Worldwide',
      },
      {
        name: 'description',
        content:
          'Last Shot Media Group is an independent creative holding company operating worldwide. PR, talent booking, media production, communications, and more.',
      },
      {
        property: 'og:title',
        content: 'Last Shot Media Group | LSMG — Worldwide',
      },
      {
        property: 'og:description',
        content:
          'Last Shot Media Group is an independent creative holding company operating worldwide. PR, talent booking, media production, communications, and more.',
      },
      {
        property: 'og:image',
        content: '/og-image.png',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:image',
        content: '/og-image.png',
      },
    ],
    links: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
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
    // Check sessionStorage so loader only shows once per session
    if (typeof window !== 'undefined' && sessionStorage.getItem('lsmg-loaded')) {
      setVisible(false)
      return
    }
    const timer = setTimeout(() => {
      setVisible(false)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('lsmg-loaded', '1')
      }
    }, 2600)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="page-loader">
      <div className="loader-brand">
        <span style={{ color: 'var(--white)' }}>LS</span>
        <span style={{ color: 'var(--red)' }}>MG</span>
      </div>
      <div className="loader-sub">Worldwide</div>
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
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.08 },
    )
    const sections = el.querySelectorAll('section, .section-reveal')
    sections.forEach((s) => {
      if (!s.classList.contains('section-reveal')) {
        s.classList.add('section-reveal')
      }
      observer.observe(s)
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

const navLinks = [
  { to: '/' as const, label: 'Home' },
  { to: '/about' as const, label: 'About' },
  { to: '/pr' as const, label: 'PR' },
  { to: '/media' as const, label: 'Media' },
  { to: '/watch' as const, label: 'Watch' },
  { to: '/booking' as const, label: 'Booking' },
  { to: '/culture-ledger' as const, label: 'LSMG Ledger' },
  { to: '/member-portal' as const, label: 'Member Portal' },
]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-[12px] border-b border-[var(--border)]" style={{ background: 'rgba(8,8,8,.92)', height: 64, transition: 'background 0.4s ease' }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-full">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-3 group">
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: 4, lineHeight: 1 }}>
              <span style={{ color: 'var(--white)' }}>LS</span>
              <span style={{ color: 'var(--red)' }}>MG</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[var(--light)] hover:text-[var(--white)] transition-all duration-300 [&.active]:text-[var(--white)] relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-full after:h-[1px] after:bg-[var(--red)] after:transition-all after:duration-300 [&.active]:after:w-full"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, padding: '8px 14px', whiteSpace: 'nowrap' }}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
            <Link
              to="/login"
              className="ml-2 hover:opacity-85 transition-opacity"
              style={{
                background: 'transparent',
                color: 'var(--white)',
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: 3,
                padding: '10px 20px',
                whiteSpace: 'nowrap',
                border: '1px solid var(--red)',
              }}
            >
              LOGIN
            </Link>
            <Link
              to="/contact"
              className="ml-2 hover:opacity-85 transition-opacity"
              style={{
                background: 'var(--red)',
                color: 'var(--white)',
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: 3,
                padding: '10px 20px',
                whiteSpace: 'nowrap',
              }}
            >
              CONTACT
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <span className="w-6 h-[2px] bg-[var(--white)] transition-all" />
            <span className="w-6 h-[2px] bg-[var(--white)] transition-all" />
            <span className="w-6 h-[2px] bg-[var(--white)] transition-all" />
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-[var(--border)] pt-4 flex flex-col gap-3" style={{ background: 'rgba(8,8,8,.98)', animation: 'pageEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-[var(--light)] hover:text-[var(--white)] transition-colors"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, padding: '6px 0' }}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="text-[var(--white)] hover:text-[var(--red)] transition-colors"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, padding: '6px 0' }}
            >
              LOGIN
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="text-[var(--red)] hover:text-[var(--white)] transition-colors"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, padding: '6px 0' }}
            >
              CONTACT
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)]" style={{ background: '#050505', padding: '80px 40px 40px' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, letterSpacing: 4, marginBottom: 16 }}>
              <span style={{ color: 'var(--white)' }}>LS</span>
              <span style={{ color: 'var(--red)' }}>MG</span>
            </div>
            <p className="text-[15px] text-[#8f8f8f] leading-[1.75] max-w-[320px]">
              An independent creative holding company operating across PR, talent booking, media production, communications, and licensing. Worldwide.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: 'var(--red)', marginBottom: 20 }}>
              DIVISIONS
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link to="/pr" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">PR, Comms & Talent</Link></li>
              <li><Link to="/booking" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">LSMG Booking</Link></li>
              <li><Link to="/media" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">Media & Film</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: 'var(--red)', marginBottom: 20 }}>
              COMPANY
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link to="/about" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">About</Link></li>
              <li><Link to="/pr" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">PR & Communications</Link></li>
              <li><Link to="/culture-ledger" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">The LSMG Ledger</Link></li>
              <li><Link to="/watch" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">Watch</Link></li>
              <li><Link to="/contact" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">Contact</Link></li>
              <li><Link to="/login" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">Login</Link></li>
              <li><Link to="/member-portal" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">Member Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: 'var(--red)', marginBottom: 20 }}>
              CONNECT
            </h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="mailto:info@lastshotmediagroup.com" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">info@lastshotmediagroup.com</a></li>
              <li><a href="https://instagram.com/lastshotmediagroup" target="_blank" rel="noopener noreferrer" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">Instagram</a></li>
              <li><a href="https://www.youtube.com/channel/UCqaNPrCXK07Q1YYbSvChaOQ" target="_blank" rel="noopener noreferrer" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">YouTube</a></li>
              <li><a href="https://open.spotify.com/show/17PGdRA2WnVjpbLDeeZlgR" target="_blank" rel="noopener noreferrer" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">Spotify</a></li>
              <li><a href="https://podcasts.apple.com/us/podcast/the-last-shot-podcast/id1494831568" target="_blank" rel="noopener noreferrer" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">Apple Podcasts</a></li>
              <li><a href="https://twitch.tv/lastshotmediagroup" target="_blank" rel="noopener noreferrer" className="text-[15px] text-[#8f8f8f] hover:text-[var(--white)] transition-colors">Twitch</a></li>
              <li><span className="text-[15px] text-[#8f8f8f]">Worldwide</span></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-[#111] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#707070' }}>
            &copy; {new Date().getFullYear()} LAST SHOT MEDIA GROUP. ALL RIGHTS RESERVED.
          </span>
          <div className="flex flex-wrap gap-5">
            <a href="https://instagram.com/lastshotmediagroup" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#707070' }} className="hover:text-[var(--red)] transition-colors">INSTAGRAM</a>
            <a href="https://www.youtube.com/channel/UCqaNPrCXK07Q1YYbSvChaOQ" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#707070' }} className="hover:text-[var(--red)] transition-colors">YOUTUBE</a>
            <a href="https://open.spotify.com/show/17PGdRA2WnVjpbLDeeZlgR" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#707070' }} className="hover:text-[var(--red)] transition-colors">SPOTIFY</a>
            <a href="https://podcasts.apple.com/us/podcast/the-last-shot-podcast/id1494831568" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#707070' }} className="hover:text-[var(--red)] transition-colors">APPLE PODCASTS</a>
            <a href="https://twitch.tv/lastshotmediagroup" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#707070' }} className="hover:text-[var(--red)] transition-colors">TWITCH</a>
            <a href="https://twitter.com/lastshotmg" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#707070' }} className="hover:text-[var(--red)] transition-colors">TWITTER</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
