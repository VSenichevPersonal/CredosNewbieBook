import Link from "next/link"
import { directions } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Shield, FileText, Server, Workflow, Boxes, ArrowRight } from "lucide-react"

const iconMap = {
  Shield,
  FileText,
  Server,
  Workflow,
  Boxes,
}

export function DirectionsSection() {
  return (
    <section id="directions" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Направления деятельности</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Комплексные решения для защиты вашего бизнеса
            </p>
          </div>

          <div className="space-y-6">
            {directions.map((direction, index) => {
              const Icon = iconMap[direction.icon as keyof typeof iconMap]
              return (
                <Link key={direction.id} href={`/directions/${direction.slug}`}>
                  <Card
                    className={`p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer overflow-hidden relative`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${direction.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                    />
                    <div className="relative flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-primary group-hover:text-accent-cyan transition-colors" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-semibold mb-3 group-hover:text-accent-cyan transition-colors">
                          {direction.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{direction.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {direction.services.slice(0, 3).map((service, idx) => (
                            <span key={idx} className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground">
                              {service}
                            </span>
                          ))}
                          {direction.services.length > 3 && (
                            <span className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground">
                              +{direction.services.length - 3} еще
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center text-accent-cyan font-medium group-hover:gap-2 transition-all self-center">
                        Узнать больше
                        <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
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
