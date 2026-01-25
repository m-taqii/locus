"use client"
import React, { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

const Toast = ({ message, type, onClose, duration = 3000 }) => {
    
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [duration, onClose])

    const isSuccess = type === 'success'

    return (
        <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
            <div className={`flex items-center gap-3 p-4 pr-12 rounded-xl shadow-2xl border ${isSuccess ? 'bg-green-500/10 border-green-500/50 backdrop-blur-lg' : 'bg-red-500/10 border-red-500/50 backdrop-blur-lg'} min-w-[300px] relative
      `}>
                {isSuccess ? (
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                ) : (
                    <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                )}

                <p className={`text-sm font-medium ${isSuccess ? 'text-green-100' : 'text-red-100'}`}>
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className={`absolute top-3 right-3 transition-colors ${isSuccess ? 'text-green-400/70 hover:text-green-300' : 'text-red-400/70 hover:text-red-300'}`}
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Progress bar */}
                <div className={`absolute bottom-0 left-0 h-1 rounded-b-xl ${isSuccess ? 'bg-green-500' : 'bg-red-500'}
          animate-[shrink_${duration}ms_linear_forwards]
        `}
                    style={{
                        animation: `shrink ${duration}ms linear forwards`
                    }}
                />
            </div>

            <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
        </div>
    )
}

export default Toast
