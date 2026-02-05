import { NextResponse } from "next/server"

export async function GET(res){
    const token = req.cookies.get('token')?.value
    
    if(!token){
        return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        if(!user){
            return NextResponse.json({ authenticated: false }, { status: 200 })
        }

        return NextResponse.json({ authenticated: true }, { status: 200 })
    }catch(error){
        return NextResponse.json({ authenticated: false }, { status: 200 })
    }
}