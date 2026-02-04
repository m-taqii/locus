"use client"
import Link from "next/link";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

const VerifyPage = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();
    const { data: session, update } = useSession() 
    const userid = session?.user?.id

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await axios.post("/api/auth/registerBusiness/verify", { otp });

            if (res.data.ok) {
                setSuccess("Email verified successfully!");

                // Refresh the session to get the updated emailVerified status
                await update();

                // Small delay to ensure session is updated before redirect
                setTimeout(() => {
                    router.push("/dashboard");
                }, 500);

            } else {
                setError(res.data.error);
            }
        } catch (error) {
            setError(error.response?.data?.error || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        setSuccess("Otp resent successfully!")
        try {
            const res = await axios.post("/api/auth/registerBusiness/resend-otp", { id: userid });

            if (res.data.ok) {
                setSuccess("OTP resent successfully!");
            } else {
                setError(res.data.error);
            }
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    return (
        <div>
            <Link href="/"><img src="/logo.png" alt="Locus Logo" className='w-25 m-5' /></Link>
            <div className='flex flex-col items-center justify-center h-[80vh]'>

                <div className='circular-gradient'></div>

                <h1 className='text-4xl font-extrabold text-transparent bg-clip-text 
                   bg-linear-to-tl from-[#F0A728] to-[#9C2906] mb-10'>Verify Your Email</h1>

                <form action="" className='flex flex-col gap-4 backdrop-blur-2xl p-5 rounded-xl border border-white/15 bg-white/5 md:w-110 w-85' onSubmit={handleSubmit}>

                    <input type="text" placeholder='OTP' required className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' value={otp} onChange={(e) => setOtp(e.target.value)} />

                    <button type="submit" className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>{loading ? "Loading..." : "Verify"}</button>

                    <p className='text-center text-sm'>Didn't receive an OTP? <span className='text-[#a34b27] hover:text-[#a34a278f] font-semibold hover:cursor-pointer' onClick={handleReset}>Resend OTP</span></p>

                    {error && <p className='text-red-500 text-center'>{error}</p>}
                    {success && <p className='text-green-500 text-center'>{success}</p>}
                </form>
            </div>
        </div>
    )
}

export default VerifyPage