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
        console.log(res.data);
        setProducts(res.data.products || [])
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
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
        console.log(res.data);
        setToast({
          message: res.data?.message || 'Product deleted successfully',
          type: 'success'
        })
        fetchProducts()
      })
      .catch((err) => {
        console.log(err);
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


  return (
    <section className='h-[90vh] bg-[#1a1a1e] transition-all duration-300 p-5'>

      <div className='flex items-center justify-between'>
        <div>
          <h1 className='md:text-2xl text-xl font-bold text-white text-left'>Inventory</h1>
          <p className='text-gray-500 text-center md:text-base text-sm'>Manage your inventory</p>
        </div>
        {session?.user?.role === "admin" && <div className='flex items-center gap-2'>
          <button onClick={() => setAddProductOpen(true)} className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white text-[0.75rem] md:text-[1rem] md:px-5 md:py-2 px-2 py-1 md:rounded-xl rounded-lg flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Add Product</button>
          <button className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white text-[0.75rem] md:text-[1rem] md:px-5 md:py-2 px-2 py-1 md:rounded-xl rounded-lg flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Add Category</button>
        </div>}
      </div>

      <table className='w-full mt-5'>
        <thead>
          <tr>
            <th className='p-2 text-center border-b border-gray-700'>Name</th>
            <th className='p-2 text-center border-b border-gray-700'>Price</th>
            <th className='p-2 text-center border-b border-gray-700'>Category</th>
            <th className='p-2 text-center border-b border-gray-700'>Status</th>
            <th className='p-2 text-center border-b border-gray-700'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className='p-4 text-center text-gray-500'>Loading...</td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="5" className='p-4 text-center text-gray-500'>No products found</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id || product.name} className='p-2 text-center border-b border-gray-700'>
                <td className='p-2 text-center border-b border-gray-700'>{product.name}</td>
                <td className='p-2 text-center border-b border-gray-700'>{product.price}</td>
                <td className='p-2 text-center border-b border-gray-700'>{product.category}</td>
                <td className='p-2 text-center border-b border-gray-700'>{product.status}</td>
                <td className='flex gap-3 items-center justify-center m-2'>
                  <button onClick={() => handleEditProduct(product)} className='cursor-pointer hover:text-green-500'><Pencil className='w-5 h-5' /></button>
                  {session?.user?.role === "admin" && <button onClick={() => setDeleteId(product._id)} className='cursor-pointer hover:text-red-500'><Trash2 className='w-5 h-5' /></button>}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {deleteId && (
        <div className="bg-[#252529] p-6 rounded-2xl border border-gray-800 shadow-2xl w-80 animate-in fade-in slide-in-from-bottom-4">
          <h3 className="text-white font-bold text-lg mb-2">Delete Product?</h3>
          <p className="text-gray-400 text-sm mb-6">This action is permanent and cannot be undone. Are you sure you want to proceed?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteId(null)}
              className="text-gray-400 hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteProduct(deleteId)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
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