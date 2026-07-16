'use client'

import { useState, useEffect } from 'react'

type Answer = {
  id: number
  text: string
  isCorrect: boolean
}

type Question = {
  id: number
  text: string
  explanation: string | null
  code: string | null
  classes: { class: number }[]
  subject: string
  answers: Answer[]
  attachments: {
    url: string
    type: string
  }[]
}

export function useQuestionPreview(id: string) {
  const [question, setQuestion] = useState<Question | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/admin/questions/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => null)
          throw new Error(body?.error ?? 'Frage konnte nicht geladen werden')
        }
        return res.json()
      })
      .then((data) => setQuestion(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return { question, loading, error }
}