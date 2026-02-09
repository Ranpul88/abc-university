'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";import toast from "react-hot-toast";

export default function UserData() {
  const [userID, setUserID] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/check-auth', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    .then(res => {
      if(!res.ok) {
        throw new Error('Failed to check authentication')
      }
      return res.json()
    })
    .then(data => {
      setUserID(data.userID)
      setIsAuthenticated(data.authenticated)
      setIsLoading(false)
    })
    .catch(err => {
      console.log("Error checking authentication: ")
      console.log(err)
      setIsLoading(false)
    })
  }, []);

  async function handleLogout() {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      if(!res.ok) {
        toast.error("Error logging out. Please try again.")
        return
      }
      setIsAuthenticated(false)
      setUserID(null)
      router.push('/')
      toast.success("Logged out successfully!")

    } catch (error) {
      console.log("Error logging out: ")
      console.log(error)
      toast.error("Error logging out. Please try again.")
    }
  }

  return (
    <>
      {isLoading ? <div className="w-50 h-full flex items-center justify-center ">Loading...</div> : <div className="w-55 h-full flex items-center justify-center ">
        { isAuthenticated ? <div className="flex gap-4">
          <Link href={{pathname:'/my-courses', query: {userID: userID}}} className="hover:scale-105">My Courses</Link>
          <button onClick={handleLogout} className="rounded-lg cursor-pointer hover:scale-105">Logout</button>
        </div>
        :
        <div className="flex gap-4">
          <Link href='/auth/login' className="scale-105">Login</Link>
          <Link href='/auth/register' className="scale-105">Register</Link>
        </div>
        }
      </div>}
    </>
  )
}
