'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const projects = [
  {
    slug: 'expert-heavy-equipment',
    image: '/case-study/experthe-case-study.png',
    client: 'Milissa',
    category: 'E-commerce',
    duration: '4+ Years',
    title: 'Expert Heavy Equipment — Website Redesign & Security Enhancement',
    subtitle: 'Security & Performance Overhaul',
    description: 'Expert Heavy Equipment is a trusted business in the heavy equipment industry. The client needed a strong, secure online presence to represent their brand and support long-term growth with integrated communication tools.',
    tech: ['WordPress', 'WooCommerce', 'Twilio', 'Wordfence'],
    url: '#',
  },
  {
    slug: 'awakening-genius-within',
    image: '/case-study/Awakeningthegeniuswithin.jpg',
    client: 'Wellness Brand',
    category: 'Wellness',
    duration: 'Ongoing',
    title: 'Awakening The Genius Within — Book Showcase & Wellness Platform',
    subtitle: 'Wellness & Personal Development Website',
    description: 'A comprehensive informational website built on WordPress to showcase wellness and personal development resources — books, articles, and curated content empowering individuals to unlock their full potential.',
    tech: ['WordPress', 'WooCommerce', 'CSS3', 'JavaScript', 'Responsive Design', 'SEO'],
    url: 'https://awakeningthegeniuswithin.com',
  },
  {
    slug: 'dobramoc',
    image: '/case-study/Dobramoc.jpg',
    client: 'E-commerce Brand',
    category: 'E-commerce',
    duration: 'Ongoing',
    title: 'Dobramoc — E-commerce Website Design & Development',
    subtitle: 'WooCommerce Store with Performance Optimization',
    description: 'A WooCommerce-powered e-commerce platform delivering a seamless online shopping experience with optimized performance, secure payment integration, and a conversion-focused product catalog.',
    tech: ['WordPress', 'WooCommerce', 'E-commerce', 'Payment Gateway', 'SEO', 'Responsive Design'],
    url: '#',
  },
  {
    slug: 'finance-manager-training',
    image: '/case-study/Finance-Manager-Training.jpg',
    client: 'Finance Training Brand',
    category: 'Finance Training',
    duration: 'Ongoing',
    title: 'Finance Manager Training — Business Finance & Revenue Growth',
    subtitle: 'WooCommerce E-learning Platform for Finance Professionals',
    description: 'A WooCommerce-powered training platform delivering structured finance courses and revenue-growth strategies to business managers, scaled to $1M+ monthly revenue through targeted digital marketing.',
    tech: ['WordPress', 'WooCommerce', 'SEO', 'Digital Marketing', 'Responsive Design', 'Payment Gateway'],
    url: '#',
  },
  {
    slug: 'life-tree-anatomical',
    image: '/case-study/Lifetreeanatomical.jpg',
    client: 'Healthcare Organisation',
    category: 'Healthcare',
    duration: 'Ongoing',
    title: 'Life Tree Anatomical — Whole Body Donation & Medical Research Service',
    subtitle: 'Healthcare-Focused Service Website',
    description: 'A healthcare-focused service website facilitating whole body donation for medical research and education. Provides individuals and families a clear, respectful, and guided anatomical donation process.',
    tech: ['WordPress', 'Healthcare', 'UI/UX Design', 'JavaScript', 'CSS3', 'Responsive Design'],
    url: 'https://lifetreeanatomical.com',
  },
  {
    slug: 'towels-outlet',
    image: '/case-study/towelsoutlet.jpg',
    client: 'Textile Brand',
    category: 'E-commerce',
    duration: 'Ongoing',
    title: 'Towels Outlet — Premium Textile E-commerce Store',
    subtitle: 'WooCommerce Store with Conversion-Focused Design',
    description: 'A WooCommerce-based online store for premium towels and textiles, built with a clean, conversion-focused design to drive online sales, enhance customer experience, and integrate seamless payment processing.',
    tech: ['WordPress', 'WooCommerce', 'E-commerce', 'SEO', 'Payment Gateway', 'Responsive Design'],
    url: 'https://towelsoutlet.com',
  },
  {
    slug: 'kinein-medtech',
    image: '/case-study/KineinMain.png',
    client: 'Kinein MedTech',
    category: 'Healthcare Technology',
    duration: 'Completed',
    title: 'Kinein MedTech — Advanced Medical Device Solutions & OEM Healthcare Manufacturing',
    subtitle: 'Scalable Digital Platform for Global MedTech Products & Healthcare Education',
    description: 'Kinein MedTech is an advanced medical technology company specializing in orthopedic implants, surgical instruments, arthroscopy education, and OEM contract manufacturing. Zalgo Infotech developed a professional platform to showcase their portfolio and establish credibility in global healthcare markets.',
    tech: ['WordPress', 'Custom Theme', 'Responsive Design', 'SEO', 'UI/UX Design', 'Performance Optimization'],
    url: '#',
  },
  {
    slug: 'leomi',
    image: '/case-study/LeomiMain.png',
    client: 'LEOMI',
    category: 'Industrial Technology',
    duration: 'Completed',
    title: 'LEOMI — Insertion Thermal Mass Flow Meter | German Technology Engineered in India',
    subtitle: 'Professional Digital Platform for Industrial Measurement Solutions',
    description: 'LEOMI is a manufacturing venture specializing in Thermal Mass Flow Meters with German engineering standards. Zalgo Infotech designed and developed a professional digital platform to showcase their product range, technical specifications, and industrial measurement expertise.',
    tech: ['WordPress', 'Custom Theme', 'Responsive Design', 'SEO', 'UI/UX Design'],
    url: '#',
  },
  {
    slug: 'compufy-technolab',
    image: '/case-study/CompufyMain.jpg',
    client: 'Compufy Technolab',
    category: 'IT Consulting',
    duration: 'Completed',
    title: 'Compufy Technolab — Modern IT Solutions Website Designed for Growth & Trust',
    subtitle: 'Professional Digital Platform for IT Consulting & Technology Services',
    description: 'Compufy Technolab is a technology-driven company providing IT consulting, managed IT services, cybersecurity solutions, cloud services, and digital transformation support. Zalgo Infotech redesigned and developed a professional website that highlights their expertise and builds trust with potential clients.',
    tech: ['WordPress', 'Custom Theme Development', 'Responsive Web Design', 'Performance Optimization', 'Mobile-First Development', 'SEO'],
    url: '#',
  },
  {
    slug: 'kalp-mantra',
    image: '/case-study/KalpMantraMain.jpg',
    client: 'Kalp Mantra',
    category: 'Ayurvedic Healthcare',
    duration: 'Completed',
    title: 'Kalp Mantra — 100% Ayurvedic Treatment & Healthcare E-commerce Platform',
    subtitle: 'Professional Healthcare Website for Ayurvedic Products & Treatments',
    description: 'Kalp Mantra is an Ayurvedic healthcare brand offering 100% natural treatments and products. Zalgo Infotech designed and developed a professional digital platform to showcase their product range, build patient trust, and support online product sales.',
    tech: ['WordPress', 'WooCommerce', 'Custom Theme', 'Responsive Design', 'SEO', 'UI/UX Design'],
    url: '#',
  },
  {
    slug: 'shivaline-plastotech',
    image: '/case-study/ZalgoinfotechShivalineMain.jpg',
    client: 'Shivaline Plastotech',
    category: 'Manufacturing',
    duration: 'Ongoing',
    title: 'Shivaline Plastotech — Industrial Manufacturing Website',
    subtitle: 'Corporate Website for Plastics & Packaging Manufacturer',
    description: 'A professional corporate website for Shivaline Plastotech, a leading manufacturer of multi-layered cross-laminated films and packaging solutions. Built to showcase their product range, infrastructure, and distribution network to global B2B clients.',
    tech: ['WordPress', 'Custom Theme', 'Responsive Design', 'SEO', 'UI/UX Design'],
    url: '#',
  },
  {
    slug: 'iparkhub',
    image: '/case-study/IParkMain.jpg',
    client: 'iParkHub',
    category: 'Technology',
    duration: 'Completed',
    title: 'iParkHub — Smart Parking Solutions Platform',
    subtitle: 'Modern Digital Platform for Automated Parking Management',
    description: 'iParkHub is an innovative smart parking solution platform focused on automated parking systems and modern parking management technologies. Zalgo Infotech designed and developed a professional digital platform to showcase technology solutions, automation capabilities, and smart infrastructure services.',
    tech: ['WordPress', 'Custom Theme', 'Responsive Design', 'SEO', 'UI/UX Design'],
    url: '#',
  },
  {
    slug: 'indel-elevators',
    image: '/case-study/IndelElevatorsMain.jpg',
    client: 'Indel Elevators',
    category: 'Manufacturing',
    duration: 'Completed',
    title: 'Indel Elevators — Elevator Solutions Corporate Website',
    subtitle: 'Professional Corporate Website for Vertical Mobility Solutions',
    description: 'A professional corporate website for Indel Elevators, a leading manufacturer of customized elevator and vertical mobility solutions. Built to showcase their product range, engineering capabilities, and technical expertise to B2B clients.',
    tech: ['WordPress', 'Custom Theme', 'Responsive Design', 'SEO', 'UI/UX Design'],
    url: '#',
  },
  {
    slug: 'the-buzz-app',
    image: '/case-study/BuzzMain.jpg',
    client: 'The Buzz App',
    category: 'Smart Home / IoT',
    duration: 'Completed',
    title: 'The Buzz App — Controlling Smart Devices Through a Single Mobile Experience',
    subtitle: 'Modern Digital Platform for Smart Home Automation & IoT Connectivity',
    description: 'The Buzz App is an innovative smart home automation platform designed to simplify the way users interact with connected devices. Zalgo Infotech developed a modern digital platform that communicates the product\'s capabilities, user benefits, and smart connectivity ecosystem.',
    tech: ['WordPress', 'Custom Theme Development', 'Responsive Web Design', 'Performance Optimization', 'Mobile-First Development', 'SEO'],
    url: '#',
  },
  {
    slug: 'lockit-pro',
    image: '/case-study/LockItProMain.jpg',
    client: 'LockIt Pro',
    category: 'Smart Security',
    duration: 'Completed',
    title: 'LockIt Pro — Smart Padlock Technology for Modern Security',
    subtitle: 'Professional Digital Platform for Smart Security Innovation',
    description: 'LockIt Pro is an innovative smart padlock solution designed to combine physical security with modern digital convenience. Zalgo Infotech partnered to create a professional digital platform that communicates product features, security benefits, and technology advantages.',
    tech: ['WordPress', 'Custom Theme', 'HTML5 & CSS3', 'JavaScript', 'Mobile Optimization', 'SEO'],
    url: '#',
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={`group rounded-2xl border border-gray-800 bg-gray-900/60 overflow-hidden
        hover:border-teal-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10
        flex flex-col
        ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${(index % 2) * 0.15}s` }}
    >
      <Link href={`/portfolio/${project.slug}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative h-60 overflow-hidden bg-gray-900 flex-shrink-0 flex items-center justify-center">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-4 left-4 z-10">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold border border-white/20">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {project.client}
            </span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              {project.category}
            </span>
            <span className="w-1 h-1 bg-gray-700 rounded-full" />
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {project.duration}
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-white mb-2 leading-snug group-hover:text-teal-400 transition-colors">
            {project.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-3">
            <svg className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-teal-400 text-xs font-semibold">{project.subtitle}</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

          {/* Tech Stack */}
          <div className="mb-5">
            <p className="text-xs font-bold text-white mb-2">Tech Stack:</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-full border border-teal-500/30 bg-teal-500/8 text-teal-300">{t}</span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="inline-flex items-center gap-3 text-white font-bold text-xs w-fit mt-auto">
            <span className="uppercase tracking-widest">View Case Study</span>
            <div className="h-px w-10 bg-teal-500 group-hover:w-16 transition-all duration-300" />
            <svg className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Portfolio() {
  const statsRef = useInView();
  const ctaRef = useInView();

  return (
    <div className="bg-gray-950 overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-500/8 rounded-full blur-3xl" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(0,153,153,0.04) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-sm mb-8 animate-fade-in-down">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Real Results from Real WordPress Projects
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 animate-fade-in-up leading-tight">
            Our WordPress <br /><span className="shimmer-text">Success Stories</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200 opacity-0-init">
            Every project tells a story of growth. Here are some WordPress solutions we built that transformed businesses.
          </p>
        </div>
      </section>

      {/* Featured Case Study — BioAge */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              Featured Case Study
            </span>
          </div>

          <Link href="/portfolio/bioage" className="group rounded-3xl border border-gray-700 bg-gray-900/60 overflow-hidden hover:border-teal-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/10 block">
            <div className="grid grid-cols-1 lg:grid-cols-2">

              {/* Left: Image */}
              <div className="relative h-72 lg:h-auto min-h-[340px] overflow-hidden bg-gray-800">
                <Image
                  src="/case-study/bioage-case-study.png"
                  alt="BioAge Case Study — Zalgo Infotech"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-gray-900/40" />
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1.5 rounded-full bg-teal-500 text-white text-xs font-bold shadow-lg">
                    E-commerce
                  </span>
                </div>
              </div>

              {/* Right: Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-5">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Roland Thomas
                  </span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    E-commerce
                  </span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    6+ Years
                  </span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-2 leading-tight">
                  BIOAGE — Scaling a 7-Figure<br className="hidden lg:block" /> E-commerce Brand
                </h2>

                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-teal-400 font-semibold text-sm">Long-Term Strategic Tech Partner</span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  BIOAGE is a high-performing e-commerce brand generating <span className="text-teal-400 font-medium">7-figure monthly revenue</span>. For over 6 years, we have managed end-to-end technology, performance optimization, security, and continuous platform growth.
                </p>

                {/* Results */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['$1M+ Monthly Revenue', '6+ Year Partnership', '99.9% Uptime', 'Global Scale'].map((r, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-400 font-medium">{r}</span>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="mb-7">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {['WordPress', 'WooCommerce', 'SiteGround', 'Sucuri', 'Payment Gateways'].map((t, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 text-gray-300">{t}</span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="inline-flex items-center gap-3 text-white font-bold text-sm w-fit">
                  <span className="uppercase tracking-widest text-xs">View Case Study</span>
                  <div className="flex-1 h-px w-12 bg-teal-500 group-hover:w-20 transition-all duration-300" />
                  <svg className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800 border border-gray-700 text-gray-400 text-xs font-semibold uppercase tracking-wider">
              More Projects
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-900/50 border-y border-gray-800">
        <div ref={statsRef.ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Our Track Record</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: 100, suffix: '+', label: 'WordPress Projects' },
              { value: 4, suffix: '.8★', label: 'Overall Rating' },
              { value: 10, suffix: '+', label: 'Years Experience' },
              { value: 80, suffix: '+', label: 'Happy Clients' },
            ].map((s, i) => (
              <div key={i} className={`text-center flex flex-col items-center ${statsRef.inView ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="text-5xl font-extrabold text-teal-400 mb-2 whitespace-nowrap">
                  {statsRef.inView && <AnimatedCounter end={s.value} suffix={s.suffix} />}
                </div>
                <p className="text-gray-400 text-sm leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef.ref} className="py-28 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-teal-900/20 pointer-events-none" />
        <div className={`relative z-10 max-w-4xl mx-auto px-4 text-center ${ctaRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Want to be our next<br /><span className="shimmer-text">Success Story?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Let&apos;s build a WordPress site that actually grows your business.
          </p>
          <Link href="/contact" className="group inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-teal-600 text-white font-bold text-lg hover:bg-teal-500 transition-all hover:shadow-2xl hover:shadow-teal-500/30 animate-pulse-glow">
            Start Your Project
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
