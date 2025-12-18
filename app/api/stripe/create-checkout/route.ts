import { type NextRequest, NextResponse } from "next/server"
import { getStripe, STRIPE_PRICES, isValidPlan, type PlanType } from "@/lib/stripe"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe()

    if (!stripe) {
      console.error("[Stripe] Intento de crear checkout sin Stripe configurado")
      return NextResponse.json(
        { 
          ok: false, 
          error: "Stripe no configurado todavía. Por favor, contacta al administrador." 
        },
        { status: 501 }
      )
    }

    const body = await request.json()
    const { plan, email } = body

    // Validar plan
    if (!plan || !isValidPlan(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    // Validar email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    // Obtener priceId desde env
    const priceId = STRIPE_PRICES[plan as PlanType]

    if (!priceId) {
      console.error(`[Stripe] Price ID no configurado para plan: ${plan}`)
      return NextResponse.json(
        { error: `Plan ${plan} no configurado correctamente` },
        { status: 500 }
      )
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    console.log("[Stripe Checkout] Creating session for:", email, "plan:", plan, "priceId:", priceId)

    // Crear Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/subscribe`,
      metadata: {
        plan,
        email,
      },
    })

    if (!session.url) {
      throw new Error("No se pudo generar URL de checkout")
    }

    console.log("[Stripe Checkout] Session created:", session.id, "URL:", session.url)

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error("[Stripe] Error creating checkout session:", error)
    return NextResponse.json(
      { error: error.message || "Error al crear sesión de pago" },
      { status: 500 }
    )
  }
}
