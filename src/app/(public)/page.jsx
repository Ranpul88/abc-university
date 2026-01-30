'use client'

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if(error === 'unauthorized'){
      toast.error("You are not authorized to access that page.")
    }
  }, [error])

  return (
    <div className="w-full min-h-screen bg-primary text-secondary">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-accent/10"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-accent">Welcome to ABC University </span>
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight">
              Empowering Education,
              <span className="h-22 block text-transparent bg-clip-text bg-linear-to-r from-accent to-accent/60 mt-2">
                Shaping Futures
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/70 leading-relaxed">
              Your comprehensive student management system designed to streamline academic excellence 
              and enhance the learning experience at ABC University.
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-16 border-y border-secondary/10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">15K+</div>
              <div className="text-sm md:text-base text-secondary/60">Active Students</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">500+</div>
              <div className="text-sm md:text-base text-secondary/60">Faculty Members</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">50+</div>
              <div className="text-sm md:text-base text-secondary/60">Programs</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">98%</div>
              <div className="text-sm md:text-base text-secondary/60">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Everything You Need</h2>
            <p className="text-secondary/60 text-lg max-w-2xl mx-auto">
              A complete suite of tools designed to enhance your academic journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Course Management</h3>
              <p className="text-secondary/60 leading-relaxed">
                Seamlessly manage your courses, view schedules, and track academic progress all in one place.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Communication Hub</h3>
              <p className="text-secondary/60 leading-relaxed">
                Stay connected with faculty and peers through integrated messaging and announcements.
              </p>
            </div>

            <div className="group p-8 bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-accent/20 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Event Calendar</h3>
              <p className="text-secondary/60 leading-relaxed">
                Never miss important dates with an integrated calendar for exams, deadlines, and events.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-accent/10 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="h-90 bg-white rounded-3xl p-12 md:p-16 shadow-2xl border border-secondary/10 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-secondary/60 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students already using ABC University's student management system 
              to achieve their academic goals.
            </p>
          </div>
        </div>
      </section>

      {/* <footer className="border-t border-secondary/10 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">ABC University</h3>
              <p className="text-secondary/60">Empowering minds, shaping futures.</p>
            </div>
            <div className="text-center md:text-right text-secondary/60">
              <p>&copy; 2026 ABC University. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
