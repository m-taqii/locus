"use client"
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session, status } = useSession()

  return (
    <div className='fixed top-0 z-50 w-full flex justify-between items-center p-4'>
      <Link href="/"><img src="/logo.png" alt="Locus Logo" className='w-20' /></Link>
      <div className='flex gap-3'>
        {status === 'loading' ? (
          // Show a subtle loading state
          <div className='w-24 h-10 bg-white/10 rounded-xl animate-pulse'></div>
        ) : session ? (
          <Link href="/dashboard" className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Dashboard</Link>
        ) : (
          <>
            <Link href="/login" className='px-4 py-2 text-white/80 hover:text-white flex items-center justify-center font-medium transition-colors'>Login</Link>
            <Link href="/register" className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Get Started</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar