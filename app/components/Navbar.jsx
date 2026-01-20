import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4'>
      <Link href="/"><img src="/logo.png" alt="Locus Logo" className='w-20' /></Link>
      <div className='flex gap-3'>
        <Link href="/login" className='px-4 py-1 text-[#a34b27] hover:text-[#a34a278f] flex items-center justify-center font-semibold'>Login</Link>
        <Link href="/register" className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold'>Get Started</Link>
      </div>
    </div>
  )
}

export default Navbar