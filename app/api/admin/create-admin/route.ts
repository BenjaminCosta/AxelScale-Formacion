import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { requireAdmin } from "@/lib/admin"
import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check admin permission
    await requireAdmin(user.email)

    const { email, name, role, subscription } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate role
    const userRole = role === "ADMIN" ? "ADMIN" : "USER"

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
      include: { subscription: true },
    })

    if (existingUser) {
      // Update existing user role
      const updatedUser = await db.user.update({
        where: { email },
        data: { role: userRole, name },
      })

      // If subscription data provided, create or update subscription
      if (subscription) {
        const { plan, status, currentPeriodEnd } = subscription
        
        if (existingUser.subscription) {
          // Update existing subscription
          await db.subscription.update({
            where: { userId: existingUser.id },
            data: {
              plan,
              status,
              currentPeriodEnd: new Date(currentPeriodEnd),
            },
          })
        } else {
          // Create new subscription
          await db.subscription.create({
            data: {
              userId: existingUser.id,
              plan,
              status,
              currentPeriodEnd: new Date(currentPeriodEnd),
              stripeCustomerId: null,
              stripeSubscriptionId: null,
            },
          })
        }
      }

      return NextResponse.json({ 
        user: updatedUser, 
        message: userRole === "ADMIN" ? "User promoted to admin" : "User updated" 
      })
    }

    // Create new user
    const newUser = await db.user.create({
      data: {
        email,
        name: name || null,
        role: userRole,
      },
    })

    // If subscription data provided, create subscription
    if (subscription) {
      const { plan, status, currentPeriodEnd } = subscription
      
      await db.subscription.create({
        data: {
          userId: newUser.id,
          plan,
          status,
          currentPeriodEnd: new Date(currentPeriodEnd),
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
      })
    }

    return NextResponse.json({ 
      user: newUser, 
      message: userRole === "ADMIN" ? "Admin user created" : "User created" 
    })
  } catch (error: any) {
    if (error.message.includes("Forbidden") || error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
