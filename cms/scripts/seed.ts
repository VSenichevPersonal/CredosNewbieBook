import { db } from "../lib/db"
import { blocks, pages } from "../lib/schema"
import { companyInfo, mission, codeOfConduct } from "../../lib/data"
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
        title: "О компании",
        subtitle: "Более " + (new Date().getFullYear() - companyInfo.founded) + " лет защищаем бизнес наших клиентов",
        founded: companyInfo.founded,
        employees: companyInfo.employees,
        offices: companyInfo.offices,
      },
    },
    {
      type: "departments",
      orderIndex: 2,
      content: {
        title: "Структура и отделы",
        subtitle: "Познакомьтесь с командами, которые делают компанию успешной",
      },
    },
    {
      type: "directions",
      orderIndex: 3,
      content: {
        title: "Направления деятельности",
        subtitle: "Комплексные решения для защиты вашего бизнеса",
      },
    },
    {
      type: "mission",
      orderIndex: 4,
      content: {
        badge: "Наши ценности",
        title: mission.title,
        description: mission.description,
        values: mission.values,
      },
    },
    {
      type: "benefits",
      orderIndex: 5,
      content: {
        title: "Бонусы и льготы",
        subtitle: "Мы ценим вклад каждого сотрудника",
        linkTitle: "Всё о бонусах",
        linkUrl: "https://docs.credos.ru",
        linkSubtitle: "docs.credos.ru",
      },
    },
    {
      type: "regulations",
      orderIndex: 6,
      content: {
        title: "Корпоративная этика",
        subtitle: "Наши принципы и правила",
        cardTitle: "Кодекс этики",
        codeOfConduct,
      },
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
