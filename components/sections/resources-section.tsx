import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Lock, Presentation, ExternalLink } from "lucide-react"
import Link from "next/link"

export function ResourcesSection() {
  const resources = [
    {
      title: "Маркетинговые материалы",
      description: "Презентации, буклеты, шаблоны коммерческих предложений",
      icon: Presentation,
      link: "https://docs.credos.ru", // Placeholder based on user request "link"
    },
    {
      title: "Парольная политика",
      description: "Требования к паролям и правила информационной безопасности",
      icon: Lock,
      link: "https://docs.credos.ru", // User said "docs.credos.ru"
    },
  ]

  return (
    <section id="resources" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Полезные ресурсы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Материалы и документы для работы
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <Link key={index} href={resource.link} target="_blank">
                  <Card className="p-6 hover:shadow-lg transition-shadow group h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary group-hover:text-accent-cyan transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{resource.description}</p>
                    <Button variant="ghost" size="sm" className="text-accent-cyan hover:text-accent-cyan p-0 h-auto">
                      Открыть
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
