"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] p-4">
      <Card className="w-full max-w-md bg-[rgba(45,45,45,0.95)] border-[#3A3A3A]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
          <CardTitle className="text-2xl text-[#FFFFFF]">Algo salió mal</CardTitle>
          <CardDescription className="text-[#D9D9D9]">
            Ocurrió un error inesperado. Por favor, intenta nuevamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <Button onClick={() => reset()} className="bg-[#00FF9D] hover:bg-[#00E589] text-[#000000] font-semibold">
            Intentar de Nuevo
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
