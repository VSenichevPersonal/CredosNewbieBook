import { notFound } from "next/navigation"
import Link from "next/link"
import { directions } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Shield, FileText, Server, Workflow, Boxes } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"

const iconMap = {
  Shield,
  FileText,
  Server,
  Workflow,
  Boxes,
}

export async function generateStaticParams() {
  return directions.map((dir) => ({
    slug: dir.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const direction = directions.find((d) => d.slug === slug)

  if (!direction) {
    return {
      title: "Направление не найдено",
    }
  }

  return {
    title: `${direction.name} | КРЕДО-С`,
    description: direction.description,
  }
}

export default async function DirectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const direction = directions.find((d) => d.slug === slug)

  if (!direction) {
    notFound()
  }

  const Icon = iconMap[direction.icon as keyof typeof iconMap]

  return (
    <main className="min-h-screen bg-[#EBF5FB]">
      <Navigation />

      <div className="relative bg-gradient-to-br from-[#0A2E5C] via-[#0D3A6F] to-[#00BFFF] text-white py-20 mt-16 overflow-hidden">
        {/* Abstract floating shapes */}
        <div className="absolute top-10 left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute bottom-10 right-20 w-56 h-56 rounded-full bg-accent-cyan/20 blur-2xl animate-float-delayed" />

        {/* Decorative diamonds */}
        <div className="absolute top-24 left-40 w-8 h-8 bg-accent-cyan/30 rotate-45 animate-float" />
        <div className="absolute bottom-28 right-1/3 w-6 h-6 bg-white/20 rotate-45 animate-float-delayed" />
        <div
          className="absolute top-1/2 left-1/4 w-10 h-10 bg-accent-purple/20 rotate-45 animate-float"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs items={[{ label: "Направления", href: "/#directions" }, { label: direction.name }]} />

            <div className="flex items-start gap-6 mt-8">
              <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg border border-white/30">
                <Icon className="w-12 h-12" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{direction.name}</h1>
                <p className="text-xl text-white/95 leading-relaxed">{direction.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Services */}
          <Card className="p-8 bg-white border-gray-200">
            <h2 className="text-3xl font-semibold mb-6 text-[#0A2E5C]">Наши услуги</h2>
            <div className="grid gap-4">
              {direction.services.map((service, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#EBF5FB] transition-colors">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0A2E5C] to-[#00BFFF] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg leading-relaxed text-gray-800">{service}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Additional content based on direction */}
          {direction.slug === "practical-security" && (
            <Card className="p-8 bg-gradient-to-br from-[#FADBD8] to-[#F5B7B1] border-red-300">
              <h3 className="text-2xl font-semibold mb-4 text-[#0A2E5C]">Почему это важно?</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Практическая информационная безопасность позволяет выявить реальные уязвимости в системах защиты до
                того, как их обнаружат злоумышленники. Мы используем те же методы, что и хакеры, но в интересах защиты
                вашего бизнеса.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Регулярные пентесты и обучение персонала значительно снижают риски успешных кибератак и утечек данных.
              </p>
            </Card>
          )}

          {direction.slug === "documentary-security" && (
            <Card className="p-8 bg-gradient-to-br from-[#D6EAF8] to-[#AED6F1] border-[#00BFFF]/30">
              <h3 className="text-2xl font-semibold mb-4 text-[#0A2E5C]">Соответствие требованиям</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Документальная ИБ обеспечивает соответствие вашей организации требованиям законодательства: 152-ФЗ о
                персональных данных, требованиям ФСТЭК, ФСБ, стандартам PCI DSS и другим регуляторным нормам.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Правильно выстроенная система документов защищает компанию от штрафов и репутационных рисков.
              </p>
            </Card>
          )}

          {direction.slug === "infrastructure" && (
            <Card className="p-8 bg-gradient-to-br from-[#E8DAEF] to-[#D7BDE2] border-purple-300">
              <h3 className="text-2xl font-semibold mb-4 text-[#0A2E5C]">Надежная инфраструктура</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Современная ИТ-инфраструктура - основа бесперебойной работы бизнеса. Мы проектируем отказоустойчивые
                системы с учетом требований безопасности и масштабируемости.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Наши решения включают резервирование критичных компонентов, системы мониторинга и круглосуточную
                техническую поддержку.
              </p>
            </Card>
          )}

          {direction.slug === "ecm-directum" && (
            <Card className="p-8 bg-gradient-to-br from-[#D5F4E6] to-[#A9DFBF] border-green-300">
              <h3 className="text-2xl font-semibold mb-4 text-[#0A2E5C]">Цифровая трансформация</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Directum RX - современная платформа для автоматизации документооборота и бизнес-процессов. Система
                позволяет перевести работу с документами в электронный вид, ускорить согласования и повысить
                прозрачность процессов.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Мы имеем статус золотого партнера Directum и реализовали более 50 проектов внедрения.
              </p>
            </Card>
          )}

          {direction.slug === "corporate-products" && (
            <Card className="p-8 bg-gradient-to-br from-[#FCF3CF] to-[#F9E79F] border-yellow-300">
              <h3 className="text-2xl font-semibold mb-4 text-[#0A2E5C]">Собственные разработки</h3>
              <p className="text-gray-800 leading-relaxed mb-4">
                Наши корпоративные продукты созданы на основе многолетнего опыта работы в области информационной
                безопасности. Мы автоматизируем рутинные процессы и помогаем специалистам ИБ работать эффективнее.
              </p>
              <p className="text-gray-800 leading-relaxed">
                Все продукты интегрируются с популярными SIEM-системами и могут быть адаптированы под специфику вашего
                бизнеса.
              </p>
            </Card>
          )}

          {/* CTA Section */}
          <Card className="p-8 bg-gradient-to-br from-[#D6EAF8] to-[#AED6F1] border-[#00BFFF]/30">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-[#0A2E5C]">Хотите узнать больше?</h3>
              <p className="text-gray-800 mb-6 leading-relaxed max-w-2xl mx-auto">
                Изучите другие направления деятельности компании или свяжитесь с вашим руководителем для получения
                дополнительной информации.
              </p>
              <div className="flex justify-center">
                <Link href="/#directions">
                  <Button size="lg" className="bg-[#00BFFF] hover:bg-[#00A8E6] text-white">
                    Другие направления
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Back Button */}
          <div className="pt-8">
            <Link href="/#directions">
              <Button
                size="lg"
                variant="outline"
                className="w-full md:w-auto bg-white border-[#0A2E5C] text-[#0A2E5C] hover:bg-[#EBF5FB]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к списку направлений
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
