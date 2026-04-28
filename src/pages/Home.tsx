import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Crown } from 'lucide-react'

const FREE_TOOLS = [
  { to: '/weight', icon: '⚖️', label: 'Weight', desc: 'kg ↔ lbs ↔ oz', color: '#2563eb' },
  { to: '/temperature', icon: '🌡️', label: 'Temperature', desc: '°C ↔ °F ↔ K', color: '#0891b2' },
  { to: '/glucose', icon: '🩸', label: 'Blood Glucose', desc: 'mg/dL ↔ mmol/L', color: '#dc2626' },
  { to: '/height', icon: '📏', label: 'Height', desc: 'cm ↔ ft/in', color: '#7c3aed' },
]

const PRO_TOOLS = [
  { to: '/bmi', icon: '📊', label: 'BMI Calculator', desc: 'Body Mass Index + category' },
  { to: '/dosage', icon: '💊', label: 'Drug Dosage', desc: 'mg/kg dose calculator' },
  { to: '/ivdrip', icon: '💧', label: 'IV Drip Rate', desc: 'mL/hr → drops/min' },
  { to: '/crcl', icon: '🧪', label: 'CrCl (Cockcroft-Gault)', desc: 'Creatinine clearance' },
]

export default function Home() {
  const { plan } = useAuth()
  const navigate = useNavigate()

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          ⚕️ MedUnits Pro
        </h1>
        <p style={{ color: 'var(--text2)', fontSize: 16 }}>
          Instant medical unit conversions & clinical calculators for nurses, students & healthcare professionals.
        </p>
      </div>

      {/* Free tools */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)',
          letterSpacing: 1, marginBottom: 16 }}>FREE CONVERTERS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {FREE_TOOLS.map(({ to, icon, label, desc, color }) => (
            <div key={to} onClick={() => navigate(to)}
              style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 24, cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 16,
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
              <div style={{ fontSize: 32 }}>{icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro tools */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 12, fontWeight: 700, color: 'var(--pro)',
          letterSpacing: 1, marginBottom: 16 }}>
          <Crown size={12} /> PRO CLINICAL CALCULATORS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {PRO_TOOLS.map(({ to, icon, label, desc }) => (
            <div key={to}
              onClick={() => plan === 'pro' ? navigate(to) : navigate('/pricing')}
              style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 24, cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 16,
                opacity: plan === 'pro' ? 1 : 0.7,
              }}>
              <div style={{ fontSize: 32 }}>{icon}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{label}</span>
                  {plan !== 'pro' && <span className="pro-badge">PRO</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
        {plan !== 'pro' && (
          <div style={{ marginTop: 16, textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={() => navigate('/pricing')}
              style={{ padding: '12px 32px', fontSize: 14 }}>
              <Crown size={14} /> Unlock All Pro Calculators — $4.99/mo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
