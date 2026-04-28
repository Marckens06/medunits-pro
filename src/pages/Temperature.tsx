import { useState } from 'react'
import { cToF, fToC, cToK, kToC } from '../utils/converters'

type Unit = 'C' | 'F' | 'K'

export default function Temperature() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState<Unit>('C')
  const num = parseFloat(value)
  const valid = !isNaN(num)

  const results = () => {
    if (!valid) return null
    let c: number
    if (from === 'C') c = num
    else if (from === 'F') c = fToC(num)
    else c = kToC(num)
    return { C: c, F: cToF(c), K: cToK(c) }
  }

  const r = results()
  const units: Unit[] = ['C', 'F', 'K']
  const labels = { C: '°Celsius', F: '°Fahrenheit', K: 'Kelvin' }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌡️ Temperature Converter</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Convert between Celsius, Fahrenheit and Kelvin</p>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 8, fontWeight: 600 }}>FROM</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {units.map(u => (
            <button key={u} onClick={() => setFrom(u)}
              style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none',
                cursor: 'pointer', fontWeight: 700, fontSize: 14,
                background: from === u ? 'var(--accent)' : 'var(--bg3)',
                color: from === u ? '#fff' : 'var(--text2)' }}>°{u}</button>
          ))}
        </div>
        <input className="input" type="number" placeholder={`Enter temperature in °${from}`}
          value={value} onChange={e => setValue(e.target.value)} autoFocus />
      </div>
      {r && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {units.filter(u => u !== from).map(u => (
            <div key={u} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>{labels[u]}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{r[u].toFixed(1)}</div>
              </div>
              <div style={{ fontSize: 24 }}>°{u}</div>
            </div>
          ))}
        </div>
      )}
      <div className="card" style={{ marginTop: 16, background: 'rgba(37,99,235,0.08)' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text2)', marginBottom: 8 }}>📋 Clinical Reference</div>
        <div style={{ fontSize: 12, color: 'var(--text3)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span>Normal body temp: 36.1–37.2°C (97–99°F)</span>
          <span>Fever: ≥38°C (100.4°F)</span>
          <span>Hypothermia: &lt;35°C (95°F)</span>
        </div>
      </div>
    </div>
  )
}
