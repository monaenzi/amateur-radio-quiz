import bcrypt from 'bcryptjs'
import { userRepository } from '@/repositories/user.repository'

export const authService = {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email)
    if (!user || !user.password) return null

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) return null

    return {
      id: String(user.id),
      email: user.email,
      name: user.name,
      role: user.role,
    }
  },

  async register(data: {
    email: string
    password: string
    name?: string
  }) {
    const existing = await userRepository.findByEmail(data.email)
    if (existing) throw new Error('E-Mail bereits vergeben')

    const hash = await bcrypt.hash(data.password, 10)
    return userRepository.create({
      email: data.email,
      password: hash,
      name: data.name,
    })
  },

  async findOrCreateSSOUser(data: {
    externalId: string
    email: string | null
    name: string | null
    callSign: string | null
  }) {
    const existing = await userRepository.findByExternalId(data.externalId)
    if (existing) {
      if (existing.callSign !== data.callSign) {
        await userRepository.updateCallSign(existing.id, data.callSign)
      }
      return existing
    }

    return userRepository.createSSOUser(data)
  },
}