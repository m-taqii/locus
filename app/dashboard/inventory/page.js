"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Toast from '@/app/components/Toast'
import AddProducts from '@/app/components/AddProducts'
import EditProduct from '@/app/components/EditProduct'
import { useSession } from 'next-auth/react'

const page = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [toast, setToast] = useState(null)
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [editProductOpen, setEditProductOpen] = useState(false)
  const [product, setProduct] = useState(null)

  const { data: session } = useSession()

  const fetchProducts = () => {
    setLoading(true)
    axios.get("/api/products", { withCredentials: true })
      .then((res) => {
        setProducts(res.data.products || [])
      })
      .catch((err) => {
        setToast({
          message: err.response?.data?.message || 'Failed to fetch products',
          type: 'error'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDeleteProduct = (id) => {
    axios.delete(`/api/products/${id}`, { withCredentials: true })
      .then((res) => {
        setToast({
          message: res.data?.message || 'Product deleted successfully',
          type: 'success'
        })
        fetchProducts()
      })
      .catch((err) => {
        setToast({
          message: err.response?.data?.message || 'Failed to delete product',
          type: 'error'
        })
      })
      .finally(() => {
        setDeleteId(null)
      })
  }

  const handleCloseAddProduct = (shouldRefetch = false) => {
    setAddProductOpen(false)
    if (shouldRefetch) {
      fetchProducts()
    }
  }

  const handleEditProduct = (product) => {
    setProduct(product)
    setEditProductOpen(true)
  }

  const isAdmin = session?.user?.role === "Admin" || session?.user?.role === "Owner"

  return (
    <section className='h-full bg-[#1a1a1e] w-full p-4 md:p-6 overflow-y-auto'>

      {/* Header Section */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
        <div>
          <h1 className='text-xl md:text-2xl font-bold text-white'>Inventory</h1>
          <p className='text-gray-500 text-sm md:text-base'>Manage your inventory</p>
        </div>
        {isAdmin && (
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

      {/* Desktop Table View */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='bg-[#242529]'>
              <th className='p-3 text-left text-sm font-semibold text-gray-400 border-b border-gray-700'>Name</th>
              <th className='p-3 text-left text-sm font-semibold text-gray-400 border-b border-gray-700'>Price</th>
              <th className='p-3 text-left text-sm font-semibold text-gray-400 border-b border-gray-700'>Quantity</th>
              <th className='p-3 text-left text-sm font-semibold text-gray-400 border-b border-gray-700'>Category</th>
              <th className='p-3 text-left text-sm font-semibold text-gray-400 border-b border-gray-700'>Status</th>
              <th className='p-3 text-center text-sm font-semibold text-gray-400 border-b border-gray-700'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className='p-8 text-center'>
                  <div className='w-8 h-8 border-2 border-[#F0A728] border-t-transparent rounded-full animate-spin mx-auto'></div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className='p-8 text-center text-gray-500'>No products found</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id || product.name} className='hover:bg-white/5 transition-colors'>
                  <td className='p-3 text-white border-b border-gray-700/50'>{product.name}</td>
                  <td className='p-3 text-white border-b border-gray-700/50'>${product.price}</td>
                  <td className='p-3 text-white border-b border-gray-700/50'>{product.quantity}</td>
                  <td className='p-3 text-white border-b border-gray-700/50'>{product.category}</td>
                  <td className='p-3 border-b border-gray-700/50'>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className='p-3 border-b border-gray-700/50'>
                    <div className='flex gap-3 items-center justify-center'>
                      <button onClick={() => handleEditProduct(product)} className='cursor-pointer hover:text-green-500 transition-colors'><Pencil className='w-5 h-5' /></button>
                      {isAdmin && <button onClick={() => setDeleteId(product._id)} className='cursor-pointer hover:text-red-500 transition-colors'><Trash2 className='w-5 h-5' /></button>}
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
        ) : products.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>No products found</p>
        ) : (
          products.map((product) => (
            <div key={product._id || product.name} className='bg-[#242529] rounded-xl p-4 border border-white/5'>
              <div className='flex items-start justify-between mb-3'>
                <div>
                  <h3 className='text-white font-semibold'>{product.name}</h3>
                  <p className='text-gray-400 text-sm'>{product.category}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                  {product.status}
                </span>
              </div>
              <div className='grid grid-cols-2 gap-2 mb-3 text-sm'>
                <div>
                  <span className='text-gray-500'>Price:</span>
                  <span className='text-white ml-2'>${product.price}</span>
                </div>
                <div>
                  <span className='text-gray-500'>Qty:</span>
                  <span className='text-white ml-2'>{product.quantity}</span>
                </div>
              </div>
              <div className='flex gap-3 pt-3 border-t border-gray-700/50'>
                <button onClick={() => handleEditProduct(product)} className='flex items-center gap-1 text-sm text-gray-400 hover:text-green-500 transition-colors'>
                  <Pencil className='w-4 h-4' /> Edit
                </button>
                {isAdmin && (
                  <button onClick={() => setDeleteId(product._id)} className='flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors'>
                    <Trash2 className='w-4 h-4' /> Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4'>
          <div className="bg-[#252529] p-6 rounded-2xl border border-gray-800 shadow-2xl w-full max-w-sm">
            <h3 className="text-white font-bold text-lg mb-2">Delete Product?</h3>
            <p className="text-gray-400 text-sm mb-6">This action is permanent and cannot be undone. Are you sure you want to proceed?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="text-gray-400 hover:text-gray-200 cursor-pointer px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteId)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {addProductOpen && <AddProducts setAddProductOpen={handleCloseAddProduct} setToast={setToast} />}

      {editProductOpen && <EditProduct setEditProductOpen={setEditProductOpen} product={product} fetchProducts={fetchProducts} setToast={setToast} />}
    </section>
  )
}

export default page