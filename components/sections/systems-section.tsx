import { Card } from "@/components/ui/card"
import { Database, Mail, MessageSquare, FolderKanban } from "lucide-react"

export function SystemsSection() {
  const systems = [
    {
      title: "Directum RX",
      description: "Система электронного документооборота. Здесь согласовываются все документы и заявки.",
      icon: FolderKanban,
      link: "#",
    },
    {
      title: "Корпоративная почта",
      description: "Основной канал деловой коммуникации. Проверяйте почту минимум 2 раза в день.",
      icon: Mail,
      link: "#",
    },
    {
      title: "Telegram",
      description: "Для оперативной коммуникации используем корпоративные чаты в Telegram.",
      icon: MessageSquare,
      link: "#",
    },
    {
      title: "CRM-система",
      description: "Для отдела продаж: ведение клиентской базы и сделок.",
      icon: Database,
      link: "#",
    },
  ]

  return (
    <section id="systems" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Информационные системы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Инструменты, которые мы используем в работе
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {systems.map((system, index) => {
              const Icon = system.icon
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary group-hover:text-accent-cyan transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-cyan transition-colors">
                        {system.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{system.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
