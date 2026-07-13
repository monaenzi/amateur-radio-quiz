import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

type SeedAnswer = {
  text: string;
  isCorrect: boolean;
};

type SeedQuestion = {
  id: string;
  category: string;
  classes: number[];
  question: string;
  explanation?: string;
  answers?: SeedAnswer[];
};

async function main() {
  // Falls du merge-recht-answers.ts ausgeführt hast, liegt die
  // angereicherte Datei unter questions.merged.json - sonst
  // einfach questions.json verwenden.
  const fileName = fs.existsSync(path.join(__dirname, "questions.merged.json"))
    ? "questions.merged.json"
    : "questions.json";

  const filePath = path.join(__dirname, fileName);
  const questions: SeedQuestion[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  await prisma.answer.deleteMany();
  await prisma.questionClass.deleteMany();
  await prisma.question.deleteMany();

  for (const q of questions) {
    await prisma.question.create({
      data: {
        text: q.question,
        subject: q.category,
        code: q.id,
        explanation: q.explanation ?? null,

        classes: {
          create: q.classes.map((c: number) => ({
            class: c,
          })),
        },

        // answers ist optional - nur Fragen, für die du bereits
        // Antworten generiert hast (aktuell: Recht), bekommen sie.
        ...(q.answers && q.answers.length > 0
          ? {
              answers: {
                create: q.answers.map((a) => ({
                  text: a.text,
                  isCorrect: a.isCorrect,
                })),
              },
            }
          : {}),
      },
    });
  }

  console.log(`${questions.length} Fragen importiert`);
  console.log(
    `${questions.filter((q) => q.answers && q.answers.length > 0).length} davon mit Antworten`
  );
}

main()
  .then(() => {
    console.log("Seed fertig");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });