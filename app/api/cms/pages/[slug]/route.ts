import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

import { db } from "@/cms/lib/db"
import { blocks, pages } from "@/cms/lib/schema"

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug

  const [page] = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1)
  if (!page) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 })
  }

  const pageBlocks = await db
    .select()
    .from(blocks)
    .where(eq(blocks.pageId, page.id))
    .orderBy(blocks.orderIndex.asc())

  return NextResponse.json({ page, blocks: pageBlocks })
}
