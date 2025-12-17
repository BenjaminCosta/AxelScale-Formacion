// Data access layer that works in both preview and production
// No direct Prisma imports to avoid loading issues in v0 preview

import { MOCK_MODULES, MOCK_USERS, getMockModuleBySlug, getMockLessonById } from "./mock-data"

// Check if we're in preview mode (no DATABASE_URL)
const isPreview = !process.env.DATABASE_URL

console.log("[v0] Database mode:", isPreview ? "PREVIEW (Mock Data)" : "PRODUCTION (Real DB)")
console.log("[v0] DATABASE_URL present:", !!process.env.DATABASE_URL)

// Database interface
interface User {
  id: string
  email: string
  role: "ADMIN" | "USER"
  name?: string | null
  phone?: string | null
  createdAt: Date
  updatedAt: Date
  subscription?: Subscription
}

interface Subscription {
  id: string
  userId: string
  plan: string
  status: string
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  currentPeriodEnd: Date
  createdAt: Date
  updatedAt: Date
}

interface Module {
  id: string
  title: string
  slug: string
  order: number
  createdAt: Date
  updatedAt: Date
  lessons: Lesson[]
}

interface Lesson {
  id: string
  moduleId: string
  title: string
  content: string
  videoUrl: string | null
  order: number
  createdAt: Date
  updatedAt: Date
}

// Database operations
export const db = {
  // User operations
  user: {
    findUnique: async ({ where, include }: any): Promise<User | null> => {
      if (isPreview) {
        const user = MOCK_USERS.find((u) => u.email === where.email || u.id === where.id)
        return user || null
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.user.findUnique({ where, include })
    },

    findMany: async ({ include, orderBy }: any): Promise<User[]> => {
      if (isPreview) {
        return MOCK_USERS
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.user.findMany({ include, orderBy })
    },

    create: async ({ data }: any): Promise<User> => {
      if (isPreview) {
        const newUser = {
          id: `user_${Date.now()}`,
          email: data.email,
          role: data.role || "USER",
          name: data.name || null,
          phone: data.phone || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        return newUser
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.user.create({ data })
    },

    update: async ({ where, data }: any): Promise<User> => {
      if (isPreview) {
        const user = MOCK_USERS.find((u) => u.id === where.id || u.email === where.email)
        if (user) {
          return { ...user, ...data }
        }
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.user.update({ where, data })
    },
  },

  // Module operations
  module: {
    findMany: async ({ orderBy, include }: any): Promise<Module[]> => {
      if (isPreview) {
        return MOCK_MODULES
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.module.findMany({ orderBy, include })
    },

    findUnique: async ({ where, include }: any): Promise<Module | null> => {
      if (isPreview) {
        return getMockModuleBySlug(where.slug)
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.module.findUnique({ where, include })
    },
  },

  // Lesson operations
  lesson: {
    findUnique: async ({ where, include }: any) => {
      if (isPreview) {
        return getMockLessonById(where.id)
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.lesson.findUnique({ where, include })
    },
  },

  // Magic Link operations
  magicLink: {
    create: async ({ data }: any) => {
      if (isPreview) {
        return {
          id: `ml_${Date.now()}`,
          ...data,
          createdAt: new Date(),
        }
      }
      // Use Prisma in production
      const { prisma } = await import('./prisma')
      return prisma.magicLink.create({ data })
    },

    findUnique: async ({ where }: any) => {
      if (isPreview) {
        // In preview, always return a valid magic link for demo purposes
        return {
          id: "ml_demo",
          token: where.token,
          email: "demo@axelscale.com",
          userId: null,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000),
          used: false,
          createdAt: new Date(),
        }
      }
      // Use Prisma in production
      const { prisma } = await import('./prisma')
      return prisma.magicLink.findUnique({ where })
    },

    update: async ({ where, data }: any) => {
      if (isPreview) {
        return {}
      }
      // Use Prisma in production
      const { prisma } = await import('./prisma')
      return prisma.magicLink.update({ where, data })
    },
  },

  // Subscription operations
  subscription: {
    findUnique: async ({ where }: any) => {
      if (isPreview) {
        const user = MOCK_USERS.find((u) => u.id === where.userId)
        return user?.subscription || null
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.subscription.findUnique({ where })
    },

    create: async ({ data }: any) => {
      if (isPreview) {
        return {
          id: `sub_${Date.now()}`,
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.subscription.create({ data })
    },

    update: async ({ where, data }: any) => {
      if (isPreview) {
        return {
          id: where.userId,
          userId: where.userId,
          ...data,
          updatedAt: new Date(),
        }
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.subscription.update({ where, data })
    },

    upsert: async ({ where, create, update }: any) => {
      if (isPreview) {
        return {}
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.subscription.upsert({ where, create, update })
    },

    updateMany: async ({ where, data }: any) => {
      if (isPreview) {
        return {}
      }
      // In production, use Prisma
      const { prisma } = await import('./prisma')
      return prisma.subscription.updateMany({ where, data })
    },
  },
}

export const usingMockData = isPreview
