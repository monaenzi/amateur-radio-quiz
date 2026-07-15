import { NextResponse } from 'next/server'
import { AppError } from './errors'
import { ZodError } from 'zod'

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: 'Ungültige Eingabe', details: error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  console.error('Unexpected error:', error)
  return NextResponse.json(
    { error: 'Interner Serverfehler' },
    { status: 500 }
  )
}