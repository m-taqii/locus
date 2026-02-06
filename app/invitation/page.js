"use client"
import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from "axios"

function InvitationForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [validating, setValidating] = useState(true);
    const [tokenValid, setTokenValid] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    // Validate token on mount
    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                setError("No invitation token provided");
                setValidating(false);
                return;
            }

            try {
                const res = await axios.get(`/api/auth/users/verify-token?token=${token}`);
                setTokenValid(true);
                setUserInfo(res.data);
            } catch (err) {
                setError(err.response?.data?.error || "Invalid or expired invitation");
            } finally {
                setValidating(false);
            }
        };

        validateToken();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post("/api/auth/users/verify-token", {
                token,
                password
            });
            setSuccess(res.data.message);
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Loading state
    if (validating) {
        return (
            <div className="min-h-screen overflow-x-hidden flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-3 border-[#F0A728] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400">Validating invitation...</p>
                </div>
            </div>
        );
    }

    // Invalid token state
    if (!tokenValid) {
        return (
            <div className="min-h-screen overflow-x-hidden">
                <Link href="/"><img src="/logo.png" alt="Locus Logo" className='w-25 m-5' /></Link>
                <div className='flex flex-col items-center justify-center h-[80vh]'>
                    <div className='circular-gradient'></div>

                    <div className="backdrop-blur-2xl p-8 rounded-xl border border-white/15 bg-white/5 md:w-110 w-85 text-center">
                        <div className="text-red-500 text-6xl mb-4">⚠️</div>
                        <h1 className="text-2xl font-bold text-white mb-4">Invalid Invitation</h1>
                        <p className="text-gray-400 mb-6">{error || "This invitation link is invalid or has expired."}</p>
                        <p className="text-gray-500 text-sm">Please contact your administrator for a new invitation.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen overflow-x-hidden">
            <Link href="/"><img src="/logo.png" alt="Locus Logo" className='w-25 m-5' /></Link>
            <div className='flex flex-col items-center justify-center h-[80vh]'>

                <div className='circular-gradient'></div>

                <h1 className='text-4xl font-extrabold text-transparent bg-clip-text 
                   bg-linear-to-tl from-[#F0A728] to-[#9C2906] mb-4'>Welcome to Locus! 🎉</h1>

                <p className="text-gray-400 mb-8">Set up your account to get started</p>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 backdrop-blur-2xl p-6 rounded-xl border border-white/15 bg-white/5 md:w-110 w-85'>

                    {/* User Info */}
                    {userInfo && (
                        <div className="bg-white/5 rounded-lg p-4 mb-2 border border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-linear-to-r from-[#a34b27] to-[#F0A728] flex items-center justify-center text-white font-bold text-lg">
                                    {userInfo.userName?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{userInfo.userName}</p>
                                    <p className="text-gray-400 text-sm">{userInfo.userEmail}</p>
                                </div>
                                <span className="ml-auto bg-[#F0A728]/20 text-[#F0A728] text-xs px-3 py-1 rounded-full font-medium">
                                    {userInfo.role}
                                </span>
                            </div>
                        </div>
                    )}

                    <p className="text-gray-400 text-sm text-center">
                        Create a password to activate your account.
                    </p>

                    <input
                        type="password"
                        placeholder='Create Password'
                        required
                        minLength={6}
                        className='p-3 rounded-lg bg-white/10 text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder='Confirm Password'
                        required
                        minLength={6}
                        className='p-3 rounded-lg bg-white/10 text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading || success}
                        className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-3 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out disabled:opacity-50'
                    >
                        {loading ? "Activating..." : "Activate Account"}
                    </button>

                    {error && <p className="text-center text-sm text-red-500">{error}</p>}
                    {success && (
                        <div className="text-center">
                            <p className="text-sm text-green-500 mb-2">{success}</p>
                            <p className="text-xs text-gray-400">Redirecting to login...</p>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}

export default function InvitationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#1a1a1e] flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-[#F0A728] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <InvitationForm />
        </Suspense>
    );
}