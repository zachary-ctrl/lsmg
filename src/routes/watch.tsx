import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/watch')({
  component: WatchPage,
})

function WatchPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)', background: 'linear-gradient(135deg,#080808 0%,#0d0002 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase', animation: 'fadeUp .7s ease both' }}>LSMG Streaming</span>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: '.88', animation: 'fadeUp .7s ease .1s both' }}>
            Watch Our <span style={{ color: 'var(--red)' }}>Videos</span>
          </h1>
          <p style={{ fontSize: 20, color: '#b3b3b3', maxWidth: 600, marginTop: 24, lineHeight: 1.75, animation: 'fadeUp .7s ease .2s both' }}>Stream our latest podcasts and video content. From The Last Shot Podcast to behind-the-scenes exclusives.</p>
        </div>
      </div>

      {/* The Last Shot Podcast - Video Embeds */}
      <section style={{ padding: '120px 40px' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>The Last Shot Podcast</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '12px 0' }}>
              Watch &amp; <span style={{ color: 'var(--red)' }}>Listen</span>
            </h2>
            <div className="w-[60px] h-[3px] my-5" style={{ background: 'var(--red)' }} />
            <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.75, maxWidth: 700 }}>Tune into The Last Shot Podcast — raw conversations about music, culture, media, and the business behind it all. Available on Spotify, Apple Podcasts, and YouTube.</p>
          </div>

          {/* Podcast Video Embeds */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="slide-in-left" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 24, borderTop: '4px solid var(--red)' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 16 }}>Spotify Video</h3>
              <div style={{ position: 'relative', width: '100%', maxWidth: 624 }}>
                <iframe
                  data-testid="embed-iframe"
                  style={{ borderRadius: 12, width: '100%', height: 351 }}
                  src="https://open.spotify.com/embed/show/17PGdRA2WnVjpbLDeeZlgR/video?utm_source=generator"
                  frameBorder={0}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="slide-in-right" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 24, borderTop: '4px solid var(--red)' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 16 }}>Latest on YouTube</h3>
              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  style={{ borderRadius: 12, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src="https://www.youtube.com/embed/videoseries?list=UUqaNPrCXK07Q1YYbSvChaOQ"
                  frameBorder={0}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Listen Everywhere */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col gap-3">
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 8 }}>Listen Everywhere</h3>
              {[
                { name: 'Spotify', url: 'https://open.spotify.com/show/17PGdRA2WnVjpbLDeeZlgR?si=25fc304d4fdb4871', color: '#1DB954', icon: '🎧' },
                { name: 'Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/the-last-shot-podcast/id1494831568', color: '#9933CC', icon: '🎙' },
                { name: 'YouTube', url: 'https://www.youtube.com/channel/UCqaNPrCXK07Q1YYbSvChaOQ', color: '#FF0000', icon: '▶' },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 hover:translate-x-1 transition-transform"
                  style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '20px 24px', borderLeft: `4px solid ${platform.color}` }}
                >
                  <span style={{ fontSize: 32 }}>{platform.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: 'var(--white)' }}>{platform.name}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#8f8f8f' }}>LISTEN NOW</div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: platform.color, fontSize: 20 }}>&rarr;</span>
                </a>
              ))}
            </div>

            {/* More Podcast Videos */}
            <div className="flex flex-col gap-3">
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, marginBottom: 8 }}>More Videos</h3>
              <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 16, borderTop: '4px solid var(--red)' }}>
                <iframe
                  style={{ borderRadius: 12, width: '100%', height: 200 }}
                  src="https://open.spotify.com/embed/show/17PGdRA2WnVjpbLDeeZlgR/video?utm_source=generator&theme=0"
                  frameBorder={0}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
              <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 16, borderTop: '4px solid var(--red)' }}>
                <iframe
                  style={{ borderRadius: 12, width: '100%', height: 200 }}
                  src="https://www.youtube.com/embed/videoseries?list=UUqaNPrCXK07Q1YYbSvChaOQ"
                  frameBorder={0}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Podcast Episodes - Spotify + Apple */}
          <div className="mt-16">
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, marginBottom: 20 }}>Recent Episodes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 16, borderTop: '4px solid #1DB954' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#1DB954', marginBottom: 8 }}>SPOTIFY</p>
                <iframe
                  style={{ borderRadius: 12, width: '100%', height: 152 }}
                  src="https://open.spotify.com/embed/show/17PGdRA2WnVjpbLDeeZlgR?utm_source=generator&theme=0"
                  frameBorder={0}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
              <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 16, borderTop: '4px solid #1DB954' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#1DB954', marginBottom: 8 }}>SPOTIFY VIDEO</p>
                <iframe
                  style={{ borderRadius: 12, width: '100%', height: 152 }}
                  src="https://open.spotify.com/embed/show/17PGdRA2WnVjpbLDeeZlgR/video?utm_source=generator&theme=0"
                  frameBorder={0}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
              <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 16, borderTop: '4px solid #9933CC' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#9933CC', marginBottom: 8 }}>APPLE PODCASTS</p>
                <iframe
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  style={{ borderRadius: 12, width: '100%', height: 175, overflow: 'hidden', background: 'transparent' }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src="https://embed.podcasts.apple.com/us/podcast/the-last-shot-podcast/id1494831568?theme=dark"
                  loading="lazy"
                />
              </div>
              <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 16, borderTop: '4px solid #9933CC' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#9933CC', marginBottom: 8 }}>APPLE PODCASTS — LATEST</p>
                <iframe
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  style={{ borderRadius: 12, width: '100%', height: 175, overflow: 'hidden', background: 'transparent' }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src="https://embed.podcasts.apple.com/us/podcast/the-last-shot-podcast/id1494831568?theme=dark&i=latest"
                  loading="lazy"
                />
              </div>
              <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 16, borderTop: '4px solid #1DB954' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#1DB954', marginBottom: 8 }}>SPOTIFY — FULL CATALOG</p>
                <iframe
                  style={{ borderRadius: 12, width: '100%', height: 152 }}
                  src="https://open.spotify.com/embed/show/17PGdRA2WnVjpbLDeeZlgR?utm_source=generator"
                  frameBorder={0}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
              <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 16, borderTop: '4px solid #FF0000' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#FF0000', marginBottom: 8 }}>YOUTUBE</p>
                <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    style={{ borderRadius: 12, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src="https://www.youtube.com/embed/videoseries?list=UUqaNPrCXK07Q1YYbSvChaOQ"
                    frameBorder={0}
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section style={{ padding: '120px 40px', background: '#060606' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>YouTube Channel</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: '.88', margin: '12px 0' }}>
              LSMG on <span style={{ color: 'var(--red)' }}>YouTube</span>
            </h2>
            <div className="w-[60px] h-[3px] my-5" style={{ background: 'var(--red)' }} />
            <p style={{ fontSize: 17, color: '#bbb', lineHeight: 1.75, maxWidth: 700 }}>Subscribe to our YouTube channel for full video episodes, behind-the-scenes content, music videos, and exclusive interviews.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
            {[
              { icon: '🎬', title: 'Full Episodes', desc: 'Watch complete podcast episodes with video, guest interviews, and roundtable discussions.' },
              { icon: '🎵', title: 'Music Videos', desc: 'Official music video productions from LSMG Studios and our client roster.' },
              { icon: '📸', title: 'Behind The Scenes', desc: 'Go behind the scenes of LSMG events, studio sessions, and production days.' },
            ].map((item) => (
              <div key={item.title} className="text-center hover:bg-[#0d0002] transition-colors" style={{ background: 'var(--black)', padding: '48px 36px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--white)', marginBottom: 12 }}>{item.title}</div>
                <p style={{ fontSize: 15, color: '#b3b3b3', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://www.youtube.com/channel/UCqaNPrCXK07Q1YYbSvChaOQ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-85 transition-opacity"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center" style={{ padding: '80px 40px', background: '#060606' }}>
        <div className="max-w-[800px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Want More?</span>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', margin: '16px 0' }}>
            Stay <span style={{ color: 'var(--red)' }}>Connected</span>
          </h2>
          <p style={{ fontSize: 18, color: '#b3b3b3', marginBottom: 40, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>Follow LSMG across all platforms. New episodes, videos, and exclusive content drop regularly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://open.spotify.com/show/17PGdRA2WnVjpbLDeeZlgR" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-85 transition-opacity" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}>
              Follow on Spotify
            </a>
            <a href="https://podcasts.apple.com/us/podcast/the-last-shot-podcast/id1494831568" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:bg-[var(--red)] hover:text-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--red)', textTransform: 'uppercase', border: '1px solid var(--red)' }}>
              Apple Podcasts
            </a>
            <a href="https://twitch.tv/lastshotmediagroup" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:bg-[var(--red)] hover:text-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--red)', textTransform: 'uppercase', border: '1px solid var(--red)' }}>
              Twitch
            </a>
            <a href="https://instagram.com/lastshotmediagroup" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:bg-[var(--red)] hover:text-[var(--white)] transition-colors" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--red)', textTransform: 'uppercase', border: '1px solid var(--red)' }}>
              Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
