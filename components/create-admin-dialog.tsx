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
import { UserPlus } from "lucide-react"

export function CreateAdminDialog() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create admin")
      }

      setMessage(data.message || "Admin created successfully")
      setEmail("")
      setName("")

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
          Create Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1A1A] border-[#2A2A2A] text-white">
        <DialogHeader>
          <DialogTitle className="text-[#FFD700]">Create Admin User</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a new admin user or promote an existing user to admin role.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0A0A0A] border-[#2A2A2A] text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-300">
                Name (optional)
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Admin Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#0A0A0A] border-[#2A2A2A] text-white"
              />
            </div>
            {message && (
              <p
                className={`text-sm ${message.includes("success") || message.includes("created") || message.includes("promoted") ? "text-green-400" : "text-red-400"}`}
              >
                {message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} className="bg-[#FFD700] text-black hover:bg-[#FFA500]">
              {loading ? "Creating..." : "Create Admin"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
