import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json()

    // Generate reference ID
    const refId = `LN${Date.now()}${Math.floor(Math.random() * 1000)}`

    // In production, store in database
    const application = {
      referenceId: refId,
      ...applicationData,
      status: "submitted",
      createdAt: new Date().toISOString(),
    }

    console.log("Loan Application Submitted:", application)

    return NextResponse.json({
      success: true,
      referenceId: refId,
      message: "Application submitted successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
