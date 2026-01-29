import { connectDB } from "@/lib/mongoDB"
import Course from "@/models/Course"
import { NextResponse } from "next/server"

export async function GET(req, context){
    await connectDB()
    
    try {
        const { courseName } = await context.params

        const course = await Course.findOne({ courseName: courseName })
        return NextResponse.json(course, { status: 200 })

    }catch(error){
        return NextResponse.json(
            { message: "Error fetching course", error: error.message },
            { status: 500 }
        )
    }
}

export async function PUT(req, context){
    await connectDB()

    try {
        const { courseName } = await context.params
        const data = await req.json()
        await Course.updateOne({ courseName: courseName }, { $set: data })
        return NextResponse.json( { message: "Course updated successfully" }, { status: 200 } )

    } catch (error) {
        return NextResponse.json(
            { message: "Error updating course", error: error.message },
            { status: 500 }
        )   
    }
}