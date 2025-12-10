import { relations } from "drizzle-orm"
import { index, integer, jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const pages = pgTable("pages", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }),
  meta: jsonb("meta"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const blocks = pgTable(
  "blocks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    pageId: uuid("page_id")
      .notNull()
      .references(() => pages.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 100 }).notNull(),
    orderIndex: integer("order_index").notNull().default(0),
    content: jsonb("content").notNull(),
    settings: jsonb("settings"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    pageOrderIdx: index("blocks_page_order_idx").on(table.pageId, table.orderIndex),
  }),
)

export const pagesRelations = relations(pages, ({ many }) => ({
  blocks: many(blocks),
}))

export const blocksRelations = relations(blocks, ({ one }) => ({
  page: one(pages, {
    fields: [blocks.pageId],
    references: [pages.id],
  }),
}))

