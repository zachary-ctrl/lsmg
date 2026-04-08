import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useIdentity } from '../lib/identity-context'

export const Route = createFileRoute('/member-portal')({
  component: MemberPortalPage,
})

const ALLOWED_COMPANY_DOMAINS = ['lastshotmediagroup.com', 'lsmholdings.com'] as const

function isAllowedCompanyEmail(email?: string | null) {
  const normalized = (email ?? '').trim().toLowerCase()
  return ALLOWED_COMPANY_DOMAINS.some((domain) => normalized.endsWith(`@${domain}`))
}

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

function MemberPortalPage() {
  const navigate = useNavigate()
  const { user, ready, logout } = useIdentity()
  const [articles, setArticles] = useState<Article[]>([])
  const [view, setView] = useState<'dashboard' | 'create' | 'edit'>('dashboard')
  const [editSlug, setEditSlug] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Article form state
  const [formTitle, setFormTitle] = useState('')
  const [formExcerpt, setFormExcerpt] = useState('')
  const [formBody, setFormBody] = useState('')
  const [formCategory, setFormCategory] = useState('Culture')
  const [formAuthor, setFormAuthor] = useState('LSMG Editorial')
  const [formImageUrl, setFormImageUrl] = useState('')
  const [formTags, setFormTags] = useState('')
  const [formFeatured, setFormFeatured] = useState(false)
  const [formSource, setFormSource] = useState('')
  const [formSourceUrl, setFormSourceUrl] = useState('')

  useEffect(() => {
    if (!user || !user.roles?.includes('admin') || !isAllowedCompanyEmail(user.email)) return
    fetchArticles()
    const interval = setInterval(fetchArticles, 15000)
    return () => clearInterval(interval)
  }, [user])

  async function fetchArticles() {
    try {
      const res = await fetch('/api/culture-ledger')
      const data = await res.json()
      setArticles(data.articles || [])
    } catch {
      // ignore
    }
  }

  function resetForm() {
    setFormTitle('')
    setFormExcerpt('')
    setFormBody('')
    setFormCategory('Culture')
    setFormAuthor('LSMG Editorial')
    setFormImageUrl('')
    setFormTags('')
    setFormFeatured(false)
    setFormSource('')
    setFormSourceUrl('')
    setEditSlug('')
  }

  function loadArticleForEdit(article: Article) {
    setFormTitle(article.title)
    setFormExcerpt(article.excerpt)
    setFormBody(article.body)
    setFormCategory(article.category)
    setFormAuthor(article.author)
    setFormImageUrl(article.imageUrl || '')
    setFormTags(article.tags?.join(', ') || '')
    setFormFeatured(article.featured || false)
    setFormSource(article.source || '')
    setFormSourceUrl(article.sourceUrl || '')
    setEditSlug(article.slug)
    setView('edit')
    setError('')
    setMessage('')
    window.scrollTo(0, 0)
  }

  async function handleCreateArticle(e: React.FormEvent) {
    e.preventDefault()
    if (!formTitle.trim() || !formBody.trim()) {
      setError('Title and body are required.')
      return
    }

    setSaving(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/culture-ledger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-article',
          title: formTitle.trim(),
          excerpt: formExcerpt.trim() || undefined,
          body: formBody.trim(),
          category: formCategory,
          author: formAuthor.trim(),
          imageUrl: formImageUrl.trim() || undefined,
          tags: formTags.split(',').map((t) => t.trim()).filter(Boolean),
          featured: formFeatured,
          source: formSource.trim() || undefined,
          sourceUrl: formSourceUrl.trim() || undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create article')
      }

      setMessage('Article published successfully!')
      resetForm()
      setView('dashboard')
      await fetchArticles()
    } catch (err: any) {
      setError(err.message || 'Failed to create article')
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdateArticle(e: React.FormEvent) {
    e.preventDefault()
    if (!editSlug) return

    setSaving(true)
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/culture-ledger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-article',
          slug: editSlug,
          title: formTitle.trim(),
          excerpt: formExcerpt.trim(),
          body: formBody.trim(),
          category: formCategory,
          author: formAuthor.trim(),
          imageUrl: formImageUrl.trim() || undefined,
          tags: formTags.split(',').map((t) => t.trim()).filter(Boolean),
          featured: formFeatured,
          source: formSource.trim() || undefined,
          sourceUrl: formSourceUrl.trim() || undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to update article')
      }

      setMessage('Article updated successfully!')
      resetForm()
      setView('dashboard')
      await fetchArticles()
    } catch (err: any) {
      setError(err.message || 'Failed to update article')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteArticle(slug: string) {
    if (!confirm('Are you sure you want to delete this article? This cannot be undone.')) return

    try {
      const res = await fetch('/api/culture-ledger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete-article', slug }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete')
      }

      setMessage('Article deleted.')
      await fetchArticles()
    } catch (err: any) {
      setError(err.message || 'Delete failed')
    }
  }

  async function handleLogout() {
    await logout()
    navigate({ to: '/' })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    background: '#111',
    border: '1px solid #222',
    color: 'var(--white)',
    fontFamily: "'DM Mono', monospace",
    fontSize: 13,
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: 10,
    letterSpacing: 3,
    color: '#8f8f8f',
    display: 'block',
    marginBottom: 8,
    textTransform: 'uppercase',
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: '#8f8f8f' }}>Loading...</span>
      </div>
    )
  }

  if (!user || !user.roles?.includes('admin') || !isAllowedCompanyEmail(user.email)) {
    return (
      <div>
        <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
          <div className="relative z-10 max-w-[1400px] mx-auto text-center">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Admin Area</span>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: '.88', marginTop: 12 }}>
              Member <span style={{ color: 'var(--red)' }}>Portal</span>
            </h1>
            <p style={{ fontSize: 18, color: '#b3b3b3', marginTop: 24, marginBottom: 40, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
              {user ? 'Access denied. Admin access requires an approved @lastshotmediagroup.com or @lsmholdings.com account.' : 'Sign in with your LSMG admin account to manage articles and content.'}
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/admin-login"
                className="inline-flex items-center hover:opacity-85 transition-opacity"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}
              >
                {user ? 'Switch Account' : 'Admin Login'}
              </Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center hover:opacity-85 transition-opacity"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', border: '1px solid var(--red)', color: 'var(--white)', textTransform: 'uppercase', cursor: 'pointer' }}
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const categories = ['Culture', 'Music', 'Entertainment', 'Fashion', 'Business', 'Sports', 'Celebrity', 'Tech & Culture']

  return (
    <div>
      {/* Portal Header */}
      <div className="relative overflow-hidden" style={{ padding: '100px 40px 60px', borderBottom: '1px solid var(--border)', background: 'linear-gradient(135deg,#080808 0%,#0d0002 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>LSMG Member Portal</span>
              <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: '.88', marginTop: 8 }}>
                Article <span style={{ color: 'var(--red)' }}>Manager</span>
              </h1>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#8f8f8f', marginTop: 12 }}>
                Signed in as <span style={{ color: 'var(--white)' }}>{user.email}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => { resetForm(); setView('create'); setError(''); setMessage('') }}
                className="hover:opacity-85 transition-opacity"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, padding: '12px 24px', background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                + NEW ARTICLE
              </button>
              <button
                onClick={handleLogout}
                className="hover:opacity-85 transition-opacity"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, padding: '12px 24px', background: 'transparent', color: '#8f8f8f', border: '1px solid #707070', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                LOG OUT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-[1400px] mx-auto px-10 pt-6">
        {error && (
          <div style={{ background: 'rgba(200,16,46,.1)', border: '1px solid rgba(200,16,46,.3)', padding: '12px 20px', marginBottom: 16, fontSize: 14, color: '#ff6b6b' }}>
            {error}
          </div>
        )}
        {message && (
          <div style={{ background: 'rgba(16,200,46,.1)', border: '1px solid rgba(16,200,46,.3)', padding: '12px 20px', marginBottom: 16, fontSize: 14, color: '#6bff6b' }}>
            {message}
          </div>
        )}
      </div>

      {/* Dashboard View */}
      {view === 'dashboard' && (
        <section style={{ padding: '40px 40px 120px' }}>
          <div className="max-w-[1400px] mx-auto">
            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] mb-10" style={{ background: 'var(--red)' }}>
              <div style={{ background: '#0a0a0a', padding: '24px 20px' }} className="text-center">
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: 'var(--red)' }}>{articles.length}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginTop: 4 }}>TOTAL ARTICLES</span>
              </div>
              <div style={{ background: '#0a0a0a', padding: '24px 20px' }} className="text-center">
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: 'var(--red)' }}>{articles.filter((a) => a.featured).length}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginTop: 4 }}>FEATURED</span>
              </div>
              <div style={{ background: '#0a0a0a', padding: '24px 20px' }} className="text-center">
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: 'var(--red)' }}>{new Set(articles.map((a) => a.category)).size}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginTop: 4 }}>CATEGORIES</span>
              </div>
              <div style={{ background: '#0a0a0a', padding: '24px 20px' }} className="text-center">
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: 'var(--red)' }}>{new Set(articles.map((a) => a.author)).size}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginTop: 4 }}>AUTHORS</span>
              </div>
            </div>

            {/* Articles List */}
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36 }}>All Articles</h2>
            </div>

            {articles.length === 0 ? (
              <div className="text-center" style={{ padding: '60px 0' }}>
                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#8f8f8f' }}>No articles yet. Create your first article!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-[1px]" style={{ background: '#1a1a1a' }}>
                {articles.map((article) => (
                  <div key={article.slug} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: '#0a0a0a', padding: '20px 24px' }}>
                    <div className="flex items-start gap-4 flex-1">
                      {article.imageUrl ? (
                        <img src={article.imageUrl} alt="" style={{ width: 60, height: 44, objectFit: 'cover', flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: 60, height: 44, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, color: '#707070' }}>IMG</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, padding: '2px 6px', background: '#C8102E', color: '#fff' }}>{article.category.toUpperCase()}</span>
                          {article.featured && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, padding: '2px 6px', background: '#F59E0B', color: '#000' }}>FEATURED</span>}
                        </div>
                        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, lineHeight: 1.1, marginBottom: 2 }}>{article.title}</h3>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: '#808080' }}>
                          {article.author} &bull; {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link
                        to="/culture-ledger/$articleSlug"
                        params={{ articleSlug: article.slug }}
                        className="hover:opacity-75 transition-opacity"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, padding: '8px 14px', color: '#8f8f8f', border: '1px solid #222', textTransform: 'uppercase' }}
                      >
                        VIEW
                      </Link>
                      <button
                        onClick={() => loadArticleForEdit(article)}
                        className="hover:opacity-75 transition-opacity"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, padding: '8px 14px', color: 'var(--white)', border: '1px solid var(--red)', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase' }}
                      >
                        EDIT
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.slug)}
                        className="hover:opacity-75 transition-opacity"
                        style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, padding: '8px 14px', color: '#ff6b6b', border: '1px solid rgba(255,107,107,.3)', background: 'transparent', cursor: 'pointer', textTransform: 'uppercase' }}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Create / Edit Article View */}
      {(view === 'create' || view === 'edit') && (
        <section style={{ padding: '40px 40px 120px' }}>
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36 }}>
                {view === 'create' ? 'New Article' : 'Edit Article'}
              </h2>
              <button
                onClick={() => { resetForm(); setView('dashboard'); setError(''); setMessage('') }}
                className="hover:opacity-75 transition-opacity"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                &larr; BACK
              </button>
            </div>

            <form
              onSubmit={view === 'create' ? handleCreateArticle : handleUpdateArticle}
              style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)', padding: 40 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label style={labelStyle}>ARTICLE TITLE *</label>
                  <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} required placeholder="Enter article headline..." style={inputStyle} className="focus:border-[var(--red)] transition-colors" />
                </div>
                <div>
                  <label style={labelStyle}>AUTHOR</label>
                  <input type="text" value={formAuthor} onChange={(e) => setFormAuthor(e.target.value)} placeholder="LSMG Editorial" style={inputStyle} className="focus:border-[var(--red)] transition-colors" />
                </div>
              </div>

              <div className="mb-6">
                <label style={labelStyle}>EXCERPT / SUBTITLE</label>
                <textarea
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  rows={2}
                  placeholder="Brief summary of the article (auto-generated from body if empty)..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                  className="focus:border-[var(--red)] transition-colors"
                />
              </div>

              <div className="mb-6">
                <label style={labelStyle}>ARTICLE BODY *</label>
                <textarea
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  required
                  rows={12}
                  placeholder="Write your article here... Use line breaks for paragraphs."
                  style={{ ...inputStyle, resize: 'vertical' }}
                  className="focus:border-[var(--red)] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div>
                  <label style={labelStyle}>CATEGORY</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>COVER IMAGE URL</label>
                  <input type="url" value={formImageUrl} onChange={(e) => setFormImageUrl(e.target.value)} placeholder="https://..." style={inputStyle} className="focus:border-[var(--red)] transition-colors" />
                </div>
                <div>
                  <label style={labelStyle}>TAGS (COMMA SEPARATED)</label>
                  <input type="text" value={formTags} onChange={(e) => setFormTags(e.target.value)} placeholder="music, culture, trending" style={inputStyle} className="focus:border-[var(--red)] transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label style={labelStyle}>SOURCE NAME (OPTIONAL)</label>
                  <input type="text" value={formSource} onChange={(e) => setFormSource(e.target.value)} placeholder="e.g. External source name, or leave blank for LSMG" style={inputStyle} className="focus:border-[var(--red)] transition-colors" />
                </div>
                <div>
                  <label style={labelStyle}>SOURCE URL (OPTIONAL)</label>
                  <input type="url" value={formSourceUrl} onChange={(e) => setFormSourceUrl(e.target.value)} placeholder="https://original-source.com/article" style={inputStyle} className="focus:border-[var(--red)] transition-colors" />
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    style={{ width: 18, height: 18, accentColor: 'var(--red)' }}
                  />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: '#b3b3b3' }}>MARK AS FEATURED ARTICLE</span>
                </label>
              </div>

              {/* Image Preview */}
              {formImageUrl && (
                <div className="mb-8">
                  <label style={labelStyle}>IMAGE PREVIEW</label>
                  <div style={{ maxWidth: 400, aspectRatio: '16/10', overflow: 'hidden', border: '1px solid #222' }}>
                    <img src={formImageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="hover:opacity-85 transition-opacity disabled:opacity-40"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 36px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none', cursor: saving ? 'not-allowed' : 'pointer' }}
                >
                  {saving ? 'Saving...' : view === 'create' ? 'Publish Article' : 'Update Article'}
                </button>
                <button
                  type="button"
                  onClick={() => { resetForm(); setView('dashboard'); setError('') }}
                  className="hover:opacity-75 transition-opacity"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 36px', background: 'transparent', color: '#8f8f8f', border: '1px solid #707070', cursor: 'pointer', textTransform: 'uppercase' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  )
}
