"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Users, Crown, RefreshCw, Calendar, CreditCard, Phone, Mail, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getPlanDisplayName, getDaysRemaining } from "@/lib/admin"
import { CreateAdminDialog } from "@/components/create-admin-dialog"
import { useRouter } from "next/navigation"

interface Subscription {
  id: string
  userId: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  plan: string
  status: string
  currentPeriodStart: Date
  currentPeriodEnd: Date
  createdAt: Date
  updatedAt: Date
}

interface AdminUser {
  id: string
  email: string
  name: string | null
  phone: string | null
  role: string
  stripeCustomerId: string | null
  createdAt: Date
  updatedAt: Date
  subscription: Subscription | null
}

interface AdminContentProps {
  users: AdminUser[]
}

export function AdminContent({ users: initialUsers }: AdminContentProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const handleRefresh = async () => {
    setIsRefreshing(true)
    router.refresh()
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const getStatusBadge = (status?: string) => {
    if (!status)
      return (
        <Badge variant="outline" className="text-muted-foreground">
          Sin suscripción
        </Badge>
      )

    switch (status) {
      case "active":
        return <Badge className="bg-[#00FF9D]/20 text-[#00FF9D] border-[#00FF9D]/30">Activa</Badge>
      case "canceled":
        return <Badge variant="destructive">Cancelada</Badge>
      case "past_due":
        return <Badge className="bg-[#DAA520]/20 text-[#DAA520] border-[#DAA520]/30">Vencida</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPlanBadge = (plan?: string) => {
    if (!plan) return "-"

    const planLabels: Record<string, string> = {
      monthly: "Mensual",
      "3months": "3 Meses",
      "12months": "12 Meses",
    }

    return <Badge variant="secondary">{planLabels[plan] || getPlanDisplayName(plan)}</Badge>
  }

  const getDaysRemainingDisplay = (endDate?: Date | null) => {
    if (!endDate) return "-"
    const days = getDaysRemaining(endDate)
    if (days < 0) return <span className="text-destructive">Expirada</span>
    if (days === 0) return <span className="text-[#DAA520]">Hoy</span>
    return <span className="text-[#00FF9D]">{days} días</span>
  }

  const formatDate = (date?: Date | null) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#DAA520]/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#DAA520]" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Panel de Admin</h1>
            <p className="text-muted-foreground">Gestiona usuarios y suscripciones</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </motion.div>

      {/* Add Admin Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6"
      >
        <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Crown className="w-5 h-5 text-[#DAA520]" />
          Crear Nuevo Admin
        </h2>
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <CreateAdminDialog />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          El usuario debe haberse registrado previamente en la plataforma.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Total Usuarios</span>
          </div>
          <p className="text-3xl font-display font-bold text-foreground mt-2">{initialUsers.length}</p>
        </div>
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-[#DAA520]" />
            <span className="text-muted-foreground">Admins</span>
          </div>
          <p className="text-3xl font-display font-bold text-[#DAA520] mt-2">
            {initialUsers.filter((u) => u.role === "ADMIN").length}
          </p>
        </div>
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-[#00FF9D]" />
            <span className="text-muted-foreground">Suscripciones Activas</span>
          </div>
          <p className="text-3xl font-display font-bold text-[#00FF9D] mt-2">
            {initialUsers.filter((u) => u.subscription?.status === "active").length}
          </p>
        </div>
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Sin Suscripción</span>
          </div>
          <p className="text-3xl font-display font-bold text-foreground mt-2">
            {initialUsers.filter((u) => !u.subscription).length}
          </p>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden"
      >
        <div className="p-4 border-b border-border/50">
          <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5" />
            Usuarios ({initialUsers.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Expira</TableHead>
                <TableHead>Días Restantes</TableHead>
                <TableHead>Stripe ID</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Creado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No hay usuarios registrados
                  </TableCell>
                </TableRow>
              ) : (
                initialUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{user.email}</span>
                        </div>
                        {user.name && (
                          <div className="flex items-center gap-2 mt-1">
                            <UserIcon className="w-3 h-3 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{user.name}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.role === "ADMIN" ? (
                        <Badge className="bg-[#DAA520]/20 text-[#DAA520] border-[#DAA520]/30">
                          <Crown className="w-3 h-3 mr-1" />
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="outline">Usuario</Badge>
                      )}
                    </TableCell>
                    <TableCell>{getPlanBadge(user.subscription?.plan)}</TableCell>
                    <TableCell>{getStatusBadge(user.subscription?.status)}</TableCell>
                    <TableCell>{formatDate(user.subscription?.currentPeriodEnd)}</TableCell>
                    <TableCell>{getDaysRemainingDisplay(user.subscription?.currentPeriodEnd)}</TableCell>
                    <TableCell>
                      <span className="text-xs text-muted-foreground font-mono">
                        {user.subscription?.stripeCustomerId || user.stripeCustomerId || "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.phone ? (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{user.phone}</span>
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  )
}
