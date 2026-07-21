import { NextRequest, NextResponse } from 'next/server'
import { questionService } from '@/services/question.service'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    
    const classParam = searchParams.get('class')
    const subjectParam = searchParams.get('subject')
    const search = searchParams.get('search') ?? undefined
    const randomizeBySubject = searchParams.get('randomizeBySubject') === 'true'
    const classFilter = classParam ? parseInt(classParam, 10) : undefined

    let subjectFilter: string[] | undefined = undefined
    if (subjectParam && subjectParam !== 'all') {
        subjectFilter = subjectParam.split(',')
    }

    const questions = await questionService.getAll({
        classFilter,
        subjectFilter,
        search,
    }, undefined, {
        randomizeBySubject,
    })

    return NextResponse.json(questions)
}