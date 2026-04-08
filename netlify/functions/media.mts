import { getStore } from '@netlify/blobs'
import type { Context } from '@netlify/functions'

export default async (req: Request, context: Context) => {
  const store = getStore('media-uploads')

  if (req.method === 'GET') {
    try {
      const { blobs } = await store.list({ prefix: 'media/' })
      const media = blobs.map((blob) => ({
        key: blob.key,
        url: `/api/media-file?key=${encodeURIComponent(blob.key)}`,
        type: blob.key.match(/\.(mp4|webm|mov|avi)$/i) ? 'video/mp4' : 'image/jpeg',
      }))
      return Response.json({ media })
    } catch (err) {
      return Response.json({ media: [] })
    }
  }

  if (req.method === 'POST') {
    try {
      const formData = await req.formData()
      const file = formData.get('file') as File
      const filename = formData.get('filename') as string
      const type = formData.get('type') as string

      if (!file) {
        return Response.json({ error: 'No file provided' }, { status: 400 })
      }

      const key = `media/${Date.now()}-${filename}`
      const buffer = await file.arrayBuffer()

      await store.set(key, buffer, {
        metadata: { contentType: type, originalName: filename },
      })

      return Response.json({
        success: true,
        key,
        url: `/api/media-file?key=${encodeURIComponent(key)}`,
      })
    } catch (err: any) {
      return Response.json({ error: err.message || 'Upload failed' }, { status: 500 })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const url = new URL(req.url)
      const key = url.searchParams.get('key')
      if (!key) {
        return Response.json({ error: 'No key provided' }, { status: 400 })
      }
      await store.delete(key)
      return Response.json({ success: true })
    } catch (err: any) {
      return Response.json({ error: err.message || 'Delete failed' }, { status: 500 })
    }
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}

export const config = {
  path: '/api/media',
}
