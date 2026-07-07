'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Scale, Radio, RadioTower } from 'lucide-react'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'

type SubjectStat = {
    subject: string
    _count: { id: number }
}

const subjectIcons: Record<string, React.ReactNode> = {
    Recht: <Scale size={18} className="text-[#008CEA]" />,
    Technik: <RadioTower size={18} className="text-[#008CEA]" />,
    Betrieb: <Radio size={18} className="text-[#008CEA]" />,
}

export default function LearnPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const classId = searchParams.get('class') ?? '1'

    const [stats, setStats] = useState<SubjectStat[]>([])
    const [selected, setSelected] = useState<string | null>(null)

    useEffect(function () {
        fetch(`/api/questions/stats?class=${classId}`)
            .then(function (res) { return res.json() })
            .then(function (data) { setStats(data.bySubject) })
    }, [classId])

    function handleSelect(subject: string) {
        setSelected(subject === selected ? null : subject)
    }

    function handleStartLearning() {
        if (!selected) return
        router.push(`/quiz?class=${classId}&subject=${selected}`)
    }

    return (
        <main className="min-h-screen bg-gray-100 md:p-8">
            <div className="flex min-h-screen w-full flex-col bg-white md:mx-auto md:max-w-7xl md:min-h-[850px] md:rounded-2xl md:shadow-lg overflow-hidden">
                <Header variant="default" />

                <div className="flex flex-1 flex-col px-6 pb-12 pt-17">
                    <div>
                        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
                            Was willst du lernen?
                        </h1>

                        <h2 className="mb-3 text-sm font-bold tracking-wide text-gray-700">
                            FACHGEBIETE
                        </h2>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white">
                        {stats.map(function (stat, index) {
                            return (
                                <div key={stat.subject}>
                                    {index > 0 && <div className="border-t border-gray-200" />}
                                    <div className="flex items-center gap-3 p-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6F4FD]">
                                            {subjectIcons[stat.subject]}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-gray-900">{stat.subject}</p>
                                            <p className="text-xs text-gray-500">{stat._count.id} Fragen</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selected === stat.subject}
                                            onChange={function () { handleSelect(stat.subject) }}
                                            className="h-5 w-5 accent-[#008CEA]"
                                        />
                                    </div>
                                </div>
                            )
                        })}

                        <div className="border-t border-gray-200" />

                        <div className="flex items-center gap-3 p-4">
                            <div className="flex-1 pl-1">
                                <p className="text-sm text-gray-400">Alle Fachgebiete gemischt</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={selected === 'all'}
                                onChange={function () { handleSelect('all') }}
                                className="h-5 w-5 accent-[#008CEA]"
                            />
                        </div>
                    </div>

                    <div className="pt-16">
                        <button
                            onClick={handleStartLearning}
                            disabled={!selected}
                            className="w-full rounded-full bg-[#008CEA] py-3 text-center font-semibold text-white disabled:opacity-50 hover:bg-[#0077c8] transition-colors"
                        >
                            Jetzt lernen
                        </button>
                    </div>
                </div>

                <FooterNav />
            </div>
        </main>
    )
}