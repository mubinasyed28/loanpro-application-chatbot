export interface LoanType {
  id: string
  name: string
  description: string
  interestRate: string
  features: string[]
}

export const loanTypes: LoanType[] = [
  {
    id: "personal",
    name: "Personal Loan",
    description: "Quick and easy personal loans for your immediate needs",
    interestRate: "9.9%",
    features: ["No collateral required", "Quick approval", "Flexible tenure"],
  },
  {
    id: "home",
    name: "Home Loan",
    description: "Make your dream home a reality with our competitive rates",
    interestRate: "7.75%",
    features: ["Low interest rates", "Long tenure", "Tax benefits"],
  },
  {
    id: "car",
    name: "Car Loan",
    description: "Drive your dream car with our attractive financing options",
    interestRate: "5%",
    features: ["Low interest rates", "Quick processing", "Flexible repayment options"],
  },
  {
    id: "education",
    name: "Education Loan",
    description: "Invest in your future with our education financing",
    interestRate: "10.6%",
    features: ["Covers full course fee", "Moratorium period", "Tax benefits"],
  },
]

export interface ChatMessage {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  options?: string[]
}

export interface LoanApplication {
  loanType: string
  personalInfo: {
    fullName?: string
    dateOfBirth?: string
    gender?: string
    mobile?: string
    permanentAddress?: string
    currentAddress?: string
    existingAccount?: boolean
    accountNumber?: string
    aadhaarNumber?: string
    panNumber?: string
  }
  loanDetails: {
    state?: string
    city?: string
    age?: number
    cibilScore?: number
    loanAmount?: number
    tenure?: number
  }
  documents: {
    photo?: File
    signature?: string
  }
  status: "draft" | "kyc-pending" | "kyc-complete" | "loan-details" | "submitted"
}
