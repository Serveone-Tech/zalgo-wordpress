"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const milestones = [
  {
    year: "2016",
    title: "The Beginning",
    desc: "Bhupendra Singh Parmar started freelancing in WordPress — first project, first client, big dreams.",
  },
  {
    year: "2018",
    title: "Building Experience",
    desc: "Delivered 20+ WordPress projects independently, mastering custom themes, plugins, and WooCommerce.",
  },
  {
    year: "2019",
    title: "Zalgo Infotech Founded",
    desc: "Officially registered as Zalgo Infotech — a full-service WordPress agency built on long-term client relationships.",
  },
  {
    year: "2021",
    title: "WooCommerce Specialists",
    desc: "Became a go-to agency for WooCommerce development, supporting $1M+ in client revenue.",
  },
  {
    year: "2022",
    title: "50+ Projects",
    desc: "Crossed 50 delivered WordPress projects with 95%+ client satisfaction rate.",
  },
  {
    year: "2023",
    title: "Team Expansion",
    desc: "Expanded with dedicated WordPress developers, designers, and SEO experts.",
  },
  {
    year: "2024",
    title: "Global Clients",
    desc: "Serving businesses across Canada, USA, UK, and India — trusted by 100+ clients worldwide.",
  },
  {
    year: "2025+",
    title: "Growing Strong",
    desc: "100+ projects delivered and still growing — with you as our next long-term partner.",
  },
];

const team = [
  {
    name: "Vaibhav",
    role: "Business Development Executive",
    image: "/team/vaibhav.png",
  },
  { name: "Ashu", role: "Creative Head", image: "/team/ashu.png" },
  { name: "Anurag Singh", role: "AI Developer", image: "/team/annu.png" },
  {
    name: "Dharamveer",
    role: "Business Development Manager",
    image: "/team/dharamveer.png",
  },
];

const values = [
  {
    icon: (
      <svg
        className="w-7 h-7 text-teal-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Innovation",
    desc: "We embrace every new WordPress feature, Gutenberg block, and WooCommerce update to stay ahead.",
    color: "border-teal-500/40 bg-teal-500/5",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-yellow-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
    title: "Quality",
    desc: "Excellence in every line of code — clean PHP, structured themes, and tested plugins delivered on time.",
    color: "border-yellow-500/40 bg-yellow-500/5",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Partnership",
    desc: "We treat every client&apos;s project as our own. Your success is our success — simple as that.",
    color: "border-blue-500/40 bg-blue-500/5",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-green-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Reliability",
    desc: "On time, on budget, and always responsive. You can count on us when it matters most.",
    color: "border-green-500/40 bg-green-500/5",
  },
];

export default function About() {
  const founderRef = useInView(0.1);
  const lokeRef = useInView(0.1);
  const storyRef = useInView();
  const valuesRef = useInView();
  const timelineRef = useInView();
  const missionRef = useInView();
  const teamRef = useInView();
  const ctaRef = useInView();

  return (
    <div className="bg-gray-950 overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,153,153,0.05) 1px, transparent 1px)",
              backgroundSize: "25px 25px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-400 text-sm mb-8 animate-fade-in-down">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            WordPress Experts Since 2016
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 animate-fade-in-up leading-tight">
            We Are <span className="shimmer-text">Zalgo Infotech</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200 opacity-0-init">
            A passionate team of WordPress developers, designers, and SEO
            experts — united by one mission: building WordPress sites that grow
            your business.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Leadership</span>
            <h2 className="text-4xl font-bold text-white mt-3">Meet Our Founders</h2>
          </div>

          <div ref={founderRef.ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Bhupendra */}
            <div className={`relative rounded-3xl overflow-hidden border border-gray-700/60 bg-gray-900/60 backdrop-blur-sm shadow-2xl flex flex-col ${founderRef.inView ? "animate-slide-in-left" : "opacity-0"}`}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500" />
              <div className="relative h-80 bg-gradient-to-br from-teal-900/30 via-gray-900 to-blue-900/20 overflow-hidden flex-shrink-0">
                <div className="absolute top-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl" />
                <Image src="/bhupendra.png" alt="Bhupendra Singh Parmar" fill className="object-contain object-bottom" priority />
              </div>
              <div className="flex flex-col flex-1 p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/8 w-fit mb-4">
                  <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                  <span className="text-teal-400 text-xs font-semibold tracking-wider uppercase">Founder & Visionary Leader</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-1">Bhupendra Singh</h3>
                <p className="text-teal-400 font-semibold text-sm mb-4">Founder & CEO, Zalgo Infotech</p>
                <div className="space-y-3 text-gray-400 text-sm leading-relaxed flex-1">
                  <p>At Zalgo Infotech, our foundation has always been built on <span className="text-white font-medium">relationships — not revenue.</span></p>
                  <p>I have believed that long-term partnerships matter more than short-term profits. Working with global clients for 4+ and 6+ years continuously is a testament to the trust and commitment we deliver.</p>
                  <p className="italic border-l-2 border-teal-500 pl-3 text-gray-500">&ldquo;Success is measured by how long our clients stay with us.&rdquo;</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <a href="https://www.linkedin.com/in/bhupendra-singh-parmar-b7a216276/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#0958a8] text-white font-semibold text-xs transition-all hover:-translate-y-0.5">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    LinkedIn
                  </a>
                  <a href="mailto:sales@zalgoinfotech.com" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 hover:border-teal-500/50 text-gray-300 hover:text-white font-semibold text-xs transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Lokendra */}
            <div className={`relative rounded-3xl overflow-hidden border border-gray-700/60 bg-gray-900/60 backdrop-blur-sm shadow-2xl flex flex-col ${founderRef.inView ? "animate-slide-in-right" : "opacity-0"}`}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
              <div className="relative h-80 bg-gradient-to-br from-blue-900/30 via-gray-900 to-purple-900/20 overflow-hidden flex-shrink-0">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl" />
                <Image src="/lokendra.png" alt="Lokendra Parmar" fill className="object-contain object-bottom" />
              </div>
              <div className="flex flex-col flex-1 p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/8 w-fit mb-4">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span className="text-blue-400 text-xs font-semibold tracking-wider uppercase">Founder & Tech Lead</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-1">Lokendra Parmar</h3>
                <p className="text-blue-400 font-semibold text-sm mb-4">Founder & Tech Lead, Zalgo Infotech</p>
                <div className="space-y-3 text-gray-400 text-sm leading-relaxed flex-1">
                  <p>At Zalgo Infotech, technology is not just a tool — it is the <span className="text-white font-medium">foundation on which every solution is built.</span></p>
                  <p>As the tech lead, I architect and deliver robust digital products that stand the test of time — scalable, high-performance solutions that directly drive business outcomes for our clients.</p>
                  <p className="italic border-l-2 border-blue-500 pl-3 text-gray-500">&ldquo;Great technology should be invisible — it should simply work, reliably and at scale.&rdquo;</p>
                </div>
                <div className="mt-6">
                  <a href="mailto:sales@zalgoinfotech.com" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 hover:border-blue-500/50 text-gray-300 hover:text-white font-semibold text-xs transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Sonam */}
            <div className={`relative rounded-3xl overflow-hidden border border-gray-700/60 bg-gray-900/60 backdrop-blur-sm shadow-2xl flex flex-col ${founderRef.inView ? "animate-fade-in-up" : "opacity-0"}`}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500" />
              <div className="relative h-80 bg-gradient-to-br from-pink-900/30 via-gray-900 to-rose-900/20 overflow-hidden flex-shrink-0">
                <div className="absolute top-0 left-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl" />
                <Image src="/sonam.jpg" alt="Sonam" fill className="object-contain object-bottom" />
              </div>
              <div className="flex flex-col flex-1 p-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/8 w-fit mb-4">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
                  <span className="text-pink-400 text-xs font-semibold tracking-wider uppercase">Co-founder & Marketing Head</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-1">Sonam</h3>
                <p className="text-pink-400 font-semibold text-sm mb-4">Co-founder & Marketing Head, Zalgo Infotech</p>
                <div className="space-y-3 text-gray-400 text-sm leading-relaxed flex-1">
                  <p>At Zalgo Infotech, great marketing is about <span className="text-white font-medium">telling the right story to the right people.</span></p>
                  <p>I drive brand growth, client outreach, and market strategy — ensuring that Zalgo Infotech's vision reaches businesses who need it most and that every campaign creates real, measurable impact.</p>
                  <p className="italic border-l-2 border-pink-500 pl-3 text-gray-500">&ldquo;A brand is not just a logo — it is the promise you make and the experience you deliver.&rdquo;</p>
                </div>
                <div className="mt-6">
                  <a href="mailto:sales@zalgoinfotech.com" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 hover:border-pink-500/50 text-gray-300 hover:text-white font-semibold text-xs transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    Email
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gray-900/30">
        <div
          ref={storyRef.ref}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              className={`${storyRef.inView ? "animate-slide-in-left" : "opacity-0"}`}
            >
              <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="text-4xl font-bold text-white mt-3 mb-6">
                Born from a Passion for WordPress
              </h2>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Started in 2016 as a freelance WordPress operation and
                officially founded as Zalgo Infotech in 2019 — our single
                mission has always been to help businesses succeed online. What
                began with one developer and one client has grown into a
                full-service WordPress agency trusted by 100+ clients globally.
              </p>
              <p className="text-gray-400 mb-4 leading-relaxed">
                We focus exclusively on WordPress — not because it&apos;s easy,
                but because we believe depth beats breadth. When you hire Zalgo
                Infotech, you get a team that eats, breathes, and lives
                WordPress every day.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Based in Bhopal, Madhya Pradesh, we serve clients across India
                and internationally — delivering fast, secure, and beautiful
                WordPress experiences that drive real business growth.
              </p>
              <div className="mt-8 flex gap-6">
                <div>
                  <div className="text-3xl font-extrabold text-teal-400">
                    100+
                  </div>
                  <div className="text-gray-400 text-sm">Projects Done</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-teal-400">
                    80+
                  </div>
                  <div className="text-gray-400 text-sm">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-teal-400">
                    10+
                  </div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
              </div>
            </div>
            <div
              className={`relative ${storyRef.inView ? "animate-slide-in-right" : "opacity-0"}`}
            >
              <div className="relative p-8 rounded-2xl border border-teal-500/20 bg-gray-900/80 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    WordPress-Only Agency
                  </h3>
                  <p className="text-gray-400 mb-6">
                    We don&apos;t spread ourselves thin. 100% focus on WordPress
                    means 100% better results for you.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-left">
                    {[
                      "Custom Themes",
                      "WooCommerce",
                      "Plugin Dev",
                      "WordPress SEO",
                      "Speed Optimization",
                      "WP Security",
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-teal-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={timelineRef.ref} className="text-center mb-16">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
              Our Journey
            </span>
            <h2 className="text-4xl font-bold text-white mt-3">How We Grew</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/50 via-teal-500/30 to-transparent" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-center gap-8
                    ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
                    ${timelineRef.inView ? (i % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right") : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="flex-1">
                    <div
                      className={`p-6 rounded-2xl border border-gray-800 bg-gray-900/60 hover:border-teal-500/40 transition-all ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                    >
                      <span className="text-teal-400 text-sm font-semibold">
                        {m.year}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1 mb-2">
                        {m.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-teal-500/20 border-2 border-teal-500 items-center justify-center flex-shrink-0 z-10">
                    <div className="w-3 h-3 rounded-full bg-teal-400" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-900/40 border-y border-gray-800">
        <div
          ref={missionRef.ref}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-16">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
              What Drives Us
            </span>
            <h2 className="text-4xl font-bold text-white mt-3">
              Mission & Vision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`p-8 rounded-2xl border border-teal-500/30 bg-teal-500/5 ${missionRef.inView ? "animate-slide-in-left" : "opacity-0"}`}
            >
              <div className="w-14 h-14 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-400 leading-relaxed">
                To empower businesses of every size with world-class WordPress
                solutions — from custom themes to WooCommerce stores — that are
                fast, secure, and built to convert. We believe every business
                deserves a website that works as hard as they do.
              </p>
            </div>
            <div
              className={`p-8 rounded-2xl border border-blue-500/30 bg-blue-500/5 ${missionRef.inView ? "animate-slide-in-right" : "opacity-0"}`}
            >
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To be India&apos;s most trusted WordPress agency — known not
                just for beautiful websites but for measurable business
                outcomes. We aim to be the partner businesses return to time and
                again, project after project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={valuesRef.ref} className="text-center mb-16">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
              What We Stand For
            </span>
            <h2 className="text-4xl font-bold text-white mt-3">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border ${v.color} transition-all hover:scale-105 duration-300 text-center
                  ${valuesRef.inView ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Experts */}
      <section className="py-24 bg-gray-900/40 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={teamRef.ref} className="text-center mb-16">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
              The People Behind the Work
            </span>
            <h2 className="text-4xl font-bold text-white mt-3">
              Meet Our Experts
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              A dedicated team of specialists working together to deliver
              exceptional digital solutions for every client.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className={`group text-center p-6 rounded-2xl border border-gray-800 bg-gray-900/60
                  hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300
                  ${teamRef.inView ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="relative w-48 h-56 rounded-2xl overflow-hidden mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-teal-400 text-sm font-medium">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef.ref}
        className="py-24 bg-gray-900/40 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-blue-900/20 pointer-events-none" />
        <div
          className={`relative z-10 max-w-4xl mx-auto px-4 text-center ${ctaRef.inView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Let&apos;s Build Something{" "}
            <span className="shimmer-text">Amazing Together</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Partner with Zalgo Infotech — your dedicated WordPress experts,
            ready to grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-teal-600 text-white font-bold text-lg hover:bg-teal-500 transition-all hover:shadow-2xl hover:shadow-teal-500/30 animate-pulse-glow"
            >
              Get in Touch
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="px-10 py-5 rounded-xl border border-gray-700 text-gray-300 font-bold text-lg hover:border-teal-500 hover:text-white transition-all flex items-center justify-center"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
