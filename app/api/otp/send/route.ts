import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { mobile } = await request.json()

    if (!mobile) {
      return NextResponse.json({ error: "Mobile number is required" }, { status: 400 })
    }

    // Mock OTP generation - in production, integrate with SMS service
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // In production, store OTP in database/cache with expiry
    console.log(`Mock OTP for ${mobile}: ${otp}`)

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
      // In production, don't return OTP in response
      mockOtp: otp,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
