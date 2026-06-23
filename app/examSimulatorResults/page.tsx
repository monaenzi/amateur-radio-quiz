import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import Footer from '@/components/Footer'

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
        <Header variant="default" />

        <div className="flex flex-col px-6 pb-24 pt-6">

          {/* Warning */}
          <p className="mb-4 text-sm text-gray-500">
            <span className="font-bold text-red-600">ACHTUNG!</span>{' '}
            Diese Ergebnisse sind keine Garantie
          </p>

          {/* Title */}
          <h1 className="mb-5 text-center text-2xl font-bold leading-tight text-gray-900">
            Prüfungssimulation Ergebnis
          </h1>

          {/* Score row */}
          <div className="mb-6 flex items-center gap-4">
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

          {/* Per category */}
          <p className="mb-2 text-sm font-semibold text-gray-800">
            Ergebnis pro Fachgebiet
          </p>

          <div className="mb-6 w-full overflow-hidden rounded-xl border border-gray-200">
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

          {/* Repeat button */}
          <button className="w-full rounded-full border-2 border-[#008CEA] py-3 text-base font-medium text-[#008CEA] transition hover:bg-blue-50 active:scale-95">
            Wiederholen
          </button>
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
     