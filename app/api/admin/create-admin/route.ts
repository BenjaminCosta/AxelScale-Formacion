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

    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
      include: null,
    })

    if (existingUser) {
      // Update existing user to ADMIN role
      const updatedUser = await db.user.update({
        where: { email },
        data: { role: "ADMIN", name },
      })
      return NextResponse.json({ user: updatedUser, message: "User promoted to admin" })
    }

    // Create new admin user
    const newAdmin = await db.user.create({
      data: {
        email,
        name: name || null,
        role: "ADMIN",
      },
    })

    return NextResponse.json({ user: newAdmin, message: "Admin user created" })
  } catch (error: any) {
    if (error.message.includes("Forbidden") || error.message.includes("Unauthorized")) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }

    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 })
  }
}
