# 🎯 Locus - Inventory Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css)
![NextAuth](https://img.shields.io/badge/NextAuth-4.24.13-blue)
![Recharts](https://img.shields.io/badge/Recharts-3.7.0-ff7300)
![Resend](https://img.shields.io/badge/Resend-Email-purple)
![License](https://img.shields.io/badge/License-MIT-green)
![Version](https://img.shields.io/badge/Version-0.9.0-orange)

**Master Your Inventory** — Precision. Control. Growth.

The operating system for modern commerce.


</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

**Locus** is a modern, full-stack inventory management SaaS application built with Next.js 16 (App Router), React 19, and MongoDB. It provides businesses with a comprehensive platform to manage their inventory, track products, manage users, and maintain detailed logs of inventory operations.

The application features a **dark-themed UI** with stunning **GSAP animations**, **glassmorphism effects**, and a premium amber/orange gradient color scheme that creates an engaging user experience.

### Key Highlights

- 🏢 **Multi-tenant Architecture** - Each business has its own isolated data
- 🔐 **Secure Authentication** - NextAuth.js with JWT session management
- ✉️ **Email Verification** - OTP-based verification with Resend email service
- 🔑 **Password Reset** - Forgot password with secure token-based reset flow
- 👥 **User Invitation System** - Email invitations with self-service activation
- 📈 **Business Insights** - Charts, health scores, and inventory analytics
- 🎭 **Role-Based Access Control** - Owner, Admin, and Staff roles with UI-level permissions
- 📦 **Complete Inventory Management** - Track products with categories, SKUs, and thresholds
- 📊 **Dashboard Analytics** - Real-time statistics, sales tracking, and performance metrics
- 📉 **Interactive Charts** - Line and bar charts powered by Recharts
- 📄 **Pagination** - Backend pagination for products and users with customizable page sizes
- 🚨 **Low Stock Alerts** - Visual alerts for products below minimum threshold
- 🏆 **Staff Leaderboard** - Track top performing staff by sales
- 📝 **Activity Logging** - Complete audit trail of all inventory movements
- 🔍 **Search & Filter** - Find products quickly by name or SKU
- ⚙️ **Settings Management** - Complete profile, business, and security settings
- 📱 **Mobile Navigation** - Responsive hamburger menu with slide-out panel
- 🎨 **Modern UI/UX** - Scroll-triggered animations, parallax effects, and glassmorphism

---

## ✨ Features

### 🔐 Authentication & Security

- **NextAuth.js Integration** with credentials provider
- **JWT-based Session Management** with secure token handling
- **Email Verification System:**
  - 6-digit OTP sent via email during registration
  - 10-minute expiry for security
  - Resend OTP with 60-second rate limiting
  - Professional branded email templates
  - Resend email service integration
- **Password Reset System:**
  - Forgot password page at `/login/forgot-password`
  - Secure token-based reset with 1-hour expiry
  - Reset password page with token validation
  - Works for both Business owners and Staff
  - Professional reset email templates
- **User Invitation System:**
  - Email-based team member invitations
  - Invitation page at `/invitation` for onboarding
  - 7-day token expiry for security
  - Self-service password creation
  - Users start as "pending" until activated
  - Role assignment during invitation (Admin/Staff)
- **Dual Login System** - Supports both Business owners and Staff members
- **Password Encryption** using bcrypt (10 rounds of hashing)
- **Protected API Routes** with server-side session validation
- **Role-Based Access Control:**
  - **Owner Role:** Full business access, sees all users including Admins
  - **Admin Role:** Manage users and products, can only see Staff (not other Admins)
  - **Staff Role:** View products, perform stock operations, see personal stats
  - **API Level:** Owner/Admin-only routes for create/delete operations
  - **UI Level:** Conditional rendering based on user role
- **Admin User Visibility:** Admins are hidden from other Admins (Owner-only visibility)
- **Admin Restriction:** Admins cannot create other Admins (Owner-only privilege)
- **Session Callbacks** for custom user data in sessions

### 📦 Inventory Management

- **Product CRUD Operations** - Full Create, Read, Update, Delete functionality
- **Role-Based UI Controls:**
  - **Admin Only:** Add Product, Delete Product buttons
  - **All Users:** View products, Edit products
- **Edit Modal** - Pre-populated form for updating products
- **Delete Confirmation** - Modal dialog before permanent deletion (Admin only)
- **Toast Notifications** - Success/error feedback for all actions
- **Product Attributes:**
  - Name, Price, SKU (Stock Keeping Unit)
  - Quantity tracking
  - Minimum threshold alerts
  - Category assignment
  - Status management (Active/Inactive)
  - Product images (placeholder support)
- **Category System** with predefined categories:
  - Electronics, Clothing, Home & Kitchen
  - Beauty & Personal Care, Sports & Fitness
  - Books, Toys & Games, Furniture
  - Health & Safety, Others
- **Inventory Table View** with role-based action buttons
- **Real-time Updates** - Table refreshes after CRUD operations
- **Loading States** - User feedback during async operations

### 👥 User & Business Management

- **Business Registration** - Owner name, business name, email, password
- **Multi-User Support** - Admins can add multiple staff members
- **User Management Dashboard** - Full CRUD for staff members
- **Edit Modal** - Update user details including optional password change
- **Delete Confirmation** - Modal dialog before permanent deletion
- **Toast Notifications** - Success/error feedback for all actions
- **User Attributes:**
  - Name, Email, Password (hashed)
  - Role (Admin/Staff)
  - Status (Active/Inactive)
  - Business association (ObjectId reference)
- **Business Isolation** - Users can only see data from their own business
- **Admin-Only Features** - User management restricted to admins

### 📊 Dashboard Analytics

- **Statistics Cards:**
  - Active Users count (Owner/Admin only)
  - Total Sales (stock-out quantities)
  - Total Products in inventory
- **Low Stock Alerts Section:**
  - Visual list of products below minimum threshold
  - Shows current quantity and minimum threshold
  - Color-coded warnings (red for critical)
  - Category display for quick identification
- **Best Selling Staff Leaderboard (Owner/Admin only):**
  - Top 3 staff members ranked by sales
  - Gold, Silver, Bronze ranking indicators
  - Total sales count per staff member
  - Visual icons (Trophy, Medal, Award)
- **Role-Based Dashboard Views:**
  - **Owner/Admin:** See all team statistics and leaderboard
  - **Staff:** See personal sales and available products
- **Real-time Data:** Dashboard refreshes with latest data on load
- **Quick Actions:** Add Product button from dashboard (Owner/Admin only)

### � Business Insights

- **Insights Page** - Dedicated `/dashboard/insights` analytics page
- **Interactive Charts (Recharts):**
  - **Line Chart:** Sales vs Returns trend over time
  - **Bar Chart:** Top products by stock quantity
  - Responsive design with tooltips and legends
- **Inventory Health Score:**
  - 0-100% overall health rating
  - Color-coded display (green/yellow/red)
  - Calculated from dead stock, overstock, and low stock counts
- **Key Metrics:**
  - **Turnover Rate:** Monthly inventory turnover calculation
  - **Avg. Days in Stock:** Average holding time for products
  - **Dead Stock Count:** Products with no sales in 30+ days
  - **Overstock Count:** Products above 3x minimum threshold
- **Stock Analysis:**
  - **Fast Moving Stock:** Products selling above average velocity
  - **Slow Moving Stock:** Products selling below average velocity
  - **Dead Stock Alerts:** Products needing attention
- **Date Range Filter:**
  - Last 7 Days
  - Last 30 Days
  - Last 90 Days
  - This Year
- **Real-time Refresh:** Manual refresh button for latest data
- **Loading States:** Skeleton loading and error handling

### �📊 Stock Management & Activity Logging

- **Stock Adjustment System** - Manually adjust inventory levels
- **Stock-In Operations:**
  - Add new inventory (shipments, restocking)
  - Optional reason/notes for adjustments
  - Real-time stock updates
- **Stock-Out Operations:**
  - Remove inventory (sales, damage, theft)
  - Validation to prevent negative stock  
  - Automatic quantity updates
- **Activity Logging:**
  - Complete audit trail of all adjustments
  - Tracks: User, Product, Quantity, Type, Reason
  - Records previous and new quantities
  - Timestamps for every transaction
- **Stock History View:**
  - Recent 10 adjustments displayed
  - Color-coded (green for in, red for out)
  - Filterable by product
  - Sortable by date (newest first)
- **Search Functionality:**
  - Search products by name or SKU
  - Real-time filter as you type
  - Shows current stock levels
- **Stock Validation:**
  - Prevents stock going below zero
  - Shows available quantity
  - Displays minimum threshold warnings

### 🎨 UI/UX Features

- **Landing Page** with GSAP scroll animations:
  - Hero section with gradient text
  - Animated dashboard preview
  - Feature sections (Analytics & Security)
  - Parallax scrolling effects
  - Call-to-action sections
- **Dark Theme** throughout the application
- **Glassmorphism Effects** - Frosted glass panels with backdrop blur
- **Gradient Backgrounds** - Ambient circular gradients
- **Responsive Sidebar** - Collapsible navigation with smooth transitions
- **Modal Forms** - Overlay modals for adding products and users
- **Loading States** - User feedback during async operations
- **Error Handling** - User-friendly error messages
- **Lucide Icons** - Clean, modern iconography

### 📱 Responsive Design

- **Mobile-First Approach**
- **Adaptive Layouts** - Different layouts for mobile, tablet, and desktop
- **Mobile Menu** - Touch-friendly navigation
- **Responsive Tables** - Optimized data display on smaller screens
- **Flexible Typography** - Scales appropriately across devices

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.3** - React framework with App Router
- **React 19.2.3** - UI library with latest features
- **TailwindCSS 4** - Utility-first CSS framework
- **GSAP 3.14.2** - Professional-grade animation library
- **@gsap/react 2.1.2** - GSAP React integration
- **Recharts 3.7.0** - Composable charting library
- **Lucide React 0.562.0** - Beautiful icon library
- **Axios 1.13.2** - HTTP client for API requests

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js 4.24.13** - Authentication solution
- **MongoDB** (via Mongoose 9.1.4) - NoSQL database
- **bcrypt 6.0.0** - Password hashing
- **Resend** - Email service provider

### Development Tools
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing
- **Tailwind PostCSS 4** - Tailwind processing

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **MongoDB** - Local installation or MongoDB Atlas account ([Setup Guide](https://www.mongodb.com/docs/manual/installation/))
- **npm**, **yarn**, **pnpm**, or **bun** package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/m-taqii/locus.git
   cd locus
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up MongoDB**
   
   - **Option A: Local MongoDB**
     ```bash
     # Start MongoDB service
     # Windows: Run MongoDB as a service
     # macOS/Linux: 
     mongod --dbpath /path/to/data/directory
     ```
   
   - **Option B: MongoDB Atlas** (Cloud)
     - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
     - Get your connection string

4. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/locus
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/locus
   
   # NextAuth Configuration
   NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
   NEXTAUTH_URL=http://localhost:3000
   ```
   
   > **⚠️ Security Note:** Generate a secure random string for `NEXTAUTH_SECRET` using:
   > ```bash
   > openssl rand -base64 32
   > ```

5. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

6. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

7. **Create your first account**
   
   - Click "Get Started" or "Register"
   - Fill in business details
   - You'll be redirected to the dashboard

---

## 🔐 Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/locus` | ✅ Yes |
| `NEXTAUTH_SECRET` | Secret key for JWT encryption | `random-32-char-string` | ✅ Yes |
| `NEXTAUTH_URL` | Base URL for NextAuth | `http://localhost:3000` | ✅ Yes |
| `APP_URL` | Public URL for invitation/reset links | `http://localhost:3000` | ✅ Yes |
| `RESEND_API_KEY` | Resend API key for emails | `re_xxxxxxxxxxxxx` | ✅ Yes |
| `EMAIL_FROM` | Sender email address | `Locus <noreply@yourdomain.com>` | ✅ Yes |

### Development vs Production

**Development (.env.local):**
```env
MONGODB_URI=mongodb://localhost:27017/locus
NEXTAUTH_SECRET=dev-secret-key-not-for-production
NEXTAUTH_URL=http://localhost:3000
APP_URL=http://localhost:3000
RESEND_API_KEY=re_your_api_key
EMAIL_FROM=Locus <onboarding@resend.dev>
```

**Production (.env.production):**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/locus?retryWrites=true&w=majority
NEXTAUTH_SECRET=strong-production-secret-key-32chars+
NEXTAUTH_URL=https://yourdomain.com
APP_URL=https://yourdomain.com
RESEND_API_KEY=re_production_api_key
EMAIL_FROM=Locus <noreply@yourdomain.com>
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on port 3000 |
| `pnpm build` | Build production bundle |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint for code quality |

> **Note:** You can also use `npm run`, `yarn`, or `bun` instead of `pnpm`.

**Development:**
```bash
pnpm dev
# or: npm run dev / bun dev
```
- Runs on `http://localhost:3000`

**Production:**
```bash
pnpm build
pnpm start
# or: npm run build && npm run start
```
- Optimized bundle
- Server-side rendering
- Static page generation where applicable

---

## 🤝 Contributing

Contributions are welcome! This project is open-source and we encourage community involvement.

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/locus.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add comments where necessary

4. **Test your changes**
   ```bash
   npm run dev
   # Test thoroughly in browser
   ```

5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe what you changed
   - Reference any related issues


## 📄 License

This project is licensed under the [MIT License](LICENSE).

**MIT License Summary:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
