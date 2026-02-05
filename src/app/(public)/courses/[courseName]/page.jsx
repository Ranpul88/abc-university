'use client'

import Loader from "@/app/components/loader"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function CourseOverview() {
  const router = useRouter()
  const params = useParams()
  const courseName = params.courseName
  
  
  const [course, setCourse] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(true)
  const [openMessage, setOpenMessage] = useState(false)

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/admin/courses/${courseName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      setCourse(data)
      setIsLoading(false)
    })
  }, [activeTab])

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'syllabus', label: 'Syllabus' }
  ] 

  return (
    <>
      { isLoading ? <Loader /> :
        <div className="w-full min-h-screen bg-primary text-secondary">
          {/* Hero Section */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-accent/10"></div>
            <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-40 h-40 sm:w-72 sm:h-72 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-52 h-52 sm:w-96 sm:h-96 bg-accent/5 rounded-full blur-3xl"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-accent">
                  {course.courseName}
                </h1>
              </div>
            </div>
          </section>

          {/* Quick Info Cards */}
          <section className="relative -mt-8 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:flex lg:justify-between">
                <div className="bg-white w-100 rounded-2xl p-4 sm:p-6 shadow-lg border border-secondary/10 hover:shadow-xl hover:border-accent/30 transition-all duration-300">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/30 rounded-lg"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-1 text-sm sm:text-base">Mode</h3>
                      <p className="text-xs sm:text-sm text-secondary/60">{course.mode.join('/')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white w-100 rounded-2xl p-4 sm:p-6 shadow-lg border border-secondary/10 hover:shadow-xl hover:border-accent/30 transition-all duration-300">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/30 rounded-lg"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-1 text-sm sm:text-base">Delivery</h3>
                      <p className="text-xs sm:text-sm text-secondary/60">{course.delivery.join('/')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white w-100 rounded-2xl p-4 sm:p-6 shadow-lg border border-secondary/10 hover:shadow-xl hover:border-accent/30 transition-all duration-300">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/30 rounded-lg"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary mb-1 text-sm sm:text-base">Duration</h3>
                      <p className="text-xs sm:text-sm text-secondary/60">{course.duration}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs Navigation */}
          <section className="bg-primary/95 backdrop-blur-sm border-y border-secondary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3 sm:py-4">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-accent text-white shadow-lg shadow-accent/20'
                        : 'bg-white text-secondary/60 hover:text-secondary hover:bg-secondary/5 border border-secondary/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Content Sections */}
          <section className="w-full py-8 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8 sm:space-y-12">
                  <div className="w-full bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-secondary/10">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-secondary">Course Description</h2>
                    <p className="text-secondary/70 text-sm sm:text-base md:text-lg leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  

                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-secondary/10">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-secondary">Prerequisites</h3>
                      <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full"></div>
                            </div>
                            <p className="text-secondary/70 text-sm sm:text-base">{course.entryRequirements}</p>
                          </div>
                      </div>
                    </div>

                    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-secondary/10">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-secondary">Learning Outcomes</h3>
                      <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full"></div>
                            </div>
                            <p className="text-secondary/70 text-sm sm:text-base">outcome</p>
                          </div>
                      </div>
                    </div>

                    <div className="w-full bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-secondary/10">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-secondary">Intakes</h3>
                      <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/10 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full"></div>
                            </div>
                            <p className="text-secondary/70 text-sm sm:text-base">{course.intakes.join('/')}</p>
                          </div>
                      </div>
                    </div>

                  </div>

                  
                </div>
              )}

              {/* Syllabus Tab */}
              {activeTab === 'syllabus' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-secondary/10">
                    <h2 className="mb-4 sm:mb-6 md:mb-8 text-secondary text-xl sm:text-2xl md:text-3xl font-bold">Course Syllabus</h2>
                    <div className="space-y-4 flex justify-center">
                        <img src={course.courseContent} className="w-full max-w-3xl rounded-2xl" alt="course-content" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-accent/10 to-transparent"></div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl border border-secondary/10">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 text-secondary">
                  Ready to Excel?
                </h2>
                <p className="text-secondary/60 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto">
                  Join this course and take the next step in your academic journey. 
                  Gain valuable knowledge and skills that will shape your future.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button onClick={()=>{setOpenMessage(true)}} className="px-6 sm:px-8 py-2.5 sm:py-3 bg-accent text-white rounded-full font-medium hover:bg-accent/90 shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
      {
        openMessage && <div className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center z-50">
          <div className="w-130 h-70 relative bg-primary rounded-2xl pt-12">
            <button onClick={()=>{setOpenMessage(false)}} className="text-[18px] absolute text-white h-7 w-7 bg-red-600 rounded-full flex items-center justify-center pb-1 -top-6 -right-6.5 cursor-pointer hover:bg-red-700">x</button>
            <p className="text-secondary text-center text-lg font-semibold p-4 ">Do you want to enroll in this course?</p>
            <div className="w-full p-10 flex items-center justify-center gap-6">
              <button onClick={()=>{setOpenMessage(false)}} className="w-20 h-8 text-primary bg-red-600 cursor-pointer hover:bg-red-500">Cancel</button>
              <button onClick={()=>{
                checkAuth()
              }} className="w-20 h-8 text-primary bg-accent cursor-pointer hover:bg-accent/90">Enroll</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}