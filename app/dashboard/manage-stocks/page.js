"use client"
import { Search, Package, TrendingUp, TrendingDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Toast from '@/app/components/Toast'

const page = () => {
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantity, setQuantity] = useState('')
    const [adjustmentType, setAdjustmentType] = useState('stock-in')
    const [reason, setReason] = useState('')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const [stockHistory, setStockHistory] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchProducts()
        fetchStockHistory()
    }, [])

    const fetchProducts = () => {
        axios.get("/api/products", { withCredentials: true })
            .then((res) => {
                setProducts(res.data.products || [])
            })
            .catch((err) => {
                console.log(err)
                setToast({
                    message: err.response?.data?.message || 'Failed to fetch products',
                    type: 'error'
                })
            })
    }

    const fetchStockHistory = () => {
        axios.get("/api/stock-adjustments", { withCredentials: true })
            .then((res) => {
                setStockHistory(res.data.adjustments || [])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleProductSelect = (e) => {
        const productId = e.target.value
        const product = products.find(p => p._id === productId)
        setSelectedProduct(product)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!selectedProduct) {
            setToast({
                message: 'Please select a product',
                type: 'error'
            })
            return
        }

        if (!quantity || quantity <= 0) {
            setToast({
                message: 'Please enter a valid quantity',
                type: 'error'
            })
            return
        }

        setLoading(true)

        const adjustmentData = {
            productId: selectedProduct._id,
            quantity: parseInt(quantity),
            type: adjustmentType,
            reason: reason || `${adjustmentType === 'stock-in' ? 'Stock In' : 'Stock Out'} adjustment`
        }

        axios.post("/api/stock-adjustments", adjustmentData, { withCredentials: true })
            .then((res) => {
                setToast({
                    message: res.data?.message || 'Stock adjusted successfully',
                    type: 'success'
                })
                // Reset form
                setSelectedProduct(null)
                setQuantity('')
                setReason('')
                setAdjustmentType('stock-in')
                // Refresh data
                fetchProducts()
                fetchStockHistory()
            })
            .catch((err) => {
                setToast({
                    message: err.response?.data?.message || 'Failed to adjust stock',
                    type: 'error'
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <section className='md:min-h-[90vh] h-auto bg-[#1a1a1e] w-full p-5'>
            <div className='mb-6'>
                <h1 className='md:text-2xl text-xl font-bold text-white text-left'>Manage Stocks</h1>
                <p className='text-gray-500 text-sm'>Adjust product stock levels - Add or remove inventory</p>
            </div>

            <div className='grid md:grid-cols-2 grid-cols-1 gap-6'>
                {/* Stock Adjustment Form */}
                <div className='bg-[#121214] rounded-2xl p-6 max-h-[600px]'>
                    <h2 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
                        <Package className='w-5 h-5 text-[#F0A728]' />
                        Stock Adjustment
                    </h2>

                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        {/* Product Search & Select */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="search" className='text-sm text-gray-400'>Search Product</label>
                            <div className='relative'>
                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500' />
                                <input
                                    type="text"
                                    placeholder='Search by name or SKU...'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='w-full pl-10 p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="products" className='text-sm text-gray-400'>Select Product</label>
                            <select
                                name="products"
                                value={selectedProduct?._id || ''}
                                onChange={handleProductSelect}
                                className='p-2 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out'
                                required
                            >
                                <option value="">Select a product</option>
                                {filteredProducts.map((product) => (
                                    <option key={product._id} value={product._id}>
                                        {product.name} - {product.sku} (Current: {product.quantity})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Current Stock Display */}
                        {selectedProduct && (
                            <div className='bg-[#2a2a2e] p-3 rounded-lg'>
                                <p className='text-sm text-gray-400'>Current Stock</p>
                                <p className='text-2xl font-bold text-white'>{selectedProduct.quantity} units</p>
                                <p className='text-xs text-gray-500'>Min Threshold: {selectedProduct.minThreshold}</p>
                            </div>
                        )}

                        {/* Quantity Input */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="quantity" className='text-sm text-gray-400'>Sold Units</label>
                            <input
                                type="number"
                                placeholder='Enter quantity'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min="1"
                                className='p-2 rounded-lg bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out'
                                required
                            />
                        </div>

                        {/* Adjustment Type */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm text-gray-400'>Adjustment Type</label>
                            <div className='flex gap-4'>
                                <div className='flex items-center gap-2 bg-[#2a2a2e] p-3 rounded-lg flex-1'>
                                    <input
                                        type="radio"
                                        id="stock-in"
                                        name="type"
                                        value="stock-in"
                                        checked={adjustmentType === "stock-in"}
                                        onChange={() => setAdjustmentType("stock-in")}
                                        className='w-4 h-4 accent-green-500'
                                    />
                                    <label htmlFor="stock-in" className='flex items-center gap-2 cursor-pointer text-white'>
                                        <TrendingUp className='w-4 h-4 text-green-500' />
                                        Stock In
                                    </label>
                                </div>
                                <div className='flex items-center gap-2 bg-[#2a2a2e] p-3 rounded-lg flex-1'>
                                    <input
                                        type="radio"
                                        id="stock-out"
                                        name="type"
                                        value="stock-out"
                                        checked={adjustmentType === "stock-out"}
                                        onChange={() => setAdjustmentType("stock-out")}
                                        className='w-4 h-4 accent-red-500'
                                    />
                                    <label htmlFor="stock-out" className='flex items-center gap-2 cursor-pointer text-white'>
                                        <TrendingDown className='w-4 h-4 text-red-500' />
                                        Stock Out
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Reason */}
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="reason" className='text-sm text-gray-400'>Reason (Optional)</label>
                            <input
                                type="text"
                                placeholder='e.g., New shipment, Damaged goods, etc.'
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className='p-2 rounded-lg bg-white/10 focus:border-[#a34b27] focus:border focus:outline-none focus:shadow focus:shadow-[#a34b27] transition-all duration-300 ease-in-out'
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-3 rounded-xl font-semibold hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                        >
                            {loading ? "Processing..." : "Adjust Stock"}
                        </button>
                    </form>
                </div>

                {/* Stock History */}
                <div className='bg-[#121214] rounded-2xl p-6 max-h-[600px] overflow-y-auto'>
                    <h2 className='text-lg font-semibold text-white mb-4'>Recent Adjustments</h2>
                    <div className='max-h-[600px] overflow-y-auto'>
                        {stockHistory.length === 0 ? (
                            <p className='text-gray-500 text-center py-8'>No stock adjustments yet</p>
                        ) : (
                            <div className='space-y-3'>
                                {stockHistory.slice(0, 10).map((adjustment) => (
                                    <div
                                        key={adjustment._id}
                                        className='bg-[#2a2a2e] p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors'
                                    >
                                        <div className='flex items-start justify-between'>
                                            <div className='flex-1'>
                                                <p className='font-semibold text-white'>{adjustment.productName}</p>
                                                <p className='text-sm text-gray-400'>{adjustment.reason}</p>
                                            </div>
                                            <div className={`flex items-center gap-1 ${adjustment.type === 'stock-in' ? 'text-green-500' : 'text-red-500'}`}>
                                                {adjustment.type === 'stock-in' ? (
                                                    <TrendingUp className='w-4 h-4' />
                                                ) : (
                                                    <TrendingDown className='w-4 h-4' />
                                                )}
                                                <span className='font-bold'>{adjustment.type === 'stock-in' ? '+' : '-'}{adjustment.quantity}</span>
                                            </div>
                                        </div>
                                        <p className='text-xs text-gray-600 mt-2'>
                                            {new Date(adjustment.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </section>
    )
}

export default page