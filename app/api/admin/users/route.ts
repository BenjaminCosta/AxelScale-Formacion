import { NextResponse } from "next/server"
import { getSession } from "@/lib/session"
import { requireAdmin } from "@/lib/admin"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const user = await getSession()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check admin permission
    await requireAdmin(user.email)

    // Fetch all users with subscriptions
    const users = await db.user.findMany({
      include: { subscription: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ users })
  } catch (error: any) {
    if (error.message.includes("Forbidden") || error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
