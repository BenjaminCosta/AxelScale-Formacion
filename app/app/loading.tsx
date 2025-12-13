import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-[#DAA520] mx-auto" />
        <p className="text-[#D9D9D9]">Cargando...</p>
      </div>
    </div>
  )
}
