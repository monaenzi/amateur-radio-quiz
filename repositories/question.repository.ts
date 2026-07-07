import { prisma } from '@/lib/prisma'

export const questionRepository = {
  findMany(filters: {
    search?: string
    classFilter?: number
    subjectFilter?: string
  }) {
    const { search, classFilter, subjectFilter } = filters

    return prisma.question.findMany({
      where: {
        ...(classFilter && { class: classFilter }),
        ...(subjectFilter && { subject: subjectFilter }),
        ...(search && {
          OR: [
            { text: { contains: search } },
            { code: { contains: search } },
          ],
        }),
      },
      include: { answers: true, attachments: true },
      orderBy: { createdAt: 'desc' },
    })
  },

  findById(id: number) {
    return prisma.question.findUnique({
      where: { id },
      include: { answers: true, attachments: true },
    })
  },

  create(data: {
    text: string
    explanation?: string
    class: number
    subject: string
    code?: string
    answers: { text: string; isCorrect: boolean }[]
    attachments: { url: string; type: string }[]
  }) {
    return prisma.question.create({
      data: {
        text: data.text,
        explanation: data.explanation,
        class: data.class,
        subject: data.subject,
        code: data.code,
        answers: { create: data.answers },
        attachments: { create: data.attachments },
      },
    })
  },

  update(id: number, data: {
    text: string
    explanation?: string
    class: number
    subject: string
    code?: string
    answers: { text: string; isCorrect: boolean }[]
    attachments: { url: string; type: string }[]
  }) {
    return prisma.question.update({
      where: { id },
      data: {
        text: data.text,
        explanation: data.explanation,
        class: data.class,
        subject: data.subject,
        code: data.code,
        answers: {
          deleteMany: {},
          create: data.answers,
        },
        attachments: {
          deleteMany: {},
          create: data.attachments,
        },
      },
    })
  },

  delete(id: number) {
    return prisma.question.delete({ where: { id } })
  },

  countBySubject(classFilter?: number) {
    return prisma.question.groupBy({
      by: ['subject'],
      where: classFilter ? { class: classFilter } : {},
      _count: { id: true },
    })
  },

  count(classFilter?: number) {
    return prisma.question.count({
      where: classFilter ? { class: classFilter } : {},
    })
  },
}