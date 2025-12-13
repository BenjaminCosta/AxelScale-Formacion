import { DashboardContent } from "@/components/dashboard-content"
import { getAllModules } from "@/lib/content/axelscale"

export default async function DashboardPage() {
  const modules = getAllModules()
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)

  return <DashboardContent modules={modules} totalLessons={totalLessons} showMockBanner={false} />
}
