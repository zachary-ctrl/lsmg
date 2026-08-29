import { useEffect, useState } from 'react'

const CODE_COLUMNS = [
  '01100101 4C 53 4D 47 A7 F2 00 19 11001010 7B 21 8E 44',
  'A4 09 FF 22 00110101 LSMG 72 11 C0 6D 10101100 9A 03',
  '11010010 5E 01 8C 77 CAPITAL 0A 9F 31 00101101 62 14',
  'D3 88 10 01101001 MEDIA 24 C1 70 4B 11100100 2F 6A',
  '00101110 91 B8 37 0D CULTURE 6C 20 E1 10110110 55 0A',
  '7A 44 10010011 2D 8F 01 CREATIVE 63 11 B0 00111001 9C',
  '01010100 C7 2A 96 15 4F 11000110 0E 72 SIGNAL 8B 33',
  'EE 18 00110111 70 2C 91 10100001 4D NETWORK 09 B7 64',
  '10011100 32 A1 0C 7F 55 01101010 2B LSMG 99 10 E4',
  '51 0A D8 11100010 27 6E 03 10010111 CAPITAL 74 C2 19',
  '00110011 8D 60 A5 11 MEDIA 42 7C 10001001 2E 6B 01',
  'B0 71 01001110 25 9A 3C 11110000 0F CULTURE 82 44',
]

const HERO_LINES = [
  'LSMG://SYSTEM.ACTIVE',
  'NODE_01 DALLAS  // ONLINE',
  'NODE_02 ORLANDO // ONLINE',
  'NODE_03 NEW_YORK // ONLINE',
  'NODE_04 ATLANTA // ONLINE',
  'MEDIA.PR.TALENT.PRODUCTION',
  'CREATIVITY -> CAPITAL',
]

export function DigitalBootIntro() {
  const [phase, setPhase] = useState<'active' | 'exit' | 'done'>('active')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const exitTimer = window.setTimeout(() => setPhase('exit'), reducedMotion ? 350 : 1850)
    const doneTimer = window.setTimeout(() => setPhase('done'), reducedMotion ? 600 : 2400)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (phase !== 'done') return
    document.body.style.overflow = ''
  }, [phase])

  return (
    <>
      <style>{`
        .lsmg-digital-boot {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          background: #030303;
          color: #f5f5f5;
          isolation: isolate;
          opacity: 1;
          transform: scale(1);
        }
        .lsmg-digital-boot::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,.018) 0,
            rgba(255,255,255,.018) 1px,
            transparent 1px,
            transparent 4px
          );
          mix-blend-mode: screen;
        }
        .lsmg-digital-boot::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 48%, rgba(200,16,46,.12), transparent 34%),
            linear-gradient(90deg, transparent 49.9%, rgba(200,16,46,.11) 50%, transparent 50.1%);
        }
        .lsmg-digital-boot--exit {
          animation: lsmgBootExit .55s cubic-bezier(.7,0,.3,1) forwards;
        }
        .lsmg-code-column {
          position: absolute;
          top: -40vh;
          width: 90px;
          height: 180vh;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          line-height: 2.05;
          letter-spacing: 2px;
          color: rgba(255,255,255,.16);
          word-break: break-all;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          animation: lsmgCodeFall linear infinite;
          user-select: none;
        }
        .lsmg-code-column:nth-child(3n) { color: rgba(200,16,46,.3); }
        .lsmg-code-column:nth-child(4n) { filter: blur(.2px); opacity: .7; }
        .lsmg-boot-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(200,16,46,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,16,46,.04) 1px, transparent 1px);
          background-size: 56px 56px;
          transform: perspective(700px) rotateX(62deg) scale(1.5) translateY(15%);
          transform-origin: center bottom;
          opacity: .55;
        }
        .lsmg-boot-center {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: grid;
          place-items: center;
          padding: 24px;
          text-align: center;
        }
        .lsmg-boot-shell {
          width: min(900px, 92vw);
        }
        .lsmg-boot-kicker {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,.18);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 3px;
          color: #8b8b8b;
          text-transform: uppercase;
        }
        .lsmg-boot-status {
          color: #c8102e;
          animation: lsmgBlink .65s steps(1,end) infinite;
        }
        .lsmg-boot-title {
          position: relative;
          margin: 28px 0 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(64px, 13vw, 170px);
          line-height: .76;
          letter-spacing: -.02em;
          text-transform: uppercase;
          text-shadow: 6px 0 0 rgba(200,16,46,.12), -4px 0 0 rgba(255,255,255,.04);
          animation: lsmgBootGlitch 1.35s steps(1,end) infinite;
        }
        .lsmg-boot-title span { color: #c8102e; }
        .lsmg-boot-sub {
          font-family: 'DM Mono', monospace;
          font-size: clamp(9px, 1.3vw, 12px);
          line-height: 1.9;
          letter-spacing: clamp(2px, .6vw, 7px);
          color: #aaa;
          text-transform: uppercase;
        }
        .lsmg-boot-progress {
          position: relative;
          height: 3px;
          margin-top: 28px;
          overflow: hidden;
          background: rgba(255,255,255,.12);
        }
        .lsmg-boot-progress::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #c8102e;
          transform-origin: left;
          animation: lsmgProgress 1.75s cubic-bezier(.2,.8,.2,1) forwards;
        }
        .lsmg-boot-readout {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 11px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: #666;
        }
        .lsmg-digital-hero-code {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          user-select: none;
          mask-image: linear-gradient(to left, black 0%, black 38%, transparent 76%);
          opacity: .9;
        }
        .lsmg-digital-hero-rail {
          position: absolute;
          right: clamp(12px, 3vw, 48px);
          top: 19%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 2.5px;
          color: rgba(255,255,255,.16);
          text-transform: uppercase;
        }
        .lsmg-digital-hero-rail span {
          position: relative;
          animation: lsmgRailDrift 5s ease-in-out infinite;
        }
        .lsmg-digital-hero-rail span::before {
          content: '>'; 
          margin-right: 10px;
          color: rgba(200,16,46,.7);
        }
        .lsmg-digital-hero-orbit {
          position: absolute;
          right: -190px;
          top: 50%;
          width: 520px;
          height: 520px;
          border: 1px solid rgba(200,16,46,.13);
          border-radius: 50%;
          transform: translateY(-50%);
          animation: lsmgOrbit 18s linear infinite;
        }
        .lsmg-digital-hero-orbit::before,
        .lsmg-digital-hero-orbit::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(255,255,255,.08);
        }
        .lsmg-digital-hero-orbit::before { inset: 58px; }
        .lsmg-digital-hero-orbit::after { inset: 128px; border-color: rgba(200,16,46,.16); }
        .lsmg-digital-corner {
          position: absolute;
          right: 28px;
          bottom: 24px;
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(255,255,255,.17);
          text-align: right;
          line-height: 1.8;
        }
        @keyframes lsmgCodeFall {
          from { transform: translateY(-22vh); }
          to { transform: translateY(75vh); }
        }
        @keyframes lsmgBlink { 0%,48% { opacity: 1; } 49%,70% { opacity: .15; } 71%,100% { opacity: 1; } }
        @keyframes lsmgProgress { from { transform: scaleX(.03); } to { transform: scaleX(1); } }
        @keyframes lsmgBootGlitch {
          0%, 89%, 100% { transform: translate(0); filter: none; }
          90% { transform: translate(-3px, 1px); filter: contrast(1.4); }
          92% { transform: translate(4px, -1px); }
          94% { transform: translate(-1px, 0); }
        }
        @keyframes lsmgBootExit {
          0% { opacity: 1; transform: scale(1); clip-path: inset(0 0 0 0); }
          45% { opacity: 1; transform: scale(1.015); clip-path: inset(46% 0 46% 0); }
          100% { opacity: 0; transform: scale(1.03); clip-path: inset(50% 0 50% 0); visibility: hidden; }
        }
        @keyframes lsmgRailDrift {
          0%,100% { transform: translateX(0); opacity: .45; }
          50% { transform: translateX(-18px); opacity: .95; }
        }
        @keyframes lsmgOrbit { to { transform: translateY(-50%) rotate(360deg); } }
        @media (max-width: 700px) {
          .lsmg-code-column { width: 64px; font-size: 8px; opacity: .75; }
          .lsmg-code-column:nth-child(even) { display: none; }
          .lsmg-boot-kicker { font-size: 7px; letter-spacing: 1.6px; }
          .lsmg-boot-readout { font-size: 7px; }
          .lsmg-digital-hero-rail { top: 13%; font-size: 7px; gap: 9px; }
          .lsmg-digital-hero-orbit { width: 370px; height: 370px; right: -250px; }
          .lsmg-digital-corner { right: 14px; bottom: 14px; font-size: 7px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lsmg-code-column,
          .lsmg-boot-title,
          .lsmg-boot-status,
          .lsmg-digital-hero-rail span,
          .lsmg-digital-hero-orbit { animation: none !important; }
          .lsmg-boot-progress::after { animation-duration: .3s; }
        }
      `}</style>

      {phase !== 'done' && (
        <div className={`lsmg-digital-boot${phase === 'exit' ? ' lsmg-digital-boot--exit' : ''}`} aria-hidden="true">
          <div className="lsmg-boot-grid" />
          {CODE_COLUMNS.map((code, index) => (
            <div
              key={code}
              className="lsmg-code-column"
              style={{
                left: `${3 + index * 8.25}%`,
                animationDuration: `${6.8 + (index % 5) * 1.15}s`,
                animationDelay: `${-(index % 6) * 1.2}s`,
              }}
            >
              {code.repeat(4)}
            </div>
          ))}
          <div className="lsmg-boot-center">
            <div className="lsmg-boot-shell">
              <div className="lsmg-boot-kicker">
                <span>LSMG://BOOT_SEQUENCE</span>
                <span className="lsmg-boot-status">SYSTEM ONLINE_</span>
              </div>
              <div className="lsmg-boot-title">LAST SHOT<br /><span>MEDIA GROUP</span></div>
              <div className="lsmg-boot-sub">Creativity // Capital // Culture // Signal</div>
              <div className="lsmg-boot-progress" />
              <div className="lsmg-boot-readout">
                <span>EST.2022 / BUILD.26</span>
                <span>DALLAS · ORLANDO · NEW YORK · ATLANTA</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function DigitalHeroCode() {
  return (
    <div className="lsmg-digital-hero-code" aria-hidden="true">
      <div className="lsmg-digital-hero-orbit" />
      <div className="lsmg-digital-hero-rail">
        {HERO_LINES.map((line, index) => (
          <span key={line} style={{ animationDelay: `${index * -0.65}s` }}>{line}</span>
        ))}
      </div>
      <div className="lsmg-digital-corner">
        SIGNAL_0001<br />
        LSMG.NODE.ACTIVE<br />
        01:10:01:00
      </div>
    </div>
  )
}
