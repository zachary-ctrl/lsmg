import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: 'About LSMG | Last Shot Media Group' },
      { name: 'description', content: 'Meet the leadership behind Last Shot Media Group and learn how LSMG operates across talent, media, PR, production, partnerships and owned publishing.' },
    ],
  }),
})

type Member = {
  name: string
  role: string
  shortRole: string
  bio: string
  tags: string[]
  image: string
}

const TEAM: Member[] = [
  {
    name: 'Zachary Heneden',
    role: 'CO-CEO · CREATIVE DIRECTOR · EDITOR IN CHIEF',
    shortRole: 'Co-CEO · Creative Director',
    bio: 'Zachary co-founded Last Shot Media Group to build the kind of creative infrastructure talent rarely gets in one place. He leads creative direction, PR execution, original series development, editorial output and day-to-day work across LSMG properties, including LEDGERA.',
    tags: ['Co-CEO', 'Creative Director', 'Editor In Chief'],
    image: '/team/zachary.jpg',
  },
  {
    name: "Julien Serrano-O'Neill",
    role: 'CO-FOUNDER · CO-CEO',
    shortRole: 'Co-Founder · Co-CEO',
    bio: 'Julien leads operational systems, business development and organizational infrastructure across LSMG. His work connects the company’s creative ambitions to the structure required to scale partnerships, talent activity and long-term business operations.',
    tags: ['Co-Founder', 'Co-CEO', 'Operations'],
    image: '/team/julien.jpg',
  },
  {
    name: 'Ashley Diaz',
    role: 'VP OF TALENT RELATIONS',
    shortRole: 'VP of Talent Relations',
    bio: 'Ashley serves as Vice President of Talent Relations, helping shape the relationship between LSMG and the people it represents and collaborates with. Her focus is talent communication, relationship management, coordination and maintaining a strong experience across the company’s talent-facing work.',
    tags: ['VP', 'Talent Relations', 'Leadership'],
    image: '/team/ashley.jpg',
  },
]

const DIVISIONS = [
  ['01', 'Talent', 'Representation, booking, opportunity sourcing and career infrastructure.'],
  ['02', 'Public Relations', 'Press strategy, communications, media outreach and narrative positioning.'],
  ['03', 'Studios', 'Photo, video, editorial production and original media.'],
  ['04', 'LEDGERA', 'Owned publishing, interviews, culture coverage and visual storytelling.'],
  ['05', 'Partnerships', 'Brand collaborations, sponsorships, activations and cultural alignment.'],
  ['06', 'Operations', 'The systems, coordination and execution that keep every division moving together.'],
]

function AboutPage() {
  return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [active, closeBio])

  return (
    <div className="about-v3">
      <section className="about-v3-hero">
        <div className="editorial-container about-v3-hero-grid">
          <div className="about-v3-index">LSMG / ABOUT / 2026</div>
          <div className="about-v3-hero-copy">
            <div className="editorial-kicker">INDEPENDENT CREATIVE HOLDING COMPANY</div>
            <h1>WE BUILD<br />THE <span>INFRASTRUCTURE.</span></h1>
            <p>
              Last Shot Media Group operates across talent, media, public relations,
              production, partnerships and owned publishing. One company built to move
              creative people and cultural ideas forward.
            </p>
          </div>
        </div>
      </section>

      <section className="about-v3-statement">
        <div className="editorial-container about-v3-statement-grid">
          <div className="v2-section-index">01 / WHY WE EXIST</div>
          <div>
            <p className="about-v3-big-copy">
              Creative talent should not have to choose between <em>vision</em> and
              <em> infrastructure.</em>
            </p>
            <div className="about-v3-copy-columns">
              <p>
                LSMG was built to connect the pieces that are usually fragmented:
                representation, communications, booking, production, publishing and
                business development.
              </p>
              <p>
                We operate independently and stay close to the work. That means strategy
                can move quickly, talent relationships stay personal, and every division
                can support the others instead of working in isolation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-v3-facts">
        <div className="editorial-container">
          <div className="about-v3-fact-grid">
            <article><span>06</span><p>Core business divisions</p></article>
            <article><span>04</span><p>Primary markets</p></article>
            <article><span>01</span><p>Owned culture publication</p></article>
            <article><span>360°</span><p>Creative + business support</p></article>
          </div>
        </div>
      </section>

      <section className="about-v3-leadership">
        <div className="editorial-container">
          <div className="about-v3-section-head">
            <div>
              <div className="v2-section-index">02 / LEADERSHIP</div>
              <h2>THE PEOPLE<br /><span>BEHIND LSMG.</span></h2>
            </div>
            <p>
              Portrait-first. No corporate headshot wall. Meet the people directing the
              company, its operations and its talent relationships.
            </p>
          </div>

          <div className="about-roster">
            {TEAM.map((member, index) => (
              <article key={member.name} className="about-profile">
                <div className="about-roster-card">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="about-roster-photo"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <span className="about-roster-shade" aria-hidden="true" />
                  <span className="about-roster-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="about-roster-copy">
                    <strong>{member.name}</strong>
                    <small>{member.shortRole}</small>
                  </span>
                </div>

                <div className="about-profile-bio">
                  <div className="about-profile-role">{member.role}</div>
                  <p>{member.bio}</p>
                  <div className="about-profile-tags">
                    {member.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-v3-divisions">
        <div className="editorial-container">
          <div className="about-v3-section-head light">
            <div>
              <div className="v2-section-index">03 / HOW WE OPERATE</div>
              <h2>ONE COMPANY.<br /><span>SIX LANES.</span></h2>
            </div>
            <p>
              Each division has its own function. The value comes from how they work
              together around talent, clients, projects and owned media.
            </p>
          </div>

          <div className="about-v3-division-list">
            {DIVISIONS.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-v3-footprint">
        <div className="editorial-container about-v3-footprint-grid">
          <div className="v2-section-index">04 / FOOTPRINT</div>
          <div>
            <h2>DALLAS.<br />ORLANDO.<br />NEW YORK.<br /><span>ATLANTA.</span></h2>
            <p>
              LSMG operates across multiple cultural and entertainment markets while
              remaining built for remote collaboration, travel and project-based work.
            </p>
          </div>
        </div>
      </section>

      <section className="about-v3-cta">
        <div className="editorial-container about-v3-cta-grid">
          <div>
            <div className="editorial-kicker">WORK WITH LSMG</div>
            <h2>BUILD<br /><span>SOMETHING.</span></h2>
          </div>
          <div>
            <p>
              Talent, brands, partners, press, creatives and students can enter LSMG
              through a clear path.
            </p>
            <div className="about-v3-actions">
              <Link to="/contact" className="v2-solid-btn">Start a Conversation ↗</Link>
              <Link to="/internships" className="v2-text-btn">College Internships →</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
