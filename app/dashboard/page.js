"use client"
import { useState, useEffect } from 'react'
import AddProducts from '../components/AddProducts'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { Handbag, Package2, UsersRound, } from 'lucide-react'

const page = () => {
  const [addProductOpen, setAddProductOpen] = useState(false)
  const { data: session } = useSession()
  const [dashboardData, setDashboardData] = useState(null)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    axios.get("/api/dashboard", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setDashboardData(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteProduct = (productId) => {
    axios.delete(`/api/products/${productId}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        fetchData() // Refresh the products list
      })
      .catch((err) => {
        console.error("Delete error:", err);
      })
  }

  return (
    <section className='h-full bg-[#1a1a1e] w-full p-4 md:p-6 overflow-y-auto'>

      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
        <div>
          <h1 className='text-xl md:text-2xl font-bold text-white'>Dashboard</h1>
          <p className='text-gray-500 text-sm md:text-base'>Welcome back, {session?.user?.name || session?.user?.ownerName || 'User'}</p>
        </div>
        {(session?.user?.role === "Admin" || session?.user?.role === "Owner") && (
          <div className='flex items-center gap-2 flex-wrap'>
            <button
              onClick={() => setAddProductOpen(true)}
              className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white text-xs md:text-sm px-3 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'
            >
              Add Product
            </button>
            <button
              className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white text-xs md:text-sm px-3 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'
            >
              Add Category
            </button>
          </div>
        )}
      </div>

      {addProductOpen && <AddProducts setAddProductOpen={setAddProductOpen} />}

      {/* Stats Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>

        {(session?.user?.role === "Admin" || session?.user?.role === "Owner") && (
          <div className='bg-[#242529] rounded-xl flex items-center p-4 gap-4 border border-white/5 hover:border-white/10 transition-colors'>
            <span className='rounded-lg bg-blue-900/50 text-blue-400 p-3'>
              <UsersRound size={24} />
            </span>
            <div className='flex flex-col'>
              <p className='text-xs md:text-sm text-gray-400'>Active Users</p>
              <p className='text-white text-xl md:text-2xl font-bold'>{dashboardData?.users}</p>
            </div>
          </div>
        )}

        <div className='bg-[#242529] rounded-xl flex items-center p-4 gap-4 border border-white/5 hover:border-white/10 transition-colors'>
          <span className='rounded-lg bg-green-900/50 text-green-400 p-3'>
            <Handbag size={24} />
          </span>
          <div className='flex flex-col'>
            <p className='text-xs md:text-sm text-gray-400'>
              {(session?.user?.role === "Admin" || session?.user?.role === "Owner") ? 'Total Sales' : 'Your Sales'}
            </p>
            <p className='text-white text-xl md:text-2xl font-bold'>{dashboardData?.totalSold}</p>
          </div>
        </div>

        <div className='bg-[#242529] rounded-xl flex items-center p-4 gap-4 border border-white/5 hover:border-white/10 transition-colors'>
          <span className='rounded-lg bg-yellow-900/50 text-yellow-400 p-3'>
            <Package2 size={24} />
          </span>
          <div className='flex flex-col'>
            <p className='text-xs md:text-sm text-gray-400'>Total Products</p>
            <p className='text-white text-xl md:text-2xl font-bold'>{dashboardData?.products}</p>
          </div>
        </div>

      </div>

      {/* Low Stock Section */}
      <div className='mb-6'>
        <h2 className='text-lg md:text-xl font-bold text-white mb-4'>Low Stock Products</h2>

        {/* <div className='bg-[#242529] rounded-xl border border-white/5 p-4 md:p-6'>
          {loading ? (
            <div className='flex items-center justify-center py-8'>
              <div className='w-8 h-8 border-2 border-[#F0A728] border-t-transparent rounded-full animate-spin'></div>
            </div>
          ) : products.length === 0 ? (
            <p className='text-gray-500 text-center py-8'>No low stock products found</p>
          ) : (
            <div className='space-y-3'>
              {products.filter(p => p.quantity <= p.minThreshold).map((product) => (
                <div key={product._id || product.name} className='flex items-center justify-between p-3 bg-[#1a1a1e] rounded-lg'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-lg bg-red-900/30 flex items-center justify-center'>
                      <Package2 size={20} className='text-red-400' />
                    </div>
                    <div>
                      <p className='text-white font-medium text-sm md:text-base'>{product.name}</p>
                      <p className='text-gray-500 text-xs'>{product.category}</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-red-400 font-bold text-sm md:text-base'>{product.quantity} left</p>
                    <p className='text-gray-500 text-xs'>Min: {product.minThreshold}</p>
                  </div>
                </div>
              ))}
              {products.filter(p => p.quantity <= p.minThreshold).length === 0 && (
                <p className='text-gray-500 text-center py-4'>All products are well stocked!</p>
              )}
            </div>
          )}
        </div> */}
      </div>

    </section>

  )
}

export default page