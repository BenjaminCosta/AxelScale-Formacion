import Stripe from "stripe"

// Lazy loading de Stripe - no rompe el build si no hay keys
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY
  
  if (!key) {
    console.warn("[Stripe] STRIPE_SECRET_KEY no configurada - Stripe deshabilitado")
    return null
  }

  // Singleton: solo crear instancia una vez
  if (!stripeInstance) {
    stripeInstance = new Stripe(key, {
      apiVersion: "2025-11-17.clover",
    })
  }

  return stripeInstance
}

// Export legacy para backward compatibility (deprecated)
export const stripe = getStripe()

// Plan type definition
export type PlanType = "monthly" | "quarterly" | "annual"

// Stripe Price IDs desde environment variables
export const STRIPE_PRICES = {
  monthly: process.env.PRICE_MONTHLY || "",
  quarterly: process.env.PRICE_QUARTERLY || "",
  annual: process.env.PRICE_ANNUAL || "",
} as const

// Plan metadata (para display en UI)
export const SUBSCRIPTION_PLANS = {
  monthly: {
    name: "1 Mes",
    priceDisplay: "100€",
    duration: "1 mes",
    description: "Acceso completo a Axelscale",
    priceId: STRIPE_PRICES.monthly,
  },
  quarterly: {
    name: "3 Meses",
    priceDisplay: "200€",
    duration: "3 meses",
    description: "Acceso completo a Axelscale",
    badge: "MÁS POPULAR",
    priceId: STRIPE_PRICES.quarterly,
  },
  annual: {
    name: "1 Año",
    priceDisplay: "750€",
    duration: "12 meses",
    description: "Acceso completo a AxelScale",
    priceId: STRIPE_PRICES.annual,
  },
} as const

// Validar que un plan es válido
export function isValidPlan(plan: string): plan is PlanType {
  return plan === "monthly" || plan === "quarterly" || plan === "annual"
}
