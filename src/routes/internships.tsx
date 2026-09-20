import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/internships')({
  component: InternshipsPage,
  head: () => ({
    meta: [
      { title: 'College Internships | Last Shot Media Group' },
      { name: 'description', content: 'Apply for college internship opportunities with Last Shot Media Group across PR, talent, media, editorial, partnerships, operations and content.' },
    ],
  }),
})

const internshipAreas = [
  'PR + Communications',
  'Talent Management + Booking',
  'Social Media + Content',
  'LEDGERA Editorial',
  'Photo + Video Production',
  'Brand Partnerships + Marketing',
  'Operations + Administration',
  'Other / Open to Placement',
]

const terms = [
  'Fall 2026',
  'Spring 2027',
  'Summer 2027',
  'Rolling / Flexible',
]

function Field({
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
    <label className="intern-field">
      <span>{label}{required ? ' *' : ''}</span>
      <input type={type} name={name} placeholder={placeholder} required={required} />
    </label>
  )
}

function SelectField({
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
    <label className="intern-field">
      <span>{label}{required ? ' *' : ''}</span>
      <select name={name} required={required} defaultValue="">
        <option value="" disabled>Select one</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}

function InternshipsPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('submitting')
    try {
      const formData = new FormData(form)
      const response = await fetch('/__forms.html', { method: 'POST', body: formData })
      if (!response.ok) throw new Error('Submission failed')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="intern-page">
      <section className="intern-hero">
        <div className="editorial-container intern-hero-grid">
          <div className="intern-hero-index">CAMPUS / 2026–27</div>
          <div>
            <div className="editorial-kicker">COLLEGE INTERNSHIPS</div>
            <h1>GET IN<br /><span>THE ROOM.</span></h1>
            <p>
              Learn inside an independent creative holding company working across talent, PR,
              booking, production, publishing, partnerships and culture.
            </p>
            <a href="#apply" className="v2-solid-btn">Apply for an Internship ↗</a>
          </div>
        </div>
      </section>

      <section className="intern-intro">
        <div className="editorial-container">
          <div className="intern-section-head">
            <div className="v2-section-index">01 / THE PROGRAM</div>
            <div>
              <h2>REAL WORK.<br /><span>REAL CULTURE.</span></h2>
              <p>
                LSMG internships are for college students who want practical experience inside
                media, entertainment, communications and talent-facing work. Applicants can choose
                the area that best matches their interests, or apply open to placement.
              </p>
            </div>
          </div>

          <div className="intern-track-grid">
            {internshipAreas.slice(0, 7).map((area, index) => (
              <article className="intern-track" key={area}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{area}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="intern-expect">
        <div className="editorial-container intern-expect-grid">
          <div>
            <div className="v2-section-index">02 / WHAT WE LOOK FOR</div>
            <h2>CURIOUS.<br />DEPENDABLE.<br /><span>READY.</span></h2>
          </div>
          <div className="intern-expect-list">
            <p><b>College enrolled.</b> Current undergraduate or graduate students are welcome to apply.</p>
            <p><b>Strong communication.</b> You can write clearly, follow direction and communicate when something changes.</p>
            <p><b>Creative judgment.</b> You understand culture, media, fashion, entertainment or the business around them.</p>
            <p><b>Professional follow-through.</b> You can manage deadlines and treat real opportunities with care.</p>
          </div>
        </div>
      </section>

      <section className="intern-apply" id="apply">
        <div className="editorial-container intern-apply-grid">
          <div className="intern-apply-copy">
            <div className="v2-section-index">03 / APPLY</div>
            <h2>JOIN<br /><span>LSMG.</span></h2>
            <p>
              Tell us what you study, what you want to learn, and where you can contribute.
              Applications are reviewed as opportunities become available.
            </p>
          </div>

          <form
            className="intern-form"
            name="college-internship-application"
            method="POST"
            action="/__forms.html"
            data-netlify="true"
            encType="multipart/form-data"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="college-internship-application" />
            <input type="hidden" name="recipient-email" value="info@lastshotmediagroup.com" />
            <p className="intern-honeypot">
              <label>Do not fill this out: <input name="bot-field" /></label>
            </p>

            {status === 'success' && <div className="intern-status success">APPLICATION RECEIVED. THANK YOU.</div>}
            {status === 'error' && <div className="intern-status error">SUBMISSION FAILED. PLEASE TRY AGAIN.</div>}

            <div className="intern-form-section">
              <div className="intern-form-heading"><span>01</span><h3>Student</h3></div>
              <div className="intern-form-grid two">
                <Field label="First Name" name="first-name" required />
                <Field label="Last Name" name="last-name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" required />
              </div>
            </div>

            <div className="intern-form-section">
              <div className="intern-form-heading"><span>02</span><h3>College</h3></div>
              <div className="intern-form-grid two">
                <Field label="College / University" name="college" required />
                <Field label="Major / Program" name="major" required />
                <Field label="Graduation Year" name="graduation-year" placeholder="e.g. 2028" required />
                <SelectField label="Internship Term" name="term" options={terms} required />
              </div>
            </div>

            <div className="intern-form-section">
              <div className="intern-form-heading"><span>03</span><h3>Placement</h3></div>
              <div className="intern-form-grid two">
                <SelectField label="Primary Area" name="internship-area" options={internshipAreas} required />
                <SelectField label="Work Preference" name="work-preference" options={['Remote', 'Hybrid', 'On-site', 'Open to any']} required />
                <Field label="Current City / State" name="location" required />
                <Field label="Hours Available Per Week" name="hours-per-week" placeholder="e.g. 10–15" required />
              </div>
            </div>

            <div className="intern-form-section">
              <div className="intern-form-heading"><span>04</span><h3>Experience</h3></div>
              <div className="intern-form-grid two">
                <Field label="LinkedIn" name="linkedin" type="url" placeholder="https://" />
                <Field label="Portfolio / Website" name="portfolio" type="url" placeholder="https://" />
              </div>
              <label className="intern-field">
                <span>Resume * (PDF, DOC, DOCX)</span>
                <input type="file" name="resume" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required />
              </label>
            </div>

            <div className="intern-form-section">
              <div className="intern-form-heading"><span>05</span><h3>Why You</h3></div>
              <label className="intern-field">
                <span>Why do you want to intern with LSMG? *</span>
                <textarea name="why-lsmg" required placeholder="Tell us what you want to learn, what you care about, and what you would bring to the team." />
              </label>
              <label className="intern-field">
                <span>Relevant experience, campus organizations or skills</span>
                <textarea name="experience" placeholder="Writing, social media, design, production, events, PR, research, editing, business, etc." />
              </label>
            </div>

            <label className="intern-consent">
              <input type="checkbox" name="consent" value="Yes" required />
              <span>I consent to LSMG reviewing and storing my application materials for internship consideration. *</span>
            </label>

            <button type="submit" className="intern-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'SUBMITTING…' : 'SUBMIT APPLICATION ↗'}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
