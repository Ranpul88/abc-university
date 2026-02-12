import { connectDB } from "@/lib/mongoDB"
import User from "@/models/User"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account }){
      
      if(account?.provider === "google"){
        try{
          await connectDB()

          const existingUser = await User.findOne({ email: user.email })

          if(!existingUser){
            
            const nameParts = user.name?.split(" ") || []
            const firstName = nameParts[0] || ""
            const lastName = nameParts.slice(1).join(" ") || ""

            let role = "student"
            let userID = "STU0001"

            if(user.email.endsWith('@lecturer.edu')){
              role = "lecturer"
              userID = "LEC0001"

              const lastLecturer = await User.findOne({ role: "lecturer" }).sort({ createdAt: -1 })

              if(lastLecturer){
                const lastUserIDNumber = parseInt(lastLecturer.userID.replace("LEC", ""))
                userID = "LEC" + (lastUserIDNumber + 1).toString().padStart(4, "0")
              }
            } else {
              const lastStudent = await User.findOne({ role: "student" }).sort({ createdAt: -1 })

              if(lastStudent){
                const lastUserIDNumber = parseInt(lastStudent.userID.replace("STU", ""))
                userID = "STU" + (lastUserIDNumber + 1).toString().padStart(4, "0")
              }
            }

            const newUser = await User.create({
              firstName,
              lastName,
              email: user.email,
              userID,
              password: null,
              role
            })
          }

          return true

        }catch(error){
          console.error("Error in Google sign-in:", error.message)
          console.error("Full error:", error)
          return false
        }
      }
      
      return true
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        try {
          await connectDB()
          const dbUser = await User.findOne({ email: user.email })
          
          if (dbUser) {
            token.userID = dbUser.userID
            token.firstName = dbUser.firstName
            token.lastName = dbUser.lastName
            token.role = dbUser.role
          }
      
        } catch (error) {
          console.error("Error in JWT callback:", error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.userID = token.userID
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/login",
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }