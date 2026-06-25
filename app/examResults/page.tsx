import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import Footer from '@/components/Footer'
import AppButton from '@/components/AppButton'

const categories = [
  { label: 'Recht', correct: 2, total: 3 },
  { label: 'Technik', correct: 2, total: 3 },
  { label: 'Betrieb', correct: 3, total: 3 },
]

export default function PruefungErgebnis() {
  const percentage = 78
  const correctAnswers = 7

  return (
    <main className="min-h-screen bg-white md:p-8">
      <div className="w-full bg-white md:mx-auto md:max-w-7xl">
        <Header variant="welcome" />

        <div className="flex flex-col px-6 pb-24 pt-6 md:px-12 md:pt-10">
          {/* Warning */}
          <p className="mb-4 text-center text-sm text-gray-500 md:mb-2">
            <span className="font-bold text-red-600">ACHTUNG!</span> Diese Ergebnisse sind keine
            Garantie
          </p>

          {/* Title */}
          <h1 className="mb-20 text-center text-2xl font-bold leading-tight text-gray-900 md:mb-8">
            Prüfungssimulation Ergebnis
          </h1>

          {/* Mobile: Score row */}
          <div className="mb-6 flex items-center gap-4 md:hidden">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <span className="text-xl font-bold text-[#008CEA]">{percentage}%</span>
            </div>
            <div>
              <p className="text-lg font-bold text-[#008CEA]">Gratuliere!</p>
              <p className="text-sm text-gray-500">
                {correctAnswers} potenzielle Fragen richtig beantwortet
              </p>
            </div>
          </div>

          {/* Desktop: two column layout */}
          <div className="md:flex md:items-start md:gap-12">
            {/* LEFT: Score card (desktop only) */}
            <div className="hidden md:flex md:w-56 md:shrink-0 md:flex-col md:items-center md:self-start md:rounded-2xl md:border md:border-gray-200 md:bg-gray-50 md:p-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xl font-bold text-[#008CEA]">{percentage}%</span>
              </div>
              <p className="mt-2 text-sm font-bold text-[#008CEA]">Gratuliere!</p>
              <p className="mt-1 mb-4 text-center text-xs text-gray-500">
                {correctAnswers} Fragen richtig beantwortet
              </p>

              <div className="mb-3 w-full border-t border-gray-200" />

              <div className="flex w-full justify-around">
                {categories.map((cat) => {
                  const pct = Math.round((cat.correct / cat.total) * 100)
                  return (
                    <div key={cat.label} className="flex flex-col items-center gap-1">
                      <p className="text-xs text-gray-500">{cat.label}</p>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-xs font-bold text-[#008CEA]">{pct}%</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {cat.correct}/{cat.total}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT: Kategorien + Button */}
            <div className="flex-1">
              <p className="mtmb-2 text-sm font-semibold text-gray-800">Ergebnis pro Fachgebiet</p>

              <div className="mb-2 w-full overflow-hidden rounded-xl border border-gray-200">
                {categories.map((cat, i) => (
                  <div
                    key={cat.label}
                    className={`flex w-full items-center gap-3 px-4 py-3 ${
                      i < categories.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      <span className="text-base">📋</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{cat.label}</p>
                      <p className="text-xs text-gray-400">
                        {cat.correct} von {cat.total} Fragen richtig
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <AppButton href="/examSimulation" className="md:mt-4 mt-15">
                Wiederholen
              </AppButton>
            </div>
          </div>
        </div>

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
