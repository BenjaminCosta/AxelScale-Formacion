"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlayCircle, Clock } from "lucide-react"
import { motion } from "framer-motion"
import type { Module } from "@/lib/content/axelscale"

export function ModulePageClient({ module }: { module: Module }) {
  const sortedLessons = [...module.lessons].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Button asChild variant="ghost" className="mb-6 text-[#808080] hover:text-[#D9D9D9]">
          <Link href="/app">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Link>
        </Button>

        <div className="bg-[rgba(45,45,45,0.95)] backdrop-blur-sm rounded-2xl p-8 border border-[#DAA520]/30">
          <span className="inline-block font-body text-xs uppercase tracking-wider text-[#DAA520] mb-4">
            Módulo {module.order}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-[#FFFFFF] mb-4">{module.title}</h1>
          <p className="font-body text-lg text-[#D9D9D9] max-w-2xl">{module.description}</p>

          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[#3A3A3A]">
            <div className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-[#DAA520]" />
              <span className="font-body text-[#808080]">{sortedLessons.length} lecciones</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#DAA520]" />
              <span className="font-body text-[#808080]">
                ~{sortedLessons.reduce((acc, l) => acc + 15, 0)} min total
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lessons list */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h2 className="font-display text-2xl text-[#FFFFFF] mb-6">Lecciones</h2>

        <div className="space-y-3">
          {sortedLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.3 }}
            >
              <Link href={`/app/lesson/${lesson.id}`}>
                <div className="bg-[rgba(45,45,45,0.95)] backdrop-blur-sm rounded-xl p-5 border border-[#3A3A3A] hover:border-[#DAA520]/50 transition-all duration-200 group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2D2D2D] flex items-center justify-center flex-shrink-0 group-hover:bg-[#DAA520]/10 transition-colors">
                    <span className="font-display text-lg text-[#808080] group-hover:text-[#DAA520] transition-colors">
                      {lesson.order}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-[#D9D9D9] group-hover:text-[#DAA520] transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="font-body text-sm text-[#808080] flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      ~15 min
                    </p>
                  </div>

                  <PlayCircle className="h-5 w-5 text-[#808080] group-hover:text-[#DAA520] transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
