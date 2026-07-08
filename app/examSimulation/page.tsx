'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FooterNav from '@/components/FooterNav'
import AppButton from '@/components/AppButton'
import { useExamSimulation } from './useExamSimulation'

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
              <div className="mb-15 md:mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 md:text-lg">Prüfungssimulation</h1>
                <span className="text-gray-400 md:text-base">{progressLabel}</span>
              </div>

              <p className="mb-6 mt-4 text-left text-xl text-[#008CEA] md:text-base">
                {currentQuestion.text}
              </p>

              <div className="flex flex-col gap-3">
                {currentQuestion.answers.map((answer) => (
                  <button
                    key={answer.id}
                    onClick={() => toggleSelect(String(answer.id))}
                    disabled={submitted}
                    className={`w-full rounded-xl border p-4 text-center transition-colors md:p-2 md:text-xs ${getButtonStyle(answer)}`}
                  >
                    <span className={`mr-3 font-bold ${getLetterStyle(answer)}`}>{answer.id}</span>
                    {answer.text}
                  </button>
                ))}

                {submitted && (
                  <button
                    onClick={() => setShowExplanation((prev) => !prev)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-700 p-4 text-center text-gray-800 md:rounded-lg md:p-2 md:text-xs"
                  >
                    Erklärung {showExplanation ? 'ausblenden' : 'einblenden'}
                  </button>
                )}

                {submitted && showExplanation && (
                  <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600 md:hidden">
                    {currentQuestion.explanation ?? 'Keine Erklärung verfügbar.'}
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
              <div className="hidden md:block md:w-80 md:flex-shrink-0">
                <div className="sticky top-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                  <p className="mb-2 font-semibold text-gray-800">Erklärung</p>
                  {currentQuestion.explanation ?? 'Keine Erklärung verfügbar.'}
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
    </main>
  )
}
