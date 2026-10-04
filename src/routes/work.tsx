import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/work')({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: 'Selected Work | Last Shot Media Group' },
      {
        name: 'description',
        content: 'Selected LSMG work across media, fashion, entertainment, live events, editorial, interviews and original production.',
      },
    ],
  }),
})

const work = [
  {
    type: 'Press / Editorial',
    title: 'Media Access',
    copy: 'Press access, interviews, junkets, editorial coverage and on-site reporting across entertainment, film, culture, fashion and live events.',
    href: '/pr',
  },
  {
    type: 'Fashion / Talent',
    title: 'Representation',
    copy: 'Talent development, bookings, brand outreach, editorial opportunities and representation strategy built around the people on the LSMG roster.',
    href: '/models',
  },
  {
    type: 'Original Media',
    title: 'LSMG Studios',
    copy: 'Podcasts, interviews, digital video, scripted development, documentaries and branded storytelling produced through the LSMG media operation.',
    href: '/media',
  },
  {
    type: 'Owned Media',
    title: 'LEDGERA',
    copy: 'Independent editorial publishing, cover stories, culture features, interviews and a separate LEDGERA model community connected to the broader LSMG ecosystem.',
    href: 'https://ledgeramagazine.com',
    external: true,
  },
]

function WorkPage() {
  return (
    <div className="editorial-shell">
      <section className="page-hero">
        <div className="editorial-container">
          <span className="editorial-kicker">LSMG / Selected Work</span>
          <h1>WORK</h1>
          <p>
            The work moves across representation, press, editorial, live events, production and owned media. This page is a high-level view of the ecosystem; the detailed divisions remain available throughout the site.
          </p>
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-container">
          <div className="work-grid">
            {work.map((item) => (
              <article className="work-card" key={item.title}>
                <span className="work-type">{item.type}</span>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.copy}</p>
                </div>
                <a
                  className="home-feature-link"
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  Explore <span>↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section" style={{ background: '#080808' }}>
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div>
              <span className="editorial-kicker">Built as one system</span>
              <h2 className="editorial-display section-title">CULTURE.<br /><span className="editorial-red">COMMERCE.</span></h2>
            </div>
            <div className="section-intro">
              <p style={{ marginBottom: 28 }}>
                LSMG is designed so an opportunity can move across divisions — representation can lead to press, press can lead to partnerships, partnerships can lead to production, and owned media can extend the story.
              </p>
              <a href="/contact" className="editorial-cta red">Start a Project ↗</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
