import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQS = [
  {
    q: "Is MedUnits Pro free to use?",
    a: "Yes! The basic converters (Weight, Temperature, Blood Glucose, Height) are completely free. Pro clinical calculators (BMI, Drug Dosage, IV Drip Rate, Creatinine Clearance) require a Pro plan at $4.99/month."
  },
  {
    q: "What is included in the Pro plan?",
    a: "The Pro plan includes all free converters plus: BMI & Ideal Body Weight calculator, Drug Dosage calculator (mg/kg), IV Drip Rate calculator, and Creatinine Clearance (Cockcroft-Gault equation)."
  },
  {
    q: "How accurate are the calculations?",
    a: "All calculations use standard medical formulas used in clinical practice. However, MedUnits Pro is intended for educational and reference purposes only. Always verify critical calculations with your institution's protocols and consult qualified healthcare professionals for patient care decisions."
  },
  {
    q: "Can I use MedUnits Pro for patient care?",
    a: "MedUnits Pro is designed as a reference and educational tool. It should not replace clinical judgment or your institution's approved tools. Always follow your facility's protocols for patient care calculations."
  },
  {
    q: "How do I cancel my Pro subscription?",
    a: "You can cancel your subscription at any time through your Wix account at mcsanteplus.com/my-subscriptions. Your Pro access will remain active until the end of the current billing period."
  },
  {
    q: "Is my data secure?",
    a: "Yes. We use Firebase Authentication for secure login. We do not store any patient data or calculation inputs. Only your account information (email and plan) is stored securely in our database."
  },
  {
    q: "What units does the Blood Glucose converter support?",
    a: "We support conversion between mg/dL (used in the US) and mmol/L (used in Canada, UK, Europe, and most of the world). The converter also displays clinical reference ranges."
  },
  {
    q: "Do you support French language?",
    a: "French language support is coming soon! We are committed to serving both English and French-speaking healthcare professionals."
  },
  {
    q: "How is Ideal Body Weight calculated?",
    a: "We use the Devine formula: Males: IBW = 50 kg + 2.3 kg per inch over 5 feet. Females: IBW = 45.5 kg + 2.3 kg per inch over 5 feet."
  },
  {
    q: "I found a bug or have a suggestion. How do I contact you?",
    a: "Please email us at support@mcsanteplus.com. We read every message and appreciate your feedback!"
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>❓ Frequently Asked Questions</h1>
        <p style={{ color: 'var(--text2)' }}>Everything you need to know about MedUnits Pro</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FAQS.map((faq, i) => (
          <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', gap: 16, textAlign: 'left'
              }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{faq.q}</span>
              {open === i
                ? <ChevronUp size={16} color="var(--accent)" />
                : <ChevronDown size={16} color="var(--text3)" />}
            </button>
            {open === i && (
              <div style={{ padding: '0 20px 16px', fontSize: 13,
                color: 'var(--text2)', lineHeight: 1.7, borderTop: '1px solid var(--border)' }}>
                <div style={{ paddingTop: 12 }}>{faq.a}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: 24, textAlign: 'center', background: 'var(--accent-light)' }}>
        <div style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 8 }}>Still have questions?</div>
        <a href="mailto:support@mcsanteplus.com"
          style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 14 }}>
          support@mcsanteplus.com
        </a>
      </div>
    </div>
  )
}
