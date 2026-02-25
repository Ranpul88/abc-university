'use client'

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserData() {
  const { data: session } = useSession();

  const [userID, setUserID] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  
  async function checkCustomAuth(){
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/check-auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      const data = await res.json()
      setIsAuthenticated(data.authenticated)

      if(data.authenticated){
        setUserID(data.user.userID)
      }

      setIsLoading(false)

    } catch (error) {
      console.log("Error checking authentication")
      console.log(error)
    }
  }

  useEffect(() => {
    if(!session){
      checkCustomAuth()
    }
  }, [session]);

  async function handleLogout() {
    try {
      if(session){
        await signOut({ callbackUrl: '/' })
        toast.success("Logged out successfully!")
      }else if(isAuthenticated){
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
      }

    } catch (error) {
      console.log("Error logging out: ")
      console.log(error)
      toast.error("Error logging out. Please try again.")
    }
  }

  return (
    <>
      {/* Desktop nav actions — hidden on mobile */}
      <div className="hidden md:flex w-55 h-full items-center justify-center shrink-0">
        {isLoading ? (
          <div className="w-50 h-full flex items-center justify-center">Loading...</div>
        ) : session || isAuthenticated ? (
          <div className="flex gap-4">
            <Link href={{pathname:'/my-courses', query: {userID: userID}}} className="hover:scale-105">My Courses</Link>
            <button onClick={handleLogout} className="rounded-lg cursor-pointer hover:scale-105">Logout</button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href='/auth/login' className="scale-105">Login</Link>
            <Link href='/auth/register' className="scale-105">Register</Link>
          </div>
        )}
      </div>

      {/* Mobile hamburger button — visible only on mobile */}
      <div className="md:hidden ml-auto pr-4">
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-accent transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-accent transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-accent transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-white shadow-lg z-50 flex flex-col px-6 py-4 gap-4 text-accent border-t border-gray-100">
          <Link href='/' className="hover:scale-105" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href='/courses' className="hover:scale-105" onClick={() => setMenuOpen(false)}>Courses</Link>
          <Link href='/about-us' className="hover:scale-105" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link href='/contact-us' className="hover:scale-105" onClick={() => setMenuOpen(false)}>Contact Us</Link>

          <div className="border-t border-gray-100 pt-3">
            {isLoading ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : session || isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <Link href={{pathname:'/my-courses', query: {userID: userID}}} className="hover:scale-105" onClick={() => setMenuOpen(false)}>My Courses</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-left rounded-lg cursor-pointer hover:scale-105">Logout</button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link href='/auth/login' onClick={() => setMenuOpen(false)}>Login</Link>
                <Link href='/auth/register' onClick={() => setMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}