import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { calcCrCl } from '../utils/converters'
import { Crown } from 'lucide-react'

export default function CrCl() {
  const { plan } = useAuth()
  const navigate = useNavigate()
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [creatinine, setCreatinine] = useState('')
  const [sex, setSex] = useState<'male' | 'female'>('male')

  if (plan !== 'pro') return (
    <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <h2 style={{ marginBottom: 8 }}>Pro Feature</h2>
      <p style={{ color: 'var(--text2)', marginBottom: 24 }}>Creatinine clearance calculator requires a Pro plan.</p>
      <button className="btn btn-primary" onClick={() => navigate('/pricing')} style={{ padding: '12px 32px' }}>
        <Crown size={14} /> Upgrade to Pro — $4.99/mo
      </button>
    </div>
  )

  const a = parseFloat(age), w = parseFloat(weight), cr = parseFloat(creatinine)
  const valid = !isNaN(a) && !isNaN(w) && !isNaN(cr) && a > 0 && w > 0 && cr > 0
  const crcl = valid ? calcCrCl(a, w, cr, sex) : null

  const getStage = (v: number) => {
    if (v >= 90) return { label: 'Normal / G1', color: 'var(--success)' }
    if (v >= 60) return { label: 'Mildly decreased / G2', color: 'var(--success)' }
    if (v >= 45) return { label: 'Mildly-moderately decreased / G3a', color: 'var(--warning)' }
    if (v >= 30) return { label: 'Moderately-severely decreased / G3b', color: 'var(--warning)' }
    if (v >= 15) return { label: 'Severely decreased / G4', color: 'var(--red)' }
    return { label: 'Kidney failure / G5', color: 'var(--red)' }
  }

  const stage = crcl ? getStage(crcl) : null

  const getAlert = (v: number) => {
    if (v < 15) return { msg: '🚨 Kidney failure (G5) — Nephrology consult required. Significant dose adjustments needed.', color: 'var(--red)' }
    if (v < 30) return { msg: '⚠️ Severely reduced (G4) — Review all renally-cleared medications for dose adjustment.', color: 'var(--red)' }
    if (v < 60) return { msg: '⚠️ Moderately reduced (G3) — Consider dose adjustments for renally-cleared drugs.', color: 'var(--warning)' }
    return null
  }
  const alert = crcl ? getAlert(crcl) : null

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🧪 Creatinine Clearance</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Cockcroft-Gault equation for eGFR estimation</p>
      <div className="card" style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['male', 'female'] as const).map(s => (
            <button key={s} onClick={() => setSex(s)}
              style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none',
                cursor: 'pointer', fontWeight: 700, textTransform: 'capitalize',
                background: sex === s ? 'var(--accent)' : 'var(--bg3)',
                color: sex === s ? '#fff' : 'var(--text2)' }}>{s}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Age (years)</div>
            <input className="input" type="number" placeholder="e.g. 65" value={age} onChange={e => setAge(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Weight (kg)</div>
            <input className="input" type="number" placeholder="e.g. 70" value={weight} onChange={e => setWeight(e.target.value)} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Serum Creatinine (mg/dL)</div>
          <input className="input" type="number" step="0.1" placeholder="e.g. 1.2" value={creatinine} onChange={e => setCreatinine(e.target.value)} />
        </div>
      </div>
      {crcl && stage && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>Creatinine Clearance (eGFR)</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: 'var(--accent)' }}>{crcl}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>mL/min</div>
          </div>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: stage.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, color: stage.color }}>{stage.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>CKD staging based on eGFR</div>
            </div>
          </div>
          {alert && (
            <div className="card" style={{ background: 'rgba(239,68,68,0.08)', border: `1px solid ${alert.color}`, marginTop: 0 }}>
              <div style={{ fontSize: 13, color: alert.color, fontWeight: 600 }}>{alert.msg}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
