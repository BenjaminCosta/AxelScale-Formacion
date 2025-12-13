import { type NextRequest, NextResponse } from "next/server"
import { stripe, SUBSCRIPTION_PLANS } from "@/lib/stripe"
import { getSession } from "@/lib/session"

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const plan = formData.get("plan") as keyof typeof SUBSCRIPTION_PLANS

    if (!plan || !SUBSCRIPTION_PLANS[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const planDetails = SUBSCRIPTION_PLANS[plan]

    // Create or retrieve customer
    let customerId = user.subscription?.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      })
      customerId = customer.id
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `AXELSCALE 2.0 - ${planDetails.name}`,
              description: planDetails.description,
            },
            unit_amount: planDetails.price,
            recurring: {
              interval: planDetails.interval,
              interval_count: "intervalCount" in planDetails ? planDetails.intervalCount : 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/subscribe`,
      metadata: {
        userId: user.id,
        plan,
      },
    })

    return NextResponse.redirect(session.url!)
  } catch (error: any) {
    console.error("[v0] Error creating checkout session:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
