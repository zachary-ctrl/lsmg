import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/media')({
  component: MediaPage,
  head: () => ({
    meta: [
      { title: 'LSMG Studios | Last Shot Media Group' },
      {
        name: 'description',
        content: 'LSMG Studios develops and produces scripted series, podcasts, documentary content, music videos and branded media.',
      },
    ],
  }),
})

const formats = [
  { num: '01', title: 'Scripted Series', copy: 'Original scripted development for digital and streaming audiences, built around strong creative voices and cultural storytelling.' },
  { num: '02', title: 'Podcasts', copy: 'Full-service podcast development, recording, editing, distribution and interview programming for LSMG and outside partners.' },
  { num: '03', title: 'Documentary', copy: 'Community and culture-driven documentary development designed for digital release, streaming and festival pathways.' },
  { num: '04', title: 'Brand Content', copy: 'Campaign concepts, music videos and branded productions developed for artists, companies and creative partners.' },
]

function MediaPage() {
  return (
    <div className="editorial-shell">
      <section className="page-hero">
        <div className="editorial-container">
          <span className="editorial-kicker">LSMG / Studios</span>
          <h1>STUDIOS</h1>
          <p>
            Original content production for film, streaming and digital platforms. LSMG Studios develops scripted series, podcasts, documentary content and brand productions rooted in authentic cultural storytelling.
          </p>
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div>
              <span className="editorial-kicker">About LSMG Studios</span>
              <h2 className="editorial-display section-title">STORY IS<br /><span className="editorial-red">EVERYTHING.</span></h2>
            </div>
            <div className="section-intro">
              <p style={{ marginBottom: 20 }}>
                LSMG Studios is the production arm of Last Shot Media Group. We develop, produce and distribute original content — from scripted programming to documentary and podcast work.
              </p>
              <p>Our approach is simple: real stories told with craft. We work with creators, directors and writers who have something to say and the talent to say it.</p>
            </div>
          </div>

          <div className="service-list">
            {formats.map((format) => (
              <article className="service-row" key={format.num}>
                <span className="service-row-num">{format.num}</span>
                <h2>{format.title}</h2>
                <p>{format.copy}</p>
                <a href="mailto:info@lastshotmediagroup.com?subject=Production%20Inquiry">Inquire ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="split-panel">
        <div className="split-panel-dark">
          <span className="editorial-kicker">Original productions</span>
          <h2>DEVELOP.<br />PRODUCE.</h2>
          <p className="editorial-copy" style={{ margin: '26px 0 34px' }}>
            Scripted content, podcasts and documentary projects are developed in-house as part of the broader LSMG ecosystem.
          </p>
          <a href="/work" className="editorial-cta red">Selected Work ↗</a>
        </div>

        <div className="split-panel-red">
          <div>
            <span className="editorial-kicker" style={{ color: '#fff', opacity: .75 }}>Production services</span>
            <h2 style={{ marginTop: 18 }}>MAKE<br />WITH US.</h2>
          </div>
          <div>
            <p style={{ marginBottom: 30 }}>
              LSMG Studios also develops music videos, podcasts, documentary projects and branded content for outside artists, creators and companies.
            </p>
            <a href="mailto:info@lastshotmediagroup.com?subject=Production%20Inquiry" className="editorial-cta">Production Inquiry ↗</a>
          </div>
        </div>
      </section>
    </div>
  )
}
