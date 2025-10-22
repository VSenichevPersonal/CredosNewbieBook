import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Направление не найдено</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            К сожалению, запрашиваемое направление деятельности не существует или было перемещено.
          </p>
          <Link href="/#directions">
            <Button size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к списку направлений
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
