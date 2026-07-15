import { statisticsRepository } from '@/repositories/statistics.repository'

const SUBJECTS = ['Recht', 'Technik', 'Betrieb'] as const

export const statisticsService = {
  async getUserStats(userId: number, classFilter?: number) {
    const [known, medium, unknown, total, subjectCounts, progress] = await Promise.all([
      statisticsRepository.countByConfidence(userId, 'KNOWN', classFilter),
      statisticsRepository.countByConfidence(userId, 'MEDIUM', classFilter),
      statisticsRepository.countByConfidence(userId, 'UNKNOWN', classFilter),
      statisticsRepository.getTotalQuestions(classFilter),
      statisticsRepository.getQuestionsCountBySubject(classFilter),
      statisticsRepository.getProgressByUser(userId, classFilter),
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

  async getProgressBySubject(userId: number, classFilter?: number) {
    return statisticsRepository.getProgressByUser(userId, classFilter)
  },
}