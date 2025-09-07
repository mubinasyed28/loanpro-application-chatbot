"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Camera, FileText, CheckCircle, Loader2 } from "lucide-react"
import { SignatureCanvas } from "@/components/signature-canvas"

interface KYCFormProps {
  onSubmit: (data: any) => void
  onNext: () => void
  currentField: string
}

export function KYCForm({ onSubmit, onNext, currentField }: KYCFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    mobile: "",
    permanentAddress: "",
    currentAddressSame: false,
    currentAddress: "",
    existingAccount: "",
    accountNumber: "",
    aadhaarNumber: "",
    panNumber: "",
    photo: null as File | null,
    signature: "",
  })

  const [validationState, setValidationState] = useState({
    mobileVerified: false,
    aadhaarVerified: false,
    panVerified: false,
    photoVerified: false,
    isValidating: false,
  })
  const [otp, setOtp] = useState("")
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [sentOtp, setSentOtp] = useState("")

  const validateAadhaar = (aadhaarNumber: string) => {
    const cleaned = aadhaarNumber.replace(/\s/g, "")
    return /^\d{12}$/.test(cleaned)
  }

  const validateMobile = (mobile: string) => {
    return /^[6-9]\d{9}$/.test(mobile)
  }

  const validatePAN = (pan: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase())
  }

  const validateAge = (dateOfBirth: string) => {
    const birthYear = new Date(dateOfBirth).getFullYear()
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear
    return age >= 18 && age <= 80
  }

  const verifyAadhaar = async (aadhaarNumber: string) => {
    setValidationState((prev) => ({ ...prev, isValidating: true }))

    const dummyAadhaarCards = ["123456789012", "234567890123", "345678901234", "456789012345", "567890123456"]

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const cleaned = aadhaarNumber.replace(/\s/g, "")
    const isValid = dummyAadhaarCards.includes(cleaned) || Math.random() > 0.3

    setValidationState((prev) => ({
      ...prev,
      aadhaarVerified: isValid,
      isValidating: false,
    }))

    return isValid
  }

  const sendOtp = async (mobile: string) => {
    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      })
      const data = await response.json()
      if (data.success) {
        setSentOtp(data.mockOtp)
        setShowOtpInput(true)
      }
    } catch (error) {
      console.error("Failed to send OTP:", error)
    }
  }

  const verifyOtp = async (mobile: string, otpCode: string) => {
    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp: otpCode }),
      })
      const data = await response.json()
      if (data.success || otpCode === sentOtp) {
        setValidationState((prev) => ({ ...prev, mobileVerified: true }))
        setShowOtpInput(false)
        return true
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error)
    }
    return false
  }

  const validateImage = async (file: File) => {
    setValidationState((prev) => ({ ...prev, isValidating: true }))

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const isValid = file.size > 10000 && file.size < 5000000 && Math.random() > 0.2

    setValidationState((prev) => ({
      ...prev,
      photoVerified: isValid,
      isValidating: false,
    }))

    return isValid
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }))
      await validateImage(file)
    }
  }

  const handleSignature = (signature: string) => {
    setFormData((prev) => ({ ...prev, signature }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
  }

  const renderField = () => {
    switch (currentField) {
      case "fullName":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name (as per official documents)</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full"
                />
              </div>
              <Button onClick={onNext} className="w-full" disabled={!formData.fullName.trim()}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "dateOfBirth":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Date of Birth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  min="1944-01-01"
                  max="2007-12-31"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="w-full"
                />
                {formData.dateOfBirth && !validateAge(formData.dateOfBirth) && (
                  <p className="text-xs text-destructive">You must be between 18 and 80 years old to apply</p>
                )}
              </div>
              <Button
                onClick={onNext}
                className="w-full"
                disabled={!formData.dateOfBirth || !validateAge(formData.dateOfBirth)}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "gender":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Gender</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                  <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                </div>
              </RadioGroup>
              <Button onClick={onNext} className="w-full" disabled={!formData.gender}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "mobile":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Mobile Number Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full"
                />
                {formData.mobile && !validateMobile(formData.mobile) && (
                  <p className="text-xs text-destructive">
                    Please enter a valid 10-digit mobile number starting with 6-9
                  </p>
                )}
              </div>
              {validateMobile(formData.mobile) && !validationState.mobileVerified && (
                <div className="space-y-3">
                  {!showOtpInput ? (
                    <Button onClick={() => sendOtp(formData.mobile)} variant="outline" className="w-full">
                      Send OTP for Verification
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                      />
                      <p className="text-xs text-muted-foreground">Mock OTP: {sentOtp}</p>
                      <Button
                        onClick={() => verifyOtp(formData.mobile, otp)}
                        className="w-full"
                        disabled={otp.length !== 6}
                      >
                        Verify OTP
                      </Button>
                    </div>
                  )}
                </div>
              )}
              {validationState.mobileVerified && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <CheckCircle className="h-4 w-4" />
                  Mobile number verified successfully
                </div>
              )}
              <Button onClick={onNext} className="w-full" disabled={!validationState.mobileVerified}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "permanentAddress":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Permanent Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="permanentAddress">Permanent Address</Label>
                <Textarea
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={(e) => handleInputChange("permanentAddress", e.target.value)}
                  placeholder="Enter your permanent address"
                  className="w-full min-h-[100px]"
                />
              </div>
              <Button onClick={onNext} className="w-full" disabled={!formData.permanentAddress.trim()}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "currentAddress":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Current Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sameAddress"
                  checked={formData.currentAddressSame}
                  onCheckedChange={(checked) => {
                    handleInputChange("currentAddressSame", checked)
                    if (checked) {
                      handleInputChange("currentAddress", formData.permanentAddress)
                    }
                  }}
                />
                <Label htmlFor="sameAddress">Same as permanent address</Label>
              </div>
              {!formData.currentAddressSame && (
                <div className="space-y-2">
                  <Label htmlFor="currentAddress">Current Address</Label>
                  <Textarea
                    id="currentAddress"
                    value={formData.currentAddress}
                    onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                    placeholder="Enter your current address"
                    className="w-full min-h-[100px]"
                  />
                </div>
              )}
              <Button
                onClick={onNext}
                className="w-full"
                disabled={!formData.currentAddressSame && !formData.currentAddress.trim()}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "existingAccount":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Existing Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Do you have an existing account with us?</Label>
                <RadioGroup
                  value={formData.existingAccount}
                  onValueChange={(value) => handleInputChange("existingAccount", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="existingYes" />
                    <Label htmlFor="existingYes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="existingNo" />
                    <Label htmlFor="existingNo">No</Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.existingAccount === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    placeholder="Enter your account number"
                    className="w-full"
                  />
                </div>
              )}
              <Button
                onClick={onNext}
                className="w-full"
                disabled={
                  !formData.existingAccount || (formData.existingAccount === "yes" && !formData.accountNumber.trim())
                }
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "aadhaarNumber":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Aadhaar Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aadhaarNumber">12-digit Aadhaar Number</Label>
                <Input
                  id="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1 ")
                    handleInputChange("aadhaarNumber", value)
                  }}
                  placeholder="XXXX XXXX XXXX"
                  className="w-full"
                />
                {formData.aadhaarNumber && !validateAadhaar(formData.aadhaarNumber) && (
                  <p className="text-xs text-destructive">Please enter a valid 12-digit Aadhaar number</p>
                )}
              </div>
              {validateAadhaar(formData.aadhaarNumber) && !validationState.aadhaarVerified && (
                <div className="space-y-3">
                  <Button
                    onClick={() => verifyAadhaar(formData.aadhaarNumber)}
                    variant="outline"
                    className="w-full"
                    disabled={validationState.isValidating}
                  >
                    {validationState.isValidating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying Aadhaar...
                      </>
                    ) : (
                      "Verify Aadhaar Card"
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Demo Aadhaar numbers: 123456789012, 234567890123, 345678901234
                  </p>
                </div>
              )}
              {validationState.aadhaarVerified && (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <CheckCircle className="h-4 w-4" />
                  Aadhaar verified successfully
                </div>
              )}
              <Button
                onClick={onNext}
                className="w-full"
                disabled={!validateAadhaar(formData.aadhaarNumber) || !validationState.aadhaarVerified}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "panNumber":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>PAN Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="panNumber">10-character PAN Number</Label>
                <Input
                  id="panNumber"
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange("panNumber", e.target.value.toUpperCase())}
                  placeholder="ABCDE1234F"
                  className="w-full"
                />
                {formData.panNumber && !validatePAN(formData.panNumber) && (
                  <p className="text-xs text-destructive">Please enter a valid PAN number (e.g., ABCDE1234F)</p>
                )}
              </div>
              <Button onClick={onNext} className="w-full" disabled={!validatePAN(formData.panNumber)}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "photo":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Live Photo Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a clear photo of yourself for verification
                  </p>
                  <Input type="file" accept="image/*" onChange={handleFileUpload} className="w-full" />
                </div>
                {validationState.isValidating && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing image quality and detecting face...
                  </div>
                )}
                {formData.photo && validationState.photoVerified && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <CheckCircle className="h-4 w-4" />
                    Photo verified: {formData.photo.name}
                  </div>
                )}
                {formData.photo && !validationState.photoVerified && !validationState.isValidating && (
                  <div className="text-sm text-destructive">
                    Photo validation failed. Please upload a clear image with visible face.
                  </div>
                )}
              </div>
              <Button onClick={onNext} className="w-full" disabled={!validationState.photoVerified}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "signature":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Digital Signature</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Please sign in the box below</Label>
                <SignatureCanvas onSignature={handleSignature} />
              </div>
              <Button onClick={onNext} className="w-full" disabled={!formData.signature}>
                Continue
              </Button>
            </CardContent>
          </Card>
        )

      case "complete":
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <CheckCircle className="h-6 w-6" />
                KYC Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <div className="rounded-full bg-primary/10 p-4 w-fit mx-auto">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">KYC Verification Complete!</h3>
                  <p className="text-muted-foreground text-sm">
                    Your identity has been verified successfully. You can now proceed with your loan application.
                  </p>
                </div>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                Proceed to Loan Application
              </Button>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return <div className="flex justify-center p-4">{renderField()}</div>
}
