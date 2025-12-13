"use client"

import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, Ghost, Package, Smartphone, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const metodos = [
  {
    id: "ghost",
    icon: Ghost,
    titulo: "Shopify Ghost Dropshipping",
    subtitulo: "mi favorita",
    descripcion: "Revendes un Producto Digital (Formaciones, Proveedores, Cursos…etc)",
    color: "#DAA520",
    pros: [
      "100% de margen de ganancia por cada venta",
      "No requiere envío físico",
      "Se puede automatizar fácilmente",
      "Stock infinito",
      "Envío instantáneo",
    ],
    contras: ["Nadie te va a comprar más de una vez", "Muy difícil o imposible de escalar"],
    lecciones: [
      "S.G.D Qué Productos Digitales Usar",
      "S.G.D Creación Producto Digital",
      "S.G.D Creación Web",
      "S.G.D Marketing",
      "S.G.D Automatizaciones IA",
      "S.G.D Reembolsos",
    ],
  },
  {
    id: "fisicos",
    icon: Package,
    titulo: "Shopify Productos Físicos",
    subtitulo: "",
    descripcion:
      "Revendes productos físicos a través de Shopify: AirPods, Perfumes, Zapatillas, Ropa, Legos…etc. Recomiendo que vendáis todos los productos como RÉPLICAS, no como originales.",
    color: "#00FF9D",
    pros: [
      "Un mismo cliente te puede comprar muchas veces",
      "La gente prefiere comprar productos físicos",
      "Con una buena estrategia de marketing puedes tener muchos clientes fieles y recurrentes",
      "No hace falta que tus videos sean virales o que tengas muchos seguidores, con 5/15 clientes recurrentes puedes vivir de esto perfectamente",
    ],
    contras: [
      "Margen de beneficio bajo (cada producto cuesta dinero y hay que pagar envío)",
      "Sueles tener que enviar a contra reembolso, sino la gente no se fía",
      "El envío contra reembolso es bastante caro",
      "Si el comprador no está en casa en el momento de la entrega (suele pasar el 90% de las veces) has pagado un envío caro para nada",
      "Solo puedes vender productos a gente de tu mismo país",
      "Necesitas invertir en los productos antes de venderlos, puede que no consigas venderlos",
      "Tienes stock limitado, y para reponerlo tienes que esperar otros 14 días a que te llegue nuevo stock",
    ],
    lecciones: [
      "S.P.F Qué Productos Físicos Vender",
      "S.P.F Creación Web",
      "S.P.F Marketing",
      "S.P.F Automatizaciones",
      "S.P.F Reembolsos",
      "S.P.F Cómo Hacer Envíos",
    ],
  },
  {
    id: "apps",
    icon: Smartphone,
    titulo: "Aplicaciones de Reventa",
    subtitulo: "Wallapop, Vinted, Ebay, Facebook Marketplace…etc",
    descripcion: "Revendes productos en Wallapop/Vinted o aplicaciones del estilo.",
    color: "#B8860B",
    pros: [
      "Es muy fácil ganar dinero con este modelo de negocio siguiendo los pasos que hay en esta formación correctamente",
      "No vas a tardar tiempo en ganar dinero, es muy rápido",
      "No necesitas invertir prácticamente nada de tiempo ni esfuerzo",
    ],
    contras: [
      "Estás limitado a 2.000€ en Vinted, a partir de ahí, Vinted avisa a Hacienda",
      "Corres el riesgo de que te baneen de Wallapop",
      "No puedes llegar a generar cantidades de dinero comparables a: Shopify Ghost Dropshipping",
      "No puedes vender un mismo producto durante el tiempo en el que ese producto está siendo enviado al comprador",
    ],
    lecciones: ["A.D.R Qué Productos Vender", "A.D.R Dónde Vender Cada Producto"],
  },
]

export function IntroduccionContent() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8"
      >
        <div className="inline-flex items-center gap-2 bg-[#DAA520]/5 border border-[#DAA520]/20 px-5 py-2.5 rounded-full">
          <Sparkles className="h-4 w-4 text-[#DAA520]" />
          <span className="font-body text-xs uppercase tracking-[0.2em] text-[#DAA520]">Formación Esencial</span>
        </div>

        <div className="space-y-6">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#FFFFFF] leading-[1.1]">
            <span className="text-[#DAA520]">ESENCIAL</span> (leer sí o sí)
          </h1>

          <div className="font-body text-lg sm:text-xl text-[#808080] max-w-3xl mx-auto leading-relaxed space-y-4">
            <p>
              Hay 3 métodos distintos <strong className="text-[#FFFFFF]">para ganar dinero con la reventa online:</strong>
            </p>
            <ul className="space-y-2.5 text-[#D9D9D9]">
              <li className="flex items-center justify-center gap-2">
                <strong className="text-[#DAA520]">Shopify Ghost Dropshipping</strong>
                <span className="text-[#808080] text-sm italic">(mi favorita)</span>
              </li>
              <li>
                <strong className="text-[#FFFFFF]">Shopify Productos Físicos</strong>
              </li>
              <li>
                <strong className="text-[#808080]">Aplicaciones de Reventa</strong>
                <span className="text-[#808080] text-base ml-1">(Wallapop, Vinted, Ebay, Facebook Marketplace…etc)</span>
              </li>
            </ul>
            <p className="pt-4 text-[#808080]">
              Cada una tiene Pros y Contras. Se pueden hacer todas a la vez, pero ya depende de ti mismo, del
              tiempo/esfuerzo que puedas dedicar.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Métodos Grid - En filas */}
      <div className="space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-3xl sm:text-4xl text-[#FFFFFF] text-center"
        >
          Los 3 Métodos Explicados
        </motion.h2>

        <div className="space-y-6">
          {metodos.map((metodo, index) => {
            const Icon = metodo.icon
            const esGhost = metodo.id === "ghost"
            
            return (
              <motion.div
                key={metodo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              >
                <Card className="bg-[#1A1A1A] border-[#2D2D2D] hover:border-[#3A3A3A] transition-all duration-300">
                  <CardContent className="p-8 sm:p-10">
                    {/* Header */}
                    <div className="flex items-start gap-6 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-[#DAA520]/10 flex items-center justify-center shrink-0">
                        <Icon className="h-8 w-8 text-[#DAA520]" />
                      </div>

                      <div className="space-y-2 flex-1">
                        <h3 className="font-display text-2xl sm:text-3xl text-[#FFFFFF]">{metodo.titulo}</h3>
                        {metodo.subtitulo && (
                          <p className="font-body text-base text-[#DAA520] italic">({metodo.subtitulo})</p>
                        )}
                        <p className="font-body text-base sm:text-lg text-[#D9D9D9] leading-relaxed">
                          <strong className="text-[#FFFFFF]">Explicación:</strong> {metodo.descripcion}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Pros */}
                      <div className="space-y-4">
                        <h4 className="font-display text-lg text-[#FFFFFF] flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-[#00FF9D]" />
                          Pros
                        </h4>
                        <ul className="space-y-3">
                          {metodo.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-3 font-body text-base text-[#D9D9D9]">
                              <CheckCircle2 className="h-5 w-5 text-[#00FF9D] mt-0.5 shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Contras */}
                      <div className="space-y-4">
                        <h4 className="font-display text-lg text-[#FFFFFF] flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-[#808080]" />
                          Contras
                        </h4>
                        <ul className="space-y-3">
                          {metodo.contras.map((contra, i) => (
                            <li key={i} className="flex items-start gap-3 font-body text-base text-[#808080]">
                              <AlertCircle className="h-5 w-5 text-[#808080] mt-0.5 shrink-0" />
                              <span>{contra}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Lecciones */}
                    <div className="mt-8 pt-8 border-t border-[#2D2D2D]">
                      <h4 className="font-body text-sm uppercase tracking-wider text-[#DAA520] mb-4">
                        Lecciones incluidas ({metodo.lecciones.length})
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {metodo.lecciones.map((leccion, i) => (
                          <div key={i} className="font-body text-sm text-[#808080] flex items-center gap-2">
                            <span className="text-[#DAA520]">•</span>
                            {leccion}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
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
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center"
      >
        <Card className="bg-[#1A1A1A] border-[#DAA520]/30 max-w-2xl mx-auto">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-[#DAA520]" />
              <h3 className="font-display text-2xl text-[#FFFFFF]">¿Por dónde empezar?</h3>
            </div>

            <p className="font-body text-base text-[#D9D9D9] leading-relaxed">
              Revisa cada método, sus pros y contras, y elige el que mejor se adapte a tu situación actual. Puedes
              combinarlos según tu disponibilidad de tiempo y recursos.
            </p>

            <div className="pt-2">
              <button className="bg-[#00FF9D] hover:bg-[#00E589] text-[#000000] font-body font-semibold px-8 py-3.5 rounded-lg transition-colors shadow-lg shadow-[#00FF9D]/20">
                Ver Módulos
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
