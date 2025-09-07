import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }

    const apiKey = process.env.MISTRAL_API_KEY

    if (!apiKey) {
      // Fallback response when API key is not configured
      return NextResponse.json({
        answer:
          "I'm here to help with your loan application. For specific questions about CIBIL scores, interest rates, or loan terms, please contact our customer service team.",
      })
    }

    // Call Mistral AI API
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-tiny",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful banking assistant. Provide clear, concise answers about loans, banking terms, and financial concepts. Keep responses under 100 words.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      throw new Error("Mistral API request failed")
    }

    const data = await response.json()
    const answer = data.choices[0]?.message?.content || "Sorry, I could not process your question."

    return NextResponse.json({ answer })
  } catch (error) {
    console.error("AI API Error:", error)
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
