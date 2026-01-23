import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='z-1000 w-full flex justify-between items-center p-4'>
      <Link href="/"><img src="/logo.png" alt="Locus Logo" className='w-20' /></Link>
      <div className='flex gap-3'>
        <Link href="/login" className='px-4 py-1 text-[#a34b27] hover:text-[#a34a278f] flex items-center justify-center font-semibold'>Login</Link>
        <Link href="/register" className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Get Started</Link>
      </div>
    </div>
  )
}

export default Navbar