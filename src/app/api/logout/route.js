import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        )
        response.cookies.set("token", "",{
            httpOnly: true,
            expires: new Date(0) 
        })

        return response

    }catch(error){
        return NextResponse.json(
            { message: "Error logging out", error: error.message },
            { status: 500 }
        )
    }
}