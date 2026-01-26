"use client"
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const Register = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        ownerName: "",
        businessName: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Register the business
            const res = await axios.post("/api/auth/registerBusiness", formData);
            setError(null);
            console.log(res.data);

            // Automatically log in the user
            const signInResult = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false
            });

            if (signInResult?.error) {
                setError("Registration successful but login failed. Please login manually.");
                setLoading(false);
                router.push("/login");
            } else {
                // Successfully logged in, redirect to dashboard
                router.push("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
            setLoading(false);
        }
    }

    return (
        <div>
            <Link href="/"><img src="/logo.png" alt="Locus Logo" className='w-25 m-5' /></Link>
            <div className='flex flex-col items-center justify-center h-[80vh]'>

                <div className='circular-gradient'></div>

                <h1 className='text-4xl font-extrabold text-transparent bg-clip-text 
           bg-linear-to-tl from-[#F0A728] to-[#9C2906] mb-10'>Register Your Business</h1>

                <form action="" className='flex flex-col gap-4 backdrop-blur-2xl p-5 rounded-xl border border-white/15 bg-white/5 w-80 md:w-110' onSubmit={handleSubmit}>

                    <input type="text" placeholder='Owner Name' required className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} />

                    <input type="text" placeholder='Business Name' required className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} />

                    <input type="email" placeholder='Email' required className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                    <input type="password" placeholder='Password' required className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

                    {error && <p className='text-red-500 text-center'>{error}</p>}

                    <button type="submit" className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>{loading ? "Loading..." : "Register"}</button>

                    <p className='text-center text-sm'>Already have an account? <Link href="/login" className='text-[#a34b27] hover:text-[#a34a278f] font-semibold'>Login</Link></p>

                </form>
            </div>
        </div>
    )
}

export default Register