"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    // Dar tiempo para que el webhook procese la suscripción
    const timer = setTimeout(() => {
      setIsVerifying(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-[#1A1A1A] border-[#DAA520]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {isVerifying ? (
              <Loader2 className="h-16 w-16 text-[#DAA520] animate-spin" />
            ) : (
              <CheckCircle className="h-16 w-16 text-[#00FF9D]" />
            )}
          </div>
          <CardTitle className="text-2xl text-white">
            {isVerifying ? "Verificando pago..." : "¡Pago exitoso!"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {isVerifying 
              ? "Estamos procesando tu suscripción. Esto solo tomará unos segundos."
              : "Tu suscripción ha sido activada correctamente"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isVerifying && (
            <>
              <div className="bg-[#0D0D0D] p-4 rounded-lg border border-[#2D2D2D]">
                <p className="text-sm text-gray-400 mb-2">Estado de la suscripción</p>
                <p className="text-lg font-semibold text-[#00FF9D]">Activa</p>
              </div>

              <div className="bg-[#0D0D0D] p-4 rounded-lg border border-[#2D2D2D]">
                <p className="text-sm text-gray-400 mb-2">Próximos pasos</p>
                <ul className="text-sm text-white space-y-2">
                  <li>✓ Acceso completo a todo el contenido</li>
                  <li>✓ Comienza tu formación ahora</li>
                  <li>✓ Gestiona tu suscripción en cualquier momento</li>
                </ul>
              </div>

              {sessionId && (
                <div className="bg-[#0D0D0D] p-4 rounded-lg border border-[#2D2D2D]">
                  <p className="text-xs text-gray-500 mb-1">ID de sesión:</p>
                  <p className="text-xs text-gray-400 font-mono break-all">{sessionId}</p>
                </div>
              )}

              <div className="pt-4 space-y-3">
                <Link href="/app" className="block">
                  <Button 
                    className="w-full bg-gradient-to-r from-[#DAA520] to-[#B8860B] hover:from-[#B8860B] hover:to-[#DAA520] text-black font-bold"
                  >
                    Ir a mi formación
                  </Button>
                </Link>
                
                <Link href="/app/admin" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#2D2D2D] text-white hover:bg-[#2D2D2D]"
                  >
                    Ver mi cuenta
                  </Button>
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
