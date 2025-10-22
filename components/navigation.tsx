"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (pathname === "/") {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
        setIsMobileMenuOpen(false)
      }
    } else {
      router.push(`/#${id}`)
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-200" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="https://www.credos.ru/local/templates/credos-new/images/logo__new.svg"
              alt="КРЕДО-С"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
            <span className="text-sm text-muted-foreground border-l border-gray-300 pl-3">Книга новичка</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/first-day">
              <Button size="sm" className="btn-credos">
                Твой первый день
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("about")}
              className="text-sm text-primary-navy hover:text-[#00BFFF] hover:bg-[#00BFFF]/5"
            >
              О компании
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("departments")}
              className="text-sm text-primary-navy hover:text-[#00BFFF] hover:bg-[#00BFFF]/5"
            >
              Отделы
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("directions")}
              className="text-sm text-primary-navy hover:text-[#00BFFF] hover:bg-[#00BFFF]/5"
            >
              Направления
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("benefits")}
              className="text-sm text-primary-navy hover:text-[#00BFFF] hover:bg-[#00BFFF]/5"
            >
              Бонусы
            </Button>
            <Link href="/mission-ethics">
              <Button size="sm" className="ml-2 btn-credos-outline">
                Миссия и этика
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              <Link href="/first-day">
                <Button className="w-full btn-credos mb-2">Твой первый день</Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("about")}
                className="justify-start hover:bg-[#00BFFF]/5"
              >
                О компании
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("departments")}
                className="justify-start hover:bg-[#00BFFF]/5"
              >
                Отделы
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("directions")}
                className="justify-start hover:bg-[#00BFFF]/5"
              >
                Направления
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("benefits")}
                className="justify-start hover:bg-[#00BFFF]/5"
              >
                Бонусы
              </Button>
              <Link href="/mission-ethics">
                <Button className="w-full btn-credos-outline mt-2">Миссия и этика</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
