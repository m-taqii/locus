# 🎯 Locus

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

**Master Your Inventory** — Precision. Control. Growth.

The operating system for modern commerce.

</div>

---

## 📖 Overview

**Locus** is a modern, feature-rich inventory management SaaS application designed for businesses that need precision control over their stock, users, and analytics. Built with Next.js 16 and a sleek, dark-themed UI with subtle GSAP animations, Locus provides an enterprise-grade solution wrapped in an intuitive interface.

---

## ✨ Features

### 🔐 Authentication & Security
- **NextAuth.js Integration** — Secure authentication with session management
- **Role-Based Access Control** — Admin and Staff roles with different permissions
- **Password Encryption** — bcrypt-powered password hashing
- **Protected Routes** — Middleware-based route protection

### 📦 Inventory Management
- **Product Tracking** — Track products with name, price, SKU, quantity, and images
- **Category Management** — Organize products by categories
- **Stock Thresholds** — Set minimum quantity thresholds for alerts
- **Status Management** — Active/Inactive product status

### 👥 User & Business Management
- **Multi-tenant Architecture** — Each business has its own isolated data
- **User Management** — Add and manage staff members within your business
- **Business Profiles** — Complete business profile with owner details

### 🎨 Modern UI/UX
- **Dark Theme** — Premium dark interface with amber/orange accent colors
- **GSAP Animations** — Smooth scroll-triggered animations and parallax effects
- **Responsive Design** — Fully responsive across all device sizes
- **Glassmorphism Effects** — Modern glass-panel UI elements

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16.1.3 (App Router) |
| **Frontend** | React 19.2.3 |
| **Styling** | TailwindCSS 4 |
| **Database** | MongoDB (Mongoose 9.1.4) |
| **Authentication** | NextAuth.js 4.24.13 |
| **Animations** | GSAP 3.14.2 |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |

---

## 📁 Project Structure

```
locus/
├── app/
│   ├── api/
│   │   └── auth/          # NextAuth API routes
│   ├── components/        # Reusable React components
│   │   ├── AddProducts.jsx
│   │   ├── AddUser.jsx
│   │   ├── Navbar.jsx
│   │   └── SessionWrapper.jsx
│   ├── dashboard/         # Dashboard pages
│   │   ├── inventory/     # Inventory management
│   │   ├── users/         # User management
│   │   ├── layout.js
│   │   └── page.js
│   ├── lib/               # Utility functions
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── globals.css
│   ├── layout.js
│   └── page.js            # Landing page
├── models/                # Mongoose models
│   ├── business.model.js
│   ├── logs.model.js
│   ├── product.model.js
│   └── user.model.js
├── public/                # Static assets
├── middleware.js          # Route protection
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **MongoDB** database (local or cloud like MongoDB Atlas)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/locus.git
   cd locus
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🗃️ Database Models

### Business
- Owner name, business name, email, password
- Role (default: Admin)
- Status (Active/Inactive)

### User
- Name, email, password
- Linked to Business (ObjectId reference)
- Role (Admin/Staff)
- Status (Active/Inactive)

### Product
- Name, price, SKU, quantity
- Category, image
- Minimum threshold
- Linked to User
- Status (Active/Inactive)

---

## 🎨 Design System

Locus uses a consistent design language:

- **Primary Colors**: Amber/Orange gradient (`#a34b27` → `#F0A728`)
- **Background**: Deep dark (`#0a050a`, `#1a1a1e`)
- **Accent**: Gold (`#F0A728`)
- **Text**: White with varying opacity for hierarchy

---

## 🔮 Roadmap

- [ ] Advanced analytics dashboard
- [ ] Real-time inventory notifications
- [ ] Export reports (PDF/CSV)
- [ ] Multi-location support
- [ ] Mobile app (React Native)
- [ ] AI-powered demand forecasting

---

## 📄 License

This project is currently open-source under the [MIT License](LICENSE).

> ⚠️ **Note**: This project is in active development and will eventually become a complete SaaS product. The licensing terms may change in future versions.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🚀 Future Plans

This project is currently a **public repository** serving as the foundation for a complete **SaaS inventory management platform**. Planned commercial features include:

- 💳 Subscription-based pricing tiers
- ☁️ Hosted cloud solution
- 🏢 Enterprise features & support
- 📱 Mobile applications
- 🔌 Third-party integrations (Shopify, WooCommerce, etc.)

Stay tuned for updates!

---

<div align="center">

**© 2026 Locus Inc. Crafted with precision.**

⭐ Star this repo if you find it useful!

</div>
