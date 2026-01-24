"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { LayoutDashboard, Package, Users, Settings, PanelRightOpen, PanelRightClose } from 'lucide-react'
import { useSession } from 'next-auth/react'

const layout = ({ children }) => {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession()
    
    return (
        <div>
            <nav className='flex items-center justify-between w-full h-[10vh] border-b-2 border-gray-700 bg-[#242529]'>
                <div className='m-2'>
                    <Link href="/"><Image src="/logo.png" alt="Logo" width={100} height={100} /></Link>
                </div>
                <div className='flex items-center gap-2'>
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" width={40} height={40} className='rounded-full' />
                    <p className='mr-3'>{session?.user?.name || session?.user?.ownerName || null}</p>
                </div>
            </nav>
            <div className='flex'>
                <section className={`h-[90vh] backdrop-blur-3xl bg-[#242529] border-r border-gray-700 transition-all duration-300 ${open ? 'w-[20vw]' : 'w-[5vw] flex items-center flex-col'}`}>
                    <button onClick={() => setOpen(!open)} className={`cursor-pointer transition-all duration-300 ${open ? 'relative left-50 border-none w-0 m-5' : 'border-b border-gray-700 pb-2 m-5 w-10 flex justify-center items-center'}`}>
                        {open ? <PanelRightOpen /> : <PanelRightClose />}
                    </button>
                    <ul className='flex flex-col gap-2 ml-3 mr-3 mt-10 text-white'>
                        <Link href="/dashboard" className=''><li className='flex items-center gap-2  hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><LayoutDashboard /> {open ? "Dashboard" : ""}</li></Link>
                        <Link href="/dashboard/inventory" className=''><li className='flex items-center gap-2 hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><Package /> {open ? "Inventory" : ""}</li></Link>
                        <Link href="/dashboard/users" className=''><li className='flex items-center gap-2 hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><Users /> {open ? "Users" : ""}</li></Link>
                        <Link href="/dashboard/settings" className=''><li className='flex items-center gap-2 hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><Settings /> {open ? "Settings" : ""}</li></Link>
                    </ul>
                </section>
                <main className={`flex-1 transition-all duration-300 ${open ? 'w-[80vw]' : 'w-full'}`}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default layout