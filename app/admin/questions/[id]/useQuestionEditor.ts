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

export function useQuestionEditor(id: string, showToast?: (message: string, type: 'success' | 'error') => void) {
  const router = useRouter()
  const isNew = id === 'new'
  const [form, setForm] = useState<QuestionForm>(defaultForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(!isNew)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/questions/${id}`)
        .then(async (res) => {
          if (!res.ok) throw new Error('Frage konnte nicht geladen werden')
          return res.json()
        })
        .then((data) => {
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
        .catch((err) => setError(err.message))
        .finally(() => setIsLoadingQuestion(false))
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

  function toggleClass(classId: number) {
    setForm((prev) => ({
      ...prev,
      classes: prev.classes.includes(classId)
        ? prev.classes.filter((c) => c !== classId)
        : [...prev.classes, classId].sort((a, b) => a - b),
    }))
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

  async function handleFileUpload(index: number, file: File) {
    setUploadingIndex(index)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', { method: 'POST', body: formData })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? 'Bild-Upload fehlgeschlagen')
      }

      const data = await res.json()

      if (!data.url) throw new Error('Bild-Upload fehlgeschlagen')

      updateAttachment(index, 'url', data.url)
    } catch (err) {
      showToast?.(err instanceof Error ? err.message : 'Bild-Upload fehlgeschlagen', 'error')
    } finally {
      setUploadingIndex(null)
    }
  }

  async function submitQuestion() {
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
      const data = await res.json().catch(() => null)
      setError(data?.error ?? 'Fehler beim Speichern.')
      return null
    }

    return res.json()
  }

  async function handleSubmit() {
    const data = await submitQuestion()
    if (!data) return

    showToast?.('Frage gespeichert!', 'success')
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push('/admin/questions')
  }

  async function handleSubmitAndPreview() {
    const data = await submitQuestion()
    if (!data) return

    const questionId = isNew ? data.id : id
    router.push(`/admin/questions/${questionId}/preview`)
  }

  return {
    form,
    setForm,
    toggleClass,
    loading,
    error,
    isNew,
    isLoadingQuestion,
    uploadingIndex,
    updateAnswer,
    addAnswer,
    removeAnswer,
    toggleCorrectAnswer,
    addAttachment,
    removeAttachment,
    updateAttachment,
    handleSubmit,
    handleSubmitAndPreview,
    handleFileUpload,
  }
}