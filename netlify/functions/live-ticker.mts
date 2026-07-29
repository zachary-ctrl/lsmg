import type { Config } from '@netlify/functions'
import { db } from '../../db/index.js'
import { liveTicker } from '../../db/schema.js'
import { eq, asc, desc } from 'drizzle-orm'

const SEED_TICKER_ITEMS = [
  {
    text: 'LIVE: LSMG at Tribeca Film Festival 2026 — Full Coverage Now on LEDGERA',
    linkUrl: '/culture-ledger',
    linkType: 'article' as const,
    isActive: true,
    sortOrder: 0,
  },
  {
    text: "TRIBECA PREMIERE: 'The Accompanist' — Sarandon & Plaza Deliver at World Premiere",
    linkUrl: '/culture-ledger/the-accompanist-tribeca-2026-world-premiere',
    linkType: 'article' as const,
    isActive: true,
    sortOrder: 1,
  },
  {
    text: "NOW STREAMING: 'How to Feed a Dictator' — Andrew Neel's Must-See Documentary",
    linkUrl: '/culture-ledger/how-to-feed-a-dictator-tribeca-2026',
    linkType: 'article' as const,
    isActive: true,
    sortOrder: 2,
  },
  {
    text: "HBO DOC: The Robin Byrd Story — 50 Years of NYC Cable Access History",
    linkUrl: '/culture-ledger/the-robin-byrd-story-tribeca-2026',
    linkType: 'article' as const,
    isActive: true,
    sortOrder: 3,
  },
]

async function seedTickerIfNeeded() {
  const existing = await db.select({ id: liveTicker.id }).from(liveTicker).limit(1)
  if (existing.length > 0) return
  for (const item of SEED_TICKER_ITEMS) {
    await db.insert(liveTicker).values(item)
  }
}

export default async (req: Request) => {
  await seedTickerIfNeeded()

  if (req.method === 'GET') {
    const items = await db
      .select()
      .from(liveTicker)
      .where(eq(liveTicker.isActive, true))
      .orderBy(asc(liveTicker.sortOrder), desc(liveTicker.createdAt))
    return Response.json({ items })
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

export const config: Config = {
  path: '/api/live-ticker',
}
