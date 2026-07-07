'use client'

import Header from '@/components/Header'
import { useAdminDashboard } from './useAdminDashboard'
import LogoutButton from '@/components/LogoutButton'

export default function AdminDashboard() {
  const { session, selectedClass, setSelectedClass, stats } = useAdminDashboard()

  return (
    <main className="min-h-screen bg-white">
      <Header variant="authAdmin" />

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Admin</p>
            <h1 className="text-2xl font-bold text-gray-700">
              HALLO, {session?.user?.name ?? session?.user?.email}
            </h1>
          </div>
          <LogoutButton />
        </div>

        <select
          className="mt-4 rounded-md border border-gray-300 px-4 py-2 text-gray-600 outline-none focus:border-[#008CEA]"
          value={selectedClass ?? ''}
          onChange={(e) => setSelectedClass(e.target.value ? parseInt(e.target.value) : null)}
        >
          <option value="">Alle Klassen</option>
          <option value="1">Klasse 1</option>
          <option value="3">Klasse 3</option>
          <option value="4">Klasse 4</option>
        </select>

        {stats && (
          <div className="mt-6 flex flex-col gap-4">
            <div className="rounded-md bg-[#008CEA] p-6 text-center text-white">
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-sm">Fragen gesamt</p>
            </div>

            <div className="flex gap-4">
              {(stats.bySubject ?? []).map((s) => (
                <div key={s.subject} className="flex-1 rounded-md bg-gray-100 p-4 text-center">
                  <p className="text-xl font-bold text-gray-700">{s._count.id}</p>
                  <p className="text-sm text-gray-500">Fragen {s.subject}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
