import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Crown } from 'lucide-react'

export default function Dosage() {
  const { plan } = useAuth()
  const navigate = useNavigate()
  const [weight, setWeight] = useState('')
  const [dose, setDose] = useState('')
  const [freq, setFreq] = useState('1')

  if (plan !== 'pro') return (
    <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <h2 style={{ marginBottom: 8 }}>Pro Feature</h2>
      <p style={{ color: 'var(--text2)', marginBottom: 24 }}>Drug dosage calculator requires a Pro plan.</p>
      <button className="btn btn-primary" onClick={() => navigate('/pricing')} style={{ padding: '12px 32px' }}>
        <Crown size={14} /> Upgrade to Pro — $4.99/mo
      </button>
    </div>
  )

  const w = parseFloat(weight), d = parseFloat(dose), f = parseInt(freq)
  const valid = !isNaN(w) && !isNaN(d) && w > 0 && d > 0
  const single = valid ? +(w * d).toFixed(2) : null
  const daily = valid ? +(w * d * f).toFixed(2) : null

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💊 Drug Dosage Calculator</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Calculate medication dose based on patient weight (mg/kg)</p>
      <div className="card" style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Patient Weight (kg)</div>
          <input className="input" type="number" placeholder="e.g. 70" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Dose (mg/kg)</div>
          <input className="input" type="number" step="0.1" placeholder="e.g. 10" value={dose} onChange={e => setDose(e.target.value)} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Frequency (times/day)</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['1','2','3','4'].map(f => (
              <button key={f} onClick={() => setFreq(f)}
                style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontWeight: 700, background: freq === f ? 'var(--accent)' : 'var(--bg3)',
                  color: freq === f ? '#fff' : 'var(--text2)' }}>{f}x</button>
            ))}
          </div>
        </div>
      </div>
      {single && daily && (
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="card" style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>Single Dose</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{single}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>mg</div>
          </div>
          <div className="card" style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>Daily Dose</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{daily}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>mg/day</div>
          </div>
        </div>
      )}
    </div>
  )
}
