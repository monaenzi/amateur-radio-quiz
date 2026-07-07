import { NextRequest, NextResponse } from 'next/server'
import { questionService } from '@/services/question.service'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const classFilter = searchParams.get('class') ?? undefined
    const subjectFilter = searchParams.get('subject') ?? undefined
    const search = searchParams.get('search') ?? undefined

    const questions = await questionService.getAll({
        classFilter,
        subjectFilter,
        search,
    })

    return NextResponse.json(questions)
}