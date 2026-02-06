"use client"
import React from 'react'
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

const COLORS = ['#F0A728', '#a34b27', '#d97706', '#ea580c', '#f59e0b', '#fbbf24'];

const BarChartComponent = ({ data, title = "Product Performance" }) => {
    return (
        <div className='bg-[#242529] rounded-xl p-4 md:p-6 border border-white/10'>
            <h3 className='text-lg font-semibold text-white mb-4'>{title}</h3>
            <div className='w-full h-[300px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#666"
                            tick={{ fill: '#999', fontSize: 12 }}
                        />
                        <YAxis
                            stroke="#666"
                            tick={{ fill: '#999', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1a1a1e',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                color: '#fff'
                            }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Legend />
                        <Bar
                            dataKey="quantity"
                            fill="#F0A728"
                            radius={[4, 4, 0, 0]}
                        >
                            {data?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </RechartsBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BarChartComponent
