import { connectDB } from "@/lib/mongoDB"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import User from "@/models/User"

export async function POST(req) {
    connectDB()
    
    try{
        const data = await req.json()

        const hashedPassword = await bcrypt.hash(data.password, 10)

        await User.updateOne({ email: data.email }, { $set: { password: hashedPassword } })
        return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 })

    }catch(error){
        return NextResponse.json(
            { message: "Error verifying OTP", error: error.message },
            { status: 500 }
        )
    }
}