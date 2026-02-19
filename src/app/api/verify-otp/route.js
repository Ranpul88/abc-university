import { connectDB } from "@/lib/mongoDB"
import Otp from "@/models/otp"
import { NextResponse } from "next/server"

export async function POST(req) {
    connectDB()
    
    try {
        const data = await req.json()
        
        const verified = await Otp.findOne({ email: data.email, otp: data.otp }) 
        
        if(!verified) {
            return NextResponse.json({ message: "Incorrect OTP" }, { status: 400 })
        }

        await Otp.deleteMany({ email: data.email })

        return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 })

    }catch(error){
        return NextResponse.json(
            { message: "Error verifying OTP", error: error.message },
            { status: 500 }
        )
    }
}