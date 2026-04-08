import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.15 },
    )
    const children = el.querySelectorAll('.scroll-reveal')
    children.forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  }, [])
  return ref
}

function AboutPage() {
  const revealRef = useScrollReveal()
  return (
    <div ref={revealRef}>
      {/* Page Hero */}
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span className="scroll-reveal" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase', animation: 'fadeUp .7s ease both' }}>Our Story</span>
          <h1 className="scroll-reveal" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: '.88', animation: 'fadeUp .7s ease .1s both' }}>
            About <span style={{ color: 'var(--red)' }}>LSMG</span>
          </h1>
          <p className="scroll-reveal" style={{ fontSize: 20, color: '#b3b3b3', maxWidth: 600, marginTop: 24, lineHeight: 1.75, animation: 'fadeUp .7s ease .2s both' }}>Last Shot Media Group is an independent creative holding company operating worldwide. We built it because the industry needed something different.</p>
        </div>
      </div>

      {/* Company Info */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>The Company</span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '12px 0' }}>
                Built<br /><span style={{ color: 'var(--red)' }}>Different.</span>
              </h2>
              <div className="w-[60px] h-[3px] my-5" style={{ background: 'var(--red)' }} />
              <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.75, marginBottom: 20 }}>Last Shot Media Group was founded with a simple principle: creative talent deserves full-stack business infrastructure. Not just a publicist. Not just a booking agent. Everything — under one roof, owned and operated by people who actually live in the culture.</p>
              <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.75, marginBottom: 20 }}>We are worldwide and unapologetically independent. No corporate parent. No conflicting client interests. Every client gets direct attention from the founders.</p>
              <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.75 }}>Six divisions. One vision. We operate where PR, media, booking, production, training, and licensing intersect — and we build career infrastructure for artists and brands who are serious about longevity.</p>
            </div>
            <div>
              <div className="grid grid-cols-2" style={{ gap: 2, background: 'var(--red)' }}>
                {[
                  { value: '6', label: 'Divisions' },
                  { value: 'Global', label: 'Operations', accent: true },
                  { value: '2022', label: 'Founded' },
                  { value: '\u221E', label: 'Last Shot Taken', accent: true },
                ].map((s) => (
                  <div key={s.label} className="text-center glow-hover" style={{ background: 'var(--black)', padding: '48px 40px', transition: 'transform 0.3s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 72, color: s.accent ? 'var(--red)' : 'var(--white)', lineHeight: 1 }}>{s.value}</div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: 'var(--mid)', marginTop: 8, display: 'block' }}>{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="scroll-reveal" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)', padding: 36, marginTop: 2 }}>
                <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 12 }}>Our Identity</h4>
                <p style={{ fontSize: 15, color: '#9c9c9c', lineHeight: 1.7 }}>Unapologetic creative ambition backed by serious operational muscle. We move with the intensity of a counterculture movement and the precision of a global enterprise. Red, Black, White. No compromise on vision or execution.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Leadership</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              The <span style={{ color: 'var(--red)' }}>Team</span>
            </h2>
            <p style={{ fontSize: 18, color: '#b3b3b3', maxWidth: 560, marginTop: 20, lineHeight: 1.75 }}>LSMG is led by a core team of operators, creatives, and strategists who have been in the culture their entire careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { name: 'Zachary Heneden', role: 'CO-FOUNDER · CO-CEO', desc: 'Handles creative direction, PR execution, original series development, and day-to-day operational management across all LSMG divisions.', tags: ['Co-Founder', 'Co-CEO'], image: '/team/zachary.jpg' },
              { name: "Julien Serrano-O'Neil", role: 'CO-FOUNDER · CO-CEO', desc: 'Co-founder handling operational systems, business development, and organizational infrastructure. The operational backbone of LSMG.', tags: ['Co-CEO', 'Co-Founder'], image: '/team/julien.jpg' },
              { name: 'Alexandrea L.', role: 'EDITOR IN CHIEF', desc: 'Editorial lead for LSMG\'s content output — press releases, editorial coverage, media campaigns, and content strategy across all divisions.', tags: ['Editorial', 'Editor In Chief'], image: '' },
              { name: 'Ashley Diaz', role: 'BRAND STRATEGY LEAD', desc: 'Brand positioning, visual identity strategy, and market positioning for LSMG and its clients.', tags: ['Brand Strategy', 'Strategy Lead'], image: '/team/ashley.jpg' },
            ].map((member, idx) => (
              <div key={member.name} className="scroll-reveal team-card" style={{ background: '#0a0a0a', padding: 40, borderTop: '4px solid var(--red)', animationDelay: `${idx * 0.15}s` }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-20 h-20 object-cover object-top mb-6 team-image-float" style={{ border: '1px solid var(--red)' }} />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center mb-6 text-4xl team-image-float" style={{ background: 'linear-gradient(135deg,#1a0005,#080808)', border: '1px solid var(--red)' }}>👤</div>
                )}
                <h3 className="team-name-slide" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36 }}>{member.name}</h3>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', margin: '8px 0 16px' }}>{member.role}</p>
                <p className="team-bio-fade" style={{ fontSize: 15, color: '#9c9c9c', lineHeight: 1.7 }}>{member.desc}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {member.tags.map((tag, i) => (
                    <span key={tag} className="team-tag-pop" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: i === member.tags.length - 1 ? 'var(--red)' : 'var(--mid)', border: `1px solid ${i === member.tags.length - 1 ? 'var(--red)' : '#222'}`, padding: '6px 14px' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center" style={{ padding: '120px 40px' }}>
        <div className="max-w-[800px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Join The Movement</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 112px)', lineHeight: '.88', margin: '16px 0' }}>
            This Is<br />Your <span style={{ color: 'var(--red)' }}>Last Shot.</span>
          </h2>
          <p style={{ fontSize: 18, color: '#b3b3b3', marginBottom: 48, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>Whether you're looking to be a client, join the team, or partner with LSMG on something larger — the door is open.</p>
          <Link to="/contact" className="inline-flex items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 3, padding: '18px 48px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
