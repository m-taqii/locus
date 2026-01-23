import React from 'react'

const AddProducts = ({ setAddProductOpen }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.name.value, e.target.quantity.value, e.target.category.value)
        setAddProductOpen(false)
    }
    const handleCancel = () => {
        setAddProductOpen(false)
    }
    return (
        <div onClick={() => handleCancel()} className='w-full h-full bg-black/50 absolute top-0 left-0 flex justify-center items-center'>
            <div onClick={(e) => e.stopPropagation()} className='bg-[#1a1a1e] h-[50vh] w-[30vw] rounded-xl'>
                <h1 className='bg-linear-to-r from-[#a34b27] to-[#F0A728] bg-clip-text text-4xl text-center m-2 font-bold'>Add Product</h1>

                <form onSubmit={handleSubmit} action="" className='flex flex-col justify-center items-center gap-5'>
                    <input type="text" placeholder='Enter Product Name' className='border rounded-md p-2' />
                    <input type="number" placeholder='e.g 50' className='p-2 border rounded-md' />
                    <select name="category" id="">
                        <option value=""></option>
                    </select>
                    <button type='submit' className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl flex items-center justify-center font-semibold hover:cursor-pointer hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out'>Save</button>
                </form>
            </div>

        </div>
    )
}

export default AddProducts