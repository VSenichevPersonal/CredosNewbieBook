import { getPageBySlug } from "@/cms/lib/queries"
import { EditorProvider } from "@/cms/context/editor-context"
import { PageRenderer } from "@/cms/components/page-renderer"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminPage() {
  let data = null

  try {
    data = await getPageBySlug("home")
  } catch (error) {
    console.error("Failed to load page data for /admin:", error)
  }

  return (
    <EditorProvider isEditing>
      <main className="min-h-screen p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Редактирование: Главная</h1>
            <p className="text-sm text-muted-foreground">/admin — inline + панель справа</p>
          </div>
        </div>

        {!data && <p className="text-muted-foreground">Страница home не найдена в БД.</p>}

        {data && <PageRenderer pageId={data.page.id} blocks={data.blocks} />}
      </main>
    </EditorProvider>
  )
}
