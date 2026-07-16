'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setLoading(false)
      setError('E-Mail oder Passwort falsch.')
      return
    }

    try {
      const sessionRes = await fetch('/api/auth/session')
      const session = await sessionRes.json()

      if (session?.user?.role === 'ADMIN') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch {
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  async function handleSSOLogin() {
    await signIn('ovsv-sso', { callbackUrl: '/dashboard' })
  }

  return { email, setEmail, password, setPassword, error, loading, handleLogin, handleSSOLogin }
}