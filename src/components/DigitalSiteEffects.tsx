import { useEffect, useState } from 'react'

const DATA_RAILS = [
  '01100101 4C 53 4D 47 A7 F2 00 19',
  'A4 09 FF 22 00110101 72 11 C0 6D',
  '11010010 5E 01 8C 77 0A 9F 31',
  'D3 88 10 01101001 24 C1 70 4B',
  '00101110 91 B8 37 0D 6C 20 E1',
  '7A 44 10010011 2D 8F 01 63 11',
  '01010100 C7 2A 96 15 4F 0E 72',
  'EE 18 00110111 70 2C 91 4D 09',
]

const HERO_LINES = [
  'LSMG://SYSTEM.ACTIVE',
  'PR // ONLINE',
  'TALENT // ONLINE',
  'STUDIOS // ONLINE',
  'LEDGERA // ONLINE',
  'CREATIVITY -> CAPITAL',
]

const STREAM_TEXT =
  '01001100 01010011 01001101 01000111  //  MEDIA  //  TALENT  //  PR  //  CULTURE  //  CAPITAL  //  SIGNAL  //  SYSTEM ACTIVE  //  '

export function DigitalBootIntro() {
  const [phase, setPhase] = useState<'active' | 'exit' | 'done'>('active')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const exitTimer = window.setTimeout(() => setPhase('exit'), reducedMotion ? 650 : 2900)
    const doneTimer = window.setTimeout(() => setPhase('done'), reducedMotion ? 950 : 3500)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (phase === 'done') document.body.style.overflow = ''
  }, [phase])

  return (
    <>
      <style>{`
        .lsmg-digital-boot {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          isolation: isolate;
          color: #fff;
          background:
            radial-gradient(circle at 50% 50%, rgba(255,25,74,.15) 0%, rgba(255,25,74,.04) 25%, transparent 52%),
            linear-gradient(180deg, #030305 0%, #070308 52%, #020203 100%);
        }
        .lsmg-digital-boot::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 20;
          pointer-events: none;
          background: repeating-linear-gradient(to bottom, rgba(255,255,255,.024) 0 1px, transparent 1px 5px);
          mix-blend-mode: screen;
        }
        .lsmg-digital-boot::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,42,85,.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,42,85,.055) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(circle at center, black 10%, transparent 72%);
        }
        .lsmg-digital-boot--exit { animation: lsmgBootExit .6s cubic-bezier(.72,0,.25,1) forwards; }

        .lsmg-neon-halo {
          position: absolute;
          z-index: 2;
          left: 50%;
          top: 50%;
          width: min(760px, 78vw);
          height: min(420px, 48vh);
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255,35,78,.22);
          box-shadow:
            0 0 22px rgba(255,25,74,.18),
            0 0 80px rgba(200,16,46,.12),
            inset 0 0 42px rgba(255,25,74,.05);
          animation: lsmgHaloPulse 1.8s ease-in-out infinite;
        }
        .lsmg-neon-halo::before,
        .lsmg-neon-halo::after {
          content: '';
          position: absolute;
          width: 22px;
          height: 22px;
          border-color: #ff3159;
          filter: drop-shadow(0 0 7px rgba(255,35,80,.9));
        }
        .lsmg-neon-halo::before { left: -1px; top: -1px; border-left: 2px solid; border-top: 2px solid; }
        .lsmg-neon-halo::after { right: -1px; bottom: -1px; border-right: 2px solid; border-bottom: 2px solid; }

        .lsmg-data-zone {
          position: absolute;
          z-index: 3;
          top: 0;
          bottom: 0;
          width: min(25vw, 320px);
          overflow: hidden;
          mask-image: linear-gradient(to bottom, transparent 0%, black 11%, black 88%, transparent 100%);
        }
        .lsmg-data-zone--left { left: 0; border-right: 1px solid rgba(255,35,78,.12); }
        .lsmg-data-zone--right { right: 0; border-left: 1px solid rgba(255,35,78,.12); }
        .lsmg-data-rail {
          position: absolute;
          top: -110vh;
          width: 52px;
          min-height: 260vh;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          line-height: 1.85;
          letter-spacing: 1.1px;
          color: rgba(235,242,255,.56);
          word-break: break-all;
          text-align: center;
          text-shadow: 0 0 6px rgba(255,255,255,.22);
          animation: lsmgDataFall linear infinite;
          will-change: transform;
          user-select: none;
        }
        .lsmg-data-rail--red {
          color: rgba(255,48,90,.88);
          text-shadow: 0 0 7px rgba(255,36,78,.92), 0 0 17px rgba(200,16,46,.38);
        }

        .lsmg-stream {
          position: absolute;
          z-index: 4;
          left: 0;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          border-top: 1px solid rgba(255,35,78,.12);
          border-bottom: 1px solid rgba(255,35,78,.12);
          background: rgba(6,3,7,.48);
          backdrop-filter: blur(2px);
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 3px;
          color: rgba(248,250,255,.46);
          text-shadow: 0 0 7px rgba(255,255,255,.16);
          padding: 7px 0;
        }
        .lsmg-stream--top { top: 9%; }
        .lsmg-stream--bottom { bottom: 9%; color: rgba(255,53,94,.68); }
        .lsmg-stream-track {
          display: inline-block;
          min-width: 220%;
          animation: lsmgStreamLeft 10s linear infinite;
        }
        .lsmg-stream--bottom .lsmg-stream-track { animation-name: lsmgStreamRight; animation-duration: 11s; }

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
          position: relative;
          width: min(760px, 78vw);
          padding: clamp(28px, 4vw, 42px) clamp(20px, 4vw, 42px);
          background: linear-gradient(180deg, rgba(10,7,12,.8), rgba(3,3,5,.58));
          border-top: 1px solid rgba(255,255,255,.14);
          border-bottom: 1px solid rgba(255,35,78,.34);
          box-shadow:
            0 16px 60px rgba(0,0,0,.55),
            0 0 26px rgba(255,25,74,.08);
          backdrop-filter: blur(5px);
        }
        .lsmg-boot-kicker {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 14px;
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2.4px;
          color: #9c9ca4;
          text-transform: uppercase;
        }
        .lsmg-boot-kicker::before,
        .lsmg-boot-kicker::after {
          content: '';
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,43,83,.8));
          box-shadow: 0 0 8px rgba(255,35,80,.38);
        }
        .lsmg-boot-kicker::after { transform: scaleX(-1); }
        .lsmg-boot-status {
          color: #ff355d;
          text-shadow: 0 0 5px #ff2149, 0 0 14px rgba(255,33,73,.85), 0 0 28px rgba(200,16,46,.4);
          animation: lsmgBlink .7s steps(1,end) infinite;
        }
        .lsmg-boot-title {
          margin: clamp(28px, 5vh, 42px) 0 16px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(68px, 11vw, 152px);
          line-height: .78;
          letter-spacing: -.01em;
          color: #fff;
          text-transform: uppercase;
          text-shadow: 0 0 3px rgba(255,255,255,.85), 0 0 15px rgba(255,255,255,.12);
          animation: lsmgBootGlitch 1.7s steps(1,end) infinite;
        }
        .lsmg-boot-title span {
          display: inline-block;
          margin-top: 8px;
          color: #ff3159;
          text-shadow:
            0 0 4px #ff3159,
            0 0 13px rgba(255,49,89,.92),
            0 0 30px rgba(255,22,70,.62),
            0 0 64px rgba(200,16,46,.38);
          animation: lsmgNeonBreathe 1.55s ease-in-out infinite;
        }
        .lsmg-boot-sub {
          font-family: 'DM Mono', monospace;
          font-size: clamp(8px, 1vw, 11px);
          line-height: 1.75;
          letter-spacing: clamp(2px, .45vw, 5px);
          color: #c9c9cf;
          text-transform: uppercase;
        }
        .lsmg-terminal-line {
          width: min(520px, 90%);
          margin: 24px auto 0;
          padding: 8px 10px;
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(0,0,0,.38);
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(255,255,255,.58);
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
        }
        .lsmg-terminal-line span {
          display: inline-block;
          animation: lsmgTerminalSweep 2.15s steps(24,end) infinite;
        }
        .lsmg-terminal-line b {
          color: #ff3159;
          font-weight: 600;
          text-shadow: 0 0 8px rgba(255,49,89,.8);
        }
        .lsmg-boot-progress {
          position: relative;
          width: min(520px, 90%);
          height: 3px;
          margin: 13px auto 0;
          overflow: visible;
          background: rgba(255,255,255,.1);
        }
        .lsmg-boot-progress::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #ff3159;
          transform-origin: left;
          animation: lsmgProgress 2.6s cubic-bezier(.2,.8,.2,1) forwards;
          box-shadow: 0 0 7px #ff3159, 0 0 18px rgba(255,33,73,.88), 0 0 34px rgba(200,16,46,.5);
        }
        .lsmg-boot-readout {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          width: min(520px, 90%);
          margin: 10px auto 0;
          font-family: 'DM Mono', monospace;
          font-size: 7px;
          letter-spacing: 1.7px;
          color: #777780;
          text-transform: uppercase;
        }
        .lsmg-boot-readout span:last-child {
          color: #ff3159;
          text-shadow: 0 0 7px rgba(255,49,89,.65);
        }

        .lsmg-digital-hero-code {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          user-select: none;
          mask-image: linear-gradient(to left, black 0%, black 48%, transparent 82%);
        }
        .lsmg-digital-hero-code::after {
          content: '';
          position: absolute;
          width: 560px;
          height: 560px;
          right: -185px;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,31,80,.17), rgba(200,16,46,.05) 42%, transparent 70%);
          filter: blur(3px);
          animation: lsmgHeroPulse 3.2s ease-in-out infinite;
        }
        .lsmg-digital-hero-rail {
          position: absolute;
          z-index: 2;
          right: clamp(14px, 3vw, 46px);
          top: 20%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 11px;
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2.2px;
          color: rgba(246,248,255,.4);
          text-transform: uppercase;
        }
        .lsmg-digital-hero-rail span { animation: lsmgRailDrift 4.8s ease-in-out infinite; }
        .lsmg-digital-hero-rail span::before {
          content: '>';
          margin-right: 9px;
          color: #ff3159;
          text-shadow: 0 0 7px rgba(255,49,89,.95);
        }
        .lsmg-digital-hero-orbit {
          position: absolute;
          z-index: 1;
          right: -190px;
          top: 50%;
          width: 540px;
          height: 540px;
          border: 1px solid rgba(255,49,89,.5);
          border-radius: 50%;
          transform: translateY(-50%);
          box-shadow: 0 0 18px rgba(255,33,73,.28), inset 0 0 24px rgba(255,33,73,.08);
          animation: lsmgOrbit 16s linear infinite;
        }
        .lsmg-digital-hero-orbit::before,
        .lsmg-digital-hero-orbit::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(255,255,255,.14);
        }
        .lsmg-digital-hero-orbit::before { inset: 62px; }
        .lsmg-digital-hero-orbit::after { inset: 132px; border-color: rgba(255,49,89,.35); }
        .lsmg-digital-corner {
          position: absolute;
          z-index: 2;
          right: 28px;
          bottom: 24px;
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(245,248,255,.38);
          text-align: right;
          line-height: 1.8;
        }

        @keyframes lsmgDataFall { from { transform: translateY(-20vh); } to { transform: translateY(190vh); } }
        @keyframes lsmgStreamLeft { from { transform: translateX(0); } to { transform: translateX(-42%); } }
        @keyframes lsmgStreamRight { from { transform: translateX(-42%); } to { transform: translateX(0); } }
        @keyframes lsmgBlink { 0%,48% { opacity: 1; } 49%,67% { opacity: .2; } 68%,100% { opacity: 1; } }
        @keyframes lsmgProgress { from { transform: scaleX(.02); } to { transform: scaleX(1); } }
        @keyframes lsmgNeonBreathe {
          0%,100% { filter: brightness(.92); }
          50% { filter: brightness(1.22); }
        }
        @keyframes lsmgHaloPulse {
          0%,100% { opacity: .64; box-shadow: 0 0 18px rgba(255,25,74,.13), 0 0 65px rgba(200,16,46,.08), inset 0 0 30px rgba(255,25,74,.04); }
          50% { opacity: 1; box-shadow: 0 0 30px rgba(255,25,74,.25), 0 0 95px rgba(200,16,46,.16), inset 0 0 52px rgba(255,25,74,.07); }
        }
        @keyframes lsmgTerminalSweep {
          0% { transform: translateX(-12%); opacity: .55; }
          50% { opacity: 1; }
          100% { transform: translateX(8%); opacity: .65; }
        }
        @keyframes lsmgBootGlitch {
          0%, 91%, 100% { transform: translate(0); }
          92% { transform: translate(-2px, 0); }
          94% { transform: translate(3px, -1px); }
          96% { transform: translate(-1px, 1px); }
        }
        @keyframes lsmgBootExit {
          0% { opacity: 1; transform: scale(1); clip-path: inset(0); }
          42% { opacity: 1; transform: scale(1.01); clip-path: inset(47% 0 47% 0); }
          100% { opacity: 0; transform: scale(1.025); clip-path: inset(50% 0 50% 0); visibility: hidden; }
        }
        @keyframes lsmgRailDrift {
          0%,100% { transform: translateX(0); opacity: .58; }
          50% { transform: translateX(-15px); opacity: 1; }
        }
        @keyframes lsmgOrbit { to { transform: translateY(-50%) rotate(360deg); } }
        @keyframes lsmgHeroPulse {
          0%,100% { opacity: .62; transform: translateY(-50%) scale(.95); }
          50% { opacity: 1; transform: translateY(-50%) scale(1.05); }
        }

        @media (max-width: 760px) {
          .lsmg-data-zone { width: 19vw; opacity: .72; }
          .lsmg-data-rail { width: 38px; font-size: 7px; }
          .lsmg-boot-shell { width: 88vw; padding: 30px 18px; }
          .lsmg-neon-halo { width: 88vw; height: 46vh; }
          .lsmg-boot-title { font-size: clamp(64px, 18vw, 104px); line-height: .8; }
          .lsmg-boot-kicker { font-size: 7px; letter-spacing: 1.6px; }
          .lsmg-boot-sub { font-size: 8px; letter-spacing: 2px; }
          .lsmg-terminal-line { font-size: 7px; letter-spacing: 1.4px; }
          .lsmg-stream { font-size: 6px; letter-spacing: 2px; }
          .lsmg-digital-hero-rail { top: 14%; font-size: 7px; }
          .lsmg-digital-hero-orbit { width: 380px; height: 380px; right: -250px; }
          .lsmg-digital-hero-code::after { width: 410px; height: 410px; right: -255px; }
        }
        @media (max-width: 430px) {
          .lsmg-data-zone { width: 15vw; opacity: .46; }
          .lsmg-data-zone .lsmg-data-rail:nth-child(even) { display: none; }
          .lsmg-neon-halo { width: 91vw; height: 43vh; }
          .lsmg-boot-shell { width: 91vw; }
          .lsmg-boot-title { font-size: clamp(58px, 19vw, 86px); }
          .lsmg-boot-kicker::before,
          .lsmg-boot-kicker::after { opacity: .5; }
          .lsmg-boot-readout { justify-content: center; }
          .lsmg-boot-readout span:first-child { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lsmg-data-rail,
          .lsmg-stream-track,
          .lsmg-boot-title,
          .lsmg-boot-title span,
          .lsmg-boot-status,
          .lsmg-neon-halo,
          .lsmg-terminal-line span,
          .lsmg-digital-hero-rail span,
          .lsmg-digital-hero-orbit,
          .lsmg-digital-hero-code::after { animation: none !important; }
          .lsmg-boot-progress::after { animation-duration: .5s; }
        }
      `}</style>

      {phase !== 'done' && (
        <div className={`lsmg-digital-boot${phase === 'exit' ? ' lsmg-digital-boot--exit' : ''}`} aria-hidden="true">
          <div className="lsmg-neon-halo" />

          <div className="lsmg-data-zone lsmg-data-zone--left">
            {DATA_RAILS.slice(0, 4).map((code, index) => (
              <div
                key={`left-${code}`}
                className={`lsmg-data-rail${index % 2 ? ' lsmg-data-rail--red' : ''}`}
                style={{
                  left: `${12 + index * 23}%`,
                  animationDuration: `${5.8 + index * 0.75}s`,
                  animationDelay: `${-index * 1.1}s`,
                }}
              >
                {`${code} ${code} ${code} ${code} ${code} ${code}`}
              </div>
            ))}
          </div>

          <div className="lsmg-data-zone lsmg-data-zone--right">
            {DATA_RAILS.slice(4).map((code, index) => (
              <div
                key={`right-${code}`}
                className={`lsmg-data-rail${index % 2 === 0 ? ' lsmg-data-rail--red' : ''}`}
                style={{
                  left: `${10 + index * 23}%`,
                  animationDuration: `${6.2 + index * 0.68}s`,
                  animationDelay: `${-(index + 2) * 1.05}s`,
                }}
              >
                {`${code} ${code} ${code} ${code} ${code} ${code}`}
              </div>
            ))}
          </div>

          <div className="lsmg-stream lsmg-stream--top">
            <div className="lsmg-stream-track">{STREAM_TEXT.repeat(6)}</div>
          </div>
          <div className="lsmg-stream lsmg-stream--bottom">
            <div className="lsmg-stream-track">{STREAM_TEXT.repeat(6)}</div>
          </div>

          <div className="lsmg-boot-center">
            <div className="lsmg-boot-shell">
              <div className="lsmg-boot-kicker"><span className="lsmg-boot-status">SYSTEM ONLINE_</span></div>
              <div className="lsmg-boot-title">LAST SHOT<br /><span>MEDIA GROUP</span></div>
              <div className="lsmg-boot-sub">Creativity // Capital // Culture // Signal</div>
              <div className="lsmg-terminal-line">
                <span>&gt; LSMG_CORE / <b>SYNCING NETWORK</b> / 01001100 01010011 01001101 01000111</span>
              </div>
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
          <span key={line} style={{ animationDelay: `${index * -0.7}s` }}>{line}</span>
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
