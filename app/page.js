"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  BarChart3,
  ShieldCheck,
  Users,
  PackageCheck,
  ArrowRightLeft,
  Zap,
  TrendingUp,
  Globe,
  MonitorPlay,
  Settings,
  Award,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Building2,
  Sparkles,
  Target,
  Shield
} from "lucide-react";
import { Bird } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);
  const sectionsRef = useRef([]);
  const [openFaq, setOpenFaq] = useState(null);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useGSAP(() => {
    // Hero Animation
    const heroTl = gsap.timeline();

    heroTl.from(".hero-content", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    })
      .from(".hero-image-container", {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "-=0.8");

    // Ambient Movement
    gsap.to(".ambient-orb", {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 1
    });

    // Scroll Animations for Sections
    sectionsRef.current.forEach((section, i) => {
      const direction = i % 2 === 0 ? -50 : 50;

      gsap.from(section.querySelectorAll(".animate-item"), {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        x: direction,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    });

    // Feature Cards
    gsap.fromTo(".feature-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 75%"
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    );

    // Stats Counter Animation
    gsap.fromTo(".stat-card",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%"
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }
    );

  }, { scope: mainRef });

  const features = [
    {
      icon: <PackageCheck className="w-8 h-8 text-[#F0A728]" />,
      title: "Smart Inventory",
      desc: "Track products with categories, SKUs, and real-time quantity updates. Fully validated inputs."
    },
    {
      icon: <ArrowRightLeft className="w-8 h-8 text-[#a34b27]" />,
      title: "Stock Adjustments",
      desc: "Seamless Stock-in/Stock-out operations with complete activity logging and audit trails."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#F0A728]" />,
      title: "Dashboard Analytics",
      desc: "Real-time statistics, product counts, active users, and total sales at a glance."
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-[#a34b27]" />,
      title: "Low Stock Alerts",
      desc: "Automatic notifications when products fall below minimum threshold. Never run out."
    },

    {
      icon: <Users className="w-8 h-8 text-[#a34b27]" />,
      title: "User Management",
      desc: "Add, edit, and manage team members with role-based access. Owner, Admin, and Staff roles."
    },
    {
      icon: <Zap className="w-8 h-8 text-[#F0A728]" />,
      title: "Lightning Fast",
      desc: "Optimized architecture ensuring sub-second interactions and zero latency."
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Sign Up in Seconds",
      desc: "Create your free account with just your email. No credit card required.",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      step: "02",
      title: "Add Your Products",
      desc: "Import or manually add your inventory. Set categories, prices, and thresholds.",
      icon: <PackageCheck className="w-6 h-6" />
    },
    {
      step: "03",
      title: "Invite Your Team",
      desc: "Add staff members with appropriate roles. Everyone stays in sync.",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "04",
      title: "Grow Your Business",
      desc: "Track sales, manage stock, and make data-driven decisions.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const benefits = [
    {
      icon: <Clock className="w-10 h-10 text-[#F0A728]" />,
      title: "Save 10+ Hours Weekly",
      desc: "Automate tedious inventory tasks. Spend more time growing your business."
    },
    {
      icon: <DollarSign className="w-10 h-10 text-[#a34b27]" />,
      title: "Reduce Losses by 40%",
      desc: "Never overstock or run out. Smart alerts prevent costly mistakes."
    },
    {
      icon: <Target className="w-10 h-10 text-[#F0A728]" />,
      title: "99.9% Accuracy",
      desc: "Real-time tracking eliminates human counting errors."
    },
    {
      icon: <Shield className="w-10 h-10 text-[#a34b27]" />,
      title: "Enterprise Security",
      desc: "Bank-level encryption protects your sensitive business data."
    }
  ];

  const faqs = [
    {
      q: "Is Locus really free?",
      a: "Yes! During our Early Access period, Locus is completely free. We want you to experience the full power of our platform before we introduce paid tiers."
    },
    {
      q: "How many products can I track?",
      a: "There's no limit! Whether you have 10 products or 10,000, Locus scales with your business needs."
    },
    {
      q: "Can I add team members?",
      a: "Absolutely. You can invite unlimited team members with different roles - Owner, Admin, or Staff - each with appropriate permissions."
    },
    {
      q: "Is my data secure?",
      a: "Yes. We use industry-standard encryption and secure cloud infrastructure to protect your business data 24/7."
    },
    {
      q: "Do I need to install anything?",
      a: "No downloads required! Locus is 100% cloud-based. Access it from any browser on any device."
    }
  ];

  return (
    <main ref={mainRef} className="min-h-screen relative overflow-x-hidden bg-[#0a050a] text-white font-sans selection:bg-[#a34b27] selection:text-white">

      {/* Navbar */}
      <Navbar />

      {/* Ambient Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="ambient-orb absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#a34b27] opacity-20 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="ambient-orb absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#F0A728] opacity-10 blur-[100px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Early Access Badge */}
          <div className="hero-content inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#a34b27]/20 to-[#F0A728]/20 border border-[#F0A728]/30 backdrop-blur-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F0A728] animate-pulse"></span>
            <span className="text-sm font-semibold text-[#F0A728] tracking-wide flex gap-2"><Bird className="w-5 h-5" /> Early Access</span>
          </div>

          <h1 className="hero-content text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
            Master Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#F0A728] via-[#a34b27] to-[#9C2906]">
              Inventory
            </span>
          </h1>

          <p className="hero-content text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            Precision. Control. Growth. <br />
            The smarter way to manage inventory for growing businesses.
          </p>

          <div className="hero-content flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link
              href="/register"
              className="group relative px-8 py-4 bg-[#a34b27] rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-[0_0_30px_rgba(163,75,39,0.4)]"
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              Start Free — No Credit Card
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 border border-white/20 rounded-full font-bold text-lg hover:bg-white/5 transition-all"
            >
              See How It Works
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="hero-content pt-12 flex flex-wrap justify-center gap-8 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              <span>Setup in 30 Seconds</span>
            </div>
          </div>

          {/* Cloud Benefits Section */}
          <div className="hero-image-container relative mt-16 mx-auto max-w-5xl grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/8 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#a34b27]/20 flex items-center justify-center mb-4 text-[#F0A728]">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">No Downloads Required</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Locus lives in the cloud. Access your full inventory system from any browser, on any device, instantly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/8 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#F0A728]/20 flex items-center justify-center mb-4 text-[#F0A728]">
                <MonitorPlay size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Onboarding</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Skip the complex setup. Sign up and start managing your stock in less than 30 seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/8 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-[#a34b27]/20 flex items-center justify-center mb-4 text-[#F0A728]">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Everything</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Changes made on one device reflect instantly across your entire organization. Zero lag.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={addToRefs} className="py-24 relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-item">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Businesses <span className="text-[#F0A728]">Choose Locus</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Join hundreds of businesses saving time, reducing costs, and growing faster with smart inventory management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a34b27]/50 transition-all text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 mb-4 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-white/50 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={addToRefs} id="features" className="py-24 relative z-10 bg-white/2 border-y border-white/5 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-item">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Get Started in <span className="text-[#a34b27]">4 Simple Steps</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              From signup to selling - here's how easy it is to transform your inventory management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <div key={i} className="animate-item relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-linear-to-r from-[#a34b27] to-transparent"></div>
                )}
                <div className="relative p-6 rounded-2xl bg-[#0a050a] border border-white/10 hover:border-[#F0A728]/50 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-bold text-[#a34b27]/30 group-hover:text-[#a34b27] transition-colors">{step.step}</span>
                    <div className="w-10 h-10 rounded-full bg-[#F0A728]/20 flex items-center justify-center text-[#F0A728]">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section ref={addToRefs} className="features-grid py-32 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-item">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Powerful <span className="text-[#F0A728]">Features</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Everything you need to run an efficient inventory operation, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="feature-card h-full p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#a34b27]/50 hover:bg-white/[0.07] transition-all duration-300 group flex flex-col"
              >
                <div className="mb-6 p-3 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#F0A728] transition-colors">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed grow">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack / Performance Section */}
      <section ref={addToRefs} className="py-24 relative z-10 border-y border-white/5 bg-white/2">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-item space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Drive Growth with <br />
              <span className="text-[#a34b27]">Precision Control</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Locus isn't just a tool; it's your competitive advantage. Eliminate stockouts, reduce carrying costs, and empower your team with data that matters.
            </p>

            <div className="space-y-6">
              {[
                { title: "Maximize Profit Margins", desc: "Identify slow-moving stock and optimize your purchasing with predictive insights." },
                { title: "Team Synchronization", desc: "Keep everyone aligned with real-time updates and granular role-based permissions." },
                { title: "Scale Without Limits", desc: "Whether you have 100 items or 100,000, Locus adapts to your business needs instantly." }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#F0A728] shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{benefit.title}</h4>
                    <p className="text-white/50 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-item relative">
            <div className="absolute inset-0 bg-linear-to-r from-[#a34b27] to-[#F0A728] blur-[80px] opacity-20"></div>
            <div className="relative p-8 rounded-2xl bg-[#0a050a] border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <span className="text-sm font-mono text-gray-500">PERFORMANCE METRICS</span>
                <span className="text-[#F0A728] text-sm font-bold flex items-center gap-2">
                  <TrendingUp size={16} />
                  +145% Growth
                </span>
              </div>

              {/* Abstract Chart Visualization */}
              <div className="flex items-end justify-between h-48 gap-4 px-2">
                {[40, 65, 45, 80, 60, 90, 100].map((height, i) => (
                  <div key={i} className="w-full bg-white/5 rounded-t-sm relative group overflow-hidden">
                    <div
                      style={{ height: `${height}%` }}
                      className="absolute bottom-0 w-full bg-linear-to-t from-[#a34b27] to-[#F0A728] opacity-80 group-hover:opacity-100 transition-all duration-500"
                    ></div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6 text-sm text-gray-400 font-mono">
                <span>Efficiency Gain</span>
                <span className="text-white">High</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={addToRefs} className="py-24 relative z-10 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-item">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-[#F0A728]">Questions</span>
            </h2>
          </div>

          <div className="space-y-4 animate-item">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-[#F0A728]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/50" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-white/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={addToRefs} className="py-32 relative text-center px-6">
        <div className="max-w-4xl mx-auto animate-item">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F0A728]/20 border border-[#F0A728]/30 mb-8">
            <Sparkles className="w-4 h-4 text-[#F0A728]" />
            <span className="text-sm font-semibold text-[#F0A728]">Limited Time: Free Early Access</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to <span className="text-[#F0A728]">Transform</span> Your Business?
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Join hundreds of businesses already using Locus to streamline their inventory operations. Start free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-block px-12 py-5 bg-white text-black text-xl font-bold rounded-full hover:bg-[#F0A728] hover:text-white transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_50px_rgba(240,167,40,0.4)]"
            >
              Get Started Free
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">No credit card required • Setup in 30 seconds</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-white/30 text-sm">
        <p className=" p-2">&copy; {new Date().getFullYear()} Locus Inventory Management System. All rights reserved.</p>
      </footer>
    </main>
  );
}

