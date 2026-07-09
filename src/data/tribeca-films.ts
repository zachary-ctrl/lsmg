export interface TribecaFilmDetail {
  slug: string
  title: string
  section: string
  director: string
  deck: string
  credits: string
  reviewStatus: 'under-review' | 'coverage-coming'
  byline: Array<{ label: string; value: string }>
  meta: Array<{ label: string; value: string }>
  body: string
  tags: string[]
  gradient: string
}

export interface TribecaFilmCard {
  slug?: string
  tag: string
  title: string
  credits: string
  blurb: string
  dates: string
  /** Official still/poster from the Tribeca Festival film directory. */
  poster?: string
  /** Canonical Tribeca Festival listing for the film. */
  tribecaUrl?: string
  /** Matching Last Shot Podcast episode, when one exists. */
  spotify?: { episodeId: string; title: string }
}

export const featuredFilms: Array<{
  slug: string
  num: string
  sectionLabel: string
  director: string
  title: string
  deck: string
  tags: Array<{ label: string; variant?: 'red' }>
  screenings: Array<{ date: string; details: string }>
  gradient: string
  poster?: string
  tribecaUrl?: string
  spotify?: { episodeId: string; title: string }
}> = [
  {
    slug: 'mexicanamerican',
    num: '01',
    sectionLabel: 'Documentary Competition',
    director: 'Directed by Eddie Sánchez · Documentary Competition · World Premiere',
    title: 'MEXICANAMERICAN',
    deck: "Using VHS home movies his family once sent across the border, filmmaker Eddie Sánchez traces his parents’ journey from Mexico to the United States — a decade-spanning portrait of migration, sacrifice, and what the American Dream actually costs.",
    tags: [
      { label: 'Priority', variant: 'red' },
      { label: 'Documentary' },
      { label: 'Immigration' },
      { label: 'Family' },
    ],
    screenings: [
      { date: 'Jun 9', details: '5:00 PM — Village East (World Premiere)' },
      { date: 'Jun 10', details: '6:00 PM — Village East' },
      { date: 'Jun 14', details: '6:00 PM — Village East' },
    ],
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #3d1a00 50%, #0a0a1a 100%)',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6890/medium_Mexicanamerican-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/mexicanamerican-2026',
  },
  {
    slug: 'airport-blvd',
    num: '02',
    sectionLabel: 'U.S. Narrative Competition',
    director: 'Directed by Alejandro Hendricks · U.S. Narrative Competition · World Premiere',
    title: 'AIRPORT BLVD',
    deck: "Shot in luminous black-and-white with an original jazz score, this soulful debut follows Xavier as he watches his East Austin community, friendships, and sense of home disappear around him. A love letter to a city — old and new — centered on Black creative lives.",
    tags: [
      { label: 'Priority', variant: 'red' },
      { label: 'Black Cinema' },
      { label: 'Austin' },
      { label: 'Jazz' },
      { label: 'Gentrification' },
    ],
    screenings: [
      { date: 'Jun 5', details: '6:15 PM — Village East (World Premiere)' },
      { date: 'Jun 6', details: '8:45 PM — AMC 19th St' },
      { date: 'Jun 10', details: '9:15 PM — AMC 19th St' },
    ],
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0d0d0d 100%)',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6960/medium_AIRPORT_BLVD-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/airport-blvd-2026',
    spotify: { episodeId: '0fLvevcT5zcXjWY0SpoAnW', title: 'Tribeca 2026: Airport BLVD — An Interview with Alejandro Hendricks' },
  },
  {
    slug: 'the-lorraine',
    num: '03',
    sectionLabel: 'World Premiere — June 5',
    director: 'Directed by Sam Pollard · 42West · World Premiere June 5',
    title: 'THE LORRAINE',
    deck: "Sam Pollard — the director of MLK/FBI and Mr. Soul! — turns his lens on the Black-owned Memphis motel that became the site of Dr. Martin Luther King Jr.'s assassination. Before that moment, it was a beacon. This film is about what came before.",
    tags: [
      { label: 'Priority', variant: 'red' },
      { label: 'History' },
      { label: 'Civil Rights' },
      { label: 'Sam Pollard' },
    ],
    screenings: [
      { date: 'Jun 5', details: 'World Premiere — Village East' },
    ],
    gradient: 'linear-gradient(135deg, #1a0505 0%, #2d0808 40%, #0a0a00 100%)',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6977/medium_TheLorraine-CLEAN-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/lorraine-2026',
  },
  {
    slug: 'they-fight',
    num: '04',
    sectionLabel: 'World Premiere + Red Carpet',
    director: 'Director: Sheldon Candis · Andscape · Stars: André Holland, Wendell Pierce, Samira Wiley',
    title: 'THEY FIGHT',
    deck: "Andscape’s new film directed by Sheldon Candis brings together André Holland, Wendell Pierce, and Samira Wiley. The red carpet will be among the most significant of the festival for Black press. LEDGERA is on it.",
    tags: [
      { label: 'Red Carpet', variant: 'red' },
      { label: 'Andscape' },
      { label: 'Sheldon Candis' },
    ],
    screenings: [
      { date: 'World Premiere', details: '+ Red Carpet — Tribeca 2026' },
    ],
    gradient: 'linear-gradient(135deg, #000a1a 0%, #001a2d 50%, #0a0510 100%)',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/7042/medium_They_Fight-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/they-fight-2026',
  },
]

export const secondaryFilms: TribecaFilmCard[] = [
  {
    slug: 'harvest',
    tag: 'Documentary Competition — World Premiere',
    title: 'HARVEST',
    credits: 'Natalie Baszile & Hyacinth Parker · EP: Dawn Porter',
    blurb: "Mother-daughter directing team follows the Nelson brothers as they race to become America's largest Black farmers — and face two straight years of poor harvests. Executive produced by Dawn Porter.",
    dates: 'Jun 6 World Premiere',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/7011/medium_Harvest-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/harvest-2026',
  },
  {
    slug: 'tropic-sun',
    tag: 'International Narrative Competition — Priority',
    title: 'THE TROPIC SUN AND HIS EYES',
    credits: 'Elisee Junior St Preux · Producer: Naturi Naughton-Lewis',
    blurb: "The first narrative feature about mental health filmed entirely on land in Haiti. A poetic debut funded in part by Morehouse College’s Black Men’s Research Institute.",
    dates: 'Jun 11 · Jun 14',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6934/medium_The_Tropic_Sun_and_His_Eyes-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/the-tropic-sun-and-his-eyes-2026',
  },
  {
    tag: 'Spotlight Narrative — Sony Classics',
    title: 'UNIDENTIFIED',
    credits: 'Dir: Haifaa Al Mansour (Wadjda, Mary Shelley)',
    blurb: 'Saudi Arabian murder mystery from the director of Wadjda. Sony Pictures Classics theatrical June 19.',
    dates: 'Jun 9 U.S. Premiere',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/7002/medium_Unidentified-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/unidentified-2026',
  },
  {
    tag: 'U.S. Narrative Competition — World Premiere',
    title: 'MOTHER FUTURE SELF',
    credits: 'Dir: Tori Lancaster · Stars: Imani Jade Powers, Betsey Brown',
    blurb: 'A debut feature about female friendship — where it begins, what tests it, and who you become because of it.',
    dates: 'Jun 5 8:45 PM World Premiere',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6887/medium_Mother_Future_Self-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/mother-future-self-2026',
  },
  {
    tag: 'World Premiere — June 5 Beacon Theatre',
    title: 'MADONNA: CONFESSIONS II',
    credits: 'Dirs: David Toro & Solomon Chase (TORSO)',
    blurb: "Madonna premieres a cinematic experience built around the first six tracks of her new album. Conversation with Jimmy Fallon follows. Biggest night of the festival.",
    dates: 'Jun 5 Beacon Theatre',
  },
  {
    tag: 'Spotlight Documentary — World Premiere June 7',
    title: 'HOLLYWOOD DOES ABORTION',
    credits: 'Dir: Angela Tucker · EP: Rachel Bloom, Ruth Ann Harnisch',
    blurb: 'A Tribeca Spotlight documentary examining how Hollywood depicts reproductive rights — executive produced by Rachel Bloom.',
    dates: 'Jun 7 World Premiere',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6910/medium_HollywoodDoesAbortion-1_clean_16x9.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/hollywood-does-abortion-2026',
  },
  {
    tag: 'Hulu — World Premiere June 13',
    title: 'TRAVIS BARKER: LOUDER THAN FEAR',
    credits: 'Dirs: Justin Krook & Michael Dwyer · Hulu',
    blurb: 'Hulu documentary about the Blink-182 drummer. World premiere June 13 at Spring Studios. Streams August 13.',
    dates: 'Jun 13 8:00 PM Spring Studios',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/7279/medium_DANIELROJAS_16X9.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/travis-barker-louder-than-fear-2026',
  },
  {
    tag: 'Gala — World Premiere June 5',
    title: 'SARA BAREILLES: GOOD GRIEF',
    credits: 'Music Documentary · 42West',
    blurb: 'After years away, Sara Bareilles returns to the studio. An intimate music documentary about grief, absence, and what makes her most honest album yet.',
    dates: 'Jun 5 Gala Premiere',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6931/medium_Sarah_Bareilles_-_Good_Grief-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/sara-bareilles-good-grief-2026',
  },
  {
    tag: 'World Premiere — June 5',
    title: 'LUCY SCHULMAN',
    credits: 'Dir: Ellie Sachs · Stars: Hasan Minhaj, David Cross, Thomas Mann',
    blurb: 'Writer-director-star Ellie Sachs makes her feature debut alongside Hasan Minhaj, David Cross, and Thomas Mann in the U.S. Narrative Competition.',
    dates: 'Jun 5 World Premiere',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6914/medium_Lucy_Schulman-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/lucy-schulman-2026',
  },
  {
    tag: 'Netflix — Red Carpet June 10',
    title: 'CHRIS & MARTINA: THE FINAL SET',
    credits: 'Dir: Rebecca Gitlitz · Netflix · Streams June 26',
    blurb: "Chris Evert and Martina Navratilova received parallel cancer diagnoses as their rivalry ended. A Netflix documentary about friendship after the match.",
    dates: 'Jun 10 Red Carpet 4:15 PM, SVA',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6986/medium_Chris___Martina_-_The_Final_Set-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/chris-martina-the-final-set-2026',
  },
  {
    tag: 'U.S. Narrative Competition — Jun 4',
    title: 'TURN IT UP!',
    credits: 'Dir: Sam Scott · Stars: Gwenlyn Cumyn, Julian Richings',
    blurb: 'An indie rock band finds an infectious guitar riff that opens a portal to a scarier dimension. Escape From Tribeca section. Photo call June 4.',
    dates: 'Jun 4 Photo Call + World Premiere',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/7039/medium_Turn_It_Up_-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/turn-it-up-2026',
  },
  {
    tag: 'Spotlight+ — June 10',
    title: 'HADESTOWN: THE MUSICAL',
    credits: 'Stars: Reeve Carney, Eva Noblezada, André De Shields',
    blurb: 'The Tony Award-winning Broadway cast reunites for the West End film adaptation. First-come first-served P&I — arrive early.',
    dates: 'Jun 10 AMC P&I',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/7049/medium_Hadestown_-_The_Musical-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/hadestown-the-musical-2026',
  },
  {
    tag: 'World Premiere — June 6',
    title: 'PLAYING POTUS',
    credits: 'Dir: Josh Greenbaum · Dana Carvey, Will Ferrell, Maya Rudolph',
    blurb: 'Peabody Award-winning director explores the legacy of SNL presidential impressions with the legends who made them. June 6, 5pm, Spring Studios.',
    dates: 'Jun 6 5:00 PM Spring Studios',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6950/medium_Playing_POTUS-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/playing-potus-2026',
  },
  {
    tag: 'Vulture Festival — June 13–14',
    title: 'VULTURE FESTIVAL AT TRIBECA',
    credits: 'Jason Bateman · Elisabeth Moss · Tracy Morgan',
    blurb: "Two days of cultural programming at SVA Theatre — Bateman on Good One, Moss closing Handmaid’s Tale, Morgan accepting the Roomy Award.",
    dates: 'Jun 13–14 SVA Theatre',
  },
  {
    tag: 'Documentary — World Premiere',
    title: 'THE LORRAINE',
    credits: 'Dir: Sam Pollard · 42West',
    blurb: "Sam Pollard documents the Black-owned Lorraine Hotel in Memphis — a civil rights haven, and the site of Dr. King’s assassination.",
    dates: 'Jun 5 World Premiere',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6977/medium_TheLorraine-CLEAN-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/lorraine-2026',
  },
  {
    tag: 'World Premiere — June 12',
    title: 'HOUSE OF CRITICISM',
    credits: 'Dir: Alison Chernick · Roberta Smith, Jerry Saltz, Cindy Sherman',
    blurb: 'Portrait of critics Roberta Smith and Jerry Saltz through the artists who defined their world — Cindy Sherman, Mickalene Thomas, Lena Dunham, Larry Gagosian.',
    dates: 'Jun 12 5:30 PM',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6959/medium_Houseofcriticism-melindapinecone-1_clean_16x9.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/house-of-criticism-2026',
  },
  {
    tag: 'World Premiere — June 4',
    title: 'RECLUSE',
    credits: 'Dir: Henry Chaisson · Escape From Tribeca',
    blurb: "A woman returns to her childhood home to care for her dying father and confronts the house’s dark, malevolent energy. Press day in person June 4, 2–4 PM.",
    dates: 'Jun 4 World Premiere 9:15 PM',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/7008/medium_Recluse-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/recluse-2026',
  },
  {
    tag: 'Documentary — World Premiere',
    title: "WHIPPLE’S WORLD",
    credits: 'Dir: Adam Paul Verity · Spotlight Documentary',
    blurb: "Behind the on-air persona of one of New York’s most recognizable broadcasters. World premiere June 12.",
    dates: 'Jun 12 World Premiere',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6967/medium_Whipple_s_World-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/whipple-s-world-2026',
  },
  {
    tag: '25th Anniversary 4K Restoration',
    title: 'BY HOOK OR BY CROOK',
    credits: 'Dirs: Harry Dodge, Silas Howard · LGBTQ+ Classic',
    blurb: 'The trailblazing trans-butch LGBTQ+ indie classic gets a 4K theatrical restoration for its 25th anniversary. Opening June 12.',
    dates: 'Jun 12 Theatrical Opening',
  },
  {
    tag: 'Documentary Competition',
    title: 'THE A WORD: THE FUTURE OF AGING',
    credits: 'Dir: Greg Kohs · Spotlight Documentary',
    blurb: "A pioneering scientist races to develop the world’s first FDA-approved drug to delay aging in dogs — and what it reveals about how we love and lose.",
    dates: 'Jun 5 5:30 PM Village East',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/7047/medium_The_A-Word_-_The_Future_of_Aging-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/a-word-the-future-of-aging-2026',
  },
  {
    tag: 'Viewpoints — World Premiere',
    title: 'MATININÓ',
    credits: 'Dir: Gabriela Diaz Arp',
    blurb: "A documentary world premiere in the Viewpoints section from David Magdael & Associates’ Tribeca 2026 slate.",
    dates: 'Jun Tribeca Viewpoints',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6970/medium_Matinino-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/matinino-2026',
  },
  {
    tag: 'Tribeca Games — Pier 57 Jun 10–14',
    title: 'TRIBECA GAMES GALLERY',
    credits: 'LOFSÖNG · Demi/Fractured Dream · ROCKBEASTS · Milktooth · Ghosts at the Grand',
    blurb: 'Free and open to the public. Exclusive demos of unreleased games from the official Tribeca Games selections. LSMG covering June 11 and 13.',
    dates: 'Jun 11 & 13 Pier 57',
  },
  {
    tag: 'White Belt — Tribeca Premiere',
    title: 'WHITE BELT',
    credits: 'Dir: Branislav Jankic · Subject: Monika “Jac” Jagaciak',
    blurb: "Former supermodel Monika “Jac” Jagaciak’s transformation into a jiu-jitsu champion. Editorial interview + formal critical review both in progress at LEDGERA.",
    dates: 'Tribeca Premiere',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/6858/medium_WhiteBelt-clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/white-belt-2026',
    spotify: { episodeId: '6uX0M0goku7HOocMpOfEr1', title: 'Tribeca 2026: White Belt — An Interview with Branislav Jankic & Monika Jagaciak' },
  },
  {
    tag: 'Sony Classics — Advance Screened',
    title: 'GAIL DAUGHTRY AND THE CELEBRITY SEX PASS',
    credits: 'Dir: David Wain · Zoey Deutch, Jon Hamm, John Slattery',
    blurb: 'A David Wain comedy. Embed under June 10 embargo. Press materials reviewed. In theaters July 10, Sony Classics.',
    dates: 'Jun 10 Tribeca (Embargo lifts)',
    poster: 'https://d13jj08vfqimqg.cloudfront.net/uploads/film/photo_1/7024/medium_Gail_Daughtry_and_the_Celebrity_Sex_Pass-Clean-16x9-01.jpg',
    tribecaUrl: 'https://tribecafilm.com/films/gail-daughtry-and-the-celebrity-sex-pass-2026',
  },
]

export const outdoorScreenings: TribecaFilmCard[] = [
  {
    tag: 'Jun 7 — Q&A',
    title: 'Jiro Dreams of Sushi',
    credits: 'Director David Gelb in conversation',
    blurb: 'Free outdoor screening with post-film Q&A with director David Gelb at Hudson Yards. Open to the public.',
    dates: '',
  },
  {
    tag: 'Jun 11 — Q&A — LSMG Assigned',
    title: 'Little Woods',
    credits: 'Director Nia DaCosta in conversation',
    blurb: 'Nia DaCosta (Captain Marvel, Candyman) celebrates the 25th anniversary of her debut feature with an outdoor Q&A at Hudson Yards. June 11.',
    dates: '',
  },
  {
    tag: 'Jun 11 — Awards Night',
    title: '25th Anniversary Founders Night',
    credits: 'Robert De Niro & Jane Rosenthal with Matt Tyrnauer',
    blurb: "Tribeca co-founders in conversation at OKX Theater at 8 PM. Awards ceremony at Spring Studios at 4 PM. Jurors: Nas, Mira Nair, Alexis Bledel, Sheila Nevins, Ego Nwodim.",
    dates: '',
  },
]

export const filmDetails: Record<string, TribecaFilmDetail> = {
  mexicanamerican: {
    slug: 'mexicanamerican',
    title: 'MEXICANAMERICAN',
    section: 'Documentary Competition — World Premiere',
    director: 'Eddie Sánchez',
    deck: "Filmmaker Eddie Sánchez merges VHS home movies with present-day interviews to trace his parents’ migration from Mexico to the United States — a poignant, decade-spanning portrait of love, sacrifice, and what the American Dream costs the people who build it.",
    credits: 'Directed by Eddie Sánchez · Documentary Competition · World Premiere',
    reviewStatus: 'under-review',
    byline: [
      { label: 'Coverage', value: 'LEDGERA' },
      { label: 'Festival', value: '2026 Tribeca Festival' },
      { label: 'Section', value: 'Documentary Competition' },
    ],
    meta: [
      { label: 'Director', value: 'Eddie Sánchez' },
      { label: 'Producers', value: 'Michael Rogerson, Eben Sánchez' },
      { label: 'Writer', value: 'Eddie Sánchez' },
      { label: 'Cinematography', value: 'Eddie Sánchez, Eben Sánchez' },
      { label: 'Editor', value: 'Eddie Sánchez' },
      { label: 'Music', value: 'nudo' },
      { label: 'Runtime', value: '98 minutes' },
      { label: 'Language', value: 'Spanish, English (with subtitles)' },
      { label: 'Section', value: 'Documentary Competition' },
      { label: 'Co-Host', value: 'Cinema Tropical' },
      { label: 'World Premiere', value: 'Tuesday June 9, 5:00 PM — Village East by Angelika' },
      { label: 'Screening 2', value: 'Wednesday June 10, 6:00 PM — Village East by Angelika' },
      { label: 'Screening 3', value: 'Sunday June 14, 6:00 PM — Village East by Angelika' },
      { label: 'Press Contact', value: 'David Magdael & Associates — dmagprteam@dmagpr.com' },
    ],
    body: `<p>What is the cost of the American Dream? It’s a question American culture has circled for a century without fully sitting with the answer. MEXICANAMERICAN, the documentary debut from filmmaker Eddie Sánchez, doesn’t circle it. It sits in it — for 98 minutes, with VHS home movies and kitchen-table interviews and the kind of quiet that comes after you’ve asked your parents something you never asked them before.</p>

<p>Sánchez turns his camera on Lalo and Beby, his parents, and asks them to walk him through it: the courtship in Mexico, the decision to leave, the journey across the border, and what their lives looked like once they arrived. The VHS tapes — recordings Lalo and Beby once sent back across the border as a way of “visiting” family they couldn’t physically be with — become the film’s beating heart. A decade of home movies, captured in the image quality of a generation that recorded its memories on magnetic tape because that’s what they had.</p>

<blockquote>“A love letter to those whose sacrifices often go unknown and unnoticed — and a reckoning of what is lost when we don’t ask questions.” — Faridah Gbadamosi, Tribeca Festival</blockquote>

<p>What makes MEXICANAMERICAN remarkable is how much Sánchez trusts the footage. He shot, wrote, and edited the film himself, alongside his brother Eben. It is a family film in the most literal sense — a film made by a family, about a family, that asks what it means to be a family across a border that was never supposed to stay permanent.</p>

<h2>Why This Film Matters to LEDGERA</h2>
<p>Last Shot Media Group is a Dallas-based independent creative company. Dallas and Austin share more than geography — they share the same demographic truth: that the cities of Texas were built in significant part by Mexican and Mexican-American families whose stories are underrepresented in media. MEXICANAMERICAN is the kind of film we exist to cover.</p>

<p>Eddie Sánchez is also the film’s own press contact, representing himself through Evelia Filmworks. That’s the kind of independent spirit LEDGERA was built to amplify. A filmmaker who made his film himself and is representing it himself at Tribeca, in competition, with no studio infrastructure. That’s the story.</p>

<h2>Screening Information</h2>
<p>MEXICANAMERICAN screens three times at Tribeca 2026, all at Village East by Angelika in Manhattan. The world premiere is Tuesday June 9 at 5:00 PM. Additional screenings June 10 at 6:00 PM and June 14 at 6:00 PM. Tickets at tribecafilm.com.</p>`,
    tags: ['#Tribeca2026', '#MEXICANAMERICAN', '#TheLSMGLedger', '#DocumentaryCompetition', '#EddieSanchez', '#25YearsOfTribeca'],
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #3d1a00 50%, #0a0a1a 100%)',
  },
  'airport-blvd': {
    slug: 'airport-blvd',
    title: 'AIRPORT BLVD',
    section: 'U.S. Narrative Competition — World Premiere June 5',
    director: 'Alejandro Hendricks',
    deck: "Shot in luminous black-and-white with an original jazz score, Alejandro Hendricks’ debut feature follows Xavier as East Austin transforms around him — a love letter to a city, old and new, centered on Black creative lives and the cost of displacement.",
    credits: 'Directed by Alejandro Hendricks · U.S. Narrative Competition · World Premiere',
    reviewStatus: 'under-review',
    byline: [
      { label: 'Coverage', value: 'LEDGERA' },
      { label: 'Festival', value: '2026 Tribeca Festival' },
      { label: 'Section', value: 'U.S. Narrative Competition' },
    ],
    meta: [
      { label: 'Director / Writer', value: 'Alejandro Hendricks' },
      { label: 'Producers', value: 'Brannin Webber, Jamal Gamble, Trai Wade' },
      { label: 'Cast', value: 'Jamal Gamble, Toluwani, Kenny Duet, Mor Cohen, Matthew Graham Wagner, Azeem Williams' },
      { label: 'Section', value: 'U.S. Narrative Competition' },
      { label: 'Style', value: 'Black-and-white, jazz-infused' },
      { label: 'World Premiere', value: 'Friday June 5, 6:15 PM — Village East Theater, Theater 6' },
      { label: 'Screening 2', value: 'Saturday June 6, 8:45 PM — AMC 19th St East 6, Theater 3' },
      { label: 'Screening 3', value: 'Wednesday June 10, 9:15 PM — AMC 19th St East 6, Theater 5' },
      { label: 'Instagram', value: '@airportblvdfilm' },
      { label: 'Website', value: 'airportblvdfilm.com' },
    ],
    body: `<p>Set in the transforming streets of East Austin, AIRPORT BLVD follows Xavier as he watches his community, friendships, and sense of home disappear. As the city evolves around him, the film becomes a soulful, romantic, and bittersweet love letter to a place caught between who it was and what it’s becoming.</p>

<p>Centered on Black creative lives and filmed in luminous black-and-white with an original jazz sensibility, Alejandro Hendricks’ debut explores displacement, intimacy, ambition, and the changing identity of a city rarely depicted from this perspective onscreen.</p>

<blockquote>A story of what gets lost when a city changes around the people who built it. Black-and-white. Jazz. East Austin. This is the kind of debut LEDGERA covers.</blockquote>

<p>As a Dallas-based media company covering Black culture and creative life, the Austin story resonates personally. Dallas and Austin share the same demographic truth about whose labor built these cities and whose culture is being priced out of them. AIRPORT BLVD is arriving at exactly the right cultural moment.</p>

<h2>The Team</h2>
<p>Directed and written by Alejandro Hendricks. Produced by Brannin Webber, Jamal Gamble, and Trai Wade — all of whom are also in the cast alongside Toluwani, Kenny Duet, Mor Cohen, Matthew Graham Wagner, and Azeem Williams. This is a collective effort, which shows in how the film moves.</p>`,
    tags: ['#Tribeca2026', '#AirportBLVD', '#TheLSMGLedger', '#BlackCinema', '#EastAustin', '#25YearsOfTribeca'],
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0d0d0d 100%)',
  },
  'the-lorraine': {
    slug: 'the-lorraine',
    title: 'THE LORRAINE',
    section: 'Documentary — World Premiere June 5',
    director: 'Sam Pollard',
    deck: "Sam Pollard — director of MLK/FBI and Mr. Soul! — documents the Black-owned Lorraine Hotel in Memphis: a beacon of the civil rights movement before it became the site of Dr. Martin Luther King Jr.’s assassination. Before that night, there was a life.",
    credits: 'Directed by Sam Pollard · 42West · World Premiere June 5',
    reviewStatus: 'under-review',
    byline: [
      { label: 'Director', value: 'Sam Pollard' },
      { label: 'Section', value: 'Documentary' },
      { label: 'Festival', value: 'Tribeca 2026' },
    ],
    meta: [
      { label: 'Director', value: 'Sam Pollard (MLK/FBI, Mr. Soul!, Slavery by Another Name)' },
      { label: 'Press', value: '42West — thelorraine@42west.com' },
      { label: 'World Premiere', value: 'Friday June 5, 2026 — Tribeca Festival' },
    ],
    body: `<p>The Lorraine Motel in Memphis, Tennessee was a Black-owned institution at the heart of the American civil rights movement. It housed King, Abernathy, Jackson, and the men and women who were remaking the country from the inside out. It was a place of warmth and community and strategy and rest.</p>

<p>Then April 4, 1968 happened. And the motel became a symbol of something else entirely — a wound the country never fully healed and a history it rarely tells in full.</p>

<p>Sam Pollard is one of the great living documentarians — his films on MLK, on the history of slavery’s economic legacy, on the soul music of America have established him as among the most important archivists of Black American history working in cinema. THE LORRAINE is a documentary about what came before the trauma. About the Lorraine Hotel as a living institution. About the people who built and ran it and why it mattered.</p>

<h2>Why LEDGERA Covers This Film</h2>
<p>LEDGERA was founded to give independent Black press access to the spaces where cultural history is being made. Sam Pollard making a film about the Lorraine Hotel at the 25th Tribeca Festival is a convergence of exactly what we exist to cover. History, Black entrepreneurship, civil rights, and one of the finest documentary filmmakers alive. LEDGERA will be at the world premiere.</p>`,
    tags: ['#Tribeca2026', '#TheLorraine', '#SamPollard', '#TheLSMGLedger', '#CivilRights', '#BlackHistory'],
    gradient: 'linear-gradient(135deg, #1a0505 0%, #2d0808 40%, #0a0a00 100%)',
  },
  'they-fight': {
    slug: 'they-fight',
    title: 'THEY FIGHT',
    section: 'World Premiere + Red Carpet — Andscape',
    director: 'Sheldon Candis',
    deck: "Sheldon Candis directs André Holland, Wendell Pierce, and Samira Wiley in Andscape’s Tribeca 2026 world premiere. LEDGERA covers the red carpet.",
    credits: 'Director: Sheldon Candis · André Holland, Wendell Pierce, Samira Wiley · Andscape',
    reviewStatus: 'coverage-coming',
    byline: [
      { label: 'Credits', value: 'Director: Sheldon Candis · André Holland, Wendell Pierce, Samira Wiley · Andscape' },
      { label: 'Dates', value: 'World Premiere + Red Carpet — Tribeca 2026' },
    ],
    meta: [],
    body: `<p>LEDGERA is credentialed press at Tribeca 2026 and is covering this film. Full editorial coverage, interviews, and review forthcoming.</p>

<p>Follow LEDGERA on Instagram at @thelsmgledger and on our podcast on Apple Podcasts and Spotify for the latest Tribeca 2026 coverage as it publishes.</p>`,
    tags: ['#Tribeca2026', '#TheLSMGLedger', '#25YearsOfTribeca'],
    gradient: 'linear-gradient(135deg, #000a1a 0%, #001a2d 50%, #0a0510 100%)',
  },
  harvest: {
    slug: 'harvest',
    title: 'HARVEST',
    section: 'Documentary Competition — World Premiere June 6',
    director: 'Natalie Baszile & Hyacinth Parker',
    deck: "Mother-daughter directing team Natalie Baszile and Hyacinth Parker follow the Nelson brothers as they race to become America’s largest Black farmers. Executive produced by Dawn Porter.",
    credits: 'Directors: Natalie Baszile, Hyacinth Parker · EP: Dawn Porter, Kat Taylor, Brenda Robinson',
    reviewStatus: 'coverage-coming',
    byline: [
      { label: 'Credits', value: 'Directors: Natalie Baszile, Hyacinth Parker · EP: Dawn Porter, Kat Taylor, Brenda Robinson' },
      { label: 'Dates', value: 'Saturday June 6 — World Premiere' },
    ],
    meta: [],
    body: `<p>LEDGERA is credentialed press at Tribeca 2026 and is covering this film. Full editorial coverage, interviews, and review forthcoming.</p>

<p>Follow LEDGERA on Instagram at @thelsmgledger and on our podcast on Apple Podcasts and Spotify for the latest Tribeca 2026 coverage as it publishes.</p>`,
    tags: ['#Tribeca2026', '#TheLSMGLedger', '#25YearsOfTribeca'],
    gradient: 'linear-gradient(135deg, #0a1a0a 0%, #1a2d00 50%, #0a0a0a 100%)',
  },
  'tropic-sun': {
    slug: 'tropic-sun',
    title: 'THE TROPIC SUN AND HIS EYES',
    section: 'International Narrative Competition — World Premiere',
    director: 'Elisee Junior St Preux',
    deck: "The first narrative feature about mental health filmed entirely on land in Haiti. Elisee Junior St Preux’s debut feature, produced by Naturi Naughton-Lewis, supported by Morehouse College’s Black Men’s Research Institute.",
    credits: 'Director: Elisee Junior St Preux · Producer: Naturi Naughton-Lewis · Lead: Stevenson Jean',
    reviewStatus: 'coverage-coming',
    byline: [
      { label: 'Credits', value: 'Director: Elisee Junior St Preux · Producer: Naturi Naughton-Lewis · Lead: Stevenson Jean' },
      { label: 'Dates', value: 'June 11 & June 14 — Tribeca 2026' },
    ],
    meta: [],
    body: `<p>LEDGERA is credentialed press at Tribeca 2026 and is covering this film. Full editorial coverage, interviews, and review forthcoming.</p>

<p>Follow LEDGERA on Instagram at @thelsmgledger and on our podcast on Apple Podcasts and Spotify for the latest Tribeca 2026 coverage as it publishes.</p>`,
    tags: ['#Tribeca2026', '#TheLSMGLedger', '#25YearsOfTribeca'],
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #001a2d 50%, #0a100a 100%)',
  },
}
