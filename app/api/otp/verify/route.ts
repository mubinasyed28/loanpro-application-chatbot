import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { mobile, otp } = await request.json()

    if (!mobile || !otp) {
      return NextResponse.json({ error: "Mobile number and OTP are required" }, { status: 400 })
    }

    // Mock OTP verification - in production, verify against stored OTP
    const isValid = otp.length === 6 && /^\d+$/.test(otp)

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: "OTP verified successfully",
      })
    } else {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 })
  }
}
