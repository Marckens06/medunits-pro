export default function Privacy() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔒 Privacy Policy</h1>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>Last updated: April 28, 2026</p>
      </div>
      {[
        {
          title: "1. Information We Collect",
          content: "We collect only the information necessary to provide our service: your email address and authentication data when you create an account, and your subscription plan status. We do not collect, store, or transmit any patient data, clinical calculations, or health information you enter into the calculators."
        },
        {
          title: "2. How We Use Your Information",
          content: "Your information is used solely to: authenticate your account, determine your subscription plan and access level, and communicate important service updates. We do not sell, rent, or share your personal information with third parties."
        },
        {
          title: "3. Data Storage & Security",
          content: "Account data is stored securely using Google Firebase, which employs industry-standard encryption. All data is transmitted over HTTPS. We do not store any calculation inputs or medical data you enter into our tools."
        },
        {
          title: "4. Medical Disclaimer",
          content: "MedUnits Pro is intended for educational and reference purposes only. No patient-identifiable information should be entered into this tool. The calculations provided are not a substitute for clinical judgment or your institution's approved protocols."
        },
        {
          title: "5. Cookies",
          content: "We use only essential cookies required for authentication and session management. We do not use tracking cookies or advertising cookies."
        },
        {
          title: "6. Third-Party Services",
          content: "We use Google Firebase for authentication and data storage, and Wix Payments for subscription billing. These services have their own privacy policies. Payment information is handled entirely by Wix and we never store your payment details."
        },
        {
          title: "7. Your Rights",
          content: "You may request deletion of your account and all associated data at any time by contacting us at support@mcsanteplus.com. We will process your request within 30 days."
        },
        {
          title: "8. Contact",
          content: "For privacy-related questions, contact us at: support@mcsanteplus.com | MC Santé Plus Services LLC"
        },
      ].map(({ title, content }) => (
        <div key={title} className="card" style={{ marginBottom: 12 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: 'var(--accent)' }}>{title}</h2>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7 }}>{content}</p>
        </div>
      ))}
    </div>
  )
}
