"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function VerifyContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("No se proporcionó un token de verificación")
      return
    }

    const verify = async () => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Error en la verificación")
        }

        setStatus("success")
        setMessage("¡Verificación exitosa!")

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/app")
        }, 2000)
      } catch (err: any) {
        setStatus("error")
        setMessage(err.message || "El enlace es inválido o ha expirado")
      }
    }

    verify()
  }, [token, router])

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#DAA520]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#00FF9D]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(218,165,32,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(218,165,32,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#DAA520] to-[#B8860B] flex items-center justify-center">
              <span className="text-2xl font-bold text-black">A</span>
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">AXELSCALE</span>
          </Link>

          {/* Card */}
          <div className="bg-[#1A1A1A] rounded-3xl p-8 sm:p-10 border border-[#808080]/30">
            {status === "loading" && (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-[#DAA520]/20 flex items-center justify-center mx-auto mb-8"
                >
                  <Loader2 className="h-12 w-12 text-[#DAA520] animate-spin" />
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-2">
                  Verificando...
                </h1>
                <p className="text-[#808080]">
                  Estamos validando tu enlace de acceso
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-[#00FF9D]/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,255,157,0.3)]"
                >
                  <CheckCircle className="h-12 w-12 text-[#00FF9D]" />
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-2">
                  {message}
                </h1>
                <p className="text-[#808080] mb-6">
                  Redirigiendo al dashboard...
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-[#DAA520]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Un momento...</span>
                </div>
              </>
            )}

            {status === "error" && (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-8"
                >
                  <XCircle className="h-12 w-12 text-red-500" />
                </motion.div>

                <h1 className="text-3xl font-bold text-white mb-2">
                  Error de Verificación
                </h1>
                <p className="text-[#808080] mb-8">
                  {message}
                </p>

                <Link href="/login">
                  <Button 
                    size="lg" 
                    className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-black font-bold"
                  >
                    Volver al Login
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#000000] flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin text-[#DAA520]" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  )
}
