'use client'

import { use } from 'react'
import { useQuestionEditor } from './useQuestionEditor'
import AppButton from '@/components/AppButton'
import { Trash2 } from 'lucide-react'
import Header from '@/components/Header'
import { useRouter } from 'next/navigation'
import Toast from '@/components/Toast'
import { useToast } from '@/lib/useToast'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function QuestionEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { toast, showToast, hideToast } = useToast()
  const {
    form,
    setForm,
    toggleClass,
    loading,
    error,
    isNew,
    isLoadingQuestion,
    uploadingIndex,
    updateAnswer,
    addAnswer,
    removeAnswer,
    toggleCorrectAnswer,
    addAttachment,
    removeAttachment,
    updateAttachment,
    handleSubmit,
    handleSubmitAndPreview,
    handleFileUpload,
  } = useQuestionEditor(id, showToast)

  return (
    <main className="min-h-screen bg-white">
      <Header variant="admin" />
      <Breadcrumbs items={[
        { label: 'Admin', href: '/admin' },
        { label: 'Fragen', href: '/admin/questions' },
        { label: isNew ? 'Neue Frage' : 'Frage bearbeiten' },
      ]} />

      <div className="p-6 pt-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">
          {isNew ? 'Neue Frage' : 'Frage bearbeiten'}
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            aria-label="Code"
            placeholder="Code (z.B. R-047)"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#008CEA] text-gray-600"
          />

          <textarea
            aria-label="Fragetext"
            placeholder="Fragetext"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            rows={3}
            className="rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#008CEA] text-gray-600 resize-none"
          />

          <textarea
            aria-label="Erklärung (optional)"
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
                  aria-label="Anhang-Typ"
                  onChange={(e) => updateAttachment(index, 'type', e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-gray-600 outline-none focus:border-[#008CEA]"
                >
                  <option value="link">Link</option>
                  <option value="image">Bild</option>
                </select>

                {attachment.type === 'image' ? (
                  <>
                    <input
                      type="url"
                      aria-label="Bild URL"
                      placeholder="Bild URL"
                      value={attachment.url}
                      onChange={(e) => updateAttachment(index, 'url', e.target.value)}
                      className="flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#008CEA] text-gray-600"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id={`file-upload-${index}`}
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        await handleFileUpload(index, file)
                      }}
                    />
                    <label
                      htmlFor={`file-upload-${index}`}
                      aria-label="Bild hochladen"
                      className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      {uploadingIndex === index ? '…' : '📷'}
                    </label>
                  </>
                ) : (
                  <input
                    type="url"
                    aria-label="URL"
                    placeholder="URL"
                    value={attachment.url}
                    onChange={(e) => updateAttachment(index, 'url', e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#008CEA] text-gray-600"
                  />
                )}

                <button
                  onClick={() => removeAttachment(index)}
                  aria-label="Anhang entfernen"
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

          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-gray-600">Prüfungskategorien</p>
            <div className="flex gap-4">
              {[1, 3, 4].map((classId) => (
                <label key={classId} className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={form.classes.includes(classId)}
                    onChange={() => toggleClass(classId)}
                    className="accent-[#008CEA]"
                  />
                  Klasse {classId}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold text-gray-600">Fachgebiet</p>
            <select
              value={form.subject}
              aria-label="Fachgebiet"
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-600 outline-none focus:border-[#008CEA]"
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
                  aria-label={`Antwort ${index + 1} als richtig markieren`}
                  checked={answer.isCorrect}
                  onChange={() => toggleCorrectAnswer(index)}
                  className="accent-[#008CEA]"
                />
                <input
                  type="text"
                  aria-label={`Antwort ${index + 1}`}
                  placeholder={`Antwort ${index + 1}`}
                  value={answer.text}
                  onChange={(e) => updateAnswer(index, 'text', e.target.value)}
                  className="flex-1 rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-[#008CEA] text-gray-600"
                />
                {form.answers.length > 2 && (
                  <button
                    onClick={() => removeAnswer(index)}
                    aria-label={`Antwort ${index + 1} entfernen`}
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

          {error && <p className="text-sm text-red-500">{error}</p>}

          <AppButton onClick={handleSubmit} disabled={loading || isLoadingQuestion}>
            {loading ? 'Speichern...' : 'Speichern'}
          </AppButton>

          <button
            onClick={handleSubmitAndPreview}
            disabled={loading || isLoadingQuestion}
            className="rounded-md border border-[#008CEA] px-6 py-3 font-bold text-[#008CEA] hover:bg-blue-50 disabled:opacity-50"
          >
            Speichern & Vorschau
          </button>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </main>
  )
}