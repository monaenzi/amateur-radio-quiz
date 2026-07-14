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
  class: number
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

  useEffect(() => {
    fetch(`/api/admin/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) return
        setQuestion(data)
      })
      .finally(() => setLoading(false))
  }, [id])

  return { question, loading }
}