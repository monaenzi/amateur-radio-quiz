'use client'

import { useEffect, useState } from 'react'

export default function ClassSelector() {
  const [currentClass, setCurrentClass] = useState('')

  useEffect(() => {
    const savedClass = localStorage.getItem('selectedClass')

    if (savedClass) {
      setCurrentClass(savedClass)
    }
  }, [])

  function handleClassChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const classId = e.target.value

    setCurrentClass(classId)
    localStorage.setItem('selectedClass', classId)
  }

  return (
    <select
      onChange={handleClassChange}
      value={currentClass}
      className="w-full rounded-lg bg-gray-200 p-3 text-gray-800 font-medium cursor-pointer"
    >
      <option value="" disabled>
        -- Bitte eine Klasse wählen --
      </option>
      <option value="1">Klasse 1</option>
      <option value="3">Klasse 3</option>
      <option value="4">Klasse 4</option>
    </select>
  )
}
