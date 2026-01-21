import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const page = () => {
  return (

    <section className='h-[90vh] bg-[#1a1a1e] w-full p-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white text-left'>Dashboard</h1>
          <p className='text-gray-500 text-center'>Welcome back, John Doe</p>
        </div>
        <div className='flex items-center gap-2'>
          <button className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Add Product</button>
          <button className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Add Category</button>
        </div>
      </div>

    </section>

  )
}

export default page