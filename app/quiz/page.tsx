'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AppButton from '@/components/AppButton'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import { useSession } from 'next-auth/react'

type Answer = {
  id: number
  text: string
  isCorrect: boolean
}

type Question = {
  id: number
  text: string
  answers: Answer[]
}

export default function KarteikartenPage() {
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user
  const searchParams = useSearchParams()
  const router = useRouter()
  const classId = searchParams.get('class') ?? '1'
  const subject = searchParams.get('subject') ?? undefined

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(
    function () {
      const url = subject
        ? `/api/questions?class=${classId}&subject=${subject}`
        : `/api/questions?class=${classId}`

      fetch(url)
        .then(function (res) {
          return res.json()
        })
        .then(function (data) {
          setQuestions(data)
          setLoading(false)
        })
    },
    [classId, subject]
  )

  function handleNext() {
    setShowAnswer(false)

    if (currentIndex >= questions.length - 1) {
      setCurrentIndex(questions.length)
      return
    }

    setCurrentIndex(function (prev) {
      return prev + 1
    })
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setShowAnswer(false)
      setCurrentIndex(function (prev) {
        return prev - 1
      })
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white md:p-8">
        <div className="w-full bg-white md:mx-auto md:max-w-7xl">
          <Header variant={isLoggedIn ? 'welcome' : 'default'} />
          <div className="flex min-h-[calc(100vh-96px)] items-center justify-center">
            <p className="text-gray-500 animate-pulse">Fragen werden geladen...</p>
          </div>
        </div>
      </main>
    )
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-white md:p-8">
        <div className="w-full bg-white md:mx-auto md:max-w-7xl">
          <Header variant={isLoggedIn ? 'welcome' : 'default'} />
          <div className="flex min-h-[calc(100vh-96px)] flex-col items-center justify-center gap-4">
            <p className="text-gray-500">Keine Fragen für diese Auswahl gefunden.</p>
            <AppButton
              onClick={function () {
                router.push('/dashboard')
              }}
            >
              Zurück zum Dashboard
            </AppButton>
          </div>
        </div>
      </main>
    )
  }

  if (currentIndex >= questions.length) {
    return (
      <main className="min-h-screen bg-white md:p-8">
        <div className="w-full bg-white md:mx-auto md:max-w-7xl">
          <Header variant={isLoggedIn ? 'welcome' : 'default'} />
          <div className="flex min-h-[calc(100vh-96px)] flex-col items-center justify-center text-center px-6">
            <h1 className="mb-3 text-2xl font-bold text-gray-800">
              Du bist mit allen Fragen durch
            </h1>
            <p className="mb-6 text-sm text-gray-500">
              Gut gemacht! Du hast alle ausgewählten Fragen abgeschlossen.
            </p>
            <AppButton
              onClick={function () {
                router.push('/dashboard')
              }}
            >
              Zurück zum Dashboard
            </AppButton>
          </div>
        </div>
      </main>
    )
  }

  const card = questions[currentIndex]
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100)
  const isLastQuestion = currentIndex === questions.length - 1

  return (
    <main className="min-h-screen bg-white md:p-8">
      <div className="w-full bg-white md:mx-auto md:max-w-7xl">
        <Header variant={isLoggedIn ? 'welcome' : 'default'} />

        <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-sm flex-col px-6 py-4 md:max-w-2xl md:px-8">
          <p className="mb-4 text-sm font-bold text-gray-500">
            Karte {currentIndex + 1} von {questions.length}
          </p>

          <div className="mb-8 h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-[#008CEA] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div
            onClick={function () {
              setShowAnswer(function (prev) {
                return !prev
              })
            }}
            className="cursor-pointer"
          >
            <section className="flex min-h-[40vh] flex-col items-center justify-center rounded-3xl bg-[#d7efff] p-8 text-center shadow-sm transition hover:scale-[1.02] md:min-h-[35vh] md:p-12">
              <p className="mb-6 text-xs font-extrabold uppercase tracking-widest text-[#008CEA]">
                {showAnswer ? 'Antwort' : 'Frage'}
              </p>

              <h1 className="text-lg font-bold leading-relaxed text-gray-800 md:text-2xl">
                {showAnswer
                  ? (card.answers.find(function (a) {
                      return a.isCorrect
                    })?.text ?? 'Keine korrekte Antwort hinterlegt')
                  : card.text}
              </h1>
            </section>
          </div>

          <div className="mt-8 md:mx-auto md:w-full md:max-w-md">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-600 transition hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
              >
                ‹
              </button>

              <div className="flex-1">
                {!showAnswer ? (
                  <AppButton
                    onClick={function () {
                      setShowAnswer(true)
                    }}
                  >
                    Antwort anzeigen
                  </AppButton>
                ) : isLastQuestion ? (
                  <button
                    onClick={handleNext}
                    className="h-10 w-full cursor-pointer rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90"
                  >
                    Fertig
                  </button>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={handleNext}
                      className="h-10 w-full cursor-pointer rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90"
                    >
                      ✓
                    </button>
                    <button
                      onClick={handleNext}
                      className="h-10 w-full cursor-pointer rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90"
                    >
                      ~
                    </button>
                    <button
                      onClick={handleNext}
                      className="h-10 w-full cursor-pointer rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-600 transition hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        <FooterNav />
      </div>
    </main>
  )
}
