"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Home, User, Car, GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { loanTypes } from "@/lib/loan-types"

const loanIcons = {
  personal: User,
  home: Home,
  car: Car,
  education: GraduationCap,
}

export function LoanCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % loanTypes.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + loanTypes.length) % loanTypes.length)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">Choose Your Perfect Loan</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Tailored financial solutions for every need. Compare our competitive rates and find the loan that fits your
            requirements.
          </p>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 mb-8">
          {loanTypes.map((loan) => {
            const Icon = loanIcons[loan.id as keyof typeof loanIcons]
            return (
              <Card
                key={loan.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 rounded-full bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{loan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground text-pretty">{loan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-2">Starting at {loan.interestRate}</div>
                    <div className="text-sm text-muted-foreground">Interest Rate</div>
                  </div>

                  <ul className="space-y-2 text-sm">
                    {loan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                    <Link href="/chat">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mobile Carousel View */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {loanTypes.map((loan) => {
                const Icon = loanIcons[loan.id as keyof typeof loanIcons]
                return (
                  <div key={loan.id} className="w-full flex-shrink-0 px-4">
                    <Card className="border-2 hover:border-primary/20 transition-colors">
                      <CardHeader className="text-center pb-4">
                        <div className="mx-auto mb-4 rounded-full bg-primary/10 p-4">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-xl text-card-foreground">{loan.name}</CardTitle>
                        <CardDescription className="text-muted-foreground text-pretty">
                          {loan.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-2">Starting at {loan.interestRate}</div>
                          <div className="text-sm text-muted-foreground">Interest Rate</div>
                        </div>

                        <ul className="space-y-2 text-sm">
                          {loan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Button asChild className="w-full">
                          <Link href="/chat">
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {loanTypes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
