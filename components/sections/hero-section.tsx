"use client"

import { ChevronDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.getElementById("about")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient noise-texture">
      {/* Abstract floating shapes */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-accent-pink/20 to-accent-orange/20 blur-3xl animate-float-delayed" />
      <div
        className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-accent-purple/15 to-accent-cyan/15 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Geometric shapes */}
      <div className="absolute top-1/4 right-1/3 w-32 h-32 border-2 border-accent-cyan/20 rounded-2xl rotate-12 animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-accent-purple/20 rounded-full animate-float-delayed" />

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left column - Text content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-medium mb-4 shadow-lg">
              <Sparkles className="w-4 h-4 text-accent-cyan" />
              <span className="text-foreground">Добро пожаловать в Кредо-С</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
              Ваш путеводитель
              <br />
              <span className="gradient-text-multi">по компании</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
              Здесь вы найдете всю необходимую информацию о структуре компании, процессах работы, корпоративной культуре
              и полезных ресурсах для успешного старта
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/first-day"
                className="bg-[#00BFFF] hover:bg-[#00A8E6] text-white font-semibold text-base px-8 h-12 shadow-xl shadow-[#00BFFF]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00BFFF]/60 hover:scale-105 inline-flex items-center justify-center rounded-md"
              >
                Начать знакомство
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white font-semibold text-base px-8 h-12 transition-all duration-300 hover:scale-105 bg-white/90"
                asChild
              >
                <a href="#departments">Посмотреть отделы</a>
              </Button>
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square">
              <Image
                src="https://www.credos.ru/local/templates/credos-new/images/first-img.svg"
                alt="Логотип Кредо-С"
                fill
                className="object-contain animate-float"
                priority
              />
            </div>
          </div>
        </div>

        <div className="pt-16 animate-bounce text-center">
          <ChevronDown className="w-6 h-6 mx-auto text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
