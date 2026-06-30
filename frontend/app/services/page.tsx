'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ClutchIcon, GoodFirmsIcon, UpworkIcon } from '../components/PlatformIcons';
import { submitPlanInquiry, submitContactForm } from '@/lib/api';

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

function AnimatedCounter({ end, prefix = '', suffix = '' }: { end: number; prefix?: string; suffix?: string }) {
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
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const problems = [
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    label: 'Slow Loading Website', color: 'text-red-400 bg-red-500/10 border-red-500/20',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    label: 'Outdated Plugins', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    label: 'Security Risks', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    label: 'WooCommerce Checkout Issues', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    label: 'Broken Contact Forms', color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12H3m2 0a9 9 0 1018 0 9 9 0 00-18 0zm14 0h2M12 5V3m0 2a9 9 0 010 18m0-18v2m0 16v2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3" /></svg>,
    label: 'Hosting Problems', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    label: 'Technical SEO Issues', color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  },
  {
    icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M6.343 17.657a9 9 0 010-12.728m2.829 9.9a5 5 0 010-7.072M12 12h.01" /></svg>,
    label: 'Website Downtime', color: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
  },
];

const features = [
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    title: 'Security Monitoring', desc: 'Real-time threat detection & malware removal',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    title: 'Speed Optimization', desc: 'Core Web Vitals & PageSpeed improvements',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    title: 'Plugin Updates', desc: 'Safe, tested updates every week',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    title: 'Backups', desc: 'Daily automated backups, offsite stored',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    title: 'WooCommerce Support', desc: 'Store health, orders & checkout fixes',
  },
  {
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    color: 'text-green-400 bg-green-500/10 border-green-500/20',
    title: 'Custom Development', desc: 'Minor fixes & improvements included',
  },
];

const plans = [
  {
    name: 'Essential Care',
    price: '$99',
    period: '/month',
    popular: false,
    color: 'border-gray-700',
    btnClass: 'border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white',
    features: [
      'WordPress Core Updates',
      'Plugin & Theme Updates',
      'Weekly Backups',
      'Security Monitoring',
      'Uptime Monitoring',
      'Email Support',
    ],
  },
  {
    name: 'Growth Care',
    price: '$199',
    period: '/month',
    popular: true,
    color: 'border-teal-500',
    btnClass: 'bg-teal-600 text-white hover:bg-teal-500',
    features: [
      'Everything in Essential Care +',
      'Speed Optimization',
      'Monthly Performance Reports',
      'Database Optimization',
      'Priority Support',
      'Bug Fixes & Minor Changes',
    ],
  },
  {
    name: 'WooCommerce Care',
    price: 'Custom',
    period: '',
    popular: false,
    color: 'border-gray-700',
    btnClass: 'border border-gray-600 text-gray-300 hover:border-teal-500 hover:text-teal-400',
    features: [
      'Everything in Growth Care +',
      'WooCommerce Updates',
      'Checkout Monitoring',
      'Payment Gateway Support',
      'Store Maintenance',
      'Advanced Support',
    ],
  },
];

const recentWork = [
  {
    name: 'Towels Outlet',
    image: '/case-study/towelsoutlet.jpg',
    tag: 'E-commerce · WooCommerce',
    desc: 'Premium Textile Store',
    slug: 'towels-outlet',
    url: 'https://towelsoutlet.com',
    accent: 'text-orange-400',
  },
  {
    name: 'Awakening The Genius Within',
    image: '/case-study/Awakeningthegeniuswithin.jpg',
    tag: 'Wellness · WordPress',
    desc: 'Book Showcase & Wellness Platform',
    slug: 'awakening-genius-within',
    url: 'https://awakeningthegeniuswithin.com',
    accent: 'text-purple-400',
  },
  {
    name: 'Life Tree Anatomical',
    image: '/case-study/Lifetreeanatomical.jpg',
    tag: 'Healthcare · WordPress',
    desc: 'Medical Service Website',
    slug: 'life-tree-anatomical',
    url: 'https://lifetreeanatomical.com',
    accent: 'text-green-400',
  },
];

export default function Services() {
  const statsRef = useInView();
  const problemsRef = useInView();
  const featuresRef = useInView();
  const caseRef = useInView();
  const plansRef = useInView();
  const workRef = useInView();
  const ctaRef = useInView();
  const [videoStarted, setVideoStarted] = useState(false);
  const [auditForm, setAuditForm] = useState({ name: '', email: '', phone: '', url: '', message: '' });
  const [auditState, setAuditState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [auditMsg, setAuditMsg] = useState('');

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditForm.name.trim() || !auditForm.email.trim()) {
      setAuditState('error');
      setAuditMsg('Name and Email are required.');
      return;
    }
    setAuditState('loading');
    const result = await submitContactForm({
      name: auditForm.name,
      email: auditForm.email,
      mobile: auditForm.phone || 'Not provided',
      website: auditForm.url || undefined,
      message: auditForm.message || 'Requested a free WordPress website audit.',
      service: 'Free WordPress Audit — Services Page',
    });
    if (result.success) {
      setAuditState('success');
      setAuditMsg('');
      setAuditForm({ name: '', email: '', phone: '', url: '', message: '' });
    } else {
      setAuditState('error');
      setAuditMsg(result.message || 'Something went wrong. Please try again.');
    }
  };

  // Plan Modal state
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [planForm, setPlanForm] = useState({ name: '', email: '', phone: '', website: '' });
  const [planFormState, setPlanFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [planFormMsg, setPlanFormMsg] = useState('');

  const openPlanModal = (planName: string) => {
    setSelectedPlan(planName);
    setPlanForm({ name: '', email: '', phone: '', website: '' });
    setPlanFormState('idle');
    setPlanFormMsg('');
  };
  const closePlanModal = () => setSelectedPlan(null);

  const handlePlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setPlanFormState('loading');
    const result = await submitPlanInquiry({ ...planForm, plan: selectedPlan });
    if (result.success) {
      setPlanFormState('success');
      setPlanFormMsg(result.message);
    } else {
      setPlanFormState('error');
      setPlanFormMsg(result.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
    <div className="bg-gray-950 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(rgba(0,153,153,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-400 text-xs font-semibold uppercase tracking-widest mb-8 animate-fade-in-down">
            <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
            WordPress Experts Since 2016
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 animate-fade-in-up">
            WordPress Services<br />
            <span className="shimmer-text">Built to Grow</span> Your Business
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up leading-relaxed">
            From custom development to ongoing maintenance — we handle every aspect of your WordPress website so you can focus on your business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up mb-14">
            <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition-all hover:shadow-xl hover:shadow-teal-500/30">
              Get Free Website Audit
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:border-teal-500 hover:text-white transition-all">
              View Our Work
            </Link>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up">
            {[
              { value: '100+', label: 'Projects Delivered' },
              { value: '10+', label: 'Years Experience' },
              { value: '4.8★', label: 'Average Rating' },
              { value: '99.9%', label: 'Client Uptime' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center px-6 py-3 rounded-2xl bg-gray-900/60 border border-gray-800">
                <span className="text-2xl font-extrabold text-teal-400">{s.value}</span>
                <span className="text-gray-500 text-xs mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── ALL SERVICES GRID ── */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">What We Do</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-4">
              Our WordPress <span className="text-teal-400">Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From development to security, we cover every aspect of your WordPress website. Click any service to learn more.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                slug: 'wordpress-development',
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                title: 'WordPress Website Development',
                desc: 'Professional WordPress websites designed to represent your brand, generate leads, and deliver a great user experience.',
                tag: 'Development',
                tagColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
              },
              {
                slug: 'woocommerce-development',
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                title: 'WooCommerce Development',
                desc: 'Custom WooCommerce stores built for performance, scalability, and higher conversions.',
                tag: 'eCommerce',
                tagColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
              },
              {
                slug: 'wordpress-maintenance',
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                title: 'WordPress Maintenance',
                desc: 'Regular updates, backups, monitoring, bug fixes, and technical support to keep your website running smoothly.',
                tag: 'Maintenance',
                tagColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
              },
              {
                slug: 'speed-optimization',
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: 'Website Speed Optimization',
                desc: 'Improve load times and create a faster experience for your visitors across all devices.',
                tag: 'Performance',
                tagColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
              },
              {
                slug: 'wordpress-security',
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                title: 'WordPress Security',
                desc: 'Protect your website with proactive security monitoring and industry best practices.',
                tag: 'Security',
                tagColor: 'bg-red-500/10 text-red-400 border-red-500/20',
              },
              {
                slug: 'custom-development',
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
                title: 'Custom WordPress Development',
                desc: 'Need custom functionality or integrations? We build solutions tailored to your business.',
                tag: 'Custom',
                tagColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
              },
            ].map((s, i) => (
              <Link
                key={i}
                href={`/services/${s.slug}`}
                className="group p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 block"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${s.tagColor}`}>{s.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center gap-1 text-teal-400 text-sm font-semibold group-hover:gap-2 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ── */}
      <section className="py-20 bg-gray-950">
        <div ref={problemsRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${problemsRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4">
              Is Your Website <span className="text-red-400">Costing You Customers?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We Fix Issues That Affect Your Website Performance, Security &amp; Conversions
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {problems.map((p, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-4 p-5 rounded-2xl border bg-gray-900/50
                  transition-all duration-300 group cursor-default
                  ${p.color} hover:scale-105
                  ${problemsRef.inView ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {p.icon}
                </div>
                <p className="text-xs text-center font-medium leading-snug">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LONG TERM SUPPORT ── */}
      <section className="py-24 bg-gray-900/40 border-y border-gray-800">
        <div ref={featuresRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: visual */}
            <div className={`relative ${featuresRef.inView ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="absolute -inset-4 bg-blue-500/8 rounded-3xl blur-2xl" />
              <div className="relative bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-bold">Proactive Protection</p>
                    <p className="text-gray-500 text-sm">Always one step ahead</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {['Security scan completed', 'Plugins updated (12/12)', 'Backup verified ✓', 'PageSpeed: 94/100', 'Uptime: 99.9%'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/60">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: content */}
            <div className={`${featuresRef.inView ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-4 leading-tight">
                Long-Term WordPress Support <span className="text-teal-400">You Can Rely On</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Instead of fixing problems after they happen, we proactively maintain, secure, and optimize your website.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-teal-500/40 transition-all">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${f.color}`}>{f.icon}</div>
                    <div>
                      <p className="text-white font-semibold text-sm">{f.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY: BIOAGE ── */}
      <section className="py-24 bg-gray-950">
        <div ref={caseRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 ${caseRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Featured Case Study</span>
          </div>
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl ${caseRef.inView ? 'animate-scale-in' : 'opacity-0'}`}>

            {/* Left: visual */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-10 flex flex-col justify-center">
              <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Case Study</div>
              <h3 className="text-4xl font-extrabold text-white mb-2">BioAge</h3>
              <p className="text-blue-200 text-sm mb-6">The Future of Longevity</p>
              <div className="w-16 h-1 bg-white/30 rounded mb-6" />
              <p className="text-blue-200 text-sm">Premium health & wellness brand scaling globally with WooCommerce.</p>
            </div>

            {/* Middle: details */}
            <div className="bg-gray-900 p-10 border-x border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                  <span className="text-teal-400 font-bold text-sm">B</span>
                </div>
                <div>
                  <p className="text-white font-bold">BioAge</p>
                  <p className="text-teal-400 text-xs">Managed Since 2019</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  'WooCommerce Store Management',
                  'Security Management with Sucuri',
                  'Technical SEO & Speed Optimization',
                  'Hosting & Server Management',
                  'Payment Gateway Management',
                  'Ongoing Maintenance & Support',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: result */}
            <div className="bg-gray-900/80 p-10 flex flex-col justify-between">
              <div>
                <div className="text-4xl mb-3">🏆</div>
                <div className="text-5xl font-extrabold text-teal-400 mb-2">$1M+</div>
                <p className="text-gray-300 font-semibold mb-2">Revenue Supported</p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  while providing ongoing maintenance and technical support since 2019.
                </p>
              </div>
              <a
                href="https://bioage.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition-all self-start"
              >
                View Website
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-gray-900/40 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Reviews</span>
            <h2 className="text-4xl font-extrabold text-white mt-3 mb-3">What Our Clients Say</h2>
            <p className="text-gray-400">Real Reviews from Real Clients on Different Platforms</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

            {/* Video testimonial */}
            <div className="lg:col-span-1">
              <div className="relative rounded-2xl overflow-hidden border border-gray-700 aspect-square lg:aspect-auto lg:h-64 bg-gray-900 cursor-pointer group" onClick={() => setVideoStarted(true)}>
                {!videoStarted ? (
                  <>
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url(https://img.youtube.com/vi/TxjsRFwDvbQ/mqdefault.jpg)`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                    }} />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/TxjsRFwDvbQ?autoplay=1&rel=0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <p className="text-center text-gray-400 text-sm mt-3 font-medium">Video Testimonial</p>
              <p className="text-center text-gray-500 text-xs">Client Review</p>
            </div>

            {/* Review platforms */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  platform: 'Clutch',
                  text: 'Zalgo Infotech has been an outstanding partner for our WordPress and WooCommerce needs. Highly professional and reliable team!',
                },
                {
                  platform: 'GoodFirms',
                  text: 'They deliver quality work on time and provide excellent support. Our website is in safe hands with Zalgo Infotech.',
                },
                {
                  platform: 'Upwork',
                  text: 'Great experience working with Zalgo Infotech. Very skilled, responsive and always goes the extra mile!',
                },
              ].map((r, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-700 bg-gray-900/60 hover:border-teal-500/40 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {r.platform === 'Clutch' && (
                        <>
                          <ClutchIcon className="w-7 h-7 text-red-500 flex-shrink-0" />
                          <span className="text-red-400 font-bold text-base tracking-tight">Clutch</span>
                        </>
                      )}
                      {r.platform === 'GoodFirms' && (
                        <>
                          <GoodFirmsIcon className="w-7 h-7 text-blue-500 flex-shrink-0" />
                          <span className="text-blue-400 font-bold text-base tracking-tight">GoodFirms</span>
                        </>
                      )}
                      {r.platform === 'Upwork' && (
                        <>
                          <UpworkIcon className="w-7 h-7 text-green-500 flex-shrink-0" />
                          <span className="text-green-400 font-bold text-base tracking-tight">Upwork</span>
                        </>
                      )}
                    </div>
                    <span className="text-yellow-400 text-xs font-semibold">5.0 ★</span>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-green-400 text-xs font-medium">Verified Review</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING PLANS ── */}
      <section id="pricing" className="py-24 bg-gray-950">
        <div ref={plansRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${plansRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Pricing</span>
            <h2 className="text-4xl font-extrabold text-white mt-3 mb-3">WordPress Maintenance Plans</h2>
            <p className="text-gray-400">Choose the plan that best fits your business needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl border-2 bg-gray-900/60 flex flex-col transition-all duration-300 hover:shadow-2xl
                  ${plan.popular ? 'border-teal-500 shadow-xl shadow-teal-500/20 scale-[1.03]' : 'border-gray-700 hover:border-gray-600'}
                  ${plansRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-teal-500 text-white text-xs font-bold shadow-lg">
                      ★ MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400 mb-2">{plan.period}</span>}
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>

                {plan.price === 'Custom' ? (
                  <Link href="/contact" className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 block ${plan.btnClass}`}>
                    Contact Us
                  </Link>
                ) : (
                  <button
                    onClick={() => openPlanModal(plan.name)}
                    className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 ${plan.btnClass}`}
                  >
                    Choose Plan
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT WORK ── */}
      <section className="py-24 bg-gray-900/40 border-t border-gray-800">
        <div ref={workRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${workRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Portfolio</span>
            <h2 className="text-4xl font-extrabold text-white mt-3">Our Recent Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentWork.map((w, i) => (
              <Link
                key={i}
                href={`/portfolio/${w.slug}`}
                className={`group rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/60 hover:border-teal-500/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col
                  ${workRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Screenshot */}
                <div className="relative h-48 bg-gray-800 overflow-hidden flex-shrink-0">
                  <Image
                    src={w.image}
                    alt={w.name}
                    fill
                    className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-4 py-2 rounded-lg bg-teal-600 text-white text-xs font-bold shadow-lg">
                      View Case Study →
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-white font-bold text-base mb-1 group-hover:text-teal-400 transition-colors">{w.name}</h3>
                  <p className={`text-xs font-semibold mb-1 ${w.accent}`}>{w.desc}</p>
                  <p className="text-gray-600 text-xs">{w.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE AUDIT CTA ── */}
      <section ref={ctaRef.ref} className="py-20 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-blue-900/20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${ctaRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>

            {/* Left */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">
                Get a Free WordPress <span className="text-teal-400">Website Audit</span>
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                We&apos;ll review your website and identify security, performance, and maintenance opportunities to help your business grow.
              </p>
              <div className="flex flex-wrap gap-4">
                {['No Obligation', '100% Free', 'Actionable Insights'].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: mini form */}
            <div className="p-8 rounded-2xl border border-gray-700 bg-gray-900/80 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500" />

              {auditState === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-teal-500/15 border-2 border-teal-500/50 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">Audit Request Received!</h3>
                  <p className="text-gray-400 text-sm mb-1">We&apos;ll review your website and get back to you within 24 hours.</p>
                  <p className="text-teal-400 text-sm font-medium">Check your email for confirmation.</p>
                  <button
                    onClick={() => setAuditState('idle')}
                    className="mt-6 text-xs text-gray-500 hover:text-gray-300 underline transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAuditSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={auditForm.name}
                      onChange={e => setAuditForm(p => ({ ...p, name: e.target.value }))}
                      disabled={auditState === 'loading'}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-teal-500 focus:outline-none transition-colors disabled:opacity-50"
                    />
                    <input
                      type="email"
                      placeholder="Your Email *"
                      value={auditForm.email}
                      onChange={e => setAuditForm(p => ({ ...p, email: e.target.value }))}
                      disabled={auditState === 'loading'}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-teal-500 focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={auditForm.phone}
                      onChange={e => setAuditForm(p => ({ ...p, phone: e.target.value }))}
                      disabled={auditState === 'loading'}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-teal-500 focus:outline-none transition-colors disabled:opacity-50"
                    />
                    <input
                      type="url"
                      placeholder="Website URL"
                      value={auditForm.url}
                      onChange={e => setAuditForm(p => ({ ...p, url: e.target.value }))}
                      disabled={auditState === 'loading'}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-teal-500 focus:outline-none transition-colors disabled:opacity-50"
                    />
                  </div>
                  <textarea
                    placeholder="Message (Optional)"
                    rows={3}
                    value={auditForm.message}
                    onChange={e => setAuditForm(p => ({ ...p, message: e.target.value }))}
                    disabled={auditState === 'loading'}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-teal-500 focus:outline-none transition-colors resize-none disabled:opacity-50"
                  />
                  {auditState === 'error' && auditMsg && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/8 border border-red-500/25">
                      <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-red-300 text-xs">{auditMsg}</p>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={auditState === 'loading'}
                    className="group w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition-all hover:shadow-xl hover:shadow-teal-500/30 animate-pulse-glow disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {auditState === 'loading' ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Free Audit
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>

    {/* ── PLAN INQUIRY MODAL ── */}
    {selectedPlan ? (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => { if (e.target === e.currentTarget) closePlanModal(); }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <div className="relative w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">

          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6">
            <button
              onClick={closePlanModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-white/70 text-xs font-medium">Selected Plan</p>
                <h3 className="text-white font-extrabold text-lg">{selectedPlan}</h3>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {planFormState === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-teal-500/20 border-2 border-teal-500 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Inquiry Received!</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{planFormMsg}</p>
                <p className="text-gray-500 text-xs mt-2">Check your email for confirmation.</p>
                <button onClick={closePlanModal} className="mt-6 px-6 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-500 transition-colors">
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlanSubmit} noValidate>
                <p className="text-gray-400 text-sm mb-5">Fill in your details and we&apos;ll get back to you within 24 hours.</p>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={planForm.name}
                      onChange={e => setPlanForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={planForm.email}
                      onChange={e => setPlanForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={planForm.phone}
                      onChange={e => setPlanForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+1 234 567 8900"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Your Website URL</label>
                    <input
                      type="url"
                      value={planForm.website}
                      onChange={e => setPlanForm(f => ({ ...f, website: e.target.value }))}
                      placeholder="https://yoursite.com"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                {planFormState === 'error' && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="text-red-400 text-xs">{planFormMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={planFormState === 'loading'}
                  className="mt-5 w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-60 text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  {planFormState === 'loading' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : 'Get Started with ' + selectedPlan}
                </button>
                <p className="text-center text-gray-600 text-xs mt-3">No commitment. We&apos;ll send a free proposal first.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    ) : null}
    </>
  );
}
