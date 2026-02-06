"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LayoutDashboard, Package, Users, Settings, PanelRightOpen, PanelRightClose, LogOut, TextAlignJustifyIcon, MonitorCog } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { Lightbulb } from 'lucide-react'

const layout = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [isMobile, setisMobile] = useState(false)
    const { data: session } = useSession()

    const isAdmin = session?.user?.role === "Admin" || session?.user?.role === "Owner"

    useEffect(() => {

        if (window.innerWidth <= 768) {
            setisMobile(true)
        }

    }, [])

    return (
        <div>
            <nav className='flex items-center justify-between w-full md:h-[10vh] h-[6vh] border-b-2 border-gray-700 bg-[#242529]'>
                <div className='m-2'>
                    {!isMobile ? <Link href="/"><Image src="/logo.png" alt="Logo" width={100} height={100} /></Link> : <TextAlignJustifyIcon className='cursor-pointer' onClick={() => setMobileMenu(!mobileMenu)} />}
                </div>
                <div className='flex items-center gap-2'>
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" className='rounded-full md:w-10 md:h-10 w-8 h-8' />
                    <p className='mr-3 md:text-base text-sm'>{session?.user?.name || session?.user?.businessName || null}</p>
                </div>
            </nav>

            {mobileMenu && <div className='fixed inset-0 bg-black/50 z-50' onClick={() => setMobileMenu(false)}></div>}

            <div className='flex h-[calc(100vh-6vh)] md:h-[calc(100vh-10vh)] overflow-hidden'>

                <section className={`h-full backdrop-blur-3xl bg-[#242529] border-r border-gray-700 transition-all duration-300 flex flex-col ${open ? 'w-[20vw] md:w-[20vw]' : 'w-[5vw] md:w-[5vw] items-center'} ${mobileMenu ? 'fixed inset-0 z-50 w-[40vw]' : 'hidden md:flex'}`}>

                    {!isMobile && <button onClick={() => setOpen(!open)} className={`cursor-pointer transition-all duration-300 hover:text-[#F0A728] ${open ? 'self-end m-5' : 'border-b border-gray-700 pb-2 m-5 w-10 flex justify-center items-center'}`}>
                        {open ? <PanelRightOpen /> : <PanelRightClose />}
                    </button>}

                    <ul className='flex flex-col gap-2 px-3 mt-5 text-white w-full overflow-y-auto flex-1'>

                        {mobileMenu && <Link href="/" className='m-2'><Image src="/logo.png" alt="Logo" width={100} height={100} /></Link>}

                        <Link href="/dashboard" onClick={() => setMobileMenu(false)}><li className='flex items-center gap-2 hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><LayoutDashboard /> {open || isMobile ? "Dashboard" : ""}</li></Link>

                        <Link href="/dashboard/inventory" onClick={() => setMobileMenu(false)}><li className='flex items-center gap-2 hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><Package /> {open || isMobile ? "Inventory" : ""}</li></Link>

                        {isAdmin && <Link href="/dashboard/users" onClick={() => setMobileMenu(false)}><li className='flex items-center gap-2 hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><Users /> {open || isMobile ? "Users" : ""}</li></Link>}

                        <Link href="/dashboard/manage-stocks" onClick={() => setMobileMenu(false)}><li className='flex items-center gap-2 hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><MonitorCog /> {open || isMobile ? "Manage Stocks" : ""}</li></Link>

                        <Link href="/dashboard/insights" onClick={() => setMobileMenu(false)}><li className='flex items-center gap-2 hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><Lightbulb /> {open || isMobile ? "Insights" : ""}</li></Link>

                        <Link href="/dashboard/settings" onClick={() => setMobileMenu(false)}><li className='flex items-center gap-2 hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><Settings /> {open || isMobile ? "Settings" : ""}</li></Link>

                    </ul>

                    <div className='w-full px-3 pb-3 mt-auto'>
                        <button onClick={() => signOut()} className='w-full flex items-center gap-2 hover:bg-[#1a1a1e] p-2 hover:rounded-md cursor-pointer hover:border-r-2 hover:border-[#F0A728] border-b border-gray-700'><LogOut /> {open || isMobile ? "Log Out" : ""}</button>
                    </div>

                </section>

                <main className={`flex-1 transition-all duration-300 overflow-y-auto h-full ${open ? 'w-[80vw]' : 'w-[95vw]'}`}>
                    {children}
                </main>

            </div>
        </div>
    )
}

export default layout