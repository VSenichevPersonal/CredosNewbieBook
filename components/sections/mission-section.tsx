import Link from "next/link"
import { mission } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, ArrowRight } from "lucide-react"

export function MissionSection() {
  return (
    <section id="mission" className="py-24 bg-gradient-to-br from-primary/5 to-accent-cyan/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Наши ценности</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{mission.title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              {mission.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {mission.values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-cyan mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/mission-ethics">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 group">
                Узнать больше о миссии и этике
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
