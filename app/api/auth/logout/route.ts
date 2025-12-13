import { type NextRequest, NextResponse } from "next/server"
import { deleteSession } from "@/lib/session"

export async function POST(request: NextRequest) {
  try {
    await deleteSession()

    // Redirect to login page after logout
    return NextResponse.redirect(new URL("/login", request.url))
  } catch (error) {
    console.error("[v0] Error logging out:", error)
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 })
  }
}
