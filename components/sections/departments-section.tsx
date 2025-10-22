import Link from "next/link"
import { departments } from "@/lib/data"
import { Card } from "@/components/ui/card"
import {
  TrendingUp,
  Megaphone,
  Settings,
  Code,
  Users,
  Calculator,
  Package,
  Scale,
  Building,
  ArrowRight,
} from "lucide-react"

const iconMap = {
  TrendingUp,
  Megaphone,
  Settings,
  Code,
  Users,
  Calculator,
  Package,
  Scale,
  Building,
}

const gradientMap = [
  "from-accent-cyan/40 to-accent-purple/40",
  "from-accent-purple/40 to-accent-pink/40",
  "from-accent-pink/40 to-accent-orange/40",
  "from-accent-orange/40 to-accent-cyan/40",
  "from-accent-cyan/40 to-accent-pink/40",
  "from-accent-purple/40 to-accent-orange/40",
  "from-accent-pink/40 to-accent-cyan/40",
  "from-accent-orange/40 to-accent-purple/40",
  "from-accent-cyan/40 to-accent-orange/40",
]

export function DepartmentsSection() {
  return (
    <section
      id="departments"
      className="py-24 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-purple/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-cyan/5 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Структура и <span className="gradient-text-cyan-purple">отделы</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Познакомьтесь с командами, которые делают компанию успешной
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => {
              const Icon = iconMap[dept.icon as keyof typeof iconMap]
              const gradient = gradientMap[index % gradientMap.length]
              return (
                <Link key={dept.id} href={`/departments/${dept.slug}`}>
                  <Card
                    className={`p-6 h-full card-hover group cursor-pointer bg-white bg-gradient-to-br ${gradient} border-2 border-border backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="w-14 h-14 rounded-xl bg-accent-cyan flex items-center justify-center mb-4 shadow-lg shadow-accent-cyan/50 group-hover:shadow-xl group-hover:shadow-accent-cyan/70 transition-all duration-300 group-hover:scale-110">
                        <Icon className="w-7 h-7 text-brand-navy" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-brand-navy group-hover:text-accent-cyan transition-colors">
                        {dept.name}
                      </h3>
                      <p className="text-sm text-foreground/80 mb-4 flex-grow leading-relaxed line-clamp-3">
                        {dept.description}
                      </p>
                      <div className="flex items-center text-sm font-medium group-hover:gap-2 transition-all gradient-text-cyan-purple">
                        Подробнее
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
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
