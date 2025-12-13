"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Calendar, CheckCircle2, AlertCircle, Sparkles, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const fases = [
  {
    id: "dias-1-5",
    titulo: "Días 1-5",
    subtitulo: "Preparación Inicial",
    tareas: [
      "Haz un pedido de zapatillas Adidas Spezial, Ropa y Airpods. (Ropa y Zapatillas recomiendo pedirla en Hacoo) (Airpods en mi proveedor electrónico)",
      "Elige un nombre que vayas a usar para tus redes sociales y dominio de Shopify",
      "Crea un correo electrónico para tus redes sociales y Shopify",
      "Crea tus redes sociales, Instagram, TikTok y (YT Shorts, opcional)",
      "Empieza con tu web en Shopify de venta de proveedores o productos físicos, lo que prefieras",
      "Haz un pedido de Airpods/Perfumes/G-Shocks, a mi proveedor (o al tuyo), en el caso de que elijas Shopify Productos Físicos",
    ],
  },
  {
    id: "dias-5-10",
    titulo: "Días 5-10",
    subtitulo: "Configuración de Plataformas",
    tareas: [
      "Céntrate en tu web en Shopify, diseños, aplicaciones, configurar los pagos…",
      "Crear tus Documentos de Google con los proveedores o el producto digital que quieras (en el caso de que elijas Shopify Ghost Dropshipping)",
      "Crea una biografía en Instagram y TikTok, que redirija a la gente a tu página web",
    ],
  },
  {
    id: "dias-10-20",
    titulo: "Días 10-20",
    subtitulo: "Lanzamiento",
    tareas: [
      "Ya tendrás tu página web pública y terminada",
      "Te habrán llegado los productos que pediste",
      "Publica tus anuncios en Vinted y Wallapop (si eres de LATAM, en tus respectivas apps)",
    ],
  },
  {
    id: "dias-20-25",
    titulo: "Días 20-25",
    subtitulo: "Automatización",
    tareas: [
      "Céntrate en configurar de la mejor forma posible tu ManyChat",
      "Empieza a crear y editar videos para redes sociales",
    ],
  },
  {
    id: "dias-25-50",
    titulo: "Días 25-50",
    subtitulo: "Crecimiento y Optimización",
    tareas: [
      "Céntrate en el marketing orgánico",
      "Sigue vendiendo tus productos en Wallapop y Vinted",
      "Procura ir sacando reseñas para tus destacadas en Instagram y para tu web en Shopify",
      "Responde todos los mensajes que vayas teniendo tanto en TikTok como en Instagram, irás mejorando con el tiempo cerrando ventas por mensajes directos (esto es lo más importante)",
    ],
  },
]

export function Plan50DiasContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8"
      >
        <div className="inline-flex items-center gap-2 bg-[#DAA520]/5 border border-[#DAA520]/20 px-5 py-2.5 rounded-full">
          <Calendar className="h-4 w-4 text-[#DAA520]" />
          <span className="font-body text-xs uppercase tracking-[0.2em] text-[#DAA520]">Plan de Acción</span>
        </div>

        <div className="space-y-6">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] leading-[1.1]">
            Plan de <span className="text-[#DAA520]">50 Días</span>
          </h1>

          <p className="font-body text-lg sm:text-xl text-[#808080] max-w-3xl mx-auto leading-relaxed">
            Tu hoja de ruta completa para construir tu negocio de reventa online desde cero hasta tus primeras ventas.
          </p>
        </div>
      </motion.div>

      {/* Aviso Importante */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Card className="bg-[#1A1A1A] border-[#DAA520]/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-[#DAA520] shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-display text-lg text-[#FFFFFF]">Antes de nada</h3>
                <p className="font-body text-[#D9D9D9] leading-relaxed">
                  Tenéis explicada detalladamente toda la información de cómo realizar cada paso de la mejor manera en
                  los demás módulos de la formación.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Acordeón de Fases */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center space-y-2"
        >
          <h2 className="font-display text-3xl sm:text-4xl text-[#FFFFFF]">Fases del Plan</h2>
          <p className="font-body text-[#808080]">Haz clic en cada fase para ver las tareas</p>
        </motion.div>

        <div className="space-y-3">
          {fases.map((fase, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div
                key={fase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
              >
                <Card className="bg-[#1A1A1A] border-[#2D2D2D] hover:border-[#DAA520]/30 transition-all duration-300 overflow-hidden">
                  {/* Header clickeable */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-[#0D0D0D] transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Número */}
                      <div className="w-12 h-12 rounded-xl bg-[#DAA520]/10 flex items-center justify-center shrink-0">
                        <span className="font-display text-xl text-[#DAA520]">{index + 1}</span>
                      </div>

                      {/* Título */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-body text-xs px-2.5 py-0.5 border-[#3A3A3A] text-[#808080] bg-[#0D0D0D]">
                            {fase.titulo}
                          </Badge>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl text-[#FFFFFF]">{fase.subtitulo}</h3>
                        <p className="font-body text-sm text-[#808080]">{fase.tareas.length} tareas</p>
                      </div>
                    </div>

                    {/* Icono chevron */}
                    <ChevronDown
                      className={`h-5 w-5 text-[#808080] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-[#DAA520]" : ""
                      }`}
                    />
                  </button>

                  {/* Contenido expandible */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-[#2D2D2D]">
                          <div className="space-y-4 pl-1">
                            {fase.tareas.map((tarea, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                className="flex items-start gap-3.5"
                              >
                                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-[#00FF9D]" />
                                <p className="font-body text-[#D9D9D9] leading-relaxed text-base">{tarea}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* CTA Final */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="text-center"
      >
        <Card className="bg-[#1A1A1A] border-[#DAA520]/30 max-w-2xl mx-auto">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-[#DAA520]" />
              <h3 className="font-display text-2xl text-[#FFFFFF]">¡Comienza Hoy!</h3>
            </div>

            <p className="font-body text-[#D9D9D9] leading-relaxed text-base">
              No esperes al "momento perfecto". Empieza el Día 1 ahora mismo y sigue el plan paso a paso. La
              consistencia es la clave del éxito.
            </p>

            <div className="pt-2">
              <button className="bg-[#00FF9D] hover:bg-[#00E589] text-[#000000] font-body font-semibold px-8 py-3.5 rounded-lg transition-colors shadow-lg shadow-[#00FF9D]/20">
                Empezar Ahora
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
