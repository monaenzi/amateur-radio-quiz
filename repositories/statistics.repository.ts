import { prisma } from '@/lib/prisma'

export const statisticsRepository = {
  getProgressByUser(userId: number) {
    return prisma.userQuestionProgress.findMany({
      where: { userId },
      include: { question: true },
    })
  },

  countByConfidence(userId: number, confidence: 'UNKNOWN' | 'MEDIUM' | 'KNOWN') {
    return prisma.userQuestionProgress.count({
      where: { userId, confidence },
    })
  },

  getTotalQuestions() {
    return prisma.question.count()
  },

  getQuestionsCountBySubject() {
    return prisma.question.groupBy({
      by: ['subject'],
      _count: { id: true },
    })
  },

  getProgressBySubject(userId: number) {
    return prisma.userQuestionProgress.groupBy({
      by: ['questionId'],
      where: { userId },
    })
  },
}