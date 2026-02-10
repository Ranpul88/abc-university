import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export async function GET(req){
    const token = req.cookies.get('token')?.value
    
    try {
        if(token==null){
            return NextResponse.json({ authenticated: false }, { status: 200 })
        }

        const user = jwt.verify(token, process.env.JWT_SECRET)
        const userID = user.userID

        if(!user){
            return NextResponse.json({ authenticated: false }, { status: 200 })
        }

        return NextResponse.json({ authenticated: true, userID }, { status: 200 })
    }catch(error){
        return NextResponse.json({ authenticated: false }, { status: 200 })
    }
}