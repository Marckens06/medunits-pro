export default function Terms() {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>📋 Terms of Service</h1>
        <p style={{ color: 'var(--text3)', fontSize: 13 }}>Last updated: April 28, 2026</p>
      </div>
      {[
        {
          title: "1. Acceptance of Terms",
          content: "By accessing or using MedUnits Pro at medunits.findtheideas.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service."
        },
        {
          title: "2. Medical Disclaimer",
          content: "MedUnits Pro is intended for educational and reference purposes ONLY. It is NOT a medical device and should NOT be used as the sole basis for clinical decisions. Always verify calculations independently and follow your institution's approved protocols. MC Santé Plus Services LLC assumes no liability for clinical decisions made based on this tool."
        },
        {
          title: "3. Subscription Plans & Payments",
          content: "We offer a Free plan and a Pro plan at $4.99/month. Payments are processed securely through Wix Payments. Subscriptions renew automatically each month. You may cancel at any time through your account settings."
        },
        {
          title: "4. Refund Policy",
          content: "All sales are final. We do not offer refunds for partial billing periods or unused subscription time. If you believe a charge was made in error, contact us at support@mcsanteplus.com within 7 days."
        },
        {
          title: "5. Acceptable Use",
          content: "You agree NOT to: use the service for direct patient care without independent verification, enter identifiable patient information into the calculators, attempt to reverse engineer or copy the service, share your account credentials with others, or use the service for any illegal purpose."
        },
        {
          title: "6. Intellectual Property",
          content: "All content, design, and code of MedUnits Pro is the property of MC Santé Plus Services LLC. You may not copy, reproduce, or distribute any part of the service without written permission."
        },
        {
          title: "7. Limitation of Liability",
          content: "MC Santé Plus Services LLC shall not be liable for any damages arising from the use or inability to use this service, including any clinical decisions made based on calculations provided. Use at your own risk."
        },
        {
          title: "8. Changes to Terms",
          content: "We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms."
        },
        {
          title: "9. Contact",
          content: "For questions about these terms: support@mcsanteplus.com | MC Santé Plus Services LLC"
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
