import { notFound } from "next/navigation"
import { getModuleBySlug } from "@/lib/content/axelscale"
import { ModulePageClient } from "@/components/module-page-client"

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const module = getModuleBySlug(slug)

  if (!module) {
    notFound()
  }

  return <ModulePageClient module={module} />
}
