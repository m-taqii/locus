import { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const AddProducts = ({ setAddProductOpen, setToast }) => {
    const [formData, setformData] = useState({
        name: "",
        price: 0,
        quantity: 0,
        minThreshold: 0,
        sku: "",
        category: "",
        status: "active"
    })
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [response, setresponse] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post("/api/products", formData, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                setresponse(res.data.message)
                setToast && setToast({
                    message: res.data?.message || 'Product created successfully',
                    type: 'success'
                })
                setAddProductOpen(true) // Pass true to trigger refetch
            })
            .catch(err => {
                console.log(err)
                setresponse(err.response.data.message)
                setToast && setToast({
                    message: err.response?.data?.message || 'Failed to create product',
                    type: 'error'
                })
            })
        setLoading(false)
    }

    const handleCancel = () => {
        setAddProductOpen(false)
    }

    return (
        <div onClick={() => handleCancel()} className='fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4'>
            <div onClick={(e) => e.stopPropagation()} className='bg-[#1a1a1e] w-full max-w-md md:max-w-lg rounded-xl flex flex-col p-6 max-h-[90vh] overflow-y-auto border border-white/10'>
                <h1 className='bg-linear-to-r from-[#a34b27] to-[#F0A728] bg-clip-text text-transparent text-2xl md:text-3xl text-center mb-6 font-bold'>Add Product</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    {/* Name & Price */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-500'>Product Name</label>
                            <input
                                type="text"
                                placeholder='e.g. Wireless Headphones'
                                className='p-3 rounded-lg bg-[#2a2a2e] text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300'
                                name='name'
                                onChange={(e) => setformData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-500'>Price</label>
                            <input
                                type="number"
                                placeholder='0.00'
                                className='p-3 rounded-lg bg-[#2a2a2e] text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300'
                                name="price"
                                onChange={(e) => setformData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Quantity & Min Threshold */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-500'>Quantity</label>
                            <input
                                type="number"
                                placeholder='0'
                                className='p-3 rounded-lg bg-[#2a2a2e] text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300'
                                name="quantity"
                                onChange={(e) => setformData({ ...formData, quantity: e.target.value })}
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-500'>Min Threshold</label>
                            <input
                                type="number"
                                placeholder='0'
                                className='p-3 rounded-lg bg-[#2a2a2e] text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300'
                                name="minThreshold"
                                onChange={(e) => setformData({ ...formData, minThreshold: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* SKU & Category */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-500'>SKU</label>
                            <input
                                type="text"
                                placeholder='e.g. SKU-12345'
                                className='p-3 rounded-lg bg-[#2a2a2e] text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300'
                                name="sku"
                                onChange={(e) => setformData({ ...formData, sku: e.target.value })}
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-xs text-gray-500'>Category</label>
                            <select
                                name="category"
                                className='p-3 rounded-lg bg-[#2a2a2e] text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300'
                                onChange={(e) => setformData({ ...formData, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Home & Kitchen">Home & Kitchen</option>
                                <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                                <option value="Sports & Fitness">Sports & Fitness</option>
                                <option value="Books">Books</option>
                                <option value="Toys & Games">Toys & Games</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Health & Safety">Health & Safety</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>

                    {/* Status */}
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs text-gray-500'>Status</label>
                        <select
                            name="status"
                            className='p-3 rounded-lg bg-[#2a2a2e] text-white text-sm focus:border-[#a34b27] focus:border focus:outline-none transition-all duration-300'
                            onChange={(e) => setformData({ ...formData, status: e.target.value })}
                            required
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {response && <p className='text-red-500 text-sm text-center'>{response}</p>}

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
                            {loading ? "Saving..." : "Save Product"}
                        </button>
                    </div>

                </form>

            </div>

        </div>
    )
}

export default AddProducts