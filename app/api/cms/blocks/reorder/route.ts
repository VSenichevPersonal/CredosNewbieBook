import { NextResponse } from "next/server"
import { and, eq } from "drizzle-orm"

import { db } from "@/cms/lib/db"
import { blocks } from "@/cms/lib/schema"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body || !Array.isArray(body.orderedIds) || !body.pageId) {
    return NextResponse.json({ error: "pageId and orderedIds[] required" }, { status: 400 })
  }

  const { pageId, orderedIds } = body as { pageId: string; orderedIds: string[] }

  const updates = orderedIds.map((blockId, index) =>
    db
      .update(blocks)
      .set({ orderIndex: index, updatedAt: new Date() })
      .where(and(eq(blocks.pageId, pageId), eq(blocks.id, blockId))),
  )

  await Promise.all(updates)

  return NextResponse.json({ ok: true })
}
