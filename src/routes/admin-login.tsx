import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useIdentity } from '../lib/identity-context'
import { login } from '@netlify/identity'

export const Route = createFileRoute('/admin-login')({
  component: AdminLoginPage,
})

const ALLOWED_COMPANY_DOMAINS = ['lastshotmediagroup.com', 'lsmholdings.com'] as const

function isAllowedCompanyEmail(email: string) {
  const normalized = email.trim().toLowerCase()
  return ALLOWED_COMPANY_DOMAINS.some((domain) => normalized.endsWith(`@${domain}`))
}

function AdminLoginPage() {
  const navigate = useNavigate()
  const { user, ready, logout } = useIdentity()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const normalizedEmail = email.trim().toLowerCase()
      if (!isAllowedCompanyEmail(normalizedEmail)) {
        setError('Admin access is restricted to @lastshotmediagroup.com and @lsmholdings.com emails.')
        return
      }

      const loggedInUser = await login(normalizedEmail, password)
      
      if (loggedInUser && !loggedInUser.roles?.includes('admin')) {
        setError('Access denied. Admin privileges required.')
        await logout()
      } else {
        setSuccess('Welcome, Admin!')
        navigate({ to: '/member-portal' })
      }
    } catch (err: any) {
      setError(err?.status === 401 ? 'Invalid email or password.' : (err?.message || 'Login failed.'))
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    background: '#0a0a0a',
    border: '1px solid #222',
    color: 'var(--white)',
    fontFamily: "'DM Mono', monospace",
    fontSize: 13,
    outline: 'none',
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: '#8f8f8f' }}>Loading...</span>
      </div>
    )
  }

  if (user && user.roles?.includes('admin')) {
    navigate({ to: '/member-portal' })
    return null
  }

  return (
    <div>
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[480px] mx-auto">
          <div className="text-center mb-12">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>
              Administration
            </span>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: '.88', marginTop: 12 }}>
              Admin <span style={{ color: 'var(--red)' }}>Login</span>
            </h1>
            <p style={{ fontSize: 16, color: '#b3b3b3', marginTop: 16 }}>
              Restricted access. Please log in with your administrative credentials to access the Member Portal.
            </p>
          </div>

          {error && (
            <div style={{ background: 'rgba(200,16,46,.1)', border: '1px solid rgba(200,16,46,.3)', padding: '12px 20px', marginBottom: 24, fontSize: 14, color: '#ff6b6b' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: 'rgba(16,200,46,.1)', border: '1px solid rgba(16,200,46,.3)', padding: '12px 20px', marginBottom: 24, fontSize: 14, color: '#6bff6b' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)', padding: 40 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginBottom: 8 }}>ADMIN EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginBottom: 8 }}>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full hover:opacity-85 transition-opacity disabled:opacity-40"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            >
              {loading ? 'Please wait...' : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
