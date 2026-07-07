import bcrypt from 'bcryptjs'
import { userRepository } from '@/repositories/user.repository'

export const authService = {
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email)
    if (!user) return null

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
}