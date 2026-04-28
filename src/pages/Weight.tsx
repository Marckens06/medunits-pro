import { useState } from 'react'
import { kgToLbs, lbsToKg, kgToOz, ozToKg } from '../utils/converters'

type Unit = 'kg' | 'lbs' | 'oz'

export default function Weight() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState<Unit>('kg')

  const num = parseFloat(value)
  const valid = !isNaN(num) && num >= 0

  const results = () => {
    if (!valid) return null
    if (from === 'kg') return { kg: num, lbs: kgToLbs(num), oz: kgToOz(num) }
    if (from === 'lbs') return { kg: lbsToKg(num), lbs: num, oz: lbsToKg(num) * 35.274 }
    return { kg: ozToKg(num), lbs: ozToKg(num) * 2.20462, oz: num }
  }

  const r = results()

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>⚖️ Weight Converter</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Convert between kg, lbs, and oz instantly</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8, fontWeight: 600 }}>FROM</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {(['kg', 'lbs', 'oz'] as Unit[]).map(u => (
              <button key={u} onClick={() => setFrom(u)}
                style={{
                  flex: 1, padding: '10px 0', borderRadius: 8, border: 'none',
                  cursor: 'pointer', fontWeight: 700, fontSize: 14,
                  background: from === u ? 'var(--accent)' : 'var(--bg3)',
                  color: from === u ? '#fff' : 'var(--text2)',
                }}>{u}</button>
            ))}
          </div>
          <input className="input" type="number" placeholder={`Enter value in ${from}`}
            value={value} onChange={e => setValue(e.target.value)} autoFocus />
        </div>
      </div>

      {r && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {from !== 'kg' && (
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Kilograms</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{r.kg.toFixed(2)}</div>
              </div>
              <div style={{ fontSize: 24 }}>kg</div>
            </div>
          )}
          {from !== 'lbs' && (
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Pounds</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{r.lbs.toFixed(2)}</div>
              </div>
              <div style={{ fontSize: 24 }}>lbs</div>
            </div>
          )}
          {from !== 'oz' && (
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Ounces</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{r.oz.toFixed(2)}</div>
              </div>
              <div style={{ fontSize: 24 }}>oz</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
