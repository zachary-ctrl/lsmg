import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/pr')({
  component: PRPage,
})

function ServiceCard({ icon, title, desc, items }: { icon: string; title: string; desc: string; items: string[] }) {
  return (
    <div className="hover:border-t-[var(--red)] transition-all" style={{ background: 'var(--black)', padding: '48px 40px', borderTop: '3px solid transparent' }}>
      <div style={{ fontSize: 36, marginBottom: 20 }}>{icon}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, marginBottom: 12 }}>{title}</div>
      <p style={{ fontSize: 15, color: '#b3b3b3', lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1, color: '#9c9c9c', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
            <span style={{ color: 'var(--red)' }}>&rarr;</span> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PRPage() {
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form) as any).toString(),
      })
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>LSMG Division</span>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: '.88' }}>
            <span style={{ color: 'var(--red)' }}>PR</span>
          </h1>
          <p style={{ fontSize: 20, color: '#b3b3b3', maxWidth: 600, marginTop: 24, lineHeight: 1.75 }}>Strategic communications, public relations, press operations, and talent representation. We pitch, place, and protect your narrative — from brand positioning to crisis response.</p>
        </div>
      </div>

      {/* PR Services */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>PR Services</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              We Tell Your Story<br />To the <span style={{ color: 'var(--red)' }}>Right Rooms.</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 560, marginTop: 20, lineHeight: 1.75 }}>Our PR division handles everything from a first press release to a full media campaign rollout.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { icon: '📝', title: 'Press Release Services', desc: 'Professional press release writing and distribution for album releases, signings, partnerships, tours, and brand announcements.', items: ['Press Release Writing', 'Editorial Calendar Planning', 'Wire Distribution', 'Follow-Up & Tracking'] },
              { icon: '📡', title: 'Media Pitching', desc: 'Targeted outreach to blogs, magazines, podcasts, and streaming playlists.', items: ['Music Blog Pitching', 'Magazine & Editorial Features', 'Podcast Interview Booking', 'Playlist Pitching'] },
              { icon: '🛡️', title: 'Crisis Communications', desc: 'When things go wrong, message discipline is everything. We manage narrative control and media response.', items: ['Crisis Response Strategy', 'Official Statement Drafting', 'Media Relations Management', 'Post-Crisis Reputation Rebuild'] },
              { icon: '🎨', title: 'Brand Narrative', desc: 'We define and maintain a consistent public-facing story across all touchpoints.', items: ['Artist & Brand Bios', 'Press Kit Development', 'Talking Points & Messaging', 'Visual Identity Guidance'] },
              { icon: '🌎', title: 'International Market PR', desc: 'Multilingual PR for international artists entering the US market. Cross-border media placement and market strategy.', items: ['Multilingual Press Releases', 'International Media Pitching', 'US Market Entry Strategy', 'Global Circuit Relations'] },
              { icon: '📊', title: 'PR Reporting', desc: 'Transparent monthly reporting on placements secured, outreach sent, and coverage earned.', items: ['Monthly Coverage Reports', 'Clip Books & Press Roundups', 'Campaign Performance Tracking', 'Media List Management'] },
            ].map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Communications Services */}
      <section style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Communications Services</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Message<br /><span style={{ color: 'var(--red)' }}>Discipline.</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 560, marginTop: 20, lineHeight: 1.75 }}>Communications isn't just PR — it's every word your brand puts into the world. We build the architecture for consistent, credible, and compelling messaging.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { icon: '🏗️', title: 'Brand Strategy', desc: 'Positioning, messaging frameworks, and identity architecture for artists, brands, and creative organizations.', items: ['Brand Positioning & Messaging', 'Audience Analysis', 'Competitive Landscape Review', 'Voice & Tone Guidelines'] },
              { icon: '📢', title: 'Media Relations', desc: 'Building and maintaining relationships with journalists, editors, and media outlets.', items: ['Media List Building & Management', 'Journalist Relationship Development', 'Press Briefing Coordination', 'Background & On-Record Support'] },
              { icon: '💼', title: 'Corporate Communications', desc: 'Internal and external communications strategy for organizations, companies, and creative enterprises.', items: ['Partnership Announcements', 'Internal Communications', 'Stakeholder Messaging', 'Executive Communications'] },
              { icon: '📱', title: 'Social Media Strategy', desc: 'Platform-specific content strategy, editorial calendars, and community management guidelines.', items: ['Platform Content Strategy', 'Editorial Calendar Development', 'Caption & Copy Writing', 'Community Management Guidelines'] },
              { icon: '🌐', title: 'International Communications', desc: 'Multilingual communications for brands operating across global markets.', items: ['Multilingual Press Materials', 'Cross-Border Market Messaging', 'International Content Strategy', 'Global Market Entry Communications'] },
            ].map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Talent Services */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Talent Services</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Representation That<br /><span style={{ color: 'var(--red)' }}>Moves.</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 560, marginTop: 20, lineHeight: 1.75 }}>We represent models and multimedia talent for editorial, commercial, film, and entertainment work. Worldwide reach.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { icon: '📸', title: 'Model Representation', desc: 'Editorial, commercial, runway, and digital modeling representation.', items: ['Editorial & Magazine Placement', 'Commercial Brand Campaigns', 'Digital & Social Content', 'Event & Runway Work'] },
              { icon: '🌟', title: 'Multimedia Talent', desc: 'Representation for content creators, on-camera hosts, and influencers seeking brand partnerships.', items: ['Brand Partnership Brokering', 'Sponsored Content Deals', 'Platform Expansion Strategy', 'Media Appearance Booking'] },
            ].map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Current Roster</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Our <span style={{ color: 'var(--red)' }}>Clients</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 560, marginTop: 20, lineHeight: 1.75 }}>Our roster is selective — we only take clients we can win for.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1" style={{ gap: 2, background: 'var(--red)' }}>
            <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderLeft: '4px solid var(--red)', padding: 48 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Active Client</span>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: '#fff', lineHeight: '.88', margin: '12px 0' }}>JAY?DUHHH</h3>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: 'var(--red)', marginBottom: 24 }}>JADA GIBSON &middot; RICHMOND, VA &middot; R&B / FAIRY FUNK</p>
              <p style={{ fontSize: 16, color: '#888', lineHeight: 1.8, marginBottom: 28 }}>Richmond-based recording artist who created her own genre — Fairy Funk. Her debut project has crossed 200K+ streams independently. LSMG handles full press campaign, media pitching, and national PR strategy.</p>
              <div className="flex flex-wrap gap-2">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--red)', border: '1px solid var(--red)', padding: '6px 14px' }}>200K+ Streams</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--mid)', border: '1px solid #222', padding: '6px 14px' }}>Fairy Funk</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--mid)', border: '1px solid #222', padding: '6px 14px' }}>Full PR Campaign</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Outlets */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Media Relationships</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Where We <span style={{ color: 'var(--red)' }}>Place</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { title: 'Music Blogs', body: 'EARMILK, Ones To Watch, The Honey POP, Pigeons & Planes, Audiomack Blog' },
              { title: 'R&B / Urban', body: 'Rated R&B, HotNewHipHop, The FADER, Revolt TV, Soulbounce' },
              { title: 'International Market', body: 'Billboard International, NME, Clash Magazine, Spotify Global, Worldwide FM' },
              { title: 'Regional Press', body: 'Major market press outlets nationwide for targeted local coverage' },
            ].map((outlet) => (
              <div key={outlet.title} className="hover:bg-[#0d0002] transition-colors" style={{ background: 'var(--black)', padding: '40px 36px' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--white)', marginBottom: 12 }}>{outlet.title}</div>
                <p style={{ fontSize: 15, color: '#b3b3b3', lineHeight: 1.7 }}>{outlet.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Credentials */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>LSMG In The Press</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Coverage &amp; <span style={{ color: 'var(--red)' }}>Credentials</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 560, marginTop: 20, lineHeight: 1.75 }}>LSMG has covered major entertainment and cultural events since our founding.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { title: 'Rolling Loud', desc: 'Press coverage of Rolling Loud — one of the largest hip-hop music festivals in the world.', tag: 'Music Festival · Press Credential' },
              { title: 'Texas Rangers', desc: 'Sports media coverage of the Texas Rangers — World Series champions.', tag: 'Sports Media · Press Credential' },
              { title: 'Dallas Cowboys', desc: 'Media coverage of the Dallas Cowboys. On-site editorial access.', tag: 'Sports Media · Press Credential' },
              { title: 'Comic Con', desc: 'Entertainment press coverage of Comic Con — entertainment editorial, panel coverage.', tag: 'Entertainment · Press Credential' },
              { title: 'WWE', desc: 'Professional wrestling media coverage including event access and talent feature coverage.', tag: 'Entertainment · Press Credential' },
              { title: 'Morehouse Gala', desc: 'Coverage of the Morehouse College annual gala — the HBCU community\'s premier fundraising event.', tag: 'Cultural Event · Press Coverage' },
            ].map((item) => (
              <div key={item.title} className="hover:bg-[#0d0002] transition-colors" style={{ background: 'var(--black)', padding: '40px 36px' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--white)', marginBottom: 12 }}>{item.title}</div>
                <p style={{ fontSize: 15, color: '#b3b3b3', lineHeight: 1.7 }}>{item.desc}</p>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: 'var(--red)', marginTop: 20, display: 'block' }}>{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company News */}
      <section style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Company News</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Latest From <span style={{ color: 'var(--red)' }}>LSMG</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { date: 'PR DIVISION · 2025', title: 'Jay?Duhhh "Fairy Funk" Campaign Launch', desc: 'LSMG launches full press campaign for client Jay?Duhhh\'s debut project Fairy Funk, targeting major music blogs and R&B editorial outlets.', link: '/pr' },
              { date: 'EXPANSION · 2025', title: 'LSMG Launches International Market Strategy', desc: 'Last Shot Media Group formally launches its international market expansion with global bookings, multilingual PR, and cross-border co-representation services.', link: '/booking' },
            ].map((news) => (
              <div key={news.title} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 36, borderTop: '3px solid var(--red)' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 12 }}>{news.date}</span>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 12 }}>{news.title}</h3>
                <p style={{ fontSize: 14, color: '#9c9c9c', lineHeight: 1.7 }}>{news.desc}</p>
                <Link to={news.link} className="inline-flex items-center mt-5 hover:bg-[var(--red)] hover:text-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--red)', textTransform: 'uppercase', border: '1px solid var(--red)' }}>Read More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PR Retainer */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[800px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Work With Us</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '12px 0' }}>
            PR <span style={{ color: 'var(--red)' }}>Retainer</span>
          </h2>
          <div className="w-[60px] h-[3px] my-5" style={{ background: 'var(--red)' }} />
          <p style={{ fontSize: 18, color: '#888', marginBottom: 40, lineHeight: 1.8 }}>Our Foundation PR retainer is designed for independent artists and emerging brands serious about building real press momentum.</p>
          <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)', padding: 48, marginBottom: 32 }}>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, marginBottom: 24 }}>Foundation Retainer</h3>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: 'var(--red)', lineHeight: 1, marginBottom: 8 }}>$3,000<span style={{ fontSize: 24, color: '#8f8f8f' }}>/month</span></p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f', marginBottom: 32 }}>3-MONTH MINIMUM COMMITMENT</p>
            <ul className="flex flex-col gap-2">
              {['Full press release writing and distribution', 'Monthly media pitching (15+ outlets)', 'Press kit development and maintenance', 'Monthly coverage reports with clips', 'Dedicated account manager (Zachary Heneden)', 'Priority response within 24 hours'].map((item) => (
                <li key={item} className="flex items-center gap-2.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1, color: '#9c9c9c', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
                  <span style={{ color: 'var(--red)' }}>&rarr;</span> {item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="inline-flex items-center mt-8 hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>
              Apply for PR &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Quote + Work With Us */}
      <section style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[800px] mx-auto">
          <div style={{ borderLeft: '4px solid var(--red)', padding: '24px 32px', margin: '0 0 48px', background: '#0a0a0a' }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--white)', lineHeight: 1.5 }}>"The difference between a brand people trust and one they ignore isn't talent — it's message discipline. We build that."</p>
            <cite style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: 'var(--red)', marginTop: 12, display: 'block', fontStyle: 'normal' }}>— Last Shot Media Group</cite>
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '24px 0' }}>
            Work With <span style={{ color: 'var(--red)' }}>Us</span>
          </h2>
          <p style={{ fontSize: 18, color: '#b3b3b3', marginBottom: 32 }}>Communications engagements are scoped based on need — from one-time crisis response to ongoing monthly retainer.</p>
          <Link to="/contact" className="inline-flex items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>
            Start the Conversation
          </Link>
        </div>
      </section>

      {/* Media Contact */}
      <section style={{ padding: '120px 40px', background: 'var(--gray)' }}>
        <div className="max-w-[800px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>For Journalists</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', margin: '12px 0' }}>
            Media <span style={{ color: 'var(--red)' }}>Contact</span>
          </h2>
          <div className="w-[60px] h-[3px] my-5" style={{ background: 'var(--red)' }} />
          <p style={{ fontSize: 18, color: '#b3b3b3', marginBottom: 40 }}>For press inquiries, credential requests, interview requests, and media kit access, please contact LSMG directly.</p>
          <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderLeft: '4px solid var(--red)', padding: 40 }}>
            <div className="flex flex-col gap-5">
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', marginBottom: 4 }}>PRESS INQUIRIES</p>
                <p style={{ fontSize: 18, color: '#fff' }}>info@lastshotmediagroup.com</p>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', marginBottom: 4 }}>INSTAGRAM</p>
                <p style={{ fontSize: 18, color: '#fff' }}>@lastshotmediagroup</p>
              </div>
              <div>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', marginBottom: 4 }}>OPERATIONS</p>
                <p style={{ fontSize: 18, color: '#fff' }}>Worldwide</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:info@lastshotmediagroup.com?subject=Press Inquiry" className="inline-flex items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>Email Press Team</a>
              <a href="mailto:info@lastshotmediagroup.com?subject=Media Kit Request" className="inline-flex items-center hover:border-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--white)', textTransform: 'uppercase', border: '1px solid #707070' }}>Request Media Kit</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
