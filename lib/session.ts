import { cookies } from "next/headers"
import { db } from "./db"

const SESSION_COOKIE_NAME = "axelscale_session"
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days

export async function createSession(userId: string) {
  const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, `${userId}:${sessionToken}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  })

  return sessionToken
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!sessionCookie) {
    return null
  }

  const [userId] = sessionCookie.value.split(":")

  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
    },
  })

  return user
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function hasActiveSubscription(userId: string, userRole?: string) {
  // Admins have access regardless of subscription
  if (userRole === "ADMIN") {
    return true
  }

  const subscription = await db.subscription.findUnique({
    where: { userId },
  })

  if (!subscription) {
    return false
  }

  return subscription.status === "active" && subscription.currentPeriodEnd > new Date()
}
