"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await axios.post("/api/auth/forgot-password/generate-token", { email });
            setSuccess(res.data.message);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Link href="/"><img src="/logo.png" alt="Locus Logo" className='w-25 m-5' /></Link>
            <div className='flex flex-col items-center justify-center h-[80vh]'>

                <div className='circular-gradient'></div>

                <h1 className='text-4xl font-extrabold text-transparent bg-clip-text 
           bg-linear-to-tl from-[#F0A728] to-[#9C2906] mb-10'>Forgot Password</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 backdrop-blur-2xl p-5 rounded-xl border border-white/15 bg-white/5 md:w-110 w-85'>

                    <p className="text-gray-400 text-sm text-center mb-2">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    <input
                        type="email"
                        placeholder='Email'
                        required
                        className='p-3 rounded-lg bg-white/10 text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-3 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out disabled:opacity-50'
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                    {error && <p className="text-center text-sm text-red-500">{error}</p>}
                    {success && <p className="text-center text-sm text-green-500">{success}</p>}

                    <div className="text-center text-sm text-gray-400 mt-2">
                        <Link href="/login" className='text-[#F0A728] hover:text-[#a34b27] font-semibold'>
                            ← Back to Login
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ForgotPasswordPage