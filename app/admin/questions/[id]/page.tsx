'use client'

import { use } from 'react'
import { useQuestionEditor } from './useQuestionEditor'
import AppButton from '@/components/AppButton'
import { Trash2 } from 'lucide-react';
import Header from '@/components/Header';

export default function QuestionEditor({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const {
    form,
    setForm,
    loading,
    error,
    isNew,
    updateAnswer,
    addAnswer,
    removeAnswer,
    toggleCorrectAnswer,
    addAttachment,
    removeAttachment,
    updateAttachment,
    handleSubmit,
  } = useQuestionEditor(id)

  return (
    <main className="min-h-screen bg-white p-6">
      <Header variant="admin" />
      
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        {isNew ? 'Neue Frage' : 'Frage bearbeiten'}
      </h1>

      <div className="flex flex-col gap-4 max-w-2xl">
        <input
          type="text"
          placeholder="Code (z.B. R-047)"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#008CEA] text-gray-600"
        />

        <textarea
          placeholder="Fragetext"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          rows={3}
          className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#008CEA] text-gray-600 resize-none"
        />

        <textarea
          placeholder="Erklärung (optional)"
          value={form.explanation}
          onChange={(e) => setForm({ ...form, explanation: e.target.value })}
          rows={3}
          className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#008CEA] text-gray-600 resize-none"
        />

        <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-gray-600">Anhänge</p>

            {form.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center gap-2">
                <select
                    value={attachment.type}
                    onChange={(e) => updateAttachment(index, 'type', e.target.value)}
                    className="rounded-md border border-gray-300 px-3 py-2 text-gray-600 outline-none focus:border-[#008CEA]"
                >
                    <option value="link">Link</option>
                    <option value="image">Bild</option>
                </select>

                <input
                    type="url"
                    placeholder="URL"
                    value={attachment.url}
                    onChange={(e) => updateAttachment(index, 'url', e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#008CEA] text-gray-600"
                />

                <button
                    onClick={() => removeAttachment(index)}
                    className="text-red-400 hover:text-red-600 px-2"
                >
                    <Trash2 size={18} />
                </button>
                </div>
            ))}

            <button
                onClick={addAttachment}
                className="mt-1 text-sm text-[#008CEA] hover:underline self-start"
            >
                + Anhang hinzufügen
            </button>
            </div>

        <div className="flex gap-2">
          <select
            value={form.class}
            onChange={(e) => setForm({ ...form, class: parseInt(e.target.value) })}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-600 outline-none focus:border-[#008CEA]"
          >
            <option value={1}>Klasse 1</option>
            <option value={3}>Klasse 3</option>
            <option value={4}>Klasse 4</option>
          </select>

          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-600 outline-none focus:border-[#008CEA]"
          >
            <option value="Recht">Recht</option>
            <option value="Technik">Technik</option>
            <option value="Betrieb">Betrieb</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold text-gray-600">Antworten</p>
          {form.answers.map((answer, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={() => toggleCorrectAnswer(index)}
                className="accent-[#008CEA]"
              />
              <input
                type="text"
                placeholder={`Antwort ${index + 1}`}
                value={answer.text}
                onChange={(e) => updateAnswer(index, 'text', e.target.value)}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#008CEA] text-gray-600"
              />
              {form.answers.length > 2 && (
                <button
                  onClick={() => removeAnswer(index)}
                  className="text-red-400 hover:text-red-600 px-2"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={addAnswer}
            className="mt-1 text-sm text-[#008CEA] hover:underline self-start"
          >
            + Antwort hinzufügen
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <AppButton onClick={handleSubmit} disabled={loading}>
          {loading ? 'Speichern...' : 'Speichern'}
        </AppButton>
      </div>
    </main>
  )
}