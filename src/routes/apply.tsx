import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/apply')({
  component: ApplyPage,
})

function FormGroup({
  label,
  name,
  type = 'text',
  placeholder,
  required,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="mb-6">
      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none' }}
      />
    </div>
  )
}

function FormSelect({
  label,
  name,
  options,
  required,
}: {
  label: string
  name: string
  options: string[]
  required?: boolean
}) {
  return (
    <div className="mb-6">
      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>{label}</label>
      <select
        name={name}
        required={required}
        style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none' }}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

function FormFile({
  label,
  name,
  multiple,
  required,
}: {
  label: string
  name: string
  multiple?: boolean
  required?: boolean
}) {
  return (
    <div className="mb-6">
      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>{label}</label>
      <input
        type="file"
        name={name}
        accept="image/*"
        multiple={multiple}
        required={required}
        style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--mid)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, padding: '14px 18px', width: '100%', outline: 'none' }}
      />
    </div>
  )
}

function ApplyPage() {
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setSubmitting(true)
    setStatus('')
    try {
      // multipart/form-data (not urlencoded) so file inputs — digitals, comp card —
      // are carried through to Netlify's forms handler as real attachments.
      const formData = new FormData(form)
      const response = await fetch('/__forms.html', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Join The Roster</span>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: '.88' }}>
            Submit Your <span style={{ color: 'var(--red)' }}>Digitals</span>
          </h1>
          <p style={{ fontSize: 20, color: '#b3b3b3', maxWidth: 640, marginTop: 24, lineHeight: 1.75 }}>
            LSMG and Ledgera are always scouting new faces — women and men, all categories, across editorial, commercial, runway, fitness and beauty. Submit your digitals and portfolio below.
          </p>
        </div>
      </div>

      <section style={{ padding: '100px 40px' }}>
        <div className="max-w-[800px] mx-auto">
          <form
            name="talent-submission"
            method="POST"
            action="/__forms.html"
            data-netlify="true"
            encType="multipart/form-data"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)', padding: 48 }}
          >
            <input type="hidden" name="form-name" value="talent-submission" />
            <input type="hidden" name="recipient-email" value="info@lastshotmediagroup.com" />
            <p style={{ display: 'none' }}>
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            {status === 'success' && (
              <p style={{ color: 'var(--red)', fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>SUBMISSION RECEIVED. WE'LL BE IN TOUCH.</p>
            )}
            {status === 'error' && (
              <p style={{ color: '#ff4444', fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, marginBottom: 24 }}>SOMETHING WENT WRONG. PLEASE TRY AGAIN.</p>
            )}

            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, marginBottom: 24, color: 'var(--white)' }}>Applicant Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormGroup label="First Name *" name="first-name" required />
              <FormGroup label="Last Name *" name="last-name" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormGroup label="Email *" name="email" type="email" required />
              <FormGroup label="Phone *" name="phone" type="tel" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormGroup label="Instagram Handle" name="instagram" placeholder="@handle" />
              <FormGroup label="Currently Signed? Agency Name" name="agency" placeholder="If applicable" />
            </div>

            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, margin: '40px 0 24px', color: 'var(--white)' }}>Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormSelect label="Category *" name="gender-category" required options={['Female', 'Male', 'Non-binary', 'Prefer not to say']} />
              <FormSelect label="Talent Type *" name="talent-type" required options={['Print', 'Runway', 'Commercial', 'Fitness', 'Editorial', 'Other']} />
            </div>
            <FormSelect label="Based In *" name="location" required options={['Dallas', 'Orlando', 'New York', 'Atlanta', 'Other']} />

            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, margin: '40px 0 24px', color: 'var(--white)' }}>Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormGroup label="Height" name="height" placeholder="e.g. 5'9&quot;" />
              <FormGroup label="Shoe Size" name="shoe-size" />
              <FormGroup label="Suit / Dress Size" name="suit-dress-size" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormGroup label="Bust / Chest" name="bust-chest" />
              <FormGroup label="Waist" name="waist" />
              <FormGroup label="Hips" name="hips" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormGroup label="Hair Color" name="hair-color" />
              <FormGroup label="Eye Color" name="eye-color" />
            </div>

            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, margin: '40px 0 24px', color: 'var(--white)' }}>Digitals & Portfolio</h3>
            <FormFile label="Upload Digitals * (JPG/PNG — a few clear, current shots)" name="digitals" multiple required />
            <FormFile label="Upload Comp Card (optional)" name="comp-card" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormGroup label="Portfolio / Book Link" name="portfolio" placeholder="Link to full portfolio if you have one" />
              <FormGroup label="Reel / Video Link" name="reel" placeholder="Optional" />
            </div>

            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, margin: '40px 0 24px', color: 'var(--white)' }}>Availability</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
              <label className="flex items-center gap-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, color: 'var(--white)' }}>
                <input type="checkbox" name="travel-availability" value="Yes" style={{ width: 18, height: 18, accentColor: 'var(--red)' }} />
                Available to travel
              </label>
              <FormGroup label="Available Starting" name="available-start" placeholder="Immediately, or a date" />
            </div>

            <div className="mb-6" style={{ marginTop: 8 }}>
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 8 }}>Anything Else We Should Know</label>
              <textarea
                name="bio"
                placeholder="Experience, notable shoots, availability notes..."
                style={{ background: '#0d0d0d', border: '1px solid #222', color: 'var(--white)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, padding: '14px 18px', width: '100%', outline: 'none', resize: 'vertical', minHeight: 120 }}
              />
            </div>

            <label className="flex items-start gap-3 mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, color: '#b3b3b3', lineHeight: 1.6 }}>
              <input type="checkbox" name="consent" value="Yes" required style={{ width: 18, height: 18, marginTop: 3, accentColor: 'var(--red)' }} />
              I consent to LSMG and Ledgera reviewing and storing my submitted materials for casting and representation consideration. *
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex justify-center items-center hover:opacity-85 transition-opacity"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 3, padding: 18, background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none', cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? 'Submitting…' : 'Submit Application'}
            </button>
          </form>

          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--mid)', textAlign: 'center', marginTop: 24 }}>
            Prefer email? Reach us directly at{' '}
            <a href="mailto:info@lastshotmediagroup.com" style={{ color: 'var(--red)' }}>
              info@lastshotmediagroup.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
