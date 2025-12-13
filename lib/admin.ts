// Admin utilities and permissions

import { db } from "./db"

const SUPER_ADMIN_EMAIL = "benjacostm100@gmail.com"

export async function isAdmin(email: string): Promise<boolean> {
  // Super admin always has access
  if (email === SUPER_ADMIN_EMAIL) {
    return true
  }

  const user = await db.user.findUnique({
    where: { email },
    include: null,
  })

  return user?.role === "ADMIN"
}

export async function isSuperAdmin(email: string): Promise<boolean> {
  return email === SUPER_ADMIN_EMAIL
}

export async function requireAdmin(email: string | null | undefined) {
  if (!email) {
    throw new Error("Unauthorized: No user email provided")
  }

  const admin = await isAdmin(email)
  if (!admin) {
    throw new Error("Forbidden: Admin access required")
  }
}

export function getPlanDisplayName(plan: string): string {
  const planMap: Record<string, string> = {
    monthly: "Monthly (€49)",
    quarterly: "3 Months (€129)",
    annual: "12 Months (€399)",
  }
  return planMap[plan] || plan
}

export function getStatusBadgeColor(status: string): string {
  const colorMap: Record<string, string> = {
    active: "bg-green-500/20 text-green-400",
    inactive: "bg-gray-500/20 text-gray-400",
    canceled: "bg-red-500/20 text-red-400",
    trialing: "bg-blue-500/20 text-blue-400",
    past_due: "bg-yellow-500/20 text-yellow-400",
  }
  return colorMap[status] || "bg-gray-500/20 text-gray-400"
}

export function getDaysRemaining(endDate: Date): number {
  const now = new Date()
  const diff = endDate.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}
