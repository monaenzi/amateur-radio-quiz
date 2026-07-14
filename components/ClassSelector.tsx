'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function ClassSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const urlClass = searchParams.get('class') ?? ''

  useEffect(() => {
    // URL ist vorhanden -> speichern
    if (urlClass) {
      localStorage.setItem('selectedClass', urlClass)
    } 
    
    // keine URL -> letzte Auswahl laden
    else {
      const savedClass = localStorage.getItem('selectedClass')

      if (savedClass) {
        router.replace(`?class=${savedClass}`)
      }
    }
  }, [urlClass, router])


  function handleClassChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const classId = e.target.value

    if (!classId) return

    localStorage.setItem('selectedClass', classId)

    router.push(`?class=${classId}`)
  }


  return (
    <select
      onChange={handleClassChange}
      value={urlClass}
      className="w-full rounded-lg bg-gray-200 p-3 text-gray-800 font-medium cursor-pointer"
    >
      <option value="" disabled>
        -- Bitte eine Klasse wählen --
      </option>

      <option value="1">
        Klasse 1
      </option>

      <option value="3">
        Klasse 3
      </option>

      <option value="4">
        Klasse 4
      </option>
    </select>
  )
}