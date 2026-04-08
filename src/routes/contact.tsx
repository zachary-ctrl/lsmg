import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function handleFormSubmit(setStatus: (s: string) => void) {
  return async (e: React.FormEvent<HTMLFormElement>) => {
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
}

function ContactPage() {
  const [status, setStatus] = useState('')
  return (
    <div>
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Get In Touch</span>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: '.88' }}>
            <span style={{ color: 'var(--red)' }}>Contact</span>
          </h1>
          <p style={{ fontSize: 20, color: '#b3b3b3', maxWidth: 600, marginTop: 24, lineHeight: 1.75 }}>Whether you're an artist looking for PR, a promoter submitting a booking, a talent submitting a portfolio, or a brand looking for a creative partner — we want to hear from you.</p>
        </div>
      </div>

      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            {/* Left: Direct Contact */}
            <div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Direct Contact</span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '12px 0' }}>
                Let's <span style={{ color: 'var(--red)' }}>Talk.</span>
              </h2>
              <div className="w-[60px] h-[3px] my-5" style={{ background: 'var(--red)' }} />

              <div className="flex flex-col gap-8 mt-10">
                <div style={{ borderLeft: '4px solid var(--red)', paddingLeft: 24 }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: 'var(--red)', marginBottom: 6 }}>EMAIL</p>
                  <a href="mailto:info@lastshotmediagroup.com" style={{ fontSize: 22, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>info@lastshotmediagroup.com</a>
                </div>
                <div style={{ borderLeft: '4px solid var(--red)', paddingLeft: 24 }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: 'var(--red)', marginBottom: 6 }}>INSTAGRAM</p>
                  <a href="https://instagram.com/lastshotmediagroup" target="_blank" rel="noopener noreferrer" style={{ fontSize: 22, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>@lastshotmediagroup</a>
                </div>
                <div style={{ borderLeft: '4px solid var(--red)', paddingLeft: 24 }}>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 4, color: 'var(--red)', marginBottom: 6 }}>OPERATIONS</p>
                  <p style={{ fontSize: 22, color: '#fff', fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 1 }}>Worldwide</p>
                </div>
              </div>

              <div style={{ marginTop: 48, padding: 32, background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)' }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 16 }}>Specific Inquiries</h3>
                <ul className="flex flex-col gap-2">
                  {[
                    'PR: info@lastshotmediagroup.com — Subject: PR Inquiry',
                    'Booking: info@lastshotmediagroup.com — Subject: Booking',
                    'Talent: info@lastshotmediagroup.com — Subject: Talent Submission',
                    'Press / Media Kit: info@lastshotmediagroup.com — Subject: Press',
                    'Partnerships: info@lastshotmediagroup.com — Subject: Partnership',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 1, color: '#9c9c9c', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
                      <span style={{ color: 'var(--red)' }}>&rarr;</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <form name="contact" method="POST" action="/__forms.html" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleFormSubmit(setStatus)} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)', padding: 48 }}>
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="recipient-email" value="info@lastshotmediagroup.com" />
                <p style={{ display: 'none' }}><label>Don't fill this out: <input name="bot-field" /></label></p>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, marginBottom: 32 }}>Send A Message</h3>
                {status === 'success' && <p style={{ color: 'var(--red)', fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>MESSAGE SENT SUCCESSFULLY.</p>}
                {status === 'error' && <p style={{ color: '#ff4444', fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>SOMETHING WENT WRONG. PLEASE TRY AGAIN.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>Name *</label>
                    <input type="text" name="name" required style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>Email *</label>
                    <input type="email" name="email" required style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none' }} />
                  </div>
                </div>
                <div className="mb-6">
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>Inquiry Type *</label>
                  <select name="inquiry-type" required style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none' }}>
                    <option value="">Select...</option>
                    <option>PR</option>
                    <option>Talent Booking</option>
                    <option>Talent / Model Submission</option>
                    <option>Media Production</option>
                    <option>Press / Media Inquiry</option>
                    <option>Partnership / Business</option>
                    <option>General</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>Subject *</label>
                  <input type="text" name="subject" required style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none' }} />
                </div>
                <div className="mb-6">
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>Message *</label>
                  <textarea name="message" required placeholder="Tell us what you're working on and what you need..." style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none', resize: 'vertical', minHeight: 160 }} />
                </div>
                <button type="submit" className="w-full flex justify-center items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 3, padding: 18, background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
