import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { AppLayoutClient } from "@/components/app-layout-client"
import { getAllModules } from "@/lib/content/axelscale"

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  const isPreview = !process.env.DATABASE_URL

  if (!isPreview && user.role !== "ADMIN") {
    // Check subscription status only in production and only for non-admin users
    const hasSubscription =
      user.subscription && user.subscription.status === "active" && user.subscription.currentPeriodEnd > new Date()

    if (!hasSubscription) {
      redirect("/subscribe")
    }
  }

  // Get modules from content file instead of database
  const modules = getAllModules()

  return (
    <AppLayoutClient user={user} modules={modules}>
      {children}
    </AppLayoutClient>
  )
}
