import { defineConfig } from "drizzle-kit"

if (!process.env.DATABASE_URL) {
  // Drizzle CLI использует эту переменную, поэтому предупредим заранее.
  console.warn("DATABASE_URL is not set; drizzle-kit commands may fail.")
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./cms/lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
})

