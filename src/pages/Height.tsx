import { useState } from 'react'
import { cmToFtIn, ftInToCm } from '../utils/converters'

export default function Height() {
  const [from, setFrom] = useState<'cm' | 'ftin'>('cm')
  const [cm, setCm] = useState('')
  const [ft, setFt] = useState('')
  const [inches, setInches] = useState('')

  const cmNum = parseFloat(cm)
  const ftNum = parseFloat(ft) || 0
  const inNum = parseFloat(inches) || 0

  const result = from === 'cm' && !isNaN(cmNum) && cmNum > 0
    ? cmToFtIn(cmNum)
    : from === 'ftin' && (ftNum > 0 || inNum > 0)
    ? { cm: ftInToCm(ftNum, inNum) }
    : null

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📏 Height Converter</h1>
      <p style={{ color: 'var(--text2)', marginBottom: 32 }}>Convert between centimeters and feet/inches</p>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button onClick={() => setFrom('cm')}
            style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none',
              cursor: 'pointer', fontWeight: 700, fontSize: 14,
              background: from === 'cm' ? 'var(--accent)' : 'var(--bg3)',
              color: from === 'cm' ? '#fff' : 'var(--text2)' }}>cm</button>
          <button onClick={() => setFrom('ftin')}
            style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none',
              cursor: 'pointer', fontWeight: 700, fontSize: 14,
              background: from === 'ftin' ? 'var(--accent)' : 'var(--bg3)',
              color: from === 'ftin' ? '#fff' : 'var(--text2)' }}>ft / in</button>
        </div>
        {from === 'cm' ? (
          <input className="input" type="number" placeholder="Enter height in cm"
            value={cm} onChange={e => setCm(e.target.value)} autoFocus />
        ) : (
          <div style={{ display: 'flex', gap: 12 }}>
            <input className="input" type="number" placeholder="Feet"
              value={ft} onChange={e => setFt(e.target.value)} />
            <input className="input" type="number" placeholder="Inches" step="0.1"
              value={inches} onChange={e => setInches(e.target.value)} />
          </div>
        )}
      </div>
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {from === 'cm' && 'ft' in result && (
            <>
              <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text3)' }}>Feet & Inches</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>
                    {result.ft}' {result.inches}"
                  </div>
                </div>
                <div style={{ fontSize: 24 }}>ft/in</div>
              </div>
            </>
          )}
          {from === 'ftin' && 'cm' in result && (
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text3)' }}>Centimeters</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{result.cm}</div>
              </div>
              <div style={{ fontSize: 24 }}>cm</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
