import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { uploadService } from '@/services/upload.service'
import { handleApiError } from '@/lib/api-error-handler'
import { ValidationError } from '@/lib/errors'

export async function POST(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) throw new ValidationError('Keine Datei gefunden')

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const url = await uploadService.uploadFile(buffer)
    return NextResponse.json({ url })
  } catch (error) {
    return handleApiError(error)
  }
}