import { getSession } from "@/lib/session"
import SuccessContent from "@/components/success-content"

export default async function SuccessPage() {
  const user = await getSession()

  // Permitir acceso sin sesión (para usuarios que vienen de Stripe Checkout)
  return <SuccessContent user={user} />
}
