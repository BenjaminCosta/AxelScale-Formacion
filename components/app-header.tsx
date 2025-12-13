"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, User, Shield } from "lucide-react"
import Link from "next/link"

export function AppHeader({ user }: { user: any }) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  const isAdmin = user.role === "ADMIN"

  return (
    <header className="border-b border-[#2D2D2D] bg-[#0D0D0D] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-xl uppercase text-[#DAA520] hidden md:block">AXELSCALE 2.0</h1>
        </div>

        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link href="/app/admin">
              <Button variant="ghost" size="sm" className="text-[#FFD700] hover:text-[#FFA500]">
                <Shield className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Admin Panel</span>
              </Button>
            </Link>
          )}

          <div className="flex items-center gap-2 text-sm text-[#D9D9D9]">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{user.email}</span>
          </div>

          <Button onClick={handleLogout} variant="ghost" size="sm" className="text-[#D9D9D9] hover:text-[#FFFFFF]">
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
