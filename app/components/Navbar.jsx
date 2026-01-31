"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy' }
  ]

  return (
    <>
      <nav className='fixed top-0 z-50 w-full flex justify-between items-center p-4 md:px-8 backdrop-blur-md'>
        {/* Logo */}
        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
          <img src="/logo.png" alt="Locus Logo" className='w-16 md:w-20' />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
          {/* Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-white/70 hover:text-white transition-colors font-medium'
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Buttons */}
          {status === 'loading' ? (
            <div className='w-24 h-10 bg-white/10 rounded-xl animate-pulse'></div>
          ) : session ? (
            <Link
              href="/dashboard"
              className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl font-semibold hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300'
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className='px-4 py-2 text-white/80 hover:text-white font-medium transition-colors'
              >
                Login
              </Link>
              <Link
                href="/register"
                className='bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-5 py-2 rounded-xl font-semibold hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all duration-300'
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='md:hidden p-2 text-white/80 hover:text-white transition-colors'
          aria-label='Toggle menu'
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#121214] border-l border-white/10 md:hidden transform transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Close Button */}
        <div className='flex justify-end p-4'>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className='p-2 text-white/80 hover:text-white transition-colors'
            aria-label='Close menu'
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <div className='flex flex-col px-6 py-4 space-y-2'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className='py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium'
            >
              {link.label}
            </Link>
          ))}

          <div className='border-t border-white/10 my-4'></div>

          {/* Mobile Auth Buttons */}
          {status === 'loading' ? (
            <div className='w-full h-12 bg-white/10 rounded-xl animate-pulse'></div>
          ) : session ? (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className='w-full py-3 bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white rounded-xl font-semibold text-center'
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className='py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all font-medium text-center'
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className='w-full py-3 bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white rounded-xl font-semibold text-center'
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar