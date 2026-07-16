import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { questionService } from '@/services/question.service'
import { handleApiError } from '@/lib/api-error-handler'
import { ValidationError } from '@/lib/errors'
import { createQuestionSchema } from '@/lib/schemas'

export async function GET(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    
    const classParam = searchParams.get('class')
    const subjectParam = searchParams.get('subject')
    const classFilter = classParam ? parseInt(classParam, 10) : undefined

    const pageParam = Number.parseInt(searchParams.get('page') ?? '1', 10)
    const pageSizeParam = Number.parseInt(searchParams.get('pageSize') ?? '10', 10)
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam
    const pageSize = Number.isNaN(pageSizeParam) || pageSizeParam < 1 ? 10 : pageSizeParam

    let subjectFilter: string[] | undefined = undefined
    if (subjectParam && subjectParam !== 'all') {
      subjectFilter = subjectParam.split(',')
    }
    const questions = await questionService.getAll(
      {
        search: searchParams.get('search') ?? undefined,
        classFilter,
        subjectFilter,
      },
      { page, pageSize }
    )
    return NextResponse.json(questions)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) throw new ValidationError('ID fehlt')

    await questionService.delete(parseInt(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const result = createQuestionSchema.safeParse(body)

    if (!result.success) {
      throw new ValidationError(
        result.error.issues[0]?.message ?? 'Ungültige Eingabe'
      )
    }

    const question = await questionService.create(result.data)

    return NextResponse.json(question)
  } catch (error) {
    return handleApiError(error)
  }
}