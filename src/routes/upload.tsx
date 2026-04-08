import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useIdentity } from '../lib/identity-context'

export const Route = createFileRoute('/upload')({
  component: UploadPage,
})

function UploadPage() {
  const { user, ready } = useIdentity()
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [mediaList, setMediaList] = useState<Array<{ key: string; url: string; type: string }>>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      fetchMedia()
    }
  }, [user])

  async function fetchMedia() {
    try {
      const res = await fetch('/api/media')
      if (res.ok) {
        const data = await res.json()
        setMediaList(data.media || [])
      }
    } catch {
      // ignore
    }
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!files.length) return

    setUploading(true)
    setError('')
    setMessage('')

    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('filename', file.name)
        formData.append('type', file.type)

        const res = await fetch('/api/media', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || 'Upload failed')
        }
      }

      setMessage(`Successfully uploaded ${files.length} file(s)!`)
      setFiles([])
      const input = document.querySelector('input[type="file"]') as HTMLInputElement
      if (input) input.value = ''
      await fetchMedia()
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(key: string) {
    try {
      const res = await fetch(`/api/media?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.key !== key))
        setMessage('File deleted.')
      }
    } catch {
      setError('Delete failed.')
    }
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: '#8f8f8f' }}>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
          <div className="relative z-10 max-w-[1400px] mx-auto text-center">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Authentication Required</span>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Sign In to <span style={{ color: 'var(--red)' }}>Upload</span>
            </h1>
            <p style={{ fontSize: 18, color: '#b3b3b3', marginTop: 24, marginBottom: 40, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>You need to be logged in to upload media content.</p>
            <Link
              to="/login"
              className="inline-flex items-center hover:opacity-85 transition-opacity"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)', background: 'linear-gradient(135deg,#080808 0%,#0d0002 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Media Manager</span>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: '.88' }}>
            Upload <span style={{ color: 'var(--red)' }}>Media</span>
          </h1>
          <p style={{ fontSize: 20, color: '#b3b3b3', maxWidth: 600, marginTop: 24, lineHeight: 1.75 }}>Upload images and videos to share with the LSMG community.</p>
        </div>
      </div>

      <section style={{ padding: '80px 40px' }}>
        <div className="max-w-[1000px] mx-auto">
          {error && (
            <div style={{ background: 'rgba(200,16,46,.1)', border: '1px solid rgba(200,16,46,.3)', padding: '12px 20px', marginBottom: 24, fontSize: 14, color: '#ff6b6b' }}>
              {error}
            </div>
          )}
          {message && (
            <div style={{ background: 'rgba(16,200,46,.1)', border: '1px solid rgba(16,200,46,.3)', padding: '12px 20px', marginBottom: 24, fontSize: 14, color: '#6bff6b' }}>
              {message}
            </div>
          )}

          <form onSubmit={handleUpload} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)', padding: 40, marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, marginBottom: 20 }}>Upload Files</h2>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: '#8f8f8f', display: 'block', marginBottom: 12 }}>
              SELECT FILES (IMAGES OR VIDEOS)
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="w-full"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: '#bbb' }}
            />
            {files.length > 0 && (
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#8f8f8f', marginTop: 12 }}>{files.length} file(s) selected</p>
            )}
            <button
              type="submit"
              disabled={uploading || !files.length}
              className="inline-flex items-center mt-6 hover:opacity-85 transition-opacity disabled:opacity-40"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </form>

          {/* Media Gallery */}
          {mediaList.length > 0 && (
            <div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Your Media</span>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: '.88', margin: '12px 0 32px' }}>
                Uploaded <span style={{ color: 'var(--red)' }}>Files</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 2, background: 'var(--red)' }}>
                {mediaList.map((item) => (
                  <div key={item.key} className="group" style={{ background: '#0a0a0a' }}>
                    {item.type.startsWith('video/') ? (
                      <div style={{ aspectRatio: '16 / 9' }}>
                        <video src={item.url} controls className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                        <img src={item.url} alt={item.key} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="flex items-center justify-between" style={{ padding: '12px 16px' }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: '#8f8f8f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                        {item.key.replace('media/', '')}
                      </span>
                      <button
                        onClick={() => handleDelete(item.key)}
                        className="hover:opacity-75 transition-opacity"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--red)', marginLeft: 8, cursor: 'pointer', background: 'none', border: 'none' }}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
