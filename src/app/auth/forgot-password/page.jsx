'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaRegEnvelope } from 'react-icons/fa'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Loader from '@/app/components/loader';

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  async function sendOTP(){
    setIsLoading(true)

    if(email.trim() === ""){
      toast.error("Please Enter your email!")
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/send-otp", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })

      if(!res.ok){
        toast.error("Error sending OTP. Please try again.");
        setIsLoading(false)
        return
      }

      setEmail("")
      setIsLoading(false)
      toast.success("OTP has been sent successfully.")
      router.push('/auth/reset-password')
    }catch(error){
      toast.error("An error occurred while sending OTP. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-full bg-primary text-secondary flex items-center justify-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-accent/10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent/5 rounded-full blur-3xl"></div>

      {/* Main Content */}
      {isLoading ? <Loader /> : <div className="relative w-full max-w-md px-6 py-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-secondary/10">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">
              Forgot Password?
            </h1>
            
            <p className="text-secondary/60 text-sm md:text-base leading-relaxed">
              No worries! Enter your email address and we'll send you a OTP to reset your password.
            </p>
          </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-secondary"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/50">
                  <FaRegEnvelope />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={sendOTP}
              disabled={isLoading}
              className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group my-6"
            >
              <span>Send OTP</span>
              <FaArrowRightLong className='group-hover:translate-x-1 transition-transform' />
            </button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-secondary/60">or</span>
            </div>
          </div>

          {/* Back to Login Link */}
          <div className="text-center space-y-4">
            <Link 
              href="/auth/login"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors group"
            >
              <FaArrowLeftLong className='group-hover:-translate-x-1 transition-transform' />
              <span>Back to Login</span>
            </Link>

            {/* Additional Help */}
            <p className="text-sm text-secondary/60">
              Don't have an account?{' '}
              <Link 
                href="/auth/register" 
                className="text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-secondary/50">
            Need help? Contact{' '}
            <span
              className="text-accent font-medium transition-colors"
            >
              support@abcuniversity.edu
            </span>
          </p>
        </div>
      </div>}
    </div>
  )
}