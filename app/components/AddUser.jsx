"use client"
import { useState } from "react"
import axios from "axios"

const AddUser = ({ setAddUserOpen, setToast }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "Staff",
        status: "pending"
    })
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const res = await axios.post("/api/auth/users", user, { withCredentials: true })
            setLoading(false);
            setToast && setToast({
                message: res.data?.message || 'User created successfully',
                type: 'success'
            })
            setAddUserOpen(true) 
        } catch (err) {
            setLoading(false);
            setToast && setToast({
                message: err.response?.data?.message || 'Failed to create user',
                type: 'error'
            })
            setAddUserOpen(false)
        }
    }
    const handleCancel = () => {
        setAddUserOpen(false)
    }
    return (
        <div onClick={handleCancel} className='fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4'>
            <div onClick={(e) => e.stopPropagation()} className='bg-[#1a1a1e] w-full max-w-sm md:max-w-md rounded-xl flex flex-col p-6 max-h-[90vh] overflow-y-auto border border-white/10'>
                <h1 className='bg-linear-to-r from-[#a34b27] to-[#F0A728] bg-clip-text text-transparent text-2xl md:text-3xl text-center mb-6 font-bold'>Add User</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs text-gray-500'>Name</label>
                        <input
                            type="text"
                            placeholder='Enter name'
                            name="name"
                            className='p-3 rounded-lg bg-white/10 text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300'
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-xs text-gray-500'>Email</label>
                        <input
                            type="email"
                            placeholder='Enter email'
                            name="email"
                            className='p-3 rounded-lg bg-white/10 text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300'
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                    </div>


                    <div className='grid grid-cols-2 gap-4'>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">Role</label>
                            <select
                                name="role"
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                                className='p-3 rounded-lg bg-[#2a2a2e] text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300'
                                required
                            >
                                <option value="Staff" className="bg-[#1a1a1e] text-white">Staff</option>
                                <option value="Admin" className="bg-[#1a1a1e] text-white">Admin</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">Status</label>
                            <select
                                name="status"
                                onChange={(e) => setUser({ ...user, status: e.target.value })}
                                className='p-3 rounded-lg bg-[#2a2a2e] text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                                required
                                disabled
                            >
                                <option value="pending" className="bg-[#1a1a1e] text-white">Pending</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex gap-3 mt-4'>
                        <button
                            type='button'
                            onClick={handleCancel}
                            className='flex-1 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='flex-1 bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-4 py-3 rounded-xl font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'
                        >
                            {loading ? "Saving..." : "Save User"}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddUser