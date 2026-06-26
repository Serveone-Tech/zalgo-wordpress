'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ClutchIcon, GoodFirmsIcon, UpworkIcon } from './components/PlatformIcons';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedCounter({ end, prefix = '', suffix = '', duration = 2000 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const Check = () => (
  <div className="w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500/50 flex items-center justify-center flex-shrink-0">
    <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

export default function Home() {
  const statsRef = useInView();
  const servicesRef = useInView();
  const caseRef = useInView();
  const whyRef = useInView();
  const testimonialsRef = useInView();
  const maintenanceRef = useInView();
  const ctaRef = useInView();
  const [videoStarted, setVideoStarted] = useState(false);

  return (
    <div className="bg-gray-950 overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,153,153,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,153,153,0.025) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="animate-fade-in-up">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/5 text-teal-400 text-xs font-medium mb-8">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Trusted by businesses since 2016 with long-term WordPress partnerships.
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                WordPress Development &amp; Maintenance That Businesses Can{' '}
                <span className="text-teal-400">Rely On</span>
              </h1>

              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                We help businesses build, maintain, secure, and optimize WordPress &amp; WooCommerce websites through long-term partnerships and ongoing support.
              </p>

              {/* Checklist 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  'WordPress Development',
                  'Security & Performance Optimization',
                  'WooCommerce Development',
                  'Custom WordPress Development',
                  'Website Maintenance & Support',
                  'Technical Support When You Need It',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/contact" className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition-all hover:shadow-xl hover:shadow-teal-500/25 animate-pulse-glow">
                  Get a Free Website Audit
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/portfolio" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:border-teal-500 hover:text-white transition-all">
                  View Our Work
                </Link>
              </div>

              {/* Social proof badges */}
              <div className="flex flex-wrap gap-3">
                {/* Clutch */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:border-red-500/40 transition-colors">
                  <ClutchIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="text-white text-xs font-bold leading-none">Clutch</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-2.5 h-2.5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                      <span className="text-gray-400 text-[10px] ml-0.5">5.0</span>
                    </div>
                  </div>
                </div>
                {/* GoodFirms */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40 transition-colors">
                  <GoodFirmsIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-white text-xs font-bold leading-none">GoodFirms</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-2.5 h-2.5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                      <span className="text-gray-400 text-[10px] ml-0.5">5.0</span>
                    </div>
                  </div>
                </div>
                {/* Upwork */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-green-500/20 bg-green-500/5 hover:border-green-500/40 transition-colors">
                  <UpworkIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-white text-xs font-bold leading-none">Upwork</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-2.5 h-2.5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                      <span className="text-gray-400 text-[10px] ml-0.5">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Laptop mockup with WooCommerce Analytics */}
            <div className="relative animate-slide-in-right hidden lg:block">
              {/* Glow */}
              <div className="absolute -inset-6 bg-teal-500/10 rounded-3xl blur-3xl pointer-events-none" />
              <div className="absolute -inset-10 bg-blue-500/5 rounded-3xl blur-3xl pointer-events-none" />

              <div className="relative">
                {/* ── Laptop shell ── */}
                <div className="relative mx-auto" style={{ width: '100%', maxWidth: '600px' }}>

                  {/* Screen lid — sleek dark bezel */}
                  <div style={{ background: 'linear-gradient(160deg,#2e2e2e,#1a1a1a)', borderRadius: '16px 16px 0 0', padding: '10px 10px 0', border: '1.5px solid #444', boxShadow: '0 0 0 1px #111, 0 25px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
                    {/* Webcam + indicator */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2a2a2a', border: '1px solid #3a3a3a', boxShadow: 'inset 0 0 2px rgba(0,0,0,0.8)' }} />
                      <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#46b450', boxShadow: '0 0 4px #46b450' }} />
                    </div>

                    {/* Screen — WP Admin */}
                    <div style={{ borderRadius: '6px 6px 0 0', overflow: 'hidden', border: '1px solid #111', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}>

                      {/* WP Admin top bar */}
                      <div style={{ background: '#1d2327', display: 'flex', alignItems: 'center', padding: '3px 8px', gap: '6px', borderBottom: '1px solid #2c3338' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#a7aaad">
                          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.542c2.401 0 4.597.876 6.291 2.313L5.855 18.291A8.434 8.434 0 013.542 12c0-4.669 3.789-8.458 8.458-8.458zm0 16.916a8.414 8.414 0 01-5.138-1.754l12.454-12.454A8.414 8.414 0 0120.458 12c0 4.669-3.789 8.458-8.458 8.458z"/>
                        </svg>
                        <span style={{ color: '#a7aaad', fontSize: '6.5px', fontFamily: 'sans-serif' }}>🏠 yoursite.com</span>
                        <span style={{ color: '#a7aaad', fontSize: '6.5px', fontFamily: 'sans-serif' }}>+ New</span>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <span style={{ color: '#a7aaad', fontSize: '6px', fontFamily: 'sans-serif' }}>Howdy, Admin</span>
                          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'linear-gradient(135deg,#0073aa,#005177)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: '#fff', fontSize: '5px', fontFamily: 'sans-serif', fontWeight: 700 }}>A</span>
                          </div>
                        </div>
                      </div>

                      {/* Body: sidebar + content */}
                      <div style={{ display: 'flex', height: '320px' }}>

                        {/* ── Sidebar ── full menu like screenshot */}
                        <div style={{ width: '90px', flexShrink: 0, background: '#1d2327', borderRight: '1px solid #2c3338', overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
                          {/* WP Logo */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px 0', borderBottom: '1px solid #2c3338' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0073aa">
                              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.542c2.401 0 4.597.876 6.291 2.313L5.855 18.291A8.434 8.434 0 013.542 12c0-4.669 3.789-8.458 8.458-8.458zm0 16.916a8.414 8.414 0 01-5.138-1.754l12.454-12.454A8.414 8.414 0 0120.458 12c0 4.669-3.789 8.458-8.458 8.458z"/>
                            </svg>
                          </div>
                          {/* Menu items — exact screenshot menu */}
                          {([
                            { label: 'Dashboard',       icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: false, color: '#a7aaad' },
                            { label: 'Elementor',       icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z', active: false, color: '#92003b' },
                            { label: 'Posts',           icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', active: false, color: '#a7aaad' },
                            { label: 'Portfolio',       icon: 'M19 11H7m12 0a2 2 0 010 4H7m12-4a2 2 0 000-4H7m0 0a2 2 0 010-4m0 4a2 2 0 000 4m0-4v12', active: false, color: '#a7aaad' },
                            { label: 'Testimonials',    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', active: false, color: '#a7aaad' },
                            { label: 'Media',           icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', active: false, color: '#a7aaad' },
                            { label: 'Pages',           icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', active: false, color: '#a7aaad' },
                            { label: 'Comments',        icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z', active: false, color: '#a7aaad' },
                            { label: 'Contact',         icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', active: false, color: '#a7aaad' },
                            { label: 'WooCommerce',     icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', active: false, color: '#7f54b3' },
                            { label: 'Products',        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', active: false, color: '#a7aaad' },
                            { label: 'Payments',        icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', active: false, color: '#a7aaad', badge: '1' },
                            { label: 'Analytics',       icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', active: true,  color: '#fff' },
                          ] as Array<{ label: string; icon: string; active: boolean; color: string; badge?: string }>).map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 6px 4px 5px', background: item.active ? '#2271b1' : 'transparent', borderLeft: item.active ? '3px solid #72aee6' : '3px solid transparent', cursor: 'pointer', flexShrink: 0 }}>
                              <svg width="9" height="9" fill="none" stroke={item.color} viewBox="0 0 24 24" strokeWidth={1.8} style={{ flexShrink: 0 }}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                              </svg>
                              <span style={{ color: item.color, fontSize: '5px', fontFamily: 'sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', flexShrink: 1, letterSpacing: '0.1px' }}>{item.label}</span>
                              {item.badge && <span style={{ marginLeft: 'auto', background: '#2271b1', color: '#fff', fontSize: '4px', fontWeight: 700, borderRadius: '8px', padding: '0 2px', flexShrink: 0 }}>{item.badge}</span>}
                            </div>
                          ))}
                          {/* Analytics sub-items */}
                          {[
                            { label: 'Overview', sub: true },
                            { label: 'Products', sub: true },
                            { label: 'Revenue', sub: true, active: true },
                          ].map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '3px 6px 3px 18px', background: s.active ? '#00669b' : '#162a35', cursor: 'pointer' }}>
                              <span style={{ color: s.active ? '#fff' : '#72aee6', fontSize: '5px', fontFamily: 'sans-serif' }}>{s.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* ── Main content — Revenue Analytics ── */}
                        <div style={{ flex: 1, background: '#f0f0f1', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                          {/* Page title */}
                          <div style={{ background: '#fff', borderBottom: '1px solid #c3c4c7', padding: '5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
                            <span style={{ fontSize: '9px', fontWeight: 700, color: '#1d2327', fontFamily: 'sans-serif' }}>Revenue</span>
                            <div style={{ fontSize: '5px', color: '#2271b1', border: '1px solid #c3c4c7', padding: '1px 5px', borderRadius: '3px', fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="#2271b1" strokeWidth="2"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                              Activity
                            </div>
                          </div>

                          {/* Date range */}
                          <div style={{ padding: '5px 10px 3px', flexShrink: 0 }}>
                            <div style={{ fontSize: '5px', color: '#50575e', fontFamily: 'sans-serif', marginBottom: '2px' }}>Date range:</div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#fff', border: '1px solid #c3c4c7', borderRadius: '3px', padding: '2px 6px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                              <div>
                                <div style={{ fontSize: '5.5px', fontWeight: 600, color: '#1d2327', fontFamily: 'sans-serif' }}>Custom (Apr 1–30, 2026)</div>
                                <div style={{ fontSize: '4.5px', color: '#646970', fontFamily: 'sans-serif' }}>vs. Previous period (Mar 2–31, 2026)</div>
                              </div>
                              <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#646970" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                            </div>
                          </div>

                          {/* Stats row 1 — 4 cards */}
                          <div style={{ padding: '0 10px 3px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '3px', flexShrink: 0 }}>
                            {([
                              { label: 'Gross sales', value: '$105,631', pct: '↑8%', bg: '#46b450' },
                              { label: 'Returns',     value: '$5.00',    pct: '↓99%', bg: '#dc3232' },
                              { label: 'Coupons',     value: '$2,515',   pct: '↑28%', bg: '#46b450' },
                              { label: 'Net sales',   value: '$103,110', pct: '↑8%',  bg: '#2271b1', highlight: true },
                            ] as Array<{label:string;value:string;pct:string;bg:string;highlight?:boolean}>).map((c, i) => (
                              <div key={i} style={{ background: '#fff', border: '1px solid #c3c4c7', borderRadius: '3px', padding: '4px 5px', borderTop: c.highlight ? '3px solid #2271b1' : undefined, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                <div style={{ fontSize: '4.5px', color: '#646970', fontFamily: 'sans-serif', marginBottom: '3px' }}>{c.label}</div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2px' }}>
                                  <span style={{ fontSize: '7px', fontWeight: 700, color: '#1d2327', fontFamily: 'sans-serif', lineHeight: 1 }}>{c.value}</span>
                                  <span style={{ fontSize: '4px', fontWeight: 700, color: '#fff', background: c.bg, borderRadius: '2px', padding: '1px 2px', whiteSpace: 'nowrap' }}>{c.pct}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Stats row 2 — 3 cards */}
                          <div style={{ padding: '0 10px 4px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '3px', flexShrink: 0 }}>
                            {([
                              { label: 'Taxes',       value: '$0.00',    pct: '0%',   bg: '#c3c4c7', tc: '#50575e' },
                              { label: 'Shipping',    value: '$3,689',   pct: '↑11%', bg: '#46b450', tc: '#fff' },
                              { label: 'Total sales', value: '$106,799', pct: '↑8%',  bg: '#46b450', tc: '#fff' },
                            ] as Array<{label:string;value:string;pct:string;bg:string;tc:string}>).map((c, i) => (
                              <div key={i} style={{ background: '#fff', border: '1px solid #c3c4c7', borderRadius: '3px', padding: '4px 5px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                <div style={{ fontSize: '4.5px', color: '#646970', fontFamily: 'sans-serif', marginBottom: '3px' }}>{c.label}</div>
                                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2px' }}>
                                  <span style={{ fontSize: '7px', fontWeight: 700, color: '#1d2327', fontFamily: 'sans-serif', lineHeight: 1 }}>{c.value}</span>
                                  <span style={{ fontSize: '4px', fontWeight: 700, color: c.tc, background: c.bg, borderRadius: '2px', padding: '1px 2px' }}>{c.pct}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Chart card */}
                          <div style={{ margin: '0 10px 6px', background: '#fff', border: '1px solid #c3c4c7', borderRadius: '3px', padding: '5px 8px', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                            {/* Chart header */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px', flexShrink: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '6px', fontWeight: 700, color: '#1d2327', fontFamily: 'sans-serif' }}>Net sales</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                  <div style={{ width: '8px', height: '2px', background: '#2271b1', borderRadius: '1px' }} />
                                  <span style={{ fontSize: '4px', color: '#646970', fontFamily: 'sans-serif' }}>$103,110</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                  <div style={{ width: '8px', borderTop: '2px dashed #46b450' }} />
                                  <span style={{ fontSize: '4px', color: '#646970', fontFamily: 'sans-serif' }}>$95,480</span>
                                </div>
                              </div>
                              <span style={{ fontSize: '4.5px', color: '#646970', fontFamily: 'sans-serif', border: '1px solid #c3c4c7', padding: '1px 3px', borderRadius: '2px' }}>By day ▾</span>
                            </div>
                            {/* SVG Chart */}
                            <svg width="100%" height="100%" viewBox="0 0 280 70" preserveAspectRatio="none" style={{ flex: 1, display: 'block', minHeight: '50px' }}>
                              {/* Horizontal grid */}
                              {[10, 25, 40, 55].map((y, i) => (
                                <line key={i} x1="28" y1={y} x2="280" y2={y} stroke="#e8eaeb" strokeWidth="0.5"/>
                              ))}
                              {/* Y labels */}
                              <text x="0" y="58" style={{ fontSize: '5px', fill: '#a7aaad', fontFamily: 'sans-serif' }}>$0</text>
                              <text x="0" y="43" style={{ fontSize: '5px', fill: '#a7aaad', fontFamily: 'sans-serif' }}>$7k</text>
                              <text x="0" y="28" style={{ fontSize: '5px', fill: '#a7aaad', fontFamily: 'sans-serif' }}>$14k</text>
                              <text x="0" y="13" style={{ fontSize: '5px', fill: '#a7aaad', fontFamily: 'sans-serif' }}>$21k</text>
                              {/* Blue area fill */}
                              <polyline
                                points="28,44 44,36 60,50 76,28 92,38 108,30 124,22 140,36 156,18 172,42 188,46 204,32 220,14 236,50 252,52 268,34 280,18"
                                fill="none" stroke="#2271b1" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"
                              />
                              {/* Green dashed line */}
                              <polyline
                                points="28,34 44,26 60,36 76,20 92,28 108,22 124,36 140,26 156,30 172,28 188,38 204,22 220,14 236,40 252,44 268,28 280,40"
                                fill="none" stroke="#46b450" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="4,3"
                              />
                              {/* Blue dots */}
                              {[[28,44],[76,28],[124,22],[172,42],[220,14],[280,18]].map(([x,y],i) => (
                                <circle key={i} cx={x} cy={y} r="2" fill="#2271b1" stroke="#fff" strokeWidth="0.8"/>
                              ))}
                              {/* Green dots */}
                              {[[28,34],[76,20],[124,36],[172,28],[220,14],[280,40]].map(([x,y],i) => (
                                <circle key={i} cx={x} cy={y} r="1.6" fill="#46b450" stroke="#fff" strokeWidth="0.8"/>
                              ))}
                            </svg>
                            {/* X-axis */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '28px', marginTop: '2px', flexShrink: 0 }}>
                              {['1','5','9','13','17','21','25','29'].map((d, i) => (
                                <span key={i} style={{ fontSize: '4px', color: '#a7aaad', fontFamily: 'sans-serif' }}>{d}</span>
                              ))}
                            </div>
                            <div style={{ paddingLeft: '28px', flexShrink: 0 }}>
                              <span style={{ fontSize: '4px', color: '#a7aaad', fontFamily: 'sans-serif' }}>Apr 2026</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Laptop hinge */}
                  <div style={{ background: 'linear-gradient(180deg,#3a3a3a,#222)', height: '10px', borderRadius: '0 0 3px 3px', border: '1.5px solid #444', borderTop: 'none', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '2px', width: '56px', height: '4px', background: '#1a1a1a', borderRadius: '2px' }} />
                  </div>
                  {/* Base */}
                  <div style={{ margin: '0 auto', width: '68%', height: '5px', background: 'linear-gradient(180deg,#333,#1e1e1e)', borderRadius: '0 0 8px 8px', border: '1px solid #444', borderTop: 'none' }} />
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-2 bg-gray-900/95 backdrop-blur border border-teal-500/30 rounded-xl px-3 py-2 shadow-2xl animate-float" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(20,184,166,0.2)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ boxShadow: '0 0 6px #4ade80' }} />
                    <span className="text-white text-xs font-semibold">Live & Managed</span>
                  </div>
                  <div className="text-gray-400 text-[10px] mt-0.5">99.9% uptime guaranteed</div>
                </div>
                <div className="absolute -bottom-3 -left-4 bg-gray-900/95 backdrop-blur border border-purple-500/30 rounded-xl px-3 py-2 shadow-2xl animate-float" style={{ animationDelay: '1.8s', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.542c2.401 0 4.597.876 6.291 2.313L5.855 18.291A8.434 8.434 0 013.542 12c0-4.669 3.789-8.458 8.458-8.458zm0 16.916a8.414 8.414 0 01-5.138-1.754l12.454-12.454A8.414 8.414 0 0120.458 12c0 4.669-3.789 8.458-8.458 8.458z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-white text-xs font-semibold">WooCommerce Expert</div>
                      <div className="text-gray-400 text-[10px]">Revenue tracking & growth</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-12 bg-gray-900 border-y border-gray-800">
        <div ref={statsRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={1.5} /><line x1="16" y1="2" x2="16" y2="6" strokeWidth={1.5} /><line x1="8" y1="2" x2="8" y2="6" strokeWidth={1.5} /><line x1="3" y1="10" x2="21" y2="10" strokeWidth={1.5} /></svg>,
                value: 2016, suffix: '', prefix: '', label: 'Supporting Clients Since',
              },
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                value: 10, suffix: '+', prefix: '', label: 'Years Experience',
              },
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
                value: 100, suffix: '+', prefix: '', label: 'Projects Delivered',
              },
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                value: 80, suffix: '+', prefix: '', label: 'Happy Clients',
              },
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
                value: 4, suffix: '.8★', prefix: '', label: 'Overall Rating',
              },
            ].map((s, i) => (
              <div key={i} className={`text-center flex flex-col items-center ${statsRef.inView ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="flex justify-center mb-3">{s.icon}</div>
                <div className="text-4xl lg:text-5xl font-extrabold text-teal-400 mb-1 whitespace-nowrap">
                  {statsRef.inView && <AnimatedCounter end={s.value} prefix={s.prefix} suffix={s.suffix} />}
                </div>
                <p className="text-gray-400 text-sm leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-gray-950">
        <div ref={servicesRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${servicesRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Our Services</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4">WordPress Services We Offer</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                title: 'WordPress Website Development',
                desc: 'Professional WordPress websites designed to represent your brand, generate leads, and deliver a great user experience.',
              },
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                title: 'WooCommerce Development',
                desc: 'Custom WooCommerce stores built for performance, scalability, and higher conversions.',
              },
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                title: 'WordPress Maintenance',
                desc: 'Regular updates, backups, monitoring, bug fixes, and technical support to keep your website running smoothly.',
              },
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: 'Website Speed Optimization',
                desc: 'Improve load times and create a faster experience for your visitors across all devices.',
              },
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                title: 'WordPress Security',
                desc: 'Protect your website with proactive security monitoring and industry best practices.',
              },
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
                title: 'Custom WordPress Development',
                desc: 'Need custom functionality or integrations? We build solutions tailored to your business.',
              },
            ].map((s, i) => {
              const slugMap: Record<string, string> = {
                'WordPress Website Development': 'wordpress-development',
                'WooCommerce Development': 'woocommerce-development',
                'WordPress Maintenance': 'wordpress-maintenance',
                'Website Speed Optimization': 'speed-optimization',
                'WordPress Security': 'wordpress-security',
                'Custom WordPress Development': 'custom-development',
              };
              return (
                <Link
                  key={i}
                  href={`/services/${slugMap[s.title]}`}
                  className={`group p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-teal-500/50 hover:bg-teal-500/5
                    transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 block
                    ${servicesRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED SUCCESS STORIES ── */}
      <section className="py-24 bg-gray-900/40 border-y border-gray-800">
        <div ref={caseRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${caseRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Featured Success Stories</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-3">Real Results. Real Partnerships.</h2>
            <p className="text-gray-400 text-lg">Long-term partnerships built on trust, communication, and results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'BioAge',
                client: 'Roland Thomas',
                tag: 'E-commerce · 6+ Years',
                tagColor: 'bg-teal-600',
                accentText: 'text-teal-400',
                accentBorder: 'border-teal-500/30',
                accentBg: 'bg-teal-500/5',
                image: '/case-study/bioage-case-study.png',
                slug: 'bioage',
                metric: '$1M+',
                metricLabel: 'Monthly Revenue',
                items: ['WooCommerce Store Management', 'Multi-gateway Payment Integration', 'Sucuri Enterprise Security', 'SiteGround Server Optimization', 'Performance & Speed Tuning'],
                result: 'Over $1M+ in WooCommerce revenue supported through 6+ years of long-term partnership.',
              },
              {
                name: 'Finance Manager Training',
                client: 'Finance Training Brand',
                tag: 'E-learning · Ongoing',
                tagColor: 'bg-yellow-600',
                accentText: 'text-yellow-400',
                accentBorder: 'border-yellow-500/30',
                accentBg: 'bg-yellow-500/5',
                image: '/case-study/Finance-Manager-Training.jpg',
                slug: 'finance-manager-training',
                metric: '5,000+',
                metricLabel: 'Students Enrolled',
                items: ['Custom E-learning Platform', 'WooCommerce Course Subscriptions', 'Student Progress Dashboards', 'Email Marketing Automation', 'SEO-Optimised Course Pages'],
                result: 'Scaled to $1M+ monthly revenue with 5,000+ enrolled students through strategic platform development.',
              },
              {
                name: 'Expert Heavy Equipment',
                client: 'Milissa',
                tag: 'Security · 4+ Years',
                tagColor: 'bg-orange-600',
                accentText: 'text-orange-400',
                accentBorder: 'border-orange-500/30',
                accentBg: 'bg-orange-500/5',
                image: '/case-study/experthe-case-study.png',
                slug: 'expert-heavy-equipment',
                metric: '5×',
                metricLabel: 'More Qualified Leads',
                items: ['Complete WordPress Redesign', 'Wordfence Enterprise Security', 'Twilio SMS Lead Alerts', 'Malware Removal & Recovery', 'Monthly Maintenance & Monitoring'],
                result: 'Zero security incidents since launch and 5× more qualified leads with Twilio SMS integration.',
              },
            ].map((c, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-gray-800 bg-gray-900/60 overflow-hidden hover:border-teal-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/5 flex flex-col
                  ${caseRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Screenshot */}
                <div className="relative h-48 bg-gray-800 overflow-hidden flex-shrink-0">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full ${c.tagColor} text-white text-[10px] font-bold`}>{c.tag}</span>
                  </div>
                  {/* Metric overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <div className={`text-2xl font-black ${c.accentText}`}>{c.metric}</div>
                      <div className="text-gray-400 text-xs">{c.metricLabel}</div>
                    </div>
                    <span className="text-gray-400 text-xs">{c.client}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className={`font-extrabold text-base text-white mb-4 group-hover:${c.accentText} transition-colors`}>{c.name}</h3>
                  <div className="space-y-2 mb-5 flex-1">
                    {c.items.map((item, j) => (
                      <div key={j} className="flex items-center gap-2.5">
                        <svg className={`w-4 h-4 flex-shrink-0 ${c.accentText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-400 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`pt-4 border-t ${c.accentBorder} flex items-center justify-between`}>
                    <p className="text-gray-500 text-xs italic flex-1 mr-3">{c.result}</p>
                    <Link href={`/portfolio/${c.slug}`}
                      className={`flex-shrink-0 text-xs font-bold ${c.accentText} flex items-center gap-1 hover:opacity-80 transition-opacity`}>
                      Case Study
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-gray-950">
        <div ref={whyRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${whyRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Why Businesses Choose Us</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-3">What Makes Us Different?</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Team visual */}
            <div className={`relative ${whyRef.inView ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="absolute -inset-4 bg-teal-500/6 rounded-3xl blur-2xl" />
              <div className="relative bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden p-8 text-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.542c2.401 0 4.597.876 6.291 2.313L5.855 18.291A8.434 8.434 0 013.542 12c0-4.669 3.789-8.458 8.458-8.458zm0 16.916a8.414 8.414 0 01-5.138-1.754l12.454-12.454A8.414 8.414 0 0120.458 12c0 4.669-3.789 8.458-8.458 8.458z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Zalgo Infotech</h3>
                <p className="text-teal-400 text-sm mb-6">WordPress & WooCommerce Specialists</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { val: '10+', label: 'Years' },
                    { val: '80+', label: 'Clients' },
                    { val: '100+', label: 'Projects' },
                  ].map((s, i) => (
                    <div key={i} className="bg-gray-800/60 rounded-xl p-3">
                      <div className="text-2xl font-extrabold text-teal-400">{s.val}</div>
                      <div className="text-gray-500 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: checklist */}
            <div className={`${whyRef.inView ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Supporting clients since 2016',
                  'Dedicated support team',
                  'Long-term client relationships',
                  'Proven track record of results',
                  'WooCommerce specialists',
                  'Managing business-critical websites',
                  'Fast response times',
                  'Trusted by businesses across Canada & USA',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-teal-500/40 transition-all">
                    <Check />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-gray-900/40 border-y border-gray-800">
        <div ref={testimonialsRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${testimonialsRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">What Our Clients Say</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mt-3">Trusted by Businesses Worldwide</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Clutch */}
            <div className={`p-6 rounded-2xl border border-gray-700 bg-gray-900/60 hover:border-orange-500/40 transition-all ${testimonialsRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ClutchIcon className="w-7 h-7 text-red-500 flex-shrink-0" />
                  <span className="text-red-400 font-bold text-base tracking-tight">Clutch</span>
                </div>
                <span className="text-yellow-400 text-xs font-semibold">5.0 ★</span>
              </div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed italic">&ldquo;Zalgo Infotech has been an exceptional partner. Their communication, technical skills, and reliability are outstanding.&rdquo;</p>
              {/* TODO: Add Clutch profile URL */}
            </div>

            {/* GoodFirms */}
            <div className={`p-6 rounded-2xl border border-gray-700 bg-gray-900/60 hover:border-blue-500/40 transition-all ${testimonialsRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GoodFirmsIcon className="w-7 h-7 text-blue-500 flex-shrink-0" />
                  <span className="text-blue-400 font-bold text-base tracking-tight">GoodFirms</span>
                </div>
                <span className="text-yellow-400 text-xs font-semibold">5.0 ★</span>
              </div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed italic">&ldquo;Great team to work with! They deliver high-quality work and are always available when we need them.&rdquo;</p>
              {/* TODO: Add GoodFirms profile URL */}
            </div>

            {/* Upwork */}
            <div className={`p-6 rounded-2xl border border-gray-700 bg-gray-900/60 hover:border-green-500/40 transition-all ${testimonialsRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <UpworkIcon className="w-7 h-7 text-green-500 flex-shrink-0" />
                  <span className="text-green-400 font-bold text-base tracking-tight">Upwork</span>
                </div>
                <span className="text-yellow-400 text-xs font-semibold">5.0 ★</span>
              </div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed italic">&ldquo;Highly recommended! They went above and beyond to deliver exactly what we needed.&rdquo;</p>
              {/* TODO: Add Upwork profile URL */}
            </div>

            {/* Video testimonial */}
            <div className={`rounded-2xl border border-gray-700 bg-gray-900/60 overflow-hidden hover:border-red-500/40 transition-all ${testimonialsRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="relative h-40 cursor-pointer group" onClick={() => setVideoStarted(true)}>
                {!videoStarted ? (
                  <>
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://img.youtube.com/vi/TxjsRFwDvbQ/mqdefault.jpg)` }} />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                        <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/TxjsRFwDvbQ?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                )}
              </div>
              <div className="p-4">
                <p className="text-white font-bold text-sm">Video Testimonials</p>
                <a href="https://www.youtube.com/watch?v=TxjsRFwDvbQ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-red-400 text-xs mt-1 hover:text-red-300 transition-colors">Watch on YouTube <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></a>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/testimonials" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-gray-700 text-gray-300 font-bold hover:border-teal-500 hover:text-white transition-all">
              View More Reviews
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MAINTENANCE PROBLEM ── */}
      <section className="py-24 bg-gray-950">
        <div ref={maintenanceRef.ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: visual */}
            <div className={`relative ${maintenanceRef.inView ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="absolute -inset-4 bg-teal-500/5 rounded-3xl blur-2xl" />
              <div className="relative bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">

                {/* Dashboard header */}
                <div className="flex items-center gap-2 px-5 py-3 bg-gray-800/80 border-b border-gray-700">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="text-gray-500 text-xs ml-2 font-mono">wordpress-maintenance-dashboard</span>
                </div>

                <div className="p-6">
                  {/* Site status */}
                  <div className="flex items-center justify-between mb-5 p-3 rounded-xl bg-green-500/8 border border-green-500/20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-sm font-semibold">Site Status: All Systems Operational</span>
                    </div>
                    <span className="text-gray-500 text-xs">99.9% uptime</span>
                  </div>

                  {/* Status rows */}
                  <div className="space-y-3 mb-5">
                    {[
                      { label: 'WordPress Core', status: 'Updated', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                      { label: 'Plugins (14/14)', status: 'Updated', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                      { label: 'SSL Certificate', status: 'Valid · 289 days', color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
                      { label: 'Last Backup', status: '2 hours ago', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                      { label: 'Security Scan', status: 'No threats', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
                    ].map((row, i) => (
                      <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${row.bg}`}>
                        <div className="flex items-center gap-2">
                          <svg className={`w-3.5 h-3.5 ${row.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300 text-xs">{row.label}</span>
                        </div>
                        <span className={`text-xs font-semibold ${row.color}`}>{row.status}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom 3 cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        icon: <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>,
                        label: 'Daily Backups',
                        color: 'border-blue-500/20 bg-blue-500/5',
                      },
                      {
                        icon: <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                        label: 'Speed Boost',
                        color: 'border-yellow-500/20 bg-yellow-500/5',
                      },
                      {
                        icon: <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
                        label: 'Auto Updates',
                        color: 'border-teal-500/20 bg-teal-500/5',
                      },
                    ].map((card, i) => (
                      <div key={i} className={`rounded-xl p-3 border ${card.color} flex flex-col items-center gap-2 text-center`}>
                        {card.icon}
                        <p className="text-gray-400 text-[10px] font-medium leading-tight">{card.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: content */}
            <div className={`${maintenanceRef.inView ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Don&apos;t Wait Until Something Breaks</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-3 mb-4">
                Is Your Website Being <span className="text-teal-400">Properly Maintained?</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Many business websites lose leads and sales because of problems that could have been prevented.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { text: 'Outdated plugins', color: 'text-red-400' },
                  { text: 'WooCommerce issues', color: 'text-red-400' },
                  { text: 'Security vulnerabilities', color: 'text-red-400' },
                  { text: 'Poor user experience', color: 'text-red-400' },
                  { text: 'Slow loading pages', color: 'text-red-400' },
                  { text: 'Lack of ongoing support', color: 'text-red-400' },
                  { text: 'Broken forms', color: 'text-red-400' },
                  { text: 'Lost leads & sales', color: 'text-red-400' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className={`text-sm ${item.color}`}>{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border border-teal-500/20 bg-teal-500/5 mb-8">
                <svg className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-gray-300 text-sm">Our maintenance services help prevent these issues before they impact your business.</p>
              </div>

              <Link href="/services#pricing" className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition-all hover:shadow-xl hover:shadow-teal-500/25">
                See Maintenance Plans
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section ref={ctaRef.ref} className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-transparent to-blue-900/20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(rgba(0,153,153,0.05) 1px, transparent 1px)',
          backgroundSize: '25px 25px',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: WP visual */}
            <div className={`relative ${ctaRef.inView ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="relative flex justify-center">
                <div className="w-48 h-48 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center animate-pulse-glow">
                  <div className="w-36 h-36 rounded-full bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
                    <svg className="w-20 h-20 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 1.542c2.401 0 4.597.876 6.291 2.313L5.855 18.291A8.434 8.434 0 013.542 12c0-4.669 3.789-8.458 8.458-8.458zm0 16.916a8.414 8.414 0 01-5.138-1.754l12.454-12.454A8.414 8.414 0 0120.458 12c0 4.669-3.789 8.458-8.458 8.458z" />
                    </svg>
                  </div>
                </div>
                {/* Floating icons */}
                <div className="absolute top-0 left-8 w-14 h-14 rounded-2xl bg-teal-500/15 border border-teal-500/30 backdrop-blur-sm flex flex-col items-center justify-center gap-0.5 animate-float shadow-xl shadow-teal-500/10" style={{ animationDelay: '0s' }}>
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-teal-400 text-[9px] font-bold">Secure</span>
                </div>
                <div className="absolute top-6 right-2 w-14 h-14 rounded-2xl bg-yellow-500/15 border border-yellow-500/30 backdrop-blur-sm flex flex-col items-center justify-center gap-0.5 animate-float shadow-xl shadow-yellow-500/10" style={{ animationDelay: '1s' }}>
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-yellow-400 text-[9px] font-bold">Fast</span>
                </div>
                <div className="absolute bottom-6 left-2 w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/30 backdrop-blur-sm flex flex-col items-center justify-center gap-0.5 animate-float shadow-xl shadow-green-500/10" style={{ animationDelay: '2s' }}>
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-green-400 text-[9px] font-bold">Growth</span>
                </div>
                <div className="absolute bottom-0 right-8 w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 backdrop-blur-sm flex flex-col items-center justify-center gap-0.5 animate-float shadow-xl shadow-blue-500/10" style={{ animationDelay: '1.5s' }}>
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-blue-400 text-[9px] font-bold">Protected</span>
                </div>
              </div>
            </div>

            {/* Right: content */}
            <div className={`${ctaRef.inView ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Get a Free Website Audit</span>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-white mt-3 mb-6">
                Let Us Help You Improve Your <span className="shimmer-text">WordPress Website</span>
              </h2>
              <p className="text-gray-400 mb-8">
                We&apos;ll review your website and identify security, performance, and maintenance opportunities to help your business grow.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  'Performance Analysis',
                  'WooCommerce Check',
                  'Security Check',
                  'Maintenance Review',
                  'User Experience Review',
                  'Actionable Recommendations',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition-all hover:shadow-xl hover:shadow-teal-500/25 animate-pulse-glow">
                  Request Your Free Audit
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <div className="text-center">
                  <p className="text-gray-500 text-xs">No Obligation.</p>
                  <p className="text-gray-500 text-xs">No Pressure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
