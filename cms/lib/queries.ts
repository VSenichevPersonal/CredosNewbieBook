import { asc, and, eq } from "drizzle-orm"

import { db } from "./db"
import { blocks, pages } from "./schema"

export async function getPageBySlug(slug: string) {
  const [page] = await db.select().from(pages).where(eq(pages.slug, slug)).limit(1)
  if (!page) return null

  const pageBlocks = await db
    .select()
    .from(blocks)
    .where(eq(blocks.pageId, page.id))
    .orderBy(asc(blocks.orderIndex))

  return { page, blocks: pageBlocks }
}

export async function updateBlockContent(id: string, content: unknown) {
  await db.update(blocks).set({ content, updatedAt: new Date() }).where(eq(blocks.id, id))
}

export async function reorderBlocks(pageId: string, orderedIds: string[]) {
  const updates = orderedIds.map((blockId, index) =>
    db
      .update(blocks)
      .set({ orderIndex: index })
      .where(and(eq(blocks.pageId, pageId), eq(blocks.id, blockId))),
  )

  await Promise.all(updates)
}

