import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { title: 'Last Shot Media Group | Where Creativity Becomes Capital' },
      { name: 'description', content: 'Last Shot Media Group is an independent creative holding company spanning talent representation, public relations, booking, media production, communications, licensing and original content.' },
    ],
  }),
})

interface TickerItem { id:number; text:string; linkUrl:string|null; linkType:string; isActive:boolean }
const categories=['Models','Actors','Sports','Music','Media','Politicians']
const divisions=[
  ['01','Talent','Representation across models, actors, sports, music, media and politicians.','/models'],
  ['02','PR + Communications','Press campaigns, media relations, positioning, narrative strategy and reputation support.','/pr'],
  ['03','Booking','Appearances, performances, negotiations and opportunity development across markets.','/booking'],
  ['04','Studios','Scripted projects, podcasts, documentary, editorial and branded production.','/media'],
  ['05','Partnerships','Brand collaborations, sponsorship strategy, licensing and commercial opportunities.','/services'],
] as const

function LiveTicker(){
  const [items,setItems]=useState<TickerItem[]>([])
  useEffect(()=>{const load=()=>{fetch('/api/live-ticker').then(r=>r.json()).then(d=>setItems(d.items||[])).catch(()=>{})};load();const i=setInterval(load,30000);return()=>clearInterval(i)},[])
  if(!items.length)return null
  return <div className="v2-livebar"><div className="editorial-container v2-livebar-inner"><span className="v2-live-dot"/><span className="v2-live-label">LIVE / LSMG</span><div className="v2-live-items">{items.slice(0,4).map(item=>item.linkUrl?<a key={item.id} href={item.linkUrl} target={item.linkType==='external'||item.linkUrl.startsWith('http')?'_blank':undefined} rel={item.linkType==='external'||item.linkUrl.startsWith('http')?'noopener noreferrer':undefined}>{item.text}</a>:<span key={item.id}>{item.text}</span>)}</div></div></div>
}

function HomePage(){return <div className="v2-home">
  <LiveTicker/>
  <section className="v2-hero">
    <div className="v2-hero-copy">
      <div className="v2-hero-meta">EST. 2022 / DALLAS · ORLANDO · NEW YORK · ATLANTA</div>
      <h1><span>LAST</span><span className="v2-red">SHOT</span><span>MEDIA</span><span>GROUP</span></h1>
      <div className="v2-hero-bottom"><div><p className="v2-tagline">Where Creativity Becomes Capital.</p><p className="v2-core-copy">An independent creative holding company operating across PR, talent booking, media production, communications strategy, licensing and merchandise. We don&apos;t just tell your story — we build your legacy.</p></div><div className="v2-hero-actions"><Link to="/contact" className="v2-solid-btn">Work With Us ↗</Link><Link to="/about" className="v2-text-btn">Our Story →</Link></div></div>
    </div>
    <div className="v2-hero-art" aria-label="LSMG represented talent collage">
      <figure className="v2-photo v2-photo-a"><img src="/models/jada-1.jpg" alt="Jada, LSMG talent"/></figure>
      <figure className="v2-photo v2-photo-b"><img src="/models/halie-1.jpg" alt="Halie, LSMG talent"/></figure>
      <figure className="v2-photo v2-photo-c"><img src="/models/amora-1.jpg" alt="Amora, LSMG talent"/></figure>
      <div className="v2-hero-stamp">LSMG<br/>26</div><div className="v2-vertical-copy">REPRESENTATION / MEDIA / CULTURE / CAPITAL</div>
    </div>
  </section>
  <div className="v2-marquee" aria-hidden="true"><div className="v2-marquee-track">{[...categories,...categories].map((x,i)=><span key={`${x}-${i}`}>{x} / </span>)}</div></div>
  <section className="v2-manifesto"><div className="editorial-container v2-manifesto-grid"><div className="v2-section-index">01 / THE COMPANY</div><div><p className="v2-manifesto-lead">We built LSMG to make the parts of the creative industry that usually live in separate rooms work as one system.</p><div className="v2-manifesto-copy-grid"><p>Representation, press, booking, production and owned media connect here. Talent should not have to build five different teams just to move one career forward.</p><p>LSMG keeps the original independent structure, but presents it with the scale, confidence and clarity of a modern cultural company.</p></div></div></div></section>
  <section className="v2-talent-section"><div className="editorial-container"><div className="v2-section-head"><div className="v2-section-index">02 / REPRESENTATION</div><h2>TALENT<br/><span>IS THE CENTER.</span></h2></div><div className="v2-talent-grid">
    <a href="/models#models" className="v2-talent-card v2-talent-card-large"><img src="/models/halie-1.jpg" alt="LSMG Models"/><div><span>01</span><strong>MODELS</strong><em>View roster ↗</em></div></a>
    <a href="/models#actors" className="v2-talent-card v2-talent-card-dark"><div><span>02</span><strong>ACTORS</strong><em>Representation ↗</em></div></a>
    <a href="/models#sports" className="v2-talent-card v2-talent-card-red"><div><span>03</span><strong>SPORTS</strong><em>Representation ↗</em></div></a>
    <a href="/models#music" className="v2-talent-card v2-talent-card-dark"><div><span>04</span><strong>MUSIC</strong><em>Representation ↗</em></div></a>
    <a href="/models#media" className="v2-talent-card v2-talent-card-paper"><div><span>05</span><strong>MEDIA</strong><em>Creators + personalities ↗</em></div></a>
    <a href="/models#politicians" className="v2-talent-card v2-talent-card-dark"><div><span>06</span><strong>POLITICIANS</strong><em>Public-facing representation ↗</em></div></a>
  </div><div className="v2-ledgera-link"><span>LEDGERA MODELS ARE PRESENTED SEPARATELY FROM LSMG REPRESENTATION.</span><a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer">Explore LEDGERA Models ↗</a></div></div></section>
  <section className="v2-divisions"><div className="editorial-container"><div className="v2-section-head v2-section-head-light"><div className="v2-section-index">03 / THE SYSTEM</div><h2>ONE COMPANY.<br/><span>MULTIPLE ENGINES.</span></h2></div><div className="v2-division-list">{divisions.map(([n,t,c,h])=><a href={h} className="v2-division-row" key={n}><span className="v2-division-num">{n}</span><strong>{t}</strong><p>{c}</p><span className="v2-arrow">↗</span></a>)}</div></div></section>
  <section className="v2-culture-split"><div className="v2-studios-panel"><div className="v2-section-index">04 / PRODUCTION</div><h2>LSMG<br/>STUDIOS</h2><p>Original scripted content, podcasts, documentaries, editorial production and brand storytelling.</p><Link to="/media" className="v2-outline-btn">Enter Studios ↗</Link></div><div className="v2-ledgera-panel"><div className="v2-section-index">05 / OWNED MEDIA</div><h2>LEDGERA</h2><p>Independent editorial publishing, culture features, interviews, covers and the magazine&apos;s own model community.</p><a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer" className="v2-outline-btn v2-outline-dark">Visit LEDGERA ↗</a></div></section>
  <section className="v2-final-cta"><div className="editorial-container v2-final-grid"><div className="v2-section-index">06 / CONTACT</div><div><h2>MAKE THE<br/><span>NEXT MOVE.</span></h2><p>Representation. Press. Partnerships. Booking. Production. Licensing. Communications.</p><div className="v2-final-actions"><Link to="/contact" className="v2-solid-btn">Start a Conversation ↗</Link><Link to="/internships" className="v2-text-btn">College Internships →</Link></div></div></div></section>
</div>}
