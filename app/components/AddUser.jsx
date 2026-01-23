"use client"
import { useState } from "react"

const AddUser = ({ setAddUserOpen }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        status: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)
        const newUser = new User(user)
        newUser.save()
        setAddUserOpen(false)
    }
    const handleCancel = () => {
        setAddUserOpen(false)
    }
    return (
        <div onClick={handleCancel} className='w-full h-full bg-black/50 absolute top-0 left-0 flex justify-center items-center'>
            <div onClick={(e) => e.stopPropagation()} className='bg-[#1a1a1e] h-[60vh] w-[30vw] rounded-xl p-4'>
                <h1 className='bg-linear-to-r from-[#a34b27] to-[#F0A728] bg-clip-text text-4xl text-center m-2 font-bold'>Add User</h1>

                <form onSubmit={handleSubmit} action="" className='flex flex-col justify-center items-center gap-5'>
                    <input type="text" placeholder='Name' name="name" className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' onChange={(e) => setUser({ ...user, name: e.target.value })} required/>
                    <input type="email" placeholder='Email' name="email" className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' onChange={(e) => setUser({ ...user, email: e.target.value })} required/>
                    <input type="password" placeholder='Password' name="password" className='p-2 rounded-lg  bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' onChange={(e) => setUser({ ...user, password: e.target.value })} required/>
                    <div className='flex gap-5'>

                        <div className="flex flex-col">
                        <label htmlFor="role" className="text-xs text-gray-500">Role</label>
                        <select name="role" id="" onChange={(e) => setUser({ ...user, role: e.target.value })} className='p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' required>
                            <option value="Admin" className="bg-[#1a1a1e] text-white">Admin</option>
                            <option value="Staff" className="bg-[#1a1a1e] text-white">Staff</option>
                        </select>
                        </div>

                        <div className="flex flex-col">
                        <label htmlFor="status" className="text-xs text-gray-500">Status</label>
                        <select name="status" id="" onChange={(e) => setUser({ ...user, status: e.target.value })} className='p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' required>
                            <option value="Active" className="bg-[#1a1a1e] text-white">Active</option>
                            <option value="Inactive" className="bg-[#1a1a1e] text-white">Inactive</option>
                        </select>
                        </div>
                    </div>

                    <button type='submit' className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Save</button>
                </form>
            </div>

        </div>
    )
}

export default AddUser