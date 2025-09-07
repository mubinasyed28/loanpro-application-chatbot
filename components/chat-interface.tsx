"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Bot } from "lucide-react"
import Link from "next/link"
import { ChatBubble } from "@/components/chat-bubble"
import { TypingIndicator } from "@/components/typing-indicator"
import { KYCForm } from "@/components/kyc-form"
import { LoanApplicationForm } from "@/components/loan-application-form"
import { AIHelpButton } from "@/components/ai-help-button"
import { useChatState } from "@/hooks/use-chat-state"

export function ChatInterface() {
  const {
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
  } = useChatState()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping, showKYCForm, showLoanForm])

  useEffect(() => {
    // Initial bot message
    if (messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Hello! Welcome to LoanPro. I'm here to help you with your loan application.", [
          "Personal Loan",
          "Home Loan",
          "Car Loan",
          "Education Loan",
        ])
      }, 1000)
    }
  }, [messages.length, addBotMessage])

  const handleSendMessage = () => {
    if (!currentInput.trim()) return

    addMessage(currentInput, "user")
    handleUserResponse(currentInput)
    setCurrentInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleOptionClick = (option: string) => {
    addMessage(option, "user")

    const loanTypes = ["Personal Loan", "Home Loan", "Car Loan", "Education Loan"]
    if (loanTypes.includes(option)) {
      handleLoanTypeSelection(option)
    } else {
      handleUserResponse(option)
    }
  }

  const handleAIHelp = async (question: string) => {
    addMessage(question, "user")
    await handleAIQuestion(question)
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 shadow-sm">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-500 p-2">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 dark:text-slate-100">LoanPro Assistant</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Online now • AI-powered help available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl space-y-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} onOptionClick={handleOptionClick} />
          ))}

          {isTyping && <TypingIndicator />}

          {showKYCForm && (
            <div className="flex justify-center">
              <KYCForm currentField={currentKYCStep} onNext={handleKYCNext} onSubmit={handleKYCSubmit} />
            </div>
          )}

          {showLoanForm && (
            <div className="flex justify-center">
              <LoanApplicationForm
                loanType={loanApplication.loanType}
                currentField={currentLoanStep}
                onNext={handleLoanNext}
                onSubmit={handleLoanSubmit}
              />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {!showKYCForm && !showLoanForm && (
        <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or ask any question..."
                className="flex-1 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-blue-500 hover:bg-blue-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              Your data is secure and encrypted. Ask me anything about loans - I'm powered by AI!
            </p>
          </div>
        </div>
      )}

      <AIHelpButton onAskQuestion={handleAIHelp} />
    </div>
  )
}
