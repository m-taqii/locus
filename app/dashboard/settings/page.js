"use client"
import React, { useState } from 'react'
import { User, Building2, Bell, Lock, Palette, Save, Camera } from 'lucide-react'
import { useSession } from 'next-auth/react'

const page = () => {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)

  // Profile state
  const [profile, setProfile] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    role: session?.user?.role || '',
    avatar: ''
  })

  // Business state
  const [business, setBusiness] = useState({
    businessName: session?.user?.businessName || '',
    industry: '',
    address: '',
    city: '',
    country: '',
    taxId: '',
    website: ''
  })

  // Password state
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    lowStockAlerts: true,
    orderUpdates: true,
    weeklyReports: false,
    marketingEmails: false
  })

  // Theme preferences
  const [theme, setTheme] = useState('dark')

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      alert('Profile saved! (API not implemented yet)')
    }, 1000)
  }

  const handleSaveBusiness = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      alert('Business settings saved! (API not implemented yet)')
    }, 1000)
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    if (password.newPassword !== password.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' })
      alert('Password changed! (API not implemented yet)')
    }, 1000)
  }

  const handleSaveNotifications = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      alert('Notification preferences saved! (API not implemented yet)')
    }, 1000)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'business', label: 'Business', icon: Building2 },
    { id: 'security', label: 'Security', icon: Lock },
  ]

  return (
    <section className='min-h-[90vh] bg-[#1a1a1e] w-full p-5'>
      <div className='mb-6'>
        <h1 className='md:text-2xl text-xl font-bold text-white text-left'>Settings</h1>
        <p className='text-gray-500 text-sm'>Manage your account and preferences</p>
      </div>

      <div className='grid md:grid-cols-4 grid-cols-1 gap-6'>
        {/* Sidebar Tabs */}
        <div className='md:col-span-1 bg-[#121214] rounded-2xl p-4 h-fit'>
          <nav className='flex flex-col gap-2'>
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${activeTab === tab.id
                      ? 'bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white'
                      : 'text-gray-400 hover:bg-[#2a2a2e] hover:text-white'
                    }`}
                >
                  <Icon className='w-5 h-5' />
                  <span className='font-medium'>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className='md:col-span-3 bg-[#121214] rounded-2xl p-6'>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className='space-y-6'>
              <div>
                <h2 className='text-xl font-bold text-white mb-2'>Profile Information</h2>
                <p className='text-gray-500 text-sm'>Update your personal details and information</p>
              </div>

              {/* Avatar Upload */}
              <div className='flex items-center gap-6 p-6 bg-[#2a2a2e] rounded-lg'>
                <div className='relative'>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Avatar"
                    className='w-24 h-24 rounded-full border-4 border-[#F0A728]'
                  />
                  <button className='absolute bottom-0 right-0 bg-[#F0A728] p-2 rounded-full hover:brightness-110 transition-all'>
                    <Camera className='w-4 h-4 text-white' />
                  </button>
                </div>
                <div>
                  <h3 className='text-white font-semibold'>{profile.name}</h3>
                  <p className='text-gray-400 text-sm'>{profile.email}</p>
                  <p className='text-xs text-gray-500 mt-1'>Role: {profile.role}</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className='space-y-4'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm text-gray-400'>Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm text-gray-400'>Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    />
                  </div>

                  <div className='flex flex-col gap-2'>
                    <label className='text-sm text-gray-400'>Role</label>
                    <input
                      type="text"
                      value={profile.role}
                      disabled
                      className='p-3 rounded-lg bg-[#1a1a1e] text-gray-500 cursor-not-allowed'
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='flex items-center gap-2 bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer'
                >
                  <Save className='w-5 h-5' />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* Business Tab */}
          {activeTab === 'business' && (
            <div className='space-y-6'>
              <div>
                <h2 className='text-xl font-bold text-white mb-2'>Business Information</h2>
                <p className='text-gray-500 text-sm'>Manage your business details and settings</p>
              </div>

              <form onSubmit={handleSaveBusiness} className='space-y-4'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                  <div className='flex flex-col gap-2 md:col-span-2'>
                    <label className='text-sm text-gray-400'>Business Name</label>
                    <input
                      type="text"
                      value={business.businessName}
                      onChange={(e) => setBusiness({ ...business, businessName: e.target.value })}
                      className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm text-gray-400'>Industry</label>
                    <select
                      value={business.industry}
                      onChange={(e) => setBusiness({ ...business, industry: e.target.value })}
                      className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    >
                      <option value="">Select Industry</option>
                      <option value="retail">Retail</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="services">Services</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm text-gray-400'>Tax ID / EIN</label>
                    <input
                      type="text"
                      value={business.taxId}
                      onChange={(e) => setBusiness({ ...business, taxId: e.target.value })}
                      placeholder='XX-XXXXXXX'
                      className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    />
                  </div>
                  <div className='flex flex-col gap-2 md:col-span-2'>
                    <label className='text-sm text-gray-400'>Business Address</label>
                    <input
                      type="text"
                      value={business.address}
                      onChange={(e) => setBusiness({ ...business, address: e.target.value })}
                      placeholder='Street address'
                      className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm text-gray-400'>City</label>
                    <input
                      type="text"
                      value={business.city}
                      onChange={(e) => setBusiness({ ...business, city: e.target.value })}
                      className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm text-gray-400'>Country</label>
                    <input
                      type="text"
                      value={business.country}
                      onChange={(e) => setBusiness({ ...business, country: e.target.value })}
                      className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    />
                  </div>
                  <div className='flex flex-col gap-2 md:col-span-2'>
                    <label className='text-sm text-gray-400'>Website</label>
                    <input
                      type="url"
                      value={business.website}
                      onChange={(e) => setBusiness({ ...business, website: e.target.value })}
                      placeholder='https://example.com'
                      className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='flex items-center gap-2 bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer'
                >
                  <Save className='w-5 h-5' />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className='space-y-6'>
              <div>
                <h2 className='text-xl font-bold text-white mb-2'>Security Settings</h2>
                <p className='text-gray-500 text-sm'>Manage your password and security preferences</p>
              </div>

              <form onSubmit={handleChangePassword} className='space-y-4 max-w-lg'>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm text-gray-400'>Current Password</label>
                  <input
                    type="password"
                    value={password.currentPassword}
                    onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
                    className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    required
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm text-gray-400'>New Password</label>
                  <input
                    type="password"
                    value={password.newPassword}
                    onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
                    className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    required
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm text-gray-400'>Confirm New Password</label>
                  <input
                    type="password"
                    value={password.confirmPassword}
                    onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
                    className='p-3 rounded-lg bg-[#2a2a2e] text-white focus:border-[#a34b27] focus:border focus:outline-none transition-all'
                    required
                  />
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='flex items-center gap-2 bg-linear-to-r from-[#a34b27] to-[#F0A728] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] hover:brightness-110 transition-all disabled:opacity-50 cursor-pointer'
                >
                  <Lock className='w-5 h-5' />
                  {loading ? 'Updating...' : 'Change Password'}
                </button>
              </form>

              <div className='p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mt-6'>
                <p className='text-yellow-500 text-sm'>
                  <strong>Security Tip:</strong> Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and symbols.
                </p>
              </div>
            </div>
          )}


        </div>
      </div>
    </section>
  )
}

export default page