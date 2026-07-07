import { questionRepository } from '@/repositories/question.repository'
import { NotFoundError } from '@/lib/errors'

export const questionService = {
  async getAll(filters: {
    search?: string
    classFilter?: string
    subjectFilter?: string
  }) {
    return questionRepository.findMany({
      search: filters.search,
      classFilter: filters.classFilter
        ? parseInt(filters.classFilter)
        : undefined,
      subjectFilter: filters.subjectFilter,
    })
  },

  async getById(id: number) {
    const question = await questionRepository.findById(id)

    if (!question) {
      throw new NotFoundError('Frage nicht gefunden')
    }

    return question
  },

  async create(data: {
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
    return questionRepository.create(data)
  },

  async update(
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
    const existing = await questionRepository.findById(id)

    if (!existing) {
      throw new NotFoundError('Frage nicht gefunden')
    }

    return questionRepository.update(id, data)
  },

  async delete(id: number) {
    const existing = await questionRepository.findById(id)

    if (!existing) {
      throw new NotFoundError('Frage nicht gefunden')
    }

    return questionRepository.delete(id)
  },

  async getStats(classFilter?: string) {
    const classNum = classFilter
      ? parseInt(classFilter)
      : undefined

    const [total, bySubject] = await Promise.all([
      questionRepository.count(classNum),
      questionRepository.countBySubject(classNum),
    ])

    return { total, bySubject }
  },
}