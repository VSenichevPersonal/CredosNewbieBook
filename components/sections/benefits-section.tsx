import { Card } from "@/components/ui/card"
import { GraduationCap, Dumbbell, Heart, PartyPopper, DollarSign, Calendar, Award, Coffee, Plane } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: Award,
      title: "Бонусная система",
      description:
        "Гибкая система баллов для всех сотрудников после испытательного срока. Баллы начисляются с учетом стажа, должности и формата работы.",
    },
    {
      icon: GraduationCap,
      title: "Обучение английскому",
      description: "Корпоративные курсы английского языка для развития профессиональных навыков.",
    },
    {
      icon: Dumbbell,
      title: "Фитнес и спорт",
      description: "Компенсация занятий спортом и фитнесом для поддержания здорового образа жизни.",
    },
    {
      icon: Heart,
      title: "ДМС",
      description: "Добровольное медицинское страхование для заботы о твоем здоровье.",
    },
    {
      icon: Calendar,
      title: "28 дней отпуска",
      description: "Ежегодный оплачиваемый отпуск. Первый раз можно уйти спустя 6 месяцев работы.",
    },
    {
      icon: DollarSign,
      title: "Зарплата 2 раза в месяц",
      description: "Аванс 22 числа, расчет 7 числа. Оплата отпуска за 3 дня до его начала.",
    },
    {
      icon: Coffee,
      title: "Кофе и снеки",
      description: "Бесплатный кофе, чай, молоко для капучино и кондитерские изделия в офисе.",
    },
    {
      icon: PartyPopper,
      title: "Корпоративные мероприятия",
      description: "23 февраля, 8 марта, новогодний корпоратив и другие праздники вместе с командой.",
    },
    {
      icon: Plane,
      title: "Гибкий график",
      description: "Возможность согласовать индивидуальный график работы с руководителем.",
    },
  ]

  return (
    <section id="benefits" className="py-24 relative overflow-hidden bg-background">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-orange/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Бонусы <span className="gradient-text-multi">и льготы</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Мы ценим вклад каждого сотрудника и создали систему, которая позволяет выбирать вознаграждение по своим
              интересам
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={index}
                  className="glass border-white/10 p-6 hover:border-accent-cyan/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-accent-cyan" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </Card>
              )
            })}
          </div>

          {/* Bonus System Details */}
          <Card className="glass border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Как работает <span className="gradient-text-multi">бонусная система?</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-accent-cyan" />
                </div>
                <h4 className="font-semibold mb-2">Начисление баллов</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Баллы начисляются 1 раз в год (в июле) по формуле: стаж × должность − удалённая работа
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-8 h-8 text-accent-purple" />
                </div>
                <h4 className="font-semibold mb-2">Выбор бонуса</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Выбери вознаграждение из каталога на заработанные баллы: обучение, спорт, ДМС и другое
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-orange/20 to-accent-pink/20 flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-accent-orange" />
                </div>
                <h4 className="font-semibold mb-2">Действие бонуса</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Выбранный бонус действует до следующего июля. Менять его чаще нельзя
                </p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Система доступна для всех сотрудников, успешно завершивших испытательный срок
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
