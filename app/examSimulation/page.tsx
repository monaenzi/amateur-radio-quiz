'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FooterNav from '@/components/FooterNav'
import AppButton from '@/components/AppButton'
import { useExamSimulation } from './useExamSimulation'
import { useEffect, useState } from 'react'

export default function ExamPage() {
  const {
    questions,
    currentQuestion,
    currentIndex,
    selected,
    submitted,
    showExplanation,
    loading,
    progressLabel,
    toggleSelect,
    handleSubmit,
    handleNext,
    setShowExplanation,
    setCurrentIndex,
    error,
    retry,
  } = useExamSimulation()

  const getButtonStyle = (answer: { id: number; text: string; isCorrect: boolean }) => {
    const isSelected = selected.includes(String(answer.id))

    if (!submitted) {
      return isSelected
        ? 'border-[#008CEA] bg-[#E6F4FF] text-[#008CEA]'
        : 'border-gray-700 text-[#808080]'
    }

    if (answer.isCorrect) {
      return 'border-green-500 bg-green-50 text-green-700'
    }
    if (isSelected) {
      return 'border-red-500 bg-red-50 text-red-700'
    }
    return 'border-gray-300 text-gray-400'
  }

  const getLetterStyle = (answer: { id: number; text: string; isCorrect: boolean }) => {
    const isSelected = selected.includes(String(answer.id))

    if (!submitted) return 'text-[#008CEA]'
    if (answer.isCorrect) return 'text-green-600'
    if (isSelected) return 'text-red-600'
    return 'text-gray-400'
  }

  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)

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
      <main className="h-screen overflow-x-hidden overflow-y-auto bg-white md:p-8">
        <div className="flex min-h-screen w-full flex-col bg-white md:mx-auto md:max-w-7xl">
          <Header variant="welcome" />
          <section className="mx-auto flex flex-1 items-center justify-center px-6 py-6">
            <p className="text-sm text-gray-500">Fragen werden geladen...</p>
          </section>
          <div className="md:hidden">
            <FooterNav />
          </div>
          <div className="hidden md:block">
            <Footer />
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="h-screen overflow-x-hidden overflow-y-auto bg-white md:p-8">
        <div className="flex min-h-screen w-full flex-col bg-white md:mx-auto md:max-w-7xl">
          <Header variant="welcome" />
          <section className="mx-auto flex flex-1 flex-col items-center justify-center gap-4 px-6 py-6 text-center">
            <p className="text-sm text-red-500">{error}</p>
            <AppButton onClick={retry}>Nochmal versuchen</AppButton>
          </section>
          <div className="md:hidden">
            <FooterNav />
          </div>
          <div className="hidden md:block">
            <Footer />
          </div>
        </div>
      </main>
    )
  }

  if (!loading && questions.length === 0) {
    return (
      <main className="h-screen overflow-x-hidden overflow-y-auto bg-white md:p-8">
        <div className="flex min-h-screen w-full flex-col bg-white md:mx-auto md:max-w-7xl">
          <Header variant="welcome" />
          <section className="mx-auto flex flex-1 items-center justify-center px-6 py-6">
            <p className="text-sm text-gray-500">Keine Fragen für diese Auswahl gefunden.</p>
          </section>
          <div className="md:hidden">
            <FooterNav />
          </div>
          <div className="hidden md:block">
            <Footer />
          </div>
        </div>
      </main>
    )
  }

  if (currentIndex >= questions.length) {
    return (
      <main className="h-screen overflow-x-hidden overflow-y-auto bg-white md:p-8">
        <div className="flex min-h-screen w-full flex-col bg-white md:mx-auto md:max-w-7xl">
          <Header variant="welcome" />
          <section className="mx-auto flex flex-1 flex-col items-center justify-center px-6 py-6 text-center">
            <h1 className="mb-3 text-2xl font-bold text-gray-800">Prüfung abgeschlossen</h1>
            <p className="mb-6 text-sm text-gray-500">Du hast alle geladenen Fragen durchgearbeitet.</p>
            <AppButton onClick={() => setCurrentIndex(0)}>Erneut starten</AppButton>
          </section>
          <div className="md:hidden">
            <FooterNav />
          </div>
          <div className="hidden md:block">
            <Footer />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="h-screen overflow-x-hidden overflow-y-auto bg-white md:p-8">
      <div className="flex min-h-screen w-full flex-col bg-white md:mx-auto md:max-w-7xl">
        <Header variant="welcome" />

        <section className="mx-auto w-full max-w-md flex-1 px-6 py-6 pb-32 md:max-w-5xl md:px-0 md:py-4 md:pb-8">
          <div className="md:flex md:gap-8">
            <div className="md:flex-1">
              <div className="mb-16 md:mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 md:text-lg">Prüfungssimulation</h1>
                <span className="text-gray-400 md:text-base">{progressLabel}</span>
              </div>

              <p className="mb-6 mt-4 text-left text-xl text-[#008CEA] md:text-base">
                {currentQuestion.text}
              </p>

              {currentQuestion.attachments?.filter((a) => a.type === 'image').map((a) => (
                <div key={a.id} className="relative">
                    <img
                      src={a.url}
                      alt="Anhang"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextElementSibling?.classList.remove('hidden')
                      }}
                      className="mb-4 max-h-48 rounded-lg object-contain mx-auto cursor-pointer hover:opacity-90"
                      onClick={() => setLightboxUrl(a.url)}
                    />
                    <div className="hidden mb-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-400 text-center">
                      Bild konnte nicht geladen werden
                    </div>
                  </div>
              ))}

              <div className="flex flex-col gap-3">
                {currentQuestion.answers.length > 0 ? (
                  currentQuestion.answers.map((answer, index) => (
                    <button
                      key={answer.id}
                      onClick={() => toggleSelect(String(answer.id))}
                      disabled={submitted}
                      className={`w-full rounded-xl border p-4 text-center transition-colors md:p-2 md:text-xs ${getButtonStyle(answer)}`}
                    >
                      <span className={`mr-3 font-bold ${getLetterStyle(answer)}`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      {answer.text}
                    </button>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-500">
                    Für diese Frage sind noch keine Antwortoptionen hinterlegt.
                  </div>
                )}

                {submitted && (
                  <button
                    onClick={() => setShowExplanation((prev) => !prev)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-700 p-4 text-center text-gray-800 md:rounded-lg md:p-2 md:text-xs cursor-pointer"
                  >
                    Erklärung {showExplanation ? 'ausblenden' : 'einblenden'}
                  </button>
                )}

                {submitted && showExplanation && (
                  <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600 md:hidden">
                    {currentQuestion.explanation ?? 'Keine Erklärung verfügbar.'}

                    {(currentQuestion.attachments?.filter((a) => a.type === 'link').length ?? 0) > 0 && (
                      <div className="mt-3 flex flex-col gap-1">
                        <p className="text-xs font-bold text-gray-500">Weitere Quellen</p>
                        {currentQuestion.attachments
                          .filter((a) => a.type === 'link')
                          .map((a) => (
                            <a
                              key={a.id}
                              href={a.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-sm font-medium text-[#008CEA] underline"
                            >
                              {a.url}
                            </a>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8 md:mx-auto md:w-full md:max-w-md">
                {!submitted ? (
                  <AppButton onClick={handleSubmit}>Prüfen</AppButton>
                ) : (
                  <AppButton onClick={handleNext}>Weiter</AppButton>
                )}
              </div>
            </div>

            {submitted && showExplanation && (
              <div className="hidden md:block md:w-80 md:shrink-0">
                <div className="sticky top-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                  <p className="mb-2 font-semibold text-gray-800">Erklärung</p>
                  {currentQuestion.explanation ?? 'Keine Erklärung verfügbar.'}

                  {(currentQuestion.attachments?.filter((a) => a.type === 'link').length ?? 0) > 0 && (
                    <div className="mt-3 flex flex-col gap-1">
                      <p className="text-xs font-bold text-gray-500">Weitere Quellen</p>
                      {currentQuestion.attachments
                        .filter((a) => a.type === 'link')
                        .map((a) => (
                          <a
                            key={a.id}
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="break-all text-sm font-medium text-[#008CEA] underline"
                          >
                            {a.url}
                          </a>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="md:hidden">
          <FooterNav />
        </div>

        <div className="hidden md:block">
          <Footer />
        </div>
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