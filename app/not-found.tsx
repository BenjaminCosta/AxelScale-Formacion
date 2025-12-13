import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] p-4">
      <Card className="w-full max-w-md bg-[rgba(45,45,45,0.95)] border-[#3A3A3A]">
        <CardHeader className="text-center">
          <div className="mb-4">
            <h1 className="font-display text-6xl text-[#DAA520]">404</h1>
          </div>
          <CardTitle className="text-2xl text-[#FFFFFF]">Página No Encontrada</CardTitle>
          <CardDescription className="text-[#D9D9D9]">La página que buscas no existe.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild className="bg-[#00FF9D] hover:bg-[#00E589] text-[#000000] font-semibold">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
