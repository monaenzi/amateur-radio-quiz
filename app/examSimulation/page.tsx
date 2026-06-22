'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FooterNav from '@/components/FooterNav'
import AppButton from '@/components/AppButton'

const ANSWERS = [
  { id: 'A', text: 'Das Rundfunkgesetz (RFG) und die EU-Datenschutzverordnung', correct: false },
  {
    id: 'B',
    text: 'Das Telekommunikationsgesetz (TKG) und die Amateurfunkverordnung (AFV)',
    correct: true,
  },
  { id: 'C', text: 'Die Gewerbeordnung und das Elektrotechnikgesetz', correct: false },
  {
    id: 'D',
    text: 'Ausschließlich internationale ITU-Regelungen ohne nationales Gesetz',
    correct: false,
  },
]

const EXPLANATION =
  'Der Amateurfunk wird in Österreich durch das Telekommunikationsgesetz (TKG) sowie die Amateurfunkverordnung (AFV) geregelt, die die Details zu Bewilligungen, Rufzeichen und Betrieb festlegen.'

export default function ExamPage() {
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const toggleSelect = (id: string) => {
    if (submitted) return
    setSelected((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleNext = () => {
    setSelected([])
    setSubmitted(false)
    setShowExplanation(false)
  }

  const getButtonStyle = (answer: (typeof ANSWERS)[number]) => {
    const isSelected = selected.includes(answer.id)

    if (!submitted) {
      return isSelected
        ? 'border-[#008CEA] bg-[#E6F4FF] text-[#008CEA]'
        : 'border-gray-700 text-[#808080]'
    }

    if (answer.correct) {
      return 'border-green-500 bg-green-50 text-green-700'
    }
    if (isSelected) {
      return 'border-red-500 bg-red-50 text-red-700'
    }
    return 'border-gray-300 text-gray-400'
  }

  const getLetterStyle = (answer: (typeof ANSWERS)[number]) => {
    if (!submitted) return 'text-[#008CEA]'
    if (answer.correct) return 'text-green-600'
    if (selected.includes(answer.id)) return 'text-red-600'
    return 'text-gray-400'
  }

  return (
    <main className="h-screen overflow-x-hidden overflow-y-auto bg-white md:p-8">
      <div className="flex min-h-screen w-full flex-col bg-white md:mx-auto md:max-w-7xl">
        <Header variant="default" />

        <section className="mx-auto w-full max-w-md flex-1 px-6 py-6 pb-32 md:max-w-5xl md:px-0 md:py-4 md:pb-8">
          <div className="md:flex md:gap-8">
            {/* Linke Spalte (auf Mobile: die einzige Spalte) */}
            <div className="md:flex-1">
              <div className="mb-15 md:mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800 md:text-lg">Prüfungssimulation</h1>

                <span className="text-gray-400 md:text-base">1/9</span>
              </div>

              <p className="mb-6 mt-4 text-left text-xl text-[#008CEA] md:text-base">
                Welche gesetzlichen Bestimmungen sind für den Amateurfunk maßgeblich?
              </p>

              <div className="flex flex-col gap-3">
                {ANSWERS.map((answer) => (
                  <button
                    key={answer.id}
                    onClick={() => toggleSelect(answer.id)}
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
                {/* Erklärung unterhalb: NUR auf Mobile (Desktop kriegt die Seitenspalte unten) */}
                {submitted && showExplanation && (
                  <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600 md:hidden">
                    {EXPLANATION}
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

            {/* Rechte Spalte: Erklärung NUR auf Desktop, neben den Antworten */}
            {submitted && showExplanation && (
              <div className="hidden md:block md:w-80 md:flex-shrink-0">
                <div className="sticky top-4 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                  <p className="mb-2 font-semibold text-gray-800">Erklärung</p>
                  {EXPLANATION}
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
