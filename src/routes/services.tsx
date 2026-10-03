import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services')({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: 'Services | Last Shot Media Group' },
      {
        name: 'description',
        content: 'Operating capabilities across LEDGERA Talent, LEDGERA Communications, LEDGERA Studios, booking, media training, partnerships, licensing and IP under Last Shot Media Group Holdings.',
      },
    ],
  }),
})

const services = [
  {
    num: '01',
    title: 'LEDGERA Talent / Management',
    copy: 'Career strategy, representation and opportunity development for models, artists, actors, creators, athletes and public figures through LEDGERA Talent / Management.',
    href: '/models',
    cta: 'Explore Talent',
  },
  {
    num: '02',
    title: 'LEDGERA Communications',
    copy: 'Public relations, media strategy, campaigns, publicity, editorial placement, narrative development and brand communications through LEDGERA Communications.',
    href: '/pr',
    cta: 'PR & Communications',
  },
  {
    num: '03',
    title: 'Booking',
    copy: 'Talent booking, negotiation, appearances, performance opportunities, event coordination and relationship management across domestic and international markets.',
    href: '/booking',
    cta: 'Booking',
  },
  {
    num: '04',
    title: 'LEDGERA Studios',
    copy: 'Film, photography, video, podcasts, documentaries, editorial productions, branded content and original IP developed through LEDGERA Studios.',
    href: '/media',
    cta: 'LEDGERA Studios',
  },
  {
    num: '05',
    title: 'Media Training',
    copy: 'On-camera coaching, interview preparation, press-junket training, public speaking support and brand-voice development for artists, executives and public figures.',
    href: '/contact',
    cta: 'Inquire',
  },
  {
    num: '06',
    title: 'Partnerships, Licensing & IP',
    copy: 'Brand partnerships, collaborations, sponsorship strategy, music and content licensing, intellectual-property strategy and opportunities that extend creative work into durable business.',
    href: '/contact',
    cta: 'Partnership Inquiry',
  },
]

function ServicesPage() {
  return (
    <div className="editorial-shell">
      <section className="page-hero">
        <div className="editorial-container">
          <span className="editorial-kicker">LSMG Holdings / Capabilities</span>
          <h1>SERVICES</h1>
          <p>
            Last Shot Media Group Holdings provides the business infrastructure behind LEDGERA. Its operating capabilities connect talent management, communications, booking, production, partnerships and IP development without changing the services clients already use.
          </p>
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-container">
          <div className="service-list">
            {services.map((service) => (
              <article className="service-row" key={service.num}>
                <span className="service-row-num">{service.num}</span>
                <h2>{service.title}</h2>
                <p>{service.copy}</p>
                <a href={service.href}>{service.cta} ↗</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="split-panel">
        <div className="split-panel-dark">
          <span className="editorial-kicker">LEDGERA Talent / Management</span>
          <h2>PEOPLE<br />FIRST.</h2>
          <p className="editorial-copy" style={{ margin: '26px 0 34px' }}>
            LEDGERA Talent / Management is organized by representation category — models, actors, music, sports, media and public figures — with the same roster and booking infrastructure operated within the LSMG Holdings ecosystem.
          </p>
          <a href="/models" className="editorial-cta red">Explore Talent ↗</a>
        </div>

        <div className="split-panel-red">
          <div>
            <span className="editorial-kicker" style={{ color: '#fff', opacity: .75 }}>Business inquiries</span>
            <h2 style={{ marginTop: 18 }}>BUILD<br />WITH US.</h2>
          </div>
          <div>
            <p style={{ marginBottom: 30 }}>
              For representation, press, partnerships, booking, production, licensing or communications support, contact the LSMG Holdings team directly.
            </p>
            <a href="/contact" className="editorial-cta">Contact LSMG ↗</a>
          </div>
        </div>
      </section>
    </div>
  )
}
