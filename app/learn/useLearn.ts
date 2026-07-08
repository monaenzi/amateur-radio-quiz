'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export type SubjectStat = {
    subject: string
    _count: { id: number }
}

export function useLearn() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const classId = searchParams.get('class') ?? '1'

    const [stats, setStats] = useState<SubjectStat[]>([])
    const [selected, setSelected] = useState<string[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(function () {
        setLoading(true)
        fetch(`/api/questions/stats?class=${classId}`)
            .then(function (res) { return res.json() })
            .then(function (data) { 
                setStats(data.bySubject || []) 
                setLoading(false)
            })
            .catch(function () {
                setLoading(false)
            })
    }, [classId])

    function handleSelect(subject: string) {
        setSelected(function (prev) {
            if (prev.includes(subject)) {
                return prev.filter((s) => s !== subject)
            } else {
                return [...prev, subject]
            }
        })
    }

    function handleSelectAll() {
        const allSubjects = stats.map((s) => s.subject)
        if (selected.length === allSubjects.length) {
            setSelected([])
        } else {
            setSelected(allSubjects)
        }
    }

    function handleStartLearning() {
        if (selected.length === 0) return
        const subjectQuery = selected.join(',')
        router.push(`/quiz?class=${classId}&subject=${subjectQuery}`)
    }

    const isAllSelected = stats.length > 0 && selected.length === stats.length

    return {
        stats,
        selected,
        loading,
        isAllSelected,
        handleSelect,
        handleSelectAll,
        handleStartLearning,
    }
}