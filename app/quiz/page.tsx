'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AppButton from '@/components/AppButton'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import { useSession } from 'next-auth/react'
import { offlineApi } from '@/lib/offline-api'
import { useOfflineSupport } from '@/lib/useOfflineSupport'

type Answer = {
  id: number
  text: string
  isCorrect: boolean
}

type Question = {
  id: number
  text: string
  answers: Answer[]
  attachments: {
    id: number
    url: string
    type: string
  }[]
  progress?: {
    confidence: string
  }[]
}

type PersistedQuizState = {
  currentIndex: number
  showAnswer: boolean
}

function getQuizStorageKey(classId: string, subject?: string) {
  return `quiz-progress:${classId}:${subject ?? 'all'}`
}

function readPersistedQuizState(classId: string, subject?: string): PersistedQuizState {
  if (typeof window === 'undefined') {
    return { currentIndex: 0, showAnswer: false }
  }

  try {
    const stored = sessionStorage.getItem(getQuizStorageKey(classId, subject))
    if (!stored) {
      return { currentIndex: 0, showAnswer: false }
    }

    const parsed = JSON.parse(stored) as Partial<PersistedQuizState>
    return {
      currentIndex: typeof parsed.currentIndex === 'number' ? parsed.currentIndex : 0,
      showAnswer: Boolean(parsed.showAnswer),
    }
  } catch {
    return { currentIndex: 0, showAnswer: false }
  }
}

export default function KarteikartenPage() {
  return (
    <Suspense fallback={null}>
      <KarteikartenPageContent />
    </Suspense>
  )
}

function KarteikartenPageContent() {
  const { data: session } = useSession()
  const isLoggedIn = !!session?.user
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isOnline } = useOfflineSupport()
  const classId = searchParams.get('class') ?? '1'
  const subject = searchParams.get('subject') ?? undefined
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(
    () => readPersistedQuizState(classId, subject).currentIndex
  )
  const [showAnswer, setShowAnswer] = useState(
    () => readPersistedQuizState(classId, subject).showAnswer
  )
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(
    function () {
      const restoredState = readPersistedQuizState(classId, subject)
      setCurrentIndex(restoredState.currentIndex)
      setShowAnswer(restoredState.showAnswer)
    },
    [classId, subject]
  )

  useEffect(
    function () {
      if (typeof window === 'undefined') return
      setLoading(true)
      setError(null)

      const url = subject
        ? `/api/questions/learning?class=${classId}&subject=${subject}`
        : `/api/questions/learning?class=${classId}`

      offlineApi
        .get(url)
        .then(function (data) {
          setQuestions(data)
        })
        .catch(function (err) {
          setError(err instanceof Error ? err.message : 'Fragen konnten nicht geladen werden')
        })
        .finally(function () {
          setLoading(false)
        })
    },
    [classId, subject, retryCount]
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (currentIndex >= questions.length && questions.length > 0) {
      sessionStorage.removeItem(getQuizStorageKey(classId, subject))
    }
  }, [currentIndex, questions.length, classId, subject])

  useEffect(
    function () {
      if (typeof window === 'undefined') return
      if (currentIndex >= questions.length) return

      sessionStorage.setItem(
        getQuizStorageKey(classId, subject),
        JSON.stringify({ currentIndex, showAnswer })
      )
    },
    [classId, currentIndex, showAnswer, subject, questions.length]
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

  async function handleConfidence(confidence: 'KNOWN' | 'MEDIUM' | 'UNKNOWN', questionId: number) {
    if (saving) return
    setSaving(true)

    if (isLoggedIn) {
      try {
        await offlineApi.post('/api/progress', { questionId, confidence })
      } catch {
        // progress save failed silently, user still proceeds
      }
    }

    setSaving(false)
    handleNext()
  }

  useEffect(() => {
    if (!lightboxUrl) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxUrl(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxUrl])

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

  if (error) {
    return (
      <main className="min-h-screen bg-white md:p-8">
        <div className="w-full bg-white md:mx-auto md:max-w-7xl">
          <Header variant={isLoggedIn ? 'welcome' : 'default'} />
          <div className="flex min-h-[calc(100vh-96px)] flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-red-500">{error}</p>
            <AppButton onClick={() => setRetryCount((prev) => prev + 1)}>
              Nochmal versuchen
            </AppButton>
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

              {showAnswer &&
                (card.attachments?.filter((a) => a.type === 'link').length ?? 0) > 0 && (
                  <div className="mt-6 flex flex-col items-center gap-1">
                    <p className="text-xs font-bold text-gray-500">Weitere Quellen</p>
                    {card.attachments
                      .filter((a) => a.type === 'link')
                      .map((a) => (
                        <a
                          key={a.id}
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="break-all text-sm font-medium text-[#008CEA] underline"
                        >
                          {a.url}
                        </a>
                      ))}
                  </div>
                )}

              {!showAnswer &&
                card.attachments
                  ?.filter((a) => a.type === 'image')
                  .map((a) => (
                    <div key={a.id} className="relative">
                      <img
                        src={a.url}
                        alt="Anhang"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                        className="mt-6 max-h-48 rounded-lg object-contain cursor-pointer hover:opacity-90"
                        onClick={(e) => {
                          e.stopPropagation()
                          setLightboxUrl(a.url)
                        }}
                      />
                      <div className="hidden mt-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-400 text-center">
                        Bild konnte nicht geladen werden
                      </div>
                    </div>
                  ))}
            </section>
          </div>

          <div className="mt-8 md:mx-auto md:w-full md:max-w-md">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Vorherige Karte"
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
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => handleConfidence('KNOWN', card.id)}
                      disabled={saving}
                      aria-label="Antwort gewusst"
                      className="h-10 w-full cursor-pointer rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => handleConfidence('MEDIUM', card.id)}
                      disabled={saving}
                      aria-label="Antwort teilweise gewusst"
                      className="h-10 w-full cursor-pointer rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ~
                    </button>
                    <button
                      onClick={() => handleConfidence('UNKNOWN', card.id)}
                      disabled={saving}
                      aria-label="Antwort nicht gewusst"
                      className="h-10 w-full cursor-pointer rounded-full bg-[#008CEA] font-bold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                aria-label="Nächste Karte"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-600 transition hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        <FooterNav />
      </div>

      {lightboxUrl && (
        <div
          onClick={() => setLightboxUrl(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Bild in Vollansicht"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-pointer"
        >
          <img
            src={lightboxUrl}
            alt="Vollbild"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
          />
        </div>
      )}
    </main>
  )
}
