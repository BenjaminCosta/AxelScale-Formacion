"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react"
import type { Lesson, Module } from "@/lib/content/axelscale"

interface LessonPageClientProps {
  lesson: Lesson
  module: Module
  moduleLessons: Lesson[]
}

export function LessonPageClient({ lesson, module, moduleLessons }: LessonPageClientProps) {
  const currentIndex = moduleLessons.findIndex((l) => l.id === lesson.id)
  const nextLesson = moduleLessons[currentIndex + 1]
  const prevLesson = moduleLessons[currentIndex - 1]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Button asChild variant="ghost" className="mb-6 text-[#808080] hover:text-[#D9D9D9]">
          <Link href={`/app/module/${module.slug}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a {module.title}
          </Link>
        </Button>

        <div className="bg-[rgba(45,45,45,0.95)] backdrop-blur-sm rounded-2xl p-8 border border-[#3A3A3A]">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block font-body text-xs uppercase tracking-wider text-[#DAA520]">
              {module.title}
            </span>
            <span className="text-[#808080]">•</span>
            <span className="inline-block font-body text-xs text-[#808080]">
              Lección {lesson.order} de {moduleLessons.length}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-[#FFFFFF] mb-4">{lesson.title}</h1>

          <div className="flex items-center gap-2 text-[#808080]">
            <Clock className="h-4 w-4" />
            <span className="font-body">~15 min</span>
          </div>
        </div>
      </motion.div>

      {/* Content area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-[rgba(45,45,45,0.95)] backdrop-blur-sm rounded-2xl p-8 border border-[#3A3A3A] min-h-[400px]"
      >
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-6 w-6 text-[#DAA520]" />
          <h2 className="font-display text-xl text-[#FFFFFF]">Contenido de la Lección</h2>
        </div>

        {/* Video Player */}
        {lesson.videoUrl && (
          <div className="aspect-video bg-[#1A1A1A] rounded-lg mb-8 flex items-center justify-center">
            <p className="text-[#808080]">Video Player: {lesson.videoUrl}</p>
          </div>
        )}

        {/* Lesson content */}
        <div className="prose prose-invert max-w-none">
          <p className="font-body text-[#D9D9D9] text-lg leading-relaxed whitespace-pre-wrap">{lesson.content}</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center justify-between gap-4"
      >
        {prevLesson ? (
          <Button asChild variant="outline" className="flex-1 border-[#3A3A3A] justify-start bg-transparent">
            <Link href={`/app/lesson/${prevLesson.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="truncate">{prevLesson.title}</span>
            </Link>
          </Button>
        ) : (
          <div className="flex-1" />
        )}

        {nextLesson ? (
          <Button asChild className="flex-1 bg-[#00FF9D] hover:bg-[#00E589] text-[#000000] justify-end">
            <Link href={`/app/lesson/${nextLesson.id}`}>
              <span className="truncate">{nextLesson.title}</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        ) : (
          <Button asChild className="flex-1 bg-[#DAA520] hover:bg-[#B8860B] text-[#000000] justify-center">
            <Link href={`/app/module/${module.slug}`}>Completar Módulo</Link>
          </Button>
        )}
      </motion.div>
    </div>
  )
}
