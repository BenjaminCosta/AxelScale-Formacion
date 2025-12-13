import { PrismaClient } from "@prisma/client"
import crypto from "crypto"

const prisma = new PrismaClient()

async function main() {
  const email = "benjacosta@gmail.com"
  
  console.log("🔄 Creando magic link para:", email)

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error("Usuario no encontrado")
  }

  // Create magic link token
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

  await prisma.magicLink.create({
    data: {
      token,
      email,
      userId: user.id,
      expiresAt,
    },
  })

  const magicUrl = `http://localhost:3000/verify?token=${token}`
  
  console.log("\n✅ Magic link creado!")
  console.log("\n🔗 Usa este link para iniciar sesión:")
  console.log(magicUrl)
  console.log("\n⏰ Expira en 15 minutos")
}

main()
  .catch((e) => {
    console.error("❌ Error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
