import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
})

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
