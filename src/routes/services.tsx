import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services')({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: 'Services | Last Shot Media Group' },
      {
        name: 'description',
        content: 'LSMG services across management, public relations, communications, booking, media production, media training, partnerships and licensing.',
      },
    ],
  }),
})

const services = [
  {
    num: '01',
    title: 'Management & Representation',
    copy: 'Career strategy and representation built around the whole person — not a single booking. LSMG develops opportunities across entertainment, fashion, media, sports, brands and public-facing work.',
    href: '/models',
    cta: 'Explore Talent',
  },
  {
    num: '02',
    title: 'PR & Communications',
    copy: 'Strategic press campaigns, media pitching, editorial placement, narrative development, press materials, reputation support and communications strategy for talent, brands and cultural projects.',
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
    title: 'Media & Production',
    copy: 'Original scripted content, podcasts, documentaries, editorial productions, branded content and digital storytelling developed through LSMG Studios.',
    href: '/media',
    cta: 'LSMG Studios',
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
          <span className="editorial-kicker">LSMG / Capabilities</span>
          <h1>SERVICES</h1>
          <p>
            LSMG operates as an integrated creative holding company. Representation, communications, booking, production and commercial strategy work together so clients do not have to build those systems separately.
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
          <span className="editorial-kicker">Representation</span>
          <h2>PEOPLE<br />FIRST.</h2>
          <p className="editorial-copy" style={{ margin: '26px 0 34px' }}>
            The Talent division is organized by representation category — models, actors, music, sports, media and public figures — with a clean roster built for booking and business inquiries.
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
              For representation, press, partnerships, booking, production, licensing or communications support, contact the LSMG team directly.
            </p>
            <a href="/contact" className="editorial-cta">Contact LSMG ↗</a>
          </div>
        </div>
      </section>
    </div>
  )
}
