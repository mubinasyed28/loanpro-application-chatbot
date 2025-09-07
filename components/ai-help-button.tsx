"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { HelpCircle, Send, X, Loader2 } from "lucide-react"

interface AIHelpButtonProps {
  onAskQuestion: (question: string) => void
}

export function AIHelpButton({ onAskQuestion }: AIHelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!question.trim()) return

    setIsLoading(true)
    await onAskQuestion(question)
    setQuestion("")
    setIsLoading(false)
    setIsOpen(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const commonQuestions = [
    "What is CIBIL score?",
    "How is EMI calculated?",
    "What documents do I need?",
    "What are the eligibility criteria?",
    "How long does approval take?",
    "What are the interest rates?",
  ]

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-20 right-4 z-50 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
      >
        <HelpCircle className="h-4 w-4 mr-2" />
        Ask AI
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-20 right-4 z-50 w-80 shadow-xl border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            AI Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Ask me anything about loans, banking terms, or our services:</p>
          <div className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button onClick={handleSubmit} size="sm" disabled={!question.trim() || isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Common Questions:</p>
          <div className="grid grid-cols-1 gap-1">
            {commonQuestions.map((q, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setQuestion(q)
                  handleSubmit()
                }}
                className="justify-start text-xs h-8 px-2 bg-transparent hover:bg-muted"
                disabled={isLoading}
              >
                {q}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
