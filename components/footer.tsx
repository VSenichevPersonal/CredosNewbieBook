import { companyInfo } from "@/lib/data"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent-cyan rounded-lg flex items-center justify-center">
                  <span className="text-accent-cyan-foreground font-bold text-sm">КС</span>
                </div>
                <span className="font-bold text-lg">КРЕДО-С</span>
              </div>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                Надежный партнер в области информационной безопасности с {companyInfo.founded} года
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-primary-foreground/80">
                <p>{companyInfo.offices[0].address}</p>
                <p>ИНН: {companyInfo.inn}</p>
                <p>ОГРН: {companyInfo.ogrn}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Полезные ссылки</h3>
              <div className="space-y-2 text-sm">
                <a href="#about" className="block text-primary-foreground/80 hover:text-accent-cyan transition-colors">
                  О компании
                </a>
                <a
                  href="#departments"
                  className="block text-primary-foreground/80 hover:text-accent-cyan transition-colors"
                >
                  Отделы
                </a>
                <a
                  href="#directions"
                  className="block text-primary-foreground/80 hover:text-accent-cyan transition-colors"
                >
                  Направления
                </a>
                <a
                  href="/mission-ethics"
                  className="block text-primary-foreground/80 hover:text-accent-cyan transition-colors"
                >
                  Миссия и этика
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
            <p>
              © {new Date().getFullYear()} {companyInfo.name}. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
