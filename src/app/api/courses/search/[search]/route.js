import Course from "@/models/Course";
import { connectDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function GET(req, context){
    connectDB()

    try {
        const { search } = await context.params

        const courses = await Course.find({
            $or: [
                { courseName: { $regex: search, $options: "i" } },
                { department: { $regex: search, $options: "i" } }
            ]
        })
        return NextResponse.json(courses, { status: 200 })
    }catch(error){
        return NextResponse.json(
            { message: "Error searching courses", error: error.message },
            { status: 500 }
        )
    }
}