import { z } from 'zod'

export const answerSchema = z.object({
  text: z.string().min(1, 'Antworttext ist pflicht'),
  isCorrect: z.boolean(),
})

export const attachmentSchema = z.object({
  url: z.string().min(1, 'URL ist pflicht'),
  type: z.enum(['image', 'audio', 'link']),
})

export const createQuestionSchema = z.object({
  text: z.string().min(1, 'Fragetext ist pflicht'),
  explanation: z.string().optional(),

  classes: z
    .array(
      z.number()
        .int()
        .refine((v) => [1, 3, 4].includes(v), 'Ungültige Klasse')
    )
    .min(1, 'Mindestens eine Klasse erforderlich'),

  subject: z.enum(['Recht', 'Technik', 'Betrieb']),
  code: z.string().optional(),

  answers: z.array(answerSchema).min(2, 'Mindestens 2 Antworten erforderlich'),

  attachments: z.array(attachmentSchema).default([]),
})

export const updateQuestionSchema = createQuestionSchema