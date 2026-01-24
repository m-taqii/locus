"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

const page = () => {


  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDeleteProduct = (id) => {
    
  }

  return (
    <section className='h-[90vh] bg-[#1a1a1e] transition-all duration-300 p-5'>

    <div className='flex items-center justify-between'>
        <div>
          <h1 className='md:text-2xl text-xl font-bold text-white text-left'>Inventory</h1>
          <p className='text-gray-500 text-center md:text-base text-sm'>Manage your inventory</p>
        </div>
        <div className='flex items-center gap-2'>
          <button onClick={() => setAddProductOpen(true)} className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white text-[0.75rem] md:text-[1rem] md:px-5 md:py-2 px-2 py-1 md:rounded-xl rounded-lg flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Add Product</button>
          <button className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white text-[0.75rem] md:text-[1rem] md:px-5 md:py-2 px-2 py-1 md:rounded-xl rounded-lg flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Add Category</button>
        </div>
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
                  <button className='cursor-pointer hover:text-green-500'><Pencil className='w-5 h-5' /></button>
                  <button onClick={() => handleDeleteProduct(product._id)} className='cursor-pointer hover:text-red-500'><Trash2 className='w-5 h-5' /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </section>
  )
}

export default page