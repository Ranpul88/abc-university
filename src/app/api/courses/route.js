import { connectDB } from "@/lib/mongoDB"
import Course from "@/models/Course"
import { NextResponse } from "next/server"

export async function GET(req){
    await connectDB()

    try {
        const courses = await Course.find({ availability: true })
        return NextResponse.json(courses, { status: 200 })
    }catch(error){
        return NextResponse.json(
            { message: "Error fetching courses", error: error.message },
            { status: 500 }
        )
    }
}