import { HeroSection } from "@/components/hero-section"
import { LoanCarousel } from "@/components/loan-carousel"
import { TrustSection } from "@/components/trust-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <LoanCarousel />
      <TrustSection />
      <Footer />
    </main>
  )
}
