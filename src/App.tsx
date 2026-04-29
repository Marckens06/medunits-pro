import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Weight from './pages/Weight'
import Temperature from './pages/Temperature'
import BloodGlucose from './pages/BloodGlucose'
import Height from './pages/Height'
import BMI from './pages/BMI'
import Dosage from './pages/Dosage'
import IVDrip from './pages/IVDrip'
import CrCl from './pages/CrCl'
import Login from './pages/Login'
import Pricing from './pages/Pricing'
import FAQ from './pages/FAQ'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Reference from './pages/Reference'
import './styles/globals.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/weight" element={<Weight />} />
            <Route path="/temperature" element={<Temperature />} />
            <Route path="/glucose" element={<BloodGlucose />} />
            <Route path="/height" element={<Height />} />
            <Route path="/bmi" element={<BMI />} />
            <Route path="/dosage" element={<Dosage />} />
            <Route path="/ivdrip" element={<IVDrip />} />
            <Route path="/crcl" element={<CrCl />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/reference"     element={<Reference />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
