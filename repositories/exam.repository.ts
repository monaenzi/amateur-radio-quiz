import { prisma } from '@/lib/prisma'

export const examRepository = {
  getRandomQuestions(classFilter: number, limit: number = 20) {
    return prisma.question.findMany({
      where: {
        classes: {
          some: {
            class: classFilter,
          },
        },
      },
      include: {
        answers: true,
        attachments: true,
      },
      take: limit,
    })
  },

  getQuestionsBySubject(subject: string, classFilter?: number) {
    return prisma.question.findMany({
      where: {
        subject,
        ...(classFilter && {
          classes: {
            some: {
              class: classFilter,
            },
          },
        }),
      },
      include: {
        answers: true,
        attachments: true,
      },
    })
  },

getQuestionsForLearning(userId: number, classFilter?: number, subject?: string) {
    const subjects = subject ? subject.split(',') : undefined

    return prisma.question.findMany({
        where: {
            ...(classFilter && {
                classes: { some: { class: classFilter } },
            }),
            ...(subjects && subjects.length > 0 && {
                subject: { in: subjects },
            }),
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
