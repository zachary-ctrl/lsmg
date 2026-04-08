import { getStore } from '@netlify/blobs'
import type { Context } from '@netlify/functions'

export default async (req: Request, context: Context) => {
  const url = new URL(req.url)
  const key = url.searchParams.get('key')

  if (!key) {
    return new Response('Missing key', { status: 400 })
  }

  const store = getStore('media-uploads')

  try {
    const result = await store.getWithMetadata(key, { type: 'arrayBuffer' })

    if (!result) {
      return new Response('Not found', { status: 404 })
    }

    const contentType = result.metadata?.contentType || 'application/octet-stream'

    return new Response(result.data as ArrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (err) {
    return new Response('Not found', { status: 404 })
  }
}

export const config = {
  path: '/api/media-file',
}
