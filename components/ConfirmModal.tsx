'use client'

type ConfirmModalProps = {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmModal({ title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="mt-2 text-sm text-gray-500">{message}</p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-md border border-gray-300 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-md bg-red-500 py-2 text-sm font-bold text-white hover:bg-red-600"
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  )
}