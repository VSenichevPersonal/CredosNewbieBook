import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

import { db } from "@/cms/lib/db"
import { blocks } from "@/cms/lib/schema"

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const body = await req.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: "Body is required" }, { status: 400 })
  }

  try {
    const updates: Record<string, unknown> = { updatedAt: new Date() }

    if (typeof body.content !== "undefined") {
      updates.content = body.content
    }

    if (typeof body.settings !== "undefined") {
      updates.settings = body.settings
    }

    await db.update(blocks).set(updates).where(eq(blocks.id, id))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("PATCH /api/cms/blocks/[id] error:", err)
    return NextResponse.json({ error: "Failed to update block" }, { status: 500 })
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  try {
    await db.delete(blocks).where(eq(blocks.id, id))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("DELETE /api/cms/blocks/[id] error:", err)
    return NextResponse.json({ error: "Failed to delete block" }, { status: 500 })
  }
}
