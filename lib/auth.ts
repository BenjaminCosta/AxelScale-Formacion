import { db } from "./db"
import { randomBytes } from "crypto"

const SUPER_ADMIN_EMAIL = "benjacostm100@gmail.com"

export async function createMagicLink(email: string) {
  const token = randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

  console.log("[v0] Creating magic link for:", email)
  console.log("[v0] Token:", token)
  console.log("[v0] Expires at:", expiresAt)

  await db.magicLink.create({
    data: {
      token,
      email,
      expiresAt,
    },
  })

  return token
}

export async function verifyMagicLink(token: string) {
  console.log("[v0] Verifying magic link token:", token)

  const magicLink = await db.magicLink.findUnique({
    where: { token },
  })

  if (!magicLink) {
    console.log("[v0] ❌ Token not found in database")
    return { valid: false, error: "Invalid token - not found in database" }
  }

  console.log("[v0] Magic link found:", {
    email: magicLink.email,
    used: magicLink.used,
    expiresAt: magicLink.expiresAt,
    now: new Date(),
  })

  if (magicLink.used) {
    console.log("[v0] ❌ Token already used")
    return { valid: false, error: "Token already used" }
  }

  if (magicLink.expiresAt < new Date()) {
    console.log("[v0] ❌ Token expired")
    return { valid: false, error: "Token expired" }
  }

  // Mark as used
  await db.magicLink.update({
    where: { token },
    data: { used: true },
  })

  console.log("[v0] ✅ Token marked as used")

  // Determine role: ADMIN for super admin email, USER otherwise
  const role = magicLink.email === SUPER_ADMIN_EMAIL ? "ADMIN" : "USER"

  // Create or get user
  let user = await db.user.findUnique({
    where: { email: magicLink.email },
  })

  if (!user) {
    console.log("[v0] Creating new user with email:", magicLink.email, "role:", role)
    user = await db.user.create({
      data: {
        email: magicLink.email,
        role,
      },
    })
  } else {
    // Update role if this is the super admin and role is not set
    if (magicLink.email === SUPER_ADMIN_EMAIL && user.role !== "ADMIN") {
      console.log("[v0] Updating super admin role")
      user = await db.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" },
      })
    }
  }

  console.log("[v0] ✅ User authenticated:", { id: user.id, email: user.email, role: user.role })

  return { valid: true, user }
}

export async function sendMagicLinkEmail(email: string, token: string) {
  const magicUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify?token=${token}`

  console.log("[v0] Magic link generated for:", email)
  console.log("[v0] Magic link URL:", magicUrl)

  // In production, integrate with email service (SendGrid, Resend, etc.)
  // For development, we log the URL
  return magicUrl
}
