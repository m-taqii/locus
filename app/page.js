"use client";
import { useRef } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // Create refs for animation targets
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);

  // Function to add section elements to the refs array
  function addToRefs(element) {
    if (element && !sectionsRef.current.includes(element)) {
      sectionsRef.current.push(element);
    }
  }

  // GSAP Animations
  useGSAP(
    ()=> {
      // Hero Animation Timeline
      const heroTimeline = gsap.timeline();

      heroTimeline.from(".hero-text", {
        opacity: 0,
        duration: 2,
        delay: 0.5,
        ease: "power4.out",
      });

      heroTimeline.from(
        ".hero-image",
        {
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=1"
      );

      heroTimeline.to(
        ".circular-gradient",
        {
          scale: 1.2,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        0
      );

      // Loop through each scrollytelling section
      for (let i = 0; i < sectionsRef.current.length; i++) {
        const section = sectionsRef.current[i];
        const selector = gsap.utils.selector(section);
        const slideFromLeft = i % 2 === 0;

        // Animate the text content
        gsap.from(selector(".feature-content"), {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          x: slideFromLeft ? -50 : 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        // Animate the image with parallax scrub
        gsap.from(selector(".feature-image"), {
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom center",
            scrub: 1,
          },
          y: 100,
          opacity: 0,
          scale: 0.9,
          ease: "none",
        });
      }

      // CTA Section Animation
      gsap.from(".cta-section", {
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 85%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    },
    { scope: mainRef }
  );

  // Feature list items for the analytics section
  const analyticsFeatures = [
    "Predictive Forecasting",
    "Real-time Heatmaps",
    "Profit Margin Analysis",
  ];

  // Feature list items for the security section
  const securityFeatures = [
    "256-bit SSL Encryption",
    "Role-based Access Control",
    "Automatic Daily Backups",
    "GDPR Compliant",
  ];

  return (
    <main
      ref={mainRef}
      className="min-h-screen relative overflow-x-hidden text-white font-sans selection:bg-[#a34b27] selection:text-white bg-[#0a050a]"
    >
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="circular-gradient absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] opacity-40 blur-[100px] rounded-full bg-[radial-gradient(circle,rgba(163,75,39,0.3)_0%,rgba(23,12,22,0)_70%)]"></div>
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] opacity-20 blur-[80px] rounded-full bg-[#F0A728]"></div>
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] opacity-10 blur-[120px] rounded-full bg-[#9C2906]"></div>
      </div>

      <div className="relative z-10 w-full">
        <Navbar />

        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex flex-col items-center justify-center pt-15 pb-20 px-4 text-center"
        >
          <div className="max-w-6xl mx-auto z-10">
            <h1 className="hero-text text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
              Master Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#F0A728] via-[#a34b27] to-[#9C2906]">
                Inventory
              </span>
            </h1>

            <p className="hero-text text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Precision. Control. Growth. <br />
              The operating system for modern commerce.
            </p>

            <div className="hero-text flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
              <Link
                href="/register"
                className="group relative px-8 py-4 text-lg rounded-full bg-white text-[#170c16] font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <div className="absolute inset-0 w-full h-full bg-linear-to-r from-[#a34b27] to-[#F0A728] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative z-10">Start Free Trial</span>
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 text-lg rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-[#a34b27]/50 transition-all duration-300"
              >
                Login
              </Link>
            </div>

            {/* Dashboard Hero Image */}
            <div className="hero-image relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-[#a34b27]/20 group">
              <div className="absolute inset-0 bg-linear-to-t from-[#0a050a] via-transparent to-transparent z-10 opacity-60"></div>
              <img
                src="/dashboard.png"
                alt="Locus Dashboard"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex justify-between items-end">
                <div className="text-left">
                  <p className="text-[#F0A728] font-mono text-xs mb-2 tracking-widest uppercase">
                    System Status
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm font-medium">
                      All Systems Operational
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1 - ANALYTICS */}
        <section
          ref={addToRefs}
          className="min-h-screen flex items-center justify-center py-20 px-6 relative"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="feature-content order-2 md:order-1">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Clarity Through <br />
                <span className="text-[#a34b27]">Deep Intelligence</span>
              </h2>
              <p className="text-xl text-white/50 leading-relaxed mb-8">
                Don't just count stock. Understand it. Our advanced analytics
                engine visualizes your supply chain in real-time, predicting
                shortages before they happen.
              </p>
              <ul className="space-y-4">
                {analyticsFeatures.map(function (item, index) {
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#a34b27]/20 flex items-center justify-center text-[#F0A728]">
                        ✓
                      </span>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="feature-image order-1 md:order-2 relative">
              <div className="absolute -inset-4 bg-linear-to-r from-[#a34b27] to-[#F0A728] opacity-20 blur-2xl rounded-full"></div>
              <img
                src="/analytics.png"
                alt="Analytics Graph"
                className="relative z-10 rounded-2xl border border-white/10 shadow-2xl w-full rotate-2 hover:rotate-0 transition-all duration-500"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2 - SECURITY & TRUST */}
        <section
          ref={addToRefs}
          className="min-h-screen flex items-center justify-center py-20 px-6 relative"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Side: Stats / Trust Badges */}
            <div className="feature-image relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#9C2906] opacity-20 blur-[100px] rounded-full"></div>

              {/* Stats Cards */}
              <div className="relative z-10 grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                  <p className="text-4xl md:text-5xl font-bold text-[#F0A728] mb-2">
                    10K+
                  </p>
                  <p className="text-white/60 text-sm">Active Businesses</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                  <p className="text-4xl md:text-5xl font-bold text-[#F0A728] mb-2">
                    99.9%
                  </p>
                  <p className="text-white/60 text-sm">Uptime Guarantee</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                  <p className="text-4xl md:text-5xl font-bold text-[#F0A728] mb-2">
                    50M+
                  </p>
                  <p className="text-white/60 text-sm">Items Tracked</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                  <p className="text-4xl md:text-5xl font-bold text-[#F0A728] mb-2">
                    24/7
                  </p>
                  <p className="text-white/60 text-sm">Customer Support</p>
                </div>
              </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="feature-content">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Built for <br />
                <span className="text-[#F0A728]">Enterprise Security</span>
              </h2>
              <p className="text-xl text-white/50 leading-relaxed mb-8">
                Your data is your lifeline. Locus uses bank-grade encryption and
                industry-leading security practices to keep your inventory data
                safe around the clock.
              </p>
              <ul className="space-y-4">
                {securityFeatures.map(function (item, index) {
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-white/80"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#F0A728]/20 flex items-center justify-center text-[#F0A728]">
                        🔒
                      </span>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="cta-section py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#a34b27]/10 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative z-10 glass-panel p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-linear-to-b from-white to-white/40">
              Ready to Scale?
            </h2>
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
              Join the thousands of forward-thinking businesses that have
              already Locus'd their operations.
            </p>
            <Link
              href="/register"
              className="inline-block px-12 py-5 text-xl rounded-full bg-[#a34b27] text-white font-bold shadow-[0_10px_40px_rgba(163,75,39,0.5)] hover:shadow-[0_10px_60px_rgba(163,75,39,0.7)] hover:scale-105 transition-all duration-300"
            >
              Get Started Now
            </Link>
          </div>
        </section>

        <footer className="py-12 border-t border-white/5 text-center text-white/20 text-sm">
          <p>&copy; {new Date().getFullYear()} Locus Inc. Crafted with precision.</p>
        </footer>
      </div>
    </main>
  );
}
