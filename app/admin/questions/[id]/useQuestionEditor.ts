'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export type Answer = {
  text: string
  isCorrect: boolean
}

export type QuestionForm = {
  text: string
  explanation: string
  class: number
  subject: string
  code: string
  answers: Answer[]
}

const defaultForm: QuestionForm = {
  text: '',
  explanation: '',
  class: 1,
  subject: 'Recht',
  code: '',
  answers: [
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
  ],
}

export function useQuestionEditor(id: string) {
  const router = useRouter()
  const isNew = id === 'new'
  const [form, setForm] = useState<QuestionForm>(defaultForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/questions/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            text: data.text,
            explanation: data.explanation ?? '',
            class: data.class,
            subject: data.subject,
            code: data.code ?? '',
            answers: data.answers.map((a: Answer) => ({
              text: a.text,
              isCorrect: a.isCorrect,
            })),
          })
        })
    }
  }, [id, isNew])

  function updateAnswer(index: number, field: keyof Answer, value: string | boolean) {
    const updated = [...form.answers]
    updated[index] = { ...updated[index], [field]: value }
    setForm({ ...form, answers: updated })
  }

  function addAnswer() {
    setForm({
      ...form,
      answers: [...form.answers, { text: '', isCorrect: false }],
    })
  }

  function removeAnswer(index: number) {
    const updated = form.answers.filter((_, i) => i !== index)
    setForm({ ...form, answers: updated })
  }

    function toggleCorrectAnswer(index: number) {
    const updated = form.answers.map((a, i) =>
        i === index ? { ...a, isCorrect: !a.isCorrect } : a
    )
    setForm({ ...form, answers: updated })
    }

  async function handleSubmit() {
    setLoading(true)
    setError('')

    const url = isNew ? '/api/admin/questions' : `/api/admin/questions/${id}`
    const method = isNew ? 'POST' : 'PUT'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setLoading(false)

    if (!res.ok) {
      setError('Fehler beim Speichern.')
      return
    }

    router.push('/admin/questions')
  }

  return {
    form,
    setForm,
    loading,
    error,
    isNew,
    updateAnswer,
    addAnswer,
    removeAnswer,
    toggleCorrectAnswer,
    handleSubmit,
  }
}