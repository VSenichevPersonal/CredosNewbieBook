import { db } from "../lib/db"
import { blocks, pages } from "../lib/schema"
import { companyInfo, departments, directions, mission, benefits as benefitsData, codeOfConduct } from "../../lib/data"
import { eq } from "drizzle-orm"

async function main() {
  // Ensure page exists
  const slug = "home"
  const title = "Главная"

  const [existingPage] = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1)
  const pageId = existingPage?.id ?? (await db.insert(pages).values({ slug, title }).returning({ id: pages.id }))[0].id

  // Clear existing blocks for idempotent seed
  await db.delete(blocks).where(eq(blocks.pageId, pageId))

  const payload = [
    {
      type: "hero",
      orderIndex: 0,
      content: {
        eyebrow: "Добро пожаловать в Кредо-С",
        title: "Ваш путеводитель по компании",
        description:
          "Здесь вы найдете информацию о структуре компании, процессах работы, корпоративной культуре и полезных ресурсах",
        primaryCta: { label: "Начать знакомство", href: "/first-day" },
        secondaryCta: { label: "Посмотреть отделы", href: "#departments" },
        image:
          "https://www.credos.ru/local/templates/credos-new/images/first-img.svg",
      },
    },
    {
      type: "about",
      orderIndex: 1,
      content: {
        founded: companyInfo.founded,
        employees: companyInfo.employees,
        offices: companyInfo.offices,
        description:
          "Более " + (new Date().getFullYear() - companyInfo.founded) + " лет защищаем бизнес наших клиентов",
      },
    },
    {
      type: "departments",
      orderIndex: 2,
      content: { departments },
    },
    {
      type: "directions",
      orderIndex: 3,
      content: { directions },
    },
    {
      type: "mission",
      orderIndex: 4,
      content: mission,
    },
    {
      type: "benefits",
      orderIndex: 5,
      content: { benefits: benefitsData },
    },
    {
      type: "regulations",
      orderIndex: 6,
      content: { codeOfConduct },
    },
  ]

  await db.insert(blocks).values(payload.map((item) => ({ ...item, pageId })))

  console.log("Seed completed for page:", slug)
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => process.exit(0))
