"use client"
import Navbar from "../components/Navbar"
import Link from "next/link"
import { ArrowLeft, Target, Users, Zap, Shield, TrendingUp, Heart } from "lucide-react"

export default function AboutPage() {
    const values = [
        {
            icon: <Target className="w-6 h-6" />,
            title: "Precision",
            desc: "Every feature is designed with meticulous attention to detail, ensuring accuracy in all operations."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Speed",
            desc: "Built for performance. Zero lag, instant updates, and lightning-fast interactions."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Security",
            desc: "Bank-grade encryption and secure authentication protect your business data 24/7."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Collaboration",
            desc: "Designed for teams. Role-based access ensures everyone has the right level of control."
        }
    ]

    const stats = [
        { value: "99.9%", label: "Uptime" },
        { value: "<100ms", label: "Response Time" },
        { value: "256-bit", label: "Encryption" },
        { value: "24/7", label: "Cloud Access" }
    ]

    return (
        <main className="min-h-screen bg-[#0a050a] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#a34b27] opacity-15 blur-[120px] rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        About <span className="text-transparent bg-clip-text bg-linear-to-r from-[#F0A728] to-[#a34b27]">Locus</span>
                    </h1>

                    <p className="text-xl text-white/60 leading-relaxed max-w-3xl">
                        Locus is a modern inventory management system built for businesses that demand precision,
                        speed, and reliability. We're on a mission to simplify stock management for companies of all sizes.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                            <p className="text-white/60 leading-relaxed mb-4">
                                We believe that inventory management shouldn't be complicated. Too many businesses
                                struggle with outdated systems, spreadsheets, and manual processes that waste time
                                and lead to costly errors.
                            </p>
                            <p className="text-white/60 leading-relaxed">
                                Locus was built to change that. Our platform combines powerful features with an
                                intuitive interface, giving you the tools you need to master your inventory without
                                the learning curve.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-r from-[#a34b27] to-[#F0A728] blur-[60px] opacity-20"></div>
                            <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-[#F0A728]/20 flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-[#F0A728]" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">Growth-Focused</p>
                                        <p className="text-white/60 text-sm">Built to scale with your business</p>
                                    </div>
                                </div>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Whether you're managing 100 products or 100,000, Locus adapts to your needs.
                                    Our cloud-based architecture ensures you'll never outgrow our platform.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a34b27]/50 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-[#F0A728]/20 flex items-center justify-center text-[#F0A728] mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <p className="text-3xl md:text-4xl font-bold text-[#F0A728] mb-2">{stat.value}</p>
                                <p className="text-white/60 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Built with Modern Technology</h2>
                    <p className="text-white/60 max-w-2xl mx-auto mb-12">
                        Locus is powered by cutting-edge technologies to ensure the best performance,
                        security, and developer experience.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {["Next.js 15", "React 19", "MongoDB", "NextAuth", "TailwindCSS", "GSAP"].map((tech, idx) => (
                            <span key={idx} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 text-[#F0A728] mb-4">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">Open Source</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-white/60 max-w-xl mx-auto mb-8">
                        Join businesses that have already transformed their inventory operations with Locus.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-8 py-4 bg-linear-to-r from-[#a34b27] to-[#F0A728] rounded-full font-bold hover:shadow-[0_0_30px_rgba(163,75,39,0.4)] transition-all"
                    >
                        Start For Free
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 text-center text-white/30 text-sm">
                <p>&copy; {new Date().getFullYear()} Locus Inventory Management System. All rights reserved.</p>
            </footer>
        </main>
    )
}
