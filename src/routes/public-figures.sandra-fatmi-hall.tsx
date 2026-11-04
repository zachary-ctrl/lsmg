import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/public-figures/sandra-fatmi-hall')({
  component: SandraProfile,
  head: () => ({
    meta: [
      { title: 'Sandra Fatmi-Hall | Public Figure & Speaker | LSMG' },
      { name: 'description', content: 'Sandra Fatmi-Hall is a nonprofit executive, philanthropist, mentor, consultant and speaker. Inquire through Last Shot Media Group.' },
      { property: 'og:title', content: 'Sandra Fatmi-Hall | LSMG Talent' },
    ],
  }),
})

const portrait = 'https://images.squarespace-cdn.com/content/v1/536e3872e4b02cbd6b6e124c/82cb18b8-a019-4534-a006-323bfa5de1e9/Sandra%2BFatmi-Hall%2C%2BHeadshot.png'

function SandraProfile() {
  return (
    <div className="editorial-shell">
      <section className="page-hero">
        <div className="editorial-container">
          <a className="editorial-kicker" href="/models#public-figures">← LSMG Talent / Public Figures</a>
          <h1 className="lsmg-profile-title">SANDRA<br /><span className="editorial-red">FATMI-HALL.</span></h1>
          <p>Public Figure · Philanthropist · Nonprofit Executive · Mentor · Speaker</p>
        </div>
      </section>

      <section className="editorial-section">
        <div className="editorial-container lsmg-person-grid">
          <figure className="lsmg-person-photo">
            <img src={portrait} alt="Sandra Fatmi-Hall, public figure and speaker" width="900" height="900" decoding="async" />
            <figcaption>Official portrait · United Foundation of Central Florida</figcaption>
          </figure>
          <div className="lsmg-person-bio">
            <span className="editorial-kicker">Leadership rooted in service</span>
            <h2>BUILDING LEADERS<br /><span className="editorial-red">INTENTIONALLY.</span></h2>
            <p>Sandra M. Fatmi-Hall is the Founder, Chief Executive Officer and Executive Director of the United Foundation of Central Florida, Inc. Her work spans philanthropy, youth mentorship, nonprofit leadership, community empowerment and consulting.</p>
            <p>After a 17-year banking career, she founded the foundation in 2014. Through initiatives including Future Leaders United, Sandra champions education, mentorship, family resources, workforce readiness and youth leadership.</p>
            <p>A featured TEDxOrlando 2026 speaker, she brings a practical perspective on how communities can invest in young people before crises arise. She has also served in civic and community leadership roles and remains engaged in humanitarian work.</p>
            <p>For speaking engagements, interviews, media appearances and representation inquiries, contact the Last Shot Media Group team.</p>
            <div className="lsmg-hero-actions">
              <a href="/contact" className="editorial-cta red">Book / Inquire ↗</a>
              <a href="https://www.unitedfoundationcf.org/our-founder" target="_blank" rel="noopener noreferrer" className="editorial-cta">Official Biography ↗</a>
            </div>
            <p className="lsmg-note">Bio based on the official press kit prepared for Sandra Fatmi-Hall and her foundation's published profile. LSMG handles inquiry coordination; third-party organizations mentioned here are not implied sponsors of LSMG.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
