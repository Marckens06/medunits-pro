import { createContext, useContext, useEffect, useState } from 'react'
import { type User, onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../utils/firebase'

type Lang = 'en' | 'fr'

interface AuthContextType {
  user: User | null
  plan: 'free' | 'pro'
  loading: boolean
  lang: Lang
  setLang: (l: Lang) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  plan: 'free',
  loading: true,
  lang: 'en',
  setLang: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [plan, setPlan] = useState<'free' | 'pro'>('free')
  const [loading, setLoading] = useState(true)
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u)
      if (u) {
        try {
          const snap = await getDoc(doc(db, 'users', u.uid))
          const data = snap.data()
          setPlan(data?.plan === 'pro' ? 'pro' : 'free')
        } catch {
          setPlan('free')
        }
      } else {
        setPlan('free')
      }
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, plan, loading, lang, setLang, logout: () => signOut(auth) }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
