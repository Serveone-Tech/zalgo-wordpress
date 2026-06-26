'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ClutchIcon, GoodFirmsIcon, UpworkIcon, PlatformBadge } from '../components/PlatformIcons';

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

type Platform = 'Clutch' | 'GoodFirms' | 'Upwork';

const testimonials: {
  name: string; company: string; role: string; content: string;
  rating: number; ratingDisplay: string; initials: string; color: string;
  project: string; platform: Platform; period?: string;
}[] = [
  // ── Clutch / GoodFirms ──
  {
    name: 'Linda MT',
    company: 'BIOAGE Inc.',
    role: 'Co-Owner',
    content: 'I have worked with Zalgo Infotech for several years and have been pleased with their services. Bhupendra (Vishu) is available 24/7 and provides rapid, effective assistance. Communication is clear and professional — he makes complex technical matters easy to understand. I highly recommend Zalgo Infotech for anyone seeking reliable, fast, and knowledgeable technical support.',
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'LM',
    color: 'from-blue-500 to-blue-700',
    project: 'Web Development & Software Development',
    platform: 'GoodFirms',
  },
  {
    name: 'Roland Thomas',
    company: 'BIOAGE Inc.',
    role: 'CEO',
    content: "Zalgo Infotech PVT LTD's efforts have helped us achieve 100% uptime and top visibility on Google. The team delivers on time and communicates effectively. Their technical skills and 24/7 support are hallmarks of their work.",
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'RT',
    color: 'from-red-500 to-red-700',
    project: 'Web Development',
    platform: 'Clutch',
    period: 'Jan 2018 — Ongoing',
  },
  {
    name: 'Ryan Daniel',
    company: 'Molly-Mae',
    role: 'President',
    content: 'Zalgo Infotech PVT LTD improved our website\'s design and delivered exactly what we asked for. The team led a timely process and handled requests quickly and professionally.',
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'RD',
    color: 'from-red-500 to-red-700',
    project: 'Web Development',
    platform: 'Clutch',
    period: 'Jan 2019 — Apr 2026',
  },
  // ── Upwork ──
  {
    name: 'Milissa W.',
    company: 'Expert Heavy Equipment',
    role: 'Owner',
    content: 'Took direction well and great communication. I will continue to use him in the future.',
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'MW',
    color: 'from-green-500 to-green-700',
    project: 'Redesign of Company Website',
    platform: 'Upwork',
    period: 'Jan 2019',
  },
  {
    name: 'Sahil B.',
    company: '',
    role: 'Client',
    content: 'An excellent web designer who was very helpful and catered to all my requirements. Will definitely hire again.',
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'SB',
    color: 'from-green-500 to-green-700',
    project: 'WordPress Designer for Medical Website',
    platform: 'Upwork',
    period: 'Jul 2021',
  },
  {
    name: 'Matt J.',
    company: '',
    role: 'Client',
    content: 'That was very fast. Gave the task and completed in 15 mins. Awesome :)',
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'MJ',
    color: 'from-green-500 to-green-700',
    project: 'WordPress Customization',
    platform: 'Upwork',
    period: 'Sep 2019',
  },
  {
    name: 'Kirk L.',
    company: '',
    role: 'Client',
    content: 'Bhupendra did an excellent job of quickly fixing WordPress CSS issues.',
    rating: 5,
    ratingDisplay: '4.9',
    initials: 'KL',
    color: 'from-green-500 to-green-700',
    project: 'WordPress Divi CSS Responsive Fix',
    platform: 'Upwork',
    period: 'Dec 2018',
  },
  {
    name: 'Ryan F.',
    company: '',
    role: 'Client',
    content: 'Did a great job. Very efficient and pleasant to work with.',
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'RF',
    color: 'from-green-500 to-green-700',
    project: 'CSS Expert — Visual Composer',
    platform: 'Upwork',
    period: 'May 2018',
  },
  {
    name: 'Chris P.',
    company: '',
    role: 'Client',
    content: 'Very good and very fast!',
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'CP',
    color: 'from-green-500 to-green-700',
    project: 'Responsive Web Designer — Small Task',
    platform: 'Upwork',
    period: 'Jan 2019',
  },
  {
    name: 'George A.',
    company: '',
    role: 'Client',
    content: 'Good work and fast response.',
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'GA',
    color: 'from-green-500 to-green-700',
    project: 'WordPress Website Content Updating',
    platform: 'Upwork',
    period: 'May 2018',
  },
  {
    name: 'Verified Client',
    company: '',
    role: 'Client',
    content: 'Highly recommended freelancer. Would use again without hesitation. Reliable and understood job well. Great communication and very quick to complete tasks.',
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'VC',
    color: 'from-green-500 to-green-700',
    project: 'WordPress / WooCommerce Plugin Development',
    platform: 'Upwork',
    period: 'May 2018',
  },
  {
    name: 'ASP I.',
    company: '',
    role: 'Client',
    content: 'Very communicative.',
    rating: 5,
    ratingDisplay: '5.0',
    initials: 'AI',
    color: 'from-green-500 to-green-700',
    project: 'Manual Bookmarking to 3000 Websites',
    platform: 'Upwork',
    period: 'Sep 2017',
  },
];

function StarRating({ rating, display }: { rating: number; display: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1,2,3,4,5].map(i => (
          <svg key={i} className={`w-4 h-4 fill-current ${i <= rating ? 'text-yellow-400' : 'text-gray-700'}`} viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span className="text-yellow-400 text-xs font-bold">{display}</span>
    </div>
  );
}


function TestimonialCard({ t, index }: { t: (typeof testimonials)[0]; index: number }) {
  const { ref, inView } = useInView(0.05);
  return (
    <div
      ref={ref}
      className={`group relative p-5 rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm
        hover:border-teal-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/5
        flex flex-col
        ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${(index % 3) * 0.12}s` }}
    >
      {/* Top row: rating + platform */}
      <div className="flex items-center justify-between mb-4">
        <StarRating rating={t.rating} display={t.ratingDisplay} />
        <PlatformBadge platform={t.platform} />
      </div>

      {/* Quote */}
      <p className="text-gray-300 flex-grow leading-relaxed text-sm mb-4">
        &ldquo;{t.content}&rdquo;
      </p>

      {/* Project tag */}
      <div className="mb-4">
        <span className="text-[10px] text-teal-400 font-medium bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-md">
          {t.project}
        </span>
        {t.period && <span className="text-[10px] text-gray-600 ml-2">{t.period}</span>}
      </div>

      {/* Author */}
      <div className="border-t border-gray-800/60 pt-4 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
          {t.initials}
        </div>
        <div className="min-w-0">
          <p className="text-white font-bold text-sm leading-tight">{t.name}</p>
          <p className="text-gray-500 text-xs">{t.role}{t.company ? `, ${t.company}` : ''}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const statsRef = useInView();
  const trustRef = useInView();
  const ctaRef = useInView();

  return (
    <div className="bg-gray-950 overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500/8 rounded-full blur-3xl" />
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(0,153,153,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,153,153,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6 animate-fade-in-down">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-7 h-7 text-yellow-400 fill-current animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }} viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 animate-fade-in-up leading-tight">
            What Our Clients <br /><span className="shimmer-text">Say About Us</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto animate-fade-in-up delay-200 opacity-0-init mb-10">
            Real reviews from real clients on Clutch, GoodFirms & Upwork.
          </p>
          {/* Platform trust strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500/10 border border-red-500/25">
              <ClutchIcon className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-bold text-sm">Clutch</span>
              <span className="text-gray-500 text-xs">3 Reviews · 5.0★</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/25">
              <GoodFirmsIcon className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-bold text-sm">GoodFirms</span>
              <span className="text-gray-500 text-xs">Verified · 5.0★</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-500/10 border border-green-500/25">
              <UpworkIcon className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold text-sm">Upwork</span>
              <span className="text-gray-500 text-xs">10 Reviews · 5.0★</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured — Clutch & GoodFirms */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gray-800" />
            <div className="flex items-center gap-2">
              <ClutchIcon className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-bold text-sm">Clutch</span>
              <span className="text-gray-600 text-xs mx-1">&amp;</span>
              <GoodFirmsIcon className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-bold text-sm">GoodFirms</span>
              <span className="text-gray-500 text-xs ml-1">— Verified Reviews</span>
            </div>
            <div className="h-px flex-1 bg-gray-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.filter(t => t.platform !== 'Upwork').map((t, i) => <TestimonialCard key={i} t={t} index={i} />)}
          </div>
        </div>
      </section>

      {/* Upwork Reviews */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gray-800" />
            <div className="flex items-center gap-2">
              <UpworkIcon className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold text-sm">Upwork</span>
              <span className="text-gray-500 text-xs">— 10 Verified Reviews</span>
            </div>
            <div className="h-px flex-1 bg-gray-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.filter(t => t.platform === 'Upwork').map((t, i) => <TestimonialCard key={i} t={t} index={i} />)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-900/40 border-y border-gray-800">
        <div ref={statsRef.ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '80+', label: 'Happy Clients' },
              { value: '100+', label: 'Projects Delivered' },
              { value: '4.8★', label: 'Overall Rating' },
              { value: '10+', label: 'Years Experience' },
            ].map((s, i) => (
              <div
                key={i}
                className={`${statsRef.inView ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="text-4xl lg:text-5xl font-extrabold text-teal-400 mb-2">{s.value}</div>
                <p className="text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Clients Trust */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={trustRef.ref} className="text-center mb-16">
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Our Promise</span>
            <h2 className="text-4xl font-bold text-white mt-3">Why Clients Trust Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                title: 'Results-Driven',
                desc: 'We measure success by your business growth — more traffic, more conversions, more revenue.',
              },
              {
                icon: <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
                title: 'Clear Communication',
                desc: 'Regular updates, transparent timelines, and honest conversations throughout every project.',
              },
              {
                icon: <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
                title: 'Cutting-Edge WordPress',
                desc: 'We stay on top of every WordPress update, Gutenberg change, and WooCommerce improvement.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`text-center p-8 rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-teal-500/40 transition-all duration-300
                  ${trustRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef.ref} className="py-24 bg-gray-900/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 via-transparent to-purple-900/20 pointer-events-none" />
        <div className={`relative z-10 max-w-4xl mx-auto px-4 text-center ${ctaRef.inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Ready to Join Our <span className="shimmer-text">Happy Clients?</span>
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Start a conversation — let&apos;s build something great together.
          </p>
          <Link href="/contact" className="group inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-teal-600 text-white font-bold text-lg hover:bg-teal-500 transition-all hover:shadow-2xl hover:shadow-teal-500/30 animate-pulse-glow">
            Get Free Consultation
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
