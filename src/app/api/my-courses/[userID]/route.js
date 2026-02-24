import { connectDB } from "@/lib/mongoDB"
import Course from "@/models/Course"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function GET(req, context){
    connectDB()

    try {
        const { userID } = await context.params

        const user = await User.findOne({ userID: userID })
        if(!user){
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        const enrolledCourses = user.coursesEnrolled

        if(enrolledCourses.length === 0){
            return NextResponse.json({ message: "No courses enrolled" }, { status: 404 })
        }

        const courses = await Course.find({ courseName: { $in: enrolledCourses } })
        return NextResponse.json(courses, { status: 200 })
        
    }catch(error){
        return NextResponse.json(
            { message: "Error fetching courses", error: error.message },
            { status: 500 }
        )
    }
}