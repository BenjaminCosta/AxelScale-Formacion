import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import SuccessContent from "@/components/success-content"

export default async function SuccessPage() {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  return <SuccessContent />
}
