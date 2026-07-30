import type { Config } from '@netlify/functions'
import { db } from '../../db/index.js'
import { liveTicker } from '../../db/schema.js'
import { eq, asc, desc } from 'drizzle-orm'
import { getUser } from '@netlify/identity'

const ALLOWED_COMPANY_DOMAINS = ['lastshotmediagroup.com', 'lsmholdings.com'] as const

const SEED_TICKER_ITEMS = [
  {
    text: 'LIVE: LSMG at Tribeca Film Festival 2026 — Full Coverage Now on Culture Ledger',
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

function isAllowedCompanyEmail(email: string) {
  const normalized = email.trim().toLowerCase()
  return ALLOWED_COMPANY_DOMAINS.some((domain) => normalized.endsWith(`@${domain}`))
}

async function isAdmin(): Promise<boolean> {
  try {
    const user = await getUser()
    if (!user) return false
    const roles = user.app_metadata?.roles || []
    const email = user.email || ''
    return (roles.includes('admin') || roles.includes('editor')) && isAllowedCompanyEmail(email)
  } catch {
    return false
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

  if (req.method === 'POST') {
    if (!(await isAdmin())) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { action } = body

    if (action === 'create') {
      const { text, linkUrl, linkType } = body
      if (!text) {
        return Response.json({ error: 'Text is required' }, { status: 400 })
      }
      const maxOrder = await db
        .select({ sortOrder: liveTicker.sortOrder })
        .from(liveTicker)
        .orderBy(desc(liveTicker.sortOrder))
        .limit(1)
      const nextOrder = (maxOrder[0]?.sortOrder ?? -1) + 1

      const [item] = await db
        .insert(liveTicker)
        .values({
          text: text.trim(),
          linkUrl: linkUrl?.trim() || null,
          linkType: linkType || 'external',
          sortOrder: nextOrder,
        })
        .returning()
      return Response.json({ item })
    }

    if (action === 'update') {
      const { id, text, linkUrl, linkType, isActive } = body
      if (!id) return Response.json({ error: 'ID is required' }, { status: 400 })

      const updates: Record<string, unknown> = { updatedAt: new Date() }
      if (text !== undefined) updates.text = text.trim()
      if (linkUrl !== undefined) updates.linkUrl = linkUrl?.trim() || null
      if (linkType !== undefined) updates.linkType = linkType
      if (isActive !== undefined) updates.isActive = isActive

      const [item] = await db
        .update(liveTicker)
        .set(updates)
        .where(eq(liveTicker.id, id))
        .returning()
      return Response.json({ item })
    }

    if (action === 'delete') {
      const { id } = body
      if (!id) return Response.json({ error: 'ID is required' }, { status: 400 })
      await db.delete(liveTicker).where(eq(liveTicker.id, id))
      return Response.json({ success: true })
    }

    if (action === 'list-all') {
      const items = await db
        .select()
        .from(liveTicker)
        .orderBy(asc(liveTicker.sortOrder), desc(liveTicker.createdAt))
      return Response.json({ items })
    }

    return Response.json({ error: 'Unknown action' }, { status: 400 })
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

export const config: Config = {
  path: '/api/live-ticker',
}
