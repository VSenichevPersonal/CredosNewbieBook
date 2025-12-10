import { notFound } from "next/navigation"
import Link from "next/link"
import { departments } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, User, MessageCircle, Info } from "lucide-react"
import { TrendingUp, Megaphone, Settings, Code, Users, Calculator, Package, Scale, Building, Shield, Server, Workflow, Boxes, FileText } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"

const iconMap: Record<string, any> = {
  TrendingUp,
  Megaphone,
  Settings,
  Code,
  Users,
  Calculator,
  Package,
  Scale,
  Building,
  Shield,
  Server,
  Workflow,
  Boxes,
  FileText,
}

export async function generateStaticParams() {
  return departments.map((dept) => ({
    slug: dept.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const department = departments.find((d) => d.slug === slug)

  if (!department) {
    return {
      title: "Отдел не найден",
    }
  }

  return {
    title: `${department.name} | КРЕДО-С`,
    description: department.description,
  }
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const department = departments.find((d) => d.slug === slug)

  if (!department) {
    notFound()
  }

  const Icon = iconMap[department.icon] || Building

  return (
    <main className="min-h-screen bg-[#EBF5FB]">
      {/* Navigation */}
      <Navigation />

      <div className="relative bg-gradient-to-br from-[#0A2E5C] via-[#0D3A6F] to-[#00BFFF] text-white py-20 mt-16 overflow-hidden">
        {/* Abstract floating shapes */}
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-accent-cyan/20 blur-2xl animate-float-delayed" />

        {/* Decorative diamonds */}
        <div className="absolute top-20 right-40 w-8 h-8 bg-accent-cyan/30 rotate-45 animate-float" />
        <div className="absolute bottom-32 left-1/3 w-6 h-6 bg-white/20 rotate-45 animate-float-delayed" />
        <div
          className="absolute top-1/2 right-1/4 w-10 h-10 bg-accent-purple/20 rotate-45 animate-float"
          style={{ animationDelay: "1s" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs items={[{ label: "Отделы", href: "/#departments" }, { label: department.name }]} />

            <div className="flex items-start gap-6 mt-8">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-lg border border-white/30">
                <Icon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{department.name}</h1>
                <p className="text-xl text-white/95 leading-relaxed">{department.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Leader */}
          <Card className="p-8 bg-white border-gray-200">
            <div className="flex items-start gap-6">
              {/* Placeholder avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00BFFF]/20 to-[#0A2E5C]/20 flex items-center justify-center flex-shrink-0 border-4 border-white shadow-lg">
                <User className="w-12 h-12 text-[#0A2E5C]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-3 text-[#0A2E5C]">Руководитель отдела</h2>
                <p className="text-xl font-medium text-gray-900 mb-1">{department.leader.name}</p>
                <p className="text-gray-700 mb-4">{department.leader.position}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#00BFFF]" />
                    <span>Telegram: @{department.slug}_lead</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00BFFF]">✉</span>
                    <span>{department.slug}@credos.ru</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Responsibilities */}
          <Card className="p-8 bg-white border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00BFFF]/20 to-[#0A2E5C]/20 flex items-center justify-center flex-shrink-0">
                <Settings className="w-6 h-6 text-[#0A2E5C]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#0A2E5C]">Чем занимается отдел</h2>
              </div>
            </div>
            <ul className="space-y-3">
              {department.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00BFFF] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="leading-relaxed text-gray-800">{responsibility}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* When to Contact */}
          <Card className="p-8 bg-white border-gray-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00BFFF]/20 to-[#0A2E5C]/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-[#0A2E5C]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#0A2E5C]">С какими вопросами обращаться</h2>
              </div>
            </div>
            <ul className="space-y-3">
              {department.whenToContact.map((question, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#00BFFF] flex-shrink-0 mt-2" />
                  <span className="leading-relaxed text-gray-800">{question}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Location */}
          <Card className="p-8 bg-white border-gray-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00BFFF]/20 to-[#0A2E5C]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-[#0A2E5C]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-[#0A2E5C]">Где находится</h2>
                <p className="text-gray-700 leading-relaxed">{department.location}</p>
              </div>
            </div>
          </Card>

          {/* Additional Info */}
          {department.additionalInfo && (
            <Card className="p-8 bg-gradient-to-br from-[#D6EAF8] to-[#AED6F1] border-[#00BFFF]/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/50 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-[#0A2E5C]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-2 text-[#0A2E5C]">Дополнительная информация</h2>
                  <p className="text-gray-800 leading-relaxed">{department.additionalInfo}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Back Button */}
          <div className="pt-8">
            <Link href="/#departments">
              <Button
                size="lg"
                variant="outline"
                className="w-full md:w-auto bg-white border-[#0A2E5C] text-[#0A2E5C] hover:bg-[#EBF5FB]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к списку отделов
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
