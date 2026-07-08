'use client'

import { Scale, Radio, RadioTower } from 'lucide-react'
import Header from '@/components/Header'
import FooterNav from '@/components/FooterNav'
import { useLearn } from './useLearn'

const subjectIcons: Record<string, React.ReactNode> = {
    Recht: <Scale size={18} className="text-[#008CEA]" />,
    Technik: <RadioTower size={18} className="text-[#008CEA]" />,
    Betrieb: <Radio size={18} className="text-[#008CEA]" />,
}

export default function LearnPage() {
    const {
        stats,
        selected,
        loading,
        isAllSelected,
        handleSelect,
        handleSelectAll,
        handleStartLearning,
    } = useLearn()

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

                    <div className="rounded-xl border border-gray-200 bg-white min-h-[150px] flex flex-col justify-center">
                        {loading ? (
                            <p className="text-center text-sm text-gray-500 py-8 animate-pulse">
                                Fachgebiete werden geladen...
                            </p>
                        ) : (
                            <>
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
                                                    checked={selected.includes(stat.subject)}
                                                    onChange={function () { handleSelect(stat.subject) }}
                                                    className="h-5 w-5 accent-[#008CEA] cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    )
                                })}

                                <div className="border-t border-gray-200" />

                                <div className="flex items-center gap-3 p-4">
                                    <div className="flex-1 pl-1">
                                        <p className="text-sm text-gray-700 font-medium">Alle Fachgebiete gemischt</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                        className="h-5 w-5 accent-[#008CEA] cursor-pointer"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="pt-16">
                        <button
                            onClick={handleStartLearning}
                            disabled={selected.length === 0 || loading}
                            className="w-full rounded-full bg-[#008CEA] py-3 text-center font-semibold text-white disabled:opacity-50 hover:bg-[#0077c8] transition-colors"
                        >
                            {selected.length > 0 ? `Jetzt lernen (${selected.length} gewählt)` : 'Jetzt lernen'}
                        </button>
                    </div>
                </div>

                <FooterNav />
            </div>
        </main>
    )
}