import Otp from "@/models/otp"
import User from "@/models/User"
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongoDB";
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req){
    await connectDB()
    
    try {
        const { email } = await req.json()

        const user = await User.findOne({ email: email })

        if(!user){
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }

        await Otp.deleteMany({ email: email })

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString()

        const otp = new Otp({
            email: email,
            otp: otpCode 
        })

        await otp.save()

        await resend.emails.send({
            from: "OTP <onboarding@resend.dev>",
            to: email,
            subject: "OTP",
            text: `Your OTP is: ${otpCode}. Please enter this code to reset your password.`,
        })
        return NextResponse.json({ message: "OTP sent successfully" }, { status: 200})

    }catch(error){
        return NextResponse.json({ message: "Error sending OTP", error: error.message }, { status: 500 })
    }
}