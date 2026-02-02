import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req){
    try {
        const { name, email, phone, subject, message} = await req.json()

        const msg = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_FROM,
            subject: subject,
            text: `Email from: ${name} (${email}) \nPhone: ${phone} \n\n${message}`,
            replyTo: email
        }

        await sgMail.send(msg)
        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })

    }catch(error){
        return NextResponse.json(
            { message: "Error sending email",error: error.message },
            { status: 500 })
    }
}