"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, Loader2, AlertCircle, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type ErrorType = "no_subscription" | "subscription_inactive" | "general" | null

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [errorType, setErrorType] = useState<ErrorType>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setErrorType(null)

    try {
      const response = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Set specific error type from response
        if (data.error === "no_subscription") {
          setErrorType("no_subscription")
          setError(data.message || "No encontramos una cuenta activa")
        } else if (data.error === "subscription_inactive") {
          setErrorType("subscription_inactive")
          setError(data.message || "Tu suscripción no está activa")
        } else {
          setErrorType("general")
          setError(data.message || data.error || "Error al enviar magic link")
        }
        throw new Error(data.error)
      }

      setSent(true)
      console.log("[v0] Magic link:", data.magicUrl)
    } catch (err: any) {
      // Error already set above
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }
  }

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
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
            {!sent ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#DAA520]/10 flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-7 w-7 text-[#DAA520]" />
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Iniciar Sesión
                  </h1>
                  <p className="text-[#808080]">
                    Ingresá tu email para recibir un enlace de acceso seguro
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 bg-[#000000] border-[#808080]/50 focus:border-[#DAA520] text-white placeholder:text-[#808080]"
                      disabled={loading}
                      required
                    />
                  </div>

                  {error && (
                    <div className={`p-4 rounded-lg border ${
                      errorType === "no_subscription" || errorType === "subscription_inactive"
                        ? "bg-amber-500/10 border-amber-500/30"
                        : "bg-red-500/10 border-red-500/30"
                    }`}>
                      <div className="flex items-start gap-3">
                        {errorType === "no_subscription" || errorType === "subscription_inactive" ? (
                          <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 space-y-2">
                          <p className={`text-sm font-medium ${
                            errorType === "no_subscription" || errorType === "subscription_inactive"
                              ? "text-amber-500"
                              : "text-red-500"
                          }`}>
                            {error}
                          </p>
                          {errorType === "no_subscription" && (
                            <Link href="/subscribe">
                              <Button 
                                size="sm" 
                                className="bg-[#DAA520] hover:bg-[#B8860B] text-black font-bold mt-2"
                              >
                                Ver Planes y Suscribirse
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </Link>
                          )}
                          {errorType === "subscription_inactive" && (
                            <Link href="/subscribe">
                              <Button 
                                size="sm" 
                                className="bg-[#00FF9D] hover:bg-[#00E589] text-black font-bold mt-2"
                              >
                                Renovar Suscripción
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-black font-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Magic Link
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-center text-sm text-[#808080] mt-6">
                  ¿No tenés cuenta?{" "}
                  <Link href="/subscribe" className="text-[#DAA520] hover:underline">
                    Ver planes
                  </Link>
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#00FF9D]/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-[#00FF9D]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  ¡Revisá tu email!
                </h2>
                <p className="text-[#808080] mb-6">
                  Hemos enviado un enlace de acceso a{" "}
                  <span className="text-white font-medium">{email}</span>
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSent(false)
                    setEmail("")
                  }}
                  className="border-[#808080] text-[#808080] hover:bg-[#1A1A1A] hover:text-white"
                >
                  Usar otro email
                </Button>
              </div>
            )}
          </div>

          {/* Support */}
          <p className="text-center text-sm text-[#808080] mt-8">
            ¿Necesitás ayuda?{" "}
            <a
              href="https://wa.me/34626040664"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00FF9D] hover:underline"
            >
              Contactar soporte
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
