import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { requireAdmin } from "@/lib/admin"
import { db } from "@/lib/db"

// Update or create subscription for a user
export async function POST(request: Request) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check admin permission
    await requireAdmin(user.email)

    const { userId, plan, status, currentPeriodEnd } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Check if user exists
    const targetUser = await db.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    })

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Calculate end date
    let endDate = currentPeriodEnd ? new Date(currentPeriodEnd) : undefined

    if (status === "active" && !endDate) {
      // Default to 30 days from now if activating without end date
      endDate = new Date()
      endDate.setDate(endDate.getDate() + 30)
    }

    if (status === "canceled" && !currentPeriodEnd) {
      // If canceling without specific end date, set to now
      endDate = new Date()
    }

    if (targetUser.subscription) {
      // Update existing subscription
      const updatedSubscription = await db.subscription.update({
        where: { userId },
        data: {
          plan: plan || targetUser.subscription.plan,
          status: status || targetUser.subscription.status,
          currentPeriodEnd: endDate || targetUser.subscription.currentPeriodEnd,
        },
      })

      return NextResponse.json({ 
        subscription: updatedSubscription, 
        message: "Subscription updated successfully" 
      })
    } else {
      // Create new subscription
      const newSubscription = await db.subscription.create({
        data: {
          userId,
          plan: plan || "monthly",
          status: status || "active",
          currentPeriodEnd: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          stripeCustomerId: "",
          stripeSubscriptionId: "",
        },
      })

      return NextResponse.json({ 
        subscription: newSubscription, 
        message: "Subscription created successfully" 
      })
    }
  } catch (error: any) {
    console.error("Subscription update error:", error)
    
    if (error.message.includes("Forbidden") || error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }
}

// Cancel subscription (set status to canceled)
export async function DELETE(request: Request) {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check admin permission
    await requireAdmin(user.email)

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Check if user exists
    const targetUser = await db.user.findUnique({
      where: { id: userId },
      include: { subscription: true },
    })

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (!targetUser.subscription) {
      return NextResponse.json({ error: "User has no subscription" }, { status: 400 })
    }

    // Cancel subscription
    const canceledSubscription = await db.subscription.update({
      where: { userId },
      data: {
        status: "canceled",
        currentPeriodEnd: new Date(), // Set to now
      },
    })

    return NextResponse.json({ 
      subscription: canceledSubscription, 
      message: "Access canceled successfully" 
    })
  } catch (error: any) {
    console.error("Subscription cancel error:", error)
    
    if (error.message.includes("Forbidden") || error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 })
  }
}
