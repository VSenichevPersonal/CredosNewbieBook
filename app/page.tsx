import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { DepartmentsSection } from "@/components/sections/departments-section"
import { DirectionsSection } from "@/components/sections/directions-section"
import { MissionSection } from "@/components/sections/mission-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { RegulationsSection } from "@/components/sections/regulations-section"
import { SystemsSection } from "@/components/sections/systems-section"
import { ResourcesSection } from "@/components/sections/resources-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <DepartmentsSection />
      <DirectionsSection />
      <MissionSection />
      <BenefitsSection />
      <RegulationsSection />
      <SystemsSection />
      <ResourcesSection />
      <Footer />
    </main>
  )
}
