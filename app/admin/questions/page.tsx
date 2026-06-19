'use client'

import { useQuestionList } from './useQuestionList'
import { useRouter } from 'next/navigation'
import { Trash2, Pen } from 'lucide-react';

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
    fetchQuestions,
    deleteQuestion,
  } = useQuestionList()

  return (
    <main className="min-h-screen bg-white p-6">
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
              {q.code && (
                <span className="text-xs font-bold text-[#008CEA]">
                  {q.code}
                </span>
              )}
              <p className="text-sm text-gray-600 line-clamp-2">{q.text}</p>
              <div className="flex gap-2">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  {q.subject}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  Klasse {q.class}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => router.push(`/admin/fragen/${q.id}`)}
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
    </main>
  )
}