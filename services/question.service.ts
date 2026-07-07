import { questionRepository } from '@/repositories/question.repository'

export const questionService = {
  async getAll(filters: {
    search?: string
    classFilter?: string
    subjectFilter?: string
  }) {
    return questionRepository.findMany({
      search: filters.search,
      classFilter: filters.classFilter ? parseInt(filters.classFilter) : undefined,
      subjectFilter: filters.subjectFilter,
    })
  },

  async getById(id: number) {
    const question = await questionRepository.findById(id)
    if (!question) throw new Error('Frage nicht gefunden')
    return question
  },

  async create(data: {
    text: string
    explanation?: string
    class: number
    subject: string
    code?: string
    answers: { text: string; isCorrect: boolean }[]
    attachments: { url: string; type: string }[]
  }) {
    return questionRepository.create(data)
  },

  async update(id: number, data: {
    text: string
    explanation?: string
    class: number
    subject: string
    code?: string
    answers: { text: string; isCorrect: boolean }[]
    attachments: { url: string; type: string }[]
  }) {
    await this.getById(id) // wirft Error wenn nicht gefunden
    return questionRepository.update(id, data)
  },

  async delete(id: number) {
    await this.getById(id) // wirft Error wenn nicht gefunden
    return questionRepository.delete(id)
  },

  async getStats(classFilter?: string) {
    const classNum = classFilter ? parseInt(classFilter) : undefined
    const [total, bySubject] = await Promise.all([
      questionRepository.count(classNum),
      questionRepository.countBySubject(classNum),
    ])
    return { total, bySubject }
  },
}