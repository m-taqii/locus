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
        <div onClick={() => handleCancel()} className='w-full h-full bg-black/50 absolute top-0 left-0 flex justify-center items-center'>
            <div onClick={(e) => e.stopPropagation()} className='bg-[#1a1a1e] h-[65vh] w-[40vw] rounded-xl flex flex-col justify-center items-center gap-5'>
                <h1 className='bg-linear-to-r from-[#a34b27] to-[#F0A728] bg-clip-text text-4xl text-center m-2 font-bold'>Add Product</h1>

                <form onSubmit={handleSubmit} action="" className='flex flex-col justify-center items-center gap-5'>

                    <div className='flex gap-5'>
                        <input type="text" placeholder='Enter Product Name' className='p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' name='name' onChange={(e) => setformData({ ...formData, name: e.target.value })} required />

                        <input type="number" placeholder='Price' className='p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' name="price" onChange={(e) => setformData({ ...formData, price: e.target.value })} required />
                    </div>
                    <div className='flex gap-5'>
                        <input type="number" placeholder='Quantity' className='p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' name="quantity" onChange={(e) => setformData({ ...formData, quantity: e.target.value })} required />

                        <input type="number" placeholder='Min Threshold' className='p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' name="minThreshold" onChange={(e) => setformData({ ...formData, minThreshold: e.target.value })} required />
                    </div>
                    <div className='flex gap-5'>
                        <input type="text" placeholder='sku (e.g SKU-12345)' className='p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' name="sku" onChange={(e) => setformData({ ...formData, sku: e.target.value })} required />

                        <select name="category" className='p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' onChange={(e) => setformData({ ...formData, category: e.target.value })} required>
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

                    <select name="status" id="" className='p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out' onChange={(e) => setformData({ ...formData, status: e.target.value })} required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    {response && <p className='text-red-500'>{response}</p>}
                    <button type='submit' className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>{loading ? "Loading..." : "Save"}</button>

                </form>

            </div>

        </div>
    )
}

export default AddProducts