import Link from "next/link";
import UserData from "./userData";

export default function Header() {
  return (
    <div className="w-full h-14 text-accent shadow-xl flex flex-row items-center relative">
        <img src="/logo.png" alt="logo" className="h-14 mt-1 object-cover shrink-0" />
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
            <Link href='/' className="hover:scale-105">Home</Link>
            <Link href='/courses' className="hover:scale-105">Courses</Link>
            <Link href='/about-us' className="hover:scale-105">About Us</Link>
            <Link href='/contact-us' className="hover:scale-105">Contact Us</Link>
        </div>
        <div className="ml-auto">
            <UserData />
        </div>
    </div>
  )
}