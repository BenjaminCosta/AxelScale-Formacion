// Mock data for v0 preview (Prisma doesn't work in browser-based preview)
// This will be replaced by real Prisma queries when deployed

export const MOCK_USERS = [
  {
    id: "user_1",
    email: "demo@axelscale.com",
    role: "USER" as const,
    name: "Demo User",
    phone: "+34 600 000 000",
    createdAt: new Date(),
    updatedAt: new Date(),
    subscription: {
      id: "sub_1",
      userId: "user_1",
      plan: "monthly",
      status: "active",
      stripeCustomerId: "cus_demo",
      stripeSubscriptionId: "sub_demo",
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: "user_2",
    email: "benjacostm100@gmail.com",
    role: "ADMIN" as const,
    name: "Super Admin",
    phone: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    subscription: {
      id: "sub_2",
      userId: "user_2",
      plan: "annual",
      status: "active",
      stripeCustomerId: "cus_admin",
      stripeSubscriptionId: "sub_admin",
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    id: "user_3",
    email: "user@example.com",
    role: "USER" as const,
    name: "Regular User",
    phone: "+34 611 222 333",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    subscription: {
      id: "sub_3",
      userId: "user_3",
      plan: "quarterly",
      status: "active",
      stripeCustomerId: "cus_example",
      stripeSubscriptionId: "sub_example",
      currentPeriodEnd: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    },
  },
]

export const MOCK_MODULES = [
  {
    id: "mod_1",
    title: "Shopify Ghost Dropshipping",
    slug: "shopify-ghost-dropshipping",
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    lessons: [
      {
        id: "les_1_1",
        moduleId: "mod_1",
        title: "Introducción al Ghost Dropshipping",
        content:
          "Contenido de la lección 1 del módulo Ghost Dropshipping. Aprende los fundamentos de este modelo de negocio que me permitió generar ingresos pasivos escalables.\n\nEn esta lección cubriremos:\n- Qué es el Ghost Dropshipping exactamente\n- Por qué funciona tan bien en 2025\n- Las ventajas sobre el dropshipping tradicional\n- Casos de éxito reales\n\nEste método es perfecto para empezar porque no requiere inventario físico, ni logística complicada. Todo es digital, todo es automatizable.",
        videoUrl: null,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "les_1_2",
        moduleId: "mod_1",
        title: "Selección de Productos Digitales",
        content:
          "Contenido sobre cómo elegir los productos digitales más rentables para tu tienda.\n\nAprenderás:\n- Dónde encontrar productos digitales de alta demanda\n- Cómo validar la rentabilidad antes de invertir\n- Estrategias de pricing que maximizan conversiones\n- Herramientas para automatizar todo el proceso",
        videoUrl: null,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "les_1_3",
        moduleId: "mod_1",
        title: "Configuración de Shopify",
        content:
          "Guía paso a paso para configurar tu tienda Shopify optimizada para productos digitales.\n\nPaso a paso verás:\n- Setup inicial de Shopify (theme, configuración)\n- Apps esenciales para productos digitales\n- Optimización de checkout para maximizar ventas\n- Configuración de entregas automáticas",
        videoUrl: null,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "les_1_4",
        moduleId: "mod_1",
        title: "Automatización de Entregas",
        content:
          "Cómo automatizar completamente la entrega de productos digitales a tus clientes.\n\nDescubrirás:\n- Las mejores apps de automatización\n- Cómo configurar entregas instantáneas\n- Sistema de emails post-compra\n- Escalado sin aumentar el trabajo manual",
        videoUrl: null,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "mod_2",
    title: "Shopify Productos Físicos",
    slug: "shopify-productos-fisicos",
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    lessons: [
      {
        id: "les_2_1",
        moduleId: "mod_2",
        title: "Introducción a Productos Físicos",
        content:
          "Contenido de la lección 1 del módulo Productos Físicos. Descubre cómo construir una marca sólida con productos físicos.\n\nEn este módulo aprenderás:\n- La diferencia entre dropshipping y tener tu propio stock\n- Ventajas de construir una marca real\n- Casos de éxito: de 0 a 6 cifras\n- Inversión inicial necesaria",
        videoUrl: null,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "les_2_2",
        moduleId: "mod_2",
        title: "Encontrar Proveedores Confiables",
        content:
          "Estrategias probadas para encontrar y negociar con proveedores de calidad.\n\nAprenderás:\n- Plataformas para encontrar proveedores (Alibaba, locales, etc)\n- Cómo negociar precios y MOQs\n- Red flags que debes evitar\n- Cómo pedir muestras y validar calidad",
        videoUrl: null,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "les_2_3",
        moduleId: "mod_2",
        title: "Gestión de Inventario",
        content:
          "Sistemas para manejar tu inventario de forma eficiente y escalable.\n\nCubriremos:\n- Software de gestión de inventario\n- Cómo calcular stock óptimo\n- Estrategias para reducir costos de almacenamiento\n- Automatización de reorders",
        videoUrl: null,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "les_2_4",
        moduleId: "mod_2",
        title: "Logística y Envíos",
        content:
          "Todo sobre logística, fulfillment y cómo optimizar tus costos de envío.\n\nDescubrirás:\n- Opciones de fulfillment (propio vs tercerizado)\n- Negociación con empresas de transporte\n- Cómo ofrecer envío gratuito sin perder dinero\n- Gestión de devoluciones",
        videoUrl: null,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: "mod_3",
    title: "Aplicaciones de Reventa",
    slug: "aplicaciones-de-reventa",
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
    lessons: [
      {
        id: "les_3_1",
        moduleId: "mod_3",
        title: "Introducción al Arbitraje",
        content:
          "Contenido de la lección 1 del módulo Aplicaciones de Reventa. El método perfecto para empezar con bajo riesgo.\n\nEn esta lección verás:\n- Qué es el arbitraje de productos\n- Por qué es el mejor método para empezar\n- Inversión inicial mínima\n- Primeras ganancias en 24-48 horas",
        videoUrl: null,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "les_3_2",
        moduleId: "mod_3",
        title: "Plataformas de Reventa",
        content:
          "Las mejores aplicaciones y marketplaces para comprar barato y vender caro.\n\nDescubrirás:\n- Vinted, Wallapop, eBay y más\n- Estrategias específicas para cada plataforma\n- Cómo encontrar gangas antes que otros\n- Automatización con bots (legal)",
        videoUrl: null,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "les_3_3",
        moduleId: "mod_3",
        title: "Estrategias de Precios",
        content:
          "Cómo determinar el precio perfecto para maximizar tus ganancias.\n\nAprenderás:\n- Psicología de precios aplicada\n- Cómo calcular tu margen objetivo\n- Cuándo usar precio fijo vs subasta\n- Estrategias de descuento que funcionan",
        videoUrl: null,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "les_3_4",
        moduleId: "mod_3",
        title: "Escalando tu Negocio de Reventa",
        content:
          "De ventas ocasionales a un negocio de 5 cifras al mes.\n\nDescubrirás:\n- Cómo pasar de 10 a 100 ventas al mes\n- Sistemas de automatización\n- Contratación de asistentes virtuales\n- Diversificación de productos",
        videoUrl: null,
        order: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
]

export function getMockUser(email: string) {
  return MOCK_USERS.find((u) => u.email === email) || null
}

export function getMockUserById(id: string) {
  return MOCK_USERS.find((u) => u.id === id) || null
}

export function getMockModules() {
  return MOCK_MODULES
}

export function getMockModuleBySlug(slug: string) {
  return MOCK_MODULES.find((m) => m.slug === slug) || null
}

export function getMockLessonById(id: string) {
  for (const module of MOCK_MODULES) {
    const lesson = module.lessons.find((l) => l.id === id)
    if (lesson) {
      return { ...lesson, module }
    }
  }
  return null
}
