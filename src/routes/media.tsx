import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/media')({
  component: MediaPage,
})

function MediaPage() {
  return (
    <div>
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)', background: 'linear-gradient(135deg,#080808 0%,#0d0002 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>LSMG Studios</span>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: '.88' }}>
            Media &amp; <span style={{ color: 'var(--red)' }}>Film</span>
          </h1>
          <p style={{ fontSize: 20, color: '#b3b3b3', maxWidth: 600, marginTop: 24, lineHeight: 1.75 }}>Original content production for film, streaming, and digital platforms. LSMG Studios develops scripted series, podcasts, and documentary content rooted in authentic cultural storytelling.</p>
        </div>
      </div>

      {/* Studios Overview */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>About LSMG Studios</span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '12px 0' }}>
                Story Is<br /><span style={{ color: 'var(--red)' }}>Everything.</span>
              </h2>
              <div className="w-[60px] h-[3px] my-5" style={{ background: 'var(--red)' }} />
              <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.75, marginBottom: 24 }}>LSMG Studios is the production arm of Last Shot Media Group. We develop, produce, and distribute original content — from scripted adult animation to documentary and podcast programming.</p>
              <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.75, marginBottom: 32 }}>Our approach is simple: real stories told with craft. We work with creators, directors, and writers who have something to say and the talent to say it.</p>
              <div className="flex flex-wrap gap-2">
                {['Scripted Series', 'Podcasts', 'Documentary', 'Brand Content'].map((tag, i) => (
                  <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: i === 0 ? 'var(--red)' : 'var(--mid)', border: `1px solid ${i === 0 ? 'var(--red)' : '#222'}`, padding: '6px 14px' }}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2" style={{ gap: 2, background: 'var(--red)' }}>
              {[
                { label: 'TV/Film', sub: 'Scripted Content' },
                { label: 'Pod', sub: 'Podcast Network' },
                { label: 'Doc', sub: 'Documentary' },
                { label: 'Brand', sub: 'Brand Content' },
              ].map((item) => (
                <div key={item.label} className="text-center" style={{ background: '#0a0a0a', padding: 36 }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: 'var(--red)' }}>{item.label}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#8f8f8f' }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Production Services */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Production Services</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              We <span style={{ color: 'var(--red)' }}>Produce</span> For You Too
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { icon: '🎥', title: 'Music Video Production', desc: 'Concept development, filming, and editing for artist music videos.' },
              { icon: '🎙️', title: 'Podcast Production', desc: 'Full-service podcast setup, recording, editing, and distribution for brands and creators.' },
              { icon: '🎞️', title: 'Documentary Development', desc: 'Community and cultural documentary development targeting streaming platforms and festival circuits.' },
            ].map((s) => (
              <div key={s.title} className="hover:bg-[#0d0002] transition-colors" style={{ background: 'var(--black)', padding: '40px 36px' }}>
                <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--white)', marginBottom: 12 }}>{s.title}</div>
                <p style={{ fontSize: 15, color: '#b3b3b3', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="mailto:info@lastshotmediagroup.com?subject=Production Inquiry" className="inline-flex items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>Production Inquiry</a>
          </div>
        </div>
      </section>

    </div>
  )
}
