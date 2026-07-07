import { prisma } from '@/lib/prisma'

export const examRepository = {
  getRandomQuestions(classFilter: number, limit: number = 20) {
    return prisma.question.findMany({
      where: { class: classFilter },
      include: { answers: true, attachments: true },
      take: limit,
    })
  },

  getQuestionsBySubject(subject: string, classFilter?: number) {
    return prisma.question.findMany({
      where: {
        subject,
        ...(classFilter && { class: classFilter }),
      },
      include: { answers: true, attachments: true },
    })
  },

  getQuestionsForLearning(userId: number, classFilter?: number) {
    return prisma.question.findMany({
      where: {
        ...(classFilter && { class: classFilter }),
      },
      include: {
        answers: true,
        attachments: true,
        progress: {
          where: { userId },
        },
      },
    })
  },
}