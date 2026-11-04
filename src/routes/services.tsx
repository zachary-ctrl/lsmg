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
    href: 'https://activation.thelsmg.com/',
    cta: 'Explore Brand Activations',
  },
  {
    num: '07',
    title: 'Photography & Visual Production',
    copy: 'Editorial photography, event photography, portrait work, campaign imagery and creative direction through the LSMG production team.',
    href: '/contact',
    cta: 'Photography Inquiry',
  },
  {
    num: '08',
    title: 'Festival & Event Coverage',
    copy: 'On-location interviews, photography, red carpet reporting and multimedia coverage across film, fashion, music, sports and creator culture.',
    href: '/contact',
    cta: 'Coverage Inquiry',
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

      <section className="editorial-section lsmg-process-section">
        <div className="editorial-container">
          <div className="section-heading-grid">
            <div>
              <span className="editorial-kicker">How to begin</span>
              <h2 className="editorial-display section-title">DISCOVER.<br /><span className="editorial-red">DESIGN. ALIGN.</span></h2>
            </div>
            <div className="section-intro">
              <p>We start by understanding the project, then recommend the services, creative approach and platforms that fit. Before launch, we confirm scope, deliverables, timing and reporting.</p>
            </div>
          </div>
          <div className="lsmg-process-grid">
            <article><span>01</span><h3>Discover</h3><p>Understand the project, audience, goals and timing.</p></article>
            <article><span>02</span><h3>Design</h3><p>Recommend the services, creative approach and platforms that fit.</p></article>
            <article><span>03</span><h3>Align</h3><p>Confirm scope, deliverables, timing and reporting before launch.</p></article>
          </div>
          <div className="lsmg-process-links">
            <a href="/contact" className="editorial-cta red">Start a Direct LSMG Inquiry ↗</a>
            <a href="https://activation.thelsmg.com/" target="_blank" rel="noopener noreferrer" className="editorial-cta">Advertising &amp; Sponsorship Campaigns ↗</a>
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
