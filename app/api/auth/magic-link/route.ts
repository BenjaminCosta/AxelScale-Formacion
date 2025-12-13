import { type NextRequest, NextResponse } from "next/server"
import { createMagicLink, sendMagicLinkEmail } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    console.log("[v0] POST /api/auth/magic-link - Received request for email:", email)

    if (!email || typeof email !== "string") {
      console.log("[v0] ❌ Email validation failed")
      return NextResponse.json({ error: "Email es requerido" }, { status: 400 })
    }

    // Check if user exists in database
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      include: { subscription: true },
    })

    if (!user) {
      console.log("[v0] ❌ User not found in database")
      return NextResponse.json({ 
        error: "no_subscription",
        message: "No encontramos una cuenta activa con este email. Por favor, suscríbete primero para acceder a la plataforma." 
      }, { status: 403 })
    }

    // Los admins pueden acceder sin validar suscripción
    const isAdmin = user.role === "ADMIN"

    if (!isAdmin) {
      // Check if user has active subscription (only for non-admin users)
      const hasActiveSubscription = user.subscription 
        && user.subscription.status === "active" 
        && user.subscription.currentPeriodEnd > new Date()

      if (!hasActiveSubscription) {
        console.log("[v0] ❌ User has no active subscription")
        return NextResponse.json({ 
          error: "subscription_inactive",
          message: "Tu suscripción no está activa o ha vencido. Por favor, renueva tu plan para acceder a la plataforma." 
        }, { status: 403 })
      }
    } else {
      console.log("[v0] 👑 Admin user detected - bypassing subscription check")
    }

    // User is valid and has active subscription (or is admin), create magic link
    const token = await createMagicLink(email)
    const magicUrl = await sendMagicLinkEmail(email, token)

    console.log(`[v0] ✅ Magic link created successfully${isAdmin ? ' (admin user)' : ' (active subscriber)'}`)

    return NextResponse.json({
      success: true,
      message: "Magic link sent",
      // In development, return the URL for testing
      magicUrl: process.env.NODE_ENV === "development" ? magicUrl : undefined,
    })
  } catch (error) {
    console.error("[v0] ❌ Error creating magic link:", error)
    return NextResponse.json({ error: "Error al enviar el magic link" }, { status: 500 })
  }
}
