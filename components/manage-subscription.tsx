"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Ban } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ManageSubscriptionProps {
  userId: string
  userEmail: string
  currentPlan?: string
  currentStatus?: string
  currentEndDate?: Date
}

export function ManageSubscription({ 
  userId, 
  userEmail, 
  currentPlan, 
  currentStatus,
  currentEndDate 
}: ManageSubscriptionProps) {
  const [open, setOpen] = useState(false)
  const [plan, setPlan] = useState(currentPlan || "monthly")
  const [status, setStatus] = useState(currentStatus || "active")
  const [daysValid, setDaysValid] = useState("30")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleUpdateSubscription = async () => {
    setLoading(true)
    setMessage("")

    try {
      const currentPeriodEnd = new Date()
      currentPeriodEnd.setDate(currentPeriodEnd.getDate() + parseInt(daysValid))

      const response = await fetch("/api/admin/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          plan,
          status,
          currentPeriodEnd: currentPeriodEnd.toISOString(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update subscription")
      }

      setMessage(data.message || "Subscription updated successfully")

      setTimeout(() => {
        setOpen(false)
        window.location.reload()
      }, 1500)
    } catch (error: any) {
      setMessage(error.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelAccess = async () => {
    if (!confirm(`¿Seguro que quieres cancelar el acceso de ${userEmail}?`)) {
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(`/api/admin/subscription?userId=${userId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to cancel access")
      }

      setMessage(data.message || "Access canceled successfully")

      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error: any) {
      setMessage(error.message || "An error occurred")
      setLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <CreditCard className="w-4 h-4 mr-1" />
            Gestionar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-[#2A2A2A]">
          <DropdownMenuItem 
            onClick={() => setOpen(true)}
            className="text-white cursor-pointer hover:bg-[#2A2A2A]"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Actualizar Suscripción
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={handleCancelAccess}
            className="text-red-400 cursor-pointer hover:bg-[#2A2A2A]"
            disabled={!currentStatus || currentStatus === "canceled"}
          >
            <Ban className="w-4 h-4 mr-2" />
            Cancelar Acceso
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#1A1A1A] border-[#2A2A2A] text-white">
          <DialogHeader>
            <DialogTitle className="text-[#FFD700]">Actualizar Suscripción</DialogTitle>
            <DialogDescription className="text-gray-400">
              Usuario: {userEmail}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="plan" className="text-gray-300">
                Plan
              </Label>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger className="bg-[#0A0A0A] border-[#2A2A2A] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectItem value="monthly" className="text-white">Mensual</SelectItem>
                  <SelectItem value="3months" className="text-white">3 Meses</SelectItem>
                  <SelectItem value="12months" className="text-white">12 Meses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status" className="text-gray-300">
                Estado
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-[#0A0A0A] border-[#2A2A2A] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectItem value="active" className="text-white">Activa</SelectItem>
                  <SelectItem value="canceled" className="text-white">Cancelada</SelectItem>
                  <SelectItem value="past_due" className="text-white">Vencida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="daysValid" className="text-gray-300">
                Días de validez desde hoy
              </Label>
              <Input
                id="daysValid"
                type="number"
                min="1"
                placeholder="30"
                value={daysValid}
                onChange={(e) => setDaysValid(e.target.value)}
                className="bg-[#0A0A0A] border-[#2A2A2A] text-white"
              />
              <p className="text-xs text-gray-500">
                Expira el: {new Date(Date.now() + parseInt(daysValid || "30") * 24 * 60 * 60 * 1000).toLocaleDateString("es-ES")}
              </p>
            </div>

            {message && (
              <p
                className={`text-sm ${message.includes("success") || message.includes("updated") ? "text-green-400" : "text-red-400"}`}
              >
                {message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              onClick={handleUpdateSubscription} 
              disabled={loading} 
              className="bg-[#FFD700] text-black hover:bg-[#FFA500]"
            >
              {loading ? "Actualizando..." : "Actualizar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
