import { prisma } from '@/lib/prisma'
import fallbackQuestionsData from '@/prisma/questions.json'

type PaginationOptions = {
  page?: number
  pageSize?: number
}

type FallbackQuestion = {
  id: string
  question: string
  category: string
  classes: number[]
}

const fallbackQuestions = fallbackQuestionsData as FallbackQuestion[]

function mapFallbackQuestion(question: FallbackQuestion) {
  return {
    id: Number(question.id.replace(/\D/g, '')) || 0,
    text: question.question,
    explanation: null,
    subject: question.category,
    code: question.id,
    answers: [],
    attachments: [],
    classes: question.classes.map((classId) => ({ class: classId })),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

function filterFallbackQuestions(
  filters: { search?: string; classFilter?: number; subjectFilter?: string[] }
) {
  const { search, classFilter, subjectFilter } = filters
  const normalizedSearch = search?.trim().toLowerCase()

  return fallbackQuestions.filter((question) => {
    const matchesClass = classFilter === undefined || question.classes.includes(classFilter)
    const matchesSubject = !subjectFilter || subjectFilter.includes(question.category)
    const matchesSearch =
      !normalizedSearch ||
      [question.question, question.category, question.id]
        .some((value) => value.toLowerCase().includes(normalizedSearch))

    return matchesClass && matchesSubject && matchesSearch
  })
}

export const questionRepository = {
  async findMany(
    filters: { search?: string; classFilter?: number; subjectFilter?: string[] },
    pagination?: PaginationOptions
  ) {
    const { search, classFilter, subjectFilter } = filters
    const page = pagination?.page && pagination.page > 0 ? pagination.page : 1
    const pageSize = pagination?.pageSize && pagination.pageSize > 0 ? pagination.pageSize : 10

    const where = {
      ...(classFilter !== undefined && {
        classes: {
          some: {
            class: classFilter,
          },
        },
      }),

      ...(subjectFilter && {
        subject: {
          in: subjectFilter,
        },
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
    }

    const dbItems = await prisma.question.findMany({
      where,
      include: {
        answers: true,
        attachments: true,
        classes: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (dbItems.length > 0) {
      if (pagination) {
        const skip = (page - 1) * pageSize
        const total = dbItems.length

        return {
          items: dbItems.slice(skip, skip + pageSize),
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        }
      }

      return dbItems
    }

    const fallbackItems = filterFallbackQuestions(filters).map(mapFallbackQuestion)

    if (pagination) {
      const skip = (page - 1) * pageSize
      const total = fallbackItems.length

      return {
        items: fallbackItems.slice(skip, skip + pageSize),
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      }
    }

    return fallbackItems
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
