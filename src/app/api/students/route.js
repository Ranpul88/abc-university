import { connectDB } from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function PUT(req){
    connectDB()

    try {
        const data = await req.json()

        await User.updateOne({ email: data.email }, { $addToSet: {  coursesEnrolled: data.courseName } })
        return NextResponse.json(
            { message: "Student updated successfully" },
            { status: 200 }
        )
    }catch(error){
        return NextResponse.json({ message: "Error updating student", error: error.message }, { status: 500 })
    }
}