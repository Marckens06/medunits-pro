import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Weight, Thermometer, Droplets, Ruler,
  Calculator, Syringe, Activity, FlaskConical,
  LogOut, Crown, Home, Menu, X, FileText, Shield, HelpCircle
} from 'lucide-react'

const FREE_NAV = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/weight', label: 'Weight', Icon: Weight },
  { to: '/temperature', label: 'Temperature', Icon: Thermometer },
  { to: '/glucose', label: 'Blood Glucose', Icon: Droplets },
  { to: '/height', label: 'Height', Icon: Ruler },
]

const PRO_NAV = [
  { to: '/bmi', label: 'BMI Calculator', Icon: Calculator },
  { to: '/dosage', label: 'Drug Dosage', Icon: Syringe },
  { to: '/ivdrip', label: 'IV Drip Rate', Icon: Activity },
  { to: '/crcl', label: 'CrCl (Cockcroft)', Icon: FlaskConical },
]

const FOOTER_NAV = [
  { to: '/faq', label: 'FAQ', Icon: HelpCircle },
  { to: '/privacy', label: 'Privacy', Icon: Shield },
  { to: '/terms', label: 'Terms', Icon: FileText },
]

export default function Layout() {
  const { user, plan, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: '0 20px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, background: 'var(--accent)',
              borderRadius: 10, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 18
            }}>⚕️</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>MedUnits</div>
              <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>PRO</div>
            </div>
          </div>
          <button onClick={closeMobile}
            style={{ background: 'none', border: 'none', color: 'var(--text2)',
              cursor: 'pointer', display: 'none' }}
            className="mobile-close-btn">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Free nav */}
      <div style={{ padding: '16px 12px 8px' }}>
        <div style={{ fontSize: 10, color: 'var(--text3)', fontWeight: 700,
          letterSpacing: 1, marginBottom: 8, paddingLeft: 8 }}>FREE</div>
        {FREE_NAV.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} end={to === '/'}
            onClick={closeMobile}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, marginBottom: 2,
              textDecoration: 'none', fontSize: 13, fontWeight: 500,
              background: isActive ? 'var(--accent-light)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text2)',
              transition: 'all 0.15s',
            })}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </div>

      {/* Pro nav */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 10, color: 'var(--pro)', fontWeight: 700,
          letterSpacing: 1, marginBottom: 8, paddingLeft: 8 }}>
          <Crown size={10} /> PRO
        </div>
        {PRO_NAV.map(({ to, label, Icon }) => (
          plan === 'pro' ? (
            <NavLink key={to} to={to} onClick={closeMobile}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, marginBottom: 2,
                textDecoration: 'none', fontSize: 13, fontWeight: 500,
                background: isActive ? 'rgba(245,158,11,0.12)' : 'transparent',
                color: isActive ? 'var(--pro)' : 'var(--text2)',
              })}>
              <Icon size={16} />
              {label}
            </NavLink>
          ) : (
            <div key={to} onClick={() => { navigate('/pricing'); closeMobile() }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, marginBottom: 2,
                fontSize: 13, fontWeight: 500, color: 'var(--text3)',
                cursor: 'pointer', justifyContent: 'space-between'
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon size={16} />
                {label}
              </div>
              <span style={{ fontSize: 9, background: 'var(--pro)', color: '#000',
                padding: '2px 5px', borderRadius: 4, fontWeight: 800 }}>PRO</span>
            </div>
          )
        ))}
      </div>

      {/* Footer nav */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
        {FOOTER_NAV.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} onClick={closeMobile}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 12px', borderRadius: 8, marginBottom: 2,
              textDecoration: 'none', fontSize: 12,
              color: isActive ? 'var(--accent)' : 'var(--text3)',
            })}>
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ marginTop: 'auto', padding: '16px 12px',
        borderTop: '1px solid var(--border)' }}>
        {user ? (
          <>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8,
              padding: '0 8px', overflow: 'hidden', textOverflow: 'ellipsis',
              whiteSpace: 'nowrap' }}>{user.email}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6,
              padding: '0 8px', marginBottom: 12 }}>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: plan === 'pro' ? 'var(--pro)' : 'var(--text3)',
                background: plan === 'pro' ? 'rgba(245,158,11,0.15)' : 'var(--bg3)',
                padding: '2px 8px', borderRadius: 6
              }}>{plan === 'pro' ? '⚡ Pro' : 'Free'}</span>
            </div>
            {plan === 'free' && (
              <button className="btn btn-primary" onClick={() => { navigate('/pricing'); closeMobile() }}
                style={{ width: '100%', marginBottom: 8, fontSize: 12 }}>
                <Crown size={13} /> Upgrade to Pro
              </button>
            )}
            <button className="btn btn-ghost" onClick={logout}
              style={{ width: '100%', fontSize: 12 }}>
              <LogOut size={13} /> Logout
            </button>
          </>
        ) : (
          <button className="btn btn-primary" onClick={() => { navigate('/login'); closeMobile() }}
            style={{ width: '100%', fontSize: 12 }}>
            Sign In
          </button>
        )}
      </div>
    </>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Desktop sidebar */}
      <aside className="desktop-sidebar" style={{
        width: 240, background: 'var(--bg2)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', padding: '24px 0', position: 'fixed',
        top: 0, left: 0, height: '100vh', overflowY: 'auto'
      }}>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div onClick={closeMobile} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          zIndex: 40
        }} />
      )}

      {/* Mobile drawer */}
      <aside style={{
        position: 'fixed', top: 0, left: mobileOpen ? 0 : '-280px',
        width: 260, height: '100vh', background: 'var(--bg2)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', padding: '24px 0',
        zIndex: 50, transition: 'left 0.3s ease', overflowY: 'auto'
      }} className="mobile-sidebar">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="mobile-topbar" style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0,
        height: 56, background: 'var(--bg2)', borderBottom: '1px solid var(--border)',
        alignItems: 'center', padding: '0 16px', zIndex: 30,
        justifyContent: 'space-between'
      }}>
        <button onClick={() => setMobileOpen(true)}
          style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer' }}>
          <Menu size={22} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>⚕️</span>
          <span style={{ fontWeight: 800, fontSize: 15 }}>MedUnits</span>
          <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700 }}>PRO</span>
        </div>
        <button className="btn btn-primary" onClick={() => navigate(user ? '/pricing' : '/login')}
          style={{ fontSize: 11, padding: '6px 12px' }}>
          {user ? (plan === 'pro' ? '⚡ Pro' : 'Upgrade') : 'Sign In'}
        </button>
      </div>

      {/* Main content */}
      <main className="main-content" style={{
        marginLeft: 240, flex: 1, padding: '32px 40px',
        maxWidth: 'calc(100vw - 240px)'
      }}>
        <Outlet />
      </main>
    </div>
  )
}
