import { statisticsRepository } from '@/repositories/statistics.repository'

const SUBJECTS = ['Recht', 'Technik', 'Betrieb'] as const

export const statisticsService = {
  async getUserStats(userId: number) {
    const [known, medium, unknown, total, subjectCounts, progress] = await Promise.all([
      statisticsRepository.countByConfidence(userId, 'KNOWN'),
      statisticsRepository.countByConfidence(userId, 'MEDIUM'),
      statisticsRepository.countByConfidence(userId, 'UNKNOWN'),
      statisticsRepository.getTotalQuestions(),
      statisticsRepository.getQuestionsCountBySubject(),
      statisticsRepository.getProgressByUser(userId),
    ])

    const answered = known + medium + unknown
    const percentage = total > 0 ? Math.round((known / total) * 100) : 0

    const subjects = SUBJECTS.map((subjectName) => {
      const subjectTotal = subjectCounts.find((item) => item.subject === subjectName)?._count.id ?? 0
      const subjectKnown = progress.filter(
        (item) => item.question.subject === subjectName && item.confidence === 'KNOWN'
      ).length

      return {
        subject: subjectName,
        known: subjectKnown,
        total: subjectTotal,
        percentage: subjectTotal > 0 ? Math.round((subjectKnown / subjectTotal) * 100) : 0,
      }
    })

    return {
      total,
      answered,
      known,
      medium,
      unknown,
      percentage,
      subjects,
    }
  },

  async getProgressBySubject(userId: number) {
    return statisticsRepository.getProgressByUser(userId)
  },
}