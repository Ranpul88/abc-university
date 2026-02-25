'use client'

import Loader from '@/app/components/loader';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (error === 'login_required') {
      toast.error("You must be logged in to access that page.")
    }
  }, [error])

  async function login() {
    setIsLoading(true)
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      if (!res.ok) {
        toast.error("Login failed! Please check your credentials and try again.")
        setIsLoading(false)
        return
      }

      const data = await res.json()

      if (data.role == "admin") {
        router.push('/admin')
        toast.success("Login successful!.")
      } else {
        router.push('/')
        toast.success("Login successful!.")
      }

      setIsLoading(false)

    } catch (error) {
      console.log("Error during login: ")
      console.log(error)
      toast.error("Login failed! Please check your credentials and try again.")
      setIsLoading(false)
    }
  }

  async function googleLogin() {
    setIsLoading(true)
    signIn('google', { callbackUrl: 'http://localhost:3000' })
  }

  return (
    <div className="w-full h-full bg-primary text-secondary flex items-center justify-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-accent/10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-accent/5 rounded-full blur-3xl"></div>

      {isLoading ? <Loader /> : (
        <div className="relative w-full max-w-md px-6 py-8">
          <div className="bg-white rounded-3xl p-12 md:p-8 shadow-2xl border border-secondary/10">

            {/* Header */}
            <div className="text-center space-y-3 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-secondary">
                Welcome Back
              </h1>
              <p className="text-secondary/60 text-sm md:text-base leading-relaxed">
                Log in to your account to continue.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-secondary">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && login()}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40">
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-secondary">
                    Password
                  </label>
                  <Link
                    href="/auth/reset-password"
                    className="text-xs text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && login()}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40">
                  </div>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={login}
              disabled={isLoading}
              className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 flex items-center justify-center gap-2 group mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>Log In</span>
              <FaArrowRightLong className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-secondary/40">or continue with</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              onClick={googleLogin}
              disabled={isLoading}
              className="w-full py-3.5 my-6 bg-white hover:bg-primary border border-secondary/20 hover:border-accent/30 text-secondary font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-accent" />
              <span>Continue with Google</span>
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-secondary/60">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Register
              </Link>
            </p>
          </div>

          {/* Bottom note */}
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