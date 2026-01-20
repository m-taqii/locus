"use client"
import Link from 'next/link';
import React, { useState } from 'react'

const page = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <Link href="/"><img src="/logo.png" alt="Locus Logo" className='w-25 m-5' /></Link>
            <div className='flex flex-col items-center justify-center h-[80vh]'>

                <div className='circular-gradient'></div>

                <h1 className='text-4xl font-extrabold text-transparent bg-clip-text 
           bg-linear-to-tl from-[#F0A728] to-[#9C2906] mb-10'>Login</h1>

                <form action="" className='flex flex-col gap-4 backdrop-blur-2xl p-5 rounded-xl border border-[#a34b27] bg-white/5 w-110' onSubmit={handleSubmit}>

                    <input type="email" placeholder='Email' required className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                    <input type="password" placeholder='Password' required className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

                    <button type="submit" className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-2xl hover:shadow-[#190c15] transition-all duration-300 ease-in-out'>Login</button>
                    <p className='text-center text-sm'>Don't have an account? <Link href="/register" className='text-[#a34b27] hover:text-[#a34a278f] font-semibold'>Register</Link></p>
                </form>
            </div>
        </div>
    )
}

export default page