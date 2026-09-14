// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  const password = process.argv[3]
  const hash = await bcrypt.hash(password, 10)

  await prisma.user.upsert({
    where: { email },
    update: { password: hash, role: 'ADMIN' },
    create: { email, name: email, password: hash, role: 'ADMIN' },
  })
  console.log(`Admin ${email} erstellt/aktualisiert`)
}

main().finally(() => prisma.$disconnect())