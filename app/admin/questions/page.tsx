'use client'

import { useQuestionList } from './useQuestionList'
import { useRouter } from 'next/navigation'
import { Trash2, Pen } from 'lucide-react'
import Header from '@/components/Header'

export default function QuestionList() {
  const router = useRouter()
  const {
    questions,
    search,
    setSearch,
    classFilter,
    setClassFilter,
    subjectFilter,
    setSubjectFilter,
    page,
    totalPages,
    total,
    goToPage,
    fetchQuestions,
    deleteQuestion,
  } = useQuestionList()

  return (
    <main className="min-h-screen bg-white">
      <Header variant="admin" />

      <div className="p-6">
        <div className="flex flex-col gap-3">
          {/* Suche */}
          <input
            type="text"
            placeholder="Frage suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchQuestions()}
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#008CEA] text-gray-600"
          />

          <div className="flex gap-2">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-600 outline-none focus:border-[#008CEA]"
            >
              <option value="">Alle Klassen</option>
              <option value="1">Klasse 1</option>
              <option value="3">Klasse 3</option>
              <option value="4">Klasse 4</option>
            </select>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-600 outline-none focus:border-[#008CEA]"
            >
              <option value="">Alle Fachgebiete</option>
              <option value="Recht">Recht</option>
              <option value="Technik">Technik</option>
              <option value="Betrieb">Betrieb</option>
            </select>
          </div>

          <button
            onClick={() => router.push('/admin/questions/new')}
            className="rounded-md bg-[#008CEA] px-6 py-3 font-bold text-white hover:bg-blue-600"
          >
            + Frage hinzufügen
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {questions.length === 0 && (
            <p className="text-center text-gray-400">Keine Fragen gefunden.</p>
          )}

          {questions.map((q) => (
            <div
              key={q.id}
              className="flex items-center justify-between rounded-md border border-gray-200 px-4 py-3"
            >
              <div className="flex flex-col gap-1">
                {q.code && <span className="text-xs font-bold text-[#008CEA]">{q.code}</span>}
                <p className="text-sm text-gray-600 line-clamp-2">{q.text}</p>
                <div className="flex gap-2">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    {q.subject}
                  </span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                    Klasse {q.classes.map((c) => c.class).join(', ')}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/admin/questions/${q.id}`)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <Pen />
                </button>
                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="rounded-md border border-red-200 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        {total > 0 && (
          <div className="mt-4 flex flex-col items-center gap-2 border-t border-gray-200 pt-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
            <p>
              Seite {page} von {totalPages} • {total} Fragen gesamt
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Zurück
              </button>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Weiter
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
