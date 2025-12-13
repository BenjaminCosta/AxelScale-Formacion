"use client"

import type React from "react"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"

interface AppLayoutClientProps {
  user: any
  modules: any[]
  children: React.ReactNode
}

export function AppLayoutClient({ user, modules, children }: AppLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#000000] flex w-full">
      <AppSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} user={user} modules={modules} />

      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-10 max-w-6xl mx-auto pb-20">{children}</div>
        </main>
      </div>
    </div>
  )
}
