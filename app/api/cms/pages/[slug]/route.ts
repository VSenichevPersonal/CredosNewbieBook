import { NextResponse } from "next/server"
import { asc, eq } from "drizzle-orm"

import { db } from "@/cms/lib/db"
import { blocks, pages } from "@/cms/lib/schema"

export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params

  try {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1)
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    const pageBlocks = await db
      .select()
      .from(blocks)
      .where(eq(blocks.pageId, page.id))
      .orderBy(asc(blocks.orderIndex))

    return NextResponse.json({ page, blocks: pageBlocks })
  } catch (err) {
    console.error("GET /api/cms/pages/[slug] error:", err)
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}
