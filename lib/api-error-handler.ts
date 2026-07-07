import { NextResponse } from 'next/server'
import { AppError } from './errors'

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }

  console.error('Unexpected error:', error)
  return NextResponse.json(
    { error: 'Interner Serverfehler' },
    { status: 500 }
  )
}