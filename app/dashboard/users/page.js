"use client"
import { Pencil, Trash2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import AddUser from '@/app/components/AddUser'
import Toast from '@/app/components/Toast'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import EditUser from '@/app/components/EditUser'

const page = () => {
  const { data: session } = useSession()
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [toast, setToast] = useState(null)
  const [editUserOpen, setEditUserOpen] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.role !== "Admin" && session?.user?.role !== "Owner") {
      router.push("/dashboard")
    }
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    setLoading(true)
    axios.get("/api/auth/users", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.users || [])
      })
      .catch((err) => {
        console.log(err);
        setToast({
          message: err.response?.data?.message || 'Failed to fetch users',
          type: 'error'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleDeleteUser = (userId) => {

    axios.delete(`/api/auth/users/${userId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setToast({
          message: res.data?.message || 'User deleted successfully',
          type: 'success'
        })
        fetchUsers()
      })
      .catch((err) => {
        console.log(err);
        setToast({
          message: err.response?.data?.message || 'Failed to delete user',
          type: 'error'
        })
      })
      .finally(() => {
        setDeleteId(null)
      })

  }

  const handleCloseAddUser = (shouldRefetch = false) => {
    setAddUserOpen(false)
    if (shouldRefetch) {
      fetchUsers()
    }
  }

  const handleEditUser = (user) => {
    setEditUser(user)
    setEditUserOpen(true)
  }

  return (
    <section className='h-full bg-[#1a1a1e] w-full p-4 md:p-6 overflow-y-auto'>

      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
        <div>
          <h1 className='text-xl md:text-2xl font-bold text-white'>Users</h1>
          <p className='text-gray-500 text-sm md:text-base'>Add users to manage your inventory</p>
        </div>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setAddUserOpen(true)}
            className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white text-xs md:text-sm px-3 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'
          >
            Add User
          </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-[#242529]'>
              <th className='p-3 text-left text-sm font-semibold text-gray-400 border-b border-gray-700'>Name</th>
              <th className='p-3 text-left text-sm font-semibold text-gray-400 border-b border-gray-700'>Email</th>
              <th className='p-3 text-left text-sm font-semibold text-gray-400 border-b border-gray-700'>Role</th>
              <th className='p-3 text-left text-sm font-semibold text-gray-400 border-b border-gray-700'>Status</th>
              <th className='p-3 text-center text-sm font-semibold text-gray-400 border-b border-gray-700'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className='p-8 text-center'>
                  <div className='w-8 h-8 border-2 border-[#F0A728] border-t-transparent rounded-full animate-spin mx-auto'></div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className='p-8 text-center text-gray-500'>No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id || user.email} className='hover:bg-white/5 transition-colors'>
                  <td className='p-3 text-white border-b border-gray-700/50'>{user.name}</td>
                  <td className='p-3 text-white border-b border-gray-700/50'>{user.email}</td>
                  <td className='p-3 border-b border-gray-700/50'>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-900/50 text-purple-400' : 'bg-blue-900/50 text-blue-400'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className='p-3 border-b border-gray-700/50'>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className='p-3 border-b border-gray-700/50'>
                    <div className='flex gap-3 items-center justify-center'>
                      <button onClick={() => handleEditUser(user)} className='cursor-pointer hover:text-green-500 transition-colors'><Pencil className='w-5 h-5' /></button>
                      <button onClick={() => setDeleteId(user._id)} className='cursor-pointer hover:text-red-500 transition-colors'><Trash2 className='w-5 h-5' /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className='md:hidden space-y-3'>
        {loading ? (
          <div className='flex items-center justify-center py-8'>
            <div className='w-8 h-8 border-2 border-[#F0A728] border-t-transparent rounded-full animate-spin'></div>
          </div>
        ) : users.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>No users found</p>
        ) : (
          users.map((user) => (
            <div key={user._id || user.email} className='bg-[#242529] rounded-xl p-4 border border-white/5'>
              <div className='flex items-start justify-between mb-3'>
                <div>
                  <h3 className='text-white font-semibold'>{user.name}</h3>
                  <p className='text-gray-400 text-sm truncate max-w-[200px]'>{user.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-900/50 text-purple-400' : 'bg-blue-900/50 text-blue-400'}`}>
                  {user.role}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                  {user.status}
                </span>
                <div className='flex gap-3'>
                  <button onClick={() => handleEditUser(user)} className='flex items-center gap-1 text-sm text-gray-400 hover:text-green-500 transition-colors'>
                    <Pencil className='w-4 h-4' /> Edit
                  </button>
                  <button onClick={() => setDeleteId(user._id)} className='flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors'>
                    <Trash2 className='w-4 h-4' /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {addUserOpen && <AddUser setAddUserOpen={handleCloseAddUser} setToast={setToast} />}

      {editUserOpen && <EditUser setEditUserOpen={setEditUserOpen} user={editUser} fetchUsers={fetchUsers} setToast={setToast} />}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4'>
          <div className="bg-[#252529] p-6 rounded-2xl border border-gray-800 shadow-2xl w-full max-w-sm">
            <h3 className="text-white font-bold text-lg mb-2">Delete User?</h3>
            <p className="text-gray-400 text-sm mb-6">This action is permanent and cannot be undone. Are you sure you want to proceed?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="text-gray-400 hover:text-gray-200 cursor-pointer px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(deleteId)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

export default page