import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id: idParam } = await params
  const id = parseInt(idParam)

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Ungültige ID' }, { status: 400 })
  }

  const question = await prisma.question.findUnique({
    where: { id },
    include: { answers: true, attachments: true },
  })

  if (!question) {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 })
  }

  return NextResponse.json(question)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id: idParam } = await params
  const id = parseInt(idParam)
  const body = await request.json()

  await prisma.question.update({
    where: { id },
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
      attachments: {
        deleteMany: {},
        create: body.attachments ?? [],
      },
    },
  })

  return NextResponse.json({ success: true })
}