import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LoanPro by Nexus - Above Your Financial Dreams",
  description: "Experience seamless loan applications with competitive rates and quick approvals",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <header className="bg-primary text-primary-foreground shadow-sm">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-white">LoanPro</div>
                  <div className="text-sm text-white/80">by Nexus</div>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                  <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
                    Loans
                  </a>
                  <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
                    Calculator
                  </a>
                  <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
                    Support
                  </a>
                </nav>
              </div>
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
