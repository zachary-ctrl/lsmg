import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

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


type WorkCategory = 'Film & Festivals' | 'Fashion' | 'Music' | 'Sports' | 'Wrestling' | 'Creator Culture'
type WorkFilter = WorkCategory | 'All'

const coverageHistory: { category: WorkCategory; events: string[] }[] = [
  { category: 'Film & Festivals', events: ['Tribeca Film Festival', 'Cannes Film Festival', 'Vancouver Queer Film Festival', 'Inaugural ALZA Festival, including short-film coverage', 'Urbanfest 360 Film Festival', '2026 Woodstock Film Festival'] },
  { category: 'Fashion', events: ['New York Fashion Week', 'Runway 7'] },
  { category: 'Music', events: ['6th Annual Heart & Soul Music Festival', 'Rolling Loud'] },
  { category: 'Sports', events: ['Dallas Cowboys', 'Texas Rangers'] },
  { category: 'Wrestling', events: ['WWE', 'TNA Wrestling', 'AEW'] },
  { category: 'Creator Culture', events: ['TwitchCon San Diego', 'Comic Con', 'Fan Expo Dallas'] },
]

const featuredProjects: {
  title: string; category: WorkCategory; role: string; property: string; status: string;
  year: string; link?: string; image?: string; alt?: string
}[] = [
  { title: 'Runway 7 · NYFW', category: 'Fashion', role: 'Runway coverage and 37-page special digital edition', property: 'LEDGERA', status: 'Published', year: '2026', link: 'https://ledgeramagazine.com/magazine/runway-7-nyfw/', image: 'https://ledgeramagazine.com/assets/issues/runway-7/page-01.webp', alt: 'Cover of LEDGERA Runway 7 special edition' },
  { title: 'M By Elegance', category: 'Wrestling', role: 'TNA Wrestling interview and Issue 05 cover feature', property: 'LEDGERA', status: 'Published', year: '2026', link: 'https://ledgeramagazine.com/magazine/issue-05/', image: 'https://ledgeramagazine.com/assets/issues/issue-05/page-01.webp', alt: 'Cover of LEDGERA Issue 05' },
  { title: 'Mohamed Taher · 32B', category: 'Film & Festivals', role: 'Filmmaker interview and editorial coverage; the film 32B received Tribeca’s Best Narrative Short award', property: 'LEDGERA', status: 'Published', year: '2026', link: 'https://ledgeramagazine.com/interviews/32b-mohamed-taher' },
  { title: 'Clown Panic', category: 'Film & Festivals', role: 'Director Ed Perkins and producer Jonathan Chinn interviews', property: 'LSMG / LEDGERA', status: 'Interview completed · Publication link pending', year: '2026' },
  { title: 'Trey Miguel', category: 'Wrestling', role: 'Conversation on professional wrestling, life and the journey through TNA', property: 'The Last Shot Podcast / LEDGERA', status: 'Documented interview', year: '2026' },
  { title: 'Deonna Purrazzo', category: 'Wrestling', role: 'Editorial question-and-answer interview', property: 'LEDGERA', status: 'Documented Q&A', year: '2026' },
  { title: 'Eli Morris · VQFF', category: 'Film & Festivals', role: 'Conversation about the future of queer cinema', property: 'LSMG / LEDGERA', status: 'Documented conversation', year: '2026' },
  { title: 'Jesus Land · Saila Kariat', category: 'Film & Festivals', role: 'Filmmaker interview and podcast/editorial feature in production', property: 'The Last Shot Podcast / LEDGERA', status: 'In production', year: '2026' },
  { title: 'Inaugural ALZA Festival', category: 'Film & Festivals', role: 'Festival article and film reviews in production', property: 'LEDGERA', status: 'In production', year: '2026' },
  { title: '2026 Woodstock Film Festival', category: 'Film & Festivals', role: 'Festival coverage and editorial documentation', property: 'LSMG / LEDGERA', status: 'Coverage history', year: '2026' },
]

function WorkPage() {
  const [filter, setFilter] = useState<WorkFilter>('All')
  const shownProjects = featuredProjects.filter((p) => filter === 'All' || p.category === filter)
  const shownHistory = coverageHistory.filter((group) => filter === 'All' || group.category === filter)
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

      <section className="editorial-section lsmg-portfolio-section" id="coverage-history">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div>
              <span className="editorial-kicker">2026 Media Kit / Coverage History</span>
              <h2 className="editorial-display section-title">THE WORK.<br /><span className="editorial-red">THE RECORD.</span></h2>
            </div>
            <p className="section-intro">Documented press, interviews, events and editorial production across the LSMG ecosystem. Coverage or press access does not imply an endorsement, sponsorship, client relationship or representation agreement.</p>
          </div>
          <div className="lsmg-work-filters" role="group" aria-label="Filter coverage and selected work">
            {(['All','Film & Festivals','Fashion','Music','Sports','Wrestling','Creator Culture'] as WorkFilter[]).map((item) => <button type="button" key={item} aria-pressed={filter===item} onClick={() => setFilter(item)}>{item}</button>)}
          </div>
          <div className="lsmg-portfolio-grid">
            {shownProjects.map((item) => <article key={item.title} className="lsmg-portfolio-card">
              {item.image && <div className="lsmg-portfolio-image"><img src={item.image} alt={item.alt || ''} loading="lazy" decoding="async" /></div>}
              <div className="lsmg-portfolio-content">
                <span className="editorial-kicker">{item.category} / {item.year}</span>
                <h3>{item.title}</h3><p>{item.role}</p>
                <dl><div><dt>LSMG property</dt><dd>{item.property}</dd></div><div><dt>Status</dt><dd>{item.status}</dd></div></dl>
                {item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" className="home-feature-link">View published work ↗</a> : <span className="lsmg-not-published">No public project link available</span>}
              </div>
            </article>)}
          </div>
          <div className="lsmg-coverage-history">
            <div><span className="editorial-kicker">Documented Coverage</span><h3>WHERE WE'VE COVERED.</h3><p>Selected event and industry coverage listed in the 2026 LSMG media kit. Individual assignments vary by format and property.</p></div>
            <div className="lsmg-coverage-list">
              {shownHistory.map((group) => <div key={group.category}><h4>{group.category}</h4><p>{group.events.join(' · ')}</p></div>)}
            </div>
          </div>
          <a href="/contact" className="editorial-cta red lsmg-section-cta">Discuss Coverage or a Project ↗</a>
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
