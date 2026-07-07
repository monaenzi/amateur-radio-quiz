'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export type Answer = {
  text: string
  isCorrect: boolean
}

export type Attachment = {
  url: string
  type: 'image' | 'audio' | 'link'
}

export type QuestionForm = {
  text: string
  explanation: string
  classes: number[]
  subject: string
  code: string
  attachments: Attachment[]
  answers: Answer[]
}

const defaultForm: QuestionForm = {
  text: '',
  explanation: '',
  classes: [1],
  subject: 'Recht',
  code: '',
  attachments: [],
  answers: [
    { text: '', isCorrect: false },
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
          if (!data || data.error) return
          setForm({
            text: data.text,
            explanation: data.explanation ?? '',
            classes: data.classes.map((c: { class: number }) => c.class),
            subject: data.subject,
            code: data.code ?? '',
            attachments: data.attachments ?? [],
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
    setForm({
      ...form,
      answers: form.answers.filter((_, i) => i !== index),
    })
  }

  function toggleCorrectAnswer(index: number) {
    const updated = form.answers.map((a, i) =>
      i === index ? { ...a, isCorrect: !a.isCorrect } : a
    )
    setForm({ ...form, answers: updated })
  }

  function addAttachment() {
    setForm({
      ...form,
      attachments: [...form.attachments, { url: '', type: 'link' }],
    })
  }

  function removeAttachment(index: number) {
    setForm({
      ...form,
      attachments: form.attachments.filter((_, i) => i !== index),
    })
  }

  function updateAttachment(index: number, field: keyof Attachment, value: string) {
    const updated = [...form.attachments]
    updated[index] = { ...updated[index], [field]: value }
    setForm({ ...form, attachments: updated })
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

  async function handleSubmitAndPreview() {
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

    const data = await res.json()
    const questionId = isNew ? data.id : id
    router.push(`/admin/questions/${questionId}/preview`)
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
    addAttachment,
    removeAttachment,
    updateAttachment,
    handleSubmit,
    handleSubmitAndPreview,
  }
}
