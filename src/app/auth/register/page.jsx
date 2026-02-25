'use client'

import Loader from '@/app/components/loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaArrowRightLong } from "react-icons/fa6";

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function register() {
    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      toast.error("Please fill in all required fields.")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        })
      })

      if (!res.ok) {
        toast.error("Registration failed! Please try again.")
        setIsLoading(false)
        return
      }

      router.push('/auth/login')
      setIsLoading(false)
      toast.success("register successful!.")

    } catch (error) {
      console.log("Error during register: ")
      console.log(error)
      toast.error("Registration failed! Please try again.")
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

      {isLoading ? <Loader /> : (
        <div className="relative w-full max-w-md px-4 py-8">
          <div className="bg-white rounded-3xl p-12 md:p-8 shadow-2xl border border-secondary/10">

            {/* Header */}
            <div className="text-center space-y-3 mb-4">
              <h1 className="text-4xl md:text-3xl font-bold text-secondary">
                Create Account
              </h1>
              <p className="text-secondary/60 text-sm md:text-base leading-relaxed">
                Join us today! Fill in the details below to get started.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">

              {/* First Name & Last Name — side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-secondary">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full px-4 py-2 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-secondary">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full px-4 py-2 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-secondary">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40">
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-secondary">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full px-4 py-2 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40">
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-secondary">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-2 bg-primary border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 text-secondary placeholder:text-secondary/40"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary/40">
                  </div>
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              onClick={register}
              disabled={isLoading}
              className="w-full py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 flex items-center justify-center gap-2 group mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>Create Account</span>
              <FaArrowRightLong className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-secondary/40">or</span>
              </div>
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-secondary/60">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-accent hover:text-accent/80 font-medium transition-colors"
              >
                Log in
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