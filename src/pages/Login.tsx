import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../utils/firebase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setLoading(true); setError('')
    try {
      if (isSignup) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, 'users', user.uid), { email, plan: 'free', created_at: new Date().toISOString() })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate('/')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    try {
      const { user } = await signInWithPopup(auth, googleProvider)
      await setDoc(doc(db, 'users', user.uid), { email: user.email, plan: 'free', created_at: new Date().toISOString() }, { merge: true })
      navigate('/')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚕️</div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>MedUnits Pro</h1>
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>Medical unit conversions & clinical calculators</p>
        </div>
        <div className="card">
          <div style={{ display: 'flex', marginBottom: 24, background: 'var(--bg3)', borderRadius: 8, padding: 4 }}>
            {['Login', 'Sign Up'].map((t, i) => (
              <button key={t} onClick={() => setIsSignup(i === 1)}
                style={{ flex: 1, padding: '8px 0', borderRadius: 6, border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: 13,
                  background: isSignup === (i === 1) ? 'var(--accent)' : 'transparent',
                  color: isSignup === (i === 1) ? '#fff' : 'var(--text2)' }}>{t}</button>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ fontSize: 14 }} />
            <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ fontSize: 14 }} />
            {error && <div style={{ fontSize: 12, color: 'var(--red)' }}>{error}</div>}
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Loading...' : isSignup ? 'Create Account' : 'Login'}
            </button>
            <div style={{ textAlign: 'center', color: 'var(--text3)', fontSize: 12 }}>or</div>
            <button className="btn btn-ghost" onClick={handleGoogle} style={{ width: '100%', justifyContent: 'center' }}>
              🌐 Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
