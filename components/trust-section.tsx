import { Shield, Award, Users, CheckCircle, Star } from "lucide-react"

export function TrustSection() {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "10M+" },
    { icon: Award, label: "Years of Trust", value: "25+" },
    { icon: CheckCircle, label: "Loans Approved", value: "50L+" },
    { icon: Star, label: "Customer Rating", value: "4.8/5" },
  ]

  const certifications = ["RBI Approved", "ISO 27001 Certified", "PCI DSS Compliant", "256-bit SSL Encryption"]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Trusted by Millions</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Your security and satisfaction are our top priorities. Join millions who trust us with their financial
            needs.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 rounded-full bg-primary/10 p-4 w-fit">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Security Certifications */}
        <div className="bg-muted/50 rounded-2xl p-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Bank-Grade Security</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
