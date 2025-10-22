import { companyInfo } from "@/lib/data"
import { Building2, Calendar, Users, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"

export function AboutSection() {
  const yearsInBusiness = new Date().getFullYear() - companyInfo.founded

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-accent-orange/10 to-accent-pink/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              О <span className="gradient-text-multi">компании</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Более {yearsInBusiness} лет защищаем бизнес наших клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="glass border-white/10 p-8 hover:border-accent-cyan/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">История</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Компания основана в {companyInfo.founded} году. За это время мы выросли от небольшой команды
                    энтузиастов до одного из ведущих интеграторов решений информационной безопасности в регионе.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass border-white/10 p-8 hover:border-accent-cyan/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-accent-purple" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Команда</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    В компании работает {companyInfo.employees} специалистов: инженеры по информационной безопасности,
                    разработчики, менеджеры проектов и эксперты в области аудита.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="glass border-white/10 p-8">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-accent-cyan" />
              Наша география: два офиса, одна команда
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Наша компания располагается в двух офисах, которые находятся рядом друг с другом. Вот кто где сидит, чтобы
              ты всегда знал, к кому и куда идти.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">Офис №1</p>
                    <p className="text-sm text-accent-cyan">ул. Демонстрации, 27</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-cyan mt-1">•</span>
                    <span>Руководство компании</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-cyan mt-1">•</span>
                    <span>Бухгалтерия</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-cyan mt-1">•</span>
                    <span>HR (твой главный помощник)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-cyan mt-1">•</span>
                    <span>Администратор офиса</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-cyan mt-1">•</span>
                    <span>Отделы информационной безопасности</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-cyan mt-1">•</span>
                    <span>Отдел продуктовой разработки «Кибер-Основа»</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-cyan mt-1">•</span>
                    <span>Технический центр (IT-поддержка)</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-1">Офис №2</p>
                    <p className="text-sm text-accent-purple">ул. Демонстрации, 38</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-purple mt-1">•</span>
                    <span>Отдел продаж</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-purple mt-1">•</span>
                    <span>Отдел проектирования и внедрения</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-purple mt-1">•</span>
                    <span>Отдел юридического сопровождения сделок</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
