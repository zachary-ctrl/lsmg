import { useEffect, useState } from 'react'

const CODE_RAILS = [
  '01001100 01010011 01001101 01000111 4C 53 4D 47',
  'MEDIA PR TALENT BOOKING CULTURE CAPITAL SIGNAL',
  'A7 F2 00 19 7B 21 8E 44 72 11 C0 6D 9A 03',
  '11001010 00110101 10101100 01101001 11100100',
  'SYSTEM ACTIVE NETWORK READY NODE ONLINE BUILD 26',
  '00101110 10110110 01010100 11000110 00110111',
]

const HERO_LINES = [
  'LSMG://SYSTEM.ACTIVE',
  'PR // ONLINE',
  'TALENT // ONLINE',
  'STUDIOS // ONLINE',
  'LEDGERA // ONLINE',
  'PARTNERSHIPS // OPEN',
  'CREATIVITY -> CAPITAL',
]

export function DigitalBootIntro() {
  const [phase, setPhase] = useState<'active' | 'exit' | 'done'>('active')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const exitTimer = window.setTimeout(() => setPhase('exit'), reducedMotion ? 600 : 2350)
    const doneTimer = window.setTimeout(() => setPhase('done'), reducedMotion ? 850 : 2850)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(doneTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (phase === 'done') document.body.style.overflow = ''
  }, [phase])

  if (phase === 'done') return null

  return (
    <>
      <style>{`
        .lsmg-boot {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 46%, rgba(200,16,46,.10), transparent 30%),
            #030304;
          color: #fff;
          isolation: isolate;
        }
        .lsmg-boot::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.014) 1px, transparent 1px);
          background-size: 52px 52px;
          opacity: .72;
        }
        .lsmg-boot::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(to bottom, transparent 0, transparent 3px, rgba(255,255,255,.018) 4px);
          mix-blend-mode: screen;
        }
        .lsmg-boot--exit { animation: lsmgBootExit .5s cubic-bezier(.72,0,.28,1) forwards; }

        .lsmg-boot-code-zone {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .lsmg-boot-code {
          position: absolute;
          top: -75vh;
          width: clamp(92px, 10vw, 150px);
          min-height: 210vh;
          font-family: 'DM Mono', monospace;
          font-size: clamp(7px, .68vw, 10px);
          line-height: 1.72;
          letter-spacing: 1.3px;
          color: rgba(245,248,255,.24);
          white-space: pre-wrap;
          word-break: break-word;
          text-shadow: 0 0 8px rgba(255,255,255,.08);
          animation: lsmgBootCodeFall linear infinite;
          will-change: transform;
        }
        .lsmg-boot-code.red {
          color: rgba(255,33,73,.42);
          text-shadow: 0 0 8px rgba(255,33,73,.38);
        }
        .lsmg-boot-code.left-1 { left: 3%; animation-duration: 8s; }
        .lsmg-boot-code.left-2 { left: 15%; animation-duration: 10s; animation-delay: -4s; }
        .lsmg-boot-code.right-1 { right: 3%; animation-duration: 9s; animation-delay: -2s; }
        .lsmg-boot-code.right-2 { right: 15%; animation-duration: 11s; animation-delay: -6s; }

        .lsmg-boot-scan {
          position: absolute;
          z-index: 2;
          left: 0;
          right: 0;
          top: 8%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,33,73,.32), rgba(255,255,255,.14), rgba(255,33,73,.32), transparent);
          box-shadow: 0 0 16px rgba(255,33,73,.24);
          animation: lsmgBootScan 2.15s ease-in-out infinite;
        }

        .lsmg-boot-center {
          position: absolute;
          inset: 0;
          z-index: 8;
          display: grid;
          place-items: center;
          padding: 24px;
        }
        .lsmg-boot-shell {
          position: relative;
          width: min(760px, 86vw);
          padding: clamp(22px, 4vw, 38px);
          background: linear-gradient(180deg, rgba(11,11,12,.88), rgba(5,5,6,.74));
          border: 1px solid rgba(255,255,255,.12);
          box-shadow:
            0 24px 80px rgba(0,0,0,.62),
            0 0 0 1px rgba(200,16,46,.08),
            0 0 44px rgba(200,16,46,.10);
          backdrop-filter: blur(6px);
        }
        .lsmg-boot-shell::before,
        .lsmg-boot-shell::after {
          content: '';
          position: absolute;
          width: 46px;
          height: 46px;
          pointer-events: none;
        }
        .lsmg-boot-shell::before { left: -1px; top: -1px; border-left: 2px solid #ff2149; border-top: 2px solid #ff2149; box-shadow: -2px -2px 14px rgba(255,33,73,.25); }
        .lsmg-boot-shell::after { right: -1px; bottom: -1px; border-right: 2px solid #ff2149; border-bottom: 2px solid #ff2149; box-shadow: 2px 2px 14px rgba(255,33,73,.25); }

        .lsmg-boot-meta {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: center;
          padding-bottom: 13px;
          border-bottom: 1px solid rgba(255,255,255,.10);
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2.4px;
          color: #7f8188;
          text-transform: uppercase;
        }
        .lsmg-boot-live { color: #ff2b52; text-shadow: 0 0 8px rgba(255,33,73,.65); }
        .lsmg-boot-title {
          margin: clamp(30px, 5vh, 44px) 0 16px;
          text-align: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(62px, 11vw, 140px);
          line-height: .78;
          letter-spacing: -.015em;
          text-transform: uppercase;
          text-shadow: 0 0 14px rgba(255,255,255,.08);
        }
        .lsmg-boot-title span {
          display: inline-block;
          color: #ff2149;
          text-shadow: 0 0 6px rgba(255,33,73,.72), 0 0 22px rgba(200,16,46,.30);
        }
        .lsmg-boot-sub {
          text-align: center;
          font-family: 'DM Mono', monospace;
          font-size: clamp(8px, 1vw, 11px);
          letter-spacing: clamp(1.8px, .42vw, 4px);
          color: #b2b4bb;
          text-transform: uppercase;
        }
        .lsmg-boot-progress {
          position: relative;
          height: 3px;
          margin-top: 30px;
          overflow: hidden;
          background: rgba(255,255,255,.10);
        }
        .lsmg-boot-progress::after {
          content: '';
          position: absolute;
          inset: 0;
          transform-origin: left;
          background: #ff2149;
          box-shadow: 0 0 10px rgba(255,33,73,.85), 0 0 24px rgba(200,16,46,.34);
          animation: lsmgBootProgress 2.05s cubic-bezier(.2,.8,.2,1) forwards;
        }
        .lsmg-boot-readout {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          margin-top: 12px;
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 1.7px;
          color: #6f7178;
          text-transform: uppercase;
        }
        .lsmg-boot-readout strong { color: rgba(255,255,255,.74); font-weight: 500; }

        @keyframes lsmgBootCodeFall {
          from { transform: translate3d(0,-15vh,0); }
          to { transform: translate3d(0,175vh,0); }
        }
        @keyframes lsmgBootScan {
          0%,100% { transform: translateY(0); opacity: .22; }
          50% { transform: translateY(78vh); opacity: .85; }
        }
        @keyframes lsmgBootProgress { from { transform: scaleX(.02); } to { transform: scaleX(1); } }
        @keyframes lsmgBootExit {
          0% { opacity: 1; transform: scale(1); clip-path: inset(0 0 0 0); }
          55% { opacity: 1; transform: scale(1.01); clip-path: inset(47% 0 47% 0); }
          100% { opacity: 0; transform: scale(1.02); clip-path: inset(50% 0 50% 0); visibility: hidden; }
        }

        .lsmg-digital-hero-code {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          user-select: none;
          opacity: .96;
        }
        .lsmg-digital-hero-code::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, transparent 0 58%, rgba(0,0,0,.14) 72%, rgba(0,0,0,.38) 100%),
            radial-gradient(circle at 82% 48%, rgba(200,16,46,.12), transparent 27%);
        }
        .lsmg-hero-code-column {
          position: absolute;
          top: -32%;
          right: 5%;
          width: 330px;
          max-width: 34vw;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          line-height: 1.8;
          letter-spacing: 2px;
          color: rgba(255,255,255,.16);
          white-space: pre-wrap;
          animation: lsmgHeroCodeFall 20s linear infinite;
          text-shadow: 0 0 8px rgba(255,255,255,.05);
        }
        .lsmg-hero-code-column--red {
          right: 27%;
          opacity: .58;
          color: rgba(255,33,73,.22);
          animation-duration: 26s;
          animation-delay: -11s;
        }
        .lsmg-digital-hero-rail {
          position: absolute;
          right: clamp(16px, 3vw, 48px);
          top: 18%;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          padding: 16px 18px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(4,4,5,.58);
          box-shadow: 0 0 24px rgba(200,16,46,.08);
          backdrop-filter: blur(3px);
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(255,255,255,.34);
          text-transform: uppercase;
        }
        .lsmg-digital-hero-rail span { animation: lsmgRailDrift 4.8s ease-in-out infinite; }
        .lsmg-digital-hero-rail span::before { content: '>'; margin-right: 9px; color: #ff2149; text-shadow: 0 0 7px rgba(255,33,73,.7); }
        .lsmg-digital-corner {
          position: absolute;
          right: 26px;
          bottom: 22px;
          z-index: 2;
          padding-left: 14px;
          border-left: 1px solid rgba(255,33,73,.32);
          font-family: 'DM Mono', monospace;
          font-size: 7px;
          letter-spacing: 2px;
          color: rgba(255,255,255,.25);
          text-align: right;
          line-height: 1.8;
        }
        @keyframes lsmgHeroCodeFall { to { transform: translateY(72%); } }
        @keyframes lsmgRailDrift {
          0%,100% { transform: translateX(0); opacity: .58; }
          50% { transform: translateX(-10px); opacity: 1; }
        }

        @media (max-width: 760px) {
          .lsmg-boot-code.left-2, .lsmg-boot-code.right-2 { display: none; }
          .lsmg-boot-code { opacity: .74; width: 100px; font-size: 7px; }
          .lsmg-boot-shell { width: min(90vw, 620px); padding: 22px 18px; }
          .lsmg-boot-meta { font-size: 6.5px; letter-spacing: 1.3px; }
          .lsmg-boot-title { font-size: clamp(58px, 20vw, 98px); margin-top: 32px; }
          .lsmg-boot-readout { justify-content: center; font-size: 6.5px; }
          .lsmg-boot-readout span:first-child { display: none; }
          .lsmg-hero-code-column { right: -16%; max-width: 66vw; opacity: .68; }
          .lsmg-hero-code-column--red { display: none; }
          .lsmg-digital-hero-rail { right: 12px; top: 12%; font-size: 6.5px; padding: 12px; gap: 8px; }
          .lsmg-digital-corner { right: 12px; bottom: 12px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lsmg-boot-code,
          .lsmg-boot-scan,
          .lsmg-boot-progress::after,
          .lsmg-hero-code-column,
          .lsmg-digital-hero-rail span { animation: none !important; }
        }
      `}</style>

      <div className={`lsmg-boot${phase === 'exit' ? ' lsmg-boot--exit' : ''}`} aria-hidden="true">
        <div className="lsmg-boot-code-zone">
          <div className="lsmg-boot-code left-1">{CODE_RAILS[0].repeat(34)}</div>
          <div className="lsmg-boot-code red left-2">{CODE_RAILS[2].repeat(34)}</div>
          <div className="lsmg-boot-code right-1">{CODE_RAILS[3].repeat(34)}</div>
          <div className="lsmg-boot-code red right-2">{CODE_RAILS[4].repeat(28)}</div>
          <div className="lsmg-boot-scan" />
        </div>

        <div className="lsmg-boot-center">
          <div className="lsmg-boot-shell">
            <div className="lsmg-boot-meta">
              <span>LSMG://CREATIVE_INFRASTRUCTURE</span>
              <span className="lsmg-boot-live">● SYSTEM ONLINE</span>
            </div>
            <div className="lsmg-boot-title">LAST SHOT<br /><span>MEDIA GROUP</span></div>
            <div className="lsmg-boot-sub">Media // Talent // PR // Booking // Culture</div>
            <div className="lsmg-boot-progress" />
            <div className="lsmg-boot-readout">
              <span>BUILD.26 // EST.2022</span>
              <span><strong>NETWORK ACTIVE</strong> // SIGNAL LOCKED</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function DigitalHeroCode() {
  const paleCode = `${CODE_RAILS[0]}\n${CODE_RAILS[3]}\n${CODE_RAILS[1]}\n`.repeat(18)
  const redCode = `${CODE_RAILS[2]}\n${CODE_RAILS[4]}\n`.repeat(18)

  return (
    <div className="lsmg-digital-hero-code" aria-hidden="true">
      <div className="lsmg-hero-code-column">{paleCode}</div>
      <div className="lsmg-hero-code-column lsmg-hero-code-column--red">{redCode}</div>
      <div className="lsmg-digital-hero-rail">
        {HERO_LINES.map((line, index) => (
          <span key={line} style={{ animationDelay: `${index * -0.55}s` }}>{line}</span>
        ))}
      </div>
      <div className="lsmg-digital-corner">
        SIGNAL_0001<br />
        LSMG.NODE.ACTIVE<br />
        BUILD_26 / 01:10:01
      </div>
    </div>
  )
}
