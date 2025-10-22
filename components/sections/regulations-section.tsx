import { Card } from "@/components/ui/card"
import { Clock, Calendar, FileText, AlertCircle, DollarSign, Users, Coffee } from "lucide-react"

export function RegulationsSection() {
  const regulations = [
    {
      title: "Рабочее время",
      description:
        "График работы с 9:00 до 18:00 или индивидуальный график по согласованию с руководителем. Перерыв 1 час с 12:00 до 15:00.",
      icon: Clock,
      details: [
        "Выходные: суббота, воскресенье",
        "При задержке на работе – сообщить руководителю",
        "При уходе раньше – согласовать с руководителем",
      ],
    },
    {
      title: "Отпуск",
      description: "28 календарных дней ежегодного оплачиваемого отпуска. Первый отпуск через 6 месяцев работы.",
      icon: Calendar,
      details: ["Минимум 14 дней за один раз", "Заявление за 2 недели до отпуска", "Оплата за 3 дня до начала отпуска"],
    },
    {
      title: "Заработная плата",
      description: "Выплата 2 раза в месяц: аванс 22 числа, расчет 7 числа следующего месяца.",
      icon: DollarSign,
      details: [
        "При совпадении с выходным – накануне",
        "Все вопросы к главному бухгалтеру",
        "Справки 2-НДФЛ в бухгалтерии",
      ],
    },
    {
      title: "Больничный",
      description: "Листок нетрудоспособности предоставляется в день закрытия главному бухгалтеру.",
      icon: FileText,
      details: ["Расчет по стандартной процедуре", "При недомогании – удаленка 1-2 дня", "Согласовать с руководителем"],
    },
    {
      title: "Деловой этикет",
      description: "Мы вежливы и профессиональны во всех формах общения. Не используем ненормативную лексику.",
      icon: Users,
      details: ["Пунктуальность на встречах", "Конструктивный диалог", "Уважение к альтернативному мнению"],
    },
    {
      title: "Правила офиса",
      description: "Рабочее место в чистоте и порядке. Кухня и общие зоны – для всех.",
      icon: Coffee,
      details: ["Мой посуду за собой", "Не храни просроченные продукты", "Выключай свет, закрывай окна"],
    },
  ]

  return (
    <section id="regulations" className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-gradient-to-br from-accent-orange/10 to-accent-pink/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Регламенты <span className="gradient-text-multi">работы</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Основные правила и процессы, которые важно знать каждому сотруднику
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {regulations.map((regulation, index) => {
              const Icon = regulation.icon
              return (
                <Card
                  key={index}
                  className="glass border-white/10 p-6 hover:border-accent-cyan/30 transition-all duration-300 group"
                >
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-accent-cyan" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{regulation.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{regulation.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-16">
                    {regulation.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-accent-cyan mt-1">•</span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>

          {/* Communication Principles */}
          <Card className="glass border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-accent-purple" />
              </div>
              <h3 className="text-2xl font-bold">Принципы внутрифирменного общения</h3>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Взаимодействие в нашей команде основано на принципах эффективной коммуникации и открытого диалога: мы
                обсуждаем все возникающие вопросы и находим наиболее оптимальные решения.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Мы не замалчиваем проблемы и не пускаем на самотек решение сложных ситуаций. Мы всегда открыты к диалогу
                и готовы оказать адекватную помощь в любой момент, по любому вопросу.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                В «Кредо-С» можно напрямую обратиться за помощью к каждому сотруднику, в том числе и к Исполнительному
                директору.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
