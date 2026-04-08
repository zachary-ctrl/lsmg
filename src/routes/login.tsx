import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useIdentity } from '../lib/identity-context'
import { login, signup, requestPasswordRecovery, oauthLogin } from '@netlify/identity'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

const ALLOWED_COMPANY_DOMAINS = ['lastshotmediagroup.com', 'lsmholdings.com'] as const

function isAllowedCompanyEmail(email: string) {
  const normalized = email.trim().toLowerCase()
  return ALLOWED_COMPANY_DOMAINS.some((domain) => normalized.endsWith(`@${domain}`))
}

function LoginPage() {
  const navigate = useNavigate()
  const { user, ready, logout } = useIdentity()
  const [mode, setMode] = useState<'login' | 'signup' | 'recovery'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      setSuccess('Welcome back!')
      navigate({ to: '/' })
    } catch (err: any) {
      setError(err?.status === 401 ? 'Invalid email or password.' : (err?.message || 'Login failed.'))
    } finally {
      setLoading(false)
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const normalizedEmail = email.trim().toLowerCase()
      if (!isAllowedCompanyEmail(normalizedEmail)) {
        setError('Only @lastshotmediagroup.com and @lsmholdings.com emails can create accounts.')
        return
      }
      await signup(normalizedEmail, password, { full_name: name })
      setSuccess('Account created! If not automatically logged in, please check your email to confirm.')
    } catch (err: any) {
      setError(err?.status === 403 ? 'Signups are not allowed.' : (err?.message || 'Signup failed.'))
    } finally {
      setLoading(false)
    }
  }

  async function handleRecovery(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await requestPasswordRecovery(email)
      setSuccess('Check your email for a password reset link.')
    } catch (err: any) {
      setError(err?.message || 'Recovery failed.')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleLogin() {
    try {
      oauthLogin('google')
    } catch {
      setError('Google login is not available.')
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

  if (user) {
    return (
      <div>
        <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
          <div className="relative z-10 max-w-[600px] mx-auto text-center">
            <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--red)', fontFamily: "'Bebas Neue', sans-serif", fontSize: 48 }}>
              {(user.user_metadata?.full_name || user.email)?.[0]?.toUpperCase() || 'U'}
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: '.88' }}>
              {user.user_metadata?.full_name || 'User'}
            </h1>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 2, color: '#8f8f8f', marginTop: 12 }}>{user.email}</p>

            <div className="flex flex-wrap justify-center gap-3 mt-10">
              <Link
                to="/member-portal"
                className="inline-flex items-center hover:opacity-85 transition-opacity"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none' }}
              >
                Member Portal
              </Link>
              <Link
                to="/upload"
                className="inline-flex items-center hover:opacity-85 transition-opacity"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--white)', textTransform: 'uppercase', border: '1px solid var(--red)' }}
              >
                Upload Media
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center hover:bg-[var(--red)] hover:text-[var(--white)] transition-colors"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'transparent', color: 'var(--red)', textTransform: 'uppercase', border: '1px solid var(--red)', cursor: 'pointer' }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="relative overflow-hidden" style={{ padding: '120px 40px 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(200,16,46,.04) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-[480px] mx-auto">
          <div className="text-center mb-12">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 5, color: 'var(--red)', textTransform: 'uppercase' }}>
              {mode === 'login' ? 'Company Member' : mode === 'signup' ? 'Join LSMG' : 'Reset Password'}
            </span>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: '.88', marginTop: 12 }}>
              {mode === 'login' ? (<>Member <span style={{ color: 'var(--red)' }}>Login</span></>) : mode === 'signup' ? (<>Member <span style={{ color: 'var(--red)' }}>Sign Up</span></>) : (<>Reset <span style={{ color: 'var(--red)' }}>Password</span></>)}
            </h1>
            <p style={{ fontSize: 16, color: '#b3b3b3', marginTop: 16 }}>
              {mode === 'login'
                ? 'Log in to access your LSMG member portal, upload media, and manage content.'
                : mode === 'signup'
                  ? 'Create your LSMG company member account to get started.'
                  : 'Enter your email to receive a reset link.'}
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

          <form onSubmit={mode === 'login' ? handleLogin : mode === 'signup' ? handleSignup : handleRecovery} style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', borderTop: '4px solid var(--red)', padding: 40 }}>
            {mode === 'signup' && (
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginBottom: 8 }}>FULL NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  style={inputStyle}
                />
              </div>
            )}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginBottom: 8 }}>EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={inputStyle}
              />
            </div>
            {mode !== 'recovery' && (
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: '#8f8f8f', display: 'block', marginBottom: 8 }}>PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  minLength={6}
                  style={inputStyle}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full hover:opacity-85 transition-opacity disabled:opacity-40"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: 'var(--red)', color: 'var(--white)', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            >
              {loading
                ? 'Please wait...'
                : mode === 'login'
                  ? 'Log In'
                  : mode === 'signup'
                    ? 'Create Account'
                    : 'Send Reset Link'}
            </button>

            {mode !== 'recovery' && (
              <>
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-[1px]" style={{ background: '#222' }} />
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2, color: '#8f8f8f' }}>OR</span>
                  <div className="flex-1 h-[1px]" style={{ background: '#222' }} />
                </div>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 hover:opacity-85 transition-opacity"
                  style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, padding: '16px 32px', background: '#fff', color: '#707070', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                  Continue with Google
                </button>
              </>
            )}
          </form>

          <div className="text-center mt-8" style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: '#8f8f8f' }}>
            {mode === 'login' && (
              <>
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => { setMode('signup'); setError(''); setSuccess('') }} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }} className="hover:opacity-75">
                    Sign up
                  </button>
                </p>
                <p style={{ marginTop: 8 }}>
                  <button onClick={() => { setMode('recovery'); setError(''); setSuccess('') }} style={{ color: '#8f8f8f', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }} className="hover:text-[var(--white)]">
                    Forgot password?
                  </button>
                </p>
              </>
            )}
            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button onClick={() => { setMode('login'); setError(''); setSuccess('') }} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }} className="hover:opacity-75">
                  Log in
                </button>
              </p>
            )}
            {mode === 'recovery' && (
              <p>
                <button onClick={() => { setMode('login'); setError(''); setSuccess('') }} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }} className="hover:opacity-75">
                  Back to login
                </button>
              </p>
            )}
          </div>

          {/* Member Benefits */}
          <div style={{ marginTop: 48, borderTop: '1px solid #1a1a1a', paddingTop: 40 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 3, color: 'var(--red)', display: 'block', marginBottom: 20, textAlign: 'center' }}>MEMBER BENEFITS</span>
            <div className="flex flex-col gap-3">
              {[
                { icon: '📝', label: 'Publish & manage articles on the LSMG Ledger' },
                { icon: '📸', label: 'Upload media to the LSMG community platform' },
                { icon: '🔒', label: 'Access the member portal & content dashboard' },
                { icon: '📊', label: 'Track article performance & engagement' },
              ].map((benefit) => (
                <div key={benefit.label} className="flex items-center gap-3" style={{ padding: '10px 14px', background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
                  <span style={{ fontSize: 18 }}>{benefit.icon}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: '#b3b3b3' }}>{benefit.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
