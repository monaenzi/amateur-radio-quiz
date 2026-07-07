import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {

  const filePath = path.join(__dirname, "questions.json");

  const questions = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
  );

  await prisma.answer.deleteMany();
  await prisma.questionClass.deleteMany();
  await prisma.question.deleteMany();

  for (const q of questions) {

    await prisma.question.create({
      data: {
        text: q.question,
        subject: q.category,
        code: q.id,

        classes: {
          create: q.classes.map((c:number)=>({
            class:c
          }))
        }
      }
    });

  }

  console.log(`${questions.length} Fragen importiert`);
}


main()
.then(()=>{
  console.log("Seed fertig");
})
.catch(e=>{
  console.error(e);
  process.exit(1);
})
.finally(()=>{
  prisma.$disconnect();
});