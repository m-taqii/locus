"use client"
import Link from 'next/link';
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
const page = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });
            if (res?.error) {
                setError("Invalid credentials");
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            setError("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Link href="/"><img src="/logo.png" alt="Locus Logo" className='w-25 m-5' /></Link>
            <div className='flex flex-col items-center justify-center h-[80vh]'>

                <div className='circular-gradient'></div>

                <h1 className='text-4xl font-extrabold text-transparent bg-clip-text 
           bg-linear-to-tl from-[#F0A728] to-[#9C2906] mb-10'>Login to your account</h1>

                <form action="" className='flex flex-col gap-4 backdrop-blur-2xl p-5 rounded-xl border border-white/15 bg-white/5 md:w-110 w-85' onSubmit={handleSubmit}>

                    <input type="email" placeholder='Email' required className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                    <input type="password" placeholder='Password' required className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

                    <button type="submit" className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>{loading ? "Loading..." : "Login"}</button>

                    <p className='text-center text-sm'>Want to register your business? <Link href="/register" className='text-[#a34b27] hover:text-[#a34a278f] font-semibold'>Register</Link></p>

                    {error && <p className='text-red-500 text-center'>{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default page