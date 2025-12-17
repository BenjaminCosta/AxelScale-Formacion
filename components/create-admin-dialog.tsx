"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus } from "lucide-react"

export function CreateAdminDialog() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("USER")
  const [withSubscription, setWithSubscription] = useState(false)
  const [plan, setPlan] = useState("monthly")
  const [status, setStatus] = useState("active")
  const [daysValid, setDaysValid] = useState("30")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const body: any = { email, name, role }

      if (withSubscription) {
        const currentPeriodEnd = new Date()
        currentPeriodEnd.setDate(currentPeriodEnd.getDate() + parseInt(daysValid))

        body.subscription = {
          plan,
          status,
          currentPeriodEnd: currentPeriodEnd.toISOString(),
        }
      }

      const response = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user")
      }

      setMessage(data.message || "User created successfully")
      setEmail("")
      setName("")
      setRole("USER")
      setWithSubscription(false)
      setPlan("monthly")
      setStatus("active")
      setDaysValid("30")

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#FFD700] text-black hover:bg-[#FFA500]">
          <UserPlus className="mr-2 h-4 w-4" />
          Crear Usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1A1A] border-[#2A2A2A] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#FFD700]">Crear Usuario</DialogTitle>
          <DialogDescription className="text-gray-400">
            Crea un nuevo usuario o actualiza uno existente. Puedes asignar rol y suscripción manual.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-300">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0A0A0A] border-[#2A2A2A] text-white"
              />
            </div>

            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-300">
                Nombre (opcional)
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Nombre del usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#0A0A0A] border-[#2A2A2A] text-white"
              />
            </div>

            {/* Role */}
            <div className="grid gap-2">
              <Label htmlFor="role" className="text-gray-300">
                Rol *
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="bg-[#0A0A0A] border-[#2A2A2A] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                  <SelectItem value="USER" className="text-white">Usuario</SelectItem>
                  <SelectItem value="ADMIN" className="text-white">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subscription checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="withSubscription"
                checked={withSubscription}
                onCheckedChange={(checked) => setWithSubscription(checked as boolean)}
                className="border-[#2A2A2A]"
              />
              <Label htmlFor="withSubscription" className="text-gray-300 cursor-pointer">
                Asignar suscripción manual
              </Label>
            </div>

            {/* Subscription fields */}
            {withSubscription && (
              <div className="grid gap-4 p-4 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg">
                <div className="grid gap-2">
                  <Label htmlFor="plan" className="text-gray-300">
                    Plan
                  </Label>
                  <Select value={plan} onValueChange={setPlan}>
                    <SelectTrigger className="bg-[#1A1A1A] border-[#2A2A2A] text-white">
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
                    <SelectTrigger className="bg-[#1A1A1A] border-[#2A2A2A] text-white">
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
                    Días de validez
                  </Label>
                  <Input
                    id="daysValid"
                    type="number"
                    min="1"
                    placeholder="30"
                    value={daysValid}
                    onChange={(e) => setDaysValid(e.target.value)}
                    className="bg-[#1A1A1A] border-[#2A2A2A] text-white"
                  />
                  <p className="text-xs text-gray-500">
                    Expira el: {new Date(Date.now() + parseInt(daysValid || "30") * 24 * 60 * 60 * 1000).toLocaleDateString("es-ES")}
                  </p>
                </div>
              </div>
            )}

            {message && (
              <p
                className={`text-sm ${message.includes("success") || message.includes("created") || message.includes("promoted") || message.includes("updated") ? "text-green-400" : "text-red-400"}`}
              >
                {message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="bg-[#FFD700] text-black hover:bg-[#FFA500]">
              {loading ? "Creando..." : "Crear Usuario"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
