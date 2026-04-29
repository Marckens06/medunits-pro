import { useState } from 'react'

const SECTIONS = [
  {
    id: 'formulas',
    emoji: '📐',
    title: 'Clinical Formulas',
    items: [
      {
        term: 'BMI (Body Mass Index)',
        formula: 'BMI = weight(kg) ÷ height(m)²',
        description: 'Screening tool for body fat based on weight and height. Limitations: does not directly measure body fat; may misclassify muscular individuals. Used alongside waist circumference and clinical assessment.',
        reference: 'WHO, 2024'
      },
      {
        term: 'Ideal Body Weight — Male (Devine Formula)',
        formula: 'IBW = 50 kg + 2.3 kg × (height in inches − 60)',
        description: 'Estimates pharmacokinetic dosing weight for males. Used when actual body weight (ABW) exceeds IBW by >20% (obesity). For patients under 5 ft, use 45.5 kg (male) as base without the additional calculation.',
        reference: 'Devine BJ. Drug Intell Clin Pharm. 1974'
      },
      {
        term: 'Ideal Body Weight — Female (Devine Formula)',
        formula: 'IBW = 45.5 kg + 2.3 kg × (height in inches − 60)',
        description: 'Estimates pharmacokinetic dosing weight for females. Widely used in clinical practice for tidal volume calculation in mechanical ventilation (6 mL/kg IBW) and drug dosing.',
        reference: 'Devine BJ. Drug Intell Clin Pharm. 1974'
      },
      {
        term: 'Creatinine Clearance (Cockcroft-Gault)',
        formula: 'CrCl = [(140 − age) × IBW(kg)] ÷ [72 × SCr(mg/dL)] × 0.85 (females)',
        description: 'Gold standard for drug dosing adjustment in renal impairment. Use IBW for obese patients. Not validated for AKI, rapidly changing creatinine, or extremes of muscle mass. NKF recommends CKD-EPI for CKD staging.',
        reference: 'Cockcroft & Gault. Nephron. 1976; NKF-KDIGO Guidelines 2024'
      },
      {
        term: 'IV Drip Rate',
        formula: 'Rate (gtt/min) = [Volume(mL) × Drop factor(gtt/mL)] ÷ Time(min)',
        description: 'Manual calculation for gravity IV infusions without a pump. Always verify with institutional policy. Electronic infusion pumps are preferred for accuracy and safety.',
        reference: 'INS Standards of Practice, 2021'
      },
      {
        term: 'Weight-Based Drug Dosage',
        formula: 'Dose(mg) = Weight(kg) × Prescribed dose(mg/kg)',
        description: 'Standard for pediatric and weight-sensitive drug dosing. Use actual body weight (ABW) unless drug-specific guidelines specify IBW or adjusted body weight (AdjBW). Always verify with current drug references.',
        reference: 'Lexicomp / Micromedex Drug Dosing Guidelines, 2024'
      },
      {
        term: 'Adjusted Body Weight (AdjBW)',
        formula: 'AdjBW = IBW + 0.4 × (ABW − IBW)',
        description: 'Used for obese patients when ABW exceeds IBW by >20%. Common for aminoglycoside and vancomycin dosing. The 0.4 correction factor accounts for partial distribution into adipose tissue.',
        reference: 'Bauer LA. Applied Clinical Pharmacokinetics, 3rd ed. 2014'
      },
      {
        term: 'Blood Glucose Conversion',
        formula: 'mmol/L = mg/dL ÷ 18.0182 | mg/dL = mmol/L × 18.0182',
        description: 'mg/dL used in USA; mmol/L used internationally (Canada, UK, EU, Australia). The conversion factor 18.0182 is based on the molecular weight of glucose (180.18 g/mol).',
        reference: 'SI Unit Conversion; ADA Standards of Care, 2024'
      },
    ]
  },
  {
    id: 'terminology',
    emoji: '📖',
    title: 'Key Terminology',
    items: [
      {
        term: 'CrCl (Creatinine Clearance)',
        formula: 'Normal: 90–120 mL/min',
        description: 'Volume of blood plasma cleared of creatinine per minute. Estimated using Cockcroft-Gault equation. Primary measure for drug dose adjustments in renal impairment. Decreases with age (~1 mL/min per year after age 40).',
        reference: 'NKF-KDIGO CKD Guidelines, 2024'
      },
      {
        term: 'eGFR (Estimated Glomerular Filtration Rate)',
        formula: 'Normal: ≥60 mL/min/1.73m²',
        description: 'Preferred measure for CKD staging (CKD-EPI 2021 equation, race-free). Values <60 for >3 months = CKD. Used alongside urine albumin-creatinine ratio (UACR) for complete kidney assessment.',
        reference: 'KDIGO CKD Guideline 2024; CKD-EPI 2021 Equation'
      },
      {
        term: 'IBW (Ideal Body Weight)',
        formula: 'Male: 50 + 2.3×(Ht in − 60) | Female: 45.5 + 2.3×(Ht in − 60)',
        description: 'Theoretical optimal weight for pharmacokinetic drug dosing. Not the same as healthy weight or goal weight. Primarily used in drug dosing, mechanical ventilation tidal volume, and nutritional calculations.',
        reference: 'Devine BJ, 1974; ACCP Pharmacokinetics Toolkit'
      },
      {
        term: 'ABW (Actual Body Weight)',
        formula: 'Patient\'s current measured weight in kg',
        description: 'The patient\'s real-time measured weight. Used directly in dosing for non-obese patients. For obese patients (ABW > 120% IBW), use IBW or AdjBW depending on the drug.',
        reference: 'Clinical Pharmacokinetics Standards'
      },
      {
        term: 'Drop Factor (gtt/mL)',
        formula: 'Macrodrip: 10, 15, 20 gtt/mL | Microdrip: 60 gtt/mL',
        description: 'Calibration of IV tubing — number of drops to deliver 1 mL. Macrodrip for routine adult infusions. Microdrip (60 gtt/mL) for precise rates: pediatrics, critical care, small volume medications.',
        reference: 'INS Infusion Therapy Standards of Practice, 2021'
      },
      {
        term: 'SCr (Serum Creatinine)',
        formula: 'Normal: Male 0.74–1.35 mg/dL | Female 0.59–1.04 mg/dL',
        description: 'Byproduct of muscle metabolism filtered by glomeruli. Inversely proportional to GFR. Affected by muscle mass, diet, and hydration. Less reliable in sarcopenic patients, amputees, or rapidly changing kidney function.',
        reference: 'Mayo Clinic Laboratories Reference Ranges, 2024'
      },
      {
        term: 'AKI (Acute Kidney Injury)',
        formula: 'SCr rise ≥0.3 mg/dL in 48h OR ≥1.5× baseline in 7 days',
        description: 'Sudden decrease in kidney function. Cockcroft-Gault not validated for AKI — use actual SCr trends and clinical judgment. Requires urgent evaluation and drug dose review.',
        reference: 'KDIGO AKI Guidelines, 2023'
      },
      {
        term: 'BMI Categories (WHO)',
        formula: '<18.5 Underweight | 18.5–24.9 Normal | 25–29.9 Overweight | ≥30 Obese',
        description: 'WHO 2024 acknowledges BMI limitations — does not account for fat distribution, ethnicity, age, or sex differences. Asian populations may have increased metabolic risk at lower BMI thresholds (≥23 overweight, ≥27.5 obese).',
        reference: 'WHO Obesity Guidelines, 2024; WHO Expert Consultation, Lancet 2004'
      },
    ]
  },
  {
    id: 'ranges',
    emoji: '📋',
    title: 'Normal Clinical Ranges',
    items: [
      {
        term: 'Blood Glucose — Normal & Diabetes Ranges',
        formula: 'Fasting normal: 70–99 mg/dL (3.9–5.5 mmol/L) | Pre-diabetes: 100–125 mg/dL | Diabetes: ≥126 mg/dL',
        description: '2-hour postprandial normal: <140 mg/dL (<7.8 mmol/L). Diabetes also diagnosed at random glucose ≥200 mg/dL with symptoms, or HbA1c ≥6.5%. HbA1c target for most adults with diabetes: <7% (ADA 2025).',
        reference: 'ADA Standards of Care in Diabetes, 2025'
      },
      {
      {
        term: 'Hypoglycemia — 3-Level Classification (ADA/EASD)',
        formula: '• Level 1: <70 and ≥54 mg/dL (<3.9 and ≥3.0 mmol/L) — Alert threshold\n• Level 2: <54 mg/dL (<3.0 mmol/L) — Clinically significant\n• Level 3: Severe — Requires external assistance (no fixed glucose threshold)',
        description: '⚠️ Clinical nuance: These thresholds are primarily used for people with diabetes. In people without diabetes, evaluate true hypoglycemia using Whipple triad: low glucose, compatible symptoms, and symptom resolution after glucose correction. Symptoms may occur at higher or lower glucose levels depending on baseline glycemic control.',
        reference: 'ADA Standards of Care 2025; ADA/EASD International Hypoglycemia Study Group definitions'
      },
      {
        term: 'Body Temperature',
        formula: 'Normal: 36.1–37.2°C (97–99°F) | Core: 36.5–37.5°C',
        description: 'Fever: ≥38.0°C (100.4°F). Low-grade fever: 37.3–38.0°C. Hypothermia: <35°C (95°F). Mild hypothermia: 32–35°C. Severe: <28°C. Hyperpyrexia: >41.5°C (medical emergency).',
        reference: 'ACEP Clinical Policy; WHO, 2024'
      },
      {
        term: 'Serum Creatinine',
        formula: 'Male: 0.74–1.35 mg/dL | Female: 0.59–1.04 mg/dL',
        description: 'Values vary by laboratory method and analyzer. Always compare to your institution\'s reference range. Cystatin C is more accurate than creatinine in patients with extremes of muscle mass.',
        reference: 'Mayo Clinic Laboratories, 2024'
      },
      {
        term: 'CKD Stages (eGFR)',
        formula: 'G1: ≥90 | G2: 60–89 | G3a: 45–59 | G3b: 30–44 | G4: 15–29 | G5: <15 mL/min/1.73m²',
        description: 'CKD diagnosed if eGFR <60 or kidney damage markers present for >3 months. G3b–G5 requires nephrology referral and significant drug dose adjustments. G5 = kidney failure (dialysis or transplant).',
        reference: 'KDIGO CKD Guidelines, 2024'
      },
      {
        term: 'BMI (Adult)',
        formula: 'Underweight: <18.5 | Normal: 18.5–24.9 | Overweight: 25.0–29.9 | Obese Class I: 30–34.9 | Class II: 35–39.9 | Class III: ≥40',
        description: 'Asian-specific thresholds: Overweight ≥23, Obese ≥27.5. BMI alone insufficient — use alongside waist circumference (M: >102cm, F: >88cm indicates high risk) and metabolic markers.',
        reference: 'WHO, 2024; NIH Clinical Guidelines on Obesity'
      },
      {
        term: 'Vital Signs (Adult)',
        formula: 'HR: 60–100 bpm | RR: 12–20/min | BP: <120/80 mmHg | SpO₂: ≥95%',
        description: 'BP categories (AHA 2023): Normal <120/80, Elevated 120–129/<80, HTN Stage 1: 130–139/80–89, HTN Stage 2: ≥140/90. SpO₂ <90% = hypoxemia requiring intervention.',
        reference: 'AHA/ACC Hypertension Guidelines 2023; ACLS Standards'
      },
    ]
  },
  {
    id: 'conversions',
    emoji: '🔄',
    title: 'Quick Conversion Reference',
    items: [
      { term: '1 kg', formula: '= 2.20462 lbs = 35.274 oz', description: 'Weight — exact SI conversion', reference: 'NIST' },
      { term: '1 lb', formula: '= 0.45359 kg = 16 oz', description: 'Weight — exact SI conversion', reference: 'NIST' },
      { term: '°C to °F', formula: '°F = (°C × 9/5) + 32', description: 'Temperature conversion', reference: 'SI standard' },
      { term: '°F to °C', formula: '°C = (°F − 32) × 5/9', description: 'Temperature conversion', reference: 'SI standard' },
      { term: '°C to Kelvin', formula: 'K = °C + 273.15', description: 'Absolute temperature scale', reference: 'SI standard' },
      { term: '1 inch', formula: '= 2.54 cm (exact)', description: 'Height/length conversion', reference: 'NIST' },
      { term: '1 foot', formula: '= 30.48 cm = 12 inches', description: 'Height/length conversion', reference: 'NIST' },
      { term: '1 mg/dL glucose', formula: '= 0.05551 mmol/L', description: 'Based on MW of glucose = 180.18 g/mol', reference: 'ADA, 2024' },
      { term: '1 mmol/L glucose', formula: '= 18.0182 mg/dL', description: 'Based on MW of glucose = 180.18 g/mol', reference: 'ADA, 2024' },
    ]
  }
]

export default function Reference() {
  const [activeSection, setActiveSection] = useState('formulas')
  const [search, setSearch] = useState('')

  const filtered = SECTIONS.map(s => ({
    ...s,
    items: s.items.filter(i =>
      i.term.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase()) ||
      i.formula.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(s => s.items.length > 0)

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📚 Medical Reference Index</h1>
        <p style={{ color: 'var(--text2)' }}>Clinical formulas, terminology and reference ranges with current evidence-based sources</p>
      </div>

      {/* Search */}
      <input className="input" placeholder="🔍 Search formulas, terms, ranges..."
        value={search} onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 24, fontSize: 14 }} />

      {/* Section tabs */}
      {!search && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              style={{
                padding: '8px 16px', borderRadius: 8, border: 'none',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
                background: activeSection === s.id ? 'var(--accent)' : 'var(--bg3)',
                color: activeSection === s.id ? '#fff' : 'var(--text2)',
              }}>
              {s.emoji} {s.title}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {(search ? filtered : SECTIONS.filter(s => s.id === activeSection)).map(section => (
        <div key={section.id} style={{ marginBottom: 32 }}>
          {search && (
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: 'var(--accent)' }}>
              {section.emoji} {section.title}
            </h2>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {section.items.map((item, i) => (
              <div key={i} className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{item.term}</div>
                    {item.formula && (
                      <div style={{
                        background: 'var(--accent-light)', border: '1px solid rgba(37,99,235,0.3)',
                        borderRadius: 6, padding: '8px 12px', marginBottom: 10,
                        fontFamily: 'monospace', fontSize: 13, color: 'var(--accent)',
                        lineHeight: 1.5
                      }}>
                        {item.formula}
                      </div>
                    )}
                    <div style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>
                      {item.description}
                    </div>
                  </div>
                  {item.reference && (
                    <div style={{
                      fontSize: 10, color: 'var(--text3)', whiteSpace: 'nowrap',
                      padding: '4px 8px', background: 'var(--bg3)', borderRadius: 4,
                      flexShrink: 0, maxWidth: 180, textAlign: 'right', lineHeight: 1.4
                    }}>
                      📄 {item.reference}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card" style={{
        marginTop: 16, background: 'rgba(37,99,235,0.06)',
        fontSize: 12, color: 'var(--text3)', lineHeight: 1.8
      }}>
        ⚠️ <strong>Clinical Disclaimer:</strong> This reference is for educational purposes only.
        Always verify calculations with current drug references (Lexicomp, Micromedex) and your
        institution's approved protocols. Clinical decisions must be based on the complete patient
        picture and qualified healthcare professional judgment.
      </div>
    </div>
  )
}
