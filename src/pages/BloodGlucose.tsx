import { useState } from 'react'
import { mgdlToMmol, mmolToMgdl } from '../utils/converters'

export default function BloodGlucose() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState<'mgdl' | 'mmol'>('mgdl')
  const num = parseFloat(value)
  const valid = !isNaN(num) && num > 0

  const getStatus = (mgdl: number) => {
    if (mgdl < 70) return { label: 'Hypoglycemia', color: 'var(--red)' }
    if (mgdl <= 99) return { label: 'Normal (Fasting)', color: 'var(--success)' }
    if (mgdl <= 125) return { label: 'Pre-diabetes', color: 'var(--warning)' }
    return { label: 'Diabetes range', color: 'var(--red)' }
  }

  const mgdl = valid ? (from === 'mgdl' ? num : mmolToMgdl(num)) : null
  const mmol = valid ? (from === 'mmol' ? num : mgdlToMmol(num)) : null
  const status = mgdl ? getStatus(mgdl) : null

  const getGlucoseAlert = (v: number) => {
    if (v < 54) return { msg: '🚨 Level 2 Hypoglycemia (<54 mg/dL) — Clinically significant. Immediate treatment required.', color: 'var(--red)' }
    if (v < 70) return { msg: '⚠️ Level 1 Hypoglycemia (<70 mg/dL) — Alert threshold. Patient should treat immediately.', color: 'var(--warning)' }
    if (v >= 400) return { msg: '🚨 Severe Hyperglycemia (≥400 mg/dL) — Risk of DKA/HHS. Urgent medical evaluation needed.', color: 'var(--red)' }
    if (v >= 180) return { msg: '⚠️ Hyperglycemia (≥180 mg/dL) — Above postprandial target for most diabetic patients.', color: 'var(--warning)' }
    return null
  }
  const glucoseAlert = mgdl ? getGlucoseAlert(mgdl) : null

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🩸 Blood Glucose Converter</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Convert between mg/dL and mmol/L</p>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {[['mgdl', 'mg/dL'], ['mmol', 'mmol/L']].map(([val, label]) => (
            <button key={val} onClick={() => setFrom(val as any)}
              style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none',
                cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: from === val ? 'var(--accent)' : 'var(--bg3)',
                color: from === val ? '#fff' : 'var(--text2)' }}>{label}</button>
          ))}
        </div>
        <input className="input" type="number" step="0.1"
          placeholder={`Enter value in ${from === 'mgdl' ? 'mg/dL' : 'mmol/L'}`}
          value={value} onChange={e => setValue(e.target.value)} autoFocus />
      </div>
      {valid && mgdl && mmol && (
        <>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            {from !== 'mgdl' && (
              <div className="card" style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>mg/dL</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{mgdl.toFixed(1)}</div>
              </div>
            )}
            {from !== 'mmol' && (
              <div className="card" style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>mmol/L</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--accent)' }}>{mmol.toFixed(2)}</div>
              </div>
            )}
          </div>
          {status && (
            <div className="card" style={{ background: 'rgba(37,99,235,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: status.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, color: status.color }}>{status.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Based on fasting glucose reference ranges</div>
              </div>
            </div>
          )}
        </>
      )}
      {glucoseAlert && valid && (
        <div className="card" style={{ marginBottom: 12, background: 'rgba(239,68,68,0.08)', border: `1px solid ${glucoseAlert.color}` }}>
          <div style={{ fontSize: 13, color: glucoseAlert.color, fontWeight: 600 }}>{glucoseAlert.msg}</div>
        </div>
      )}
      <div className="card" style={{ marginTop: 16, background: 'rgba(37,99,235,0.08)' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', marginBottom: 8 }}>📋 Reference Ranges</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>Normal fasting: 70–99 mg/dL (3.9–5.5 mmol/L)</span>
          <span>Pre-diabetes: 100–125 mg/dL (5.6–6.9 mmol/L)</span>
          <span>Diabetes: ≥126 mg/dL (≥7.0 mmol/L)</span>
          <span>Hypoglycemia: &lt;70 mg/dL (&lt;3.9 mmol/L)</span>
        </div>
      </div>
    </div>
  )
}
