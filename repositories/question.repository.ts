import { prisma } from '@/lib/prisma'

export const questionRepository = {
  findMany(filters: { search?: string; classFilter?: number; subjectFilter?: string }) {
    const { search, classFilter, subjectFilter } = filters

    return prisma.question.findMany({
      where: {
        ...(classFilter  !== undefined && {
          classes: {
            some: {
              class: classFilter,
            },
          },
        }),

        ...(subjectFilter && {
          subject: subjectFilter,
        }),

        ...(search && {
          OR: [
            {
              text: {
                contains: search,
              },
            },
            {
              code: {
                contains: search,
              },
            },
          ],
        }),
      },

      include: {
        answers: true,
        attachments: true,
        classes: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    })
  },

  findById(id: number) {
    return prisma.question.findUnique({
      where: {
        id,
      },

      include: {
        answers: true,
        attachments: true,
        classes: true,
      },
    })
  },

  create(data: {
    text: string
    explanation?: string
    classes: number[]
    subject: string
    code?: string
    answers: {
      text: string
      isCorrect: boolean
    }[]
    attachments: {
      url: string
      type: string
    }[]
  }) {
    return prisma.question.create({
      data: {
        text: data.text,
        explanation: data.explanation,
        subject: data.subject,
        code: data.code,

        classes: {
          create: data.classes.map((c) => ({
            class: c,
          })),
        },

        answers: {
          create: data.answers,
        },

        attachments: {
          create: data.attachments,
        },
      },

      include: {
        classes: true,
        answers: true,
        attachments: true,
      },
    })
  },

  update(
    id: number,
    data: {
      text: string
      explanation?: string
      classes: number[]
      subject: string
      code?: string
      answers: {
        text: string
        isCorrect: boolean
      }[]
      attachments: {
        url: string
        type: string
      }[]
    }
  ) {
    return prisma.question.update({
      where: {
        id,
      },

      data: {
        text: data.text,
        explanation: data.explanation,
        subject: data.subject,
        code: data.code,

        classes: {
          deleteMany: {},

          create: data.classes.map((c) => ({
            class: c,
          })),
        },

        answers: {
          deleteMany: {},
          create: data.answers,
        },

        attachments: {
          deleteMany: {},
          create: data.attachments,
        },
      },

      include: {
        classes: true,
        answers: true,
        attachments: true,
      },
    })
  },

  delete(id: number) {
    return prisma.question.delete({
      where: {
        id,
      },
    })
  },

  countBySubject(classFilter?: number) {
    return prisma.question.groupBy({
      by: ['subject'],

      where: classFilter !== undefined
        ? {
            classes: {
              some: {
                class: classFilter,
              },
            },
          }
        : {},

      _count: {
        id: true,
      },
    })
  },

  count(classFilter?: number) {
    return prisma.question.count({
      where: classFilter !== undefined
        ? {
            classes: {
              some: {
                class: classFilter,
              },
            },
          }
        : {},
    })
  },
}
