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

  async getLearningQuestions(userId: number, classFilter?: number) {
    const questions = await examRepository.getQuestionsForLearning(userId, classFilter)

    // Fragen nach Confidence gewichten
    return questions.sort((a, b) => {
      const confidenceA = a.progress[0]?.confidence ?? 'UNKNOWN'
      const confidenceB = b.progress[0]?.confidence ?? 'UNKNOWN'

      const weight = { UNKNOWN: 3, MEDIUM: 2, KNOWN: 1 }
      return weight[confidenceB] - weight[confidenceA]
    })
  },

  async getQuestionsBySubject(subject: string, classFilter?: number) {
    return examRepository.getQuestionsBySubject(subject, classFilter)
  },
}