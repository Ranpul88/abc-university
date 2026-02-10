import { connectDB } from "@/lib/mongoDB"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


const authOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account }){

      if(account.provider === "google"){
        await connectDB()

        const { name, email } = user
        const nameParts = name.split(" ")
        const firstName = nameParts[0]
        const lastName = nameParts.slice(1).join(" ")

        try{
          const res = await fetch("http://localhost:3000/api/register",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email })
          })

          if(!res.ok){
            console.log("Error registering user")
          }
          return user
        }catch{
          console.log("Error registering user")
        }
      }
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }