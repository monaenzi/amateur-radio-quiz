import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import { Scale, Radio, RadioTower } from 'lucide-react'
import { auth } from '@/auth'
import { statisticsService } from '@/services/statistics.service'

const subjectIcons: Record<string, React.ReactNode> = {
  Recht: <Scale size={22} className="text-[#008CEA]" />,
  Technik: <RadioTower size={22} className="text-[#008CEA]" />,
  Betrieb: <Radio size={22} className="text-[#008CEA]" />,
}

type Props = {
  searchParams: Promise<{ class?: string }>
}

export default async function StatistikPage({ searchParams }: Props) {
  const session = await auth()
  const isLoggedIn = !!session?.user
  const userId = session?.user?.id ? Number(session.user.id) : undefined
  const hasValidUserId = typeof userId === 'number' && !Number.isNaN(userId)
  const resolvedParams = await searchParams
  const classFilter = resolvedParams.class ? Number(resolvedParams.class) : undefined

  let stats = {
    total: 0,
    answered: 0,
    known: 0,
    medium: 0,
    unknown: 0,
    percentage: 0,
    subjects: [
      { subject: 'Recht', known: 0, total: 0, percentage: 0 },
      { subject: 'Technik', known: 0, total: 0, percentage: 0 },
      { subject: 'Betrieb', known: 0, total: 0, percentage: 0 },
    ],
  }

  if (hasValidUserId) {
    try {
      stats = await statisticsService.getUserStats(userId, classFilter)
    } catch {
      // stats bleibt beim Fallback
    }
  }

  return (
    <main className="min-h-screen bg-white overflow-y-auto md:p-8">
      <div className="w-full bg-white md:mx-auto md:max-w-7xl h-full flex flex-col justify-between">
        <Header variant={isLoggedIn ? 'welcome' : 'default'} />

        <div className="px-6 pb-24 pt-6">
          <h2 className="mb-3 text-sm font-bold tracking-wide text-gray-700">GESAMTFORTSCHRITT</h2>

          <div className="rounded-xl bg-[#E6F4FD] p-4">
            <p className="mb-2 text-3xl font-bold text-[#008CEA]">{stats.percentage}%</p>

            <div className="h-2 w-full rounded-full bg-gray-300">
              <div
                className="h-2 rounded-full bg-[#008CEA]"
                style={{ width: `${stats.percentage}%` }}
                role="progressbar"
                aria-valuenow={stats.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          <h2 className="mb-3 mt-8 text-sm font-bold tracking-wide text-gray-700">FRAGEN</h2>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-[#E6F4FD] py-4 text-center">
              <p className="text-2xl font-bold text-[#008CEA]">{stats.known}</p>
              <p className="text-sm text-gray-600">gelernt</p>
            </div>

            <div className="rounded-xl bg-[#E6F4FD] py-4 text-center">
              <p className="text-2xl font-bold text-[#008CEA]">{stats.medium}</p>
              <p className="text-sm text-gray-600">unsicher</p>
            </div>

            <div className="rounded-xl bg-[#E6F4FD] py-4 text-center">
              <p className="text-2xl font-bold text-[#008CEA]">{stats.unknown}</p>
              <p className="text-sm text-gray-600">offen</p>
            </div>
          </div>

          <h2 className="mb-3 mt-8 text-sm font-bold tracking-wide text-gray-700">FACHGEBIETE</h2>

          <div className="rounded-xl border border-gray-200 p-4">
            {stats.subjects.map((subjectStat, index) => (
              <div key={subjectStat.subject}>
                {index > 0 && <div className="border-t border-gray-200" />}
                <div className="flex items-center gap-4 py-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#E6F4FD]">
                    {subjectIcons[subjectStat.subject]}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-gray-900">{subjectStat.subject}</p>
                      <p className="font-bold text-[#008CEA]">{subjectStat.percentage}%</p>
                    </div>

                    <p className="text-sm text-gray-500">
                      {subjectStat.known} von {subjectStat.total} Fragen
                    </p>

                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-[#008CEA]"
                        style={{ width: `${subjectStat.percentage}%` }}
                        role="progressbar"
                        aria-valuenow={subjectStat.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FooterNav />
      </div>
    </main>
  )
}