import { notFound } from "next/navigation"
import { getLessonById } from "@/lib/content/axelscale"
import { LessonPageClient } from "@/components/lesson-page-client"

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const result = getLessonById(id)

  if (!result) {
    notFound()
  }

  const { lesson, module } = result

  // Get all lessons from the module, sorted by order
  const moduleLessons = [...module.lessons].sort((a, b) => a.order - b.order)

  return <LessonPageClient lesson={lesson} module={module} moduleLessons={moduleLessons} />
}
