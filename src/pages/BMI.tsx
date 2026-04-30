import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { calcBMI, bmiCategory, calcIBW } from '../utils/converters'
import { Crown } from 'lucide-react'

export default function BMI() {
  const { plan } = useAuth()
  const navigate = useNavigate()
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [sex, setSex] = useState<'male' | 'female'>('male')

  if (plan !== 'pro') return (
    <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <h2 style={{ marginBottom: 8 }}>Pro Feature</h2>
      <p style={{ color: 'var(--text2)', marginBottom: 24 }}>BMI & Ideal Body Weight calculator requires a Pro plan.</p>
      <button className="btn btn-primary" onClick={() => navigate('/pricing')} style={{ padding: '12px 32px' }}>
        <Crown size={14} /> Upgrade to Pro — $4.99/mo
      </button>
    </div>
  )

  const w = parseFloat(weight), h = parseFloat(height)
  const valid = !isNaN(w) && !isNaN(h) && w > 0 && h > 0
  const bmi = valid ? calcBMI(w, h) : null
  const cat = bmi ? bmiCategory(bmi) : null
  const ibw = valid ? calcIBW(h, sex) : null

  const getBMIAlert = (b: number) => {
    if (b >= 40) return { msg: '🚨 Class III Obesity (BMI ≥40) — High risk of comorbidities. Bariatric evaluation may be indicated.', color: 'var(--red)' }
    if (b >= 35) return { msg: '⚠️ Class II Obesity (BMI 35-39.9) — Significant health risks. Lifestyle intervention recommended.', color: 'var(--red)' }
    if (b < 18.5) return { msg: '⚠️ Underweight (BMI <18.5) — Nutritional assessment recommended.', color: 'var(--warning)' }
    return null
  }
  const bmiAlert = bmi ? getBMIAlert(bmi) : null

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📊 BMI Calculator</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Body Mass Index + Ideal Body Weight (Devine formula)</p>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {(['male', 'female'] as const).map(s => (
            <button key={s} onClick={() => setSex(s)}
              style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none',
                cursor: 'pointer', fontWeight: 700, fontSize: 14, textTransform: 'capitalize',
                background: sex === s ? 'var(--accent)' : 'var(--bg3)',
                color: sex === s ? '#fff' : 'var(--text2)' }}>{s}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Weight (kg)</div>
            <input className="input" type="number" placeholder="e.g. 70"
              value={weight} onChange={e => setWeight(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 6 }}>Height (cm)</div>
            <input className="input" type="number" placeholder="e.g. 170"
              value={height} onChange={e => setHeight(e.target.value)} />
          </div>
        </div>
      </div>
      {bmi && cat && ibw && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bmiAlert && (
            <div className="card" style={{ background: 'rgba(239,68,68,0.08)', border: `1px solid ${bmiAlert.color}` }}>
              <div style={{ fontSize: 13, color: bmiAlert.color, fontWeight: 600 }}>{bmiAlert.msg}</div>
            </div>
          )}
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 4 }}>BMI</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: cat.color }}>{bmi}</div>
            <div style={{ fontWeight: 700, color: cat.color, fontSize: 16 }}>{cat.label}</div>
          </div>
          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>Ideal Body Weight (Devine)</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{ibw} kg</div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text3)' }}>{(ibw * 2.20462).toFixed(1)} lbs</div>
          </div>
        </div>
      )}
    </div>
  )
}
