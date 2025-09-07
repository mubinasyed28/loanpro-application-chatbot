"use client"

import { useState, useCallback } from "react"
import { type ChatMessage, type LoanApplication, loanTypes } from "@/lib/loan-types"

type ChatStep =
  | "loan-selection"
  | "loan-info"
  | "kyc-confirmation"
  | "kyc-flow"
  | "loan-details"
  | "loan-application"
  | "document-upload"
  | "application-complete"

type KYCStep =
  | "fullName"
  | "dateOfBirth"
  | "gender"
  | "mobile"
  | "permanentAddress"
  | "currentAddress"
  | "existingAccount"
  | "aadhaarNumber"
  | "panNumber"
  | "photo"
  | "signature"
  | "complete"

type LoanApplicationStep = "location" | "age" | "cibilScore" | "loanAmount" | "tenure" | "summary"

export function useChatState() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState<ChatStep>("loan-selection")
  const [currentKYCStep, setCurrentKYCStep] = useState<KYCStep>("fullName")
  const [currentLoanStep, setCurrentLoanStep] = useState<LoanApplicationStep>("location")
  const [showKYCForm, setShowKYCForm] = useState(false)
  const [showLoanForm, setShowLoanForm] = useState(false)
  const [loanApplication, setLoanApplication] = useState<LoanApplication>({
    loanType: "",
    personalInfo: {},
    loanDetails: {},
    documents: {},
    status: "draft",
  })

  const addMessage = useCallback((content: string, type: "user" | "bot", options?: string[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      options,
    }
    setMessages((prev) => [...prev, newMessage])
  }, [])

  const addBotMessage = useCallback(
    (content: string, options?: string[]) => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        addMessage(content, "bot", options)
      }, 1500)
    },
    [addMessage],
  )

  const isQuestionForAI = useCallback((question: string) => {
    const lowerQuestion = question.toLowerCase()
    const questionKeywords = [
      "what is",
      "what are",
      "how does",
      "how do",
      "explain",
      "define",
      "meaning",
      "cibil",
      "credit score",
      "emi",
      "interest rate",
      "eligibility",
      "documents",
      "requirements",
      "process",
      "how to",
      "why",
      "when",
      "difference between",
      "types of",
      "benefits",
      "advantages",
      "disadvantages",
      "?",
    ]

    return questionKeywords.some((keyword) => lowerQuestion.includes(keyword))
  }, [])

  const handleAIQuestion = useCallback(
    async (question: string) => {
      try {
        setIsTyping(true)
        const response = await fetch("/api/ai/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        })

        const data = await response.json()

        setTimeout(() => {
          setIsTyping(false)
          if (data.answer) {
            addMessage(
              `${data.answer}

Is there anything else you'd like to know, or shall we continue with your loan application?`,
              "bot",
              ["Continue application", "Ask another question", "Explain more"],
            )
          } else {
            addMessage(
              "I apologize, but I couldn't process your question at the moment. Our customer service team can provide detailed answers. Would you like to continue with your loan application?",
              "bot",
              ["Continue application", "Contact support", "Try again"],
            )
          }
        }, 2000)
      } catch (error) {
        setTimeout(() => {
          setIsTyping(false)
          addMessage(
            "I'm having trouble accessing detailed information right now. For specific questions, please contact our customer service at 1800-123-4567. Shall we continue with your loan application?",
            "bot",
            ["Continue application", "Contact support", "Try again"],
          )
        }, 1500)
      }
    },
    [addMessage],
  )

  const handleKYCNext = useCallback(() => {
    const kycSteps: KYCStep[] = [
      "fullName",
      "dateOfBirth",
      "gender",
      "mobile",
      "permanentAddress",
      "currentAddress",
      "existingAccount",
      "aadhaarNumber",
      "panNumber",
      "photo",
      "signature",
      "complete",
    ]

    const currentIndex = kycSteps.indexOf(currentKYCStep)
    if (currentIndex < kycSteps.length - 1) {
      setCurrentKYCStep(kycSteps[currentIndex + 1])
    }

    if (currentKYCStep === "existingAccount" && loanApplication.personalInfo.existingAccount === false) {
      setShowKYCForm(false)
      addBotMessage(
        "Thank you for your interest in LoanPro! Since you don't have an existing account with us, please create one first to proceed with your loan application.\n\n🔗 **Create Account:** https://loanpro.nexus.com/register\n\nOnce you have an account, you can return here to complete your loan application. Is there anything else I can help you with?",
        ["Create Account", "Contact Support", "Learn More About Loans"],
      )
      return
    }

    if (currentKYCStep === "complete") {
      setShowKYCForm(false)
      setCurrentStep("loan-details")
      addBotMessage(
        "Excellent! Your KYC verification is complete. Now let's proceed with your loan application details.",
        ["Continue with loan application"],
      )
    }
  }, [currentKYCStep, loanApplication.personalInfo.existingAccount, addBotMessage])

  const handleKYCSubmit = useCallback(
    (kycData: any) => {
      setLoanApplication((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, ...kycData },
        status: "kyc-complete",
      }))

      setShowKYCForm(false)
      setCurrentStep("loan-details")
      addBotMessage(
        "Perfect! Your KYC is now complete and your information has been securely saved. Let's continue with your loan application.",
        ["Start loan application"],
      )
    },
    [addBotMessage],
  )

  const handleLoanNext = useCallback(() => {
    const loanSteps: LoanApplicationStep[] = ["location", "age", "cibilScore", "loanAmount", "tenure", "summary"]

    const currentIndex = loanSteps.indexOf(currentLoanStep)
    if (currentIndex < loanSteps.length - 1) {
      setCurrentLoanStep(loanSteps[currentIndex + 1])
    } else {
      // Handle final submission
      handleLoanSubmit({})
    }
  }, [currentLoanStep])

  const handleLoanSubmit = useCallback(
    async (loanData: any) => {
      setLoanApplication((prev) => ({
        ...prev,
        loanDetails: { ...prev.loanDetails, ...loanData },
        status: "submitted",
      }))

      setShowLoanForm(false)
      setCurrentStep("application-complete")

      // Submit to API
      try {
        const response = await fetch("/api/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...loanApplication,
            loanDetails: { ...loanApplication.loanDetails, ...loanData },
          }),
        })

        const result = await response.json()

        if (result.success) {
          addBotMessage(
            `🎉 Congratulations! Your loan application has been submitted successfully.

📋 **Application Details:**
• Reference ID: **${result.referenceId}**
• Status: Under Review
• Expected Response: 2-3 business days

📞 **Next Steps:**
1. Our team will verify your documents
2. You'll receive updates via SMS/Email
3. Upon approval, funds will be disbursed to your account

Thank you for choosing LoanPro! Is there anything else I can help you with?`,
            ["Track Application Status", "Apply for Another Loan", "Contact Support"],
          )
        } else {
          addBotMessage(
            "I apologize, but there was an issue submitting your application. Please try again or contact our support team for assistance.",
            ["Try Again", "Contact Support"],
          )
        }
      } catch (error) {
        addBotMessage(
          "There was a technical issue submitting your application. Please try again later or contact our support team.",
          ["Try Again", "Contact Support"],
        )
      }
    },
    [loanApplication, addBotMessage],
  )

  const handleLoanTypeSelection = useCallback(
    (loanType: string) => {
      const selectedLoan = loanTypes.find(
        (loan) =>
          loan.name === loanType ||
          loanType.toLowerCase().includes(loan.id) ||
          (loanType.toLowerCase().includes("car") && loan.id === "car"),
      )

      if (selectedLoan) {
        setLoanApplication((prev) => ({
          ...prev,
          loanType: selectedLoan.id,
        }))

        setCurrentStep("loan-info")

        setTimeout(() => {
          addBotMessage(
            `Great choice! ${selectedLoan.name} offers competitive rates starting at ${selectedLoan.interestRate}. 
          
Key features:
${selectedLoan.features.map((feature) => `• ${feature}`).join("\n")}

To proceed with your application, we'll need to complete a quick KYC (Know Your Customer) process for security and compliance.`,
            ["Yes, continue to KYC", "Tell me more about rates", "I have questions"],
          )
        }, 1000)
      }
    },
    [addBotMessage],
  )

  const handleUserResponse = useCallback(
    (response: string) => {
      const lowerResponse = response.toLowerCase()

      if (isQuestionForAI(response)) {
        handleAIQuestion(response)
        return
      }

      switch (currentStep) {
        case "loan-info":
          if (lowerResponse.includes("yes") || lowerResponse.includes("continue") || lowerResponse.includes("kyc")) {
            setCurrentStep("kyc-flow")
            setShowKYCForm(true)
            setCurrentKYCStep("fullName")
            addBotMessage("Perfect! Let's start with your KYC process. Please fill out the form below step by step.")
          } else if (lowerResponse.includes("rates") || lowerResponse.includes("interest")) {
            addBotMessage(
              "Our interest rates are competitive and depend on various factors like your credit score, income, and loan amount. The rates I mentioned are starting rates for eligible customers. Would you like to proceed with KYC to get a personalized rate?",
              ["Yes, continue to KYC", "Calculate my EMI first"],
            )
          } else if (lowerResponse.includes("questions") || lowerResponse.includes("help")) {
            addBotMessage(
              "I'm here to help! You can ask me anything about our loan products, interest rates, eligibility criteria, or the application process. What would you like to know?",
              ["What is CIBIL score?", "How is EMI calculated?", "What documents do I need?", "Continue to KYC"],
            )
          } else {
            addBotMessage(
              "I understand you have questions. I can provide instant answers to help you understand our loan products better. Feel free to ask me anything!",
              ["What is CIBIL score?", "How is EMI calculated?", "What documents do I need?", "Continue application"],
            )
          }
          break

        case "kyc-flow":
          if (lowerResponse.includes("start kyc") || lowerResponse.includes("start")) {
            setShowKYCForm(true)
            setCurrentKYCStep("fullName")
            addBotMessage("Great! Please fill out the KYC form below. We'll guide you through each step.")
          } else {
            addBotMessage(
              "To proceed with your loan application, KYC is mandatory as per RBI guidelines. Shall we start?",
              ["Start KYC Process"],
            )
          }
          break

        case "loan-details":
          if (lowerResponse.includes("start") || lowerResponse.includes("continue")) {
            setCurrentStep("loan-application")
            setShowLoanForm(true)
            setCurrentLoanStep("location")
            addBotMessage(
              "Excellent! Now let's gather your loan requirements. Please fill out the application form below.",
            )
          }
          break

        case "application-complete":
          if (lowerResponse.includes("track")) {
            addBotMessage(
              "You can track your application status by visiting our website or calling our customer service at 1800-123-4567 with your reference ID.",
              ["Apply for Another Loan", "Contact Support", "Visit Website"],
            )
          } else if (lowerResponse.includes("another") || lowerResponse.includes("apply")) {
            setCurrentStep("loan-selection")
            setLoanApplication({
              loanType: "",
              personalInfo: {},
              loanDetails: {},
              documents: {},
              status: "draft",
            })
            addBotMessage(
              "I'd be happy to help you with another loan application! Which type of loan are you interested in?",
              ["Personal Loan", "Home Loan", "Car Loan", "Education Loan"],
            )
          } else if (lowerResponse.includes("support") || lowerResponse.includes("contact")) {
            addBotMessage(
              "You can reach our customer support team:\n\n📞 Phone: 1800-123-4567\n📧 Email: support@loanpro.com\n🕒 Hours: 9 AM - 9 PM (Mon-Sat)\n\nOur team is ready to assist you with any questions or concerns!",
              ["Apply for Another Loan", "Track Application Status"],
            )
          }
          break

        default:
          if (lowerResponse.includes("question") || lowerResponse.includes("ask") || lowerResponse.includes("help")) {
            addBotMessage(
              "I'm here to answer any questions you have about loans, banking terms, or our application process. What would you like to know?",
              ["What is CIBIL score?", "How is EMI calculated?", "What documents do I need?", "Start loan application"],
            )
          } else {
            addBotMessage(
              "I'm here to help you with your loan application. Would you like to select a loan type to get started, or do you have any questions I can answer?",
              ["Personal Loan", "Home Loan", "Car Loan", "Education Loan", "I have questions"],
            )
          }
      }
    },
    [currentStep, isQuestionForAI, handleAIQuestion, addBotMessage],
  )

  return {
    messages,
    currentInput,
    setCurrentInput,
    isTyping,
    currentStep,
    currentKYCStep,
    currentLoanStep,
    showKYCForm,
    showLoanForm,
    loanApplication,
    addMessage,
    addBotMessage,
    handleUserResponse,
    handleLoanTypeSelection,
    handleKYCNext,
    handleKYCSubmit,
    handleLoanNext,
    handleLoanSubmit,
    handleAIQuestion,
    isQuestionForAI,
  }
}
