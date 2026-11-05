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
const categories=['Models','Actors','Sports','Music','Media','Public Figures']
const divisions=[
  ['01','Talent','Talent is the starting point: representation, relationships, opportunity sourcing and career infrastructure.','/models'],
  ['02','Narrative','PR and communications turn creative work into positioning, press and a public-facing story.','/pr'],
  ['03','Production','Studios turn ideas into film, photography, podcasts, documentaries and branded work.','/media'],
  ['04','Owned Media','LEDGERA and LSMG media properties publish, document and extend the work.','https://ledgeramagazine.com/'],
  ['05','Partnerships','Commercial partners, licensing and activations connect the creative ecosystem to capital.','https://activation.thelsmg.com/'],
] as const

function LiveTicker(){
  const [items,setItems]=useState<TickerItem[]>([])
  useEffect(()=>{const load=()=>{fetch('/api/live-ticker').then(r=>r.json()).then(d=>setItems(d.items||[])).catch(()=>{})};load();const i=setInterval(load,30000);return()=>clearInterval(i)},[])
  if(!items.length)return null
  return <div className="v2-livebar"><div className="editorial-container v2-livebar-inner"><span className="v2-live-dot"/><span className="v2-live-label">LIVE / LSMG</span><div className="v2-live-items">{items.slice(0,4).map(item=>item.linkUrl?<a key={item.id} href={item.linkUrl} target={item.linkType==='external'||item.linkUrl.startsWith('http')?'_blank':undefined} rel={item.linkType==='external'||item.linkUrl.startsWith('http')?'noopener noreferrer':undefined}>{item.text}</a>:<span key={item.id}>{item.text}</span>)}</div></div></div>
}


const homePortfolio = [
  {label:'Film & Festivals',name:'Mohamed Taher / 32B',role:'Filmmaker interview and film coverage · LEDGERA',href:'https://ledgeramagazine.com/interviews/32b-mohamed-taher',art:'',status:'Published interview'},
  {label:'Fashion',name:'Runway 7 / NYFW',role:'37-page special edition · LEDGERA',href:'https://ledgeramagazine.com/magazine/runway-7-nyfw/',art:'https://ledgeramagazine.com/assets/issues/runway-7/page-01.webp',status:'Published special'},
  {label:'Wrestling',name:'M By Elegance',role:'TNA Wrestling interview and Issue 05 cover · LEDGERA',href:'https://ledgeramagazine.com/magazine/issue-05/',art:'https://ledgeramagazine.com/assets/issues/issue-05/page-01.webp',status:'Published feature'}
] as const
const homeEcosystem = [
  {label:'The LSMG Culture Hub',eyebrow:'MEDIA HUB',description:'The latest LSMG episodes, editions, Case Files, festival coverage and cultural stories.',href:'https://media.thelsmg.com/',action:'Explore the Culture Hub'},
  {label:'Brand Activations',eyebrow:'COMMERCIAL PARTNERSHIPS',description:'Custom campaigns, sponsorships, advertising, cultural experiences and coordinated placements.',href:'https://activation.thelsmg.com/',action:'Build a Brand Partnership'},
  {label:'The Last Shot Podcast',eyebrow:'AN ORIGINAL LSMG SHOW',description:'Long-form conversations, full episodes, video and clips with artists, filmmakers and talent.',href:'https://lastshotpodcast.net/',action:'Watch & Listen'},
  {label:'LEDGERA',eyebrow:'AN LSMG PUBLICATION',description:'The Record of Culture. Editorial issues, interviews, fashion and creative storytelling.',href:'https://ledgeramagazine.com/',action:'Read LEDGERA'},
  {label:'LSMG Studios',eyebrow:'PRODUCTION DIVISION',description:'Original projects, film, photography, video, documentary and podcast production.',href:'/media',action:'Explore Studios'}
] as const
function HomePage(){return <div className="v2-home">
  <LiveTicker/>
  <section className="v2-hero">
    <div className="v2-hero-copy">
      <div className="v2-hero-meta">LSMG HOLDINGS / INDEPENDENT CREATIVE COMPANY</div>
      <h1><span>LAST</span><span className="v2-red">SHOT</span><span>MEDIA</span><span>GROUP</span></h1>
      <div className="v2-hero-bottom"><div><p className="v2-tagline">Where Creativity Becomes Capital.</p><p className="v2-core-copy">Last Shot Media Group Holdings LLC is the independent parent company for our talent, production and owned-media properties. Our team also provides direct PR, talent booking, media production, communications strategy, licensing and merchandise services. We don&apos;t just tell your story — we build your legacy.</p></div><div className="v2-hero-actions"><Link to="/contact" className="v2-solid-btn">Work With Us ↗</Link><Link to="/models" className="v2-text-btn">Explore Talent →</Link><Link to="/about" className="v2-text-btn">Our Story →</Link></div></div>
    </div>
    <div className="v2-hero-art" aria-label="LSMG represented talent collage">
      <figure className="v2-photo v2-photo-a"><img src="/models/jada-1.jpg" alt="Jada, LSMG talent"/></figure>
      <figure className="v2-photo v2-photo-b"><img src="/models/halie-1.jpg" alt="Halie, LSMG talent"/></figure>
      <figure className="v2-photo v2-photo-c"><img src="/models/nani-1.jpg" alt="Nani, LSMG model"/></figure>
      <div className="v2-hero-stamp">LSMG<br/>26</div><div className="v2-vertical-copy">REPRESENTATION / MEDIA / CULTURE / CAPITAL</div>
    </div>
  </section>
  <div className="v2-marquee" aria-hidden="true"><div className="v2-marquee-track">{[...categories,...categories].map((x,i)=><span key={`${x}-${i}`}>{x} / </span>)}</div></div>
  <section className="v2-manifesto"><div className="editorial-container v2-manifesto-grid"><div className="v2-section-index">01 / THE COMPANY</div><div><p className="v2-manifesto-lead">Last Shot Media Group is an independent, Black-owned creative holding company founded in 2020 by Morehouse men Zachary Heneden and Julien Serrano-O’Neil.</p><div className="v2-manifesto-copy-grid"><p>LSMG connects talent, public relations, production, editorial publishing and brand partnerships through one creative ecosystem.</p><p>Our current legal entity was formed separately from that founding history. The parent company remains the center of the system, while each property keeps its own identity, audience and destination.</p></div></div></div></section>

  <section className="v2-reach"><div className="editorial-container"><div className="v2-section-head"><div className="v2-section-index">06 / AUDIENCE &amp; REACH</div><h2>THE ECOSYSTEM<br/><span>HAS REACH.</span></h2></div><div className="v2-reach-grid"><article><strong>983.3K+</strong><span>Organic social &amp; video views</span></article><article><strong>455.5K+</strong><span>Meta reach</span></article><article><strong>30K+</strong><span>Combined followers &amp; subscribers</span></article><article><strong>70+</strong><span>Countries reached</span></article></div><p className="v2-reach-note">Figures provided by LSMG analytics, updated October 2026. Cumulative ecosystem totals across platforms; not unique audience counts or guaranteed campaign results.</p><a href="https://activation.thelsmg.com/" target="_blank" rel="noopener noreferrer" className="v2-outline-btn">View Audience &amp; Partnership Details ↗</a></div></section>
  <section className="v2-talent-section"><div className="editorial-container"><div className="v2-section-head"><div className="v2-section-index">02 / REPRESENTATION</div><h2>TALENT<br/><span>IS THE CENTER.</span></h2></div><div className="v2-talent-grid">
    <a href="/models#models" className="v2-talent-card v2-talent-card-large"><img src="/models/halie-1.jpg" alt="LSMG Models"/><div><span>01</span><strong>MODELS</strong><em>View roster ↗</em></div></a>
    <a href="/models#actors" className="v2-talent-card v2-talent-card-dark"><div><span>02</span><strong>ACTORS</strong><em>Representation ↗</em></div></a>
    <a href="/models#sports" className="v2-talent-card v2-talent-card-red"><img src="/models/paula-ramos/paula-ramos-01.jpg" alt="Paula Ramos, LSMG sports and fitness talent" loading="lazy" /><div><span>03</span><strong>SPORTS</strong><em>Representation ↗</em></div></a>
    <a href="/models#music" className="v2-talent-card v2-talent-card-dark"><img src="/models/wovie/wovie-01.jpg" alt="LSMG music artist Wovie" loading="lazy" /><div><span>04</span><strong>MUSIC</strong><em>Representation ↗</em></div></a>
    <a href="/models#media" className="v2-talent-card v2-talent-card-paper"><img src="/team/ashley.jpg" alt="Ashley Diaz, LSMG team member; media category illustration" loading="lazy" /><div><span>05</span><strong>MEDIA</strong><em>Creators + personalities ↗</em></div></a>
    <a href="/models#public-figures" className="v2-talent-card v2-talent-card-dark"><img src="https://images.squarespace-cdn.com/content/v1/536e3872e4b02cbd6b6e124c/82cb18b8-a019-4534-a006-323bfa5de1e9/Sandra%2BFatmi-Hall%2C%2BHeadshot.png" alt="Sandra Fatmi-Hall, public figure and speaker" loading="lazy" /><div><span>06</span><strong>PUBLIC FIGURES</strong><em>Public-facing representation ↗</em></div></a>
  </div><div className="v2-ledgera-link"><span>LEDGERA MODELS ARE PRESENTED SEPARATELY FROM LSMG REPRESENTATION.</span><a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer">Explore LEDGERA Models ↗</a></div></div></section>
  <section className="v2-divisions"><div className="editorial-container"><div className="v2-section-head v2-section-head-light"><div className="v2-section-index">03 / HOW WE WORK</div><h2>CONNECTED<br/><span>BY DESIGN.</span></h2></div><div className="v2-division-list">{divisions.map(([n,t,c,h])=><a href={h} className="v2-division-row" key={n}><span className="v2-division-num">{n}</span><strong>{t}</strong><p>{c}</p><span className="v2-arrow">↗</span></a>)}</div></div></section>

  <section className="v2-new-work" id="selected-work"><div className="editorial-container">
    <div className="v2-section-head"><div className="v2-section-index">04 / SELECTED WORK</div><h2>IN THE ROOM.<br/><span>ON THE RECORD.</span></h2></div>
    <p className="v2-new-copy">Selected documented interviews and publications. Editorial coverage does not imply a client, sponsorship or representation relationship.</p>
    <div className="v2-new-work-grid">{homePortfolio.map(item=><a key={item.name} href={item.href} className="v2-new-work-card" target="_blank" rel="noopener noreferrer">
      {item.art&&<div className="v2-new-work-art"><img src={item.art} alt={item.name+' publication cover'} loading="lazy" /></div>}
      <div className="v2-new-work-content"><small>{item.label} / {item.status}</small><strong>{item.name}</strong><p>{item.role}</p><span>Explore Published Work ↗</span></div>
    </a>)}</div>
    <a href="/work" className="v2-outline-btn v2-more-work">See All Work & Coverage History ↗</a>
  </div></section>
  <section className="v2-new-services"><div className="editorial-container">
    <div className="v2-section-head"><div className="v2-section-index">05 / OUR SERVICES</div><h2>THE WORK<br/><span>WE DO.</span></h2></div>
    <div className="v2-new-services-list">
      {[
        ['PR & Communications','Media campaigns, messaging, editorial outreach and reputation strategy.','/pr'],
        ['Talent Booking & Management','Appearances, representation, career strategy and partnerships.','/booking'],
        ['Photography & Production','Editorial shoots, events, video, documentary and branded content.','/media'],
        ['Partnerships & Licensing','Commercial collaboration, sponsorships, activation and intellectual property.','https://activation.thelsmg.com/']
      ].map(([name,copy,href],i)=><a key={name} href={href} className="v2-new-service-row" target={href.startsWith('http')?'_blank':undefined} rel={href.startsWith('http')?'noopener noreferrer':undefined}>
        <small>0{i+1}</small><strong>{name}</strong><p>{copy}</p><span aria-hidden="true">↗</span>
      </a>)}
    </div>
    <a href="/services" className="v2-outline-btn v2-more-work">See All Services ↗</a>
  </div></section>
  <section className="v2-new-ecosystem" id="ecosystem"><div className="editorial-container">
    <div className="v2-section-head"><div className="v2-section-index">07 / LSMG ECOSYSTEM</div><h2>ONE PARENT.<br/><span>FIVE PATHWAYS.</span></h2></div>
    <p className="v2-new-copy">Last Shot Media Group Holdings is the parent company. Each property keeps its distinct identity while contributing to our connected creative ecosystem.</p>
    <div className="v2-new-ecosystem-grid">{homeEcosystem.map(item=><a className="v2-new-eco-card" key={item.label} href={item.href} target={item.href.startsWith('http')?'_blank':undefined} rel={item.href.startsWith('http')?'noopener noreferrer':undefined}>
      <small>{item.eyebrow}</small><strong>{item.label}</strong><p>{item.description}</p><span>{item.action} ↗</span>
    </a>)}</div>
  </div></section>
  <section className="v2-culture-split"><div className="v2-studios-panel"><div className="v2-section-index">08 / PRODUCTION</div><h2>LSMG<br/>STUDIOS</h2><p>Original scripted content, podcasts, documentaries, editorial production and brand storytelling.</p><Link to="/media" className="v2-outline-btn">Enter Studios ↗</Link></div><div className="v2-ledgera-panel"><div className="v2-section-index">09 / OWNED MEDIA</div><h2><span>LEDGERA</span></h2><p>Independent editorial publishing, culture features, interviews, covers and the magazine&apos;s own model community.</p><a href="https://ledgeramagazine.com" target="_blank" rel="noopener noreferrer" className="v2-outline-btn v2-outline-dark">Visit LEDGERA ↗</a></div></section>
  <section className="v2-final-cta"><div className="editorial-container v2-final-grid"><div className="v2-section-index">10 / CONTACT</div><div><h2>MAKE THE<br/><span>NEXT MOVE.</span></h2><p>Representation. Press. Partnerships. Booking. Production. Licensing. Communications.</p><div className="v2-final-actions"><Link to="/contact" className="v2-solid-btn">Start a Conversation ↗</Link><Link to="/internships" className="v2-text-btn">College Internships →</Link></div></div></div></section>
</div>}
