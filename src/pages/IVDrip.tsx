import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { calcDripRate } from '../utils/converters'
import { Crown } from 'lucide-react'

export default function IVDrip() {
  const { plan } = useAuth()
  const navigate = useNavigate()
  const [volume, setVolume] = useState('')
  const [time, setTime] = useState('')
  const [dropFactor, setDropFactor] = useState('20')

  if (plan !== 'pro') return (
    <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <h2 style={{ marginBottom: 8 }}>Pro Feature</h2>
      <p style={{ color: 'var(--text2)', marginBottom: 24 }}>IV drip rate calculator requires a Pro plan.</p>
      <button className="btn btn-primary" onClick={() => navigate('/pricing')} style={{ padding: '12px 32px' }}>
        <Crown size={14} /> Upgrade to Pro — $4.99/mo
      </button>
    </div>
  )

  const v = parseFloat(volume), t = parseFloat(time), df = parseInt(dropFactor)
  const valid = !isNaN(v) && !isNaN(t) && v > 0 && t > 0
  const drip = valid ? calcDripRate(v, t, df) : null
  const mlPerHr = valid ? +(v / t).toFixed(1) : null

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>💧 IV Drip Rate Calculator</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Calculate IV flow rate in drops per minute</p>
      <div className="card" style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Volume to Infuse (mL)</div>
          <input className="input" type="number" placeholder="e.g. 500" value={volume} onChange={e => setVolume(e.target.value)} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Infusion Time (hours)</div>
          <input className="input" type="number" step="0.5" placeholder="e.g. 4" value={time} onChange={e => setTime(e.target.value)} />
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Drop Factor (drops/mL)</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['10','15','20','60'].map(df => (
              <button key={df} onClick={() => setDropFactor(df)}
                style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                  fontWeight: 700, background: dropFactor === df ? 'var(--accent)' : 'var(--bg3)',
                  color: dropFactor === df ? '#fff' : 'var(--text2)' }}>{df}</button>
            ))}
          </div>
        </div>
      </div>
      {drip && mlPerHr && (
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="card" style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>Drip Rate</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--accent)' }}>{drip}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>drops/min</div>
          </div>
          <div className="card" style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>Flow Rate</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--accent)' }}>{mlPerHr}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>mL/hr</div>
          </div>
        </div>
      )}
    </div>
  )
}
