import { prisma } from '@/lib/prisma'

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  },

  findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    })
  },

  create(data: {
    email: string
    password: string
    name?: string
    role?: 'USER' | 'ADMIN'
  }) {
    return prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role ?? 'USER',
      },
    })
  },

  updateProgress(userId: number, questionId: number, confidence: 'UNKNOWN' | 'MEDIUM' | 'KNOWN') {
    return prisma.userQuestionProgress.upsert({
      where: {
        userId_questionId: { userId, questionId },
      },
      update: { confidence },
      create: { userId, questionId, confidence },
    })
  },

  getProgress(userId: number) {
    return prisma.userQuestionProgress.findMany({
      where: { userId },
      include: { question: true },
    })
  },
}