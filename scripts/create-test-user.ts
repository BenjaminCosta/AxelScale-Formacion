import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🔄 Creando usuario de prueba...")

  // Create test user
  const testUser = await prisma.user.upsert({
    where: { email: "benjacosta@gmail.com" },
    update: {},
    create: {
      email: "benjacosta@gmail.com",
      role: "USER",
      name: "Benja Costa (Test)",
    },
  })

  console.log("✅ Usuario creado:", testUser)

  // Create active subscription for 3 months plan
  const subscription = await prisma.subscription.upsert({
    where: { userId: testUser.id },
    update: {
      plan: "3months",
      status: "active",
      currentPeriodEnd: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    },
    create: {
      userId: testUser.id,
      plan: "3months",
      status: "active",
      stripeCustomerId: "cus_test_123456",
      stripeSubscriptionId: "sub_test_123456",
      currentPeriodEnd: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    },
  })

  console.log("✅ Suscripción creada:", subscription)
  console.log("\n📧 Email:", testUser.email)
  console.log("📅 Vencimiento:", subscription.currentPeriodEnd.toLocaleDateString("es-ES"))
  console.log("📦 Plan:", subscription.plan)
  console.log("✅ Estado:", subscription.status)
}

main()
  .catch((e) => {
    console.error("❌ Error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
