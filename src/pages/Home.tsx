import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Crown } from 'lucide-react'

const FREE_TOOLS = [
  { to: '/weight', icon: '⚖️', label: 'Weight', labelFr: 'Poids', desc: 'kg ↔ lbs ↔ oz', color: '#2563eb' },
  { to: '/temperature', icon: '🌡️', label: 'Temperature', labelFr: 'Température', desc: '°C ↔ °F ↔ K', color: '#0891b2' },
  { to: '/glucose', icon: '🩸', label: 'Blood Glucose', labelFr: 'Glycémie', desc: 'mg/dL ↔ mmol/L', color: '#dc2626' },
  { to: '/height', icon: '📏', label: 'Height', labelFr: 'Taille', desc: 'cm ↔ ft/in', color: '#7c3aed' },
]

const PRO_TOOLS = [
  { to: '/bmi', icon: '📊', label: 'BMI Calculator', labelFr: 'Calculateur IMC', desc: 'Body Mass Index + category' },
  { to: '/dosage', icon: '💊', label: 'Drug Dosage', labelFr: 'Dosage médicament', desc: 'mg/kg dose calculator' },
  { to: '/ivdrip', icon: '💧', label: 'IV Drip Rate', labelFr: 'Débit IV', desc: 'mL/hr → drops/min' },
  { to: '/crcl', icon: '🧪', label: 'CrCl (Cockcroft-Gault)', labelFr: 'ClCr (Cockcroft-Gault)', desc: 'Creatinine clearance' },
]

export default function Home() {
  const { plan, lang } = useAuth()
  const navigate = useNavigate()
  const isFr = lang === 'fr'

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>⚕️ MedUnits Pro</h1>
        <p style={{ color: 'var(--text2)', fontSize: 16 }}>
          {isFr
            ? 'Conversions médicales et calculateurs cliniques pour infirmiers, étudiants et professionnels de santé.'
            : 'Instant medical unit conversions & clinical calculators for nurses, students & healthcare professionals.'}
        </p>
      </div>

      {/* How it works */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)',
          letterSpacing: 1, marginBottom: 16 }}>
          {isFr ? 'COMMENT ÇA MARCHE' : 'HOW IT WORKS'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
          {[
            { icon: '⚖️', step: '1', title: isFr ? 'Choisissez' : 'Choose',
              desc: isFr ? 'Sélectionnez un outil' : 'Select a converter or calculator' },
            { icon: '✏️', step: '2', title: isFr ? 'Entrez' : 'Enter',
              desc: isFr ? 'Saisissez vos valeurs' : 'Enter your values' },
            { icon: '✅', step: '3', title: isFr ? 'Résultat' : 'Get Result',
              desc: isFr ? 'Résultat instantané' : 'Instant accurate result' },
          ].map(({ icon, step, title, desc }) => (
            <div key={step} style={{ textAlign: 'center', padding: '8px 0' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, marginBottom: 4 }}>STEP {step}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)' }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect for */}
      <div className="card" style={{ marginBottom: 24,
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(16,185,129,0.06))',
        border: '1px solid rgba(99,102,241,0.2)' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)',
          letterSpacing: 1, marginBottom: 16 }}>
          {isFr ? 'PARFAIT POUR' : 'PERFECT FOR'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { icon: '👩‍⚕️', label: isFr ? 'Infirmiers / NCLEX' : 'Nurses / NCLEX' },
            { icon: '🎓', label: isFr ? 'Étudiants en médecine' : 'Medical students' },
            { icon: '💊', label: isFr ? 'Pharmaciens' : 'Pharmacists' },
            { icon: '🏥', label: isFr ? 'Cliniciens' : 'Clinicians' },
            { icon: '🌍', label: 'EN / FR' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--bg3)', padding: '6px 12px', borderRadius: 20,
              fontSize: 12, fontWeight: 600 }}>
              {icon} {label}
            </div>
          ))}
        </div>
      </div>

      {/* Free tools */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text3)',
          letterSpacing: 1, marginBottom: 16 }}>
          {isFr ? 'CONVERTISSEURS GRATUITS' : 'FREE CONVERTERS'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {FREE_TOOLS.map(({ to, icon, label, labelFr, desc, color }) => (
            <div key={to} onClick={() => navigate(to)}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 24, cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 16 }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
              <div style={{ fontSize: 32 }}>{icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                  {isFr ? labelFr : label}
                </div>
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
          <Crown size={12} /> {isFr ? 'CALCULATEURS CLINIQUES PRO' : 'PRO CLINICAL CALCULATORS'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {PRO_TOOLS.map(({ to, icon, label, labelFr, desc }) => (
            <div key={to}
              onClick={() => plan === 'pro' ? navigate(to) : navigate('/pricing')}
              style={{ background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 24, cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 16,
                opacity: plan === 'pro' ? 1 : 0.7 }}>
              <div style={{ fontSize: 32 }}>{icon}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{isFr ? labelFr : label}</span>
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
              <Crown size={14} />
              {isFr ? 'Débloquer Pro — $4.99/mois' : 'Unlock All Pro Calculators — $4.99/mo'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
