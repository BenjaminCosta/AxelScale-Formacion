import { getSession } from "@/lib/session"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Calendar, CreditCard, Sparkles, Zap, Crown } from "lucide-react"
import { SUBSCRIPTION_PLANS } from "@/lib/stripe"
import Link from "next/link"

export default async function SubscribePage() {
  const user = await getSession() // No redirect, make it public

  // Check if user has active subscription (only if logged in)
  const hasActiveSubscription = user?.subscription 
    && user.subscription.status === "active" 
    && user.subscription.currentPeriodEnd > new Date()

  // Get current plan
  const currentPlan = user?.subscription?.plan || null

  // Check if a plan is the active one
  const isActivePlan = (planKey: string) => {
    return hasActiveSubscription && currentPlan === planKey
  }

  // Get plan name if user has a subscription
  const getCurrentPlanName = () => {
    if (!user?.subscription?.plan) return null
    const planKey = user.subscription.plan as keyof typeof SUBSCRIPTION_PLANS
    return SUBSCRIPTION_PLANS[planKey]?.name || "Plan Desconocido"
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-[#000000] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#DAA520]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#00FF9D]/10 rounded-full blur-3xl" />
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

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#DAA520]/10 border border-[#DAA520]/20 mb-4">
              <Sparkles className="h-4 w-4 text-[#DAA520]" />
              <span className="text-sm text-[#DAA520] font-medium">Planes y Precios</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase text-[#FFFFFF]">
              {hasActiveSubscription ? "CAMBIAR DE" : "ELIGE TU"} <span className="text-[#DAA520]">PLAN</span>
            </h1>
            <p className="text-lg text-[#D9D9D9] max-w-2xl mx-auto">
              {hasActiveSubscription 
                ? "Elegí un nuevo plan para renovar o cambiar tu suscripción"
                : "Accedé a todos los módulos, lecciones y soporte 24/7"
              }
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Monthly */}
            <Card className="bg-linear-to-b from-[#1A1A1A] to-[#0D0D0D] border-[#808080]/30 hover:border-[#DAA520] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(218,165,32,0.2)] group">
              <CardHeader className="text-center pb-6 pt-8 relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DAA520]/10 flex items-center justify-center group-hover:bg-[#DAA520]/20 transition-colors">
                  <Zap className="h-8 w-8 text-[#DAA520]" />
                </div>
                <CardTitle className="text-2xl text-[#FFFFFF] mb-2">{SUBSCRIPTION_PLANS.monthly.name}</CardTitle>
                <CardDescription className="text-[#808080]">{SUBSCRIPTION_PLANS.monthly.description}</CardDescription>
                <div className="pt-6">
                  <span className="text-5xl font-bold text-[#DAA520]">€{SUBSCRIPTION_PLANS.monthly.price / 100}</span>
                  <span className="text-[#D9D9D9]">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    Acceso a todos los módulos
                  </li>
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    Plan de 50 días
                  </li>
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    Soporte 24/7
                  </li>
                </ul>
                {user ? (
                  <form action="/api/stripe/create-checkout" method="POST">
                    <input type="hidden" name="plan" value="monthly" />
                    <input type="hidden" name="userId" value={user.id} />
                    <Button 
                      type="submit" 
                      className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-[#000000] font-bold h-12"
                      disabled={isActivePlan("monthly")}
                    >
                      {isActivePlan("monthly") ? "✓ Plan Actual" : "Seleccionar Plan"}
                    </Button>
                  </form>
                ) : (
                  <Link href="/login">
                    <Button className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-[#000000] font-bold h-12">
                      Iniciar Sesión
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* 3 Months - Popular */}
            <Card className="bg-linear-to-b from-[#1A1A1A] to-[#0D0D0D] border-[#00FF9D] border-2 relative hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(0,255,157,0.2)] group">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00FF9D] text-[#000000] px-6 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(0,255,157,0.4)]">
                MÁS POPULAR
              </div>
              <CardHeader className="text-center pb-6 pt-12 relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00FF9D]/10 flex items-center justify-center group-hover:bg-[#00FF9D]/20 transition-colors">
                  <Crown className="h-8 w-8 text-[#00FF9D]" />
                </div>
                <CardTitle className="text-2xl text-[#FFFFFF] mb-2">{SUBSCRIPTION_PLANS["3months"].name}</CardTitle>
                <CardDescription className="text-[#808080]">{SUBSCRIPTION_PLANS["3months"].description}</CardDescription>
                <div className="pt-6">
                  <span className="text-5xl font-bold text-[#00FF9D]">€{SUBSCRIPTION_PLANS["3months"].price / 100}</span>
                  <span className="text-[#D9D9D9]">/3 meses</span>
                </div>
                <p className="text-sm text-[#DAA520] pt-3 font-medium">€43/mes - Ahorrás €18</p>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    Acceso a todos los módulos
                  </li>
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    Plan de 50 días
                  </li>
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    Soporte 24/7
                  </li>
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    <strong>Ahorrás 12%</strong>
                  </li>
                </ul>
                {user ? (
                  <form action="/api/stripe/create-checkout" method="POST">
                    <input type="hidden" name="plan" value="3months" />
                    <input type="hidden" name="userId" value={user.id} />
                    <Button 
                      type="submit" 
                      className="w-full bg-[#00FF9D] hover:bg-[#00E589] text-[#000000] font-bold h-12 shadow-[0_0_20px_rgba(0,255,157,0.2)]"
                      disabled={isActivePlan("3months")}
                    >
                      {isActivePlan("3months") ? "✓ Plan Actual" : "Seleccionar Plan"}
                    </Button>
                  </form>
                ) : (
                  <Link href="/login">
                    <Button className="w-full bg-[#00FF9D] hover:bg-[#00E589] text-[#000000] font-bold h-12 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
                      Iniciar Sesión
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* 12 Months - Best Value */}
            <Card className="bg-linear-to-b from-[#1A1A1A] to-[#0D0D0D] border-[#808080]/30 hover:border-[#DAA520] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(218,165,32,0.2)] group">
              <CardHeader className="text-center pb-6 pt-8 relative">
                <div className="absolute top-4 right-4 bg-[#DAA520]/20 text-[#DAA520] px-3 py-1 rounded-full text-xs font-bold">
                  MEJOR VALOR
                </div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#DAA520]/10 flex items-center justify-center group-hover:bg-[#DAA520]/20 transition-colors">
                  <Crown className="h-8 w-8 text-[#DAA520]" />
                </div>
                <CardTitle className="text-2xl text-[#FFFFFF] mb-2">{SUBSCRIPTION_PLANS["12months"].name}</CardTitle>
                <CardDescription className="text-[#808080]">{SUBSCRIPTION_PLANS["12months"].description}</CardDescription>
                <div className="pt-6">
                  <span className="text-5xl font-bold text-[#DAA520]">€{SUBSCRIPTION_PLANS["12months"].price / 100}</span>
                  <span className="text-[#D9D9D9]">/año</span>
                </div>
                <p className="text-sm text-[#00FF9D] pt-3 font-medium">€33/mes - Ahorrás €192</p>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    Acceso a todos los módulos
                  </li>
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    Plan de 50 días
                  </li>
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    Soporte 24/7
                  </li>
                  <li className="flex items-center gap-3 text-[#D9D9D9]">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-[#00FF9D]" />
                    </div>
                    <strong>Ahorrás 33%</strong>
                  </li>
                </ul>
                {user ? (
                  <form action="/api/stripe/create-checkout" method="POST">
                    <input type="hidden" name="plan" value="12months" />
                    <input type="hidden" name="userId" value={user.id} />
                    <Button 
                      type="submit" 
                      className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-[#000000] font-bold h-12"
                      disabled={isActivePlan("12months")}
                    >
                      {isActivePlan("12months") ? "✓ Plan Actual" : "Seleccionar Plan"}
                    </Button>
                  </form>
                ) : (
                  <Link href="/login">
                    <Button className="w-full bg-[#DAA520] hover:bg-[#B8860B] text-[#000000] font-bold h-12">
                      Iniciar Sesión
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Current Plan Card - Show if user has active subscription */}
          {hasActiveSubscription && user && (
            <div className="mb-12">
              <Card className="bg-[#1A1A1A] border-[#DAA520] border-2 shadow-[0_0_30px_rgba(218,165,32,0.1)]">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <CardTitle className="text-2xl text-white flex items-center gap-2">
                        <CreditCard className="h-6 w-6 text-[#DAA520]" />
                        Tu Plan Actual
                      </CardTitle>
                      <CardDescription className="text-[#D9D9D9] mt-2">
                        Estado de tu suscripción
                      </CardDescription>
                    </div>
                    <div className="bg-[#00FF9D]/20 text-[#00FF9D] px-4 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(0,255,157,0.2)]">
                      ACTIVO
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-[#808080]">Plan</p>
                      <p className="text-xl font-bold text-[#DAA520]">{getCurrentPlanName()}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-[#808080] flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Fecha de Vencimiento
                      </p>
                      <p className="text-xl font-bold text-white">
                        {user.subscription?.currentPeriodEnd && formatDate(user.subscription.currentPeriodEnd)}
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#808080]/30">
                    <Link href="/app">
                      <Button className="bg-[#DAA520] hover:bg-[#B8860B] text-black font-bold">
                        Volver al Dashboard
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        
        </div>
      </div>
    </div>
  )
}
