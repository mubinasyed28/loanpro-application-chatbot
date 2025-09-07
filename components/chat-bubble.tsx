"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bot, User, Sparkles } from "lucide-react"
import type { ChatMessage } from "@/lib/loan-types"

interface ChatBubbleProps {
  message: ChatMessage
  onOptionClick: (option: string) => void
}

export function ChatBubble({ message, onOptionClick }: ChatBubbleProps) {
  const isBot = message.type === "bot"
  const isAIResponse =
    isBot &&
    (message.content.includes("CIBIL") ||
      message.content.includes("EMI") ||
      message.content.includes("eligibility") ||
      message.content.includes("documents") ||
      message.content.includes("interest rate"))

  return (
    <div className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <div
          className={`rounded-full p-2 h-fit ${isAIResponse ? "bg-gradient-to-r from-primary to-accent" : "bg-primary"}`}
        >
          {isAIResponse ? (
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          ) : (
            <Bot className="h-4 w-4 text-primary-foreground" />
          )}
        </div>
      )}

      <div className={`max-w-[80%] space-y-2 ${!isBot ? "order-first" : ""}`}>
        <Card
          className={`p-4 ${
            isBot
              ? isAIResponse
                ? "bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 text-card-foreground"
                : "bg-card text-card-foreground"
              : "bg-primary text-primary-foreground ml-auto"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
          {isAIResponse && (
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-primary/10">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-xs text-primary font-medium">AI-powered answer</span>
            </div>
          )}
        </Card>

        {message.options && message.options.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => onOptionClick(option)}
                className="text-xs bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {!isBot && (
        <div className="rounded-full bg-accent p-2 h-fit">
          <User className="h-4 w-4 text-accent-foreground" />
        </div>
      )}
    </div>
  )
}
