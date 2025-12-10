import { InferInsertModel, InferSelectModel } from "drizzle-orm"

import { blocks, pages } from "../lib/schema"

export type Page = InferSelectModel<typeof pages>
export type Block = InferSelectModel<typeof blocks>

export type NewPage = InferInsertModel<typeof pages>
export type NewBlock = InferInsertModel<typeof blocks>

export type BlockContent = Record<string, unknown>

