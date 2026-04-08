import type { Config } from '@netlify/functions'
import { getStore } from '@netlify/blobs'
import { getUser } from '@netlify/identity'

interface Article {
  slug: string
  title: string
  excerpt: string
  body: string
  category: string
  author: string
  publishedAt: string
  imageUrl?: string
  source?: string
  sourceUrl?: string
  featured?: boolean
  tags?: string[]
}

const SEED_ARTICLES: Article[] = [
  {
    slug: 'beyonce-cowboy-carter-reshapes-country-music',
    title: "How Beyonce's Cowboy Carter Continues to Reshape Country Music",
    excerpt: "A year after its release, Cowboy Carter's influence on the country music landscape is undeniable — from radio playlists to award show nominations, the culture shift is permanent.",
    body: `When Beyonce dropped Cowboy Carter, the conversation was immediate. Critics debated, fans celebrated, and the country music establishment was forced to reckon with a question it had long avoided: who gets to define country music?\n\nA year later, the answer is clear — everyone does. Cowboy Carter didn't just chart; it rewired the genre's DNA. Radio programmers who once gatekept playlists with surgical precision have opened the door to a wave of Black artists who were always there but rarely amplified. Artists like Shaboozey, Tanner Adell, and Reyna Roberts have seen streaming numbers surge in the album's wake.\n\nThe album's impact extends beyond music. Fashion brands have leaned into Western aesthetics with a distinctly multicultural lens. The "coastal cowboy" trend that dominated social media last summer? That's Cowboy Carter's cultural residue.\n\nFor LSMG, this is exactly the kind of cultural moment we track. The intersection of music, identity, and industry politics is where the most important stories live. Cowboy Carter isn't just an album — it's a case study in how one project can redefine an entire genre's boundaries.\n\nThe question now isn't whether country music has changed. It's whether the industry will keep up with the culture it claims to represent.`,
    category: 'Music',
    author: 'LSMG Editorial',
    publishedAt: '2026-04-03T10:00:00Z',
    featured: true,
    tags: ['beyonce', 'country', 'music industry'],
  },
  {
    slug: 'streaming-wars-2026-who-is-winning',
    title: 'The Streaming Wars in 2026: Who Is Actually Winning?',
    excerpt: "Netflix, Disney+, Amazon, Apple — everyone claims victory. But the real numbers tell a different story about where audiences are actually spending their time.",
    body: `The streaming landscape in 2026 looks nothing like the gold rush of 2020. The era of "spend billions, worry about profit later" is over. Every major platform has pivoted to sustainability, and the results are telling.\n\nNetflix remains the market leader by subscriber count, but its dominance has narrowed. The platform's pivot to live events — boxing matches, comedy specials, and NFL games — has stabilized churn but raised questions about its identity. Is Netflix a studio or a network?\n\nDisney+ has found its footing by leaning into what Disney does best: franchise storytelling. The Marvel and Star Wars fatigue that plagued 2023-2024 has eased as the studio adopted a "less is more" approach, releasing fewer but higher-quality series.\n\nThe real surprise is Amazon's MGM integration finally paying dividends. Prime Video's film slate has evolved from prestige awards bait to genuine crowd-pleasers, and the Lord of the Rings franchise has built a loyal viewership that rivals anything in the fantasy genre.\n\nApple TV+ remains the premium boutique player. Its subscriber numbers are modest, but its per-subscriber revenue and critical acclaim are industry-leading. The Severance effect is real.\n\nFor consumers, the fatigue is real too. The average American household now subscribes to 4.2 streaming services, spending roughly $52 per month — more than most cable packages ever cost. The bundling trend is accelerating, with platforms partnering to offer combined subscriptions.\n\nThe winner of the streaming wars? Whoever figures out that the war is over and the age of coexistence has begun.`,
    category: 'Entertainment',
    author: 'LSMG Editorial',
    publishedAt: '2026-04-02T14:00:00Z',
    tags: ['streaming', 'netflix', 'disney'],
  },
  {
    slug: 'hip-hop-in-2026-the-regional-renaissance',
    title: 'Hip-Hop in 2026: The Regional Renaissance No One Predicted',
    excerpt: "Forget the coastal divide. The most exciting music in hip-hop is coming from cities that never had a seat at the table — and they're not asking for permission.",
    body: `For decades, hip-hop's geography was simple: New York, Los Angeles, Atlanta, and occasionally Houston or Chicago. In 2026, that map has been redrawn entirely.\n\nMemphis is having a moment that goes beyond Three 6 Mafia nostalgia. A new generation of producers is fusing the city's crunk legacy with experimental beats that sound like nothing else in the genre. The GloRilla effect opened doors, and a wave of artists has walked through them.\n\nMilwaukee, anchored by artists who blend Midwest sensibilities with Southern bounce, has become a genuine pipeline. The city's DIY scene — fueled by affordable studio space and a tight-knit community — is producing artists who arrive on the national stage fully formed.\n\nWhat makes this regional renaissance different from previous waves is the distribution model. Artists don't need a major label co-sign or a feature from an established star. They need a viral moment, a solid team, and consistency. The gatekeepers haven't disappeared, but they've been joined by a thousand new doors.\n\nThe result is a hip-hop landscape that's more diverse, more experimental, and more exciting than it's been in years. The mainstream will catch up eventually. It always does.`,
    category: 'Music',
    author: 'LSMG Editorial',
    publishedAt: '2026-04-01T09:00:00Z',
    tags: ['hip-hop', 'regional', 'music'],
  },
  {
    slug: 'met-gala-2026-predictions-and-politics',
    title: 'Met Gala 2026: Fashion Predictions and the Politics of the Guest List',
    excerpt: "The Met Gala remains fashion's biggest night. But as the guest list evolves to include influencers, athletes, and tech founders, the old guard is asking: who is this for?",
    body: `The Met Gala has always been about more than fashion. It's a cultural barometer — a single evening that reveals who has power, who wants it, and who the industry has decided matters this year.\n\nThe 2026 theme is expected to lean into Americana, a choice that feels both timely and loaded. In a year where cultural identity is front-page news, asking designers and celebrities to interpret "American style" is guaranteed to produce both stunning fashion and heated debate.\n\nThe guest list, as always, is where the real politics play out. The Met Gala's evolution from a fashion-industry event to a cross-cultural spectacle has accelerated. TikTok creators now walk the carpet alongside legacy designers. NBA players get invitations based on their off-court style as much as their on-court performance.\n\nThis democratization has its critics. Fashion purists argue that the Gala has lost its editorial edge, becoming another celebrity photo opportunity. But the counterargument is compelling: fashion has always been about who gets to participate, and expanding that circle is the most fashionable thing you can do.\n\nFrom a media perspective, the Met Gala is also a case study in controlled access. Vogue's Anna Wintour still curates every detail, from seating charts to carpet timing. In an age of information chaos, that level of editorial control is almost quaint — and undeniably effective.\n\nLSMG will be watching closely. The intersection of fashion, media, and cultural politics is exactly where our editorial lens focuses. Expect our coverage to go beyond "who wore what" and into "what does it mean."`,
    category: 'Fashion',
    author: 'LSMG Editorial',
    publishedAt: '2026-03-30T11:00:00Z',
    tags: ['fashion', 'met-gala', 'culture'],
  },
  {
    slug: 'the-rise-of-athlete-owned-media-companies',
    title: 'The Rise of Athlete-Owned Media Companies',
    excerpt: "From LeBron to Kelce, athletes are no longer just content — they're building the companies that create it. Here's why that matters for the entire media industry.",
    body: `The athlete-as-media-mogul isn't new. Michael Jordan's brand empire, Shaq's business portfolio, and Magic Johnson's investment fund laid the groundwork decades ago. But 2026 represents a fundamental shift: athletes aren't just investing in media — they're operating it.\n\nLeBron James's SpringHill Company has evolved from a production house into a full multimedia enterprise. Travis Kelce's New Heights podcast generates more weekly engagement than most cable news shows. Serena Williams's media ventures span content, commerce, and community in ways that legacy media companies struggle to replicate.\n\nThe playbook is clear: leverage your existing audience, own the IP, and build infrastructure that outlasts your playing career. What's different now is the sophistication. These aren't vanity projects or ghostwritten blogs. They're staffed enterprises with editorial standards, distribution strategies, and revenue models.\n\nFor traditional media, this presents both a challenge and an opportunity. Athletes bring built-in audiences that no amount of marketing can manufacture. But they also bring expectations of creative control that don't always align with legacy editorial structures.\n\nThe winners will be the companies — athlete-owned or otherwise — that understand a simple truth: in 2026, distribution is everywhere, but trust is scarce. Athletes have trust. The question is whether they can scale it without losing it.\n\nAt LSMG, we see this trend firsthand. Our clients increasingly want to own their narrative, not rent it. The media company of the future might not look like a media company at all — it might look like a person with a microphone and a plan.`,
    category: 'Business',
    author: 'LSMG Editorial',
    publishedAt: '2026-03-28T08:00:00Z',
    tags: ['athletes', 'media', 'business'],
  },
  {
    slug: 'why-vinyl-sales-keep-climbing',
    title: "Why Vinyl Sales Keep Climbing — And What It Says About Us",
    excerpt: "Vinyl isn't just a nostalgia play anymore. It's a cultural statement about how we consume art — and a billion-dollar industry that refuses to follow the digital playbook.",
    body: `Vinyl records have now posted year-over-year sales growth for seventeen consecutive years. In 2025, vinyl revenue in the US surpassed $1.8 billion, accounting for a meaningful share of total music revenue. In 2026, the trend shows no sign of slowing.\n\nThe easy explanation is nostalgia. Millennials and Gen X buyers who grew up with records are reclaiming a format they associate with authenticity. But that doesn't explain why Gen Z — a generation that has never known a world without streaming — is the fastest-growing vinyl demographic.\n\nThe real driver is intentionality. In a world of infinite, algorithmically curated playlists, vinyl demands a choice. You pick an album, you commit to its sequence, and you engage with it as a complete work. That friction isn't a bug — it's the entire point.\n\nArtists have caught on. Limited-edition vinyl pressings have become a core revenue stream, often outperforming digital sales for independent artists. Colored vinyl, exclusive artwork, and bonus tracks turn a record into an artifact — something worth owning in a world where ownership itself has become optional.\n\nThe vinyl economy has also created infrastructure. Independent pressing plants, which were on the verge of extinction a decade ago, are now booked months in advance. Record stores — physical, brick-and-mortar shops — are opening at a pace not seen since the 1990s.\n\nWhat vinyl really represents is a rejection of the "content" mindset. Music isn't content. It's art. And art deserves a format that treats it that way.`,
    category: 'Music',
    author: 'LSMG Editorial',
    publishedAt: '2026-03-26T12:00:00Z',
    tags: ['vinyl', 'music', 'culture'],
  },
  {
    slug: 'celebrity-brand-deals-2026-who-is-cashing-in',
    title: 'Celebrity Brand Deals in 2026: Who Is Actually Cashing In',
    excerpt: 'The endorsement game has evolved. From equity stakes to co-ownership, the smartest celebrities are building empires — not just collecting checks.',
    body: `The era of the simple celebrity endorsement is over. In 2026, the most valuable brand deals don't look like deals at all — they look like businesses.\n\nRihanna set the template with Fenty. The lesson wasn't just that celebrities could sell products — it was that ownership changes everything. When you own the brand, you control the narrative, the margins, and the exit.\n\nNow everyone is following suit. Athletes, musicians, and actors aren't signing endorsement contracts — they're negotiating equity positions. The smart money is on long-term ownership, not short-term payouts.\n\nThe shift has created a new category of celebrity entrepreneur. These aren't vanity projects with a famous face on the label. They're operational businesses with real teams, real supply chains, and real revenue.\n\nFor brands, this means the talent acquisition conversation has fundamentally changed. You're not hiring a spokesperson — you're taking on a partner. And partners have opinions about everything from product development to marketing strategy.\n\nThe result is better products, more authentic marketing, and a celebrity economy that rewards creativity over clout. The brands that understand this will win. The ones that still think a famous face is enough will be left behind.`,
    category: 'Business',
    author: 'LSMG Editorial',
    publishedAt: '2026-03-24T09:00:00Z',
    tags: ['celebrity', 'business', 'brands'],
  },
  {
    slug: 'reality-tv-renaissance-2026',
    title: 'The Reality TV Renaissance: Why Unscripted Content Is Dominating Again',
    excerpt: 'From dating shows to competition series, reality TV is having its biggest moment since the early 2000s. The difference? This time, the talent owns the IP.',
    body: `Reality TV never actually went away. It just went underground for a few years while prestige TV dominated the conversation. Now it's back — bigger, louder, and more profitable than ever.\n\nThe numbers tell the story. Unscripted content accounts for over 40% of total viewing hours across major streaming platforms. Production costs are a fraction of scripted series. And audience engagement — measured by social media mentions, memes, and cultural impact — often outpaces the most expensive dramas.\n\nWhat's different about the 2026 reality TV landscape is the sophistication of the format. Shows aren't just throwing strangers in a house and hoping for conflict. They're designing experiences that tap into genuine human psychology — competition, connection, vulnerability.\n\nThe talent side has evolved too. Reality TV stars are no longer disposable. They're brands with management teams, social media strategies, and post-show career plans mapped out before filming even begins.\n\nFor LSMG, this space is particularly interesting. Our talent division works with personalities who understand that reality TV is a launchpad, not a destination. The show is the beginning of the conversation, not the end.`,
    category: 'Entertainment',
    author: 'LSMG Editorial',
    publishedAt: '2026-03-22T14:00:00Z',
    tags: ['reality-tv', 'entertainment', 'streaming'],
  },
]

async function seedArticlesIfNeeded(store: ReturnType<typeof getStore>) {
  const existing = await store.get('articles-index', { type: 'json' }) as string[] | null
  if (existing && existing.length > 0) return

  const slugs: string[] = []
  for (const article of SEED_ARTICLES) {
    await store.setJSON(`article:${article.slug}`, article)
    slugs.push(article.slug)
  }
  await store.setJSON('articles-index', slugs)
}

async function isAdmin(req: Request): Promise<boolean> {
  try {
    const user = await getUser()
    if (!user) return false
    const roles = user.app_metadata?.roles || []
    return roles.includes('admin') || roles.includes('member')
  } catch {
    return false
  }
}

export default async (req: Request) => {
  const store = getStore('culture-ledger')
  const url = new URL(req.url)

  await seedArticlesIfNeeded(store)

  if (req.method === 'GET') {
    const slug = url.searchParams.get('slug')

    if (slug) {
      const article = await store.get(`article:${slug}`, { type: 'json' })
      if (!article) {
        return Response.json({ error: 'Article not found' }, { status: 404 })
      }
      const comments = (await store.get(`comments:${slug}`, { type: 'json' })) || []
      return Response.json({ article, comments })
    }

    const slugs = (await store.get('articles-index', { type: 'json' })) as string[] || []
    const articles = []
    for (const s of slugs) {
      const article = await store.get(`article:${s}`, { type: 'json' })
      if (article) articles.push(article)
    }
    articles.sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    return Response.json({ articles })
  }

  if (req.method === 'POST') {
    const body = await req.json()
    const { action } = body

    if (action === 'comment') {
      const { slug, name, text } = body
      if (!slug || !name || !text) {
        return Response.json({ error: 'Missing required fields' }, { status: 400 })
      }
      const comments = ((await store.get(`comments:${slug}`, { type: 'json' })) || []) as any[]
      const comment = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        text,
        createdAt: new Date().toISOString(),
      }
      comments.push(comment)
      await store.setJSON(`comments:${slug}`, comments)
      return Response.json({ comment })
    }

    if (action === 'create-article') {
      const { title, excerpt, body: articleBody, category, author, imageUrl, source, sourceUrl, tags, featured } = body
      if (!title || !articleBody) {
        return Response.json({ error: 'Title and body are required' }, { status: 400 })
      }
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      const article: Article = {
        slug,
        title,
        excerpt: excerpt || articleBody.substring(0, 200) + '...',
        body: articleBody,
        category: category || 'Culture',
        author: author || 'LSMG Editorial',
        publishedAt: new Date().toISOString(),
        imageUrl: imageUrl || undefined,
        source: source || undefined,
        sourceUrl: sourceUrl || undefined,
        tags: tags || [],
        featured: featured || false,
      }
      await store.setJSON(`article:${slug}`, article)
      const slugs = ((await store.get('articles-index', { type: 'json' })) || []) as string[]
      if (!slugs.includes(slug)) {
        slugs.unshift(slug)
        await store.setJSON('articles-index', slugs)
      }
      return Response.json({ article })
    }

    if (action === 'update-article') {
      const { slug, title, excerpt, body: articleBody, category, author, imageUrl, source, sourceUrl, tags, featured } = body
      if (!slug) {
        return Response.json({ error: 'Slug is required' }, { status: 400 })
      }
      const existing = await store.get(`article:${slug}`, { type: 'json' }) as Article | null
      if (!existing) {
        return Response.json({ error: 'Article not found' }, { status: 404 })
      }
      const updated: Article = {
        ...existing,
        title: title || existing.title,
        excerpt: excerpt || existing.excerpt,
        body: articleBody || existing.body,
        category: category || existing.category,
        author: author || existing.author,
        imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
        source: source !== undefined ? source : existing.source,
        sourceUrl: sourceUrl !== undefined ? sourceUrl : existing.sourceUrl,
        tags: tags || existing.tags,
        featured: featured !== undefined ? featured : existing.featured,
      }
      await store.setJSON(`article:${slug}`, updated)
      return Response.json({ article: updated })
    }

    if (action === 'delete-article') {
      const { slug } = body
      if (!slug) {
        return Response.json({ error: 'Slug is required' }, { status: 400 })
      }
      await store.delete(`article:${slug}`)
      await store.delete(`comments:${slug}`)
      const slugs = ((await store.get('articles-index', { type: 'json' })) || []) as string[]
      const updated = slugs.filter((s) => s !== slug)
      await store.setJSON('articles-index', updated)
      return Response.json({ success: true })
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 })
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

export const config: Config = {
  path: '/api/culture-ledger',
}
