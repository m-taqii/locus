"use client"
import Navbar from "../components/Navbar"
import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"

export default function PrivacyPolicyPage() {
    const lastUpdated = "January 30, 2026"

    const sections = [
        {
            title: "1. Information We Collect",
            content: [
                {
                    subtitle: "Account Information",
                    text: "When you register for Locus, we collect your name, email address, business name, and password. Passwords are securely hashed using bcrypt and never stored in plain text."
                },
                {
                    subtitle: "Business Data",
                    text: "We store information about your products, inventory levels, stock adjustments, and user activity to provide our inventory management services."
                },
                {
                    subtitle: "Usage Data",
                    text: "We automatically collect information about how you interact with our platform, including pages visited, features used, and timestamps of actions."
                }
            ]
        },
        {
            title: "2. How We Use Your Information",
            content: [
                {
                    subtitle: "Service Delivery",
                    text: "We use your information to provide, maintain, and improve the Locus inventory management platform."
                },
                {
                    subtitle: "Account Management",
                    text: "Your email is used for authentication, password resets, and important account-related communications."
                },
                {
                    subtitle: "Analytics",
                    text: "We analyze usage patterns to understand how our platform is used and to identify areas for improvement."
                }
            ]
        },
        {
            title: "3. Data Security",
            content: [
                {
                    subtitle: "Encryption",
                    text: "All data transmitted between your browser and our servers is encrypted using TLS/SSL. Sensitive data like passwords is hashed using industry-standard bcrypt encryption."
                },
                {
                    subtitle: "Access Control",
                    text: "We implement role-based access controls within the platform. Only authorized personnel can access your business data."
                },
                {
                    subtitle: "Session Management",
                    text: "We use secure session tokens managed by NextAuth.js to authenticate users. Sessions expire after a period of inactivity."
                }
            ]
        },
        {
            title: "4. Data Sharing",
            content: [
                {
                    subtitle: "Third Parties",
                    text: "We do not sell, rent, or share your personal information or business data with third parties for marketing purposes."
                },
                {
                    subtitle: "Service Providers",
                    text: "We may share data with trusted service providers who assist in operating our platform (e.g., cloud hosting, database services)."
                },
                {
                    subtitle: "Legal Requirements",
                    text: "We may disclose information if required by law or in response to valid legal requests from public authorities."
                }
            ]
        },
        {
            title: "5. Your Rights",
            content: [
                {
                    subtitle: "Access & Portability",
                    text: "You have the right to access your personal data and request a copy of the information we hold about you."
                },
                {
                    subtitle: "Correction",
                    text: "You can update or correct your account information at any time through the Settings page."
                },
                {
                    subtitle: "Deletion",
                    text: "You have the right to request deletion of your account and associated data."
                }
            ]
        },
        {
            title: "6. Cookies & Local Storage",
            content: [
                {
                    subtitle: "Authentication",
                    text: "We use cookies to maintain your login session and provide a seamless experience across the platform."
                },
                {
                    subtitle: "Preferences",
                    text: "Local storage may be used to remember your preferences and settings."
                }
            ]
        },
        {
            title: "7. Changes to This Policy",
            content: [
                {
                    subtitle: "Updates",
                    text: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page."
                },
                {
                    subtitle: "Effective Date",
                    text: "Changes are effective immediately upon posting. Your continued use of Locus after changes constitutes acceptance of the updated policy."
                }
            ]
        }
    ]

    return (
        <main className="min-h-screen bg-[#0a050a] text-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#a34b27] opacity-10 blur-[120px] rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-[#F0A728]/20 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-[#F0A728]" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
                        </div>
                    </div>

                    <p className="text-white/60 text-lg">
                        Last updated: {lastUpdated}
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="pb-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <p className="text-white/70 leading-relaxed">
                            At Locus, we take your privacy seriously. This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you use our inventory management platform.
                            Please read this policy carefully. By using Locus, you consent to the practices described herein.
                        </p>
                    </div>
                </div>
            </section>

            {/* Policy Sections */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    {sections.map((section, idx) => (
                        <div key={idx} className="border-b border-white/5 pb-12 last:border-0">
                            <h2 className="text-2xl font-bold mb-6 text-[#F0A728]">{section.title}</h2>
                            <div className="space-y-6">
                                {section.content.map((item, itemIdx) => (
                                    <div key={itemIdx}>
                                        <h3 className="text-lg font-semibold mb-2">{item.subtitle}</h3>
                                        <p className="text-white/60 leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h2>
                    <p className="text-white/60 mb-6">
                        If you have any questions or concerns about this Privacy Policy, please contact us.
                    </p>
                    <a
                        href="mailto:hello@iamtaqi.site"
                        className="inline-block px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 text-center text-white/30 text-sm">
                <p>&copy; {new Date().getFullYear()} Locus Inventory Management System. All rights reserved.</p>
            </footer>
        </main>
    )
}
