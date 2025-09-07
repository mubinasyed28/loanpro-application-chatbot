"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { CheckCircle, Calculator, FileText, Loader2 } from "lucide-react"

interface LoanApplicationFormProps {
  loanType: string
  onSubmit: (data: any) => void
  onNext: () => void
  currentField: string
}

const loanInterestRates = {
  personal: "9.9%",
  home: "7.75%",
  car: "5%",
  education: "10.6%",
}

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
]

export function LoanApplicationForm({ loanType, onSubmit, onNext, currentField }: LoanApplicationFormProps) {
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    age: "",
    cibilScore: [750],
    loanAmount: [500000],
    tenure: [5],
  })

  const [isCheckingCibil, setIsCheckingCibil] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure * 12)) / (Math.pow(1 + monthlyRate, tenure * 12) - 1)
    return Math.round(emi)
  }

  const getInterestRate = () => {
    const baseRates = {
      personal: 9.9,
      home: 7.75,
      car: 5.0,
      education: 10.6,
    }
    return baseRates[loanType as keyof typeof baseRates] || 12.0
  }

  const checkCibilScore = async () => {
    setIsCheckingCibil(true)

    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate random score between 680-774
    const randomScore = Math.floor(Math.random() * (774 - 680 + 1)) + 680
    handleInputChange("cibilScore", [randomScore])
    setIsCheckingCibil(false)
  }

  const renderField = () => {
    switch (currentField) {
      case "location":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                    <SelectItem value="other">Other (Please specify in city field)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter your city"
                  className="w-full"
                />
              </div>

              <Button onClick={onNext} className="w-full" disabled={!formData.state || !formData.city.trim()}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "age":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Age Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="80"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Enter your age"
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Must be between 18 and 80 years</p>
              </div>
              <Button
                onClick={onNext}
                className="w-full"
                disabled={!formData.age || Number.parseInt(formData.age) < 18 || Number.parseInt(formData.age) > 80}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "cibilScore":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                CIBIL Score Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isCheckingCibil ? (
                <div className="space-y-4">
                  <div className="text-center space-y-3">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="text-sm text-muted-foreground">Checking your CIBIL score...</p>
                    <p className="text-xs text-muted-foreground">This may take a few moments</p>
                  </div>
                </div>
              ) : !formData.cibilScore[0] || formData.cibilScore[0] === 750 ? (
                <div className="space-y-4">
                  <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                      We need to check your CIBIL score to determine your eligibility and interest rate.
                    </p>
                  </div>
                  <Button onClick={checkCibilScore} className="w-full">
                    Check My CIBIL Score
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your CIBIL Score: {formData.cibilScore[0]}</Label>
                    <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="text-3xl font-bold text-primary">{formData.cibilScore[0]}</div>
                      <p className="text-sm text-muted-foreground">
                        {formData.cibilScore[0] >= 750
                          ? "Excellent! You qualify for our best rates."
                          : formData.cibilScore[0] >= 700
                            ? "Good score. You qualify for competitive rates."
                            : "Fair score. Standard rates apply."}
                      </p>
                    </div>
                  </div>

                  <Button onClick={onNext} className="w-full">
                    Continue with This Score
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )

      case "loanAmount":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Loan Amount
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Loan Amount: ₹{formData.loanAmount[0].toLocaleString("en-IN")}</Label>
                  <Slider
                    value={formData.loanAmount}
                    onValueChange={(value) => handleInputChange("loanAmount", value)}
                    max={loanType === "home" ? 10000000 : loanType === "car" ? 5000000 : 2000000}
                    min={50000}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹50K</span>
                    <span>₹{loanType === "home" ? "1Cr" : loanType === "car" ? "50L" : "20L"}</span>
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="customAmount" className="text-xs">
                      Or enter custom amount:
                    </Label>
                    <Input
                      id="customAmount"
                      type="number"
                      placeholder="Enter custom amount"
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        if (value > 0) handleInputChange("loanAmount", [value])
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Loan Amount:</span>
                      <span className="font-semibold">₹{formData.loanAmount[0].toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate:</span>
                      <span className="font-semibold text-primary">
                        {loanInterestRates[loanType as keyof typeof loanInterestRates]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={onNext} className="w-full">
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "tenure":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Loan Tenure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tenure: {formData.tenure[0]} years</Label>
                  <Slider
                    value={formData.tenure}
                    onValueChange={(value) => handleInputChange("tenure", value)}
                    max={loanType === "home" ? 30 : loanType === "education" ? 15 : 10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 year</span>
                    <span>{loanType === "home" ? "30" : loanType === "education" ? "15" : "10"} years</span>
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="customTenure" className="text-xs">
                      Or enter custom tenure (years):
                    </Label>
                    <Input
                      id="customTenure"
                      type="number"
                      min="1"
                      max="30"
                      placeholder="Enter custom tenure"
                      onChange={(e) => {
                        const value = Number(e.target.value)
                        if (value > 0) handleInputChange("tenure", [value])
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-center space-y-2">
                    <h4 className="font-semibold text-accent-foreground">EMI Calculation</h4>
                    <div className="text-2xl font-bold text-primary">
                      ₹
                      {calculateEMI(formData.loanAmount[0], getInterestRate(), formData.tenure[0]).toLocaleString(
                        "en-IN",
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Monthly EMI</p>
                  </div>
                </div>
              </div>

              <Button onClick={onNext} className="w-full">
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "summary":
        const emi = calculateEMI(formData.loanAmount[0], getInterestRate(), formData.tenure[0])
        const totalAmount = emi * formData.tenure[0] * 12
        const totalInterest = totalAmount - formData.loanAmount[0]

        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-6 w-6" />
                Loan Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Loan Type:</span>
                    <div className="font-semibold capitalize">{loanType} Loan</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <div className="font-semibold">
                      {formData.city}, {formData.state}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Age:</span>
                    <div className="font-semibold">{formData.age} years</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">CIBIL Score:</span>
                    <div className="font-semibold">{formData.cibilScore[0]}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Interest Rate:</span>
                    <div className="font-semibold text-primary">
                      {loanInterestRates[loanType as keyof typeof loanInterestRates]}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Loan Amount:</span>
                      <span className="font-semibold">₹{formData.loanAmount[0].toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tenure:</span>
                      <span className="font-semibold">{formData.tenure[0]} years</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Monthly EMI:</span>
                      <span className="font-bold text-primary">₹{emi.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Total Interest:</span>
                      <span>₹{totalInterest.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Total Amount:</span>
                      <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm text-center">
                    <strong>Interest rate is {loanInterestRates[loanType as keyof typeof loanInterestRates]}.</strong>
                    <br />
                    Ready to proceed with document submission?
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={() => onSubmit(formData)} className="w-full">
                  Yes, Proceed to Documents
                </Button>
                <Button variant="outline" onClick={onNext} className="w-full bg-transparent">
                  Submit Application Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return <div className="flex justify-center p-4">{renderField()}</div>
}
