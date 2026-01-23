"use client"
import { Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import AddUser from '@/app/components/AddUser'
const page = () => {

const [addUserOpen, setAddUserOpen] = useState(false)

  const user = [ {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "Admin",
    "status": "Active"
  },
{
    "name": "Julie Doe",
    "email": "Julie.doe@example.com",
    "role": "Staff",
    "status": "Active"
}]

  return (
    <section className='h-[90vh] bg-[#1a1a1e] w-full p-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-white text-left'>Add Users</h1>
          <p className='text-gray-500 text-center'>Add Users to manage your inventory</p>
        </div>
        <div className='flex items-center gap-2'>
          <button onClick={() => setAddUserOpen(true)} className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Add Users</button>
        </div>
      </div>

      <table className='w-full mt-5'>
        <thead>
          <tr>
            <th className='p-2 text-center border-b border-gray-700'>Name</th>
            <th className='p-2 text-center border-b border-gray-700'>Email</th>
            <th className='p-2 text-center border-b border-gray-700'>Role</th>
            <th className='p-2 text-center border-b border-gray-700'>Status</th>
            <th className='p-2 text-center border-b border-gray-700'>Actions</th>
          </tr>
        </thead>
        <tbody>

          {user.map((user) => (<tr key={user.email} className='p-2 text-center border-b border-gray-700'>
            <td className='p-2 text-center border-b border-gray-700'>{user.name}</td>
            <td className='p-2 text-center border-b border-gray-700'>{user.email}</td>
            <td className='p-2 text-center border-b border-gray-700'>{user.role}</td>
            <td className='p-2 text-center border-b border-gray-700'>{user.status}</td>
            <td className='flex gap-3 items-center justify-center m-2'><button className='cursor-pointer hover:text-green-500'><Pencil className='w-5 h-5'/></button><button className='cursor-pointer hover:text-red-500'><Trash2 className='w-5 h-5'/></button></td>
          </tr>))}
        </tbody>
      </table>

      {addUserOpen && <AddUser setAddUserOpen={setAddUserOpen} />}
    </section>
  )
}

export default page