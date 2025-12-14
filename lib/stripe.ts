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

export const SUBSCRIPTION_PLANS = {
  monthly: {
    name: "Mensual",
    price: 4900, // €49.00 in cents
    interval: "month" as const,
    description: "Acceso completo por 1 mes",
  },
  "3months": {
    name: "3 Meses",
    price: 12900, // €129.00 in cents
    interval: "month" as const,
    intervalCount: 3,
    description: "Ahorra 12% - Paga cada 3 meses",
  },
  "12months": {
    name: "12 Meses",
    price: 39900, // €399.00 in cents
    interval: "year" as const,
    description: "Ahorra 33% - Pago anual",
  },
}
