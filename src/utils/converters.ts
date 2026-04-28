// ── Weight ──────────────────────────────────────────────
export const kgToLbs = (kg: number) => +(kg * 2.20462).toFixed(2)
export const lbsToKg = (lbs: number) => +(lbs / 2.20462).toFixed(2)
export const kgToOz = (kg: number) => +(kg * 35.274).toFixed(2)
export const ozToKg = (oz: number) => +(oz / 35.274).toFixed(2)
export const lbsToOz = (lbs: number) => +(lbs * 16).toFixed(2)
export const ozToLbs = (oz: number) => +(oz / 16).toFixed(2)

// ── Temperature ─────────────────────────────────────────
export const cToF = (c: number) => +(c * 9/5 + 32).toFixed(1)
export const fToC = (f: number) => +((f - 32) * 5/9).toFixed(1)
export const cToK = (c: number) => +(c + 273.15).toFixed(2)
export const kToC = (k: number) => +(k - 273.15).toFixed(2)

// ── Blood Glucose ────────────────────────────────────────
export const mgdlToMmol = (mgdl: number) => +(mgdl / 18.0182).toFixed(2)
export const mmolToMgdl = (mmol: number) => +(mmol * 18.0182).toFixed(1)

// ── Height ───────────────────────────────────────────────
export const cmToInches = (cm: number) => +(cm / 2.54).toFixed(1)
export const inchesToCm = (inches: number) => +(inches * 2.54).toFixed(1)
export const cmToFtIn = (cm: number) => {
  const totalInches = cm / 2.54
  const ft = Math.floor(totalInches / 12)
  const inches = +(totalInches % 12).toFixed(1)
  return { ft, inches }
}
export const ftInToCm = (ft: number, inches: number) => +((ft * 12 + inches) * 2.54).toFixed(1)

// ── PRO: BMI ─────────────────────────────────────────────
export const calcBMI = (weightKg: number, heightCm: number) => {
  const bmi = weightKg / Math.pow(heightCm / 100, 2)
  return +bmi.toFixed(1)
}
export const bmiCategory = (bmi: number) => {
  if (bmi < 18.5) return { label: 'Underweight', color: '#3b82f6' }
  if (bmi < 25) return { label: 'Normal weight', color: '#10b981' }
  if (bmi < 30) return { label: 'Overweight', color: '#f59e0b' }
  return { label: 'Obese', color: '#ef4444' }
}

// ── PRO: Ideal Body Weight (Devine formula) ──────────────
export const calcIBW = (heightCm: number, sex: 'male' | 'female') => {
  const heightIn = heightCm / 2.54
  const inchesOver5ft = heightIn - 60
  const base = sex === 'male' ? 50 : 45.5
  return +(base + 2.3 * inchesOver5ft).toFixed(1)
}

// ── PRO: Medication Dosage ───────────────────────────────
export const calcDosage = (weightKg: number, dosePerKg: number) =>
  +(weightKg * dosePerKg).toFixed(2)

// ── PRO: IV Drip Rate ────────────────────────────────────
export const calcDripRate = (volumeMl: number, timeHr: number, dropFactor: number) =>
  +((volumeMl * dropFactor) / (timeHr * 60)).toFixed(1)

// ── PRO: Creatinine Clearance (Cockcroft-Gault) ──────────
export const calcCrCl = (
  age: number, weightKg: number, creatinine: number, sex: 'male' | 'female'
) => {
  const crcl = ((140 - age) * weightKg) / (72 * creatinine)
  return +(sex === 'female' ? crcl * 0.85 : crcl).toFixed(1)
}

// ── PRO: Pediatric Dose ──────────────────────────────────
export const calcPedsDose = (weightKg: number, dosePerKg: number, frequency: number) => ({
  singleDose: +(weightKg * dosePerKg).toFixed(2),
  dailyDose: +(weightKg * dosePerKg * frequency).toFixed(2),
})
