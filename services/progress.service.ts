import { userRepository } from '@/repositories/user.repository'

export const progressService = {
  async updateProgress(userId: number, questionId: number, confidence: 'UNKNOWN' | 'MEDIUM' | 'KNOWN') {
    return userRepository.updateProgress(userId, questionId, confidence)
  },

  async getProgress(userId: number) {
    return userRepository.getProgress(userId)
  },
}