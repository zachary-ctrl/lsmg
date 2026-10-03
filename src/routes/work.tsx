import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/work')({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: 'Selected Work | Last Shot Media Group' },
      {
        name: 'description',
        content: 'Selected work and portfolio activity across LEDGERA media, talent, communications, production, events and original IP under Last Shot Media Group Holdings.',
      },
    ],
  }),
})

const work = [
  {
    type: 'Communications / Media',
    title: 'LEDGERA Communications',
    copy: 'Public relations, media access, campaigns, press strategy and on-site cultural coverage supported by the LSMG Holdings network.',
    href: '/pr',
  },
  {
    type: 'Talent / Management',
    title: 'LEDGERA Talent',
    copy: 'Talent development, bookings, brand outreach, editorial opportunities and representation strategy for models, artists, actors, creators and public figures.',
    href: '/models',
  },
  {
    type: 'Production / Original IP',
    title: 'LEDGERA Studios',
    copy: 'Film, photography, podcasts, digital video, scripted development, documentaries and branded storytelling produced through LEDGERA Studios.',
    href: '/media',
  },
  {
    type: 'Flagship Brand',
    title: 'LEDGERA',
    copy: 'The flagship culture and entertainment brand of Last Shot Media Group Holdings, spanning editorial, talent, production, communications and experiences.',
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
            The portfolio moves across media, talent, communications, production, live experiences and original IP. This page shows how LEDGERA operates as the flagship brand within the broader LSMG Holdings ecosystem.
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
                LSMG Holdings is designed so opportunity can move across the LEDGERA ecosystem — talent can lead to press, press can lead to partnerships, partnerships can lead to production, and media can extend the story into lasting IP.
              </p>
              <a href="/contact" className="editorial-cta red">Start a Project ↗</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
