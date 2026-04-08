import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/culture-ledger/$articleSlug')({
  component: ArticlePage,
})

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
  tags?: string[]
}

interface Comment {
  id: string
  name: string
  text: string
  createdAt: string
}

function ArticlePage() {
  const { articleSlug } = Route.useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentName, setCommentName] = useState('')
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [commentSuccess, setCommentSuccess] = useState(false)

  useEffect(() => {
    let active = true

    function fetchArticle() {
      fetch(`/api/culture-ledger?slug=${articleSlug}`)
        .then((res) => res.json())
        .then((data) => {
          if (active) {
            setArticle(data.article || null)
            setComments(data.comments || [])
            setLoading(false)
          }
        })
        .catch(() => {
          if (active) setLoading(false)
        })
    }

    fetchArticle()
    const interval = setInterval(fetchArticle, 15000)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [articleSlug])

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentName.trim() || !commentText.trim()) return

    setSubmitting(true)
    setCommentSuccess(false)
    try {
      const res = await fetch('/api/culture-ledger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'comment',
          slug: articleSlug,
          name: commentName.trim(),
          text: commentText.trim(),
        }),
      })
      const data = await res.json()
      if (data.comment) {
        setComments((prev) => [...prev, data.comment])
        setCommentName('')
        setCommentText('')
        setCommentSuccess(true)
        setTimeout(() => setCommentSuccess(false), 3000)
      }
    } catch {
      // silently handle error
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 3, color: '#8f8f8f' }}>LOADING...</span>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center" style={{ minHeight: '60vh', padding: 40 }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, marginBottom: 16 }}>Article Not Found</h1>
        <Link to="/culture-ledger" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: 'var(--red)' }}>
          &larr; BACK TO THE CULTURE LEDGER
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Article Header */}
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 60px', borderBottom: '1px solid var(--border)', background: 'linear-gradient(135deg,#080808 0%,#0d0002 100%)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[900px] mx-auto">
          <Link to="/culture-ledger" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'inline-block', marginBottom: 24 }} className="hover:opacity-75 transition-opacity">
            &larr; THE LSMG LEDGER
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--red)', border: '1px solid var(--red)', padding: '4px 10px' }}>{article.category.toUpperCase()}</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: '.92' }}>{article.title}</h1>
          <div className="flex items-center gap-4 mt-6">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: '#b3b3b3' }}>{article.author}</span>
            <span style={{ width: 4, height: 4, background: 'var(--red)', borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: '#8f8f8f' }}>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {article.imageUrl && (
        <div className="relative" style={{ maxHeight: 480, overflow: 'hidden' }}>
          <img src={article.imageUrl} alt={article.title} className="w-full object-cover" style={{ maxHeight: 480 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, transparent 40%)' }} />
        </div>
      )}

      {/* Article Body */}
      <article style={{ padding: '80px 40px 120px' }}>
        <div className="max-w-[720px] mx-auto">
          <p style={{ fontSize: 19, color: '#999', lineHeight: 1.8, marginBottom: 40, fontStyle: 'italic', borderLeft: '3px solid var(--red)', paddingLeft: 24 }}>{article.excerpt}</p>
          {article.body.split('\n').map((paragraph, i) => (
            paragraph.trim() ? (
              <p key={i} style={{ fontSize: 17, color: '#bbb', lineHeight: 1.85, marginBottom: 28 }}>{paragraph}</p>
            ) : null
          ))}

          {/* Share / Tags */}
          <div style={{ borderTop: '1px solid #1a1a1a', marginTop: 60, paddingTop: 32 }}>
            <div className="flex flex-wrap items-center gap-4">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f' }}>CATEGORY</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--red)', border: '1px solid var(--red)', padding: '4px 10px' }}>{article.category.toUpperCase()}</span>
              {article.tags && article.tags.length > 0 && (
                <>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f', marginLeft: 8 }}>TAGS</span>
                  {article.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#8f8f8f', border: '1px solid #222', padding: '4px 10px' }}>{tag.toUpperCase()}</span>
                  ))}
                </>
              )}
            </div>
            {article.source && (
              <div className="mt-4">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f' }}>SOURCE: </span>
                {article.sourceUrl ? (
                  <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--red)' }} className="hover:opacity-75">{article.source}</a>
                ) : (
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#b3b3b3' }}>{article.source}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <section style={{ padding: '80px 40px 120px', background: '#060606', borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-[720px] mx-auto">
          <div className="mb-12">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Discussion</span>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: '.92', marginTop: 8 }}>
              Comments <span style={{ color: 'var(--red)' }}>({comments.length})</span>
            </h2>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleComment} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: 32, marginBottom: 40, borderTop: '3px solid var(--red)' }}>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, marginBottom: 20 }}>Leave a Comment</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginBottom: 8 }}>YOUR NAME</label>
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  required
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#111',
                    border: '1px solid #222',
                    color: 'var(--white)',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    outline: 'none',
                  }}
                  className="focus:border-[var(--red)] transition-colors"
                />
              </div>
              <div>
                <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginBottom: 8 }}>YOUR COMMENT</label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                  rows={4}
                  placeholder="Share your thoughts on this article..."
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: '#111',
                    border: '1px solid #222',
                    color: 'var(--white)',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    outline: 'none',
                    resize: 'vertical',
                  }}
                  className="focus:border-[var(--red)] transition-colors"
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="hover:opacity-85 transition-opacity disabled:opacity-50"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    letterSpacing: 3,
                    padding: '14px 32px',
                    background: 'var(--red)',
                    color: 'var(--white)',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
                {commentSuccess && (
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#4ade80' }}>Comment posted!</span>
                )}
              </div>
            </div>
          </form>

          {/* Comment List */}
          {comments.length === 0 ? (
            <div className="text-center" style={{ padding: '40px 0' }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, color: '#808080' }}>NO COMMENTS YET — BE THE FIRST TO SHARE YOUR THOUGHTS</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {comments.map((comment) => (
                <div key={comment.id} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '24px 28px', borderLeft: '3px solid var(--red)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div style={{ width: 32, height: 32, background: 'var(--red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: 'var(--white)' }}>{comment.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'var(--white)', display: 'block' }}>{comment.name}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: '#808080' }}>{new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {new Date(comment.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 15, color: '#999', lineHeight: 1.7 }}>{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* More Articles CTA */}
      <section className="text-center" style={{ padding: '80px 40px', background: 'var(--black)', borderTop: '1px solid #1a1a1a' }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>Keep Reading</span>
        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: '.92', margin: '12px 0' }}>
          More From The <span style={{ color: 'var(--red)' }}>LSMG Ledger</span>
        </h2>
        <Link
          to="/culture-ledger"
          className="inline-flex items-center mt-6 hover:opacity-85 transition-opacity"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}
        >
          View All Articles
        </Link>
      </section>
    </div>
  )
}
