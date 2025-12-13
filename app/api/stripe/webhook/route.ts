import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import type Stripe from "stripe"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error("[v0] Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string)

        await prisma.subscription.upsert({
          where: { userId: session.metadata!.userId },
          create: {
            userId: session.metadata!.userId,
            plan: session.metadata!.plan,
            status: subscription.status,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscription.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
          update: {
            plan: session.metadata!.plan,
            status: subscription.status,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscription.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        })
        break
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscription.id },
            data: {
              status: subscription.status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
          })
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        if (invoice.subscription) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: invoice.subscription as string },
            data: { status: "past_due" },
          })
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        })
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscription.id },
          data: { status: "canceled" },
        })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("[v0] Error processing webhook:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
