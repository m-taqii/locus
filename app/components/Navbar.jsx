import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-4'>
        <img src="/logo.png" alt="Locus Logo" className='w-20' />
        <div className='flex gap-3'>
            <Link href="/login" className='border-[#a34b27] border-2 text-[#a34b27] px-4 py-1 rounded'>Sign In</Link>
            <Link href="/register" className='bg-[#a34b27] text-white px-4 py-1 rounded'>Sign Up</Link>
        </div>
    </div>
  )
}

export default Navbar