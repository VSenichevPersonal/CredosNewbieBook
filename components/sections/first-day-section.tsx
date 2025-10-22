"use client"

import { Clock, Coffee, Users, BookOpen, CheckCircle2, MapPin, Laptop, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"

export function FirstDaySection() {
  const timeline = [
    {
      time: "09:00",
      icon: Users,
      title: "Знакомство с руководителем и наставником",
      description: "Встреча с непосредственным руководителем и наставником. Первое знакомство с командой.",
      tips: ["Возьмите с собой паспорт", "Приходите за 10 минут"],
    },
    {
      time: "09:30",
      icon: MapPin,
      title: "Размещение на рабочем месте",
      description: "Наставник или HR разместит тебя на рабочем месте и проведет экскурсию по офису.",
      tips: ["Запоминайте расположение кухни", "Узнайте где туалеты и переговорные"],
    },
    {
      time: "10:30",
      icon: Laptop,
      title: "Настройка рабочего места",
      description: "Получение компьютера, настройка доступов к системам, создание корпоративной почты.",
      tips: ["Придумайте надежный пароль", "Сохраните все учетные данные"],
    },
    {
      time: "12:00",
      icon: BookOpen,
      title: "План адаптации",
      description: "Наставник познакомит с планом адаптации и порядком взаимодействия с другими службами компании.",
      tips: ["Делайте заметки", "Задавайте вопросы"],
    },
    {
      time: "13:00",
      icon: Coffee,
      title: "Обеденный перерыв",
      description: "Время для обеда и неформального общения с коллегами. Перерыв 1 час в промежутке с 12:00 до 15:00.",
      tips: ["Пообедайте с коллегами", "Узнайте где поблизости кафе"],
    },
    {
      time: "14:00",
      icon: MessageSquare,
      title: "Знакомство с процессами",
      description: "Разъяснение всех возникших вопросов, знакомство с рабочими процессами и инструментами.",
      tips: ["Добавьте важные ссылки в закладки", "Уточните у кого что спрашивать"],
    },
  ]

  const checklist = [
    "Получить пропуск и ключи от офиса",
    "Настроить рабочий компьютер и доступы",
    "Создать корпоративную почту @credos.ru",
    "Подключиться к Битрикс24 (credos.bitrix24.ru)",
    "Познакомиться с командой своего отдела",
    "Изучить структуру компании в Битриксе",
    "Прочитать путеводитель на welcome.credos.ru",
    "Узнать расположение обоих офисов",
    "Познакомиться с наставником",
    "Получить план адаптации",
  ]

  const importantContacts = [
    {
      role: "HR-менеджер",
      name: "Твой главный помощник",
      location: "Офис Демонстрации, 27",
      description: "По всем вопросам адаптации и любым другим вопросам",
    },
    {
      role: "Технический центр (IT)",
      name: "Андрей Мурашкин",
      location: "Офис Демонстрации, 27",
      description: "Проблемы с техникой, доступами, Wi-Fi, почтой",
    },
    {
      role: "Офис-менеджер",
      name: "Ирина Шишкова",
      location: "Офис Демонстрации, 27",
      description: "Канцтовары, бронирование машины, гостиницы",
    },
    {
      role: "Главный бухгалтер",
      name: "Зоя Григорьевна Степченко",
      location: "Офис Демонстрации, 27",
      description: "Зарплата, справки, больничные, отпускные",
    },
  ]

  return (
    <section id="first-day" className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent-orange/10 to-accent-pink/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium mb-4">
              <Clock className="w-4 h-4 text-accent-orange" />
              <span>Первый день</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Твой первый день <span className="gradient-text-multi">в Кредо-С</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Мы рады приветствовать тебя в нашей команде! Для того, чтобы тебе было легче и быстрее освоиться в
              компании, мы подготовили подробный план первого дня.
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Как будет строиться твой первый день?</h3>
            <div className="space-y-6">
              {timeline.map((item, index) => {
                const Icon = item.icon
                return (
                  <Card
                    key={index}
                    className="glass border-white/10 p-6 hover:border-accent-cyan/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex items-start gap-4 md:w-1/4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-accent-cyan" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent-cyan">{item.time}</div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                        <p className="text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tips.map((tip, tipIndex) => (
                            <span
                              key={tipIndex}
                              className="text-xs px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                            >
                              {tip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Two columns: Checklist and Contacts */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Checklist */}
            <Card className="glass border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent-purple" />
                </div>
                <h3 className="text-2xl font-bold">Чек-лист первого дня</h3>
              </div>
              <ul className="space-y-3">
                {checklist.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-5 h-5 text-accent-cyan mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Important Contacts */}
            <Card className="glass border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-orange/20 to-accent-pink/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent-orange" />
                </div>
                <h3 className="text-2xl font-bold">К кому обращаться?</h3>
              </div>
              <div className="space-y-4">
                {importantContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 hover:from-muted/70 hover:to-muted/50 transition-all duration-300"
                  >
                    <div className="font-semibold text-accent-cyan mb-1">{contact.role}</div>
                    <div className="text-sm text-foreground mb-1">{contact.name}</div>
                    <div className="text-xs text-muted-foreground mb-2">{contact.location}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{contact.description}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Card className="glass border-white/10 p-8 inline-block max-w-2xl">
              <p className="text-lg mb-4 leading-relaxed">
                Если остались вопросы, с которыми ты не знаешь к кому подойти – смело подходи к HR!
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Твой HR-специалист – это твой персональный проводник по компании. Неважно, с каким вопросом или
                сложностью ты столкнулся – если ты не уверен, к кому обратиться, твой путь лежит к нему.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
