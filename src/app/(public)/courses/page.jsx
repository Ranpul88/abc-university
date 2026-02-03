'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Courses() {
    
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [courses, setCourses] = useState([]);
 
    useEffect(() => {
        if(selectedCategory === 'all') {
            fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/courses',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {return res.json()})
            .then(data => {
                setCourses(data)
            })
            .catch(err => {
                console.log(err)
                toast.error("Error fetching courses, Please try again.")
            })
        }else{
            console.log(selectedCategory)
            fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/courses/' + selectedCategory, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {return res.json()})
            .then(data => {
                setCourses(data)
            })
            .catch(err => {
                console.log(err)
                toast.error("Error fetching courses, Please try again.")
            })
        }
    },[selectedCategory])

    return (
        <div className="w-full bg-primary text-secondary">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-accent/5 via-transparent to-accent/10"></div>
                <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
                
                <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
                    <div className="text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-accent">Explore Our Curriculum</span>
                        </div>
                        
                        <h1 className="text-5xl font-bold tracking-tight text-accent">
                            Our Courses
                            <span className="block text-secondary mt-2">
                                Learn From The Best
                            </span>
                        </h1>
                        
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/70 leading-relaxed">
                            Discover a wide range of courses designed to help you achieve your academic 
                            and professional goals. From beginner to advanced levels, we have something for everyone.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-12 relative bg-white/50 backdrop-blur-sm border-y border-secondary/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col gap-6">
                        {/* Search Bar */}
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-3 bg-white border border-secondary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setSelectedCategory("all")}
                                    className={`px-6 py-2.5 rounded-xl font-medium cursor-pointer transition-all duration-300 ${
                                        selectedCategory === "all"
                                            ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                            : 'bg-white text-secondary/70 border border-secondary/20 hover:border-accent/30'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setSelectedCategory("Computing")}
                                    className={`px-6 py-2.5 rounded-xl font-medium cursor-pointer transition-all duration-300 ${
                                        selectedCategory === "Computing"
                                            ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                            : 'bg-white text-secondary/70 border border-secondary/20 hover:border-accent/30'
                                    }`}
                                >
                                    Computing
                                </button>
                                <button
                                    onClick={() => setSelectedCategory("Business")}
                                    className={`px-6 py-2.5 rounded-xl font-medium cursor-pointer transition-all duration-300 ${
                                        selectedCategory === "Business"
                                            ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                            : 'bg-white text-secondary/70 border border-secondary/20 hover:border-accent/30'
                                    }`}
                                >
                                    Business Management
                                </button>
                                <button
                                    onClick={() => setSelectedCategory("Engineering")}
                                    className={`px-6 py-2.5 rounded-xl font-medium cursor-pointer transition-all duration-300 ${
                                        selectedCategory === "Engineering"
                                            ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                            : 'bg-white text-secondary/70 border border-secondary/20 hover:border-accent/30'
                                    }`}
                                >
                                    Engineering
                                </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-12 relative">
                <div className="max-w-7xl mx-auto px-6">
                    {courses.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-2xl font-semibold text-secondary mb-2">No courses found</h3>
                            <p className="text-secondary/60">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-10">
                                <p className="text-secondary/70">
                                    Showing <span className="font-semibold text-accent">{courses.length}</span> courses
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courses.map((course) => (
                                    <div
                                        key={course.courseName}
                                        className="group bg-white rounded-2xl border border-secondary/10 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Course Header */}
                                        <div className="p-6 bg-accent/5 border-b border-secondary/10">
                                            <h3 className="text-xl font-bold text-secondary group-hover:text-accent transition-colors">
                                                {course.courseName.replace(/-/g, ' ')}
                                            </h3>
                                        </div>

                                        {/* Course Body */}
                                        <div className="p-6 space-y-4">
                                            <div className="h-full flex flex-row border-secondary/10">
                                                <div className='w-1/2 h-full'>
                                                    <p className="text-xs text-secondary/50">Duration</p>
                                                    <p className="text-sm font-semibold text-secondary mb-3">{course.duration}</p>
                                                    <p className="text-xs text-secondary/50">Mode</p>
                                                    <p className="text-sm font-semibold text-secondary mb-3">{course.mode.join('/')}</p>
                                                    <p className="text-xs text-secondary/50">Delivery</p>
                                                    <p className="text-sm font-semibold text-secondary">{course.delivery.join('/')}</p>
                                                </div>
                                                <div className='w-1/2 flex items-start justify-center'>
                                                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                                                    <span className="text-sm text-accent">{course.type}</span>
                                                </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Course Footer */}
                                        <div className="p-6 pt-0">
                                            <button className="w-full bg-accent text-white font-semibold py-3 px-6 rounded-xl hover:bg-accent/80 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-accent/20 group-hover:scale-[1.02]">
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}