import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { Suspense } from "react"
import CheckoutSuccessContent from "./success-content"

export default async function CheckoutSuccessPage() {
  const user = await getSession()

  if (!user) {
    redirect("/login")
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><p className="text-white">Cargando...</p></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  )
}
