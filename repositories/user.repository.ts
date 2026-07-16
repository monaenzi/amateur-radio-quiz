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

  findByExternalId(externalId: string) {
    return prisma.user.findUnique({ where: { externalId } })
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

  createSSOUser(data: {
    externalId: string
    email: string | null
    name: string | null
    callSign: string | null
  }) {
    return prisma.user.create({
      data: {
        externalId: data.externalId,
        email: data.email,
        name: data.name,
        callSign: data.callSign,
        role: 'USER',
      },
    })
  },

  updateCallSign(id: number, callSign: string | null) {
    return prisma.user.update({
      where: { id },
      data: { callSign },
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