import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { isAdmin } from "@/lib/admin"
import { db } from "@/lib/db"
import { AdminContent } from "@/components/admin-content"

export default async function AdminPage() {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  const hasAdminAccess = await isAdmin(user.email)

  if (!hasAdminAccess) {
    redirect("/app")
  }

  // Fetch all users
  const users = await db.user.findMany({
    include: { subscription: true },
    orderBy: { createdAt: "desc" },
  })

  return <AdminContent users={users} />
}
