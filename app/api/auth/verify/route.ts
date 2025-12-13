import { type NextRequest, NextResponse } from "next/server"
import { verifyMagicLink } from "@/lib/auth"
import { createSession } from "@/lib/session"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    console.log("[v0] POST /api/auth/verify - Received request")
    console.log("[v0] Request body:", body)
    console.log("[v0] Token:", token)

    if (!token || typeof token !== "string") {
      console.log("[v0] ❌ Token validation failed - token missing or invalid type")
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    const result = await verifyMagicLink(token)

    if (!result.valid) {
      console.log("[v0] ❌ Magic link verification failed:", result.error)
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    console.log("[v0] ✅ Magic link verified successfully")

    // Create session
    await createSession(result.user!.id)

    console.log("[v0] ✅ Session created for user:", result.user!.id)

    return NextResponse.json({
      success: true,
      user: {
        id: result.user!.id,
        email: result.user!.email,
        role: result.user!.role,
      },
    })
  } catch (error) {
    console.error("[v0] ❌ Error verifying magic link:", error)
    return NextResponse.json({ error: "Failed to verify magic link" }, { status: 500 })
  }
}
