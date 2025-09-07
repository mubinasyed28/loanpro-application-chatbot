"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Users } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center lg:flex-row lg:text-left">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-6xl text-balance">
                Above Your <span className="text-primary">Financial Dreams</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
                Experience seamless loan applications with competitive rates, quick approvals, and personalized service.
                Your trusted partner in achieving financial goals.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Link href="/chat">
                  Apply for Loan <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Calculate EMI
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">100% Secure</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Quick Approval</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">10M+ Customers</span>
              </div>
            </div>
          </div>

          <div className="flex-1 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-card rounded-3xl p-8 shadow-2xl border">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-card-foreground">Loan Calculator</h3>
                    <p className="text-muted-foreground">Get instant EMI estimates</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-card-foreground">Loan Amount</label>
                      <div className="mt-1 text-3xl font-bold text-primary">₹5,00,000</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-card-foreground">Interest Rate</label>
                        <div className="mt-1 text-xl font-semibold text-accent">12.5%</div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-card-foreground">Tenure</label>
                        <div className="mt-1 text-xl font-semibold text-accent">5 Years</div>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-card-foreground">Monthly EMI</span>
                        <span className="text-2xl font-bold text-primary">₹11,122</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
