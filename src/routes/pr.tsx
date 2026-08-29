import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/pr')({
  component: PRPage,
  head: () => ({
    meta: [
      { title: 'PR, Talent Management & Booking | Last Shot Media Group' },
      {
        name: 'description',
        content:
          'LSMG manages talent, media opportunities, PR, collaborations, bookings, events and campaigns across entertainment, fashion and culture.',
      },
    ],
  }),
})

const pillars = [
  {
    num: '01',
    title: 'Talent Management',
    desc: 'Career strategy, representation, opportunity development, brand positioning and relationship management for select talent.',
    items: ['Career Strategy', 'Representation', 'Opportunity Development', 'Brand Positioning'],
    href: '#talent-management',
  },
  {
    num: '02',
    title: 'Media Management',
    desc: 'Identify, vet, coordinate and manage interviews, features, appearances, podcasts, press opportunities and ongoing media relationships.',
    items: ['Opportunity Scouting', 'Interview Coordination', 'Press Relationships', 'Coverage Tracking'],
    href: '#media-management',
  },
  {
    num: '03',
    title: 'PR & Media Bookings',
    desc: 'Pitch talent and brands for editorial coverage, interviews, broadcast appearances, podcasts, panels and other media opportunities.',
    items: ['Editorial Pitching', 'Interview Booking', 'Press Strategy', 'Media Placement'],
    href: '#pr-services',
  },
  {
    num: '04',
    title: 'Collaborations & Partnerships',
    desc: 'Connect talent, brands, creators, organizations and cultural platforms for campaigns, activations, content and mutually beneficial partnerships.',
    items: ['Brand Partnerships', 'Cross-Platform Collabs', 'Sponsored Content', 'Cultural Activations'],
    href: '#collaborations',
  },
  {
    num: '05',
    title: 'Events & PR Campaigns',
    desc: 'Build targeted communications and promotional strategies around launches, premieres, festivals, appearances, activations and special projects.',
    items: ['Launch Campaigns', 'Press Days', 'Event Publicity', 'Brand Activations'],
    href: '#events-campaigns',
  },
]

const prServices = [
  {
    icon: 'PR',
    title: 'Press & Media Relations',
    desc: 'Build the narrative, target the right media and maintain the relationships that keep clients in the conversation.',
    items: ['Media Pitching & Placement', 'Press Release Writing', 'Journalist Relationships', 'Press Briefing Coordination'],
  },
  {
    icon: 'BR',
    title: 'Brand Narrative',
    desc: 'Positioning, messaging frameworks and public-facing story architecture for talent, brands and creative organizations.',
    items: ['Brand Positioning', 'Talking Points & Messaging', 'Press Kits & Bios', 'Voice & Tone Guidance'],
  },
  {
    icon: 'CR',
    title: 'Crisis & Reputation',
    desc: 'Message discipline, response planning and narrative management when the stakes are highest.',
    items: ['Crisis Response Strategy', 'Official Statements', 'Media Response Management', 'Reputation Rebuild'],
  },
  {
    icon: 'CO',
    title: 'Corporate Communications',
    desc: 'External and internal communications strategy for companies, organizations, founders and creative enterprises.',
    items: ['Partnership Announcements', 'Executive Communications', 'Stakeholder Messaging', 'Internal Communications'],
  },
  {
    icon: 'GL',
    title: 'International Communications',
    desc: 'Cross-border messaging and media strategy for clients entering new markets or building international visibility.',
    items: ['International Media Pitching', 'Market Entry Messaging', 'Multilingual Materials', 'Global Communications Strategy'],
  },
  {
    icon: 'RP',
    title: 'Reporting & Intelligence',
    desc: 'Track outreach, earned coverage and campaign performance so clients can see what moved and what comes next.',
    items: ['Coverage Tracking', 'Clip Books', 'Campaign Reports', 'Media List Management'],
  },
]

const mediaManagement = [
  'Media Opportunity Scouting',
  'Interview & Appearance Coordination',
  'Press Relationship Management',
  'Media Preparation & Briefing',
  'Inbound Media Request Management',
  'Coverage Tracking & Reporting',
]

const collaborations = [
  'Brand Partnerships',
  'Sponsored Content',
  'Creator Collaborations',
  'Media Platform Partnerships',
  'Event Activations',
  'Cross-Property Campaigns',
]

const bookingServices = [
  { icon: 'BK', title: 'Artist Booking', desc: 'Full-service booking management for artists, performers and public figures.', items: ['Fee Negotiation', 'Contract Management', 'Riders & Requirements', 'Day-of-Show Coordination'] },
  { icon: 'TR', title: 'Tour Development', desc: 'Route planning, venue sourcing, promoter relationships and tour coordination.', items: ['Route Planning', 'Venue Sourcing & Holds', 'Promoter Partnerships', 'Tour Marketing Support'] },
  { icon: 'IN', title: 'International Markets', desc: 'Cross-border booking and market development for talent expanding globally.', items: ['Global Promoter Network', 'International Festivals', 'Co-Booking Relationships', 'Cross-Border Logistics'] },
]

const eventServices = [
  'Launch Campaigns',
  'Premieres',
  'Festivals',
  'Press Days',
  'Red Carpets',
  'Brand Activations',
  'Media Events',
  'Promotional Events',
  'Community & Cultural Events',
  'Campaign Strategy',
  'Talent Appearances',
  'Event Publicity',
]

const selectedWork = [
  {
    title: 'Vancouver Queer Film Festival',
    tag: 'MEDIA COVERAGE · EXECUTIVE INTERVIEW · PODCAST · EDITORIAL · SOCIAL',
    desc: 'Integrated festival coverage spanning interview, editorial and owned-media distribution through the LSMG ecosystem.',
  },
  {
    title: 'Tribeca Festival',
    tag: 'PRESS CREDENTIALS · TALENT INTERVIEWS · EDITORIAL · VIDEO',
    desc: 'On-site entertainment coverage, interviews and multi-format editorial production around one of film culture’s major festivals.',
  },
  {
    title: 'Rolling Loud',
    tag: 'PRESS CREDENTIAL · FESTIVAL COVERAGE',
    desc: 'Music-festival press access and culture coverage produced for digital audiences.',
  },
  {
    title: 'WWE',
    tag: 'ENTERTAINMENT MEDIA · TALENT COVERAGE',
    desc: 'Entertainment-media coverage and talent-focused editorial around professional wrestling.',
  },
  {
    title: 'Dallas Cowboys',
    tag: 'SPORTS MEDIA · ON-SITE EDITORIAL',
    desc: 'Sports-media coverage and on-site editorial access in the Dallas market.',
  },
  {
    title: 'Jay?Duhhh',
    tag: 'TALENT MANAGEMENT · PR CAMPAIGN · MEDIA PITCHING · BRAND STRATEGY',
    desc: 'Ongoing music and publicity support built around positioning, media outreach and career-facing strategy.',
  },
]

function SectionHead({ eyebrow, title, accent, deck }: { eyebrow: string; title: string; accent: string; deck: string }) {
  return (
    <div className="mb-16">
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>{eyebrow}</span>
      <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
        {title}<br /><span style={{ color: 'var(--red)', textShadow: '0 0 24px rgba(200,16,46,.22)' }}>{accent}</span>
      </h2>
      <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 700, marginTop: 20, lineHeight: 1.75 }}>{deck}</p>
    </div>
  )
}

function ServiceCard({ icon, title, desc, items }: { icon: string; title: string; desc: string; items: string[] }) {
  return (
    <div className="transition-all" style={{ background: 'var(--black)', padding: '42px 36px', borderTop: '2px solid rgba(200,16,46,.65)' }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', marginBottom: 18 }}>{icon}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, marginBottom: 12 }}>{title}</div>
      <p style={{ fontSize: 15, color: '#b3b3b3', lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 1, color: '#9c9c9c', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
            <span style={{ color: 'var(--red)', textShadow: '0 0 8px rgba(200,16,46,.45)' }}>→</span> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FormGroup({ label, name, type = 'text', required = false, placeholder = '' }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div className="mb-6">
      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder} style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none' }} />
    </div>
  )
}

function PRPage() {
  const [bookingStatus, setBookingStatus] = useState('')

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form) as any).toString(),
      })
      if (!response.ok) throw new Error('Submission failed')
      setBookingStatus('success')
      form.reset()
    } catch {
      setBookingStatus('error')
    }
  }

  return (
    <div>
      <section className="relative overflow-hidden" style={{ padding: '120px 40px 90px', borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 75% 35%, rgba(200,16,46,.13), transparent 32%), linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>LSMG · PR · TALENT · BOOKING · PARTNERSHIPS</span>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(58px, 9.5vw, 128px)', lineHeight: '.84', marginTop: 8 }}>
            We Manage the Moments<br />That Move <span style={{ color: 'var(--red)', textShadow: '0 0 30px rgba(200,16,46,.3)' }}>Careers.</span>
          </h1>
          <p style={{ fontSize: 20, color: '#c4c4c4', maxWidth: 820, marginTop: 28, lineHeight: 1.75 }}>
            Last Shot Media Group represents talent and builds the media, partnerships, bookings, campaigns and cultural opportunities around them. From press strategy and media management to brand collaborations, events and global bookings, LSMG connects talent and brands with the audiences and opportunities that move them forward.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <a href="#what-we-do" className="inline-flex items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '15px 30px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', boxShadow: '0 0 24px rgba(200,16,46,.2)' }}>Explore Our Services</a>
            <Link to="/contact" className="inline-flex items-center hover:border-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '15px 30px', background: 'transparent', color: 'var(--white)', textTransform: 'uppercase', border: '1px solid #555' }}>Work With LSMG</Link>
          </div>
        </div>
      </section>

      <section id="what-we-do" style={{ padding: '110px 40px', background: '#050505' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHead eyebrow="The LSMG Ecosystem" title="More Than" accent="Publicity." deck="Representation. Relationships. Opportunities. LSMG works at the intersection of talent, media, brands and culture. These five pillars organize the capabilities already operating across the company." />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5" style={{ gap: 2, background: 'rgba(200,16,46,.8)' }}>
            {pillars.map((pillar) => (
              <a key={pillar.title} href={pillar.href} className="group" style={{ background: '#090909', padding: '34px 28px', minHeight: 350, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(200,16,46,.55)', letterSpacing: 3, fontSize: 11 }}>{pillar.num}</span>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, lineHeight: 1, margin: '18px 0 14px' }}>{pillar.title}</h3>
                <p style={{ color: '#9f9f9f', fontSize: 14, lineHeight: 1.7 }}>{pillar.desc}</p>
                <div style={{ marginTop: 'auto', paddingTop: 20 }}>
                  {pillar.items.map((item) => <div key={item} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 1.3, color: '#7f7f7f', padding: '6px 0' }}>+ {item}</div>)}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="pr-services" style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHead eyebrow="Public Relations & Communications" title="Build the Narrative." accent="Own the Conversation." deck="From media relations and brand narrative to crisis, corporate and international communications, LSMG builds the communications architecture around every opportunity." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            {prServices.map((service) => <ServiceCard key={service.title} {...service} />)}
          </div>
        </div>
      </section>

      <section id="talent-management" style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHead eyebrow="Talent Management" title="Management Built Around" accent="Where You’re Going." deck="LSMG represents and develops select models, artists, creators, personalities and multimedia talent across entertainment, fashion and culture. Management means guiding the career, not just filling a booking." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { icon: '01', title: 'Career Strategy', desc: 'Longer-term positioning, priorities and opportunity planning around the direction of the talent.', items: ['Career Mapping', 'Positioning', 'Opportunity Prioritization', 'Growth Strategy'] },
              { icon: '02', title: 'Representation', desc: 'Relationship management and business-facing representation across media, brands, casting and cultural opportunities.', items: ['Brand Outreach', 'Media Outreach', 'Industry Relationships', 'Opportunity Management'] },
              { icon: '03', title: 'Partnership Development', desc: 'Build relationships that can become campaigns, ambassador roles, appearances and strategic collaborations.', items: ['Brand Partnerships', 'Sponsored Opportunities', 'Ambassador Programs', 'Strategic Introductions'] },
              { icon: '04', title: 'Career-Facing Media', desc: 'Use PR, interviews, editorial and owned media to support the larger career and brand narrative.', items: ['Press Strategy', 'Interview Placement', 'Editorial Features', 'Owned Media Support'] },
            ].map((service) => <ServiceCard key={service.title} {...service} />)}
          </div>
          <Link to="/models" className="inline-flex items-center mt-8 hover:bg-[var(--red)] hover:text-white transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '15px 28px', color: 'var(--red)', border: '1px solid var(--red)', textTransform: 'uppercase' }}>Explore LSMG Talent →</Link>
        </div>
      </section>

      <section id="media-management" style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Media Management</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 8vw, 100px)', lineHeight: '.86', marginTop: 12 }}>Turning Visibility<br />Into a <span style={{ color: 'var(--red)', textShadow: '0 0 24px rgba(200,16,46,.22)' }}>Strategy.</span></h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', marginTop: 24, lineHeight: 1.8, maxWidth: 650 }}>LSMG manages the media ecosystem surrounding our clients. We identify and vet opportunities, coordinate interviews and appearances, prepare talent for media engagements, maintain press relationships, track coverage and ensure each opportunity supports the larger brand and career strategy.</p>
          </div>
          <div style={{ background: '#0a0a0a', border: '1px solid #1e1e1e', borderTop: '3px solid var(--red)', padding: 38, boxShadow: '0 0 32px rgba(200,16,46,.05)' }}>
            {mediaManagement.map((item, index) => (
              <div key={item} className="flex items-center gap-4" style={{ padding: '16px 0', borderBottom: index === mediaManagement.length - 1 ? 'none' : '1px solid #1b1b1b' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", color: 'var(--red)', fontSize: 10 }}>{String(index + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 19, color: '#eee' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="collaborations" style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHead eyebrow="Collaborations & Strategic Partnerships" title="The Right Connection Can" accent="Change the Trajectory." deck="LSMG develops strategic collaborations between talent, brands, media platforms, organizations and cultural properties. Because LSMG also operates owned media, partnerships can move across talent, editorial, podcast, events and brand-facing opportunities." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6" style={{ gap: 2, background: 'var(--red)' }}>
            {collaborations.map((item) => <div key={item} style={{ background: '#0a0a0a', padding: '30px 22px', minHeight: 130, display: 'flex', alignItems: 'flex-end', fontFamily: "'Bebas Neue', sans-serif", fontSize: 23, lineHeight: 1.05 }}>{item}</div>)}
          </div>
        </div>
      </section>

      <section id="booking" style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHead eyebrow="LSMG Booking" title="Get the Opportunity." accent="Then Build Around It." deck="Booking is the deal and the appearance. Management is the career around it. LSMG Booking handles the opportunity cycle while the broader company can support the media, partnerships and strategy surrounding the moment." />
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            {bookingServices.map((service) => <ServiceCard key={service.title} {...service} />)}
          </div>
        </div>
      </section>

      <section id="events-campaigns" style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHead eyebrow="Events, Activations & PR Campaigns" title="Build the Moment." accent="Move the Audience." deck="LSMG can support the campaign around an event, not only place talent inside it. That includes publicity, media strategy, appearances, activations and promotional communications around launches and cultural moments." />
          <div className="flex flex-wrap gap-3">
            {eventServices.map((item) => <span key={item} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#ddd', padding: '11px 16px', border: '1px solid #2a2a2a', background: '#0a0a0a' }}>{item}</span>)}
          </div>
        </div>
      </section>

      <section id="selected-work" style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHead eyebrow="Selected Work" title="The Work" accent="Speaks." deck="A growing record of media access, editorial production, talent support and campaign work across entertainment, sports, film and culture." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            {selectedWork.map((work) => (
              <div key={work.title} style={{ background: '#090909', padding: '38px 32px', minHeight: 250, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8.5, letterSpacing: 2, lineHeight: 1.7, color: 'var(--red)' }}>{work.tag}</span>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, margin: '20px 0 12px' }}>{work.title}</h3>
                <p style={{ fontSize: 14, color: '#9f9f9f', lineHeight: 1.7 }}>{work.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <SectionHead eyebrow="Client Spotlight" title="Talent + Strategy +" accent="Execution." deck="Our roster is selective. The goal is not simply to collect names — it is to build the relationships, media and opportunities around the clients we represent." />
          <div style={{ background: '#0a0a0a', borderLeft: '4px solid var(--red)', padding: 48, maxWidth: 900 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: 'var(--red)' }}>ACTIVE CLIENT</span>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(52px, 8vw, 82px)', lineHeight: .9, margin: '12px 0' }}>JAY?DUHHH</h3>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--red)', marginBottom: 22 }}>JADA GIBSON · R&B / FAIRY FUNK</p>
            <p style={{ fontSize: 16, color: '#9c9c9c', lineHeight: 1.8, maxWidth: 720 }}>Recording artist and creator of Fairy Funk. LSMG supports press strategy, media pitching, brand positioning and broader career-facing opportunity development around the project.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[850px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Submit A Booking</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '12px 0 28px' }}>Book Talent <span style={{ color: 'var(--red)' }}>Through LSMG.</span></h2>
          <form name="booking-inquiry" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleBookingSubmit} style={{ background: '#080808', border: '1px solid #1e1e1e', borderTop: '3px solid var(--red)', padding: 'clamp(24px, 5vw, 48px)' }}>
            <input type="hidden" name="form-name" value="booking-inquiry" />
            <input type="hidden" name="recipient-email" value="info@lastshotmediagroup.com" />
            <p style={{ display: 'none' }}><label>Don't fill this out: <input name="bot-field" /></label></p>
            {bookingStatus === 'success' && <p style={{ color: 'var(--red)', fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>BOOKING INQUIRY SUBMITTED SUCCESSFULLY.</p>}
            {bookingStatus === 'error' && <p style={{ color: '#ff4444', fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>SOMETHING WENT WRONG. PLEASE TRY AGAIN.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><FormGroup label="Your Name *" name="name" required /><FormGroup label="Company / Venue" name="company" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><FormGroup label="Email *" name="email" type="email" required /><FormGroup label="Phone" name="phone" type="tel" /></div>
            <FormGroup label="Artist / Type of Performance *" name="artist" placeholder="Specific artist or type needed" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5"><FormGroup label="Event Date" name="event-date" type="date" /><FormGroup label="Location *" name="location" placeholder="City, State" required /></div>
            <div className="mb-6">
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>Additional Details</label>
              <textarea name="details" placeholder="Venue, audience, project, timeline and any specific requirements..." style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none', resize: 'vertical', minHeight: 130 }} />
            </div>
            <button type="submit" className="w-full flex justify-center items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 3, padding: 18, background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none', cursor: 'pointer', boxShadow: '0 0 22px rgba(200,16,46,.15)' }}>Submit Booking Inquiry</button>
          </form>
        </div>
      </section>

      <section className="text-center" style={{ padding: '120px 40px', background: '#050505' }}>
        <div className="max-w-[900px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Work With LSMG</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 112px)', lineHeight: '.88', margin: '16px 0' }}>Talent → Media → Partnerships<br /><span style={{ color: 'var(--red)' }}>Bookings → Events.</span></h2>
          <p style={{ fontSize: 18, color: '#aaa', maxWidth: 720, margin: '0 auto 38px', lineHeight: 1.8 }}>One ecosystem designed to help talent and brands turn visibility into momentum.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 3, padding: '17px 38px', background: 'var(--red)', color: 'white', textTransform: 'uppercase' }}>Start the Conversation</Link>
            <Link to="/models" className="inline-flex items-center" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 3, padding: '17px 38px', border: '1px solid #555', color: 'white', textTransform: 'uppercase' }}>Explore Talent</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
