import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup, signInWithRedirect, sendPasswordResetEmail } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../utils/firebase'

type Mode = 'login' | 'signup' | 'reset'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<Mode>('login')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true); setError(''); setSuccess('')
    try {
      if (mode === 'signup') {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, 'users', user.uid), {
          email, plan: 'free', created_at: new Date().toISOString()
        })
        navigate('/')
      } else if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } else if (mode === 'reset') {
        await sendPasswordResetEmail(auth, email)
        setSuccess('Reset link sent! Check your email.')
      }
    } catch (e: any) { setError(e.message) }
    finally { setLoading(false) }
  }

  async function handleGoogle() {
    try {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      if (isMobile) {
        await signInWithRedirect(auth, googleProvider)
      } else {
        const { user } = await signInWithPopup(auth, googleProvider)
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email, plan: 'free', created_at: new Date().toISOString()
        }, { merge: true })
        navigate('/')
      }
    } catch (e: any) { setError(e.message) }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--bg)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚕️</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>MedUnits Pro</h1>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>
            Medical unit conversions & clinical calculators
          </p>
        </div>
        <div className="card">
          {mode === 'reset' ? (
            <>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Reset Password</h2>
              <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 20 }}>
                Enter your email to receive a reset link.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input className="input" type="email" placeholder="Email"
                  value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                {error && <div style={{ fontSize: 12, color: 'var(--red)' }}>{error}</div>}
                {success && <div style={{ fontSize: 12, color: 'var(--success)', fontWeight: 600 }}>{success}</div>}
                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}
                  style={{ width: '100%', justifyContent: 'center' }}>
                  {loading ? '...' : 'Send Reset Link'}
                </button>
                <button onClick={() => { setMode('login'); setError(''); setSuccess('') }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--accent)', fontSize: 13, textAlign: 'center' }}>
                  ← Back to Login
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', marginBottom: 24, background: 'var(--bg3)',
                borderRadius: 8, padding: 4 }}>
                {[{id: 'login', label: 'Login'}, {id: 'signup', label: 'Sign Up'}].map(tab => (
                  <button key={tab.id} onClick={() => { setMode(tab.id as Mode); setError('') }}
                    style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: 'none',
                      cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      background: mode === tab.id ? 'var(--accent)' : 'transparent',
                      color: mode === tab.id ? '#fff' : 'var(--text2)' }}>{tab.label}</button>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input className="input" type="email" placeholder="Email"
                  value={email} onChange={e => setEmail(e.target.value)} />
                <input className="input" type="password" placeholder="Password"
                  value={password} onChange={e => setPassword(e.target.value)} />
                {mode === 'login' && (
                  <button onClick={() => { setMode('reset'); setError('') }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--text3)', fontSize: 12, textAlign: 'right', padding: 0 }}>
                    Forgot password?
                  </button>
                )}
                {error && <div style={{ fontSize: 12, color: 'var(--red)' }}>{error}</div>}
                <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}
                  style={{ width: '100%', justifyContent: 'center' }}>
                  {loading ? '...' : mode === 'signup' ? 'Create Account' : 'Login'}
                </button>
                <div style={{ textAlign: 'center', color: 'var(--text3)', fontSize: 12 }}>or</div>
                <button className="btn btn-ghost" onClick={handleGoogle}
                  style={{ width: '100%', justifyContent: 'center' }}>
                  🌐 Continue with Google
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
