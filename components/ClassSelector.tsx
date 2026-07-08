'use client'

import { useRouter } from 'next/navigation'

export default function ClassSelector() {
    const router = useRouter()

    function handleClassChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const classId = e.target.value
        if (!classId) return

        router.push(`/learn?class=${classId}`)
    }

    return (
        <select
            onChange={handleClassChange}
            defaultValue=""
            className="w-full rounded-lg bg-gray-200 p-3 text-gray-800 font-medium"
        >
            <option value="" disabled>-- Bitte eine Klasse wählen --</option>
            <option value="1">Klasse 1</option>
            <option value="3">Klasse 3</option>
            <option value="4">Klasse 4</option>
        </select>
    )
}