import { NextResponse } from "next/server"

import { db } from "@/cms/lib/db"
import { blocks } from "@/cms/lib/schema"

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body || !body.pageId || !body.type) {
    return NextResponse.json({ error: "pageId and type are required" }, { status: 400 })
  }

  const { pageId, type, orderIndex = 0, content = {}, settings = {} } = body as {
    pageId: string
    type: string
    orderIndex?: number
    content?: unknown
    settings?: unknown
  }

  const [created] = await db
    .insert(blocks)
    .values({ pageId, type, orderIndex, content, settings })
    .returning({ id: blocks.id })

  return NextResponse.json({ id: created.id })
}
