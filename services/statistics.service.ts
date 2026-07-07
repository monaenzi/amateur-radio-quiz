import { statisticsRepository } from '@/repositories/statistics.repository'

export const statisticsService = {
  async getUserStats(userId: number) {
    const [known, medium, unknown, total] = await Promise.all([
      statisticsRepository.countByConfidence(userId, 'KNOWN'),
      statisticsRepository.countByConfidence(userId, 'MEDIUM'),
      statisticsRepository.countByConfidence(userId, 'UNKNOWN'),
      statisticsRepository.getTotalQuestions(),
    ])

    const answered = known + medium + unknown
    const percentage = total > 0 ? Math.round((known / total) * 100) : 0

    return {
      total,
      answered,
      known,
      medium,
      unknown,
      percentage,
    }
  },

  async getProgressBySubject(userId: number) {
    return statisticsRepository.getProgressByUser(userId)
  },
}