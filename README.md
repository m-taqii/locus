# 🎯 Locus - Inventory Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css)
![NextAuth](https://img.shields.io/badge/NextAuth-4.24.13-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Version](https://img.shields.io/badge/Version-0.3.0-orange)

**Master Your Inventory** — Precision. Control. Growth.

The operating system for modern commerce.

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 🆕 What's New in v0.3.0

✅ **Stock Management System** - Complete stock-in/stock-out functionality  
✅ **Activity Logging** - Full audit trail of all stock adjustments  
✅ **Stock History** - View recent adjustments with timestamps  
✅ **Search Functionality** - Search products by name or SKU  
✅ **Real-time Stock Validation** - Prevents negative stock levels  
✅ **Settings Page** - Basic settings page structure  
✅ **Enhanced Navigation** - Added "Manage Stocks" menu item  

**Phase 2 Features In Progress!** Core inventory tracking features are now live.

### Previous Updates (v0.2.0)

✅ **Full CRUD Implementation** - Complete Create, Read, Update, Delete for Products & Users  
✅ **Edit Modals** - Pre-populated forms for updating products and users  
✅ **Delete Confirmations** - Safety dialogs before permanent deletion  
✅ **Toast Notifications** - Real-time success/error feedback system  
✅ **Role-Based UI Controls** - Admin-only buttons for Add/Delete operations  
✅ **Enhanced UX** - Smoother user experience with loading states and auto-refresh  
✅ **API Routes Expansion** - Added PATCH and DELETE endpoints for dynamic routes  
✅ **Password Management** - Optional password updates in user edit (leave blank to keep current)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Models](#-database-models)
- [API Routes](#-api-routes)
- [Pages & Routes](#-pages--routes)
- [Components](#-components)
- [Authentication Flow](#-authentication-flow)
- [Design System](#-design-system)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Overview

**Locus** is a modern, full-stack inventory management SaaS application built with Next.js 16 (App Router), React 19, and MongoDB. It provides businesses with a comprehensive platform to manage their inventory, track products, manage users, and maintain detailed logs of inventory operations.

The application features a **dark-themed UI** with stunning **GSAP animations**, **glassmorphism effects**, and a premium amber/orange gradient color scheme that creates an engaging user experience.

### Key Highlights

- 🏢 **Multi-tenant Architecture** - Each business has its own isolated data
- 🔐 **Secure Authentication** - NextAuth.js with JWT session management
- 👥 **Role-Based Access Control** - Admin and Staff user roles with UI-level permissions
- 📦 **Complete Inventory Management** - Track products with categories, SKUs, and thresholds
- 📊 **Stock Management System** - Adjust inventory with stock-in/stock-out operations
- 📝 **Activity Logging** - Complete audit trail of all inventory movements
- 🔍 **Search & Filter** - Find products quickly by name or SKU
- 📱 **Real-time Updates** - Dynamic data fetching and instant UI refresh
- 🎨 **Modern UI/UX** - Scroll-triggered animations, parallax effects, and glassmorphism


---

## ✨ Features

### 🔐 Authentication & Security

- **NextAuth.js Integration** with credentials provider
- **JWT-based Session Management** with secure token handling
- **Dual Login System** - Supports both Business owners and Staff members
- **Password Encryption** using bcrypt (10 rounds of hashing)
- **Protected API Routes** with server-side session validation
- **Role-Based Access Control:**
  - **API Level:** Admin-only routes for create/delete operations
  - **UI Level:** Conditional rendering of Admin-only buttons
  - **Granular Permissions:** Staff can view/edit, Admins have full control
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

### 📊 Stock Management & Activity Logging

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
- **Lucide React 0.562.0** - Beautiful icon library
- **Axios 1.13.2** - HTTP client for API requests

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js 4.24.13** - Authentication solution
- **MongoDB** (via Mongoose 9.1.4) - NoSQL database
- **bcrypt 6.0.0** - Password hashing

### Development Tools
- **ESLint 9** - Code linting
- **PostCSS** - CSS processing
- **Tailwind PostCSS 4** - Tailwind processing

---

## 📁 Project Structure

```
locus/
├── app/                           # Next.js App Directory
│   ├── api/                       # API Routes
│   │   ├── auth/                  # Authentication endpoints
│   │   │   ├── [...nextauth]/    # NextAuth configuration
│   │   │   │   └── route.js       # Auth handler (credentials provider)
│   │   │   ├── registerBusiness/  # Business registration
│   │   │   │   └── route.js       # POST - Register new business
│   │   │   └── users/             # User management
│   │   │       ├── route.js       # GET/POST - Fetch/Create users
│   │   │       └── [id]/          # Dynamic user routes
│   │   │           └── route.js   # PATCH/DELETE - Update/Delete user
│   │   └── products/              # Product management
│   │       ├── route.js           # GET/POST - Fetch/Create products
│   │       └── [id]/              # Dynamic product routes
│   │           └── route.js       # PATCH/DELETE - Update/Delete product
│   └── stock-adjustments/     # Stock management
│       └── route.js           # GET/POST - Fetch/Create stock adjustments
│   │
│   ├── components/                # Reusable React components
│   │   ├── AddProducts.jsx        # Product creation modal form
│   │   ├── AddUser.jsx            # User creation modal form
│   │   ├── EditProduct.jsx        # Product edit modal form
│   │   ├── EditUser.jsx           # User edit modal form
│   │   ├── Toast.jsx              # Toast notification component
│   │   ├── Navbar.jsx             # Landing page navigation
│   │   └── SessionWrapper.jsx     # NextAuth session provider
│   │
│   ├── dashboard/                 # Protected dashboard area
│   │   ├── inventory/             # Inventory management page
│   │   │   └── page.js            # Products table with full CRUD
│   │   ├── manage-stocks/         # Stock adjustment page
│   │   │   └── page.js            # Stock-in/stock-out with history
│   │   ├── users/                 # User management page (Admin only)
│   │   │   └── page.js            # Users table with full CRUD
│   │   ├── settings/              # Settings page
│   │   │   └── page.js            # User/business settings (basic)
│   │   ├── layout.js              # Dashboard layout with sidebar
│   │   └── page.js                # Dashboard home/overview
│   │
│   ├── lib/                       # Utility functions
│   │   └── db.js                  # MongoDB connection utility
│   │
│   ├── login/                     # Login page
│   │   └── page.js                # Login form with NextAuth signIn
│   │
│   ├── register/                  # Registration page
│   │   └── page.js                # Business registration form
│   │
│   ├── globals.css                # Global styles and Tailwind imports
│   ├── layout.js                  # Root layout with SessionProvider
│   └── page.js                    # Landing page with GSAP animations
│
├── models/                        # Mongoose schemas
│   ├── business.model.js          # Business/Admin schema
│   ├── logs.model.js              # Old activity log schema (deprecated)
│   ├── product.model.js           # Product schema
│   ├── stockLogs.model.js         # Stock adjustment logs schema
│   └── user.model.js              # User/Staff schema
│
├── public/                        # Static assets
│   ├── logo.png                   # Locus logo
│   ├── dashboard.png              # Dashboard preview image
│   └── analytics.png              # Analytics visualization
│
├── .env                           # Environment variables (gitignored)
├── .gitignore                     # Git ignore rules
├── eslint.config.mjs              # ESLint configuration
├── jsconfig.json                  # JavaScript configuration
├── next.config.mjs                # Next.js configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.mjs             # PostCSS configuration
└── README.md                      # This file
```

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
   npm install
   # or
   yarn install
   # or
   pnpm install
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
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
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
| `NEXTAUTH_URL` | Base URL of the application | `http://localhost:3000` | ✅ Yes |

### Development vs Production

**Development (.env.local):**
```env
MONGODB_URI=mongodb://localhost:27017/locus
NEXTAUTH_SECRET=dev-secret-key-not-for-production
NEXTAUTH_URL=http://localhost:3000
```

**Production (.env.production):**
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/locus?retryWrites=true&w=majority
NEXTAUTH_SECRET=strong-production-secret-key-32chars+
NEXTAUTH_URL=https://yourdomain.com
```

---

## 🗃️ Database Models

### 1. Business Model
**File:** `models/business.model.js`

Stores business/admin account information.

```javascript
{
  ownerName: String (required),      // Owner's full name
  businessName: String (required),   // Business/company name
  email: String (required, unique),  // Login email
  password: String (required),       // Bcrypt hashed password
  role: String (default: "Admin"),   // User role
  status: String (default: "Active"), // Account status
  createdAt: Date,                   // Auto-generated
  updatedAt: Date                    // Auto-generated
}
```

**Relationships:**
- One-to-Many with Users (business owner → staff members)
- One-to-Many with Products (business → inventory items)

---

### 2. User Model
**File:** `models/user.model.js`

Stores staff member information within a business.

```javascript
{
  name: String (required),                          // User's full name
  business: ObjectId (required, ref: "Business"),   // Link to Business
  email: String (required, unique, 6-320 chars),    // Login email
  password: String (required, min 6 chars),         // Bcrypt hashed
  role: String (enum: ["admin", "staff"], default: "admin"),
  status: String (enum: ["active", "inactive"], default: "active"),
  createdAt: Date,                                  // Auto-generated
  updatedAt: Date                                   // Auto-generated
}
```

**Relationships:**
- Many-to-One with Business (multiple users → one business)
- One-to-Many with Products (user → products they manage)
- One-to-Many with Logs (user → activity logs)

---

### 3. Product Model
**File:** `models/product.model.js`

Stores inventory product information.

```javascript
{
  user: ObjectId (required, ref: "User"),      // Product owner/creator
  name: String (required),                     // Product name
  price: Number (required),                    // Product price
  sku: String (required),                      // Stock Keeping Unit
  quantity: Number (required),                 // Current stock quantity
  minThreshold: Number (required),             // Alert threshold
  category: String (required),                 // Product category
  image: String (required),                    // Image URL (placeholder)
  status: String (enum: ["active", "inactive"], default: "active"),
  createdAt: Date,                             // Auto-generated
  updatedAt: Date                              // Auto-generated
}
```

**Relationships:**
- Many-to-One with User (products → created by user)
- One-to-Many with Logs (product → activity logs)

**Categories:**
- Electronics, Clothing, Home & Kitchen, Beauty & Personal Care
- Sports & Fitness, Books, Toys & Games, Furniture
- Health & Safety, Others

---

### 4. StockLogs Model ✅ IMPLEMENTED
**File:** `models/stockLogs.model.js`

Tracks all stock adjustments and inventory movements.

```javascript
{
  userId: ObjectId (required, ref: "User"),       // Who made the adjustment
  product: ObjectId (required, ref: "Product"),   // Which product
  productName: String (required),                 // Product name snapshot
  quantity: Number (required),                    // Amount adjusted
  type: String (enum: ["stock-in", "stock-out"], required), // Adjustment type
  reason: String (default: "Stock adjustment"),   // Optional reason/notes
  previousQuantity: Number (required),            // Stock before adjustment
  newQuantity: Number (required),                 // Stock after adjustment
  createdAt: Date,                                // Auto-generated timestamp
  updatedAt: Date                                 // Auto-generated
}
```

**Features:**
- Complete audit trail of all inventory changes
- Captures before/after quantities for verification
- Supports custom reasons for adjustments
- Automatic timestamp tracking
- Used for "Manage Stocks" page history view

---

## 🛣️ API Routes

### Authentication Routes

#### `POST /api/auth/registerBusiness`
**File:** `app/api/auth/registerBusiness/route.js`

Register a new business account.

**Request Body:**
```json
{
  "ownerName": "John Doe",
  "businessName": "Acme Corp",
  "email": "john@acme.com",
  "password": "securePassword123"
}
```

**Response (Success):**
```json
{
  "message": "Business created",
  "ok": true,
  "businessId": "507f1f77bcf86cd799439011"
}
```

**Validations:**
- Email format validation (regex)
- Password minimum 6 characters
- All fields required
- Email uniqueness check

---

#### `POST /api/auth/users`
**File:** `app/api/auth/users/route.js`

Create a new user (staff member) under the logged-in business.

**Headers:** Requires authenticated session

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@acme.com",
  "password": "password123",
  "role": "staff",
  "status": "active"
}
```

**Response (Success):**
```json
{
  "message": "User created",
  "ok": true,
  "userId": "507f1f77bcf86cd799439012"
}
```

**Validations:**
- Must be authenticated
- Email format validation
- Password minimum 6 characters
- Name minimum 3 characters
- Email uniqueness check
- User linked to business via session

---

#### `GET /api/auth/users`
**File:** `app/api/auth/users/route.js`

Fetch all users belonging to the logged-in business.

**Headers:** Requires authenticated session

**Response (Success):**
```json
{
  "users": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "email": "jane@acme.com",
      "role": "staff",
      "status": "active",
      "business": "507f1f77bcf86cd799439011",
      "createdAt": "2026-01-24T10:00:00.000Z",
      "updatedAt": "2026-01-24T10:00:00.000Z"
    }
  ]
}
```

---

#### `POST /api/auth/[...nextauth]`
**File:** `app/api/auth/[...nextauth]/route.js`

NextAuth.js authentication handler (credentials provider).

**Login Process:**
1. Checks User collection first
2. If not found, checks Business collection
3. Validates password with bcrypt
4. Returns user data with session

**Session Structure:**
```javascript
{
  user: {
    id: "507f1f77bcf86cd799439011",
    email: "john@acme.com",
    role: "Admin",
    businessId: "507f1f77bcf86cd799439011",
    businessName: "Acme Corp",
    name: "John Doe",         // For staff users
    ownerName: "John Doe"     // For business owners
  }
}
```

---

### Product Routes

#### `GET /api/products`
**File:** `app/api/products/route.js`

Fetch all products for the logged-in user's business.

**Headers:** Requires authenticated session

**Response (Success):**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Laptop",
      "price": 999.99,
      "sku": "SKU-12345",
      "quantity": 50,
      "minThreshold": 10,
      "category": "Electronics",
      "image": "placeholder-url",
      "status": "active",
      "owner": "507f1f77bcf86cd799439011",
      "createdAt": "2026-01-25T10:00:00.000Z",
      "updatedAt": "2026-01-25T10:00:00.000Z"
    }
  ],
  "message": "Products fetched successfully"
}
```

**Query Logic:**
- Finds products where owner is either the user ID or business ID
- Supports both admin and staff access

---

#### `POST /api/products`
**File:** `app/api/products/route.js`

Create a new product.

**Headers:** Requires authenticated session (Admin only)

**Request Body:**
```json
{
  "name": "Laptop",
  "price": 999.99,
  "quantity": 50,
  "minThreshold": 10,
  "sku": "SKU-12345",
  "category": "Electronics",
  "status": "active"
}
```

**Response (Success):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Laptop",
  "price": 999.99,
  "sku": "SKU-12345",
  "quantity": 50,
  "minThreshold": 10,
  "category": "Electronics",
  "image": "placeholder-url",
  "status": "active",
  "owner": "507f1f77bcf86cd799439011",
  "message": "Product created successfully"
}
```

**Authorization:**
- Requires "Admin" or "admin" role
- Product automatically linked to the creator

---

#### `PATCH /api/products/${id}`
**File:** `app/api/products/[id]/route.js`

Update an existing product.

**Headers:** Requires authenticated session (Admin only)

**URL Parameters:**
- `id` - MongoDB ObjectId of the product to update

**Request Body:**
```json
{
  "name": "Updated Laptop Name",
  "price": 1099.99,
  "quantity": 45,
  "minThreshold": 15,
  "sku": "SKU-12345",
  "category": "Electronics",
  "status": "active"
}
```

**Response (Success):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Updated Laptop Name",
  "price": 1099.99,
  "sku": "SKU-12345",
  "quantity": 45,
  "minThreshold": 15,
  "category": "Electronics",
  "status": "active",
  "updatedAt": "2026-01-25T12:00:00.000Z"
}
```

**Validations:**
- Valid MongoDB ObjectId format
- User must be Admin
- All existing validations apply

---

#### `DELETE /api/products/${id}`
**File:** `app/api/products/[id]/route.js`

Delete a product permanently.

**Headers:** Requires authenticated session (Admin only)

**URL Parameters:**
- `id` - MongoDB ObjectId of the product to delete

**Response (Success):**
```json
{
  "message": "Product deleted successfully"
}
```

**Response (Error - Not Found):**
```json
{
  "message": "Product not found"
}
```

**Validations:**
- Valid MongoDB ObjectId format
- User must be Admin
- Product must exist

---

#### `PATCH /api/auth/users/${id}`
**File:** `app/api/auth/users/[id]/route.js`

Update an existing user.

**Headers:** Requires authenticated session (Admin only)

**URL Parameters:**
- `id` - MongoDB ObjectId of the user to update

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@email.com",
  "password": "",
  "role": "staff",
  "status": "active"
}
```

**Note:** Leave password field empty to keep existing password. If password is provided, it will be hashed before updating.

**Response (Success):**
```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Updated Name",
    "email": "updated@email.com",
    "role": "staff",
    "status": "active",
    "updatedAt": "2026-01-25T12:00:00.000Z"
  }
}
```

**Validations:**
- Valid MongoDB ObjectId format
- User must be Admin
- Password hashed automatically if provided

---

#### `DELETE /api/auth/users/${id}`
**File:** `app/api/auth/users/[id]/route.js`

Delete a user permanently.

**Headers:** Requires authenticated session (Admin only)

**URL Parameters:**
- `id` - MongoDB ObjectId of the user to delete

**Response (Success):**
```json
{
  "message": "User deleted successfully"
}
```

**Response (Error - Not Found):**
```json
{
  "message": "User not found"
}
```

**Validations:**
- Valid MongoDB ObjectId format
- User must be Admin
- User must exist

---

### Stock Management Routes

#### `POST /api/stock-adjustments`
**File:** `app/api/stock-adjustments/route.js`

Create a new stock adjustment (add or remove inventory).

**Headers:** Requires authenticated session

**Request Body:**
```json
{
  "productId": "507f1f77bcf86cd799439013",
  "quantity": 50,
  "type": "stock-in",
  "reason": "New shipment from supplier"
}
```

**Response (Success):**
```json
{
  "message": "Stock added successfully",
  "adjustment": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "product": "507f1f77bcf86cd799439013",
    "productName": "Laptop",
    "quantity": 50,
    "type": "stock-in",
    "reason": "New shipment from supplier",
    "previousQuantity": 100,
    "newQuantity": 150,
    "createdAt": "2026-01-26T10:00:00.000Z"
  },
  "product": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Laptop",
    "quantity": 150
  }
}
```

**Response (Error - Insufficient Stock):**
```json
{
  "message": "Insufficient stock. Current quantity: 10"
}
```

**Validations:**
- Product ID, quantity, and type are required
- Quantity must be greater than 0
- Type must be "stock-in" or "stock-out"
- For stock-out: validates sufficient quantity available
- Product must exist

**Features:**
- Automatically updates product quantity
- Creates audit log entry
- Prevents negative stock levels

---

#### `GET /api/stock-adjustments`
**File:** `app/api/stock-adjustments/route.js`

Fetch all stock adjustments with optional filtering.

**Headers:** Requires authenticated session

**Query Parameters:**
- `limit` (optional) - Number of records to return (default: 50)
- `productId` (optional) - Filter by specific product

**Response (Success):**
```json
{
  "adjustments": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "userId": "507f1f77bcf86cd799439011",
      "product": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Laptop",
        "sku": "SKU-12345"
      },
      "productName": "Laptop",
      "quantity": 50,
      "type": "stock-in",
      "reason": "New shipment from supplier",
      "previousQuantity": 100,
      "newQuantity": 150,
      "createdAt": "2026-01-26T10:00:00.000Z",
      "updatedAt": "2026-01-26T10:00:00.000Z"
    }
  ]
}
```

**Features:**
- Returns most recent adjustments first
- Populates product details
- Supports pagination via limit
- Can filter by product

---

## 📄 Pages & Routes

### Public Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.js` | **Landing Page** - Hero section, features, CTA with GSAP animations |
| `/login` | `app/login/page.js` | **Login Page** - Email/password form with NextAuth integration |
| `/register` | `app/register/page.js` | **Registration Page** - Business signup form |

### Protected Pages (Requires Authentication)

| Route | File | Description | Access |
|-------|------|-------------|--------|
| `/dashboard` | `app/dashboard/page.js` | **Dashboard Home** - Overview with welcome message | All Users |
| `/dashboard/inventory` | `app/dashboard/inventory/page.js` | **Inventory Management** - Products table, add/edit/delete | All Users |
| `/dashboard/manage-stocks` | `app/dashboard/manage-stocks/page.js` | **Stock Management** - Adjust inventory, view history | All Users |
| `/dashboard/users` | `app/dashboard/users/page.js` | **User Management** - Staff table, add/edit/delete | **Admin Only** |
| `/dashboard/settings` | `app/dashboard/settings/page.js` | **Settings** - User/business settings (basic structure) | All Users |

---

## 🧩 Components

### Landing Page Components

#### `Navbar.jsx`
**Location:** `app/components/Navbar.jsx`

**Features:**
- Responsive navigation bar
- Logo linking to home
- Dynamic auth state (Login/Register vs Dashboard)
- Session-aware display
- Gradient hover effects

**Usage:**
```jsx
import Navbar from '@/app/components/Navbar'

<Navbar />
```

---

### Dashboard Components

#### `SessionWrapper.jsx`
**Location:** `app/components/SessionWrapper.jsx`

**Features:**
- Wraps app with NextAuth SessionProvider
- Enables `useSession` hook throughout app

**Usage:**
```jsx
import SessionWrapper from '@/app/components/SessionWrapper'

<SessionWrapper>
  {children}
</SessionWrapper>
```

---

#### `AddProducts.jsx`
**Location:** `app/components/AddProducts.jsx`

**Features:**
- Modal overlay with glassmorphism
- Product creation form with validations
- Real-time form state management
- Category dropdown (10 categories)
- Status toggle (Active/Inactive)
- Loading states and error handling
- Click-outside-to-close functionality

**Props:**
- `setAddProductOpen(boolean)` - Function to toggle modal visibility

**Form Fields:**
- Product Name (text, required)
- Price (number, required)
- Quantity (number, required)
- Minimum Threshold (number, required)
- SKU (text, required, format: SKU-XXXXX)
- Category (select, required)
- Status (select, default: active)

---

#### `AddUser.jsx`
**Location:** `app/components/AddUser.jsx`

**Features:**
- Modal overlay for user creation
- Staff member registration form
- Role selection (Admin/Staff)
- Status selection (Active/Inactive)
- Automatic refresh on successful creation
- Password validation (min 6 chars)
- Email validation (regex)

**Props:**
- `setAddUserOpen(shouldRefetch)` - Function to toggle modal and trigger refetch

**Form Fields:**
- Name (text, required, min 3 chars)
- Email (email, required)
- Password (password, required, min 6 chars)
- Role (select: Admin/Staff)
- Status (select: Active/Inactive)

---

#### Dashboard Layout (`layout.js`)
**Location:** `app/dashboard/layout.js`

**Features:**
- **Collapsible Sidebar:**
  - Dashboard, Inventory, Users (Admin only), Settings
  - Icon-only mode when collapsed
  - Smooth width transitions
  - Active route highlighting
  - Logout button
- **Top Navigation:**
  - Logo (desktop)
  - Hamburger menu (mobile)
  - User avatar and name display
- **Responsive Design:**
  - Mobile: Overlay sidebar with backdrop
  - Desktop: Fixed sidebar with resize
- **Session Integration:**
  - Displays current user name
  - Role-based menu items

**Icons Used (Lucide):**
- `LayoutDashboard` - Dashboard
- `Package` - Inventory
- `Users` - User Management
- `Settings` - Settings
- `LogOut` - Logout
- `PanelRightOpen/Close` - Sidebar toggle

---

#### `EditProduct.jsx`
**Location:** `app/components/EditProduct.jsx`

**Features:**
- Modal overlay with glassmorphism for editing products
- Pre-populated form with existing product data
- Real-time form state management
- Category dropdown (10 categories)
- Status toggle (Active/Inactive)
- Toast notifications on success/error
- Automatic table refresh after update
- Loading states and error handling

**Props:**
- `setEditProductOpen(boolean)` - Function to toggle modal visibility
- `setToast(object)` - Function to show toast notifications
- `product(object)` - Product object to edit
- `fetchProducts()` - Function to refresh product list

**API Call:**
- PATCH `/api/products/${productId}` - Updates product

**Form Fields:**
- Product Name (text, required, pre-filled)
- Price (number, required, pre-filled)
- Quantity (number, required, pre-filled)
- Minimum Threshold (number, required, pre-filled)
- SKU (text, required, pre-filled)
- Category (select, required, pre-filled)
- Status (select, pre-filled)

---

#### `EditUser.jsx`
**Location:** `app/components/EditUser.jsx`

**Features:**
- Modal overlay for editing staff members
- Pre-populated form with user data
- Optional password update (leave blank to keep current)
- Role modification (Admin/Staff)
- Status modification (Active/Inactive)
- Toast notifications on success/error
- Automatic password hashing when changed
- Automatic table refresh after update

**Props:**
- `setEditUserOpen(boolean)` - Function to toggle modal visibility
- `user(object)` - User object to edit
- `fetchUsers()` - Function to refresh user list
- `setToast(object)` - Function to show toast notifications

**API Call:**
- PATCH `/api/auth/users/${userId}` - Updates user

**Form Fields:**
- Name (text, required, pre-filled)
- Email (email, required, pre-filled)
- Password (password, optional - leave blank to keep current)
- Role (select: Admin/Staff, pre-filled)
- Status (select: Active/Inactive, pre-filled)

---

#### `Toast.jsx`
**Location:** `app/components/Toast.jsx`

**Features:**
- Fixed position toast notifications (top-right corner)
- Success (green) and error (red) variants
- Auto-dismiss after configurable duration (default: 3s)
- Manual dismiss with close button
- Animated progress bar showing time remaining
- Slide-in animation on appear
- Glassmorphism backdrop with colored border
- Lucide icons (CheckCircle for success, XCircle for error)

**Props:**
- `message(string)` - The message to display
- `type(string)` - Either "success" or "error"
- `onClose(function)` - Callback to close toast
- `duration(number)` - Auto-dismiss time in ms (default: 3000)

**Usage:**
```jsx
const [toast, setToast] = useState(null)

// Show success toast
setToast({
  message: 'Product created successfully',
  type: 'success'
})

// Show error toast
setToast({
  message: 'Failed to create product',
  type: 'error'
})

// Render toast
{toast && (
  <Toast
    message={toast.message}
    type={toast.type}
    onClose={() => setToast(null)}
  />
)}
```

---

## 🔑 Authentication Flow

### Registration Flow

1. **User visits** `/register`
2. **Fills form:** Owner Name, Business Name, Email, Password
3. **Client validation:** Email format, password length
4. **POST request** to `/api/auth/registerBusiness`
5. **Server validation:** Email uniqueness, all fields present
6. **Password hashing:** bcrypt with 10 salt rounds
7. **Database insertion:** New Business document created
8. **Redirect to** `/dashboard` (or login)

---

### Login Flow

1. **User visits** `/login`
2. **Fills form:** Email, Password
3. **Client calls** `signIn("credentials", {...})`
4. **NextAuth handler** at `/api/auth/[...nextauth]`
5. **Checks User collection** → if not found, checks Business collection
6. **Password verification:** bcrypt compare
7. **JWT creation:** Session token with user data
8. **Session callbacks:** Add custom fields to session
9. **Redirect to** `/dashboard`

---

### Session Management

**Session Data Structure:**
```javascript
const session = {
  user: {
    id: "mongo-object-id",
    email: "user@example.com",
    role: "Admin" | "staff",
    businessId: "business-mongo-id",
    businessName: "Business Name",
    name: "User Name",           // Staff members
    ownerName: "Owner Name"      // Business owners
  },
  expires: "2026-02-25T00:00:00.000Z"
}
```

**Accessing Session:**
```javascript
// Client Component
import { useSession } from 'next-auth/react'

const { data: session, status } = useSession()
console.log(session?.user?.name)

// Server Component / API Route
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const session = await getServerSession(authOptions)
```

---

### Protected Routes

**Client-side Protection:**
```javascript
// Uses SessionProvider context
const { data: session } = useSession()
if (!session) router.push('/login')
```

**Server-side Protection:**
```javascript
// API routes validate session
const session = await getServerSession(authOptions)
if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
```

---

## 🎨 Design System

### Color Palette

**Primary Colors:**
```css
/* Amber/Orange Gradient */
--primary-start: #a34b27;
--primary-mid: #F0A728;
--primary-end: #9C2906;

/* Backgrounds */
--bg-dark: #0a050a;
--bg-card: #1a1a1e;
--bg-sidebar: #242529;

/* Text */
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.6);
--text-muted: rgba(255, 255, 255, 0.4);
```

**Usage Examples:**
```css
/* Gradient Button */
bg-linear-to-r from-[#a34b27] to-[#F0A728]

/* Gradient Text */
bg-linear-to-tl from-[#F0A728] to-[#9C2906] bg-clip-text text-transparent

/* Dark Background */
bg-[#1a1a1e]
```

---

### Typography

**Font Stack:**
- System fonts with Geist fallback (Next.js default)

**Text Sizes:**
```css
/* Headlines */
text-8xl (96px)  - Hero titles
text-6xl (60px)  - Section titles
text-4xl (36px)  - Modal titles
text-2xl (24px)  - Page titles

/* Body */
text-xl (20px)   - Large body
text-base (16px) - Default body
text-sm (14px)   - Small text
text-xs (12px)   - Labels
```

---

### Effects

**Glassmorphism:**
```css
/* Glass Panel */
backdrop-blur-md bg-white/5 border border-white/10

/* Strong Glass */
backdrop-blur-2xl bg-white/5 border border-white/15
```

**Shadows:**
```css
/* Glow Effect */
hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)]

/* Large Glow */
shadow-[0_10px_60px_rgba(163,75,39,0.7)]

/* Standard Shadow */
shadow-2xl shadow-[#a34b27]/20
```

**Animations:**
```css
/* GSAP Timeline */
- Fade in from opacity 0
- Slide from left/right (x: -50/50)
- Scale effects (scale: 0.8)
- Parallax scroll (scrub: 1)

/* CSS Transitions */
transition-all duration-300 ease-in-out
hover:brightness-110
hover:scale-105
```

---

### Components Styling

**Buttons:**
```jsx
// Primary Button
className="bg-linear-to-r from-[#a34b27] to-[#F0A728] 
           text-white px-5 py-2 rounded-xl 
           font-semibold 
           hover:shadow-[0_8px_25px_rgba(255,153,51,0.45)] 
           hover:brightness-110 
           transition-all duration-300 ease-in-out"

// Ghost Button
className="backdrop-blur-md bg-white/5 
           border border-white/10 
           text-white px-8 py-4 rounded-full
           hover:bg-white/10 
           hover:border-[#a34b27]/50"
```

**Input Fields:**
```jsx
className="p-2 rounded-lg 
           bg-white/10 
           focus:border-[#a34b27] 
           focus:border focus:outline-none 
           focus:shadow focus:shadow-[#a34b27] 
           transition-all duration-300 ease-in-out"
```

**Cards:**
```jsx
className="p-6 rounded-2xl 
           bg-white/5 
           border border-white/10 
           backdrop-blur-md"
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

**Development:**
```bash
npm run dev
```
- Runs on `http://localhost:3000`
- Hot Module Replacement (HMR) enabled
- Error overlay in browser

**Production:**
```bash
npm run build
npm run start
```
- Optimized bundle
- Server-side rendering
- Static page generation where applicable

---

## 🐛 Known Issues & Limitations

### Current State (v0.3.0)

**✅ Fully Implemented:**
- ✅ Business registration and authentication
- ✅ User management (Create, Read, Update, Delete)
- ✅ Product management (Create, Read, Update, Delete)
- ✅ Stock management & adjustments (Stock-In/Stock-Out)
- ✅ Activity logging (Complete audit trail)
- ✅ Stock history view with search
- ✅ Dashboard with collapsible sidebar navigation
- ✅ Landing page with GSAP animations
- ✅ Role-based access control (API & UI level)
- ✅ Session management with NextAuth
- ✅ Toast notifications for success/error feedback
- ✅ Delete confirmations for products and users
- ✅ Edit functionality for products and users
- ✅ Form validations
- ✅ Admin-only UI controls (Add/Delete buttons)
- ✅ Settings page (basic structure)

**❌ Not Yet Implemented:**
- ❌ Dashboard statistics/analytics
- ❌ Advanced filtering (by category, status, etc.)
- ❌ Settings page functionality (profile management, etc.)
- ❌ Image upload for products (currently uses placeholder)
- ❌ Password reset/recovery
- ❌ Email verification
- ❌ Pagination for tables
- ❌ Low stock alerts/notifications
- ❌ Export functionality (CSV/PDF)
- ❌ Bulk operations (multi-select delete/update)
- ❌ Product categories management (hardcoded list)
- ❌ Inventory reports

**Known Issues:**
- Product image field requires a value but doesn't support actual file uploads yet
- Toast notifications use fixed 3-second duration
- Mobile menu could benefit from scroll lock on body
- Some console.log statements remain in production code
- No email uniqueness validation in edit user form (could cause conflicts)

---

## 🗺️ Roadmap

### Phase 1: MVP Completion ✅ COMPLETE
- ✅ Basic authentication
- ✅ Product full CRUD (Create, Read, Update, Delete)
- ✅ User full CRUD (Create, Read, Update, Delete)
- ✅ Toast notifications
- ✅ Delete confirmations
- ✅ Form validation improvements
- ✅ Role-based UI controls

### Phase 2: Core Features (In Progress)
- ✅ Activity logging implementation
- ✅ Stock adjustment system (Stock-in/Stock-out)
- ✅ Search products (by name/SKU)
- [ ] Dashboard analytics/statistics
- [ ] Low stock alerts/notifications
- [ ] Advanced filtering (category, status, date range)
- [ ] Pagination for large datasets
- [ ] Bulk operations

### Phase 3: Enhanced UX
- [ ] Image upload for products
- [ ] Settings page completion (profile, business settings, preferences)
- ✅ Settings page structure (basic)
- [ ] Password reset functionality
- [ ] Email notifications
- [ ] Export data (CSV, PDF)
- [ ] Print-friendly views

### Phase 4: Advanced Features
- [ ] Barcode scanning
- [ ] QR code generation for products
- [ ] Multi-location inventory
- [ ] Supplier management
- [ ] Purchase orders
- [ ] Sales tracking
- [ ] Reports and analytics
- [ ] API documentation
- [ ] Webhook support

### Phase 5: SaaS Transformation
- 💳 **Subscription-based pricing** (Stripe integration)
- ☁️ **Hosted cloud solution** (Vercel/AWS deployment)
- 🏢 **Enterprise features:**
  - SSO (Single Sign-On)
  - Advanced permissions
  - Audit logs
  - SLA guarantees
  - Priority support
- 🔌 **Third-party integrations:**
  - Shopify, WooCommerce
  - QuickBooks, Xero
  - Slack, Discord notifications
  - Zapier/Make automation

---

## 🤝 Contributing

Contributions are welcome! This project is currently open-source and we encourage community involvement.

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

### Development Guidelines

**Code Style:**
- Use functional components and hooks
- Follow Next.js best practices
- Use meaningful variable names
- Add JSDoc comments for functions

**Commit Messages:**
```
feat: Add user profile page
fix: Resolve login redirect bug
docs: Update API documentation
style: Format code with Prettier
refactor: Simplify product fetch logic
test: Add unit tests for auth
```

**Testing:**
- Test all user flows
- Check mobile responsiveness
- Verify authentication works
- Test with different roles (Admin, Staff)

---

## 📄 License

This project is currently open-source under the [MIT License](LICENSE).

> **⚠️ Note:** This project is in active development and will eventually become a complete SaaS product. The licensing terms may change in future versions as we transition to a commercial model.

**MIT License Summary:**
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ Private use allowed
- ⚠️ No warranty provided

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Vercel** - For hosting and deployment platform
- **MongoDB** - For the flexible NoSQL database
- **NextAuth.js** - For authentication made simple
- **GSAP** - For professional animations
- **Lucide** - For beautiful icons
- **TailwindCSS** - For utility-first styling

---

## 🚀 Future Plans

This project is currently a **public repository** serving as the foundation for a complete **SaaS inventory management platform**. 

### Planned Commercial Features

When we transition to SaaS:

- 💳 **Subscription Tiers:**
  - Free: 50 products, 1 user
  - Starter: 500 products, 5 users - $29/month
  - Professional: 5000 products, 25 users - $99/month
  - Enterprise: Unlimited - Custom pricing

- ☁️ **Fully Hosted Solution:**
  - No setup required
  - Automatic updates
  - 99.9% uptime SLA
  - Global CDN

- 🏢 **Enterprise Add-ons:**
  - White-label branding
  - Dedicated support
  - Custom integrations
  - On-premise deployment

- 🔌 **Marketplace Integrations:**
  - Shopify, WooCommerce, Magento
  - Amazon, eBay, Etsy
  - QuickBooks, Xero, Stripe
  - Zapier, Make, n8n

**Stay tuned for updates!**

---

<div align="center">

**© 2026 Locus. Crafted with precision.**

⭐ **Star this repo** if you find it useful!

[Website](https://iamtaqi.site) · [Twitter](https://x.com/myself_mtaqi) · [LinkedIn](https://linkedin.com/in/m-taqii)

</div>
