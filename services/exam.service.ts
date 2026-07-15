import { examRepository } from '@/repositories/exam.repository'

export const examService = {
  async getExamQuestions(classFilter: number, limit: number = 20) {
    const questions = await examRepository.getRandomQuestions(classFilter, limit)

    // Antworten zufällig mischen
    return questions.map((q) => ({
      ...q,
      answers: q.answers.sort(() => Math.random() - 0.5),
    }))
  },

  async getLearningQuestions(userId: number, classFilter?: number, subject?: string) {
    const questions = await examRepository.getQuestionsForLearning(userId, classFilter, subject)

    const weight = { UNKNOWN: 3, MEDIUM: 2, KNOWN: 1 }

    const unknown = questions.filter(q => (q.progress[0]?.confidence ?? 'UNKNOWN') === 'UNKNOWN')
      .sort(() => Math.random() - 0.5)
    const medium = questions.filter(q => q.progress[0]?.confidence === 'MEDIUM')
      .sort(() => Math.random() - 0.5)
    const known = questions.filter(q => q.progress[0]?.confidence === 'KNOWN')
      .sort(() => Math.random() - 0.5)

    const result = []
    let u = 0, m = 0, k = 0

    while (u < unknown.length || m < medium.length || k < known.length) {
      for (let i = 0; i < 3 && u < unknown.length; i++) result.push(unknown[u++])
      for (let i = 0; i < 2 && m < medium.length; i++) result.push(medium[m++])
      for (let i = 0; i < 1 && k < known.length; i++) result.push(known[k++])
    }

    return result
  },

  async getQuestionsBySubject(subject: string, classFilter?: number) {
    return examRepository.getQuestionsBySubject(subject, classFilter)
  },
}