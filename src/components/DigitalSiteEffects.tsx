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
  'NODE_01 PR // ONLINE',
  'NODE_02 TALENT // ONLINE',
  'NODE_03 STUDIOS // ONLINE',
  'NODE_04 LEDGERA // ONLINE',
  'MEDIA.PR.TALENT.PRODUCTION',
  'CREATIVITY -> CAPITAL',
]

const STREAM_TEXT =
  '01001100 01010011 01001101 01000111 // MEDIA // TALENT // PR // CULTURE // CAPITAL // SIGNAL // 4C 53 4D 47 // SYSTEM ACTIVE // '

export function DigitalBootIntro() {
  const [phase, setPhase] = useState<'active' | 'exit' | 'done'>('active')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const exitTimer = window.setTimeout(() => setPhase('exit'), reducedMotion ? 550 : 2250)
    const doneTimer = window.setTimeout(() => setPhase('done'), reducedMotion ? 850 : 2850)

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
          background:
            radial-gradient(circle at 50% 48%, rgba(255,20,63,.13), transparent 34%),
            radial-gradient(circle at 15% 85%, rgba(200,16,46,.08), transparent 28%),
            #020203;
          color: #fff;
          isolation: isolate;
          opacity: 1;
          transform: scale(1);
        }
        .lsmg-digital-boot::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 7;
          pointer-events: none;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,.03) 0,
            rgba(255,255,255,.03) 1px,
            transparent 1px,
            transparent 4px
          );
          mix-blend-mode: screen;
        }
        .lsmg-digital-boot::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          background:
            linear-gradient(90deg, transparent 49.86%, rgba(255,34,76,.26) 50%, transparent 50.14%),
            linear-gradient(transparent 49.86%, rgba(255,255,255,.035) 50%, transparent 50.14%);
          filter: drop-shadow(0 0 9px rgba(255,31,73,.35));
        }
        .lsmg-digital-boot--exit {
          animation: lsmgBootExit .6s cubic-bezier(.7,0,.3,1) forwards;
        }
        .lsmg-code-column {
          position: absolute;
          top: -78vh;
          width: clamp(72px, 8vw, 132px);
          min-height: 210vh;
          font-family: 'DM Mono', monospace;
          font-size: clamp(8px, .7vw, 11px);
          line-height: 1.75;
          letter-spacing: 1.25px;
          color: rgba(245,248,255,.34);
          word-break: break-all;
          white-space: normal;
          animation: lsmgCodeFall linear infinite;
          text-shadow: 0 0 7px rgba(255,255,255,.22);
          user-select: none;
          will-change: transform;
        }
        .lsmg-code-column:nth-of-type(3n) {
          color: rgba(255,38,82,.66);
          text-shadow: 0 0 7px rgba(255,22,70,.75), 0 0 18px rgba(200,16,46,.25);
        }
        .lsmg-code-column:nth-of-type(4n) { opacity: .78; }
        .lsmg-boot-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,25,67,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,25,67,.07) 1px, transparent 1px);
          background-size: 56px 56px;
          transform: perspective(700px) rotateX(62deg) scale(1.5) translateY(15%);
          transform-origin: center bottom;
          opacity: .72;
          filter: drop-shadow(0 0 8px rgba(200,16,46,.16));
        }
        .lsmg-code-stream {
          position: absolute;
          z-index: 3;
          left: -30%;
          width: 160%;
          overflow: hidden;
          white-space: nowrap;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 3px;
          color: rgba(255,255,255,.32);
          text-shadow: 0 0 7px rgba(255,255,255,.3);
          user-select: none;
          pointer-events: none;
        }
        .lsmg-code-stream--top { top: 17%; transform: rotate(-2deg); }
        .lsmg-code-stream--bottom { bottom: 14%; transform: rotate(2deg); color: rgba(255,38,82,.48); text-shadow: 0 0 9px rgba(255,22,70,.68); }
        .lsmg-code-stream-track {
          display: inline-block;
          min-width: 200%;
          animation: lsmgStreamLeft 5.5s linear infinite;
        }
        .lsmg-code-stream--bottom .lsmg-code-stream-track { animation-name: lsmgStreamRight; animation-duration: 6.2s; }
        .lsmg-boot-center {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: grid;
          place-items: center;
          padding: clamp(18px, 4vw, 48px);
          text-align: center;
        }
        .lsmg-boot-shell {
          width: min(830px, 88vw);
          padding: clamp(18px, 3vw, 34px) 0;
        }
        .lsmg-boot-kicker {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding-bottom: 13px;
          border-bottom: 1px solid rgba(255,255,255,.28);
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 2.5px;
          color: #b8b8be;
          text-transform: uppercase;
          text-shadow: 0 0 8px rgba(255,255,255,.12);
        }
        .lsmg-boot-status {
          color: #ff2b52;
          text-shadow: 0 0 7px rgba(255,35,80,.9), 0 0 18px rgba(200,16,46,.55);
          animation: lsmgBlink .65s steps(1,end) infinite;
        }
        .lsmg-boot-title {
          position: relative;
          margin: clamp(32px, 5vh, 48px) 0 20px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(62px, 12vw, 158px);
          line-height: .82;
          letter-spacing: -.015em;
          text-transform: uppercase;
          color: #fff;
          text-shadow:
            0 0 2px rgba(255,255,255,.95),
            0 0 14px rgba(255,255,255,.14),
            5px 0 0 rgba(255,25,67,.16);
          animation: lsmgBootGlitch 1.18s steps(1,end) infinite;
        }
        .lsmg-boot-title span {
          color: #ff2149;
          text-shadow:
            0 0 5px rgba(255,39,78,.9),
            0 0 18px rgba(255,22,70,.62),
            0 0 42px rgba(200,16,46,.28);
        }
        .lsmg-boot-sub {
          margin: 0 auto;
          font-family: 'DM Mono', monospace;
          font-size: clamp(9px, 1.25vw, 12px);
          line-height: 1.75;
          letter-spacing: clamp(2px, .45vw, 5px);
          color: #d4d4d8;
          text-transform: uppercase;
          text-shadow: 0 0 9px rgba(255,255,255,.12);
        }
        .lsmg-boot-progress {
          position: relative;
          height: 4px;
          margin-top: 30px;
          overflow: hidden;
          background: rgba(255,255,255,.14);
          box-shadow: 0 0 10px rgba(255,255,255,.04);
        }
        .lsmg-boot-progress::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #ff2149;
          box-shadow: 0 0 9px rgba(255,33,73,.95), 0 0 26px rgba(200,16,46,.5);
          transform-origin: left;
          animation: lsmgProgress 2.08s cubic-bezier(.2,.8,.2,1) forwards;
        }
        .lsmg-boot-readout {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          margin-top: 13px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 1.8px;
          color: #92929a;
          text-transform: uppercase;
        }
        .lsmg-boot-readout span:last-child {
          color: rgba(255,54,91,.86);
          text-shadow: 0 0 8px rgba(255,35,80,.38);
        }
        .lsmg-digital-hero-code {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          user-select: none;
          mask-image: linear-gradient(to left, black 0%, black 44%, transparent 80%);
          opacity: 1;
        }
        .lsmg-digital-hero-code::after {
          content: '';
          position: absolute;
          width: 520px;
          height: 520px;
          right: -170px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,28,72,.11), rgba(200,16,46,.035) 42%, transparent 68%);
          filter: blur(2px);
          animation: lsmgNeonPulse 3.4s ease-in-out infinite;
        }
        .lsmg-digital-hero-rail {
          position: absolute;
          z-index: 2;
          right: clamp(12px, 3vw, 48px);
          top: 19%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 2.5px;
          color: rgba(245,248,255,.31);
          text-transform: uppercase;
          text-shadow: 0 0 8px rgba(255,255,255,.12);
        }
        .lsmg-digital-hero-rail span {
          position: relative;
          animation: lsmgRailDrift 4.4s ease-in-out infinite;
        }
        .lsmg-digital-hero-rail span::before {
          content: '>';
          margin-right: 10px;
          color: #ff2b52;
          text-shadow: 0 0 7px rgba(255,33,73,.75);
        }
        .lsmg-digital-hero-orbit {
          position: absolute;
          z-index: 1;
          right: -190px;
          top: 50%;
          width: 520px;
          height: 520px;
          border: 1px solid rgba(255,39,78,.34);
          border-radius: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 18px rgba(200,16,46,.15), inset 0 0 22px rgba(200,16,46,.06);
          animation: lsmgOrbit 15s linear infinite;
        }
        .lsmg-digital-hero-orbit::before,
        .lsmg-digital-hero-orbit::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(255,255,255,.15);
        }
        .lsmg-digital-hero-orbit::before { inset: 58px; }
        .lsmg-digital-hero-orbit::after { inset: 128px; border-color: rgba(255,39,78,.28); }
        .lsmg-digital-corner {
          position: absolute;
          z-index: 2;
          right: 28px;
          bottom: 24px;
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(245,248,255,.34);
          text-align: right;
          line-height: 1.8;
          text-shadow: 0 0 8px rgba(255,255,255,.12);
        }
        @keyframes lsmgCodeFall {
          from { transform: translateY(-18vh); }
          to { transform: translateY(175vh); }
        }
        @keyframes lsmgStreamLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-38%); }
        }
        @keyframes lsmgStreamRight {
          from { transform: translateX(-38%); }
          to { transform: translateX(0); }
        }
        @keyframes lsmgBlink { 0%,48% { opacity: 1; } 49%,70% { opacity: .18; } 71%,100% { opacity: 1; } }
        @keyframes lsmgProgress { from { transform: scaleX(.025); } to { transform: scaleX(1); } }
        @keyframes lsmgBootGlitch {
          0%, 85%, 100% { transform: translate(0); filter: none; }
          86% { transform: translate(-4px, 1px); filter: contrast(1.45) brightness(1.12); }
          89% { transform: translate(5px, -1px); }
          92% { transform: translate(-2px, 0); }
        }
        @keyframes lsmgBootExit {
          0% { opacity: 1; transform: scale(1); clip-path: inset(0 0 0 0); }
          45% { opacity: 1; transform: scale(1.015); clip-path: inset(46% 0 46% 0); }
          100% { opacity: 0; transform: scale(1.03); clip-path: inset(50% 0 50% 0); visibility: hidden; }
        }
        @keyframes lsmgRailDrift {
          0%,100% { transform: translateX(0); opacity: .6; }
          50% { transform: translateX(-22px); opacity: 1; }
        }
        @keyframes lsmgOrbit { to { transform: translateY(-50%) rotate(360deg); } }
        @keyframes lsmgNeonPulse {
          0%,100% { opacity: .65; transform: translateY(-50%) scale(.94); }
          50% { opacity: 1; transform: translateY(-50%) scale(1.05); }
        }
        @media (max-width: 700px) {
          .lsmg-boot-center { padding: 18px; }
          .lsmg-boot-shell { width: min(92vw, 620px); }
          .lsmg-code-column { width: 78px; font-size: 7.5px; opacity: .86; }
          .lsmg-code-column:nth-of-type(2n) { opacity: .55; }
          .lsmg-code-stream { font-size: 7px; letter-spacing: 2px; }
          .lsmg-boot-kicker {
            font-size: 7px;
            letter-spacing: 1.4px;
            gap: 10px;
          }
          .lsmg-boot-title {
            font-size: clamp(58px, 19vw, 94px);
            line-height: .84;
            margin-top: 34px;
          }
          .lsmg-boot-sub { letter-spacing: 2px; }
          .lsmg-boot-readout {
            font-size: 7px;
            letter-spacing: 1.2px;
            gap: 10px;
          }
          .lsmg-digital-hero-rail { top: 13%; font-size: 7px; gap: 9px; }
          .lsmg-digital-hero-orbit { width: 370px; height: 370px; right: -250px; }
          .lsmg-digital-hero-code::after { width: 390px; height: 390px; right: -240px; }
          .lsmg-digital-corner { right: 14px; bottom: 14px; font-size: 7px; }
        }
        @media (max-width: 430px) {
          .lsmg-boot-kicker { justify-content: center; }
          .lsmg-boot-kicker > span:first-child { display: none; }
          .lsmg-boot-readout { justify-content: center; }
          .lsmg-boot-readout > span:first-child { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lsmg-boot-title,
          .lsmg-boot-status,
          .lsmg-digital-hero-rail span,
          .lsmg-digital-hero-orbit,
          .lsmg-digital-hero-code::after { animation: none !important; }
          .lsmg-code-column { animation-duration: 16s !important; }
          .lsmg-code-stream-track { animation-duration: 18s !important; }
          .lsmg-boot-progress::after { animation-duration: .5s; }
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
                left: `${1 + index * 8.45}%`,
                animationDuration: `${3.1 + (index % 5) * 0.42}s`,
                animationDelay: `${-(index % 6) * 0.7}s`,
              }}
            >
              {`${code} ${code} ${code} ${code} ${code} ${code}`}
            </div>
          ))}
          <div className="lsmg-code-stream lsmg-code-stream--top">
            <div className="lsmg-code-stream-track">{STREAM_TEXT.repeat(5)}</div>
          </div>
          <div className="lsmg-code-stream lsmg-code-stream--bottom">
            <div className="lsmg-code-stream-track">{STREAM_TEXT.repeat(5)}</div>
          </div>
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
                <span>NETWORK ACTIVE // SIGNAL LOCKED</span>
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
