import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET(req){
    const token = req.cookies.get('token')?.value

    const session = await getServerSession(authOptions)
    
    try {
        if(session){
            return NextResponse.json({
                authenticated: true,
                user: {
                    userID: session.user.userID,
                    firstName: session.user.firstName,
                    lastName: session.user.lastName,
                    email: session.user.email,
                    role: session.user.role
                }
            }, { status: 200 } )
        }

        if(token){
            const user = jwt.verify(token, process.env.JWT_SECRET)
            
            if(!user){
                return NextResponse.json({ authenticated: false }, { status: 200 })
            }
            
            return NextResponse.json({ authenticated: true, user }, { status: 200 })
        }

    }catch(error){
        console.log("Error checking auth: ", error)
        return NextResponse.json({ authenticated: false }, { status: 200 })
    }
}