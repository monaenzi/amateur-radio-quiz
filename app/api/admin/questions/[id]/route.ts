import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const question = await prisma.question.findUnique({
    where: { id: parseInt(params.id) },
    include: { answers: true },
  })

  if (!question) {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  }

  return NextResponse.json(question)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  await prisma.question.update({
    where: { id: parseInt(params.id) },
    data: {
      text: body.text,
      explanation: body.explanation,
      class: body.class,
      subject: body.subject,
      code: body.code,
      answers: {
        deleteMany: {},
        create: body.answers,
      },
    },
  })

  return NextResponse.json({ success: true })
}