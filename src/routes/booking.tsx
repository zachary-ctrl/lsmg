import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/booking')({
  component: BookingPage,
})

function BookingPage() {
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form) as any).toString(),
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }
  return (
    <div>
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>LSMG Division</span>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: '.88' }}>
            LSMG <span style={{ color: 'var(--red)' }}>Booking</span>
          </h1>
          <p style={{ fontSize: 20, color: '#b3b3b3', maxWidth: 600, marginTop: 24, lineHeight: 1.75 }}>End-to-end talent booking for artists, performers, and public figures. National and international markets — we handle the deal so you can focus on the performance.</p>
        </div>
      </div>

      {/* Ticker */}
      <div className="overflow-hidden" style={{ background: 'var(--red)', padding: '16px 0', whiteSpace: 'nowrap' }}>
        <div className="inline-flex gap-0" style={{ animation: 'ticker 25s linear infinite' }}>
          {['Houston', 'San Antonio', 'Austin', 'Atlanta', 'New York', 'Los Angeles', 'London', 'International', 'National', 'Worldwide',
            'Houston', 'San Antonio', 'Austin', 'Atlanta', 'New York', 'Los Angeles', 'London', 'International', 'National', 'Worldwide'].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 4, color: 'var(--white)', padding: '0 48px' }}>
              {item}<span style={{ fontSize: 10, opacity: .5 }}>&diams;</span>
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Booking Services</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Every Deal.<br /><span style={{ color: 'var(--red)' }}>Every Market.</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 560, marginTop: 20, lineHeight: 1.75 }}>LSMG Booking manages the full booking cycle from first offer to final show.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { icon: '🎤', title: 'Artist Booking', desc: 'Full-service booking management for independent artists.', items: ['Fee Negotiation', 'Contract Review & Management', 'Rider & Tech Requirements', 'Day-of-Show Coordination'] },
              { icon: '🌍', title: 'International Market', desc: 'Specialized booking across international music circuits.', items: ['Global Promoter Network', 'International Touring Circuit', 'Cross-Border Co-Booking', 'International Festival Placement'] },
              { icon: '🗺️', title: 'Tour Development', desc: 'Route planning, venue sourcing, and promotional coordination.', items: ['Tour Route Planning', 'Venue Sourcing & Holds', 'Promoter Partnerships', 'Tour Marketing Support'] },
              { icon: '🏟️', title: 'Event Coordination', desc: 'Corporate events, private shows, festivals, and brand activations.', items: ['Corporate Event Talent', 'Private Event Booking', 'Festival Coordination', 'Brand Activation Talent'] },
              { icon: '🌐', title: 'International Co-Booking', desc: 'Cross-border co-booking relationships for artists expanding into international markets.', items: ['International Co-Representation', 'Global Market Development', 'Cross-Border Tour Logistics', 'International Artist US Entry'] },
              { icon: '💰', title: 'Booking Rates & Terms', desc: 'Standard 10-15% commission structure. No retainer required for booking-only clients.', items: ['10-15% Commission Structure', 'No Retainer for Booking', 'Transparent Settlement', 'Monthly Performance Reports'] },
            ].map((service) => (
              <div key={service.title} className="hover:border-t-[var(--red)] transition-all" style={{ background: 'var(--black)', padding: '48px 40px', borderTop: '3px solid transparent' }}>
                <div style={{ fontSize: 36, marginBottom: 20 }}>{service.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, marginBottom: 12 }}>{service.title}</div>
                <p style={{ fontSize: 15, color: '#b3b3b3', lineHeight: 1.7, marginBottom: 20 }}>{service.desc}</p>
                <ul className="flex flex-col gap-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1, color: '#9c9c9c', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
                      <span style={{ color: 'var(--red)' }}>&rarr;</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[800px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Submit A Booking</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '12px 0' }}>
            Book an <span style={{ color: 'var(--red)' }}>Artist</span>
          </h2>
          <div className="w-[60px] h-[3px] my-5" style={{ background: 'var(--red)' }} />
          <p style={{ fontSize: 18, color: '#b3b3b3', marginBottom: 40 }}>Promoters, event producers, and brands can submit booking inquiries below. We respond within 48 hours.</p>
          <form name="booking-inquiry" method="POST" action="/__forms.html" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)', padding: 48 }}>
            <input type="hidden" name="form-name" value="booking-inquiry" />
            <input type="hidden" name="recipient-email" value="info@lastshotmediagroup.com" />
            <p style={{ display: 'none' }}><label>Don't fill this out: <input name="bot-field" /></label></p>
            {status === 'success' && <p style={{ color: 'var(--red)', fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>BOOKING INQUIRY SUBMITTED SUCCESSFULLY.</p>}
            {status === 'error' && <p style={{ color: '#ff4444', fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>SOMETHING WENT WRONG. PLEASE TRY AGAIN.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <FormGroup label="Your Name *" name="name" required />
              <FormGroup label="Company / Venue" name="company" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <FormGroup label="Email *" name="email" type="email" required />
              <FormGroup label="Phone" name="phone" type="tel" />
            </div>
            <FormGroup label="Artist / Type of Performance *" name="artist" placeholder="Specific artist or genre/type needed" required />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <FormGroup label="Event Date" name="event-date" type="date" />
              <FormGroup label="Location *" name="location" placeholder="City, State" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>Event Type *</label>
                <select name="event-type" required style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none' }}>
                  <option value="">Select...</option>
                  <option>Concert / Show</option>
                  <option>Festival</option>
                  <option>Corporate Event</option>
                  <option>Private Event</option>
                  <option>Brand Activation</option>
                  <option>Club / Venue Residency</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>Budget Range</label>
                <select name="budget" style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none' }}>
                  <option value="">Select...</option>
                  <option>Under $5,000</option>
                  <option>$5,000 - $15,000</option>
                  <option>$15,000 - $30,000</option>
                  <option>$30,000 - $50,000</option>
                  <option>$50,000+</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>Additional Details</label>
              <textarea name="details" placeholder="Venue capacity, event details, any specific requirements..." style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none', resize: 'vertical', minHeight: 120 }} />
            </div>
            <button type="submit" className="w-full flex justify-center items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 3, padding: 18, background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>Submit Booking Inquiry</button>
          </form>
        </div>
      </section>
    </div>
  )
}

function FormGroup({ label, name, type = 'text', placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div className="mb-6">
      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>{label}</label>
      <input type={type} name={name} placeholder={placeholder} required={required} style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none' }} />
    </div>
  )
}
