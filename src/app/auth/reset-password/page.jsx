'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { FaRegEnvelope } from 'react-icons/fa'
import { FaArrowLeftLong, FaArrowRightLong, FaLock } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/loader';

export default function ForgotPassword() {
  // Step 1 state
  const [email, setEmail] = useState('')

  // Step 2 state
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

  // Step 3 state
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => inputRefs.current[0]?.focus(), 100)
    }
  }, [step])

  // ── Step 1: Send OTP ──────────────────────────────────────────
  async function sendOTP() {
    if (email.trim() === '') {
      toast.error("Please enter your email!")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/send-otp", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!res.ok) {
        toast.error("Error sending OTP. Please try again.")
        setIsLoading(false)
        return
      }

      toast.success("OTP has been sent successfully.")
      setIsLoading(false)
      setStep(2)

    }catch(error){
      toast.error("An error occurred while sending OTP. Please try again.")
      setIsLoading(false)
    }
  }

  // ── Step 2: OTP Handlers ──────────────────────────────────────
  function handleOtpChange(index, value) {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handleOtpPaste(e) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newOtp = [...otp]
    pasted.split('').forEach((char, i) => { newOtp[i] = char })
    setOtp(newOtp)
    const nextEmpty = pasted.length < 6 ? pasted.length : 5
    inputRefs.current[nextEmpty]?.focus()
  }

  async function verifyOTP() {
    const otpValue = otp.join('')
    if (otpValue.length < 6) {
      toast.error("Please enter the complete 6-digit OTP!")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/verify-otp", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpValue, email })
      })

      if (!res.ok) {
        toast.error("Invalid OTP. Please try again.")
        setIsLoading(false)
        return
      }

      toast.success("OTP verified successfully!")
      setIsLoading(false)
      setStep(3)
      
    }catch(error){
      toast.error("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  async function resendOTP() {
    setIsLoading(true)
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/send-otp", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (!res.ok) {
        toast.error("Error resending OTP. Please try again.")
        setIsLoading(false)
        return
      }
      setOtp(['', '', '', '', '', ''])
      toast.success("OTP resent successfully.")
      setIsLoading(false)
    } catch (error) {
      toast.error("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  // ── Step 3: Reset Password ────────────────────────────────────
  async function resetPassword(){
    if(password.trim() === ''){
      toast.error("Please enter a new password!")
      return
    }
    if(password.length < 8){
      toast.error("Password must be at least 8 characters!")
      return
    }
    if(password !== confirmPassword){
      toast.error("Passwords do not match!")
      return
    }

    setIsLoading(true)
    try{
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/reset-password", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if(!res.ok){
        toast.error("Error resetting password. Please try again.")
        setIsLoading(false)
        return
      }

      toast.success("Password reset successfully!")
      setIsLoading(false)
      router.push('/auth/login')

    }catch(error){
      toast.error("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const otpComplete = otp.every(d => d !== '')

  const steps = [
    { label: 'Email' },
    { label: 'Verify' },
    { label: 'Reset' },
  ]

  return (
    <div className="w-full h-full bg-primary text-secondary flex items-center justify-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-accent/10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent/5 rounded-full blur-3xl"></div>

      {isLoading ? <Loader /> : (
        <div className="relative w-full max-w-md px-6 py-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-secondary/10">

            {/* Step Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              {steps.map((s, i) => {
                const stepNum = i + 1
                const isCompleted = step > stepNum
                const isActive = step === stepNum
                return (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold transition-all duration-300
                        ${isCompleted ? 'bg-accent text-white' :
                          isActive ? 'bg-accent text-white ring-4 ring-accent/20' :
                          'bg-secondary/10 text-secondary/40'}`}
                      >
                        {isCompleted ? '✓' : stepNum}
                      </div>
                      <span className={`text-xs font-medium transition-colors duration-300
                        ${isActive ? 'text-accent' : isCompleted ? 'text-accent/70' : 'text-secondary/30'}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`h-0.5 w-14 mx-1 mb-4 rounded-full transition-all duration-500
                        ${step > stepNum ? 'bg-accent' : 'bg-secondary/10'}`}>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* ── STEP 1: Enter Email ── */}
            {step === 1 && (
              <>
                <div className="text-center space-y-4 mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                    Forgot Password?
                  </h1>
                  <p className="text-secondary/60 text-sm md:text-base leading-relaxed">
                    No worries! Enter your email address and we'll send you an OTP to reset your password.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-secondary">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && sendOTP()}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/50">
                      <FaRegEnvelope />
                    </div>
                  </div>
                </div>

                <button
                  onClick={sendOTP}
                  className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 flex items-center justify-center gap-2 group my-6"
                >
                  <span>Send OTP</span>
                  <FaArrowRightLong className='group-hover:translate-x-1 transition-transform' />
                </button>
              </>
            )}

            {/* ── STEP 2: Verify OTP ── */}
            {step === 2 && (
              <>
                <div className="text-center space-y-4 mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                    Verify OTP
                  </h1>
                  <p className="text-secondary/60 text-sm md:text-base leading-relaxed">
                    We've sent a 6-digit code to{' '}
                    <span className="font-medium text-accent">{email}</span>. Enter it below.
                  </p>
                </div>

                <div className="flex justify-center gap-2 md:gap-3 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(index, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      className={`w-11 h-13 md:w-13 md:h-15 text-center text-xl font-bold bg-primary border-2 rounded-xl focus:outline-none transition-all duration-200 text-secondary
                        ${digit ? 'border-accent bg-accent/5' : 'border-secondary/20'}
                        focus:border-accent focus:ring-2 focus:ring-accent/30`}
                    />
                  ))}
                </div>

                <button
                  onClick={verifyOTP}
                  disabled={!otpComplete}
                  className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  <span>Verify OTP</span>
                  <FaArrowRightLong className='group-hover:translate-x-1 transition-transform' />
                </button>

                <p className="text-center text-sm text-secondary/60 mt-6">
                  Didn't receive the code?{' '}
                  <button
                    onClick={resendOTP}
                    className="text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    Resend OTP
                  </button>
                </p>
              </>
            )}

            {/* ── STEP 3: New Password ── */}
            {step === 3 && (
              <>
                <div className="text-center space-y-4 mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                    New Password
                  </h1>
                  <p className="text-secondary/60 text-sm md:text-base leading-relaxed">
                    Almost there! Set a strong new password for your account.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-secondary">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full px-4 py-3 pr-12 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-accent transition-colors"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {password && (
                      <div className="flex gap-1 mt-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            password.length >= (i + 1) * 2
                              ? password.length >= 12 ? 'bg-green-400'
                              : password.length >= 8 ? 'bg-accent'
                              : 'bg-orange-400'
                              : 'bg-secondary/10'
                          }`}></div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 pr-12 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-accent transition-colors"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {confirmPassword && (
                      <p className={`text-xs font-medium transition-colors ${password === confirmPassword ? 'text-green-500' : 'text-red-400'}`}>
                        {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={resetPassword}
                  className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 flex items-center justify-center gap-2 group mt-6"
                >
                  <FaLock className="text-sm" />
                  <span>Reset Password</span>
                  <FaArrowRightLong className='group-hover:translate-x-1 transition-transform' />
                </button>
              </>
            )}

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-secondary/60">or</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="text-center space-y-4">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group"
                >
                  <FaArrowLeftLong className='group-hover:-translate-x-1 transition-transform' />
                  <span>Go Back</span>
                </button>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group"
                  >
                    <FaArrowLeftLong className='group-hover:-translate-x-1 transition-transform' />
                    <span>Back to Login</span>
                  </Link>
                  <p className="text-sm text-secondary/60">
                    Don't have an account?{' '}
                    <Link href="/auth/register" className="text-accent hover:text-accent/80 font-medium transition-colors">
                      Sign up
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-secondary/50">
              Need help? Contact{' '}
              <span className="text-accent font-medium">
                support@abcuniversity.edu
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}