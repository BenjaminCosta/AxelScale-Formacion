import { type NextRequest, NextResponse } from "next/server"
import { createMagicLink, sendMagicLinkEmail } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    console.log("[v0] POST /api/auth/magic-link - Received request for email:", email)

    if (!email || typeof email !== "string") {
      console.log("[v0] ❌ Email validation failed")
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const token = await createMagicLink(email)
    const magicUrl = await sendMagicLinkEmail(email, token)

    console.log("[v0] ✅ Magic link created successfully")

    return NextResponse.json({
      success: true,
      message: "Magic link sent",
      // In development, return the URL for testing
      magicUrl: process.env.NODE_ENV === "development" ? magicUrl : undefined,
    })
  } catch (error) {
    console.error("[v0] ❌ Error creating magic link:", error)
    return NextResponse.json({ error: "Failed to send magic link" }, { status: 500 })
  }
}
