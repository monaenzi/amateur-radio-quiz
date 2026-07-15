import { prisma } from '@/lib/prisma'

export const statisticsRepository = {
  getProgressByUser(userId: number, classFilter?: number) {
    return prisma.userQuestionProgress.findMany({
      where: {
        userId,
        ...(classFilter !== undefined && {
          question: {
            classes: {
              some: {
                class: classFilter,
              },
            },
          },
        }),
      },
      include: { question: true },
    })
  },

  countByConfidence(userId: number, confidence: 'UNKNOWN' | 'MEDIUM' | 'KNOWN', classFilter?: number) {
    return prisma.userQuestionProgress.count({
      where: {
        userId,
        confidence,
        ...(classFilter !== undefined && {
          question: {
            classes: {
              some: {
                class: classFilter,
              },
            },
          },
        }),
      },
    })
  },

  getTotalQuestions(classFilter?: number) {
    return prisma.question.count({
      where: {
        ...(classFilter !== undefined && {
          classes: {
            some: {
              class: classFilter,
            },
          },
        }),
      },
    })
  },

  getQuestionsCountBySubject(classFilter?: number) {
    return prisma.question.groupBy({
      by: ['subject'],
      where: {
        ...(classFilter !== undefined && {
          classes: {
            some: {
              class: classFilter,
            },
          },
        }),
      },
      _count: { id: true },
    })
  },

  getProgressBySubject(userId: number, classFilter?: number) {
    return prisma.userQuestionProgress.groupBy({
      by: ['questionId'],
      where: {
        userId,
        ...(classFilter !== undefined && {
          question: {
            classes: {
              some: {
                class: classFilter,
              },
            },
          },
        }),
      },
    })
  },
}