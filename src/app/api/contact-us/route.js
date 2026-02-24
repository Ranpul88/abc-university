import { Resend } from "resend"
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req){
    try {
        const { name, email, phone, subject, message} = await req.json()

        await resend.emails.send({
            from: "contact-us <onboarding@resend.dev>",
            to: process.env.EMAIL,
            subject: subject,
            text: `Email from: ${name} (${email}) \nPhone: ${phone} \n\n${message}`,
            replyTo: email
        })
        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })

    }catch(error){
        return NextResponse.json(
            { message: "Error sending email",error: error.message },
            { status: 500 })
    }
}