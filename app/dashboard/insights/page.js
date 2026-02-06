"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import LineGraph from '@/app/components/LineGraph'
import BarChartComponent from '@/app/components/BarChart'
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Package,
  Clock,
  BarChart3,
  PieChart,
  RefreshCw
} from 'lucide-react'

const InsightsPage = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30days')
  const [insights, setInsights] = useState(null)
  const [error, setError] = useState(null)

  // Fetch insights data from API
  const fetchInsights = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/api/insights?range=${dateRange}`)
      setInsights(response.data)
    } catch (err) {
      console.error("Failed to fetch insights:", err)
      setError("Failed to load insights data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchInsights()
    }
  }, [dateRange, session])

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'year', label: 'This Year' },
  ]

  // Default values when data is loading or not available
  const salesTrendData = insights?.salesTrendData || []
  const productChartData = insights?.productChartData || []
  const inventoryHealth = insights?.inventoryHealth || {
    turnoverRate: 0,
    avgDaysInStock: 0,
    deadStockCount: 0,
    overstockCount: 0,
    healthScore: 0
  }
  const deadStock = insights?.deadStock || []
  const fastMoving = insights?.fastMoving || []
  const slowMoving = insights?.slowMoving || []

  // Loading state
  if (loading && !insights) {
    return (
      <section className='h-full bg-[#1a1a1e] w-full p-4 md:p-6 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-10 h-10 border-2 border-[#F0A728] border-t-transparent rounded-full animate-spin'></div>
          <p className='text-gray-400'>Loading insights...</p>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className='h-full bg-[#1a1a1e] w-full p-4 md:p-6 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <AlertTriangle className='w-12 h-12 text-red-400' />
          <p className='text-white'>{error}</p>
          <button
            onClick={fetchInsights}
            className='px-4 py-2 bg-[#F0A728] text-black rounded-lg font-medium hover:brightness-110 transition-all'
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className='h-full bg-[#1a1a1e] w-full p-4 md:p-6 overflow-y-auto'>
      {/* Header with Date Filter */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
        <div>
          <h1 className='text-xl md:text-2xl font-bold text-white'>Business Insights</h1>
          <p className='text-gray-500 text-sm'>Deep dive into your inventory performance and trends</p>
        </div>

        <div className='flex items-center gap-3'>
          {/* Date Range Selector */}
          <div className='flex items-center gap-2 bg-[#242529] rounded-lg p-1 border border-white/10'>
            {dateRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setDateRange(option.value)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${dateRange === option.value
                  ? 'bg-[#F0A728] text-black'
                  : 'text-gray-400 hover:text-white'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchInsights}
            className={`p-2 bg-[#242529] rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors ${loading ? 'animate-spin' : ''}`}
          >
            <RefreshCw className='w-4 h-4' />
          </button>
        </div>
      </div>

      {/* Inventory Health Score */}
      <div className='bg-[#242529] rounded-xl p-4 md:p-6 border border-white/10 mb-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-white flex items-center gap-2'>
            <BarChart3 className='w-5 h-5 text-[#F0A728]' />
            Inventory Health Score
          </h3>
          <span className={`text-2xl font-bold ${inventoryHealth.healthScore >= 80 ? 'text-green-400' :
            inventoryHealth.healthScore >= 60 ? 'text-yellow-400' : 'text-red-400'
            }`}>
            {inventoryHealth.healthScore}%
          </span>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='bg-[#1a1a1e] rounded-lg p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <TrendingUp className='w-4 h-4 text-green-400' />
              <span className='text-xs text-gray-400'>Turnover Rate</span>
            </div>
            <p className='text-xl font-bold text-white'>{inventoryHealth.turnoverRate}x</p>
            <p className='text-xs text-gray-500'>per month</p>
          </div>

          <div className='bg-[#1a1a1e] rounded-lg p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <Clock className='w-4 h-4 text-blue-400' />
              <span className='text-xs text-gray-400'>Avg. Days in Stock</span>
            </div>
            <p className='text-xl font-bold text-white'>{inventoryHealth.avgDaysInStock}</p>
            <p className='text-xs text-gray-500'>days average</p>
          </div>

          <div className='bg-[#1a1a1e] rounded-lg p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <AlertTriangle className='w-4 h-4 text-red-400' />
              <span className='text-xs text-gray-400'>Dead Stock</span>
            </div>
            <p className='text-xl font-bold text-white'>{inventoryHealth.deadStockCount}</p>
            <p className='text-xs text-gray-500'>no sales in 30+ days</p>
          </div>

          <div className='bg-[#1a1a1e] rounded-lg p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <Package className='w-4 h-4 text-yellow-400' />
              <span className='text-xs text-gray-400'>Overstock</span>
            </div>
            <p className='text-xl font-bold text-white'>{inventoryHealth.overstockCount}</p>
            <p className='text-xs text-gray-500'>above optimal level</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
        {/* Sales Trend */}
        <LineGraph data={salesTrendData} title="Sales vs Returns Trend" />

        {/* Top Products */}
        <BarChartComponent data={productChartData} title="Top Products by Stock" />
      </div>

      {/* Detailed Insights Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Dead Stock Warning */}
        <div className='bg-[#242529] rounded-xl p-4 md:p-6 border border-white/10'>
          <h3 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
            <AlertTriangle className='w-5 h-5 text-red-400' />
            Dead Stock Alert
          </h3>

          <p className='text-gray-400 text-sm mb-4'>
            Products with no sales in the last 30 days that may need attention.
          </p>

          <div className='space-y-2'>
            {deadStock.length === 0 ? (
              <p className='text-gray-500 text-sm py-4 text-center'>No dead stock items 🎉</p>
            ) : (
              deadStock.map((item, i) => (
                <div key={i} className='flex items-center justify-between p-2 bg-[#1a1a1e] rounded-lg'>
                  <span className='text-sm text-white truncate max-w-[150px]'>{item.name}</span>
                  <span className='text-xs text-red-400'>{item.daysSinceLastSale}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fast Moving Products */}
        <div className='bg-[#242529] rounded-xl p-4 md:p-6 border border-white/10'>
          <h3 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
            <TrendingUp className='w-5 h-5 text-green-400' />
            Fast Moving Stock
          </h3>
          <p className='text-gray-400 text-sm mb-4'>
            Products selling faster than average. Consider restocking soon.
          </p>
          <div className='space-y-2'>
            {fastMoving.length === 0 ? (
              <p className='text-gray-500 text-sm py-4 text-center'>No sales data yet</p>
            ) : (
              fastMoving.map((item, i) => (
                <div key={i} className='flex items-center justify-between p-2 bg-[#1a1a1e] rounded-lg'>
                  <span className='text-sm text-white truncate max-w-[150px]'>{item.name}</span>
                  <span className='text-xs text-green-400'>{item.velocity} velocity</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Slow Moving Products */}
        <div className='bg-[#242529] rounded-xl p-4 md:p-6 border border-white/10'>
          <h3 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
            <TrendingDown className='w-5 h-5 text-yellow-400' />
            Slow Moving Stock
          </h3>
          <p className='text-gray-400 text-sm mb-4'>
            Products selling slower than expected. May need promotion.
          </p>
          <div className='space-y-2'>
            {slowMoving.length === 0 ? (
              <p className='text-gray-500 text-sm py-4 text-center'>All products performing well!</p>
            ) : (
              slowMoving.map((item, i) => (
                <div key={i} className='flex items-center justify-between p-2 bg-[#1a1a1e] rounded-lg'>
                  <span className='text-sm text-white truncate max-w-[150px]'>{item.name}</span>
                  <span className='text-xs text-yellow-400'>{item.velocity} velocity</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top Products Overview */}
      <div className='mt-6 bg-[#242529] rounded-xl p-4 md:p-6 border border-white/10'>
        <h3 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
          <PieChart className='w-5 h-5 text-[#F0A728]' />
          Top Products Overview
        </h3>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          {productChartData.length === 0 ? (
            <p className='text-gray-500 text-sm col-span-full text-center py-4'>No products yet</p>
          ) : (
            productChartData.map((product, i) => {
              const colors = ['text-[#F0A728]', 'text-[#a34b27]', 'text-green-400', 'text-blue-400', 'text-purple-400', 'text-pink-400']
              const bgColors = ['bg-[#F0A728]/20', 'bg-[#a34b27]/20', 'bg-green-400/20', 'bg-blue-400/20', 'bg-purple-400/20', 'bg-pink-400/20']
              return (
                <div key={i} className='bg-[#1a1a1e] rounded-lg p-4 text-center'>
                  <div className={`w-12 h-12 rounded-full ${bgColors[i]} flex items-center justify-center mx-auto mb-2`}>
                    <Package className={`w-6 h-6 ${colors[i]}`} />
                  </div>
                  <p className='text-white font-medium text-sm truncate' title={product.fullName || product.name}>{product.name}</p>
                  <p className={`text-lg font-bold ${colors[i]}`}>{product.quantity}</p>
                  <p className='text-xs text-gray-500'>in stock</p>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default InsightsPage
