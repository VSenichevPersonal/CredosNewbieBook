import { Navigation } from "@/components/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { mission, codeOfConduct, companyInfo } from "@/lib/data"
import { Card } from "@/components/ui/card"
import { Target, Heart, Shield, Users, Lightbulb, CheckCircle2 } from "lucide-react"

export const metadata = {
  title: "Миссия и этика | КРЕДО-С",
  description: "Наша миссия, ценности и корпоративная этика",
}

export default function MissionEthicsPage() {
  const yearsInBusiness = new Date().getFullYear() - companyInfo.founded

  return (
    <main className="min-h-screen bg-[#EBF5FB]">
      {/* Navigation component */}
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0A2E5C] via-[#0D3A6F] to-[#00BFFF] text-white py-20 relative overflow-hidden mt-16">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumbs items={[{ label: "Миссия и этика" }]} />

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Наши ценности</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Миссия и корпоративная этика</h1>
              <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
                Более {yearsInBusiness} лет мы помогаем компаниям защищать их бизнес, руководствуясь четкими принципами
                и ценностями
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-16">
          <section>
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A2E5C] to-[#00BFFF] mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-[#0A2E5C]">{mission.title}</h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">{mission.description}</p>
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center text-[#0A2E5C]">Наши ценности</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {mission.values.map((value, index) => {
                const icons = [Lightbulb, Shield, Users, Heart]
                const Icon = icons[index % icons.length]
                return (
                  <Card key={index} className="p-8 hover:shadow-lg transition-shadow bg-white border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00BFFF]/20 to-[#0A2E5C]/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#0A2E5C]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-[#0A2E5C]">{value.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Code of Conduct */}
          <section>
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00BFFF] to-[#0A2E5C] mx-auto mb-6 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-[#0A2E5C]">Кодекс корпоративной этики</h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Принципы, которыми мы руководствуемся в работе и взаимодействии друг с другом
              </p>
            </div>

            <Card className="p-8 bg-white border-gray-200">
              <div className="space-y-4">
                {codeOfConduct.map((principle, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-[#EBF5FB] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A2E5C] to-[#00BFFF] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-lg leading-relaxed pt-0.5 text-gray-800">{principle}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Why It Matters */}
          <section>
            <Card className="p-8 bg-gradient-to-br from-[#D6EAF8] to-[#AED6F1] border-[#00BFFF]/30">
              <h3 className="text-2xl font-semibold mb-4 text-center text-[#0A2E5C]">Почему это важно?</h3>
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p>
                  Наша миссия и ценности - это не просто слова на бумаге. Они определяют, как мы работаем с клиентами,
                  как взаимодействуем внутри команды и какие решения принимаем в сложных ситуациях.
                </p>
                <p>
                  В сфере информационной безопасности особенно важны доверие, профессионализм и этичность. Клиенты
                  доверяют нам защиту своих критичных систем и данных, и мы несем ответственность за это доверие.
                </p>
                <p>
                  Каждый сотрудник КРЕДО-С является носителем наших ценностей и представителем компании. Следуя
                  принципам корпоративной этики, мы создаем комфортную рабочую среду и укрепляем репутацию компании на
                  рынке.
                </p>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </main>
  )
}
