export const dynamic = "force-dynamic"
export const revalidate = 0
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getPageBySlug } from "@/cms/lib/queries"
import { EditorProvider } from "@/cms/context/editor-context"
import { PageRenderer } from "@/cms/components/page-renderer"

export default async function HomePage() {
  const data = await getPageBySlug("home")

  return (
    <main className="min-h-screen">
      <Navigation />
      <EditorProvider isEditing={false}>
        <div className="space-y-12">
          {data ? (
            <PageRenderer pageId={data.page.id} blocks={data.blocks} />
          ) : (
            <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">
              Данные не найдены в БД.
            </div>
          )}
        </div>
      </EditorProvider>
      <Footer />
    </main>
  )
}
