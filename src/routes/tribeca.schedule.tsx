import { createFileRoute, Link } from '@tanstack/react-router'
import { TribecaNav } from './tribeca.index'

export const Route = createFileRoute('/tribeca/schedule')({
  head: () => ({
    meta: [
      {
        title: 'Daily Schedule | Tribeca 2026 | The LSMG Ledger',
      },
      {
        name: 'description',
        content:
          "The LSMG Ledger's day-by-day Tribeca 2026 coverage schedule — screenings, premieres, red carpets, interviews, and events across June 3–14 in New York City.",
      },
    ],
  }),
  component: TribecaSchedule,
})

interface ScheduleItem {
  time: string
  film: string
  venue: string
}

interface ScheduleDay {
  date: string
  weekday: string
  count: string
  items: ScheduleItem[]
}

const scheduleData: ScheduleDay[] = [
  {
    date: 'May 26–29',
    weekday: 'Pre-Festival Screenings',
    count: 'Tribeca Film Center — 375 Greenwich St — RSVP Required',
    items: [
      { time: 'Pre-Fest', film: 'Advance P&I Screenings — Tribeca Film Center', venue: 'RSVP to eward@tribecafilm.com' },
    ],
  },
  {
    date: 'Jun 1–2',
    weekday: 'Arrival + Credential Pickup',
    count: 'Spring Studios — 50 Varick St',
    items: [
      { time: 'Jun 1 12pm', film: 'Team Arrives NYC — Credential Pickup Opens', venue: 'Spring Studios, 1st Floor' },
      { time: 'Jun 2 4pm', film: 'GAIL DAUGHTRY AND THE CELEBRITY SEX PASS — Advance Screening', venue: 'Sony Screening Room, 25 Madison Ave — Zachary + Ashley' },
      { time: 'Jun 2 6pm', film: 'Welcome Happy Hour — Press + Tribeca Comms', venue: 'Spring Studios — Full Team' },
    ],
  },
  {
    date: '3',
    weekday: 'Wednesday — Festival Opens',
    count: 'Opening Day',
    items: [
      { time: 'All Day', film: 'Festival Opens — Team Orientation + Press Badge Pickup', venue: 'Spring Studios' },
    ],
  },
  {
    date: '4',
    weekday: 'Thursday',
    count: '5 events',
    items: [
      { time: '2:00 PM', film: 'RECLUSE — In-Person Press Day', venue: 'Zachary — Interview: Henry Chaisson' },
      { time: '7:15 PM', film: 'TURN IT UP! — Photo Call', venue: 'AMC 19th St East 6 — Lailah + Photographer' },
      { time: '8:30 PM', film: 'TURN IT UP! — World Premiere', venue: 'AMC 19th St East 6' },
      { time: '9:15 PM', film: 'RECLUSE — World Premiere', venue: 'Village East — Lailah Assignment' },
      { time: '7:00 PM', film: '25th Anniversary Outdoor — The Last Play at Shea', venue: 'Hudson Yards — Free, Public' },
    ],
  },
  {
    date: '5',
    weekday: 'Friday — Biggest Day',
    count: '6+ events',
    items: [
      { time: '6:15 PM', film: 'AIRPORT BLVD — World Premiere', venue: 'Village East, Theater 6 — Zachary' },
      { time: 'All Day', film: 'THE LORRAINE (Sam Pollard) — World Premiere', venue: 'TBD — Zachary' },
      { time: 'All Day', film: 'SARA BAREILLES: GOOD GRIEF — Gala Premiere', venue: 'TBD — Coverage TBD' },
      { time: 'All Day', film: 'LUCY SCHULMAN — World Premiere', venue: 'TBD — Coverage TBD' },
      { time: '8:45 PM', film: 'MOTHER FUTURE SELF — World Premiere', venue: 'Village East 3 — Team Member TBD' },
      { time: 'Evening', film: 'MADONNA: CONFESSIONS II — World Premiere', venue: 'Beacon Theatre — Press Access Pending' },
      { time: '5:30 PM', film: 'THE A WORD: THE FUTURE OF AGING — World Premiere', venue: 'Village East' },
    ],
  },
  {
    date: '6',
    weekday: 'Saturday',
    count: '3 events',
    items: [
      { time: '5:00 PM', film: 'PLAYING POTUS — World Premiere', venue: 'Spring Studios — Zachary — Will Ferrell, Dana Carvey, Maya Rudolph' },
      { time: '8:45 PM', film: 'AIRPORT BLVD — Screening 2', venue: 'AMC 19th St East 6, Theater 3' },
      { time: 'All Day', film: 'HARVEST — World Premiere', venue: 'TBD — Priority Coverage' },
      { time: '7:00 PM', film: '25th Outdoor — Best of Tribeca Shorts', venue: 'Hudson Yards — Free' },
    ],
  },
  {
    date: '7',
    weekday: 'Sunday',
    count: '3 events',
    items: [
      { time: '11am–2pm', film: 'CROOKS — Virtual Press Day', venue: 'Zoom — Zachary — Mickey Keating, Angela Trimbur, Melora Walters' },
      { time: '6:15 PM', film: 'CROOKS — World Premiere Red Carpet', venue: 'Village East — Zachary + Amora' },
      { time: 'All Day', film: 'HOLLYWOOD DOES ABORTION — World Premiere', venue: 'Spotlight Documentary — Rachel Bloom EP' },
      { time: '7:00 PM', film: '25th Outdoor — Jiro Dreams of Sushi + Q&A with David Gelb', venue: 'Hudson Yards — Free' },
    ],
  },
  {
    date: '9',
    weekday: 'Tuesday',
    count: '2 events',
    items: [
      { time: '5:00 PM', film: 'MEXICANAMERICAN — World Premiere', venue: 'Village East by Angelika — Zachary — Top Priority' },
      { time: '8:30 PM', film: 'UNIDENTIFIED (Haifaa Al Mansour) — U.S. Premiere', venue: 'AMC — Sony Classics' },
    ],
  },
  {
    date: '10',
    weekday: 'Wednesday',
    count: '5 events',
    items: [
      { time: '3:30 PM', film: 'CHRIS & MARTINA — Red Carpet Check-In', venue: 'SVA Theater — Ashley Diaz — Carpet opens 4:15 PM' },
      { time: '6:00 PM', film: 'MEXICANAMERICAN — Screening 2', venue: 'Village East' },
      { time: '9:15 PM', film: 'AIRPORT BLVD — Screening 3', venue: 'AMC 19th St East 6' },
      { time: 'P&I', film: 'HADESTOWN: THE MUSICAL — P&I (First-come, first-served)', venue: 'AMC — Arrive Early' },
      { time: '7:00 PM', film: '25th Outdoor — Virunga', venue: 'Hudson Yards — Free' },
    ],
  },
  {
    date: '11',
    weekday: 'Thursday — Awards Night',
    count: 'MOST IMPORTANT DAY — Full Team',
    items: [
      { time: '4:00 PM', film: 'Tribeca Festival Awards Ceremony', venue: 'Spring Studios — Full Team' },
      { time: 'All Day', film: 'THE TROPIC SUN AND HIS EYES — Screening', venue: 'TBD — Zachary Priority' },
      { time: '7:00 PM', film: '25th Outdoor — Little Woods + Nia DaCosta Q&A', venue: 'Hudson Yards — Lailah Assignment' },
      { time: '8:00 PM', film: 'De Niro + Rosenthal 25th Anniversary Conversation', venue: 'OKX Theater, BMCC TPAC — Matt Tyrnauer moderates — Full Team' },
    ],
  },
  {
    date: '12',
    weekday: 'Friday',
    count: '3 events',
    items: [
      { time: '5:30 PM', film: 'HOUSE OF CRITICISM — World Premiere', venue: 'TBD — Roberta Smith, Jerry Saltz, Cindy Sherman' },
      { time: 'All Day', film: "WHIPPLE'S WORLD — World Premiere", venue: 'Confirmed attendance' },
      { time: 'Theatrical', film: 'BY HOOK OR BY CROOK — 4K Restoration Opening', venue: 'Theaters — Lailah Interview with Harry Dodge + Silas Howard' },
    ],
  },
  {
    date: '13',
    weekday: 'Saturday',
    count: '4 events',
    items: [
      { time: '2:00 PM', film: 'YOUNG WASHINGTON — World Premiere', venue: 'SVA Theatre — William Franklyn-Miller, Jon Erwin' },
      { time: 'All Day', film: 'Tribeca Games Gallery — Developer Demos', venue: 'Pier 57 — LSMG Team' },
      { time: '3:00 PM', film: 'LUMINARIES: Dan Houser / Absurd Ventures — Storytelling Summit', venue: 'TBD' },
      { time: '8:00 PM', film: 'TRAVIS BARKER: LOUDER THAN FEAR — World Premiere', venue: 'Spring Studios — Hulu' },
    ],
  },
  {
    date: '14',
    weekday: 'Sunday — Final Day',
    count: '2 events',
    items: [
      { time: '6:00 PM', film: 'MEXICANAMERICAN — Final Screening', venue: 'Village East by Angelika — Last chance' },
      { time: 'All Day', film: 'THE TROPIC SUN AND HIS EYES — Final Screening', venue: 'TBD — Zachary Priority' },
      { time: '7:00 PM', film: '25th Outdoor Final — Ascension', venue: 'Hudson Yards — Free' },
    ],
  },
]

function TribecaSchedule() {
  return (
    <div className="tribeca-page">
      <div className="tc-topbar">
        <div className="tc-topbar-inner">
          <div className="tc-topbar-left">
            <span>The LSMG Ledger</span>
            <span className="tc-dot">&#9679;</span>
            <span>Tribeca 2026 Schedule</span>
            <span className="tc-dot">&#9679;</span>
            <span>June 3–14, New York City</span>
          </div>
          <div>25th Annual Tribeca Festival</div>
        </div>
      </div>

      <header className="tc-masthead">
        <div className="tc-masthead-inner">
          <div className="tc-masthead-meta">
            <div>Coverage Schedule</div>
            <div>Tribeca 2026</div>
          </div>
          <div>
            <h1 className="tc-masthead-title">
              The LSMG
              <br />
              <em>Ledger</em>
            </h1>
          </div>
          <div className="tc-masthead-meta tc-right">
            <div>lastshotmediagroup.com</div>
          </div>
        </div>
        <div className="tc-masthead-divider">
          <hr />
          <span>Tribeca Festival 2026 — Day-by-Day Coverage Plan</span>
          <hr />
          <hr />
        </div>
      </header>

      <TribecaNav current="schedule" />

      <section className="tc-lead">
        <div className="tc-lead-tag">
          &#9679; LSMG Team of 5 — On the Ground June 1–14 &#9679;
        </div>
        <h2 className="tc-lead-headline">
          The <em>Schedule</em>
        </h2>
        <p className="tc-lead-deck">
          Five credentialed team members across twelve days. Every priority
          screening, red carpet, press day, and interview mapped to who's
          covering it.
        </p>
      </section>

      <div className="tc-section">
        {scheduleData.map((day, di) => (
          <div key={di} className="tc-schedule-day">
            <div className="tc-schedule-day-header">
              <span className="tc-schedule-date">{day.date}</span>
              <span className="tc-schedule-weekday">{day.weekday}</span>
              <span className="tc-schedule-count">{day.count}</span>
            </div>
            {day.items.map((item, ii) => (
              <div key={ii} className="tc-schedule-item">
                <div className="tc-schedule-time">{item.time}</div>
                <div className="tc-schedule-film">{item.film}</div>
                <div className="tc-schedule-venue">{item.venue}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <footer className="tc-footer">
        <div className="tc-footer-inner">
          <div className="tc-footer-top">
            <div className="tc-footer-brand">
              <h2>
                The LSMG <em>Ledger</em>
              </h2>
              <p>
                Independent press. Dallas-based, internationally credentialed.
                Five team members on the ground at Tribeca 2026.
              </p>
            </div>
            <div className="tc-footer-col">
              <h4>Tribeca 2026</h4>
              <Link to="/tribeca">All Coverage</Link>
              <Link to="/tribeca/schedule">Daily Schedule</Link>
              <Link to="/tribeca/films/$filmSlug" params={{ filmSlug: 'mexicanamerican' }}>
                MEXICANAMERICAN
              </Link>
            </div>
            <div className="tc-footer-col">
              <h4>Last Shot Media Group</h4>
              <Link to="/">Website</Link>
              <a
                href="https://podcasts.apple.com/us/podcast/the-last-shot-podcast/id1494831568"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Podcasts
              </a>
              <a
                href="https://www.instagram.com/lastshotmediagroup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="tc-footer-bottom">
            <span>
              &copy; 2026 Last Shot Media Group Holdings. The LSMG Ledger.
            </span>
            <span>Tribeca Festival 2026 — Official Credentialed Press</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
