"use client"
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const LineGraph = ({ data, title = "Sales Analytics" }) => {
    return (
        <div className='bg-[#242529] rounded-xl p-4 md:p-6 border border-white/10'>
            <h3 className='text-lg font-semibold text-white mb-4'>{title}</h3>
            <div className='w-full h-[300px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
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
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#F0A728"
                            strokeWidth={2}
                            dot={{ fill: '#F0A728', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#a34b27' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="returns"
                            stroke="#a34b27"
                            strokeWidth={2}
                            dot={{ fill: '#a34b27', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default LineGraph
