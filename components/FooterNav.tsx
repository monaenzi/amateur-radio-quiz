'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Home, BookOpen, ClipboardList, ChartColumn } from 'lucide-react'

export default function FooterNav() {
  const { status } = useSession()
  const searchParams = useSearchParams()
  const examHref = status === 'authenticated' ? '/examSimulation' : '/exam_locked'
  const currentClass = searchParams.get('class')
  const statisticsHref = currentClass ? `/statistics?class=${currentClass}` : '/statistics'

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-[#008CEA] bg-white md:hidden">
      <div className="grid grid-cols-2">
        <Link
          href={currentClass ? `/dashboard?class=${currentClass}` : '/dashboard'}
          className="flex flex-col items-center gap-1 border-r border-[#008CEA] py-3 text-[#008CEA]"
        >
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>

        {/* <Link
          href="/quiz" // Später auf fachgebiteauswahl ändern
          className="flex flex-col items-center gap-1 border-r border-[#008CEA] py-3 text-[#008CEA]"
        >
          <BookOpen size={20} />
          <span className="text-xs">Lernen</span>
        </Link>

        <Link
          href={examHref}
          className="flex flex-col items-center gap-1 border-r border-[#008CEA] py-3 text-[#008CEA]"
        >
          <ClipboardList size={20} />
          <span className="text-xs">Prüfung</span>
        </Link> */}

        <Link href={statisticsHref} className="flex flex-col items-center gap-1 py-3 text-[#008CEA]">
          <ChartColumn size={20} />
          <span className="text-xs">Statistik</span>
        </Link>
      </div>
    </nav>
  )
}
