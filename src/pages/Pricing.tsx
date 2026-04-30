import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Crown, Check } from 'lucide-react'

const FREE_FEATURES_EN = ['Weight converter', 'Temperature converter', 'Blood glucose converter', 'Height converter']
const FREE_FEATURES_FR = ['Convertisseur de poids', 'Convertisseur de température', 'Convertisseur glycémie', 'Convertisseur de taille']
const PRO_FEATURES_EN = ['Everything in Free', 'BMI + Ideal Body Weight', 'Drug dosage calculator (mg/kg)', 'IV drip rate calculator', 'Creatinine clearance (Cockcroft-Gault)', 'Priority support']
const PRO_FEATURES_FR = ['Tout du plan gratuit', 'IMC + Poids idéal', 'Calculateur de dosage (mg/kg)', 'Calculateur de débit IV', 'Clairance créatinine (Cockcroft-Gault)', 'Support prioritaire']

export default function Pricing() {
  const { user, plan, lang } = useAuth()
  const isFr = lang === 'fr'
  const navigate = useNavigate()

  const upgradeUrl = `https://www.mcsanteplus.com/pricing-plans/checkout-1?planId=07f9a28c-668d-415e-9971-a8ca5479173a&checkoutFlowId=efccf466-6106-44e8-a1dd-2991624efea2&email=${encodeURIComponent(user?.email || '')}`

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>{isFr ? 'Tarifs simples' : 'Simple Pricing'}</h1>
        <p style={{ color: 'var(--text2)' }}>{isFr ? 'Débloquez tous les calculateurs cliniques pour un prix abordable' : 'Unlock all clinical calculators for one low price'}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Free */}
        <div className="card">
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{isFr ? 'Gratuit' : 'Free'}</div>
          <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 16 }}>$0</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {(isFr ? FREE_FEATURES_FR : FREE_FEATURES_EN).map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                <Check size={14} color="var(--success)" /> {f}
              </div>
            ))}
          </div>
          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => navigate('/')}>
            {plan === 'free' ? '✓ Current Plan' : 'Free Plan'}
          </button>
        </div>
        {/* Pro */}
        <div className="card" style={{ border: '2px solid var(--accent)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
            background: 'var(--accent)', color: '#fff', fontSize: 11, fontWeight: 700,
            padding: '4px 12px', borderRadius: 20 }}>MOST POPULAR</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
            <Crown size={18} color="var(--pro)" /> Pro
          </div>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: 'var(--accent)' }}>$4.99</span>
            <span style={{ color: 'var(--text3)', fontSize: 14 }}>/month</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {(isFr ? PRO_FEATURES_FR : PRO_FEATURES_EN).map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text2)' }}>
                <Check size={14} color="var(--accent)" /> {f}
              </div>
            ))}
          </div>
          {plan === 'pro' ? (
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled>
              ✓ Active Plan
            </button>
          ) : (
            <a href={upgradeUrl} target="_blank" rel="noreferrer"
              style={{ display: 'block', textAlign: 'center', background: 'var(--accent)',
                color: '#fff', padding: '12px 0', borderRadius: 8, fontWeight: 700,
                textDecoration: 'none', fontSize: 14 }}>
              <Crown size={14} style={{ display: 'inline', marginRight: 6 }} />
              Upgrade to Pro
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
