'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import AppButton from '@/components/AppButton'
import { useQuestionPreview } from './useQuestionPreview'

const LETTER_MAP = ['A', 'B', 'C', 'D', 'E', 'F']

export default function QuestionPreview({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { question, loading } = useQuestionPreview(id)
  const [mode, setMode] = useState<'karteikarte' | 'pruefung'>('karteikarte')
  const [showAnswer, setShowAnswer] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  if (loading) return <p className="p-6 text-gray-400">Laden...</p>
  if (!question) return <p className="p-6 text-gray-400">Frage nicht gefunden.</p>

  const toggleSelect = (letter: string) => {
    if (submitted) return
    setSelected((prev) =>
      prev.includes(letter) ? prev.filter((a) => a !== letter) : [...prev, letter]
    )
  }

  const getButtonStyle = (index: number, isCorrect: boolean) => {
    const letter = LETTER_MAP[index]
    const isSelected = selected.includes(letter)

    if (!submitted) {
      return isSelected
        ? 'border-[#008CEA] bg-[#E6F4FF] text-[#008CEA]'
        : 'border-gray-700 text-[#808080]'
    }
    if (isCorrect) return 'border-green-500 bg-green-50 text-green-700'
    if (isSelected) return 'border-red-500 bg-red-50 text-red-700'
    return 'border-gray-300 text-gray-400'
  }

  const getLetterStyle = (index: number, isCorrect: boolean) => {
    const letter = LETTER_MAP[index]
    if (!submitted) return 'text-[#008CEA]'
    if (isCorrect) return 'text-green-600'
    if (selected.includes(letter)) return 'text-red-600'
    return 'text-gray-400'
  }

  const resetPruefung = () => {
    setSelected([])
    setSubmitted(false)
    setShowExplanation(false)
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3 text-center">
        <p className="text-sm text-yellow-700 font-bold">Vorschau — So sehen User diese Frage</p>
        <button
          onClick={() => router.push(`/admin/questions/${id}`)}
          className="mt-1 text-xs text-yellow-600 hover:underline"
        >
          ← Zurück zum Editor
        </button>
      </div>

      <div className="flex gap-2 px-6 pt-4 max-w-2xl mx-auto">
        <button
          onClick={() => { setMode('karteikarte'); setShowAnswer(false) }}
          className={`flex-1 rounded-md py-2 text-sm font-bold transition ${
            mode === 'karteikarte'
              ? 'bg-[#008CEA] text-white'
              : 'border border-gray-300 text-gray-600'
          }`}
        >
          Karteikarte
        </button>
        <button
          onClick={() => { setMode('pruefung'); resetPruefung() }}
          className={`flex-1 rounded-md py-2 text-sm font-bold transition ${
            mode === 'pruefung'
              ? 'bg-[#008CEA] text-white'
              : 'border border-gray-300 text-gray-600'
          }`}
        >
          Prüfungsmodus
        </button>
      </div>

      {mode === 'karteikarte' && (
        <section className="mx-auto flex w-full max-w-sm flex-col px-6 py-4 md:max-w-2xl md:px-8">
          <section className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl bg-[#d7efff] p-8 text-center md:min-h-[35vh] md:p-12 mt-6">
            <p className="mb-8 text-sm font-bold text-[#008CEA] md:text-base">
              {showAnswer ? 'Antwort' : 'Frage'}
            </p>
            <h1 className="text-xl font-bold leading-relaxed text-gray-700 md:text-2xl">
              {showAnswer
                ? question.answers.filter((a) => a.isCorrect).map((a) => a.text).join(', ')
                : question.text}
            </h1>
          </section>

          <div className="mt-8 md:mx-auto md:w-full md:max-w-md">
            {!showAnswer ? (
              <AppButton onClick={() => setShowAnswer(true)}>Antwort anzeigen</AppButton>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                <button className="h-10 w-full rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90">✓</button>
                <button className="h-10 w-full rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90">~</button>
                <button className="h-10 w-full rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90">✕</button>
              </div>
            )}
          </div>
        </section>
      )}

      {mode === 'pruefung' && (
        <section className="mx-auto w-full max-w-md flex-1 px-6 py-6 md:max-w-5xl md:px-0 md:py-4">
          <div className="md:flex md:gap-8">
            <div className="md:flex-1">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 md:text-lg">Prüfungssimulation</h1>
              </div>

              <p className="mb-6 mt-4 text-left text-xl text-[#008CEA] md:text-base">
                {question.text}
              </p>

              <div className="flex flex-col gap-3">
                {question.answers.map((answer, index) => (
                  <button
                    key={answer.id}
                    onClick={() => toggleSelect(LETTER_MAP[index])}
                    disabled={submitted}
                    className={`w-full rounded-xl border p-4 text-center transition-colors md:p-2 md:text-xs ${getButtonStyle(index, answer.isCorrect)}`}
                  >
                    <span className={`mr-3 font-bold ${getLetterStyle(index, answer.isCorrect)}`}>
                      {LETTER_MAP[index]}
                    </span>
                    {answer.text}
                  </button>
                ))}

                {submitted && question.explanation && (
                  <button
                    onClick={() => setShowExplanation((prev) => !prev)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-700 p-4 text-center text-gray-800 md:rounded-lg md:p-2 md:text-xs"
                  >
                    Erklärung {showExplanation ? 'ausblenden' : 'einblenden'}
                  </button>
                )}

                {submitted && showExplanation && (
                  <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600 md:hidden">
                    {question.explanation}
                  </div>
                )}
              </div>

              <div className="mt-8 md:mx-auto md:w-full md:max-w-md">
                {!submitted ? (
                  <AppButton onClick={() => setSubmitted(true)}>Prüfen</AppButton>
                ) : (
                  <AppButton onClick={resetPruefung}>Nochmal</AppButton>
                )}
              </div>
            </div>

            {submitted && showExplanation && question.explanation && (
              <div className="hidden md:block md:w-80 md:flex-shrink-0">
                <div className="sticky top-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                  <p className="mb-2 font-semibold text-gray-800">Erklärung</p>
                  {question.explanation}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  )
}