"use client"

import { Card } from "@/components/ui/card"
import { Bot } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="rounded-full bg-primary p-2 h-fit">
        <Bot className="h-4 w-4 text-primary-foreground" />
      </div>

      <Card className="p-4 bg-card text-card-foreground">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
          </div>
          <span className="text-sm text-muted-foreground ml-2">Assistant is typing...</span>
        </div>
      </Card>
    </div>
  )
}
