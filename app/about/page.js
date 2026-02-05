"use client"
import Navbar from "../components/Navbar"
import Link from "next/link"
import { ArrowLeft, Target, Users, Zap, Shield, TrendingUp, Heart, CheckCircle2, Lightbulb, Award, Clock, Globe, Sparkles } from "lucide-react"

export default function AboutPage() {
    const values = [
        {
            icon: <Target className="w-6 h-6" />,
            title: "Precision",
            desc: "Every feature is designed with meticulous attention to detail, ensuring accuracy in all operations."
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Simplicity",
            desc: "Powerful doesn't mean complicated. We make inventory management effortless for everyone."
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "Reliability",
            desc: "Your business depends on us. We take that responsibility seriously with 99.9% uptime."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Customer First",
            desc: "Every decision we make starts with one question: How does this help our customers succeed?"
        }
    ]

    const whyDifferent = [
        {
            icon: <Clock className="w-8 h-8 text-[#F0A728]" />,
            title: "Get Started in Minutes, Not Weeks",
            desc: "No lengthy onboarding. No complex setup. Sign up and start managing your inventory in under 5 minutes."
        },
        {
            icon: <Globe className="w-8 h-8 text-[#a34b27]" />,
            title: "Access Anywhere, Anytime",
            desc: "Cloud-based means your inventory is always at your fingertips. Manage your business from any device, anywhere in the world."
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-[#F0A728]" />,
            title: "Grows With Your Business",
            desc: "From startup to enterprise, Locus scales seamlessly. Never worry about outgrowing your inventory system again."
        },
        {
            icon: <Award className="w-8 h-8 text-[#a34b27]" />,
            title: "Built for Real Businesses",
            desc: "We understand the challenges you face because we've worked with businesses just like yours. Every feature solves a real problem."
        }
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

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0A728]/20 border border-[#F0A728]/30 mb-6 ml-5">
                        <Sparkles className="w-4 h-4 text-[#F0A728]" />
                        <span className="text-sm font-semibold text-[#F0A728]">Our Story</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        About <span className="text-transparent bg-clip-text bg-linear-to-r from-[#F0A728] to-[#a34b27]">Locus</span>
                    </h1>

                    <p className="text-xl text-white/60 leading-relaxed max-w-3xl">
                        We're on a mission to help businesses take control of their inventory. No more guesswork.
                        No more spreadsheet chaos. Just simple, powerful tools that help you grow.
                    </p>
                </div>
            </section>

            {/* The Problem We Solve */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6">The Problem We Solve</h2>
                            <p className="text-white/60 leading-relaxed mb-4">
                                We've seen too many businesses struggle with inventory. They lose money on
                                overstocking. They lose customers to stockouts. They waste hours on manual
                                counting and spreadsheet updates.
                            </p>
                            <p className="text-white/60 leading-relaxed mb-6">
                                The existing solutions? Either too expensive, too complicated, or too outdated.
                                Small and mid-sized businesses deserve better.
                            </p>

                            <div className="space-y-3">
                                {[
                                    "40% of small businesses don't track inventory at all",
                                    "Inventory errors cost businesses 5-10% of revenue annually",
                                    "Manual tracking wastes 10+ hours per week on average"
                                ].map((stat, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#F0A728] shrink-0 mt-0.5" />
                                        <span className="text-white/70 text-sm">{stat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-r from-[#a34b27] to-[#F0A728] blur-[60px] opacity-20"></div>
                            <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-[#F0A728]/20 flex items-center justify-center">
                                        <Lightbulb className="w-6 h-6 text-[#F0A728]" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">Our Solution</p>
                                        <p className="text-white/60 text-sm">Simple. Powerful. Affordable.</p>
                                    </div>
                                </div>
                                <p className="text-white/50 text-sm leading-relaxed">
                                    Locus gives you enterprise-level inventory management without the enterprise-level
                                    complexity or price tag. Start free, grow when you're ready.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Sets Us Apart */}
            <section className="py-20 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">What Sets Us Apart</h2>
                        <p className="text-white/60 max-w-2xl mx-auto">
                            We're not just another inventory tool. Here's why businesses choose Locus.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {whyDifferent.map((item, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-[#0a050a] border border-white/10 hover:border-[#a34b27]/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                        <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a34b27]/50 transition-colors text-center">
                                <div className="w-12 h-12 rounded-full bg-[#F0A728]/20 flex items-center justify-center text-[#F0A728] mb-4 mx-auto">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Promise */}
            <section className="py-20 px-6 bg-white/2 border-y border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Promise to You</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-[#F0A728] mb-2">Free</div>
                            <p className="text-white/60 text-sm">Early Access</p>
                            <p className="text-white/40 text-xs mt-2">No credit card required to start</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#F0A728] mb-2">99.9%</div>
                            <p className="text-white/60 text-sm">Uptime Guarantee</p>
                            <p className="text-white/40 text-xs mt-2">Your business never stops, neither do we</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-[#F0A728] mb-2">24/7</div>
                            <p className="text-white/60 text-sm">Cloud Access</p>
                            <p className="text-white/40 text-xs mt-2">Manage inventory from anywhere</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 text-[#F0A728] mb-4">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm font-medium">Join the Locus Community</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
                    <p className="text-white/60 max-w-xl mx-auto mb-8">
                        Join hundreds of businesses that have already simplified their inventory management with Locus.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="inline-block px-8 py-4 bg-linear-to-r from-[#a34b27] to-[#F0A728] rounded-full font-bold hover:shadow-[0_0_30px_rgba(163,75,39,0.4)] transition-all"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            href="/"
                            className="inline-block px-8 py-4 border border-white/20 rounded-full font-bold hover:bg-white/5 transition-all"
                        >
                            Learn More
                        </Link>
                    </div>
                    <p className="text-white/40 text-sm mt-4">No credit card required • Setup in 30 seconds</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 text-center text-white/30 text-sm">
                <p>&copy; {new Date().getFullYear()} Locus Inventory Management System. All rights reserved.</p>
            </footer>
        </main>
    )
}

