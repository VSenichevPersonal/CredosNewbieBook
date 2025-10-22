import { Navigation } from "@/components/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { FirstDaySection } from "@/components/sections/first-day-section"
import { Footer } from "@/components/footer"

export default function FirstDayPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/50 via-cyan-50/30 to-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <Breadcrumbs items={[{ label: "Твой первый день" }]} />
      </div>
      <div className="pt-0">
        <FirstDaySection />
      </div>
      <Footer />
    </main>
  )
}
