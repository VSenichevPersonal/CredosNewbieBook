import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

import { db } from "@/cms/lib/db"
import { blocks } from "@/cms/lib/schema"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const body = await req.json().catch(() => null)

  if (!body || typeof body.content === "undefined") {
    return NextResponse.json({ error: "content is required" }, { status: 400 })
  }

  await db.update(blocks).set({ content: body.content, updatedAt: new Date() }).where(eq(blocks.id, id))

  return NextResponse.json({ ok: true })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = params.id
  await db.delete(blocks).where(eq(blocks.id, id))
  return NextResponse.json({ ok: true })
}
